'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Client fetch quiz from API to keep generation server-synced
export default function Page() {
  const params = useParams() as { slug: string }
  const slug = params.slug
  const [quiz, setQuiz] = useState<any>(null)
  const [d, setD] = useState<any>(null)
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    fetch(`/api/rhapsody/quiz?slug=${slug}`).then(r=>r.json()).then(j=>{
      setQuiz(j.quiz)
      // also fetch devotional meta for header
      fetch(`/api/rhapsody/list?limit=1&q=${slug}`).then(r=>r.json()).then(j2=>{
        const hit = j2.items?.find((x:any)=>x.slug===slug)
        if(hit) setD(hit)
      })
    })
  }, [slug])

  if (!quiz) return <section className="section"><div className="container"><div className="card p-8 text-center">Loading quiz…</div></div></section>

  if (done) {
    const total = quiz.questions.length
    const pct = Math.round((score/total)*100)
    const xp = pct===100 ? total*20+10 : Math.round((pct/100)*total*20)
    return (
      <section className="page-hero page-hero--yellow"><div className="container page-hero__inner"><div><nav className="breadcrumb"><Link href="/kids">Home</Link> › <Link href="/kids/rhapsody">Kiddies Rhapsody</Link> › <span>Quiz</span></nav><h1>Quiz result: {score}/{total}</h1><p>{pct}% · +{xp} XP — {pct===100 ? 'Perfect! Kiddies Star!' : pct>=60?'Well done!':'Keep studying!'}</p><div className="btn-row" style={{marginTop:'1rem'}}><button onClick={()=>{setIdx(0);setScore(0);setPicked(null);setDone(false)}} className="btn btn--primary">Retake</button><Link href={`/kids/rhapsody/${slug}`} className="btn btn--secondary">Back to devotional</Link></div></div><div className="page-hero__art">🏆</div></div></section>
    )
  }

  const q = quiz.questions[idx]
  const total = quiz.questions.length

  const pick = (i:number)=>{
    if(picked!==null) return
    setPicked(i)
    if(i===q.answer) setScore(s=>s+1)
    // record gamification on final
  }
  const next = ()=>{
    if(idx+1>=total){
      // record
      try {
        const pct = Math.round(((score + (picked===q.answer?0:0))/total)*100) // score already correct
        const stored = JSON.parse(localStorage.getItem('cc3.rhapsody.progress.v1')||'{}')
        // delegate to engine via simple local update
        const { recordQuiz } = require('@/lib/gamification/engine')
        const p = Math.round((score/total)*100)
        recordQuiz(quiz.id, p, total)
      } catch {}
      setDone(true)
    } else { setIdx(v=>v+1); setPicked(null) }
  }

  return (
    <>
      <section className="page-hero page-hero--pink"><div className="container page-hero__inner"><div><nav className="breadcrumb"><Link href="/kids">Home</Link> › <Link href="/kids/rhapsody">Kiddies Rhapsody</Link> › <span>Quiz</span></nav><h1>{quiz.title}</h1><p>{d?.scriptureReference ?? quiz.source.scriptureReference} · Question {idx+1} of {total} · Score {score}/{total}</p></div><div className="page-hero__art">🎯</div></div></section>
      <section className="section"><div className="container"><div className="quiz-progress"><div className="quiz-progress__bar" style={{width:`${((idx+1)/total)*100}%`}}/></div>
        <div className="game-panel" style={{marginTop:'1rem'}}>
          <div className="quiz-question">{q.q}</div>
          <div className="quiz-options">{q.options.map((opt:string,i:number)=> <button key={i} disabled={picked!==null} onClick={()=>pick(i)} className={`quiz-option ${picked===i ? (i===q.answer?'is-correct':'is-wrong'):''} ${picked!==null && i===q.answer?'is-correct':''}`}><span className="quiz-option__letter">{String.fromCharCode(65+i)}</span>{opt}</button>)}</div>
          {picked!==null && <div className={`quiz-feedback is-show ${picked===q.answer?'quiz-feedback--correct':'quiz-feedback--wrong'}`}>{picked===q.answer?'Correct! ':'Not quite — '}{q.explain}</div>}
          <div className="quiz-actions"><span className="quiz-score">Score: {score}/{total}</span>{picked!==null && <button className="btn btn--primary" onClick={next}>{idx+1===total?'See result':'Next'}</button>}</div>
        </div>
      </div></section>
    </>
  )
}
