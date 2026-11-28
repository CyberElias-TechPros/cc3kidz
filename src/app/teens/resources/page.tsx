import Link from 'next/link'
export const metadata = { title: 'Resources — CC3 Teens | Articles, Videos, Podcasts & Downloads' }
export default function TeensResourcesPage(){
  return (<>
    <section className="bg-haze border-b border-black/5"><div className="container-cc py-10"><div className="flex gap-4 max-w-4xl"><div className="hidden sm:block w-[3px] self-stretch rounded-full bg-gold" aria-hidden /><div><div className="text-xs font-semibold tracking-wide text-muted">Resources · Articles · Media</div><h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2 text-navy">Resources</h1><p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Articles, videos, podcasts, downloads and devotionals — curated for teenagers, rooted in the Word.</p></div></div></div></section>
    <section className="section bg-white"><div className="container-cc">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {t:'Articles', d:'Short reads on faith, identity, purpose, friendships & school — with Scripture.', h:'/teens/resources'},
          {t:'Videos', d:'Teachings, testimonies, outreach highlights — approved media only.', h:'/media'},
          {t:'Podcasts', d:'Audio messages & lessons — listen on the go (coming soon).', h:'/media'},
          {t:'Downloads', d:'Study guides, reading plans, printables — free, approved, practical.', h:'/teens/resources'},
        ].map(c=>(
          <Link key={c.t} href={c.h} className="card p-5 hover:border-gold/30 transition"><div className="text-sm font-extrabold text-navy">{c.t}</div><div className="text-sm leading-6 text-slate-600 mt-1">{c.d}</div><div className="text-xs font-bold text-gold mt-3">Open →</div></Link>
        ))}
      </div>
      <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">Devotional Resources</h3><p className="text-sm leading-6 text-slate-600 mt-2">Official devotionals: <a href="https://teevo.org" target="_blank" rel="noreferrer" className="underline text-navy">TeeVo</a> (teens) & <a href="https://rhapsodyofrealities.org" target="_blank" rel="noreferrer" className="underline text-navy">Rhapsody of Realities</a> — link, don&apos;t republish. Pastors&apos; teachings via <a href="https://pcdl.co" target="_blank" rel="noreferrer" className="underline text-navy">PCDL</a>.</p><div className="mt-4 flex flex-wrap gap-2 text-xs"><a href="https://teevo.org" target="_blank" rel="noreferrer" className="btn btn--gold !py-2">TeeVo →</a><a href="https://rhapsodyofrealities.org" target="_blank" rel="noreferrer" className="btn btn--ghost !py-2">Rhapsody →</a></div></div>
        <div className="card p-5"><h3 className="font-display font-extrabold text-navy">Need something specific?</h3><p className="text-sm text-muted mt-1">Search the whole church library or talk to a coordinator.</p><div className="mt-3 flex gap-2"><Link href="/search" className="btn btn--ghost !py-2">Search Library</Link><Link href="/teens/connect" className="btn btn--navy !py-2">Ask</Link></div></div>
      </div>
    </div></section>
  </>)
}
