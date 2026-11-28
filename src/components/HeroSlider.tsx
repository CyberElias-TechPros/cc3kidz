'use client'
import { useEffect, useState } from 'react'

const SLIDES = [
  {
    src: '/assets/images/leaders/pastor-chris-oyakhilome.jpg',
    alt: 'Pastor Chris Oyakhilome — President, LoveWorld Inc.',
    name: 'Pastor Chris Oyakhilome',
    title: 'President, LoveWorld Inc.',
  },
  {
    src: '/assets/images/leaders/pastor-linda-okocha.jpg',
    alt: 'Pastor Linda Okocha — Zonal Director, Port Harcourt Zone 3',
    name: 'Pastor Linda Okocha',
    title: 'Zonal Director, PH Zone 3',
  },
  {
    src: '/assets/images/leaders/pastor-kelson-onoriode.jpg',
    alt: 'Pastor Kelson Onoriode — Pastor, Christ Embassy Central Church 3',
    name: 'Pastor Kelson Onoriode',
    title: 'Pastor, CE Central Church 3',
  },
]

export default function HeroSlider() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx(i => (i + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [paused])

  return (
    <div
      className="kl-hero__slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Pastors of LoveWorld"
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          className={`kl-hero__slide ${i === idx ? 'is-active' : ''}`}
          aria-hidden={i !== idx}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.src} alt={s.alt} referrerPolicy="no-referrer" style={{ objectPosition: 'top center' }} />
          <div className="kl-hero__slide-caption">
            <div className="kl-hero__slide-name">{s.name}</div>
            <div className="kl-hero__slide-title">{s.title}</div>
          </div>
        </div>
      ))}
      <div className="kl-hero__dots" role="tablist" aria-label="Select pastor">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === idx}
            aria-label={`Go to ${SLIDES[i].name}`}
            className={`kl-hero__dot ${i === idx ? 'is-active' : ''}`}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </div>
  )
}
