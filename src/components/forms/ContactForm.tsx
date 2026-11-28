'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [done, setDone] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [s, setS] = useState({ name: '', phone: '', email: '', category: 'General enquiries', message: '', method: 'Phone' })
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErr(null)
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s) })
      const j = await r.json()
      if (!j.ok) throw new Error(j.error)
      setDone(true)
    } catch (e: any) { setErr(e.message) } finally { setLoading(false) }
  }
  if (done) return <div className="card p-6 text-center"><div className="h-10 w-10 rounded-full bg-emerald-500 text-white grid place-items-center mx-auto">✓</div><h3 className="font-display font-extrabold mt-2">Message sent</h3><p className="text-sm text-muted">We’ll respond via {s.method.toLowerCase()} soon.</p></div>
  return (
    <form onSubmit={submit} className="card p-6 space-y-3">
      <h2 className="font-display font-extrabold text-xl">Send a message</h2>
      {err && <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm">{err}</div>}
      <div className="grid sm:grid-cols-2 gap-3">
        <input required placeholder="Name" value={s.name} onChange={e => setS({ ...s, name: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
        <input placeholder="Phone" value={s.phone} onChange={e => setS({ ...s, phone: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      </div>
      <input placeholder="Email" type="email" value={s.email} onChange={e => setS({ ...s, email: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <select value={s.category} onChange={e => setS({ ...s, category: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm">
        <option>General enquiries</option>
        <option>First-time visitors</option>
        <option>Prayer</option>
        <option>Events</option>
        <option>Foundation School</option>
        <option>Cell Ministry</option>
        <option>Media</option>
        <option>Partnership</option>
      </select>
      <textarea required placeholder="Message" rows={5} value={s.message} onChange={e => setS({ ...s, message: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <select value={s.method} onChange={e => setS({ ...s, method: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm">
        <option>Phone</option>
        <option>WhatsApp</option>
        <option>Email</option>
      </select>
      <button disabled={loading} className="btn btn--navy w-full justify-center">{loading ? 'Sending…' : 'Send Message'}</button>
    </form>
  )
}
