import type { Platform } from '@/data/loveworld-platforms'
import './PlatformCards.css'

export default function PlatformCard({ p, compact = false }: { p: Platform; compact?: boolean }) {
  const badgeClass = p.badge ? `pl-card__badge pl-card__badge--${p.badge.toLowerCase().replace(/\s/g, '-')}` : ''
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noreferrer"
      className={`pl-card ${p.featured ? 'pl-card--featured' : ''}`}
      aria-label={`${p.name} — opens the official LoveWorld platform in a new tab`}
    >
      <div className="pl-card__top">
        <span className="pl-card__icon" aria-hidden>{p.icon}</span>
        <span className="pl-card__name">{p.name}</span>
        {p.badge && <span className={badgeClass}>{p.badge}</span>}
      </div>
      {!compact && <p className="pl-card__blurb">{p.blurb}</p>}
      <span className="pl-card__cta">{p.cta || 'Open official'} ↗</span>
    </a>
  )
}
