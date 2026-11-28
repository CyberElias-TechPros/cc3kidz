'use client'
import { useEffect, useState } from 'react'
import cells from '@/data/cells.json'
import churches from '@/data/groupChurches.json'
import Link from 'next/link'

type Attendance = { id: string; cellId: string; date: string; present: number; visitors?: number; souls?: number; topic?: string; note?: string }

export default function MemberCells() {
  const [user, setUser] = useState<any>(null)
  const [reports, setReports] = useState<Attendance[]>([])
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0,10), present: 0, visitors: 0, souls: 0, topic: '', outreach: '', note: '' })
  const [saving, setSaving] = useState(false)
  const [filterCell, setFilterCell] = useState('')

  const myCellId = user?.cellId || 'cell-1'
  const myCell: any = (cells as any[]).find(c => c.id === myCellId) || (cells as any[])[0]
  const myChurch: any = (churches as any[]).find(c => c.id === myCell?.churchId)
  const activeCellId = filterCell || myCellId
  const activeCell: any = (cells as any[]).find(c => c.id === activeCellId) || myCell

  useEffect(() => {
    fetch('/api/auth/me').then(r=>r.json()).then(d=> setUser(d.user))
  }, [])
  useEffect(() => {
    const q = activeCellId ? `?cellId=${activeCellId}` : ''
    fetch('/api/attendance'+q).then(r=>r.json()).then(d=> setReports(d.attendance || []))
  }, [activeCellId, saving])

  const isLeader = user?.role === 'leader' || user?.role === 'admin' || user?.role === 'superadmin'

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/attendance', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ cellId: activeCellId, ...form }) })
    const j = await res.json()
    setSaving(false)
    if (j.ok) {
      setForm({ date: new Date().toISOString().slice(0,10), present: 0, visitors: 0, souls: 0, topic: '', outreach: '', note: '' })
    } else alert(j.error || 'Failed')
  }

  const avg = reports.length ? Math.round(reports.reduce((s,r)=>s+r.present,0)/reports.length) : 0
  const growth = reports.length >=2 ? reports[0].present - reports[reports.length-1].present : 0

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="eyebrow">My Cell · {myChurch?.shortName || 'CC3 Group'}</div>
            <h2 className="font-display font-extrabold text-xl">{myCell?.name}</h2>
            <p className="text-sm text-muted">{myCell?.area} · {myCell?.day} {myCell?.time} · Leader {myCell?.leader}</p>
            <p className="text-xs text-muted mt-1">Church: <Link href={`/group/${myChurch?.slug}`} className="underline font-semibold">{myChurch?.name}</Link> · {myCell?.members} members</p>
            {!isLeader && <p className="text-xs rounded-full bg-gold/15 border border-gold/20 px-2 py-1 inline-block mt-2">Viewing as member — leaders submit attendance</p>}
          </div>
          <div className="hidden sm:block text-right">
            <div className="rounded-xl bg-navy text-white px-4 py-3">
              <div className="text-xs tracking-widest uppercase text-gold">Avg Attendance</div>
              <div className="font-display font-black text-2xl">{avg || '—'}</div>
              <div className="text-xs text-white/70">{reports.length} reports · {growth>0?`+${growth}`:growth} trend</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <select value={filterCell} onChange={e=>setFilterCell(e.target.value)} className="rounded-xl border border-black/10 px-3 py-2 text-sm">
            <option value="">My cell ({myCell?.church})</option>
            {(cells as any[]).map((c:any)=>(<option key={c.id} value={c.id}>{c.name} — {c.church} · {c.area}</option>))}
          </select>
          <Link href="/cells" className="btn btn--ghost !py-2 text-xs">Find or Change Cell</Link>
        </div>
      </div>

      {isLeader ? (
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <form onSubmit={submit} className="card p-6 space-y-3">
            <h3 className="font-display font-extrabold">Submit attendance — {activeCell?.name}</h3>
            <p className="text-xs text-muted">Church auto-assigned: <strong>{(churches as any[]).find((ch:any)=>ch.id===activeCell?.churchId)?.name}</strong> · Report is visible to Group Pastor on admin dashboard.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="text-sm"><span className="font-semibold">Date</span><input type="date" required value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"/></label>
              <label className="text-sm"><span className="font-semibold">Present</span><input type="number" min={0} required value={form.present} onChange={e=>setForm({...form,present:parseInt(e.target.value)||0})} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"/></label>
              <label className="text-sm"><span className="font-semibold">Visitors</span><input type="number" min={0} value={form.visitors} onChange={e=>setForm({...form,visitors:parseInt(e.target.value)||0})} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"/></label>
              <label className="text-sm"><span className="font-semibold">Souls won</span><input type="number" min={0} value={form.souls} onChange={e=>setForm({...form,souls:parseInt(e.target.value)||0})} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"/></label>
            </div>
            <label className="text-sm"><span className="font-semibold">Topic / Study</span><input placeholder="e.g. Faith that Works" value={form.topic} onChange={e=>setForm({...form,topic:e.target.value})} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"/></label>
            <label className="text-sm"><span className="font-semibold">Outreach activity</span><input placeholder="Street evangelism, Rhapsody dist." value={form.outreach} onChange={e=>setForm({...form,outreach:e.target.value})} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"/></label>
            <label className="text-sm"><span className="font-semibold">Note</span><textarea rows={2} value={form.note} onChange={e=>setForm({...form,note:e.target.value})} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"/></label>
            <button disabled={saving} className="btn btn--navy w-full justify-center">{saving?'Saving...':'Submit Report'}</button>
            <p className="text-xs text-muted text-center">Attendance + activity → pastor dashboard · privacy: no private home addresses published.</p>
          </form>
          <div className="card p-6">
            <h3 className="font-display font-extrabold">Recent reports — {activeCell?.name}</h3>
            <div className="mt-3 space-y-2 max-h-[420px] overflow-auto">
              {reports.length===0 && <div className="text-sm text-muted">No reports yet — submit first attendance above.</div>}
              {reports.map((r:any)=>(
                <div key={r.id} className="rounded-xl border border-black/10 p-3">
                  <div className="flex justify-between text-xs"><span className="font-semibold">{r.date}</span><span className="rounded-full bg-navy text-white px-2 py-0.5">{r.present} present</span></div>
                  <div className="text-xs text-muted mt-1">{r.visitors?`${r.visitors} visitors · `:''}{r.souls?`${r.souls} souls · `:''}{r.topic||''}</div>
                  {r.note && <div className="text-xs text-slate-600 mt-1">{r.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-6">
          <h3 className="font-display font-extrabold">Attendance history — {activeCell?.name}</h3>
          <div className="mt-3 space-y-2">
            {reports.length===0 && <div className="text-sm text-muted">No reports yet — check back after next cell meeting.</div>}
            {reports.map((r:any)=>(
              <div key={r.id} className="flex justify-between items-center rounded-xl border border-black/10 px-3 py-2 text-sm">
                <span>{r.date} · {r.present} present</span><span className="text-xs text-muted">{r.topic}</span>
              </div>
            ))}
          </div>
          <Link href="/member/cells" className="mt-4 btn btn--ghost w-full justify-center">Refresh</Link>
        </div>
      )}

      <div className="card p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-extrabold">Need to update your cell?</h3>
          <p className="text-sm text-muted">Moving area? We’ll auto-assign you to nearest church via Group directory.</p>
        </div>
        <Link href="/cells" className="btn btn--navy">Find Cell Near Me</Link>
      </div>
    </div>
  )
}
