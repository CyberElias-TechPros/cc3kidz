import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDevotionalBySlug, getAdjacent } from '@/lib/rhapsody/store'
import { CHURCH_LEADERS } from '@/lib/rhapsody/audiences'

export async function generateStaticParams() {
  const { getDevotionals } = await import('@/lib/rhapsody/store')
  const { items } = getDevotionals({ audience: 'early-readers', limit: 20 })
  return items.map(d => ({ slug: d.slug }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const d = getDevotionalBySlug(params.slug)
  if (!d || d.audience !== 'early-readers') return notFound()
  const { prev, next } = getAdjacent(d.slug)
  return (
    <>
      <section className="page-hero page-hero--green">
        <div className="container page-hero__inner">
          <div>
            <nav className="breadcrumb"><Link href="/kids">Home</Link> › <Link href="/kids/rhapsody">Kiddies Rhapsody</Link> › <span>{d.title}</span></nav>
            <h1>{d.title}</h1>
            <p>{d.scriptureReference} · {d.date} · {d.weekday} · {d.editionTitle} · Coordinator {CHURCH_LEADERS.kids.name}</p>
          </div>
          <div className="page-hero__art">⭐</div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container" style={{ maxWidth: '42rem' }}>
          <div className="memory-card" style={{ marginBottom: '1.2rem' }}>
            <div className="memory-card__label">Opening Scripture</div>
            <blockquote>“{d.scripture}”</blockquote>
            <cite>{d.scriptureReference}</cite>
          </div>
          {d.subtitle && <div className="eyebrow" style={{ marginBottom: '0.6rem' }}>{d.subtitle}</div>}
          {d.body.split('\n\n').map((para: string, i: number) => {
            if (!para.trim()) return null
            if (para.trim().startsWith('## ')) return <h3 key={i} style={{ marginTop: '1.2rem', fontWeight: 800 }}>{para.replace(/^##\s+/, '')}</h3>
            return <p key={i} style={{ marginTop: '0.8rem', lineHeight: 1.7 }}>{para}</p>
          })}
          {d.prayer && (
            <div className="memory-card" style={{ marginTop: '1.2rem', background: '#FFF7CC' }}>
              <div className="memory-card__label">{d.prayerLabel}</div>
              <blockquote>“{d.prayer}”</blockquote>
            </div>
          )}
          {d.extras?.length > 0 && (
            <div style={{ marginTop: '1rem', display: 'grid', gap: '0.6rem' }}>
              {d.extras.map((e, i) => (
                <div key={i} className="card" style={{ padding: '1rem', background: '#F8FAFF' }}>
                  <div className="eyebrow">{e.label}</div>
                  <p style={{ marginTop: '0.4rem' }}>{e.text}</p>
                </div>
              ))}
            </div>
          )}
          {d.furtherStudy && <div style={{ marginTop: '1rem', fontSize: '.9rem' }}><strong>Further Study:</strong> {d.furtherStudy}</div>}
          <div className="btn-row" style={{ marginTop: '1.2rem' }}>
            <Link className="btn btn--primary" href={`/kids/rhapsody/quiz/${d.slug}`}>Take Quiz (+10 XP)</Link>
            <Link className="btn btn--secondary" href="/kids/rhapsody">More devotionals</Link>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {prev && <Link href={`/kids/rhapsody/${prev.slug}`} className="chip">← {prev.title.slice(0, 20)}…</Link>}
            {next && <Link href={`/kids/rhapsody/${next.slug}`} className="chip">{next.title.slice(0, 20)}… →</Link>}
          </div>
        </div>
      </section>
    </>
  )
}
