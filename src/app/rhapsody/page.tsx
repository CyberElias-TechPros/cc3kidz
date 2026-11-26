import Link from 'next/link'
import { getTodayDevotional, getRecentByAudience, getEditions } from '@/lib/rhapsody/store'
import { RhapsodyCard } from '@/components/rhapsody/RhapsodyCard'
import { GamificationBar, StreakWidget } from '@/components/rhapsody/GamificationBar'

export const metadata = { title: 'Rhapsody of Realities — CC3 Main Church | Daily Word' }

export default function RhapsodyPage() {
  const today = getTodayDevotional('adults')
  const recent = getRecentByAudience('adults', 6)
  const editions = getEditions('adults').slice(0, 6)

  return (
    <div className="min-h-screen bg-haze">
      <section className="bg-navy text-white border-b border-white/10">
        <div className="container-cc py-10">
          <div className="flex gap-4 max-w-4xl">
            <div className="hidden sm:block w-[3px] self-stretch rounded-full bg-gold" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-white/60">Main Church · Youth · Rhapsody of Realities</div>
              <h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2">Rhapsody of Realities</h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-white/85 max-w-2xl">
                Your daily devotional by Pastor Chris Oyakhilome — adult edition for Main Church and Youth. Read, confess, live it. Source: Rhapsody of Realities, LoveWorld Publishing.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <a href="https://rhapsodyofrealities.org" target="_blank" rel="noreferrer" className="btn bg-gold text-navy !py-2">Open Official →</a>
                <Link href="/youth/word" className="btn bg-white/10 border border-white/20 text-white !py-2">Youth Word Centre</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-cc py-6">
        <GamificationBar church="main" />
      </div>

      {today && (
        <section className="container-cc pb-6">
          <div className="grid lg:grid-cols-[1.5fr_0.7fr] gap-6">
            <div className="card p-6 border-gold/20">
              <div className="text-xs font-bold tracking-widest uppercase text-gold">Today — {today.date} · {today.weekday}</div>
              <h2 className="font-display font-extrabold text-xl mt-1 text-navy">{today.title}</h2>
              <div className="text-sm text-muted mt-1">{today.scriptureReference}</div>
              <p className="text-sm leading-6 text-slate-600 mt-3">“{today.scripture.slice(0, 200)}…”</p>
              <p className="text-sm leading-6 text-slate-600 mt-2">{today.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/rhapsody/${today.slug}`} className="btn btn--navy !py-2 text-xs">Read Today →</Link>
                <Link href={`/rhapsody/quiz/${today.slug}`} className="btn btn--gold !py-2 text-xs">Take Quiz (+100 XP)</Link>
              </div>
            </div>
            <div className="space-y-4">
              <StreakWidget />
              <div className="card p-4">
                <div className="text-xs font-bold tracking-widest uppercase text-navy">Editions</div>
                <div className="mt-2 space-y-2">
                  {editions.map((e) => (
                    <div key={e.edition} className="flex items-center justify-between rounded-xl bg-haze p-3 text-xs">
                      <span className="font-bold text-navy">{e.title}</span>
                      <span className="text-muted">{e.count} days</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="container-cc pb-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-extrabold text-navy">Recent devotionals</h2>
          <Link href="/rhapsody/archive" className="text-xs font-bold text-gold">View archive →</Link>
        </div>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {recent.map((d) => (
            <RhapsodyCard key={d.slug} d={d} href={`/rhapsody/${d.slug}`} />
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-black/5">
        <div className="container-cc py-6 grid md:grid-cols-3 gap-4">
          {[
            { t: 'Bible Reading Plans', d: '1-Year & 2-Year plans from every devotional — track locally.', h: '/rhapsody' },
            { t: 'Share the Word', d: 'WhatsApp, copy, verse image — your light in your sphere.', h: '/rhapsody' },
            { t: 'How to Use', d: 'Read, meditate, confess aloud, act — then teach someone.', h: '/rhapsody' },
          ].map((c) => (
            <div key={c.t} className="rounded-xl border border-black/5 p-4 bg-haze">
              <div className="text-sm font-extrabold text-navy">{c.t}</div>
              <div className="text-sm leading-6 text-slate-600 mt-1">{c.d}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
