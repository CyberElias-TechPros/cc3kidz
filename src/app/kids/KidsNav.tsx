'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV = [
  { label: 'Home', href: '/kids', page: '/kids' },
  { label: 'About Us', href: '/kids/about', page: '/kids/about' },
  { label: 'Bible Lessons', href: '/kids/lessons', page: '/kids/lessons' },
  { label: 'Events', href: '/kids/events', page: '/kids/events' },
  { label: 'Gallery', href: '/kids/gallery', page: '/kids/gallery' },
  { label: 'Kids Corner', href: '/kids/kids-corner', page: '/kids/kids-corner' },
  { label: 'Contact', href: '/kids/contact', page: '/kids/contact' },
  { label: 'Teens →', href: '/teens', page: '/teens' },
  { label: 'Youth →', href: '/youth', page: '/youth' },
]

const MOBILE = [
  ...NAV,
  { label: 'Our Classes', href: '/kids/classes', page: '/kids/classes' },
  { label: "Parents' Corner", href: '/kids/parents', page: '/kids/parents' },
  { label: 'Resources', href: '/kids/resources', page: '/kids/resources' },
]

export default function KidsNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = (href: string) => pathname === href || (href !== '/kids' && pathname?.startsWith(href))

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={`site-header ${open ? 'is-scrolled' : ''}`} id="site-header">
        <div className="container">
          <div className="nav-shell">
            <Link className="brand" href="/kids" aria-label="CE Central Church 3 Ministry of Children's Affairs — home">
              <img className="brand__mark" src="/kids/assets/images/logo.png" alt="Ministry of Children's Affairs" width={80} height={62} style={{ height: 54, width: 'auto', objectFit: 'contain' }} />
              <span className="brand__text">
                <span className="brand__name">CE Central Church 3 Children&apos;s Church</span>
                <span className="brand__sub">Ministry of Children&apos;s Affairs · PH Zone 3</span>
              </span>
            </Link>
            <nav className="nav-links" aria-label="Main navigation">
              {NAV.map((item) => (
                <Link key={item.href} href={item.href} className={isActive(item.href) ? 'is-active' : ''} aria-current={isActive(item.href) ? 'page' : undefined}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="nav-actions">
              <Link className="icon-btn" href="/search" aria-label="Search"><svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx={11} cy={11} r={7} /><path d="m20 20-3-3" /></svg></Link>
              <Link className="btn btn--primary btn--sm nav-cta" href="/kids/contact">Join Us</Link>
              <button className="nav-toggle" type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
                <svg className="i-menu" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ display: open ? 'none' : 'block' }}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
                <svg className="i-close" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ display: open ? 'block' : 'none' }}><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="mobile-menu__links">
          {MOBILE.map((item, i) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={isActive(item.href) ? 'is-active' : ''}>
              <span>{item.label}</span><span className="num">{String(i + 1).padStart(2, '0')}</span>
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__foot">
          <Link className="btn btn--primary btn--lg" href="/kids/contact" onClick={() => setOpen(false)}>Plan Your Visit</Link>
          <p className="mobile-menu__note">Sundays · during the main service · Port Harcourt</p>
        </div>
      </div>
    </>
  )
}
