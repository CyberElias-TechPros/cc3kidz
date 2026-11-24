'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/teens', label: 'Home' },
  { href: '/teens/about', label: 'About' },
  { href: '/teens/church', label: 'Teens Church' },
  { href: '/teens/word', label: 'Word' },
  { href: '/teens/activities', label: 'Activities' },
  { href: '/teens/gifts', label: 'Gifts' },
  { href: '/teens/events', label: 'Events' },
  { href: '/teens/resources', label: 'Resources' },
  { href: '/teens/connect', label: 'Connect' },
]

export function TeensSubNav() {
  const pathname = usePathname()
  const active = pathname
  return (
    <div className="sticky top-[64px] z-30 border-b border-black/5 bg-white/95 backdrop-blur-xl">
      <div className="container-cc flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
        <Link href="/teens" className="shrink-0 hidden sm:inline-flex items-center gap-2 mr-2 rounded-full bg-navy text-white px-3 py-1 text-[0.62rem] font-bold tracking-widest uppercase">
          <span className="h-2 w-2 rounded-full bg-gold" /> TEENS 13–19
        </Link>
        {nav.map(n => {
          const isActive = active === n.href || (n.href !== '/teens' && active?.startsWith(n.href))
          return (
            <Link key={n.href} href={n.href} className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition border ${isActive ? 'bg-navy text-white border-navy' : 'bg-white text-slate-600 border-black/10 hover:border-gold/30 hover:text-navy'}`}>
              {n.label}
            </Link>
          )
        })}
        <Link href="/youth" className="shrink-0 ml-auto hidden lg:inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/20 px-3 py-1 text-xs font-bold text-navy">Youth 20–35 →</Link>
      </div>
    </div>
  )
}

export function YouthSubNav() {
  const pathname = usePathname()
  const active = pathname
  const youthNav = [
    { href: '/youth', label: 'Home' },
    { href: '/youth/about', label: 'About' },
    { href: '/youth/church', label: 'Youth Church' },
    { href: '/youth/word', label: 'Word' },
    { href: '/youth/rise', label: 'YOU R.I.S.E.' },
    { href: '/youth/growth', label: 'Growth' },
    { href: '/youth/community', label: 'Community' },
    { href: '/youth/media', label: 'Media' },
    { href: '/youth/events', label: 'Events' },
    { href: '/youth/connect', label: 'Connect' },
  ]
  return (
    <div className="sticky top-[64px] z-30 border-b border-black/5 bg-white/95 backdrop-blur-xl">
      <div className="container-cc flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
        <Link href="/youth" className="shrink-0 hidden sm:inline-flex items-center gap-2 mr-2 rounded-full bg-navy text-white px-3 py-1 text-[0.62rem] font-bold tracking-widest uppercase">
          YOUTH 20–35
        </Link>
        {youthNav.map(n => {
          const isActive = active === n.href || (n.href !== '/youth' && active?.startsWith(n.href))
          return (
            <Link key={n.href} href={n.href} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition border ${isActive ? 'bg-navy text-white border-navy' : 'bg-white text-slate-600 border-black/10 hover:border-gold/30 hover:text-navy'}`}>
              {n.label}
            </Link>
          )
        })}
        <Link href="/teens" className="shrink-0 ml-auto hidden lg:inline-flex items-center gap-1 rounded-full bg-vermilion/10 border border-vermilion/20 px-3 py-1 text-xs font-bold text-vermilion">Teens 13–19 →</Link>
      </div>
    </div>
  )
}
