'use client'
import { useState } from 'react'
import Link from 'next/link'
import quizzes from '../../../../kids/data/quizzes.json'
import verses from '../../../../kids/data/verses.json'
import characters from '../../../../kids/data/characters.json'

export default function Page(){
  const [qi,setQi]=useState(0)
  const [score,setScore]=useState(0)
  const [picked,setPicked]=useState<number|null>(null)
  const [showResult,setShowResult]=useState(false)
  const qs=(quizzes as any).questions
  const q=qs[qi]

  const handlePick=(idx:number)=>{
    if(picked!==null) return
    setPicked(idx)
    if(idx===q.answer) setScore(s=>s+1)
  }
  const next=()=>{
    if(qi+1>=qs.length) setShowResult(true)
    else { setQi(qi+1); setPicked(null)}
  }

  return <>
    <section className="page-hero page-hero--green"><div className="container page-hero__inner"><div><nav className="breadcrumb"><Link href="/kids">Home</Link> › <span>Kids Corner</span></nav><h1>Play, learn &amp; <span className="hl hl--yellow">shine</span></h1><p>Quizzes, puzzles, memory verses and colouring — made for curious champions.</p></div><div className="page-hero__art">🎮</div></div></section>

    <section className="section" id="quiz"><div className="container">
      <div className="game-panel">
        <div className="game-panel__head"><div className="game-panel__icon accent-yellow">🎯</div><div><h2>Bible Quiz</h2><p>Test your Bible knowledge — 10 questions, one champion!</p></div></div>
        {!showResult ? <>
          <div className="quiz-progress"><div className="quiz-progress__bar" style={{width:`${((qi+1)/qs.length)*100}%`}}/></div>
          <div className="quiz-meta"><span>Question {qi+1} of {qs.length}</span><span>{q.reference}</span></div>
          <div className="quiz-question">{q.question}</div>
          <div className="quiz-options">{q.options.map((opt:string,i:number)=><button key={opt} disabled={picked!==null} onClick={()=>handlePick(i)} className={`quiz-option ${picked===i ? (i===q.answer?'is-correct':'is-wrong') : ''} ${picked!==null && i===q.answer ? 'is-correct':''}`}><span className="quiz-option__letter">{String.fromCharCode(65+i)}</span>{opt}</button>)}</div>
          {picked!==null && <div className={`quiz-feedback is-show ${picked===q.answer?'quiz-feedback--correct':'quiz-feedback--wrong'}`}>{picked===q.answer?'Well done! ':'Not quite — '}{q.fact}</div>}
          <div className="quiz-actions"><span className="quiz-score">Score: {score}/{qs.length}</span>{picked!==null && <button className="btn btn--primary" onClick={next}>{qi+1===qs.length?'See result':'Next question'}</button>}</div>
        </>:<>
          <div className="quiz-result"><div className="result-ring" style={{['--score' as any]: `${Math.round(score/qs.length*100)}`}}><div className="result-ring__inner">{score}/{qs.length}<small>Score</small></div></div><h3>{score===qs.length?'Perfect! Champion!': score>6?'Great job!':'Nice try!'}</h3><p>You scored {score} out of {qs.length}. Keep learning God&apos;s Word!</p><button className="btn btn--primary" onClick={()=>{setQi(0);setScore(0);setPicked(null);setShowResult(false)}}>Play again</button></div>
        </>}
      </div>
    </div></section>

    <section className="section section--white" id="verse"><div className="container">
      <div className="game-panel accent-purple"><div className="game-panel__head"><div className="game-panel__icon accent-purple">⭐</div><div><h2>Memory Verse Challenge</h2><p>Fill the blanks — how many verses can you remember?</p></div></div>
        <div className="verse-display">&quot;{(verses as any).verses[0].text}&quot; — <strong>{(verses as any).verses[0].reference}</strong></div>
        <div className="word-bank">{(verses as any).verses[0].blanks.map((w:string)=><button key={w} className="word-chip">{w}</button>)} {(verses as any).verses[0].distractors.map((w:string)=><button key={w} className="word-chip">{w}</button>)}</div>
        <Link className="btn btn--primary btn--sm" href="/kids/resources">Printable verse cards</Link>
      </div>
    </div></section>

    <section className="section" id="whoami"><div className="container">
      <div className="game-panel"><div className="game-panel__head"><div className="game-panel__icon accent-yellow">🔎</div><div><h2>Who Am I?</h2><p>Guess the Bible character from the clues!</p></div></div>
        <div className="who-layout"><div className="who-avatar">🧔</div><div><div className="clue-list">{(characters as any).characters.slice(0,3)[0]?.clues?.slice(0,3).map((c:string,i:number)=><div key={i} className="clue is-shown"><span className="clue__num">{i+1}</span>{c}</div>) ?? <div className="clue is-shown">Clues loading…</div>}</div>
        <div className="who-options">{(characters as any).characters.slice(0,4).map((ch:any)=><button key={ch.name} className="who-option">{ch.name}</button>)}</div></div></div>
      </div>
    </div></section>

    <section className="section section--white" id="colouring"><div className="container">
      <h2 style={{marginBottom:'1rem'}}>Colouring Corner</h2>
      <div className="colour-grid">
        {[
          {title:"Noah's Ark",img:'/kids/assets/images/colouring/noahs-ark.svg',desc:'Print and colour Noah and the animals!'},
          {title:'The Lost Sheep',img:'/kids/assets/images/colouring/lost-sheep.svg',desc:'The shepherd finds his lost sheep.'},
          {title:'Daniel in the Lions’ Den',img:'/kids/assets/images/colouring/daniel-lion.svg',desc:'God shut the mouths of lions.'},
        ].map(c=><div key={c.title} className="colour-card"><div className="colour-card__preview"><img src={c.img} alt={c.title}/></div><div className="colour-card__body"><h3>{c.title}</h3><p>{c.desc}</p><div className="colour-actions"><a className="btn btn--secondary btn--sm" href={c.img} target="_blank">Print</a><a className="btn btn--primary btn--sm" href={c.img} download>Download</a></div></div></div>)}
      </div>
    </div></section>
  </>
}
