import Link from 'next/link'
import { getTodayDevotional, getRecentByAudience, getKidsIssues } from '@/lib/rhapsody/store'
import { RhapsodyCard } from '@/components/rhapsody/RhapsodyCard'
import { GamificationBar } from '@/components/rhapsody/GamificationBar'
import { CHURCH_LEADERS } from '@/lib/rhapsody/audiences'

export const metadata = { title: 'Kiddies Rhapsody — Daily Devotional for Children | CC3 Kids' }

export default function Page() {
  const today = getTodayDevotional('early-readers')
  const recent = getRecentByAudience('early-readers', 6)
  const issues = getKidsIssues().slice(-3).reverse()

  return (
    <>
      <section className="page-hero page-hero--yellow">
        <div className="container page-hero__inner">
          <div>
            <nav className="breadcrumb"><Link href="/kids">Home</Link> › <span>Kiddies Rhapsody</span></nav>
            <h1>Kiddies <span className="hl hl--yellow">Rhapsody</span> Daily</h1>
            <p>Rhapsody of Realities for Early Readers — one page, big words, a confession you can say aloud. Coordinator {CHURCH_LEADERS.kids.name}.</p>
            <div className="btn-row" style={{ marginTop: '1rem' }}>
              <Link href="#today" className="btn btn--primary">Read Today</Link>
              <Link href="/kids/lessons" className="btn btn--ghost-light">Bible Lessons</Link>
            </div>
          </div>
          <div className="page-hero__art">📖</div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '1.2rem' }}>
        <GamificationBar church="kids" />
      </div>

      <section className="section">
        <div className="container">
          <div className="content-split">
            <div className="image-frame"><img src="/kids/assets/images/kids-corner.webp" alt="Kiddies Rhapsody" /></div>
            <div>
              <span className="eyebrow eyebrow--blue">Led with love</span>
              <h2>Coordinator: {CHURCH_LEADERS.kids.name}</h2>
              <p className="lead">{CHURCH_LEADERS.kids.bio}</p>
              <p>Every day a new page from the Kiddies Rhapsody helps children know Jesus, speak the Word and grow in character.</p>
              <div className="btn-row"><Link className="btn btn--primary" href="#today">Start reading</Link><Link className="btn btn--secondary" href="/kids/parents">Parents’ Corner</Link></div>
            </div>
          </div>
        </div>
      </section>

      {today && (
        <section className="section section--cream" id="today">
          <div className="container">
            <div className="section-head section-head--split">
              <div><span className="eyebrow eyebrow--yellow">Today — {today.date} · {today.weekday}</span><h2>{today.title}</h2><p>{today.scriptureReference} — {today.excerpt.slice(0, 120)}…</p></div>
              <span className="pill pill--yellow">{today.readingMinutes} min · {today.words} words</span>
            </div>
            <div className="lesson-feature" style={{ marginTop: '1rem' }}>
              <div className="lesson-feature__content" style={{ maxWidth: '42rem' }}>
                <div className="eyebrow">Opening Scripture</div>
                <blockquote style={{ fontStyle: 'italic', borderLeft: '4px solid #FFB703', paddingLeft: '1rem', margin: '0.6rem 0' }}>“{today.scripture}”</blockquote>
                <div style={{ fontSize: '.8rem', color: 'var(--ink-soft)' }}>{today.scriptureReference}</div>
                <p style={{ marginTop: '1rem' }}>{today.body.split('\n\n')[0]?.slice(0, 400)}…</p>
                <div className="memory-card" style={{ marginTop: '1rem' }}><div className="memory-card__label">{today.prayerLabel}</div><blockquote>“{today.prayer}”</blockquote></div>
                <div className="btn-row" style={{ marginTop: '1rem' }}>
                  <Link className="btn btn--primary" href={`/kids/rhapsody/${today.slug}`}>Read full devotional</Link>
                  <Link className="btn btn--secondary" href={`/kids/rhapsody/quiz/${today.slug}`}>Take Quiz +10 XP</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section section--white">
        <div className="container">
          <div className="section-head section-head--split">
            <div><span className="eyebrow eyebrow--pink">This week</span><h2>Recent Kiddies Rhapsody</h2><p>Swipe through the last few days — every page is a new adventure with Jesus.</p></div>
            <Link className="btn btn--secondary" href="/kids/rhapsody/archive">View archive</Link>
          </div>
          <div className="lesson-grid" style={{ marginTop: '1rem' }}>
            {recent.map((d) => (
              <Link key={d.slug} href={`/kids/rhapsody/${d.slug}`} className="lesson-card">
                <div className={`lesson-card__cover cover-yellow`}><span className="lesson-card__emoji">⭐</span><span className="lesson-card__cat">Kiddies Rhapsody</span></div>
                <div className="lesson-card__body"><h3>{d.title}</h3><div className="lesson-card__ref">{d.scriptureReference} · {d.date}</div><p className="lesson-card__verse">“{d.prayer.slice(0, 80)}…”</p><span className="link-arrow">Read →</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="kids-panel">
            <div className="kids-panel__content">
              <span className="eyebrow eyebrow--yellow">Magazine</span>
              <h2>Rhapsody of Realities for Kids — monthly issues</h2>
              <p>9 issues of the printed magazine (448 pages). Each month’s comic, story and activity as it appeared — for reading month by month alongside daily pages.</p>
              <div className="activity-list">
                {issues.map((iss) => (
                  <div key={iss.slug}><span className="ico accent-yellow">📚</span> {iss.title} — {iss.pageCount} pages · {iss.edition}</div>
                ))}
              </div>
              <Link className="btn btn--primary" href="/kids/rhapsody/archive">Explore daily pages</Link>
            </div>
            <div className="kids-panel__media"><img src="/kids/assets/images/kids-corner.webp" alt="Kids magazine" loading="lazy" /></div>
          </div>
        </div>
      </section>
    </>
  )
}
