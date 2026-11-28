'use client'
import { useCallback, useEffect, useState } from 'react'
import { useIsMobile } from '@/components/effects/useIsMobile'
import './ChurchSlider.css'

export type ChurchSlide = {
  src: string
  alt: string
  caption?: string
  sub?: string
}

/**
 * ChurchSlider — light, accessible crossfade carousel for authentic church photos.
 * Desktop: autoplay + arrows + dots + captions. Mobile: autoplay off, arrows hidden
 * (minimize heavy effects on mobile) — dots and swipe-free taps still work.
 */
export default function ChurchSlider({
  slides,
  interval = 5200,
  className = '',
  style,
  eagerFirst = false,
  showArrows = true,
  showDots = true,
  showCaptions = true,
  autoplay = true,
}: {
  slides: ChurchSlide[]
  interval?: number
  className?: string
  style?: React.CSSProperties
  eagerFirst?: boolean
  showArrows?: boolean
  showDots?: boolean
  showCaptions?: boolean
  autoplay?: boolean
}) {
  const isMobile = useIsMobile()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const n = slides.length

  // P0 accessibility: autoplay off when the OS requests reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!autoplay || isMobile || paused || reducedMotion || n < 2) return
    const t = setInterval(() => setI(v => (v + 1) % n), interval)
    return () => clearInterval(t)
  }, [autoplay, isMobile, paused, reducedMotion, n, interval])

  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n])
  const active = slides[i]

  return (
    <div
      className={`church-slider ${className}`}
      style={style}
      role="region"
      aria-roledescription="carousel"
      aria-label={active?.alt || 'Photo carousel'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, k) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={k}
          src={s.src}
          alt={k === i ? s.alt : ''}
          className={`church-slider__slide ${k === i ? 'on' : ''}`}
          loading={k === 0 && eagerFirst ? 'eager' : 'lazy'}
          draggable={false}
        />
      ))}

      {showCaptions && active?.caption && (
        <div className="church-slider__cap">
          <b>{active.caption}</b>
          {active.sub && <span>{active.sub}</span>}
        </div>
      )}

      {showArrows && n > 1 && !isMobile && (
        <>
          <button className="church-slider__arrow left" aria-label="Previous slide" onClick={() => go(i - 1)}>
            ‹
          </button>
          <button className="church-slider__arrow right" aria-label="Next slide" onClick={() => go(i + 1)}>
            ›
          </button>
          {autoplay && !reducedMotion && (
            <button
              className="church-slider__pause"
              aria-pressed={paused}
              aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}
              onClick={() => setPaused(v => !v)}
            >
              {paused ? '▶' : '⏸'}
            </button>
          )}
        </>
      )}

      {showDots && n > 1 && (
        <div className="church-slider__dots">
          {slides.map((_, k) => (
            <button
              key={k}
              className={`church-slider__dot ${k === i ? 'on' : ''}`}
              aria-label={`Go to slide ${k + 1}`}
              aria-current={k === i}
              onClick={() => go(k)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
