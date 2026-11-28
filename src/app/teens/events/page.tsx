import Link from 'next/link'
export const metadata = { title: 'Events — CC3 Teens | Calendar, Registration & Gallery' }
export default function TeensEventsPage(){
  const upcoming = [
    { title: 'Teens Church Special Sunday', date: 'Sundays 8AM', place: '30B Rumuokwuta', tag: 'Weekly' },
    { title: 'TeeVo Club Rally', date: 'Monthly (TBC)', place: 'Schools — as announced', tag: 'TeeVo Clubs' },
    { title: 'TITHE Outreach Campaign', date: 'As announced', place: 'Hood & Schools', tag: 'TITHE' },
  ]
  return (<>
    <section className="bg-haze border-b border-black/5"><div className="container-cc py-10"><div className="flex gap-4 max-w-4xl"><div className="hidden sm:block w-[3px] self-stretch rounded-full bg-gold" aria-hidden /><div><div className="text-xs font-semibold tracking-wide text-muted">Calendar · Registration · Gallery</div><h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2 text-navy">Events & Programmes</h1><p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Teens Church, TeeVo Clubs, TITHE, Bible study, conventions, school outreaches and creative programmes.</p></div></div></div></section>
    <section className="section bg-white"><div className="container-cc">
      <div className="flex items-baseline justify-between gap-4"><h2 className="font-display font-extrabold text-xl text-navy">Upcoming</h2><Link href="/events" className="text-xs font-bold text-gold">Main Church Events →</Link></div>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {upcoming.map(e=>(
          <div key={e.title} className="card p-5"><div className="text-xs font-bold tracking-widest uppercase text-gold">{e.tag} · {e.date}</div><div className="font-display font-extrabold text-navy mt-1 leading-tight">{e.title}</div><div className="text-xs text-muted mt-1">{e.place}</div><Link href="/teens/connect" className="mt-3 inline-flex btn btn--navy !py-2 text-xs w-full justify-center">Register Interest</Link></div>
        ))}
      </div>
      <div className="mt-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">Event Registration</h3><p className="text-sm leading-6 text-slate-600 mt-2">Registration for Teens events is supervised — minimal data, parental consent where required, and authorised handling.</p><ul className="mt-3 space-y-1 text-sm text-slate-600"><li>• Interest form → authorised contact</li><li>• Parent/guardian confirmation for U-16 where needed</li><li>• Venue & briefing details via approved channel only</li></ul><Link href="/teens/connect" className="mt-4 btn btn--navy">Enquire About Registration</Link></div>
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">Past Events & Gallery</h3><p className="text-sm text-muted mt-1">Reports, approved photos and videos — testimonies of outreach and growth.</p><div className="mt-4 grid grid-cols-3 gap-2">
          {[1,2,3,4,5,6].map(i=>(
            <div key={i} className="aspect-[4/3] rounded-lg bg-haze border border-black/5 grid place-items-center text-xs text-muted">Photo {i}</div>
          ))}
        </div><Link href="/gallery" className="mt-4 inline-flex text-xs font-bold text-gold">Full Gallery →</Link></div>
      </div>
      <p className="text-xs text-muted text-center mt-6">All events subject to leadership confirmation. Historical Zone 3 Teens stats (June 2019: 29 Teens Churches, 108 TeeVo Clubs etc.) are reference, not current CC3 figures — see <a href="https://cephzone3.org/2019/06/20/the-teens-ministry/" target="_blank" rel="noreferrer" className="underline text-navy">cephzone3.org</a></p>
    </div></section>
  </>)
}
