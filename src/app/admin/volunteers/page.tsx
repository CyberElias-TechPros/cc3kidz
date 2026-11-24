'use client'
import { useEffect, useState } from 'react'

export default function VolunteersAdmin() {
  const [list, setList] = useState<any[]>([])
  const load=()=> fetch('/api/volunteer').then(r=>r.json()).then(j=> setList(j.volunteers || j || []))
  useEffect(() => { load() }, [])
  const upd=async(id:string,status:string)=>{
    await fetch('/api/volunteer',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status})})
    load()
  }
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="font-display font-black text-xl">Volunteer Management</h1>
        <p className="text-sm text-muted">Applications → Contacted → Approved → Active (with orientation/training). Export for department heads.</p>
      </div>
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-navy text-white">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Department</th>
              <th className="text-left px-4 py-2">Contact</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted">No applications — apply via /new-here or ministry pages.</td></tr>
            )}
            {list.map(v => (
              <tr key={v.id} className="border-t">
                <td className="px-4 py-3 font-medium">{v.name}<div className="text-xs text-muted">{v.memberStatus||''}</div></td>
                <td className="px-4 py-3">{v.department}</td>
                <td className="px-4 py-3 text-xs">{v.phone}<br/>{v.email||''}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs font-bold ${v.status==='active'?'bg-emerald-500 text-white': v.status==='approved'?'bg-navy text-white':'bg-amber-100 text-amber-800'}`}>{v.status||'pending'}</span></td>
                <td className="px-4 py-2 flex gap-1 flex-wrap">
                  {['contacted','approved','active','rejected'].map(s=>(
                    <button key={s} onClick={()=>upd(v.id,s)} className="rounded-full border border-black/10 px-2 py-1 text-[0.65rem] capitalize">{s}</button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
