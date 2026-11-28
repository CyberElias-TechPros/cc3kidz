import Link from 'next/link'
import { BadgeGrid, LeaderboardMock } from '@/components/rhapsody/Leaderboard'

export const metadata = { title: 'Achievements & Leaderboard — Rhapsody Gamification' }

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-haze">
      <section className="bg-navy text-white">
        <div className="container-cc py-8">
          <div className="text-xs font-bold tracking-widest uppercase text-gold">Gamification</div>
          <h1 className="font-display font-extrabold text-2xl mt-1">Achievements &amp; Leaderboard</h1>
          <p className="text-sm text-white/70 mt-2 max-w-2xl">Earn XP for every devotional and quiz. Keep streaks, collect badges, climb the leaderboard — the Word works when you work it.</p>
        </div>
      </section>
      <div className="container-cc py-6 grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="font-display font-extrabold text-navy">Your badges</h2>
          <p className="text-sm text-muted">Progress is saved on this device (localStorage) and will sync to your account when server persistence is enabled.</p>
          <div className="mt-4">
            <BadgeGrid />
          </div>
          <div className="mt-6 card p-4">
            <h3 className="font-bold text-navy">How XP works</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li>• Read a devotional: Adults +20 XP · Teens +15 · Kiddies +10</li>
              <li>• Quiz: +20 XP per correct answer · +10 bonus for 100%</li>
              <li>• Streak: keep a daily visit — lose it if you skip a day</li>
              <li>• Level = floor(√(XP/10)) + 1 — L4 at 100 XP, L10 at 900 XP</li>
            </ul>
          </div>
        </div>
        <div>
          <LeaderboardMock audience="Adults" />
          <div className="mt-4 flex gap-2">
            <Link href="/rhapsody" className="btn btn--navy !py-2 text-xs">Continue reading →</Link>
            <Link href="/youth/rhapsody" className="btn btn--ghost !py-2 text-xs">Youth Rhapsody</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
