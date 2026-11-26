import Link from 'next/link'
import { getTodayDevotional, getRecentByAudience } from '@/lib/rhapsody/store'
import { RhapsodyCard } from '@/components/rhapsody/RhapsodyCard'
import { GamificationBar } from '@/components/rhapsody/GamificationBar'
export const metadata = { title: 'Grow in the Word — CC3 Teens | TeeVo & Bible Study' }
export default function TeensWordPage(){
  const today = getTodayDevotional('teens')
  const recent = getRecentByAudience('teens', 4)
  return (<>
    <section className="bg-haze border-b border-black/5"><div className="container-cc py-10"><div className="flex gap-4 max-w-4xl"><div className="hidden sm:block w-[3px] self-stretch rounded-full bg-gold" aria-hidden /><div><div className="text-xs font-semibold tracking-wide text-muted">Word · TeeVo · 13–19 · Pastor Binta Alex</div><h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2 text-navy">Grow in the Word</h1><p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Daily TeeVo, Bible study, reading plans, messages, quizzes and Word challenges — not just information, transformation. Pastored by Pastor Binta Alex.</p></div></div></div></section>
    <div className="container-cc pt-6"><GamificationBar church="teens" /></div>
    {today && (
      <section className="container-cc py-6">
        <div className="card p-6 border-gold/20 bg-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-gold">TeeVo Today — {today.date} · {today.weekday}</div>
              <h2 className="font-display font-extrabold text-xl mt-1 text-navy">{today.title}</h2>
              {today.subtitle && <div className="text-sm text-muted italic">{today.subtitle}</div>}
              <div className="text-xs text-muted mt-1">{today.scriptureReference} · {today.editionTitle}</div>
              <p className="text-sm leading-6 text-slate-600 mt-2">“{today.scripture.slice(0, 160)}…”</p>
              <p className="text-sm leading-6 text-slate-600 mt-2">{today.excerpt}</p>
            </div>
            <div className="hidden sm:block text-3xl">📖</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={`/teens/rhapsody/${today.slug}`} className="btn btn--navy !py-2 text-xs">Read TeeVo Today →</Link>
            <Link href={`/teens/rhapsody/quiz/${today.slug}`} className="btn btn--gold !py-2 text-xs">Take Quiz (+100 XP)</Link>
            <Link href="/teens/rhapsody" className="btn btn--ghost !py-2 text-xs">All TeeVo →</Link>
          </div>
          <p className="text-xs text-muted mt-2">Source: {today.series} by Pastor Chris Oyakhilome · LoveWorld Publishing · Also at <a href="https://teevo.org" target="_blank" rel="noreferrer" className="underline text-navy">teevo.org</a></p>
        </div>
        <div className="mt-6">
          <h3 className="font-display font-extrabold text-navy">Recent TeeVo</h3>
          <div className="mt-3 grid md:grid-cols-2 gap-3">
            {recent.map(d => <RhapsodyCard key={d.slug} d={d} href={`/teens/rhapsody/${d.slug}`} compact />)}
          </div>
        </div>
      </section>
    )}
    <section className="section bg-white"><div className="container-cc grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
      <div className="space-y-6">
        <div className="card p-6 border-gold/20"><div className="text-xs font-bold tracking-widest uppercase text-gold">TeeVo Today</div><h2 className="font-display font-extrabold text-xl mt-1 text-navy">Daily TeeVo</h2><p className="text-sm leading-6 text-slate-600 mt-2">The official LoveWorld devotional for teenagers — scripture, message, prayer and confession. Integrated here from Rhapsody of Realities for Teens with quiz & gamification. Live in CC3.</p><div className="mt-4 flex flex-wrap gap-2"><Link href="/teens/rhapsody" className="btn btn--gold">Open TeeVo →</Link><Link href="/teens/resources" className="btn btn--ghost">Related Resources</Link></div><p className="text-xs text-muted mt-2">Source: <a href="https://teevo.org" target="_blank" rel="noreferrer" className="underline text-navy">teevo.org</a> · Corpus: rhapsody-blog on GitHub (853 devotionals)</p></div>
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">Bible Study & Reading Plans</h3><div className="mt-4 grid sm:grid-cols-2 gap-3">
          {[
            {t:'30 Days in the Word', d:'Foundational reading through key scriptures — start here.'},
            {t:'Identity in Christ', d:'Who you are in Christ — righteousness, new creation realities.'},
            {t:'The Holy Spirit', d:'Person, fellowship and gifts — walking in the Spirit.'},
            {t:'Faith & Christian Living', d:'Living by faith, choice, character and purpose.'},
          ].map(c=>(
            <div key={c.t} className="rounded-xl border border-black/5 p-4 bg-haze"><div className="text-sm font-bold text-navy">{c.t}</div><div className="text-xs leading-5 text-slate-600 mt-1">{c.d}</div><Link href="/teens/word" className="mt-2 inline-block text-xs font-bold text-gold">Study →</Link></div>
          ))}
        </div><div className="mt-3 text-xs text-muted">Reading plans are proposed local implementations — content uses approved LoveWorld materials.</div></div>
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">Messages & Teachings</h3><p className="text-sm leading-6 text-slate-600 mt-2">Approved Teens Church teachings — audio, video, series, playlists and notes with Scripture references.</p><div className="mt-3 grid sm:grid-cols-2 gap-2 text-sm">
          <Link href="/media" className="rounded-xl bg-haze border border-black/5 p-3 hover:border-gold/30">Sermons & Teachings →</Link>
          <Link href="https://pcdl.co" target="_blank" rel="noreferrer" className="rounded-xl bg-haze border border-black/5 p-3 hover:border-gold/30">PCDL →</Link>
        </div></div>
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">Bible Quizzes & Word Challenges</h3><p className="text-sm leading-6 text-slate-600 mt-2">Weekly memory verse, knowledge quizzes and application tasks — alone or in your TeeVo Club.</p><Link href="/teens/resources" className="mt-3 inline-flex btn btn--navy !py-2 text-xs">Take a Quiz</Link></div>
      </div>
      <div className="space-y-4">
        <div className="card p-5"><h3 className="font-display font-extrabold text-navy">Start here</h3><ul className="mt-3 space-y-2 text-sm text-slate-600"><li>1. Read today&apos;s <a href="https://teevo.org" target="_blank" rel="noreferrer" className="underline text-navy">TeeVo</a></li><li>2. Study one topic (15 mins)</li><li>3. Share one insight with a friend</li><li>4. Join <Link href="/teens/activities" className="underline text-navy">TeeVo Club</Link> this week</li></ul></div>
        <div className="card p-5 bg-navy text-white"><h3 className="font-display font-extrabold">Need help?</h3><p className="text-sm text-white/80 mt-1">Ask your Teens Church coordinator or use our moderated enquiry — no DMs.</p><Link href="/teens/connect" className="mt-3 btn bg-white text-navy w-full justify-center !py-2 text-xs">Ask a Question</Link></div>
      </div>
    </div></section>
  </>)
}
