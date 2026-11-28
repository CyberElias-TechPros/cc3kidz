import Link from 'next/link'
export const metadata = { title: 'Community — CC3 Youth | Cells, Fellowship & Professional Groups' }
export default function YouthCommunityPage(){
  return (<>
    <section className="bg-haze border-b border-black/5"><div className="container-cc py-10"><div className="flex gap-4 max-w-4xl"><div className="hidden sm:block w-[3px] self-stretch rounded-full bg-navy" aria-hidden /><div><div className="text-xs font-semibold tracking-wide text-muted">Community · Fellowship · Cells</div><h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2 text-navy">Community</h1><p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Youth cells, fellowship groups, departments, campus & graduate connections — find your people, no private-data exposure.</p></div></div></div></section>
    <section className="section bg-white"><div className="container-cc grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {t:'Youth Cells', d:'Weekly fellowship — prayer, Word, follow-up. Join via authorised leaders.', h:'/cells'},
            {t:'Fellowship Groups', d:'Interest/age-based fellowship beyond Sunday.', h:'/cells'},
            {t:'Ministry Departments', d:'Choir, media, ushering, evangelism — serve with excellence.', h:'/ministries'},
            {t:'Young Professionals', d:'Workplace fellowship, mentorship, excellence.', h:'/cells'},
            {t:'Campus Connections', d:'Students — stay rooted away from home.', h:'/group'},
            {t:'Graduate Connections', d:'LoveWorld Graduate Network — connect & build (global).', h:'https://ministryofteensandyouth.org', ext:true},
          ].map(c=>(
            <Link key={c.t} href={c.h} target={(c as any).ext ? '_blank' : undefined} rel={(c as any).ext ? 'noreferrer' : undefined} className="card p-5 hover:border-gold/30 transition"><div className="text-sm font-extrabold text-navy">{c.t}</div><div className="text-sm leading-6 text-slate-600 mt-1">{c.d}</div><div className="text-xs font-bold text-gold mt-2">{(c as any).ext ? 'External →' : 'Explore →'}</div></Link>
          ))}
        </div>
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">Joining a Cell</h3><p className="text-sm leading-6 text-slate-600 mt-2">Share minimal info via <Link href="/youth/connect" className="underline text-navy">Connect</Link> — you&apos;ll be linked to a nearby youth cell. No addresses or member lists published; access via authorised channels.</p></div>
      </div>
      <div className="space-y-4">
        <div className="card p-5"><h3 className="font-display font-extrabold text-navy">Find Your Community</h3><p className="text-sm text-muted mt-1">Tell us your campus/work area & interests — we match you.</p><Link href="/youth/connect" className="mt-3 btn btn--navy w-full justify-center">Join a Cell →</Link></div>
        <div className="card p-5 bg-navy text-white"><h3 className="font-display font-extrabold">Safeguarding</h3><p className="text-sm text-white/80 mt-1">Adult-supervised, respectful community. Concerns → Group Pastor / Zonal office.</p><Link href="/safeguarding" className="mt-2 text-xs font-bold text-gold underline">Safeguarding →</Link></div>
      </div>
    </div></section>
  </>)
}
