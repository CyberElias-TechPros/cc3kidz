import Link from 'next/link'
export const metadata = { title: 'Connect — CC3 Youth | Join, Serve, Contact Leaders' }
export default function YouthConnectPage(){
  return (<>
    <section className="bg-haze border-b border-black/5"><div className="container-cc py-10"><div className="flex gap-4 max-w-4xl"><div className="hidden sm:block w-[3px] self-stretch rounded-full bg-navy" aria-hidden /><div><div className="text-xs font-semibold tracking-wide text-muted">Connect · Join · Volunteer</div><h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2 text-navy">Connect</h1><p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Join Youth Church, join a youth cell, serve in a department, or contact leaders — ministry-approved, respectful, responsive.</p></div></div></div></section>
    <section className="section bg-white"><div className="container-cc grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
      <div className="space-y-6">
        <div className="card p-6"><h2 className="font-display font-extrabold text-xl text-navy">Join Youth Church</h2><p className="text-sm leading-6 text-slate-600 mt-2">Sundays + midweek — tell us about you and we&apos;ll connect you.</p>
          <form className="mt-4 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3"><input placeholder="Full name" className="rounded-xl border border-black/10 px-4 py-3 text-sm" /><input placeholder="Phone / WhatsApp" className="rounded-xl border border-black/10 px-4 py-3 text-sm" /></div>
            <select className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm"><option>Join Youth Church</option><option>Join a Youth Cell</option><option>Serve in a Department</option><option>YOU R.I.S.E. volunteer</option><option>Campus/Graduate connect</option></select>
            <textarea placeholder="Tell us a bit about you / availability" rows={3} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
            <button className="btn btn--navy w-full justify-center">Send (Demo)</button>
            <p className="text-xs text-muted">Demo only — no storage. Production: role-based access, minimal data.</p>
          </form>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <Link href="/youth/community" className="rounded-full border border-black/10 px-3 py-1">Find Community →</Link>
            <Link href="/cells" className="rounded-full border border-black/10 px-3 py-1">Youth Cells →</Link>
          </div>
        </div>
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">Serve & Volunteer</h3><p className="text-sm leading-6 text-slate-600 mt-2">Choir, media, ushering, outreach, creative, tech — we place you by gifting & availability, with mentoring.</p><Link href="/new-here#volunteer" className="mt-3 inline-flex btn btn--ghost !py-2 text-xs">Volunteer Form →</Link></div>
      </div>
      <div className="space-y-4">
        <div className="card p-5 bg-navy text-white"><h3 className="font-display font-extrabold">Contact Leaders</h3><p className="text-sm text-white/80 mt-1">Adult-supervised leadership. No public personal numbers.</p><div className="mt-3 flex flex-col gap-2 text-xs"><a href="tel:+2349058628386" className="rounded-xl bg-white text-navy px-4 py-3 text-center font-bold">+234 905 862 8386</a><Link href="/contact" className="btn bg-white/10 border border-white/20 text-white w-full justify-center !py-2 text-xs">Contact Form →</Link></div></div>
        <div className="card p-5"><h3 className="font-display font-extrabold text-navy">Also explore</h3><div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <Link href="/teens" className="rounded-xl border border-black/10 p-3 hover:border-gold/30 text-center">Teens 13–19 →</Link>
          <Link href="/kids" className="rounded-xl border border-black/10 p-3 hover:border-gold/30 text-center">Kids 4–12 →</Link>
          <Link href="/" className="rounded-xl border border-black/10 p-3 hover:border-gold/30 text-center">Main Church →</Link>
          <Link href="/ministries" className="rounded-xl border border-black/10 p-3 hover:border-gold/30 text-center">Ministries →</Link>
        </div></div>
      </div>
    </div></section>
  </>)
}
