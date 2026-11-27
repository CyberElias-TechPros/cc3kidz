import Link from 'next/link'

export function SponsorCard({ item }: { item: any }) {
  const ext = item.link && item.link.startsWith('http')
  return (
    <div className="card overflow-hidden flex flex-col">
      <div className="h-36 bg-navy relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <div className="absolute top-3 left-3 rounded-full bg-white text-navy px-2.5 py-1 text-[0.60rem] font-bold tracking-widest uppercase">{item.category}</div>
        {item.icon && <div className="absolute top-3 right-3 h-7 w-7 grid place-items-center rounded-full bg-white/15 text-white text-sm">{item.icon}</div>}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex justify-between text-xs text-white/90 font-semibold"><span>Funded</span><span>{item.percent}%</span></div>
          <div className="mt-1 h-2 rounded-full bg-white/15 overflow-hidden"><div className="h-full bg-gold" style={{ width: `${item.percent}%` }} /></div>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-extrabold leading-tight">{item.title}</h3>
        <p className="text-sm text-muted mt-2 line-clamp-3">{item.excerpt || item.desc}</p>
        {item.slots && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.slots.slice(0, 3).map((s: string) => (
              <span key={s} className="rounded-full bg-sand px-2.5 py-1 text-xs">{s}</span>
            ))}
          </div>
        )}
        <div className="mt-4 flex gap-2">
          <Link href={`/give#${item.slug}`} className="btn btn--gold flex-1 justify-center">{item.cta}</Link>
          {ext ? (
            <a href={item.link} target="_blank" rel="noreferrer" className="btn btn--ghost">Official ↗</a>
          ) : (
            <Link href={`/give#${item.slug}`} className="btn btn--ghost">Details</Link>
          )}
        </div>
        <div className="mt-2 text-xs text-muted">{(() => { try { return ext ? new URL(item.link).hostname.replace('www.','') + ' · ' : '' } catch { return '' } })()}Bank Transfer + POP</div>
      </div>
    </div>
  )
}

export function PartnershipArmCard({ arm }: { arm: any }) {
  const ext = arm.link?.startsWith('http')
  return (
    <div className="card p-5 flex flex-col">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/15 text-sm">{arm.icon}</span>
        <span className="rounded-full bg-navy text-white px-2.5 py-1 text-[0.60rem] font-bold tracking-widest uppercase">{arm.category}</span>
      </div>
      <h3 className="font-display font-extrabold mt-3 leading-tight">{arm.name}</h3>
      <p className="text-sm text-muted mt-2 line-clamp-3">{arm.desc}</p>
      <div className="mt-4 flex gap-2">
        <Link href={`/give#${arm.slug}`} className="btn btn--navy flex-1 justify-center text-sm">{arm.cta}</Link>
        {ext && <a href={arm.link} target="_blank" rel="noreferrer" className="btn btn--ghost text-sm">Visit ↗</a>}
      </div>
      {ext && <div className="mt-2 text-xs text-muted truncate">{(() => { try { return new URL(arm.link).hostname } catch { return arm.link } })()}</div>}
    </div>
  )
}
