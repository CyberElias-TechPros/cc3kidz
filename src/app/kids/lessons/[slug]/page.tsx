import Link from 'next/link'
import lessonsData from '../../../../../kids/data/lessons.json'
import { notFound } from 'next/navigation'

export function generateStaticParams(){
  return (lessonsData as any).lessons.map((l:any)=>({ slug: l.slug }))
}

export default async function LessonDetail({ params }: { params: Promise<{ slug: string }> }){
  const { slug } = await params
  const lesson = (lessonsData as any).lessons.find((l:any)=>l.slug===slug)
  if(!lesson) return notFound()
  const idx = (lessonsData as any).lessons.findIndex((l:any)=>l.slug===slug)
  const prev = (lessonsData as any).lessons[idx-1]
  const next = (lessonsData as any).lessons[idx+1]
  return <>
    <section className="page-hero page-hero--yellow"><div className="container page-hero__inner"><div><nav className="breadcrumb"><Link href="/kids">Home</Link> › <Link href="/kids/lessons">Lessons</Link> › <span>{lesson.title}</span></nav><h1>{lesson.title}</h1><p>{lesson.reference} · {lesson.category} · {lesson.age}</p></div><div className="page-hero__art">{lesson.emoji}</div></div></section>
    <section className="section"><div className="container"><div className="lesson-layout">
      <article className="lesson-article">
        <p className="lead">{lesson.intro}</p>
        <div className="verse-block"><div className="verse-block__label">Memory verse</div><blockquote>&quot;{lesson.memoryVerse}&quot;</blockquote><cite>{lesson.memoryReference}</cite></div>
        {lesson.story.map((p:string,i:number)=><p key={i} style={{marginBottom:'1rem', color:'#4a3a5c'}}>{p}</p>)}
        <h2><span className="ico">💡</span> What we learn</h2>
        <ul>{lesson.points.map((pt:string)=><li key={pt}>{pt}</li>)}</ul>
        <h2><span className="ico">❓</span> Questions to think about</h2>
        {lesson.questions.map((qa:any, i:number)=><details key={i} className="qa-item"><summary className="qa-item__q">{qa.q}</summary><div className="qa-item__a-inner">{qa.a}</div></details>)}
        <div className="notice notice--yellow" style={{marginTop:'1.2rem'}}><strong>Activity:</strong> {lesson.activity}</div>
        <div className="verse-block" style={{marginTop:'1.2rem', background:'var(--blue-soft)'}}><div className="verse-block__label">Prayer</div><p style={{fontStyle:'italic'}}>{lesson.prayer}</p></div>
        <div className="lesson-nav">
          {prev ? <Link href={`/kids/lessons/${prev.slug}`}><span className="dir">Previous</span><span className="title">{prev.title}</span></Link> : <span/>}
          {next ? <Link href={`/kids/lessons/${next.slug}`}><span className="dir">Next</span><span className="title">{next.title}</span></Link> : <span/>}
        </div>
      </article>
      <aside className="lesson-sidebar">
        <div className="side-card"><h3>Lesson facts</h3><ul className="fact-list"><li><span>Reference</span><strong>{lesson.reference}</strong></li><li><span>Category</span><strong>{lesson.category}</strong></li><li><span>Age</span><strong>{lesson.age}</strong></li><li><span>Read time</span><strong>{lesson.duration}</strong></li></ul></div>
        <div className="side-card side-card--verse"><h3>Key lesson</h3><blockquote>&quot;{lesson.keyLesson}&quot;</blockquote></div>
        <div className="side-card"><h3>More lessons</h3><div className="related-list">{(lessonsData as any).lessons.filter((l:any)=>l.slug!==slug).slice(0,4).map((l:any)=><Link key={l.slug} href={`/kids/lessons/${l.slug}`}><span className="emoji">{l.emoji}</span> {l.title}</Link>)}</div></div>
      </aside>
    </div></div></section>
  </>
}
