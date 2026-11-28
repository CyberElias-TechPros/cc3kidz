import Link from 'next/link'
export const metadata = { title: 'Connect — CC3 Teens | Join, Find a Club & Parent Info' }
export default function TeensConnectPage(){
  return (<>
    <section className="bg-haze border-b border-black/5"><div className="container-cc py-10"><div className="flex gap-4 max-w-4xl"><div className="hidden sm:block w-[3px] self-stretch rounded-full bg-gold" aria-hidden /><div><div className="text-xs font-semibold tracking-wide text-muted">Connect · Join · Parent Info</div><h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2 text-navy">Connect</h1><p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Join Teens Church, find a TeeVo Club, or get parent/guardian information — safe, moderated, church-approved.</p></div></div></div></section>
    <section className="section bg-white"><div className="container-cc grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
      <div className="space-y-6">
        <div className="card p-6"><h2 className="font-display font-extrabold text-xl text-navy">Join Teens Church</h2><p className="text-sm leading-6 text-slate-600 mt-2">Sundays 8AM during Main Service · 30B Rumuokwuta. Walk in, or fill the interest form — we&apos;ll connect you to a coordinator.</p>
          <form className="mt-4 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3"><input placeholder="Teen first name (13–19)" className="rounded-xl border border-black/10 px-4 py-3 text-sm" /><input placeholder="Parent/Guardian name" className="rounded-xl border border-black/10 px-4 py-3 text-sm" /></div>
            <div className="grid sm:grid-cols-2 gap-3"><input placeholder="Parent phone (for follow-up)" className="rounded-xl border border-black/10 px-4 py-3 text-sm" /><select className="rounded-xl border border-black/10 px-4 py-3 text-sm"><option>Teens Church (Sundays 8AM)</option><option>TeeVo Club enquiry</option><option>TITHE outreach</option><option>Gifts/Creative enquiry</option></select></div>
            <textarea placeholder="How can we help? (optional)" rows={3} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
            <button className="btn btn--navy w-full justify-center">Send Interest (Demo)</button>
            <p className="text-xs text-muted">Demo form only — no data stored. In production: minimal data, moderated, parent consent where required.</p>
          </form>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Link href="/new-here" className="rounded-full border border-black/10 px-3 py-1">Plan Your Visit →</Link>
            <Link href="/contact" className="rounded-full border border-black/10 px-3 py-1">Contact Main Church →</Link>
          </div>
        </div>
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">Find a TeeVo Club</h3><p className="text-sm leading-6 text-slate-600 mt-2">Clubs meet in schools & neighbourhoods — authorised coordinators, approved schedules.</p><div className="mt-3 rounded-xl border border-black/5 overflow-x-auto">
            <div className="grid grid-cols-3 bg-navy text-white text-xs font-bold px-4 py-2 min-w-[440px]"><span>School</span><span>Area</span><span>Status</span></div>
            {[
              {s:'Community Secondary School', a:'Rumuokwuta', st:'Active — contact coordinator'},
              {s:'Federal Girls College', a:'Abuloma', st:'Pending authorisation'},
              {s:'Enquiries welcome', a:'Across PH', st:'Ask about your school'},
            ].map(r=>(
              <div key={r.s} className="grid grid-cols-3 text-xs px-4 py-3 border-t border-black/5 min-w-[440px]"><span className="font-semibold text-navy">{r.s}</span><span className="text-slate-600">{r.a}</span><span className="text-muted">{r.st}</span></div>
            ))}
          </div><p className="text-xs text-muted mt-2">No student member lists published. Contact via authorised channels only.</p></div>
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">Parent Information</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600"><li>• <b>What we teach:</b> New Creation realities, faith, Holy Spirit, character, purpose — via TeeVo & Bible.</li><li>• <b>Who leads:</b> CC3 Group-appointed coordinators under Zonal oversight.</li><li>• <b>When/where:</b> Sundays 8AM during Main Service; midweek as announced.</li><li>• <b>Media/events:</b> Photos/videos of minors used only with consent; events require parental awareness.</li><li>• <b>Safeguarding:</b> Supervised rooms, vetted volunteers, no private DM, concerns → Group Pastor / Zonal office.</li></ul><Link href="/safeguarding" className="mt-3 inline-flex text-xs font-bold text-gold">Safeguarding →</Link></div>
      </div>
      <div className="space-y-4">
        <div className="card p-5 bg-navy text-white"><h3 className="font-display font-extrabold">Quick contacts</h3><p className="text-sm text-white/80 mt-1">Main church lines (demo) — routed, not published personal numbers.</p><div className="mt-3 flex flex-col gap-2 text-xs"><a href="tel:+2349058628386" className="rounded-xl bg-white text-navy px-4 py-3 text-center font-bold">+234 905 862 8386</a><Link href="/contact" className="btn bg-white/10 border border-white/20 text-white w-full justify-center !py-2 text-xs">Contact Form →</Link></div></div>
        <div className="card p-5"><h3 className="font-display font-extrabold text-navy">Also explore</h3><div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <Link href="/youth" className="rounded-xl border border-black/10 p-3 hover:border-gold/30 text-center">Youth 20–35 →</Link>
          <Link href="/kids" className="rounded-xl border border-black/10 p-3 hover:border-gold/30 text-center">Kids 4–12 →</Link>
          <Link href="/" className="rounded-xl border border-black/10 p-3 hover:border-gold/30 text-center">Main Church →</Link>
          <Link href="/cells" className="rounded-xl border border-black/10 p-3 hover:border-gold/30 text-center">Cells →</Link>
        </div></div>
      </div>
    </div></section>
  </>)
}
