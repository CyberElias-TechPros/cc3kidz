'use client'
import { useEffect, useState } from 'react'

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isLowPower, setIsLowPower] = useState(false)

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < breakpoint || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      // Low power detection via hardwareConcurrency and connection
      const nav: any = navigator
      const cores = nav.hardwareConcurrency || 4
      const saveData = nav.connection?.saveData
      const slowConnection = nav.connection?.effectiveType?.includes('2g')
      setIsLowPower(cores <= 4 || saveData || slowConnection)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])

  return { isMobile, prefersReducedMotion, isLowPower, shouldReduce: isMobile || prefersReducedMotion || isLowPower }
}

export function useDeviceTier() {
  const { isMobile, prefersReducedMotion, isLowPower } = useIsMobile()
  if (prefersReducedMotion) return 'minimal' as const
  if (isMobile || isLowPower) return 'lite' as const
  return 'full' as const
}
