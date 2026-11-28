'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function ChurchNav({ slug, churchName }: { slug: string; churchName: string }) {
  const pathname = usePathname()
  const base = `/churches/${slug}`

  const links = [
    { label: 'Home', href: base },
    { label: 'About', href: `${base}/about` },
    { label: 'Pastor', href: `${base}/pastor` },
    { label: 'Services', href: `${base}/services` },
    { label: 'Cells', href: `${base}/cells` },
    { label: 'Ministries', href: `${base}/ministries` },
    { label: 'Events', href: `${base}/events` },
    { label: 'Media', href: `${base}/media` },
    { label: 'Contact', href: `${base}/contact` },
  ]

  return (
    <nav className="bg-white border-b border-black/5 sticky top-[57px] md:top-[64px] z-30">
      <div className="container-cc">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
          <span className="text-xs font-bold tracking-widest uppercase text-muted mr-2 hidden sm:block shrink-0">
            {churchName.split('—')[0].trim()} ·
          </span>
          {links.map(l => {
            const active = pathname === l.href || (l.href !== base && pathname?.startsWith(l.href))
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  active
                    ? 'bg-navy text-white'
                    : 'bg-haze text-charcoal hover:bg-black/5'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export function ChurchBreadcrumb({ slug, churchName, current }: { slug: string; churchName: string; current?: string }) {
  return (
    <div className="bg-haze/50 border-b border-black/[0.04]">
      <div className="container-cc py-3 flex items-center gap-1.5 text-xs text-muted overflow-x-auto">
        <Link href="/" className="hover:text-navy hover:underline underline-offset-4 shrink-0">Home</Link>
        <span className="opacity-30">›</span>
        <Link href="/group" className="hover:text-navy hover:underline underline-offset-4 shrink-0">CC3 Group</Link>
        <span className="opacity-30">›</span>
        <Link href={`/churches/${slug}`} className="hover:text-navy hover:underline underline-offset-4 font-semibold text-navy shrink-0">{churchName}</Link>
        {current && (
          <>
            <span className="opacity-30">›</span>
            <span className="font-medium text-charcoal shrink-0">{current}</span>
          </>
        )}
      </div>
    </div>
  )
}
