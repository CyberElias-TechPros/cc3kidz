import Link from 'next/link'
import { getTodayDevotional, getRecentByAudience } from '@/lib/rhapsody/store'
import { RhapsodyCard } from '@/components/rhapsody/RhapsodyCard'
import { GamificationBar, StreakWidget } from '@/components/rhapsody/GamificationBar'

export const metadata = { title: 'Rhapsody of Realities — Youth Church | Daily Devotional 20–35' }

export default function Page() {
  const today = getTodayDevotional('adults')
  const recent = getRecentByAudience('adults', 6)
  return (
    <div className="min-h-screen bg-haze">
      <section className="bg-[#101A2B] text-white">
        <div className="container-cc py-10">
          <div className="flex gap-4 max-w-4xl">
            <div className="hidden sm:block w-[3px] self-stretch rounded-full bg-gold" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-white/60">Youth Church · 20–35 · Rhapsody of Realities</div>
              <h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2">Rhapsody — Youth Edition</h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-white/85 max-w-2xl">
                The same adult Rhapsody of Realities, curated for young adults — your daily supply for purpose, faith and leadership. Source: LoveWorld Publishing.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <a href="https://rhapsodyofrealities.org" target="_blank" rel="noreferrer" className="btn bg-gold text-navy !py-2">Open Official →</a>
                <Link href="/youth/word" className="btn bg-white/10 border border-white/20 text-white !py-2">Word & Spirit</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container-cc py-6"><GamificationBar church="youth" /></div>
      {today && (
        <section className="container-cc pb-6">
          <div className="grid lg:grid-cols-[1.5fr_0.7fr] gap-6">
            <div className="card p-6 border-gold/20">
              <div className="text-xs font-bold tracking-widest uppercase text-gold">Today — {today.date}</div>
              <h2 className="font-display font-extrabold text-xl mt-1 text-navy">{today.title}</h2>
              <div className="text-sm text-muted mt-1">{today.scriptureReference}</div>
              <p className="text-sm leading-6 text-slate-600 mt-3">“{today.scripture.slice(0, 180)}…”</p>
              <p className="text-sm leading-6 text-slate-600 mt-2">{today.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/youth/rhapsody/${today.slug}`} className="btn btn--navy !py-2 text-xs">Read Today →</Link>
                <Link href={`/youth/rhapsody/quiz/${today.slug}`} className="btn btn--gold !py-2 text-xs">Take Quiz (+100 XP)</Link>
              </div>
            </div>
            <div className="space-y-4"><StreakWidget /></div>
          </div>
        </section>
      )}
      <section className="container-cc pb-8">
        <h2 className="font-display font-extrabold text-navy">Recent</h2>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {recent.map(d => <RhapsodyCard key={d.slug} d={d} href={`/youth/rhapsody/${d.slug}`} />)}
        </div>
      </section>
    </div>
  )
}
