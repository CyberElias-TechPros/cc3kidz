'use client'
import { useEffect, useState } from 'react'
export default function MemberGivingCard(){
  const [list,setList]=useState<any[]>([])
  useEffect(()=>{ fetch('/api/giving/submit?mine=1').then(r=>r.json()).then(j=>setList(j.giving||[])).catch(()=>{}) },[])
  if(!list.length) return <div className="text-xs text-muted">No giving yet — give via Bank Transfer on /give.</div>
  const verified = list.filter(g=>g.status==='verified').length
  const pending = list.filter(g=>g.status==='pending').length
  return (
    <div className="space-y-2">
      <div className="text-sm">{verified} verified · {pending} pending · {list.length} total</div>
      {list.slice(0,3).map((g:any)=>(
        <div key={g.id} className="flex justify-between items-center rounded-xl border border-black/10 px-3 py-2 text-sm">
          <span>{g.fundName} ₦{Number(g.amount).toLocaleString()}</span><span className={`rounded-full px-2 py-1 text-xs font-bold ${g.status==='verified'?'bg-emerald-500 text-white': g.status==='rejected'?'bg-red-500 text-white':'bg-amber-100 text-amber-800'}`}>{g.status}{g.receiptNo?` · ${g.receiptNo}`:''}</span>
        </div>
      ))}
    </div>
  )
}
