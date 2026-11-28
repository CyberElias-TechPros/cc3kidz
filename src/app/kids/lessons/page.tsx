'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import data from '../../../../kids/data/lessons.json'

export default function LessonsPage(){
  const lessons = (data as any).lessons
  const [q,setQ]=useState('')
  const [cat,setCat]=useState('All')
  const cats = ['All', ...Array.from(new Set(lessons.map((l:any)=>l.category)))] as string[]
  const filtered = useMemo(()=> lessons.filter((l:any)=>(cat==='All'||l.category===cat)&&(!q||`${l.title} ${l.reference} ${l.intro}`.toLowerCase().includes(q.toLowerCase()))),[q,cat])
  return <>
    <section className="page-hero page-hero--purple"><div className="container page-hero__inner"><div><nav className="breadcrumb"><Link href="/kids">Home</Link> › <span>Bible Lessons</span></nav><h1>Bible lessons for <span className="hl hl--yellow">every age</span></h1><p>Stories that show God&apos;s love, power and faithfulness — with key lessons, memory verses and activities.</p></div><div className="page-hero__art">📚</div></div></section>
    <section className="section"><div className="container">
      <div className="library-toolbar"><div className="search-field"><input className="input" placeholder="Search lessons…" value={q} onChange={e=>setQ(e.target.value)}/></div><div className="filter-chips">{cats.map(c=><button key={c} onClick={()=>setCat(c)} className={`chip ${cat===c?'is-active':''}`}>{c}</button>)}</div></div>
      <div className="lesson-grid">{filtered.map((l:any)=><Link key={l.slug} href={`/kids/lessons/${l.slug}`} className="lesson-card"><div className={`lesson-card__cover cover-${l.cover}`}><span className="lesson-card__emoji">{l.emoji}</span><span className="lesson-card__cat">{l.category}</span></div><div className="lesson-card__body"><h3>{l.title}</h3><div className="lesson-card__ref">{l.reference}</div><p className="lesson-card__verse">&quot;{l.memoryVerse}&quot;</p><span className="link-arrow">Read lesson →</span></div></Link>)}
      </div>
      {filtered.length===0&&<div className="empty-state"><span className="emoji">🔍</span><h3>No lessons found</h3><p>Try another keyword or category.</p></div>}
    </div></section>
  </>
}
