'use client'
import { useEffect, useState } from 'react'
import { useIsMobile } from '@/components/effects/useIsMobile'
import type { ChurchSlide } from '@/components/ChurchSlider'

/**
 * YouthHeroSlider — crossfading full-bleed background + wired 01/03 nav
 * for the youth Swiss hero. Autoplay desktop-only (minimize heavy effects
 * on mobile); nav buttons always work.
 */
export default function YouthHeroSlider({
  slides,
  interval = 6000,
}: {
  slides: ChurchSlide[]
  interval?: number
}) {
  const isMobile = useIsMobile()
  const [i, setI] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const n = slides.length

  // P0 accessibility: autoplay off under prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (isMobile || reducedMotion || n < 2) return
    const t = setInterval(() => setI(v => (v + 1) % n), interval)
    return () => clearInterval(t)
  }, [isMobile, reducedMotion, n, interval])

  const go = (k: number) => setI(((k % n) + n) % n)

  return (
    <>
      <div className="youth-swiss-hero__bg">
        {slides.map((s, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={k}
            src={s.src}
            alt={k === i ? s.alt : ''}
            className={k === i ? 'on' : ''}
            loading={k === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>
      <div className="youth-swiss-hero__nav">
        <button aria-label="Previous slide" onClick={() => go(i - 1)}>
          ‹
        </button>
        <span>
          {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </span>
        <button aria-label="Next slide" onClick={() => go(i + 1)}>
          ›
        </button>
      </div>
    </>
  )
}
