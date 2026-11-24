import Link from 'next/link'
export const metadata = { title: 'Our Activities — CC3 Teens | TeeVo Clubs, TITHE & Fellowship' }
export default function TeensActivitiesPage(){
  return (<>
    <section className="bg-haze border-b border-black/5"><div className="container-cc py-10"><div className="flex gap-4 max-w-4xl"><div className="hidden sm:block w-[3px] self-stretch rounded-full bg-gold" aria-hidden /><div><div className="text-xs font-semibold tracking-wide text-muted">Activities · Outreach · Fellowship</div><h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2 text-navy">Our Activities</h1><p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">TeeVo Clubs, TITHE, fellowship, prayer and school outreaches — where faith becomes action.</p></div></div></div></section>
    <section className="section bg-white"><div className="container-cc grid lg:grid-cols-2 gap-6">
      <div className="bg-navy text-white rounded-xl p-6"><div className="text-xs font-bold tracking-widest uppercase text-gold">TeeVo Clubs</div><h3 className="font-display font-extrabold text-xl mt-1">In Schools, For Schools</h3><p className="text-sm leading-6 text-white/80 mt-2">TeeVo Clubs bring TeeVo to teenagers where they already are — schools and neighbourhoods. Bible study, discussion, prayer and outreach planning.</p><ul className="mt-3 space-y-1 text-sm text-white/80"><li>• Weekly Bible study & discussion</li><li>• Supervised, authorised coordinators</li><li>• No published student lists — privacy first</li></ul><div className="mt-4 flex gap-2"><Link href="/teens/connect" className="btn bg-gold text-navy !py-2 text-xs">Find / Start a Club</Link><a href="https://ministryofteensandyouth.org/what-we-do/" target="_blank" rel="noreferrer" className="btn bg-white/10 border border-white/20 text-white !py-2 text-xs">Global Model →</a></div><p className="text-xs text-white/50 mt-3">Historical Zone 3: 108 TeeVo Clubs reported June 2019 — reference, not current CC3 stat.</p></div>
      <div className="bg-white border border-black/5 rounded-xl p-6"><div className="text-xs font-bold tracking-widest uppercase text-vermilion">TITHE — Teens in the Hood</div><h3 className="font-display font-extrabold text-xl mt-1 text-navy">Every Teen a Soul Winner</h3><p className="text-sm leading-6 text-slate-600 mt-2">Global Teens Ministry evangelism — teens reaching teens in neighbourhoods and schools.</p><ul className="mt-3 space-y-1 text-sm text-slate-600"><li>• Street & school outreaches</li><li>• Campaigns, follow-up, reports</li><li>• Approved photos & testimonies only</li></ul><div className="mt-4 flex gap-2"><Link href="/outreach" className="btn btn--navy !py-2 text-xs">Outreach Reports</Link><Link href="/teens/connect" className="btn btn--ghost !py-2 text-xs">Join Outreach</Link></div></div>
    </div>
    <div className="container-cc mt-6 grid md:grid-cols-4 gap-4">
      {[
        {t:'Teens Fellowship', d:'Regular fellowship beyond Sunday — connect, grow, celebrate.', h:'/teens/events'},
        {t:'Prayer Meetings', d:'Cell prayer chains, special prayer as announced — We make power available.', h:'/prayer'},
        {t:'School Activities', d:'Outreaches, projects, Bible quizzes — coordinated with schools.', h:'/teens/activities'},
        {t:'Special Programs', d:'Conventions, conferences, holiday & creative programmes.', h:'/teens/events'},
      ].map(c=>(
        <Link key={c.t} href={c.h} className="card p-5 hover:border-gold/30 transition"><div className="text-sm font-extrabold text-navy">{c.t}</div><div className="text-sm leading-6 text-slate-600 mt-1">{c.d}</div><div className="text-xs font-bold text-gold mt-2">Explore →</div></Link>
      ))}
    </div>
    </section>
  </>)
}
