import Link from 'next/link'
export const metadata = { title: 'Events — CC3 Youth | Conferences, Workshops & Calendar' }
export default function YouthEventsPage(){
  const upcoming = [
    { title: 'Youth Church Service', date: 'Sundays (TBC)', place: 'CC3 Group Church', tag: 'Weekly' },
    { title: 'Leadership Workshop', date: 'Quarterly (TBC)', place: 'As announced', tag: 'Leadership' },
    { title: 'YOU R.I.S.E. Campaign', date: 'As announced', place: 'Port Harcourt — streets & campuses', tag: 'Outreach' },
  ]
  return (<>
    <section className="bg-haze border-b border-black/5"><div className="container-cc py-10"><div className="flex gap-4 max-w-4xl"><div className="hidden sm:block w-[3px] self-stretch rounded-full bg-navy" aria-hidden /><div><div className="text-xs font-semibold tracking-wide text-muted">Events · Conferences · Workshops</div><h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2 text-navy">Events</h1><p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Youth services, conferences, YOU R.I.S.E., leadership training, career & creative workshops — all with registration & reports.</p></div></div></div></section>
    <section className="section bg-white"><div className="container-cc">
      <div className="flex items-baseline justify-between gap-4"><h2 className="font-display font-extrabold text-xl text-navy">Upcoming</h2><Link href="/events" className="text-xs font-bold text-gold">Main Events →</Link></div>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {upcoming.map(e=>(
          <div key={e.title} className="card p-5"><div className="text-xs font-bold tracking-widest uppercase text-gold">{e.tag} · {e.date}</div><div className="font-display font-extrabold text-navy mt-1 leading-tight">{e.title}</div><div className="text-xs text-muted mt-1">{e.place}</div><Link href="/youth/connect" className="mt-3 inline-flex btn btn--navy !py-2 text-xs w-full justify-center">Register Interest</Link></div>
        ))}
      </div>
      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">Calendar & Registration</h3><p className="text-sm leading-6 text-slate-600 mt-2">Full calendar with pages, registration, directions, programme & post-event media. Registration via approved channels.</p><ul className="mt-3 space-y-1 text-sm text-slate-600"><li>• Conference pages with programme</li><li>• Workshops — career, business, creative, leadership</li><li>• Special meetings & outreach campaigns</li></ul></div>
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">Past Events & Gallery</h3><p className="text-sm text-muted mt-1">Approved photos, videos & reports.</p><div className="mt-4 grid grid-cols-3 gap-2">{[1,2,3,4,5,6].map(i=>(<div key={i} className="aspect-[4/3] rounded-lg bg-haze border border-black/5 grid place-items-center text-xs text-muted">Photo {i}</div>))}</div></div>
      </div>
    </div></section>
  </>)
}
