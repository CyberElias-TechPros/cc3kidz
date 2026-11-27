import type { Platform, PlatformAudience } from '@/data/loveworld-platforms'
import { platformsFor } from '@/data/loveworld-platforms'
import PlatformCard from '@/components/PlatformCard'

/**
 * PlatformStrip — compact row of platform cards for a scope.
 * Static links only (zero client JS); grid collapses to 1-col on mobile.
 */
export default function PlatformStrip({
  title,
  sub,
  items,
  audience,
  max = 8,
  columns = 'repeat(auto-fit,minmax(200px,1fr))',
}: {
  title?: string
  sub?: string
  items?: Platform[]
  audience?: PlatformAudience
  max?: number
  columns?: string
}) {
  const list = (items || (audience ? platformsFor(audience) : [])).slice(0, max)
  if (list.length === 0) return null
  return (
    <div>
      {title && (
        <div style={{ marginBottom: '0.7rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display),serif', fontWeight: 900, color: '#0E1B33', fontSize: '1.15rem' }}>{title}</h3>
          {sub && <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.2rem' }}>{sub}</p>}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: columns, gap: '0.6rem' }}>
        {list.map(p => (
          <PlatformCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  )
}
