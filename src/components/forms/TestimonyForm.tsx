'use client'
import { useState } from 'react'

export default function TestimonyForm() {
  const [s, setS] = useState({ name: '', title: '', category: 'Healing', body: '', consent: false })
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErr(null)
    try {
      const r = await fetch('/api/testimony', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s) })
      const j = await r.json()
      if (!j.ok) throw new Error(j.error)
      setDone(true)
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="card p-6 text-center">
        <div className="h-12 w-12 rounded-full bg-gold text-navy grid place-items-center mx-auto">✦</div>
        <h3 className="font-display font-extrabold mt-3">Thank you — under review</h3>
        <p className="text-sm text-muted mt-2">We never auto-publish. Your testimony is now Pending → Approved → Published. We’ll contact you if needed.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="card p-6 space-y-3 h-fit">
      <h3 className="font-display font-extrabold">Submit your testimony</h3>
      <p className="text-sm text-muted">Respectful, consent-driven. No auto-publish.</p>
      {err && <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm">{err}</div>}
      <input placeholder="Your name (or Anonymous)" value={s.name} onChange={e => setS({ ...s, name: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <input required placeholder="Title" value={s.title} onChange={e => setS({ ...s, title: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <select value={s.category} onChange={e => setS({ ...s, category: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm">
        <option>Healing</option>
        <option>Salvation</option>
        <option>Faith</option>
        <option>Family</option>
        <option>Career</option>
        <option>Answered Prayer</option>
      </select>
      <textarea required placeholder="Your testimony" rows={5} value={s.body} onChange={e => setS({ ...s, body: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <label className="flex items-center gap-2 text-xs text-muted">
        <input required type="checkbox" checked={s.consent} onChange={e => setS({ ...s, consent: e.target.checked })} /> I consent to publishing (with editing if needed)
      </label>
      <button disabled={loading} className="btn btn--navy w-full justify-center">
        {loading ? 'Submitting…' : 'Submit Testimony'}
      </button>
    </form>
  )
}
