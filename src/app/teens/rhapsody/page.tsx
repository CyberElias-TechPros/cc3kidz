import Link from 'next/link'
import { getTodayDevotional, getRecentByAudience } from '@/lib/rhapsody/store'
import { RhapsodyCard } from '@/components/rhapsody/RhapsodyCard'
import { GamificationBar, StreakWidget } from '@/components/rhapsody/GamificationBar'
import { CHURCH_LEADERS } from '@/lib/rhapsody/audiences'

export const metadata = { title: 'TeeVo — Daily Devotional for Teens | CC3 Teens Church' }

export default function TeensRhapsodyPage() {
  const today = getTodayDevotional('teens')
  const recent = getRecentByAudience('teens', 6)

  return (
    <div className="min-h-screen bg-haze">
      <section className="bg-[#172B76] text-white">
        <div className="container-cc py-10">
          <div className="flex gap-4 max-w-4xl">
            <div className="hidden sm:block w-[3px] self-stretch rounded-full bg-gold" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-white/60">Teens Church · TeeVo · 13–19</div>
              <h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2">TeeVo Daily</h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-white/85 max-w-2xl">
                TeeVo — Rhapsody of Realities for Teens by Pastor Chris Oyakhilome. Your daily Word, Speak & Act, with quiz and XP. Pastored by {CHURCH_LEADERS.teens.name}.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <a href="https://teevo.org" target="_blank" rel="noreferrer" className="btn bg-gold text-navy !py-2">teevo.org →</a>
                <Link href="/teens/word" className="btn bg-white/10 border border-white/20 text-white !py-2">Word Centre</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-cc py-6">
        <GamificationBar church="teens" />
      </div>

      {/* Pastor highlight */}
      <div className="container-cc">
        <div className="card p-4 flex items-center gap-4 bg-white border-gold/20">
          <div className="h-12 w-12 rounded-full bg-navy grid place-items-center text-white font-black">BA</div>
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-gold">{CHURCH_LEADERS.teens.title}</div>
            <div className="font-display font-extrabold text-navy">{CHURCH_LEADERS.teens.name}</div>
            <div className="text-xs text-muted">{CHURCH_LEADERS.teens.church}</div>
          </div>
          <Link href="/teens/about" className="ml-auto btn btn--ghost !py-2 text-xs hidden sm:inline-flex">Meet Pastor →</Link>
        </div>
      </div>

      {today && (
        <section className="container-cc py-6">
          <div className="grid lg:grid-cols-[1.5fr_0.7fr] gap-6">
            <div className="card p-6 border-gold/20">
              <div className="text-xs font-bold tracking-widest uppercase text-gold">Today — {today.date} · {today.weekday}</div>
              <h2 className="font-display font-extrabold text-xl mt-1 text-navy">{today.title}</h2>
              {today.subtitle && <div className="text-sm text-muted italic">{today.subtitle}</div>}
              <div className="text-sm text-muted mt-1">{today.scriptureReference}</div>
              <p className="text-sm leading-6 text-slate-600 mt-3">“{today.scripture.slice(0, 180)}…”</p>
              <p className="text-sm leading-6 text-slate-600 mt-2">{today.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/teens/rhapsody/${today.slug}`} className="btn bg-[#172B76] text-white !py-2 text-xs">Read TeeVo Today →</Link>
                <Link href={`/teens/rhapsody/quiz/${today.slug}`} className="btn btn--gold !py-2 text-xs">Take Quiz (+100 XP)</Link>
              </div>
            </div>
            <div className="space-y-4">
              <StreakWidget />
              <div className="card p-4 bg-[#172B76] text-white">
                <div className="text-xs font-bold tracking-widest uppercase text-gold">This week in TeeVo</div>
                <ul className="mt-2 space-y-1 text-sm text-white/80">
                  <li>• Speak — declare the Word</li>
                  <li>• Act — do what the Word says</li>
                  <li>• Quiz — prove you understood</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="container-cc pb-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-extrabold text-navy">Recent TeeVo</h2>
          <Link href="/teens/rhapsody/archive" className="text-xs font-bold text-gold">Archive →</Link>
        </div>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {recent.map((d) => <RhapsodyCard key={d.slug} d={d} href={`/teens/rhapsody/${d.slug}`} />)}
        </div>
      </section>
    </div>
  )
}
