'use client'
import { useState } from 'react'

export default function EventRegisterForm({ eventSlug, title }: { eventSlug: string; title: string }) {
  const [open, setOpen] = useState(false)
  const [s, setS] = useState({ name: '', phone: '', email: '', attendees: '1', member: 'visitor' })
  const [done, setDone] = useState<{ ticket: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErr(null)
    try {
      const r = await fetch('/api/events/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...s, eventSlug }) })
      const j = await r.json()
      if (!j.ok) throw new Error(j.error)
      setDone(j)
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn--navy justify-center">
        Register
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-navy/60 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
          <div className="bg-paper rounded-[1.4rem] max-w-lg w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            {!done ? (
              <form onSubmit={submit} className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-extrabold">Register — {title}</h3>
                  <button type="button" onClick={() => setOpen(false)} className="h-8 w-8 grid place-items-center rounded-full bg-black/5">
                    ✕
                  </button>
                </div>
                {err && <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm">{err}</div>}
                <input required placeholder="Full name" value={s.name} onChange={e => setS({ ...s, name: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm bg-white" />
                <input required placeholder="Phone" value={s.phone} onChange={e => setS({ ...s, phone: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm bg-white" />
                <input placeholder="Email (optional)" value={s.email} onChange={e => setS({ ...s, email: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm bg-white" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Attendees (incl. you)" value={s.attendees} onChange={e => setS({ ...s, attendees: e.target.value })} className="rounded-xl border border-black/10 px-4 py-3 text-sm bg-white" />
                  <select value={s.member} onChange={e => setS({ ...s, member: e.target.value })} className="rounded-xl border border-black/10 px-4 py-3 text-sm bg-white">
                    <option value="visitor">Visitor</option>
                    <option value="member">Member</option>
                  </select>
                </div>
                <p className="text-xs text-muted">You’ll receive a QR ticket reference after confirmation. Reminders via broadcast.</p>
                <button disabled={loading} className="btn btn--navy w-full justify-center">
                  {loading ? 'Registering…' : 'Confirm Registration'}
                </button>
              </form>
            ) : (
              <div className="p-8 text-center space-y-3">
                <div className="h-14 w-14 rounded-2xl bg-navy text-white grid place-items-center mx-auto">✓</div>
                <h3 className="font-display font-extrabold">You’re registered!</h3>
                <p className="text-sm text-muted">Ticket for {title}</p>
                <div className="rounded-xl bg-white border border-black/10 p-4 font-mono text-sm tracking-widest">{done.ticket}</div>
                <p className="text-xs text-muted">Show this at the entrance. Add to calendar from Events.</p>
                <button onClick={() => setOpen(false)} className="btn btn--navy w-full justify-center">
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
