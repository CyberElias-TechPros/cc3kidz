import type { Platform, PlatformAudience } from '@/data/loveworld-platforms'
import { platformsFor } from '@/data/loveworld-platforms'
import PlatformCard from '@/components/PlatformCard'

/**
 * PlatformHub — full grid section of LoveWorld platforms for a scope.
 * Static server component (zero client JS), lazy-safe, no effects.
 */
export default function PlatformHub({
  eyebrow = 'LoveWorld Platforms',
  title,
  sub,
  items,
  audience,
  max = 12,
  style,
}: {
  eyebrow?: string
  title: string
  sub?: string
  items?: Platform[]
  audience?: PlatformAudience
  max?: number
  style?: React.CSSProperties
}) {
  const list = (items || (audience ? platformsFor(audience) : [])).slice(0, max)
  if (list.length === 0) return null
  return (
    <section className="section" style={{ background: '#fff', borderTop: '1px solid rgba(14,27,51,0.06)', ...style }}>
      <div className="container-cc">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
          <div>
            <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C6A04A' }}>{eyebrow}</span>
            <h2 style={{ fontFamily: 'var(--font-display),serif', fontWeight: 800, color: '#0E1B33', fontSize: '1.7rem', lineHeight: 1.1, marginTop: '0.4rem' }}>{title}</h2>
            {sub && <p style={{ color: '#64748B', fontSize: '0.88rem', marginTop: '0.4rem', maxWidth: '62ch' }}>{sub}</p>}
          </div>
          <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>Official platforms — opens in a new tab ↗</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: '0.7rem' }}>
          {list.map(p => (
            <PlatformCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
