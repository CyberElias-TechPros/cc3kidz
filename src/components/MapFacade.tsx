'use client'
import { useState } from 'react'

/**
 * MapFacade — click-to-load Google Maps embed (P2 perf: no third-party iframe
 * JS until the visitor asks for it).
 */
export default function MapFacade({ lat, lng, address }: { lat: number; lng: number; address: string }) {
  const [loaded, setLoaded] = useState(false)
  if (!loaded) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 45%, #132040 0%, #0e1b33 70%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.7rem',
          cursor: 'pointer',
        }}
        role="button"
        tabIndex={0}
        aria-label={`Load interactive map — ${address}`}
        onClick={() => setLoaded(true)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') setLoaded(true)
        }}
      >
        <span style={{ fontSize: '2rem' }} aria-hidden>📍</span>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.85rem', textAlign: 'center', padding: '0 1rem' }}>{address}</span>
        <span
          style={{
            background: '#C6A04A',
            color: '#0E1B33',
            borderRadius: 999,
            padding: '0.5rem 1rem',
            fontSize: '0.75rem',
            fontWeight: 800,
          }}
        >
          Open map →
        </span>
      </div>
    )
  }
  return (
    <iframe
      title="Map"
      src={`https://maps.google.com/maps?q=${lat},${lng}&z=17&t=&ie=UTF8&iwloc=&output=embed`}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
      loading="lazy"
    />
  )
}
