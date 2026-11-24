import Link from 'next/link'
export const metadata = { title: 'Word & Spiritual Growth — CC3 Youth | Rhapsody, Messages & Bible Study' }
export default function YouthWordPage(){
  return (<>
    <section className="bg-haze border-b border-black/5"><div className="container-cc py-10"><div className="flex gap-4 max-w-4xl"><div className="hidden sm:block w-[3px] self-stretch rounded-full bg-navy" aria-hidden /><div><div className="text-xs font-semibold tracking-wide text-muted">Word · Rhapsody · Prayer</div><h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2 text-navy">Word & Spiritual Growth</h1><p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Rhapsody of Realities, messages, Bible study, prayer and growth pathways — your daily supply as a young adult.</p></div></div></div></section>
    <section className="section bg-white"><div className="container-cc grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
      <div className="space-y-6">
        <div className="card p-6 border-gold/20"><div className="text-xs font-bold tracking-widest uppercase text-gold">Rhapsody of Realities — Daily</div><h2 className="font-display font-extrabold text-xl mt-1 text-navy">Your Daily Devotional</h2><p className="text-sm leading-6 text-slate-600 mt-2">Global devotional in 8,300+ languages. Read, confess, live it. Link — don&apos;t republish.</p><div className="mt-4 flex flex-wrap gap-2"><a href="https://rhapsodyofrealities.org" target="_blank" rel="noreferrer" className="btn btn--gold">Open Rhapsody →</a><Link href="/youth/word" className="btn btn--ghost">Reading Plans</Link></div></div>
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">Message Library</h3><p className="text-sm leading-6 text-slate-600 mt-2">Sunday teachings, midweek, youth conferences, specials — audio, video, series & notes.</p><div className="mt-3 grid sm:grid-cols-2 gap-2 text-sm"><Link href="/media" className="rounded-xl bg-haze border border-black/5 p-3 hover:border-gold/30">Sermons →</Link><a href="https://pcdl.co" target="_blank" rel="noreferrer" className="rounded-xl bg-haze border border-black/5 p-3 hover:border-gold/30">PCDL →</a></div></div>
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">Bible Study</h3><div className="mt-4 grid sm:grid-cols-2 gap-3">
          {[
            {t:'New Creation Realities', d:'Identity, righteousness, inheritance — who you are in Christ.'},
            {t:'Faith & The Word', d:'Living by faith, confession, results — practical Christianity.'},
            {t:'Holy Spirit & Prayer', d:'Fellowship, gifts, prevailing prayer — make power available.'},
            {t:'Purpose & Calling', d:'Gifts, calling, career vs calling, influence — find your path.'},
          ].map(c=>(
            <div key={c.t} className="rounded-xl border border-black/5 p-4 bg-haze"><div className="text-sm font-bold text-navy">{c.t}</div><div className="text-xs leading-5 text-slate-600 mt-1">{c.d}</div></div>
          ))}
        </div></div>
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">Prayer Centre & Growth Pathways</h3><p className="text-sm leading-6 text-slate-600 mt-2">Prayer meetings, campaigns, testimonies; Foundations → Word → Fellowship → Service → Evangelism → Leadership.</p><div className="mt-3 flex flex-wrap gap-2"><Link href="/prayer" className="btn btn--navy !py-2 text-xs">Prayer</Link><Link href="/foundation-school" className="btn btn--ghost !py-2 text-xs">Foundation School</Link></div></div>
      </div>
      <div className="space-y-4">
        <div className="card p-5"><h3 className="font-display font-extrabold text-navy">Bible Reading Plans</h3><ul className="mt-3 space-y-2 text-sm text-slate-600"><li>• Foundations of Faith (30 days)</li><li>• Understanding the Word</li><li>• Fellowship with the Holy Spirit</li><li>• Christian Service & Evangelism</li></ul><Link href="/resources" className="mt-3 btn btn--ghost w-full justify-center !py-2 text-xs">Browse Resources</Link></div>
        <div className="card p-5 bg-navy text-white"><h3 className="font-display font-extrabold">Need mentoring?</h3><p className="text-sm text-white/80 mt-1">Ask via your youth cell leader — not public DMs.</p><Link href="/youth/connect" className="mt-3 btn bg-white text-navy w-full justify-center !py-2 text-xs">Connect</Link></div>
      </div>
    </div></section>
  </>)
}
