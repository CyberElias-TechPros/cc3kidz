import Link from 'next/link'
import { BadgeGrid, LeaderboardMock } from '@/components/rhapsody/Leaderboard'

export const metadata = { title: 'Achievements & Leaderboard — Youth Rhapsody | 20–35 XP' }

export default function YouthAchievementsPage() {
  return (
    <div className="min-h-screen bg-haze">
      <section className="bg-[#101A2B] text-white">
        <div className="container-cc py-8">
          <div className="text-xs font-bold tracking-widest uppercase text-gold">Youth Gamification · Rhapsody 20–35</div>
          <h1 className="font-display font-extrabold text-2xl mt-1">Your Achievements &amp; Leaderboard</h1>
          <p className="text-sm text-white/70 mt-2 max-w-2xl">Earn XP for every devotional and quiz. Keep streaks, collect badges, climb the youth leaderboard — the Word works when you work it.</p>
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
              <li>• Read a devotional: +20 XP</li>
              <li>• Quiz: +20 XP per correct answer · +10 bonus for 100%</li>
              <li>• Streak: keep a daily visit — lose it if you skip a day</li>
              <li>• Level = floor(√(XP/10)) + 1 — L4 at 100 XP, L10 at 900 XP</li>
            </ul>
          </div>
        </div>
        <div>
          <LeaderboardMock audience="Youth" />
          <div className="mt-4 flex gap-2">
            <Link href="/youth/rhapsody" className="btn btn--navy !py-2 text-xs">Continue reading →</Link>
            <Link href="/rhapsody/achievements" className="btn btn--ghost !py-2 text-xs">Main leaderboard</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
