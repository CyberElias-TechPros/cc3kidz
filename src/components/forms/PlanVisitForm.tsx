'use client'
import { useState } from 'react'

export default function PlanVisitForm() {
  const [s, setS] = useState({ name: '', phone: '', email: '', date: '', visitors: '1', firstTime: 'Yes, first time', children: false, note: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState<{ id: string } | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErr(null)
    try {
      const r = await fetch('/api/visit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s) })
      const j = await r.json()
      if (!j.ok) throw new Error(j.error || 'Failed')
      setDone(j)
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="card p-6 text-center">
        <div className="h-12 w-12 rounded-full bg-emerald-500 text-white grid place-items-center mx-auto">✓</div>
        <h3 className="font-display font-extrabold mt-3">You're all set!</h3>
        <p className="text-sm text-muted mt-2">We’ve received your plan to visit. A host will contact you at {s.phone} before {s.date}. Ref: {done.id}</p>
        <a href="/contact" className="btn btn--ghost mt-4">Get Directions</a>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="card p-6 space-y-3 h-fit">
      <h3 className="font-display font-extrabold">Plan your visit</h3>
      {err && <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm">{err}</div>}
      <input required placeholder="Your name" value={s.name} onChange={e => setS({ ...s, name: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <input required placeholder="Phone" value={s.phone} onChange={e => setS({ ...s, phone: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <input placeholder="Email (optional)" type="email" value={s.email} onChange={e => setS({ ...s, email: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <div className="grid grid-cols-2 gap-3">
        <input required type="date" value={s.date} onChange={e => setS({ ...s, date: e.target.value })} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
        <input placeholder="No. of visitors" value={s.visitors} onChange={e => setS({ ...s, visitors: e.target.value })} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
      </div>
      <select value={s.firstTime} onChange={e => setS({ ...s, firstTime: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm">
        <option>Yes, first time</option>
        <option>Returning</option>
      </select>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={s.children} onChange={e => setS({ ...s, children: e.target.checked })} /> I’m bringing children
      </label>
      <textarea placeholder="Assistance needed or note" rows={3} value={s.note} onChange={e => setS({ ...s, note: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <button disabled={loading} className="btn btn--navy w-full justify-center">
        {loading ? 'Sending…' : 'Submit Visit Plan'}
      </button>
      <p className="text-xs text-muted text-center">By submitting you agree to be contacted about your visit. Privacy: <a href="/privacy" className="underline">Privacy Policy</a></p>
    </form>
  )
}
