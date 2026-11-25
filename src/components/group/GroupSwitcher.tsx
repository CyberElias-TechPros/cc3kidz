import Link from 'next/link'
import churches from '@/data/groupChurches.json'

export function GroupSwitcher({ activeSlug }: { activeSlug?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display font-extrabold text-xl">6 Churches · One Group Family</h2>
        <Link href="/group" className="btn btn--ghost !py-2 text-sm hidden sm:inline-flex">View Group Directory →</Link>
      </div>
      <p className="text-sm text-muted mt-2 max-w-2xl">Christ Embassy Central Church 3 Group — Headquarters: Christ Embassy Central Church 3 at 30B Rumuokwuta/NTA Road (Pastor Kelson Onoriode, Group Pastor & Pastor of Central Church 3 — the only Pastor at the Group Church). 6 additional churches + Headquarters family of 7, vibrant cells, one mission.</p>
      <div className="mt-6 grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(churches as any[]).map(c => (
          <Link key={c.id} href={`/group/${c.slug}`} className={`card p-5 hover:shadow-card transition ${activeSlug === c.slug ? 'ring-2 ring-gold' : ''}`}>
            {c.isHeadquarters && <span className="inline-flex rounded-full bg-gold text-navy px-2.5 py-1 text-[0.60rem] font-bold tracking-widest uppercase">Headquarters</span>}
            <h3 className="font-display font-extrabold leading-tight mt-2">{c.name}</h3>
            <div className="text-xs font-semibold text-gold mt-1">{c.pastor} · {c.title}</div>
            <div className="text-xs text-muted mt-2 line-clamp-2">{c.address}</div>
            <div className="mt-2 inline-flex rounded-full bg-sand px-2.5 py-1 text-xs">{c.area}</div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-black/10 px-2.5 py-1">{c.serviceTimes[0]?.day} {c.serviceTimes[0]?.time}</span>
              <span className="rounded-full bg-navy text-white px-2.5 py-1">{c.cells} cells</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function MiniGroupStrip() {
  return (
    <div className="bg-white border-y border-black/[0.06]">
      <div className="container-cc py-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="shrink-0 text-xs font-bold tracking-widest uppercase text-muted">Find Your Place:</span>
          {(churches as any[]).map(c => (
            <Link key={c.id} href={`/group/${c.slug}`} className="shrink-0 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium hover:border-gold/30">
              {c.shortName} · {c.area}
            </Link>
          ))}
          <Link href="/cells" className="shrink-0 rounded-full bg-navy text-white px-3 py-1.5 text-xs font-bold">Cell Finder →</Link>
        </div>
      </div>
    </div>
  )
}
