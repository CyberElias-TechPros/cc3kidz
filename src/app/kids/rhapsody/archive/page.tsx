import Link from 'next/link'
import { getDevotionals, getEditions } from '@/lib/rhapsody/store'

export default function Page({ searchParams }: { searchParams: { edition?: string } }) {
  const edition = searchParams?.edition
  const { items, total } = getDevotionals({ audience: 'early-readers', edition, limit: 30 })
  const editions = getEditions('early-readers')
  return (
    <>
      <section className="page-hero page-hero--blue"><div className="container page-hero__inner"><div><nav className="breadcrumb"><Link href="/kids">Home</Link> › <Link href="/kids/rhapsody">Kiddies Rhapsody</Link> › <span>Archive</span></nav><h1>Kiddies Archive — {total}</h1><p>Every Kiddies Rhapsody day from {editions[editions.length-1]?.from} to {editions[0]?.to}.</p></div><div className="page-hero__art">📚</div></div></section>
      <section className="section section--white"><div className="container">
        <div className="filter-chips" style={{ marginBottom: '1rem' }}>
          <Link href="/kids/rhapsody/archive" className={`chip ${!edition?'is-active':''}`}>All</Link>
          {editions.slice(0,8).map(e=> <Link key={e.edition} href={`/kids/rhapsody/archive?edition=${e.edition}`} className={`chip ${edition===e.edition?'is-active':''}`}>{e.title} ({e.count})</Link>)}
        </div>
        <div className="lesson-grid">
          {items.map(d=> <Link key={d.slug} href={`/kids/rhapsody/${d.slug}`} className="lesson-card"><div className="lesson-card__cover cover-yellow"><span className="lesson-card__emoji">⭐</span><span className="lesson-card__cat">{d.date}</span></div><div className="lesson-card__body"><h3>{d.title}</h3><div className="lesson-card__ref">{d.scriptureReference}</div><p className="lesson-card__verse">“{d.excerpt.slice(0,80)}…”</p><span className="link-arrow">Read →</span></div></Link>)}
        </div>
      </div></section>
    </>
  )
}
