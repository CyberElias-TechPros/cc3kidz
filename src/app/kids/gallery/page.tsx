import Link from 'next/link'
export default function Page(){
  const items=[
    {img:'/kids/assets/images/gallery/worship.webp',cat:'Worship',title:'Worship & Praise'},
    {img:'/kids/assets/images/gallery/celebration.webp',cat:'Celebration',title:"Children's Day"},
    {img:'/kids/assets/images/gallery/drama.webp',cat:'Drama',title:'Bible Drama'},
    {img:'/kids/assets/images/hero-children.webp',cat:'Family',title:'Church Family'},
    {img:'/kids/assets/images/classes/primary.webp',cat:'Learning',title:'Bible Lessons'},
    {img:'/kids/assets/images/kids-corner.webp',cat:'Fun',title:'Bible Quizzes'},
  ]
  return <>
    <section className="page-hero page-hero--blue"><div className="container page-hero__inner"><div><nav className="breadcrumb"><Link href="/kids">Home</Link> › <span>Gallery</span></nav><h1>Moments worth <span className="hl hl--pink">remembering</span></h1><p>Worship, laughter, drama and celebration — a glimpse into our children&apos;s church family.</p></div><div className="page-hero__art">📸</div></div></section>
    <section className="section"><div className="container"><div className="gallery-grid">{items.map(it=><button key={it.title} className="gallery-card"><img src={it.img} alt={it.title}/><span className="gallery-card__cap"><span className="gallery-card__cat">{it.cat}</span><span className="gallery-card__title">{it.title}</span></span></button>)}</div><div className="notice gallery-note">These are illustrated previews. Approved photographs will be added only with parental consent.</div></div></section>
  </>
}
