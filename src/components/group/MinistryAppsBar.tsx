import Link from 'next/link'
import apps from '@/data/ministryApps.json'

export function MinistryAppsBar() {
  return (
    <div className="border-b border-black/[0.06] bg-white">
      <div className="container-cc flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
        <span className="shrink-0 rounded-full bg-navy text-white px-3 py-1 text-[0.62rem] font-bold tracking-[0.14em] uppercase">Ministry Apps</span>
        <div className="flex items-center gap-2">
          {apps.map((a: any) => (
            <Link
              key={a.id}
              href={a.href}
              target={a.external ? '_blank' : undefined}
              rel={a.external ? 'noopener noreferrer' : undefined}
              className="shrink-0 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 hover:border-gold/30 hover:bg-gold/5 transition"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/15 text-[0.82rem]">{a.icon}</span>
              <span className="text-xs font-semibold leading-none">{a.label}</span>
              <span className="hidden sm:inline rounded-full bg-sand px-2 py-0.5 text-[0.62rem] font-bold text-navy/70">{a.count}</span>
            </Link>
          ))}
        </div>
        <span className="hidden lg:inline-flex shrink-0 ml-auto rounded-full bg-gold/10 border border-gold/20 px-3 py-1 text-[0.62rem] font-bold tracking-wide text-navy">CC3 Group · PH Zone 3</span>
      </div>
    </div>
  )
}
