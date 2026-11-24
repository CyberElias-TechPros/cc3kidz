import Link from 'next/link'
export const metadata = { title: 'YOU R.I.S.E. — CC3 Youth | Evangelism & Outreach' }
export default function YouthRisePage(){
  return (<>
    <section className="bg-navy text-white border-b border-white/10"><div className="container-cc py-10"><div className="flex gap-4 max-w-4xl"><div className="hidden sm:block w-[3px] self-stretch rounded-full bg-gold" aria-hidden /><div><div className="text-xs font-semibold tracking-wide text-white/60">Youth Initiative · Evangelism</div><h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2">YOU R.I.S.E.</h1><p className="text-slate-200 mt-1 font-semibold tracking-widest uppercase text-xs">Youth Reaching Individuals, Streets, Every City & Nation</p><p className="mt-3 text-[1.02rem] leading-7 text-white/85 max-w-2xl">Global LoveWorld Youth evangelism thrust — locally expressed through CC3. Streets, campuses, cities, communities and nations.</p></div></div></div></section>
    <section className="section bg-white"><div className="container-cc grid lg:grid-cols-2 gap-6">
      <div className="card p-6"><h2 className="font-display font-extrabold text-xl text-navy">About the Initiative</h2><p className="text-sm leading-7 text-slate-600 mt-2">YOU R.I.S.E. is the Youth Ministry&apos;s mandate to advance the Gospel beyond church walls — organised, reported, and followed up. See <a href="https://ministryofteensandyouth.org/what-we-do/" target="_blank" rel="noreferrer" className="underline text-navy">global programmes</a> for model.</p><div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm"><div className="rounded-xl bg-haze p-4"><div className="text-xs font-bold text-gold">Reaching</div><div className="font-semibold text-navy">Individuals & Streets</div><div className="text-xs text-muted">One-to-one, small groups, neighbourhoods</div></div><div className="rounded-xl bg-haze p-4"><div className="text-xs font-bold text-gold">Every City & Nation</div><div className="font-semibold text-navy">Cities & Nations</div><div className="text-xs text-muted">Campaigns, partnerships, reports</div></div></div></div>
      <div className="bg-haze border border-black/5 rounded-xl p-6"><h3 className="font-display font-extrabold text-navy">Upcoming Campaigns</h3><p className="text-sm text-muted mt-1">Calendar published when authorised — check back or enquire.</p><div className="mt-4 space-y-3">
        {[
          {t:'City Outreach — Port Harcourt', d:'Neighbourhood evangelism — teams, materials, follow-up', when:'As announced'},
          {t:'Campus Campaign', d:'University outreach — students reaching students', when:'TBC'},
        ].map(c=>(
          <div key={c.t} className="bg-white border border-black/5 rounded-xl p-4 flex items-center justify-between gap-3"><div><div className="text-sm font-bold text-navy">{c.t}</div><div className="text-xs text-muted">{c.d} · {c.when}</div></div><span className="text-xs font-bold text-gold">Enquire →</span></div>
        ))}
      </div><Link href="/youth/connect" className="mt-4 btn btn--navy w-full justify-center !py-2 text-xs">Get Involved</Link></div>
    </div>
    <div className="container-cc mt-6 grid md:grid-cols-3 gap-4">
      {[
        {t:'Community Outreach', d:'Community projects linked to evangelism — serve & share.', h:'/outreach'},
        {t:'Outreach Reports', d:'Approved reports, photos, testimonies — celebrated, not exaggerated.', h:'/outreach'},
        {t:'Volunteer Interest', d:'Teams, registration, materials, briefing — authorised only.', h:'/youth/connect'},
      ].map(c=>(
        <Link key={c.t} href={c.h} className="card p-5 hover:border-gold/30 transition"><div className="text-sm font-extrabold text-navy">{c.t}</div><div className="text-sm leading-6 text-slate-600 mt-1">{c.d}</div><div className="text-xs font-bold text-gold mt-3">Explore →</div></Link>
      ))}
    </div>
    </section>
  </>)
}
