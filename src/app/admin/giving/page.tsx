'use client'
import { useEffect, useState } from 'react'

export default function GivingAdmin() {
  const [list,setList]=useState<any[]>([])
  const [filter,setFilter]=useState('all')
  const refresh=()=> fetch('/api/giving/submit').then(r=>r.json()).then(j=> setList(j.giving||[]))
  useEffect(()=>{ refresh() },[])
  const verify=async(id:string, action:string)=>{
    const receiptNo = action==='verify' ? `RCPT-${Date.now().toString().slice(-6)}` : undefined
    const r=await fetch('/api/giving/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,action,receiptNo})})
    if(r.ok) refresh()
  }
  const filtered = filter==='all' ? list : list.filter(g=>g.status===filter)
  const totalVerified = list.filter(g=>g.status==='verified').reduce((s,g)=> s+Number(g.amount),0)
  const pendingCount = list.filter(g=>g.status==='pending').length
  return (
    <div className="space-y-6">
      <div className="card p-6 bg-navy text-white">
        <h1 className="font-display font-black text-xl">Giving — POP Verification</h1>
        <p className="text-sm text-white/70">Bank transfer POPs — verify → issue receipt. All records auditable. Bank accounts per arm in data/bankAccounts.json (or edit below in future).</p>
        <div className="mt-3 grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl bg-white/10 p-3"><div className="font-bold">{list.length}</div><div className="text-white/70 text-xs">Submissions</div></div>
          <div className="rounded-xl bg-white/10 p-3"><div className="font-bold text-amber-300">{pendingCount} pending</div><div className="text-white/70 text-xs">Awaiting verification</div></div>
          <div className="rounded-xl bg-white/10 p-3"><div className="font-bold text-emerald-300">₦{totalVerified.toLocaleString()} verified</div><div className="text-white/70 text-xs">Receipted</div></div>
        </div>
        <div className="mt-3 flex gap-2 text-xs">
          <a href="/api/admin/export?kind=giving" className="rounded-full bg-white text-navy px-3 py-1 font-bold">Export CSV — All</a>
          <a href="/api/admin/export?kind=giving-verified" className="rounded-full bg-gold text-navy px-3 py-1 font-bold">Export Verified</a>
        </div>
      </div>

      <div className="card p-4 flex gap-2 flex-wrap items-center">
        <span className="text-sm font-semibold">Filter:</span>
        {['all','pending','verified','rejected'].map(f=>(
          <button key={f} onClick={()=> setFilter(f)} className={`rounded-full px-3 py-1 text-xs font-bold ${filter===f?'bg-navy text-white':'bg-sand'}`}>{f}</button>
        ))}
        <span className="ml-auto text-xs text-muted">{filtered.length} records</span>
      </div>

      <div className="card p-0 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-navy text-white"><tr><th className="text-left px-3 py-2">Date</th><th className="text-left px-3 py-2">Fund</th><th className="text-left px-3 py-2">Amount</th><th className="text-left px-3 py-2">Ref</th><th className="text-left px-3 py-2">POP</th><th className="text-left px-3 py-2">Status</th><th className="text-left px-3 py-2">Action</th></tr></thead>
          <tbody>
            {filtered.length===0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-muted">No POP submissions yet — members submit via /give → Bank Transfer.</td></tr>}
            {filtered.map(g=>(
              <tr key={g.id} className="border-t">
                <td className="px-3 py-2 text-xs">{g.createdAt.slice(0,10)}</td>
                <td className="px-3 py-2">{g.fundName}</td>
                <td className="px-3 py-2 font-mono">₦{Number(g.amount).toLocaleString()}</td>
                <td className="px-3 py-2 text-xs">{g.reference||'—'}</td>
                <td className="px-3 py-2 text-xs">{g.popUrl ? <a href={g.popUrl} target="_blank" className="underline">View POP</a> : '—'}</td>
                <td className="px-3 py-2"><span className={`rounded-full px-2 py-1 text-xs font-bold ${g.status==='verified'?'bg-emerald-500 text-white': g.status==='rejected'?'bg-red-500 text-white':'bg-amber-100 text-amber-800'}`}>{g.status}{g.receiptNo?` · ${g.receiptNo}`:''}</span></td>
                <td className="px-3 py-2 flex gap-1">
                  {g.status==='pending' && <>
                    <button onClick={()=>verify(g.id,'verify')} className="rounded-full bg-emerald-600 text-white px-2 py-1 text-xs">Verify</button>
                    <button onClick={()=>verify(g.id,'reject')} className="rounded-full bg-red-600 text-white px-2 py-1 text-xs">Reject</button>
                  </>}
                  {g.status!=='pending' && <span className="text-xs text-muted">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-extrabold">Bank accounts — per arm</h3>
        <p className="text-sm text-muted">To update real accounts: edit <code>src/data/bankAccounts.json</code> (or future Admin UI editor) — fund-specific, audited. Until real numbers set, POPs stay pending for manual handling.</p>
        <div className="mt-3 text-xs text-muted">Instructions for members show correct account per fund automatically. No hardcoding in components.</div>
      </div>
    </div>
  )
}
