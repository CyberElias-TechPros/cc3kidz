'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const teensNav = [
  { href: '/teens', label: 'Home' },
  { href: '/teens/about', label: 'About' },
  { href: '/teens/church', label: 'Teens Church' },
  { href: '/teens/rhapsody', label: 'TeeVo Daily', children: ['/teens/rhapsody'] },
  { href: '/teens/word', label: 'Word Centre' },
  { href: '/teens/activities', label: 'Ministry', children: ['/teens/activities', '/teens/gifts'] },
  { href: '/teens/events', label: 'Events' },
  { href: '/teens/resources', label: 'Media' },
  { href: '/teens/connect', label: 'Contact' },
]

const youthNav = [
  { href: '/youth', label: 'Home' },
  { href: '/youth/about', label: 'About' },
  { href: '/youth/church', label: 'Youth Church' },
  { href: '/youth/rhapsody', label: 'Rhapsody Daily', children: ['/youth/rhapsody'] },
  { href: '/youth/word', label: 'Word & Spirit' },
  { href: '/youth/rise', label: 'Outreach' },
  { href: '/youth/growth', label: 'Growth' },
  { href: '/youth/community', label: 'Community' },
  { href: '/youth/media', label: 'Media' },
  { href: '/youth/events', label: 'Events' },
  { href: '/youth/connect', label: 'Contact' },
]

function AnnouncementStrip({ accent = '#172B76', label = 'Announcement', text, href }: { accent?: string; label?: string; text: string; href?: string }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null
  return (
    <div className="w-full text-white" style={{ background: accent }}>
      <div className="container-cc flex items-center gap-3 py-2 text-xs">
        <span className="shrink-0 rounded-full bg-white/15 border border-white/20 px-2.5 py-1 text-[10px] font-black tracking-widest uppercase">{label}</span>
        <span className="flex-1 truncate font-semibold">{text}</span>
        {href && (
          <Link href={href} className="shrink-0 hidden sm:inline-flex rounded-full bg-white text-[11px] font-black px-3 py-1" style={{ color: accent }}>
            View →
          </Link>
        )}
        <button onClick={() => setDismissed(true)} aria-label="Dismiss announcement" className="shrink-0 h-6 w-6 grid place-items-center rounded-full bg-white/10 hover:bg-white/15 text-white">✕</button>
      </div>
    </div>
  )
}

export function TeensAnnouncement() {
  return <AnnouncementStrip accent="#172B76" label="Next Program" text="Teens Church — Sundays 8AM during Main Service · 30B Rumuokwuta · Parent check-in at welcome desk" href="/teens/church" />
}
export function YouthAnnouncement() {
  return <AnnouncementStrip accent="#101A2B" label="Youth Conference" text="CC3 Youth Conference — Date TBC · Save the date · Registration will open after confirmation" href="/youth/events" />
}

export function TeensSubNav() {
  const pathname = usePathname()
  const isHome = pathname === '/teens'
  return (
    <>
      {!isHome && <TeensAnnouncement />}
      <div className="sticky top-[64px] z-30 border-b border-black/5 bg-white/95 backdrop-blur-xl">
        <div className="container-cc flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
          <Link href="/teens" className="shrink-0 hidden sm:inline-flex items-center gap-2 mr-2 rounded-full px-3 py-1 text-[0.62rem] font-black tracking-widest uppercase text-white" style={{ background: '#172B76' }}>
            <span className="h-2 w-2 rounded-full" style={{ background: '#FF8C70' }} /> TEENS 13–19
          </Link>
          {teensNav.map(n => {
            const isActive = pathname === n.href || (n.href !== '/teens' && pathname?.startsWith(n.href)) || (n.children && n.children.some(c => pathname?.startsWith(c)))
            return (
              <Link key={n.href} href={n.href} className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition border ${isActive ? 'text-white border-transparent' : 'bg-white text-slate-600 border-black/10 hover:text-[#172B76]'}`} style={isActive ? { background: '#315BFF', borderColor: '#315BFF' } : {}}>
                {n.label}
              </Link>
            )
          })}
          <Link href="/youth" className="shrink-0 ml-auto hidden lg:inline-flex items-center gap-1 rounded-full bg-[#C6A66B]/15 border border-[#C6A66B]/20 px-3 py-1 text-xs font-bold text-[#101A2B]">Youth 20–35 →</Link>
          <Link href="/search" className="shrink-0 hidden md:grid h-8 w-8 place-items-center rounded-full bg-[#F5F6FC] border border-black/5 text-[#172B76] ml-1">⌕</Link>
        </div>
      </div>
    </>
  )
}

export function YouthSubNav() {
  const pathname = usePathname()
  const isHome = pathname === '/youth'
  return (
    <>
      {!isHome && <YouthAnnouncement />}
      <div className="sticky top-[64px] z-30 border-b border-black/5 bg-white/95 backdrop-blur-xl">
        <div className="container-cc flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
          <Link href="/youth" className="shrink-0 hidden sm:inline-flex items-center gap-2 mr-2 rounded-full bg-[#101A2B] text-white px-3 py-1 text-[0.62rem] font-black tracking-widest uppercase">
            YOUTH 20–35
          </Link>
          {youthNav.map(n => {
            const isActive = pathname === n.href || (n.href !== '/youth' && pathname?.startsWith(n.href))
            return (
              <Link key={n.href} href={n.href} className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition border ${isActive ? 'bg-[#101A2B] text-white border-[#101A2B]' : 'bg-white text-slate-600 border-black/10 hover:border-[#C6A66B]/30 hover:text-[#101A2B]'}`}>
                {n.label}
              </Link>
            )
          })}
          <Link href="/teens" className="shrink-0 ml-auto hidden lg:inline-flex items-center gap-1 rounded-full bg-[#172B76]/10 border border-[#172B76]/15 px-3 py-1 text-xs font-bold text-[#172B76]">Teens 13–19 →</Link>
          <Link href="/search" className="shrink-0 hidden md:grid h-8 w-8 place-items-center rounded-full bg-[#F7F6F2] border border-black/5 text-[#101A2B] ml-1">⌕</Link>
        </div>
      </div>
    </>
  )
}
