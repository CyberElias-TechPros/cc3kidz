'use client'
import { useState } from 'react'

const DEPARTMENTS = ['Choir & Music', 'Ushering & Hospitality', 'Media & Technical', 'Evangelism & Outreach', 'Prayer & Intercession', 'Cell Ministry', 'Foundation School', 'Teens & Children', 'Protocol', 'Welfare']

export default function VolunteerForm({ defaultDept }: { defaultDept?: string }) {
  const [s, setS] = useState({ name: '', phone: '', email: '', memberStatus: 'Member', department: defaultDept || DEPARTMENTS[0], skills: [] as string[], availability: '', note: '' })
  const [done, setDone] = useState<{ id: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const toggleSkill = (k: string) => setS(v => ({ ...v, skills: v.skills.includes(k) ? v.skills.filter(x => x !== k) : [...v.skills, k] }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErr(null)
    try {
      const r = await fetch('/api/volunteer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s) })
      const j = await r.json()
      if (!j.ok) throw new Error(j.error)
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
        <div className="h-12 w-12 rounded-full bg-navy text-white grid place-items-center mx-auto">✓</div>
        <h3 className="font-display font-extrabold mt-3">Application received</h3>
        <p className="text-sm text-muted mt-2">Coordinator for {s.department} will contact you. Ref: {done.id} — onboarding: Review → Contact → Orientation → Training → Assignment → Active.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="card p-6 space-y-3">
      <h3 className="font-display font-extrabold">Join a department</h3>
      {err && <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm">{err}</div>}
      <input required placeholder="Full name" value={s.name} onChange={e => setS({ ...s, name: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <div className="grid sm:grid-cols-2 gap-3">
        <input required placeholder="Phone / WhatsApp" value={s.phone} onChange={e => setS({ ...s, phone: e.target.value })} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
        <input placeholder="Email (optional)" value={s.email} onChange={e => setS({ ...s, email: e.target.value })} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <select value={s.memberStatus} onChange={e => setS({ ...s, memberStatus: e.target.value })} className="rounded-xl border border-black/10 px-4 py-3 text-sm">
          <option>Member</option>
          <option>New Convert</option>
          <option>Visitor</option>
        </select>
        <select value={s.department} onChange={e => setS({ ...s, department: e.target.value })} className="rounded-xl border border-black/10 px-4 py-3 text-sm">
          {DEPARTMENTS.map(d => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>
      <div>
        <div className="text-sm font-semibold">Skills & interests</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {['Music', 'Media', 'Photography', 'Sound', 'Graphics', 'Video', 'Writing', 'Admin', 'Hospitality', 'Teaching', 'Outreach', 'Events'].map(k => (
            <button
              key={k}
              type="button"
              onClick={() => toggleSkill(k)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold border ${s.skills.includes(k) ? 'bg-navy text-white border-navy' : 'bg-white border-black/10'}`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
      <input placeholder="Availability (e.g. Weekends, Evenings)" value={s.availability} onChange={e => setS({ ...s, availability: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <textarea placeholder="Note (optional)" rows={2} value={s.note} onChange={e => setS({ ...s, note: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <button disabled={loading} className="btn btn--navy w-full justify-center">
        {loading ? 'Sending…' : 'Submit Application'}
      </button>
    </form>
  )
}
