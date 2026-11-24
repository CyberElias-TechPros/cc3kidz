'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import churches from '@/data/groupChurches.json'

// Leaflet map — client-only, dynamic to avoid SSR
import dynamic from 'next/dynamic'

const ZONAL_HQ = { lat: 4.803, lng: 7.032, name: 'PH Zone 3 — Zonal Church & HQ', address: 'Jessy & Jenny St, off Peter Odili Rd, Port Harcourt' }

function MapInner() {
  // dynamic import inside component to ensure window exists
  const MapContainer = (require('react-leaflet') as any).MapContainer
  const TileLayer = (require('react-leaflet') as any).TileLayer
  const Marker = (require('react-leaflet') as any).Marker
  const Popup = (require('react-leaflet') as any).Popup
  const L = require('leaflet')

  // Fix default marker icon paths for Next.js
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
    })
  }, [])

  const goldIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })

  const hqIcon = new L.DivIcon({
    html: '<div style="background:#C6A04A;color:#10172B;border-radius:999px;width:28px;height:28px;display:grid;place-items:center;font-weight:900;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)">Z</div>',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    className: ''
  })

  return (
    <MapContainer center={[4.83, 6.99] as any} zoom={12} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Zonal HQ */}
      <Marker position={[ZONAL_HQ.lat, ZONAL_HQ.lng] as any} icon={hqIcon}>
        <Popup><strong>{ZONAL_HQ.name}</strong><br />{ZONAL_HQ.address}<br /><Link href="https://live.cephzone3.org" target="_blank" className="text-blue-600 underline">Live.CEPHZONE3.org →</Link></Popup>
      </Marker>
      {(churches as any[]).map((c: any) => (
        <Marker key={c.id} position={[c.coords.lat, c.coords.lng]} icon={goldIcon}>
          <Popup>
            <strong>{c.name}</strong><br />{c.address}<br /><em>{c.pastor} — {c.title}</em><br />
            <Link href={`/group/${c.slug}`} className="text-blue-600 underline">View church →</Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

// Use dynamic with ssr false via wrapper to avoid hydration mismatch on leaflet
const DynamicMap = dynamic(() => Promise.resolve(MapInner), { ssr: false, loading: () => <div className="h-full grid place-items-center text-muted text-sm">Loading map…</div> })

export function ZoneMap() {
  return (
    <div className="card overflow-hidden p-0">
      <div className="p-4 flex items-center justify-between">
        <h3 className="font-display font-extrabold">Zone Map — PH Zone 3 · CC3 Group</h3>
        <span className="hidden sm:inline-flex rounded-full bg-gold/15 border border-gold/20 px-3 py-1 text-xs font-bold">7 churches + Zonal HQ</span>
      </div>
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="h-[360px] lg:h-[420px] bg-sand relative">
          {/* leaflet css */}
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <DynamicMap />
        </div>
        <div className="p-5 bg-white">
          <h4 className="font-semibold text-sm">All locations</h4>
          <div className="mt-3 space-y-2 max-h-[360px] overflow-auto pr-1">
            <div className="rounded-xl bg-navy text-white p-3">
              <div className="font-display font-bold text-sm">PH Zone 3 Zonal HQ</div>
              <div className="text-xs text-white/70">{ZONAL_HQ.address}</div>
            </div>
            {(churches as any[]).map((c: any) => (
              <Link key={c.id} href={`/group/${c.slug}`} className="flex justify-between items-start rounded-xl border border-black/10 p-3 hover:bg-sand transition">
                <div>
                  <div className="font-semibold text-sm">{c.shortName}</div>
                  <div className="text-xs text-muted line-clamp-1">{c.address}</div>
                  <div className="text-xs text-gold font-semibold">{c.pastor}</div>
                </div>
                <span className="shrink-0 rounded-full bg-navy text-white px-2.5 py-1 text-xs">→</span>
              </Link>
            ))}
          </div>
          <a href="https://maps.google.com/?q=4.8427161194266155,6.984262611031861" target="_blank" className="mt-4 btn btn--ghost w-full justify-center">Open Central Church 3 in Google Maps</a>
        </div>
      </div>
    </div>
  )
}

export function MiniZoneMap({ churchId }: { churchId?: string }) {
  const c: any = (churches as any[]).find(x => x.id === churchId) || (churches as any[])[0]
  return (
    <div className="card overflow-hidden p-0">
      <div className="h-[220px] bg-sand relative">
        <iframe
          title={`Map — ${c.name}`}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(c.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex gap-2">
        <a href={`https://maps.google.com/?q=${encodeURIComponent(c.address)}`} target="_blank" className="btn btn--navy flex-1 justify-center">Directions →</a>
        <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`} target="_blank" className="btn btn--ghost flex-1 justify-center">WhatsApp</a>
      </div>
    </div>
  )
}
