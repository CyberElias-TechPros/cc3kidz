'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { site } from '@/lib/site'

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

  return (
    <header
      className={`sticky top-0 z-40 border-b transition ${
        scrolled ? 'bg-white/95 backdrop-blur-xl border-black/5 shadow-sm' : 'bg-white border-transparent'
      }`}
    >
      <div className="container-cc flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <img src="/assets/images/loveworld-logo.png?v=2" alt="Christ Embassy LoveWorld" width={56} height={56} className="h-12 w-12 md:h-14 md:w-14 object-contain flex-shrink-0" style={{ filter: 'drop-shadow(0 1px 2px rgba(14,27,51,0.12))' }} />
          <div className="leading-tight">
            <div className="font-display font-extrabold text-[0.95rem] tracking-tight text-navy">
              Central Church 3
            </div>
            <div className="text-[0.64rem] font-semibold tracking-[0.12em] uppercase text-muted">
              Port Harcourt · Zone 3
            </div>
            <div className="hidden md:block text-[0.55rem] font-bold tracking-[0.14em] uppercase text-gold leading-none mt-0.5">
              Giving your life a meaning
            </div>
          </div>
        </Link>

        {/* Desktop nav — de-pilled: text links, not pills */}
        <nav className="hidden lg:flex items-center gap-1">
          {site.nav.map(l => {
            const active = pathname === l.href || (l.href !== '/' && pathname?.startsWith(l.href))
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-2 text-sm font-medium transition border-b-2 ${
                  active
                    ? 'text-navy border-gold'
                    : 'text-charcoal border-transparent hover:text-navy hover:border-black/10'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Intergenerational switcher — persistent */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="hidden xl:flex items-center gap-1 rounded-lg border border-black/10 bg-haze px-1 py-1">
            <Link href="/kids" className="px-3 py-1 text-xs font-bold rounded-md hover:bg-white transition">
              Kids
            </Link>
            <span className="text-black/10">|</span>
            <Link href="/teens" className="px-3 py-1 text-xs font-bold rounded-md hover:bg-white transition">
              Teens
            </Link>
            <span className="text-black/10">|</span>
            <Link href="/youth" className="px-3 py-1 text-xs font-bold rounded-md hover:bg-white transition">
              Youth
            </Link>
          </div>
          <Link href="/online" className="btn btn--ghost !py-2 !px-4 text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Watch Live
          </Link>
          <Link href="/new-here" className="btn btn--navy !py-2">
            Plan Your Visit
          </Link>
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
            {site.nav.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-3 rounded-lg text-[0.95rem] font-medium ${
                  pathname === l.href ? 'bg-navy text-white' : 'bg-black/[0.03] text-charcoal'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Link href="/kids" className="flex-1 btn btn--ghost justify-center text-sm">
                Kids
              </Link>
              <Link href="/teens" className="flex-1 btn btn--ghost justify-center text-sm">
                Teens
              </Link>
              <Link href="/youth" className="flex-1 btn btn--ghost justify-center text-sm">
                Youth
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link href="/online" className="btn btn--ghost justify-center">
                Watch Live
              </Link>
              <Link href="/give" className="btn btn--gold justify-center">
                Give
              </Link>
              <Link href="/prayer" className="btn btn--navy col-span-2 justify-center">
                Prayer Request
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
              <div className="mt-1">
                <a href="/kids" className="font-semibold text-navy underline">
                  Children Church
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
