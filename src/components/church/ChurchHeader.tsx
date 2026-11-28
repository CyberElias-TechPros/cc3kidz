import Link from 'next/link'
import churches from '@/data/groupChurches.json'

export function ChurchHeader({ church }: { church: any }) {
  const isHQ = church.isHeadquarters

  return (
    <div className="bg-navy text-white relative overflow-hidden">
      {/* subtle gold pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize:'24px 24px'}} aria-hidden />
      <div className="container-cc relative py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase ${isHQ ? 'bg-gold text-navy' : 'bg-white/10 border border-white/15 text-white'}`}>
                {isHQ ? 'Group Headquarters' : 'CC3 Group Church'} · {church.area}
              </span>
              {isHQ && (
                <span className="inline-flex rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-semibold">
                  Pastor Kelson Onoriode — Group Pastor
                </span>
              )}
            </div>
            <h1 className="font-display font-black text-[1.9rem] md:text-[2.4rem] leading-tight mt-3">
              {church.name}
            </h1>
            <p className="text-white/70 text-sm mt-2 max-w-2xl">
              {church.address} · {church.city} · {church.isHeadquarters ? 'Home of the CC3 Group Family — 6 churches, one Vision.' : `A vibrant LoveWorld church raising champions for Christ in ${church.area.split('·')[0].trim()}.`}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white text-navy px-3 py-1.5 text-xs font-bold">
                <span className="h-2 w-2 rounded-full bg-gold" />
                {church.pastor} · {church.title}
              </span>
              <span className="inline-flex rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs text-white">
                {church.serviceTimes?.[0]?.day} {church.serviceTimes?.[0]?.time} · {church.serviceTimes?.length} services weekly
              </span>
              <span className="inline-flex rounded-full bg-gold/15 border border-gold/20 px-3 py-1.5 text-xs font-bold text-gold">
                {church.cells} cells · Port Harcourt Zone 3
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            {church.whatsapp ? (
              <a href={`https://wa.me/${church.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="btn btn--gold !py-2.5 text-sm justify-center">
                WhatsApp Pastor →
              </a>
            ) : (
              <Link href={`/churches/${church.slug}/contact`} className="btn btn--gold !py-2.5 text-sm justify-center">
                Contact This Church →
              </Link>
            )}
            <Link href={`/churches/${church.slug}/contact`} className="btn btn--ghost !bg-white/10 !border-white/15 !text-white !py-2.5 text-sm justify-center">
              Visit Us · Directions
            </Link>
            <Link href={`/churches/${church.slug}/cells`} className="hidden md:inline-flex btn btn--ghost !bg-white/5 !border-white/10 !text-white/80 !py-2 text-xs justify-center">
              Find a Cell Near {church.shortName} →
            </Link>
          </div>
        </div>

        {/* quick stats bar */}
        <div className="mt-6 grid grid-cols-3 md:grid-cols-4 gap-2 max-w-2xl">
          <div className="rounded-xl bg-white/10 border border-white/10 p-3 text-center">
            <div className="text-gold font-black text-lg leading-none">{church.serviceTimes?.length}</div>
            <div className="text-white/60 text-xs mt-1 leading-tight">Weekly<br/>Services</div>
          </div>
          <div className="rounded-xl bg-white/10 border border-white/10 p-3 text-center">
            <div className="text-gold font-black text-lg leading-none">{church.cells}</div>
            <div className="text-white/60 text-xs mt-1 leading-tight">Active<br/>Cells</div>
          </div>
          <div className="rounded-xl bg-white/10 border border-white/10 p-3 text-center">
            <div className="text-white font-black text-lg leading-none">PH3</div>
            <div className="text-white/60 text-xs mt-1 leading-tight">Zone<br/>Family</div>
          </div>
          <div className="hidden md:block rounded-xl bg-gold text-navy p-3 text-center">
            <div className="font-black text-lg leading-none">Join</div>
            <div className="text-navy/70 text-xs mt-1 leading-tight">This<br/>Sunday 8AM</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ChurchSiblings({ currentSlug }: { currentSlug: string }) {
  const siblings = (churches as any[]).filter(c => c.slug !== currentSlug)
  return (
    <div className="card p-5">
      <h3 className="font-display font-extrabold text-navy">Other CC3 Group Churches</h3>
      <p className="text-xs text-muted mt-1">One Vision — 6 expressions across Port Harcourt</p>
      <div className="mt-4 space-y-2">
        {siblings.map((s: any) => (
          <Link key={s.id} href={`/churches/${s.slug}`} className="flex justify-between items-center rounded-xl border border-black/10 px-4 py-3 hover:bg-sand transition group">
            <div>
              <div className="font-semibold text-sm group-hover:text-navy">{s.shortName}</div>
              <div className="text-xs text-muted">{s.area} · {s.pastor}</div>
            </div>
            <span className="h-7 w-7 grid place-items-center rounded-full bg-navy text-white text-xs group-hover:bg-gold group-hover:text-navy transition">→</span>
          </Link>
        ))}
      </div>
      <Link href="/group" className="mt-4 btn btn--ghost w-full justify-center text-sm">View Group Directory →</Link>
    </div>
  )
}
