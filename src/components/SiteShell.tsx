'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnnouncementBar from '@/components/AnnouncementBar'
import CookieConsent from '@/components/CookieConsent'
import FloatingHelpButton from '@/components/FloatingHelpButton'
import { announcements } from '@/lib/site'

// Routes that have their own chrome — do NOT show main AnnouncementBar/Header/Footer
const EXCLUDED_PREFIXES = ['/kids', '/admin', '/member']

function isExcluded(pathname: string | null) {
  if (!pathname) return false
  return EXCLUDED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'))
}

function isKids(pathname: string | null) {
  if (!pathname) return false
  return pathname === '/kids' || pathname.startsWith('/kids/')
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const excluded = isExcluded(pathname)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  // Suppress innocuous Clipboard API blocked errors in sandboxed iframe previews
  useEffect(() => {
    const onRejection = (e: PromiseRejectionEvent) => {
      const msg = String(e.reason?.message || e.reason || '')
      if (msg.includes('Clipboard') && msg.includes('permissions policy')) {
        e.preventDefault()
      }
    }
    const onError = (e: ErrorEvent) => {
      const msg = String(e.message || e.error?.message || '')
      if (msg.includes('Clipboard') && msg.includes('permissions policy')) {
        e.preventDefault()
      }
    }
    window.addEventListener('unhandledrejection', onRejection)
    window.addEventListener('error', onError)
    return () => {
      window.removeEventListener('unhandledrejection', onRejection)
      window.removeEventListener('error', onError)
    }
  }, [])

  if (excluded) {
    // /kids has its own <div class="kids-scope"><KidsNav/><main id="main"/>+<KidsFooter/></div>
    // — return bare children so we don't duplicate <main> or top chrome.
    if (isKids(pathname)) return <>{children}</>
    // /admin and /member have their own sub-nav but no outer <main> — wrap bare so
    // skip-link still works and layout stays consistent without main Header/Footer.
    return (
      <div suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 z-[100] bg-white text-navy px-4 py-2 rounded-full border shadow"
        >
          Skip to content
        </a>
        <main id="main">{children}</main>
      </div>
    )
  }

  const isHome = pathname === '/'
  // Hydration-safe: render the same on server + first client paint; hide
  // top bar on home only after mount so server HTML matches initial client HTML.
  const showTopBar = mounted ? !isHome : true

  return (
    <div suppressHydrationWarning>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 z-[100] bg-white text-navy px-4 py-2 rounded-full border shadow"
      >
        Skip to content
      </a>
      {showTopBar && <AnnouncementBar items={announcements as any} />}
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingHelpButton />
      <CookieConsent />
    </div>
  )
}
