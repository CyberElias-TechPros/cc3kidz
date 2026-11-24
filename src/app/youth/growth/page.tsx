import Link from 'next/link'
export const metadata = { title: 'Growth & Development — CC3 Youth | Purpose, Career & Leadership' }
export default function YouthGrowthPage(){
  return (<>
    <section className="bg-haze border-b border-black/5"><div className="container-cc py-10"><div className="flex gap-4 max-w-4xl"><div className="hidden sm:block w-[3px] self-stretch rounded-full bg-navy" aria-hidden /><div><div className="text-xs font-semibold tracking-wide text-muted">Growth · Purpose · Excellence</div><h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2 text-navy">Growth & Development</h1><p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Purpose & calling, leadership, career, entrepreneurship, personal and digital skills — not a secular career site, kingdom excellence applied.</p></div></div></div></section>
    <section className="section bg-white"><div className="container-cc">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {t:'Purpose & Calling', d:'Discover calling, gifts, influence — God&apos;s plan for your life.', h:'/youth/growth'},
          {t:'Leadership', d:'Personal, team, ministry leadership — responsibility & service.', h:'/ministries'},
          {t:'Career & Professional', d:'CV, interviews, workplace conduct — excellence at work.', h:'/resources'},
          {t:'Entrepreneurship', d:'Business building, stewardship — create, provide, prosper.', h:'/resources'},
          {t:'Personal Development', d:'Communication, time, productivity — master yourself.', h:'/resources'},
          {t:'Creative & Digital Skills', d:'Film, design, writing, tech — Creators Connect spirit.', h:'/youth/media'},
          {t:'Campus & Transition', d:'University to workplace — stay rooted, stay excellent.', h:'/youth/community'},
          {t:'Excellence', d:'Quality of work — representing Christ well, always.', h:'/media'},
        ].map(c=>(
          <Link key={c.t} href={c.h} className="card p-5 hover:border-gold/30 transition"><div className="text-sm font-extrabold text-navy">{c.t}</div><div className="text-sm leading-6 text-slate-600 mt-1">{c.d}</div></Link>
        ))}
      </div>
      <div className="mt-8 p-5 rounded-xl bg-haze border border-black/5 flex flex-col md:flex-row items-center justify-between gap-4"><div><div className="font-display font-extrabold text-navy">Proposed local programmes — launching with approval</div><div className="text-sm text-muted">Only live, leadership-approved CC3 programmes appear here. Others are blueprint, not live.</div></div><Link href="/youth/connect" className="btn btn--navy">Enquire About Programmes</Link></div>
    </div></section>
  </>)
}
