'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { site } from '@/lib/site'

const churches = [
  { href: '/', label: 'Main Church', short: 'Main', sub: 'Central Church 3' },
  { href: '/kids', label: 'Children Church', short: 'Children', sub: 'Ages 4–12' },
  { href: '/teens', label: 'Teens Church', short: 'Teens', sub: 'Ages 13–19' },
  { href: '/youth', label: 'Youth Church', short: 'Youth', sub: 'Ages 20–35' },
]

const teensNav = [
  { href: '/teens', label: 'Home' },
  { href: '/teens/about', label: 'About' },
  { href: '/teens/church', label: 'Teens Church' },
  { href: '/teens/rhapsody', label: 'TeeVo Daily' },
  { href: '/teens/word', label: 'Word Centre' },
  { href: '/teens/activities', label: 'Ministry' },
  { href: '/teens/events', label: 'Events' },
  { href: '/teens/resources', label: 'Media' },
  { href: '/teens/connect', label: 'Contact' },
]

const youthNav = [
  { href: '/youth', label: 'Home' },
  { href: '/youth/about', label: 'About' },
  { href: '/youth/church', label: 'Youth Church' },
  { href: '/youth/rhapsody', label: 'Rhapsody Daily' },
  { href: '/youth/word', label: 'Word & Spirit' },
  { href: '/youth/rise', label: 'Outreach' },
  { href: '/youth/growth', label: 'Growth' },
  { href: '/youth/community', label: 'Community' },
  { href: '/youth/media', label: 'Media' },
  { href: '/youth/events', label: 'Events' },
  { href: '/youth/connect', label: 'Contact' },
]

function getChurch(pathname: string | null) {
  if (!pathname) return '/'
  if (pathname === '/teens' || pathname.startsWith('/teens/')) return '/teens'
  if (pathname === '/youth' || pathname.startsWith('/youth/')) return '/youth'
  if (pathname === '/kids' || pathname.startsWith('/kids/')) return '/kids'
  return '/'
}

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const current = getChurch(pathname)
  const isTeens = current === '/teens'
  const isYouth = current === '/youth'
  const isContextual = isTeens || isYouth

  const navItems = isTeens ? teensNav : isYouth ? youthNav : site.nav
  const otherChurches = churches.filter(c => c.href !== current)

  // branding — per user: CE Central Church 3 Youth / Teens
  const brand = isTeens
    ? {
        logo: '/assets/images/loveworld-teens-youth.png',
        title: 'CE Central Church 3 Teens',
        sub: 'Teens & Youth Ministry · PH Zone 3',
        sub2: 'Ages 13–19 · Giving your life a meaning',
        href: '/teens',
        alt: 'LoveWorld Teens & Youth Ministry',
      }
    : isYouth
    ? {
        logo: '/assets/images/loveworld-teens-youth.png',
        title: 'CE Central Church 3 Youth',
        sub: 'Teens & Youth Ministry · PH Zone 3',
        sub2: 'Ages 20–35 · Giving your life a meaning',
        href: '/youth',
        alt: 'LoveWorld Teens & Youth Ministry',
      }
    : {
        logo: '/assets/images/loveworld-logo.png?v=2',
        title: 'Central Church 3',
        sub: 'Port Harcourt · Zone 3',
        sub2: 'Giving your life a meaning',
        href: '/',
        alt: 'Christ Embassy LoveWorld',
      }

  return (
    <header
      className={`sticky top-0 z-40 border-b transition ${
        scrolled ? 'bg-white/95 backdrop-blur-xl border-black/5 shadow-sm' : 'bg-white border-transparent'
      }`}
    >
      <div className="container-cc flex items-center justify-between gap-4 py-3">
        <Link href={brand.href} className="flex items-center gap-3">
          <img
            src={brand.logo}
            alt={brand.alt}
            width={isContextual ? 52 : 56}
            height={isContextual ? 52 : 56}
            className="h-11 w-11 md:h-14 md:w-14 object-contain flex-shrink-0"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(14,27,51,0.10))' }}
          />
          <div className="leading-tight">
            <div className="font-display font-extrabold text-[0.95rem] tracking-tight text-navy">{brand.title}</div>
            <div className="text-[0.64rem] font-semibold tracking-[0.12em] uppercase text-muted">{brand.sub}</div>
            <div className="hidden md:block text-[0.55rem] font-bold tracking-[0.14em] uppercase text-gold leading-none mt-0.5">{brand.sub2}</div>
          </div>
        </Link>

        {/* Desktop nav — contextual */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar">
          {navItems.map(l => {
            const isActive = l.href === '/teens' || l.href === '/youth' || l.href === '/'
              ? pathname === l.href
              : pathname === l.href || pathname?.startsWith(l.href + '/') || pathname?.startsWith(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 text-sm font-medium transition border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'text-navy border-gold'
                    : 'text-charcoal border-transparent hover:text-navy hover:border-black/10'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Intergenerational switcher — persistent + dynamic other churches */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="hidden xl:flex items-center gap-1 rounded-lg border border-black/10 bg-haze px-1 py-1">
            {otherChurches.map((c, i) => (
              <span key={c.href} className="flex items-center">
                <Link href={c.href} className="px-3 py-1 text-xs font-bold rounded-md hover:bg-white transition">
                  {c.short}
                </Link>
                {i < otherChurches.length - 1 && <span className="text-black/10">|</span>}
              </span>
            ))}
          </div>
          {isTeens ? (
            <>
              <Link href="/teens/connect" className="btn btn--ghost !py-2 !px-4 text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Contact
              </Link>
              <Link href="/teens/church" className="btn btn--navy !py-2">Join Teens</Link>
            </>
          ) : isYouth ? (
            <>
              <Link href="/youth/connect" className="btn btn--ghost !py-2 !px-4 text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Contact
              </Link>
              <Link href="/youth/community" className="btn btn--navy !py-2">Join Youth</Link>
            </>
          ) : (
            <>
              <Link href="/online" className="btn btn--ghost !py-2 !px-4 text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Watch Live
              </Link>
              <Link href="/new-here" className="btn btn--navy !py-2">Plan Your Visit</Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="lg:hidden h-10 w-10 grid place-items-center rounded-lg border border-black/10 bg-white"
        >
          <span className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-navy transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-navy transition ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-navy transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-black/5 bg-white">
          <div className="container-cc py-4 flex flex-col gap-1">
            {navItems.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-3 rounded-lg text-[0.95rem] font-medium ${
                  pathname === l.href || (l.href !== '/' && pathname?.startsWith(l.href)) ? 'bg-navy text-white' : 'bg-black/[0.03] text-charcoal'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 border-t border-black/5 mt-2">
              {otherChurches.map(c => (
                <Link key={c.href} href={c.href} className="flex-1 btn btn--ghost justify-center text-sm">
                  {c.short}
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              {isTeens ? (
                <>
                  <Link href="/teens/word" className="btn btn--ghost justify-center">TeeVo</Link>
                  <Link href="/teens/church" className="btn btn--gold justify-center">Join Teens</Link>
                </>
              ) : isYouth ? (
                <>
                  <Link href="/youth/word" className="btn btn--ghost justify-center">Word & Spirit</Link>
                  <Link href="/youth/community" className="btn btn--gold justify-center">Join Youth</Link>
                </>
              ) : (
                <>
                  <Link href="/online" className="btn btn--ghost justify-center">Watch Live</Link>
                  <Link href="/give" className="btn btn--gold justify-center">Give</Link>
                </>
              )}
              <Link href={isTeens ? '/teens/connect' : isYouth ? '/youth/connect' : '/prayer'} className="btn btn--navy col-span-2 justify-center">
                {isContextual ? 'Contact' : 'Prayer Request'}
              </Link>
            </div>
            <div className="pt-3 text-xs text-muted border-t mt-3">
              <div>{site.addressShort}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {((site as any).phones || [site.phone]).map((ph: string)=> (
                  <a key={ph} href={`tel:${ph}`} className="underline text-navy font-medium">
                    {ph}
                  </a>
                ))}
              </div>
              <div className="mt-2 flex gap-2 flex-wrap">
                {otherChurches.map(c => (
                  <Link key={c.href} href={c.href} className="font-semibold text-navy underline text-xs">
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
