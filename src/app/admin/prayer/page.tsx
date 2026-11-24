'use client'
import { useEffect, useState } from 'react'

export default function AdminPrayer() {
  const [data, setData] = useState<any>({ count: 0, prayers: [] })
  const load=()=> fetch('/api/prayer').then(r=>r.json()).then(j=> setData(j))
  useEffect(() => { load() }, [])
  const update=async(id:string,status:string)=>{
    await fetch('/api/prayer',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status})})
    load()
  }
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="font-display font-black text-xl">Prayer & Counselling — Restricted</h1>
        <p className="text-sm text-muted">Confidential submissions — only Prayer Team / Pastors. Assign, intercede, follow-up, close. Audited.</p>
        <div className="mt-3 inline-flex rounded-full bg-navy text-white px-3 py-1 text-xs font-bold">{data.count} requests</div>
      </div>
      {data.prayers?.length > 0 && (
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-navy text-white"><tr><th className="text-left px-4 py-2">Category</th><th className="text-left px-4 py-2">Request</th><th className="text-left px-4 py-2">Contact</th><th className="text-left px-4 py-2">Status</th><th className="text-left px-4 py-2">Action</th></tr></thead>
            <tbody>{data.prayers.map((p:any)=><tr key={p.id} className="border-t"><td className="px-4 py-2">{p.category}<div className="text-xs text-muted">{p.confidential?'🔒 confidential':''}</div></td><td className="px-4 py-2 max-w-[320px] truncate">{p.body.slice(0,120)}</td><td className="px-4 py-2 text-xs">{p.contact||'—'}{p.followUp?' · follow-up':''}</td><td className="px-4 py-2"><span className={`rounded-full px-2 py-1 text-xs font-bold ${p.status==='closed'?'bg-emerald-500 text-white':'bg-amber-100 text-amber-800'}`}>{p.status||'open'}</span></td><td className="px-4 py-2 flex gap-1">{p.status!=='closed' ? <button onClick={()=>update(p.id,'closed')} className="rounded-full bg-emerald-600 text-white px-2 py-1 text-xs">Mark closed</button> : <span className="text-xs text-muted">—</span>}{p.status==='open' && <button onClick={()=>update(p.id,'assigned')} className="rounded-full border px-2 py-1 text-xs">Assign</button>}</td></tr>)}</tbody>
          </table>
        </div>
      )}
      {(!data.prayers || data.prayers.length===0) && <div className="card p-6 text-sm text-muted">No prayer requests yet — members submit via /prayer.</div>}
      <div className="card p-6">
        <h3 className="font-display font-extrabold">Pastoral workflow</h3>
        <p className="text-sm text-muted">Open → Assigned (intercessor) → Closed (with follow-up note/counselling referral). Private home contacts never published.</p>
      </div>
    </div>
  )
}
