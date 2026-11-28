'use client'
import { useEffect } from 'react'
import { useIsMobile } from './useIsMobile'

// Inertial smooth scroll - Lenis-style without heavy dep
// Mobile: native scroll only

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { shouldReduce } = useIsMobile()

  useEffect(() => {
    if (shouldReduce) {
      document.documentElement.style.scrollBehavior = 'smooth'
      return
    }

    // Desktop: weighted inertial feel via CSS + JS velocity tracking
    let current = window.scrollY
    let target = window.scrollY
    let raf = 0
    let ticking = false
    const ease = 0.08
    const threshold = 0.5

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b

    const onScroll = () => {
      target = window.scrollY
      if (!ticking) {
        ticking = true
        raf = requestAnimationFrame(update)
      }
    }

    const update = () => {
      // Subtle velocity-based skew for masterclass feel - applied via CSS var
      const diff = target - current
      const velocity = Math.abs(diff)
      
      if (velocity > threshold) {
        current = lerp(current, target, ease)
        // Feed velocity to CSS for parallax/text effects
        document.documentElement.style.setProperty('--scroll-velocity', String(Math.min(velocity / 50, 1)))
        document.documentElement.style.setProperty('--scroll-y', String(current))
        raf = requestAnimationFrame(update)
      } else {
        current = target
        ticking = false
        document.documentElement.style.setProperty('--scroll-velocity', '0')
      }

      // Parallax elements
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => {
        const speed = parseFloat(el.dataset.parallax || '0.5')
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const offset = (center - window.innerHeight / 2) * speed * 0.15
        el.style.transform = `translateY(${offset}px)`
      })
    }

    // View Transitions API enhancement for same-origin navigations
    const enhanceLinks = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach(a => {
        a.addEventListener('click', (e) => {
          const url = new URL(a.href, location.origin)
          if (url.origin !== location.origin) return
          // Let Next.js handle, but add view transition if supported
          if ('startViewTransition' in document) {
            // Next.js will handle navigation, we just hint
            document.documentElement.style.viewTransitionName = 'main'
          }
        })
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    enhanceLinks()

    // CSS smooth
    document.documentElement.style.scrollBehavior = 'smooth'

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      document.documentElement.style.removeProperty('--scroll-velocity')
    }
  }, [shouldReduce])

  return <>{children}</>
}
