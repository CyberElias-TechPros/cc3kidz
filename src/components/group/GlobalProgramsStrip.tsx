import Link from 'next/link'
import programs from '@/data/globalPrograms.json'

export function GlobalProgramsStrip() {
  return (
    <div className="bg-white border-y border-black/[0.06]">
      <div className="container-cc py-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display font-extrabold text-[0.9rem] tracking-tight flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> UP NEXT · Global Programmes
          </h2>
          <Link href="/events" className="hidden sm:inline-flex text-xs font-semibold underline underline-offset-4">View calendar →</Link>
        </div>
        <div className="mt-3 grid md:grid-cols-3 lg:grid-cols-5 gap-3">
          {(programs as any[]).slice(0, 5).map(p => (
            <Link key={p.id} href={p.href} className="card p-4 hover:shadow-card transition flex flex-col">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gold/15 text-xs">{p.icon}</span>
                <span className="rounded-full bg-navy text-white px-2 py-0.5 text-[0.58rem] font-bold tracking-widest uppercase">{p.badge}</span>
              </div>
              <h3 className="font-display font-extrabold text-[0.92rem] leading-tight mt-2 line-clamp-2">{p.title}</h3>
              <div className="mt-1 text-xs text-muted">{p.date}{p.endDate ? ` – ${p.endDate}` : ''} · {p.time}</div>
              <div className="text-xs text-slate-500 line-clamp-2 mt-1">{p.venue}</div>
              {typeof p.funded === 'number' && (
                <div className="mt-3">
                  <div className="flex justify-between text-[0.62rem] font-semibold text-muted"><span>Funded</span><span>{p.funded}%</span></div>
                  <div className="mt-1 h-1.5 rounded-full bg-black/5 overflow-hidden"><div className="h-full bg-gold" style={{ width: `${p.funded}%` }} /></div>
                </div>
              )}
              <span className="mt-3 inline-flex rounded-full bg-navy text-white px-3 py-1 text-xs font-semibold self-start">{p.cta} →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
