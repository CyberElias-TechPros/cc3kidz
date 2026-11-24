'use client'
import { useMemo, useState } from 'react'
import cells from '@/data/cells.json'
import churches from '@/data/groupChurches.json'
import Link from 'next/link'

function autoChurch(area: string): (typeof churches)[number] | null {
  const a = area.toLowerCase()
  if (!a.trim()) return null
  const map: Record<string, string> = {
    rumuokwuta: 'secretariat',
    rumuepirikom: 'secretariat',
    'port harcourt (young adults)': 'secretariat',
    rumuola: 'central-3-orazi',
    orazi: 'central-3-orazi',
    gbalajam: 'central-3-orazi',
    eliozu: 'oasis',
    rumuokoro: 'oasis',
    'trans-amadi': 'glorious',
    'bayview': 'trans-amadi',
    gra: 'limitless',
    'ada-george': 'advantage',
    'ada george': 'advantage',
    wimpey: 'advantage',
  }
  for (const [key, churchId] of Object.entries(map)) {
    if (a.includes(key)) return (churches as any[]).find((c: any) => c.id === churchId) || null
  }
  return null
}

export default function CellFinder() {
  const [area, setArea] = useState('')
  const [churchId, setChurchId] = useState('')
  const [day, setDay] = useState('')
  const [q, setQ] = useState('')

  const suggested = useMemo(() => (area ? autoChurch(area) : null), [area])

  const filtered = useMemo(() => {
    return (cells as any[]).filter(c => {
      if (area && !c.area.toLowerCase().includes(area.toLowerCase())) return false
      if (churchId && c.churchId !== churchId) return false
      if (day && c.day !== day) return false
      if (q && !`${c.name} ${c.leader} ${c.area} ${c.church}`.toLowerCase().includes(q.toLowerCase())) return false
      return true
    })
  }, [area, churchId, day, q])

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex-1 grid sm:grid-cols-4 gap-3 w-full">
          <label className="text-sm">
            <span className="font-semibold text-navy">Area / Neighbourhood</span>
            <select value={area} onChange={e => { setArea(e.target.value); }} className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm">
              <option value="">All areas</option>
              <option>Rumuokwuta</option>
              <option>Rumuepirikom</option>
              <option>Rumuola</option>
              <option>Orazi</option>
              <option>Eliozu</option>
              <option>Rumuokoro</option>
              <option>Trans-Amadi</option>
              <option>GRA</option>
              <option>Ada-George</option>
              <option>Port Harcourt (Young Adults)</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="font-semibold text-navy">Church</span>
            <select value={churchId} onChange={e => setChurchId(e.target.value)} className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm">
              <option value="">All churches</option>
              {(churches as any[]).map((ch: any) => (
                <option key={ch.id} value={ch.id}>{ch.shortName} — {ch.area}</option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span className="font-semibold text-navy">Meeting day</span>
            <select value={day} onChange={e => setDay(e.target.value)} className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm">
              <option value="">Any day</option>
              <option>Thursday</option>
              <option>Saturday</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="font-semibold text-navy">Search</span>
            <input placeholder="Cell or leader" value={q} onChange={e => setQ(e.target.value)} className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm" />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-navy text-white px-3 py-1 font-bold">{filtered.length} {filtered.length === 1 ? 'cell' : 'cells'} found</span>
          {suggested && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/20 px-3 py-1">
              Suggested church: <strong>{suggested.name}</strong> — {suggested.area} · <button onClick={() => setChurchId(suggested.id)} className="underline font-semibold">Filter →</button>
            </span>
          )}
          {churchId && (
            <button onClick={() => setChurchId('')} className="rounded-full border border-black/10 px-3 py-1 hover:bg-sand">Clear church filter</button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c: any) => (
          <div key={c.id} className="card p-5 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest uppercase text-gold">
                {c.area} · {c.day} {c.time}
              </span>
              <span className="ml-auto rounded-full bg-sand px-2.5 py-0.5 text-xs font-semibold">{c.church}</span>
            </div>
            <h3 className="font-display font-extrabold leading-tight mt-1">{c.name}</h3>
            <div className="text-sm mt-2">
              <div>
                <span className="font-semibold">Leader:</span> {c.leader}
              </div>
              <div>
                <span className="font-semibold">Asst:</span> {c.asst}
              </div>
              <div className="text-muted text-xs mt-1">{c.venue}</div>
            </div>
            <div className="mt-2 flex gap-2">
              <span className="inline-flex rounded-full bg-navy text-white px-3 py-1 text-xs font-bold">{c.members} members</span>
              <Link href={`/group/${(churches as any[]).find((ch: any) => ch.id === c.churchId)?.slug || 'secretariat'}`} className="rounded-full border border-black/10 px-3 py-1 text-xs">View church →</Link>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link href="/contact" className="btn btn--navy !py-2 text-xs justify-center">
                Contact Leader
              </Link>
              <a href="#join" className="btn btn--ghost !py-2 text-xs justify-center">
                Join Cell
              </a>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="card p-10 text-center col-span-full text-muted">No cells match — try another area or contact us. Auto-assignment suggests a church based on your street.</div>}
      </div>

      <div id="join" className="card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-extrabold">Can’t find a nearby cell?</h3>
          <p className="text-sm text-muted">Tell us your street — we’ll auto-assign you to the nearest church + cell and assist with transport guidance.</p>
        </div>
        <Link href="/contact" className="btn btn--navy">
          Request Connection
        </Link>
      </div>
    </div>
  )
}
