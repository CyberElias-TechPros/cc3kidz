'use client'
import { useEffect, useState } from 'react'
import cells from '@/data/cells.json'
import ministries from '@/data/ministries.json'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [pw, setPw]=useState({current:'',next:'',confirm:''})
  const [msg,setMsg]=useState<string|null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', department: '', cellId: '' })

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(j => {
        setUser(j.user)
        if (j.user) setForm({ name: j.user.name || '', email: j.user.email || '', phone: j.user.phone || '', department: j.user.department || '', cellId: j.user.cellId || '' })
      })
  }, [])

  if (!user) return <div className="card p-6">Loading profile…</div>

  const saveProfile=async()=>{
    setSaving(true); setMsg(null)
    try{
      const r=await fetch('/api/auth/me',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)})
      const j=await r.json()
      if(j.ok && j.user){ setUser(j.user); setMsg('Profile saved ✓') } else setMsg(j.error||'Failed')
    } finally{ setSaving(false)}
  }
  const changePw=async()=>{
    if (pw.next!==pw.confirm){ setMsg('Passwords do not match'); return }
    setMsg(null)
    const r=await fetch('/api/auth/change-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({current:pw.current,next:pw.next})})
    const j=await r.json()
    setMsg(j.ok? 'Password updated ✓' : j.error)
    if(j.ok) setPw({current:'',next:'',confirm:''})
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h2 className="font-display font-extrabold text-xl">Profile</h2>
        <p className="text-sm text-muted">Update contact, church location, cell, department. Changes persist to .data/db.json and sync to pastor dashboards.</p>
        {msg && <div className="mt-3 rounded-xl bg-sand border px-3 py-2 text-sm">{msg}</div>}
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          <label className="text-sm"><span className="font-semibold">Full name</span><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 text-sm" /></label>
          <label className="text-sm"><span className="font-semibold">Email (login)</span><input value={form.email} readOnly className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 text-sm bg-sand" /></label>
          <label className="text-sm"><span className="font-semibold">Phone / WhatsApp</span><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+234 ..." className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 text-sm" /></label>
          <label className="text-sm"><span className="font-semibold">Department</span>
            <select value={form.department} onChange={e=>setForm({...form,department:e.target.value})} className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 text-sm">
              <option value="">— Select —</option>
              {(ministries as any[]).map((m:any)=><option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
          </label>
          <label className="text-sm"><span className="font-semibold">Cell</span>
            <select value={form.cellId} onChange={e=>setForm({...form,cellId:e.target.value})} className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 text-sm">
              <option value="">— Not assigned —</option>
              {(cells as any[]).map((c:any)=><option key={c.id} value={c.id}>{c.name} — {c.area} · {c.church}</option>)}
            </select>
          </label>
          <div className="rounded-xl border border-black/10 px-4 py-3 text-sm bg-white">Preferred church: Central Church 3 · 30B Rumuokwuta</div>
        </div>
        <button onClick={saveProfile} className="btn btn--navy mt-4">{saving ? 'Saving…' : 'Save Changes'}</button>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-extrabold">Change password</h3>
        <div className="mt-3 grid sm:grid-cols-3 gap-3">
          <input type="password" placeholder="Current" value={pw.current} onChange={e=>setPw({...pw,current:e.target.value})} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
          <input type="password" placeholder="New (≥6)" value={pw.next} onChange={e=>setPw({...pw,next:e.target.value})} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
          <input type="password" placeholder="Confirm new" value={pw.confirm} onChange={e=>setPw({...pw,confirm:e.target.value})} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
        </div>
        <button onClick={changePw} className="btn btn--ghost mt-3">Update Password</button>
        <p className="text-xs text-muted mt-2">Hashed with bcrypt, rotated in both file-store and Postgres (when DATABASE_URL set). Rate-limited 10/min.</p>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-extrabold">Membership information</h3>
        <p className="text-sm text-muted mt-2">Member since {user.createdAt?.slice(0,10)} · Status: Active · ID: {user.id} · Role: {user.role}</p>
        <p className="text-xs text-muted mt-1">Privacy: email/phone used only for pastoral follow-up & receipts. Request deletion via church office (NDPA-aligned).</p>
      </div>
    </div>
  )
}
