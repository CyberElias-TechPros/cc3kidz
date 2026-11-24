'use client'
import { useState, useMemo } from 'react'
import churches from '@/data/groupChurches.json'

function suggestChurch(area: string) {
  const a = area.toLowerCase()
  const map: Record<string, string> = {
    rumuokwuta: 'secretariat',
    rumuepirikom: 'secretariat',
    rumuola: 'central-3-orazi',
    orazi: 'central-3-orazi',
    gbalajam: 'central-3-orazi',
    eliozu: 'oasis',
    rumuokoro: 'oasis',
    'trans-amadi': 'glorious',
    gra: 'limitless',
    'ada-george': 'advantage',
    wimpey: 'advantage',
  }
  for (const [k, v] of Object.entries(map)) if (a.includes(k)) return (churches as any[]).find((c: any) => c.id === v) || null
  return null
}

export default function JoinCellForm() {
  const [s, setS] = useState({ name: '', phone: '', area: '', note: '' })
  const [done, setDone] = useState(false)
  const [didSuggest, setDidSuggest] = useState<any>(null)
  const suggestion = useMemo(() => (s.area ? suggestChurch(s.area) : null), [s.area])

  if (done) {
    const ch = didSuggest
    return (
      <div className="card p-6 text-center">
        <div className="h-10 w-10 rounded-full bg-emerald-500 text-white grid place-items-center mx-auto">✓</div>
        <h3 className="font-display font-extrabold mt-2">Request sent{ch ? ` — ${ch.name}` : ''}</h3>
        <p className="text-sm text-muted">We’ll connect you shortly to the nearest church{ch ? ` (${ch.shortName})` : ''} + cell.</p>
        {ch && <div className="mt-3 rounded-xl bg-sand p-3 text-sm"><strong>{ch.name}</strong><br />{ch.address}<br />{ch.serviceTimes[0].day} {ch.serviceTimes[0].time}</div>}
      </div>
    )
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        setDidSuggest(suggestion)
        setDone(true)
      }}
      className="card p-6 space-y-3"
    >
      <h3 className="font-display font-extrabold">Join a Cell — quick connect</h3>
      <input required placeholder="Name" value={s.name} onChange={e => setS({ ...s, name: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <input required placeholder="Phone / WhatsApp" value={s.phone} onChange={e => setS({ ...s, phone: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <input placeholder="Your street / area (e.g. Rumuokwuta, GRA, Orazi)" value={s.area} onChange={e => setS({ ...s, area: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      {suggestion ? (
        <div className="rounded-xl bg-gold/15 border border-gold/20 px-3 py-2 text-xs">Auto-assigned to <strong>{suggestion.name}</strong> — {suggestion.area} · {suggestion.serviceTimes[0].day} {suggestion.serviceTimes[0].time}</div>
      ) : s.area ? (
        <div className="rounded-xl bg-sand px-3 py-2 text-xs text-muted">We’ll match your area to the nearest of our 7 churches.</div>
      ) : null}
      <textarea placeholder="Note (optional)" value={s.note} onChange={e => setS({ ...s, note: e.target.value })} rows={2} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <button className="btn btn--navy w-full justify-center">Connect Me</button>
      <p className="text-xs text-muted text-center">Private homes not published — leader contacts you directly. Assignment shown above.</p>
    </form>
  )
}
