'use client'
import { useState } from 'react'

export default function PrayerForm() {
  const [s, setS] = useState({ name: '', contact: '', category: 'Personal', body: '', confidential: true, followUp: false })
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErr(null)
    try {
      const r = await fetch('/api/prayer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s) })
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
        <div className="h-12 w-12 rounded-full bg-navy text-white grid place-items-center mx-auto">🙏</div>
        <h3 className="font-display font-extrabold mt-3">We are praying with you</h3>
        <p className="text-sm text-muted mt-2">Your request is private — only our authorised prayer team will see it. {s.followUp ? 'We will follow up shortly.' : ''}</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="card p-6 space-y-3">
      <h2 className="font-display font-extrabold text-xl">Submit a prayer request</h2>
      {err && <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm">{err}</div>}
      <input placeholder="Name (optional)" value={s.name} onChange={e => setS({ ...s, name: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <input placeholder="Phone or email (optional, for follow-up)" value={s.contact} onChange={e => setS({ ...s, contact: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <select value={s.category} onChange={e => setS({ ...s, category: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm">
        <option>Personal</option>
        <option>Family</option>
        <option>Spiritual Growth</option>
        <option>Work</option>
        <option>Direction</option>
        <option>Thanksgiving</option>
      </select>
      <textarea required placeholder="Your prayer request" rows={5} value={s.body} onChange={e => setS({ ...s, body: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={s.confidential} onChange={e => setS({ ...s, confidential: e.target.checked })} /> I request confidential prayer
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={s.followUp} onChange={e => setS({ ...s, followUp: e.target.checked })} /> I would like a follow-up
      </label>
      <button disabled={loading} className="btn btn--navy w-full justify-center">
        {loading ? 'Sending…' : 'Send Request'}
      </button>
      <p className="text-xs text-muted">Access limited to authorised pastoral/prayer personnel. Retention per church policy.</p>
    </form>
  )
}
