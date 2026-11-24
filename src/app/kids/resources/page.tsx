'use client'
import Link from 'next/link'
export default function Page(){
  return <>
    <section className="page-hero page-hero--purple"><div className="container page-hero__inner"><div><nav className="breadcrumb"><Link href="/kids">Home</Link> › <span>Resources</span></nav><h1>Take-home <span className="hl hl--green">resources</span></h1><p>Printables, verse cards and guides to keep the conversation going at home.</p></div><div className="page-hero__art">📦</div></div></section>
    <section className="section"><div className="container"><div className="resource-grid">
      <div className="resource-card accent-yellow"><div className="resource-card__icon">📖</div><div><h3>Weekly Lesson Sheets</h3><p>Story, memory verse, questions and a take-home activity.</p><Link className="link-arrow" href="/kids/lessons">Browse lessons →</Link></div></div>
      <div className="resource-card accent-pink"><div className="resource-card__icon">⭐</div><div><h3>Memory Verse Cards</h3><p>Printable cards — cut, learn, display at home.</p><a className="link-arrow" href="#printables">View printables ↓</a></div></div>
      <div className="resource-card accent-blue"><div className="resource-card__icon">🎨</div><div><h3>Colouring Pages</h3><p>Bible scenes to print and colour.</p><Link className="link-arrow" href="/kids/kids-corner#colouring">Colour now →</Link></div></div>
      <div className="resource-card accent-green"><div className="resource-card__icon">👪</div><div><h3>Parents&apos; Guide</h3><p>How to talk about faith at home — prayers, tips, routines.</p><Link className="link-arrow" href="/kids/parents">Parents&apos; Corner →</Link></div></div>
    </div></div></section>
    <section className="section section--cream" id="printables"><div className="container"><h2 style={{marginBottom:'1rem'}}>Printable verse cards — cut &amp; share</h2>
      <div className="print-sheet">
        <div className="verse-card-print accent-yellow"><span className="emoji">💛</span><blockquote>&quot;For God so loved the world…&quot;</blockquote><cite>John 3:16</cite></div>
        <div className="verse-card-print accent-pink"><span className="emoji">✨</span><blockquote>&quot;I can do all things through Christ…&quot;</blockquote><cite>Philippians 4:13</cite></div>
        <div className="verse-card-print accent-blue"><span className="emoji">🌟</span><blockquote>&quot;Trust in the Lord with all your heart.&quot;</blockquote><cite>Proverbs 3:5</cite></div>
      </div>
      <a className="btn btn--primary" style={{marginTop:'1rem'}} href="#" onClick={(e)=>{e.preventDefault(); if(typeof window!=='undefined') window.print()}}>Print this page</a>
    </div></section>
  </>
}
