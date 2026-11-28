'use client'
import { useEffect, useState } from 'react'

export default function PeoplePage() {
  const [visits, setVisits] = useState<any[]>([])
  const [filter,setFilter]=useState('all')
  const [q,setQ]=useState('')
  const load=()=> fetch('/api/visit').then(r=>r.json()).then(j=> setVisits(j.visits || []))
  useEffect(() => { load() }, [])
  const update=async(id:string, status:string)=>{
    await fetch('/api/visit',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status})})
    load()
  }
  const filtered = visits.filter(v=>{
    if (filter!=='all' && v.status!==filter) return false
    if (q && !`${v.name} ${v.phone} ${v.email} ${v.date}`.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="font-display font-black text-xl">People & Visitors</h1>
        <p className="text-sm text-muted">Visitor enquiries, first-time plans, follow-up funnel. Restricted to Follow-up Team / Admin.</p>
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name/phone/date" className="rounded-full border border-black/10 px-3 py-1.5 text-sm bg-white" />
          <span className="text-xs text-muted">{filtered.length}/{visits.length}</span>
          <a href="/api/admin/export?kind=visits" className="ml-auto rounded-full bg-navy text-white px-3 py-1 text-xs font-bold">Export CSV</a>
        </div>
      </div>
      <div className="card p-4 flex gap-2 flex-wrap">
        {['all','new','contacted','connected','assigned-cell','foundation','archived'].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${filter===f?'bg-navy text-white':'bg-sand'}`}>{f}</button>
        ))}
      </div>
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-navy text-white">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Phone</th>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Visitors</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-muted">No visits yet — submit via Plan Your Visit.</td></tr>
            )}
            {filtered.map(v => (
              <tr key={v.id} className="border-t">
                <td className="px-4 py-3 font-medium">{v.name} {v.email && <span className="text-xs text-muted">· {v.email}</span>}</td>
                <td className="px-4 py-3">{v.phone}</td>
                <td className="px-4 py-3 text-xs">{v.date}{v.firstTime?` · ${v.firstTime}`:''}</td>
                <td className="px-4 py-3 text-center">{v.visitors}{v.children?' 👶':''}</td>
                <td className="px-4 py-3"><span className="rounded-full bg-amber-100 text-amber-800 px-2 py-1 text-xs capitalize">{v.status||'new'}</span></td>
                <td className="px-4 py-2 flex gap-1 flex-wrap">
                  {['contacted','connected','assigned-cell','archived'].map(s=>(
                    <button key={s} onClick={()=>update(v.id,s)} className="rounded-full border border-black/10 px-2 py-1 text-[0.65rem] capitalize">{s}</button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card p-6">
        <h3 className="font-display font-extrabold">Follow-up workflow</h3>
        <p className="text-sm text-muted">New → Contacted (welcome call) → Connected (attended) → Assigned-cell → Foundation invite → Archived. Use status to track; notifications fire on new visitor.</p>
      </div>
    </div>
  )
}
