import Link from 'next/link'
import { BadgeGrid, LeaderboardMock } from '@/components/rhapsody/Leaderboard'

export const metadata = { title: 'My Stars & Badges — Kiddies Rhapsody | Kids XP' }

export default function KidsAchievementsPage() {
  return (
    <div className="kids-scope min-h-screen" style={{ background: 'var(--cream, #FFF9EF)' }}>
      <section style={{ background: 'var(--navy, #1B2A5B)', color: '#fff' }}>
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
          <div className="eyebrow eyebrow--yellow">Kids Gamification</div>
          <h1 style={{ color: '#fff', marginTop: '.4rem' }}>My Stars &amp; Badges ⭐</h1>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '.9rem', maxWidth: '52ch' }}>
            Earn stars for every Kiddies Rhapsody story and quiz you finish. Keep your streak, collect all the badges, and climb the kids leaderboard!
          </p>
        </div>
      </section>
      <div className="container" style={{ padding: '1.5rem', display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
        <div>
          <h2 style={{ color: 'var(--ink)' }}>Your badges</h2>
          <p style={{ fontSize: '.8rem', color: 'var(--ink-soft)' }}>Saved on this device — sign in later to keep them forever.</p>
          <BadgeGrid />
        </div>
        <div>
          <LeaderboardMock audience="Kiddies" />
          <div className="btn-row" style={{ marginTop: '1rem' }}>
            <Link href="/kids/rhapsody" className="btn btn--yellow">Read today&apos;s story →</Link>
            <Link href="/kids/kids-corner" className="btn btn--ghost-light">Kids Corner</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
