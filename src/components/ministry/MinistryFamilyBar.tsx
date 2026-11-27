import Link from 'next/link'

const items = [
  { href: '/', label: 'Main Church', sub: 'Central Church 3', accent: 'navy' },
  { href: '/kids', label: 'Children Church', sub: 'Ages 4–12', accent: 'gold' },
  { href: '/teens', label: 'Teens Church', sub: 'Ages 13–19', accent: 'vermilion' },
  { href: '/youth', label: 'Youth Church', sub: 'Ages 20–35', accent: 'navy' },
]

export function MinistryFamilyBar({ current, hideLabel, hideAges, excludeCurrent }: { current?: string; hideLabel?: boolean; hideAges?: boolean; excludeCurrent?: boolean }) {
  const visibleItems = excludeCurrent && current ? items.filter(i => i.href !== current) : items
  return (
    <div className="border-b border-black/[0.06] bg-haze/50">
      <div className="container-cc flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5">
        {!hideLabel && (
          <span className="shrink-0 hidden sm:inline-flex items-center gap-1.5 rounded-full bg-navy text-white px-3 py-1 text-[0.60rem] font-bold tracking-[0.14em] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> One Church — Every Generation
          </span>
        )}
        <span className="shrink-0 sm:hidden text-[0.62rem] font-bold tracking-widest uppercase text-muted">Family:</span>
        <div className="flex items-center gap-1.5">
          {visibleItems.map(i => {
            const active = current === i.href
            return (
              <Link
                key={i.href}
                href={i.href}
                className={`shrink-0 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  active ? 'bg-navy text-white border-navy' : 'bg-white border-black/10 hover:border-gold/30 hover:bg-white'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${active ? 'bg-gold' : i.accent === 'gold' ? 'bg-gold' : i.accent === 'vermilion' ? 'bg-vermilion' : 'bg-navy'}`} />
                <span className="hidden sm:inline">{i.label}</span>
                <span className="sm:hidden">{i.label.split(' ')[0]}</span>
                {!hideAges && <span className="hidden md:inline-flex rounded-full bg-black/5 px-1.5 py-0.5 text-[0.60rem] font-bold">{i.sub}</span>}
              </Link>
            )
          })}
        </div>
        <span className="hidden lg:inline-flex shrink-0 ml-auto items-center gap-2 rounded-full bg-white border border-black/10 px-3 py-1 text-[0.62rem] font-bold text-muted">
          LoveWorld Nation · PH Zone 3 · CC3 Group
        </span>
      </div>
    </div>
  )
}

export function GenerationSwitcher({ from, toHref, toLabel }: { from: string; toHref: string; toLabel: string }) {
  return (
    <div className="rounded-xl border border-black/5 bg-haze p-4 flex items-center justify-between gap-4">
      <div>
        <div className="text-[0.62rem] font-bold tracking-widest uppercase text-muted">Grow with us</div>
        <div className="text-sm font-semibold text-navy mt-0.5">From {from} → {toLabel}</div>
      </div>
      <Link href={toHref} className="shrink-0 btn btn--navy !py-2 text-xs rounded-full">Explore {toLabel} →</Link>
    </div>
  )
}
