'use client'
import { useState } from 'react'

// Legacy mini-form kept for backward compat — primary flow is <GivingFlow /> which talks to /api/giving/submit.
// This now hits the API so contributions are recorded.
const slugMap: Record<string,string> = {
  Offerings:'offering', Tithes:'tithe', Missions:'missions', Welfare:'welfare', 'Building Project':'building', 'ReachOut Partnership':'partnership-rhapsody'
}
export default function GiveForm(){
  const [s,setS]=useState({category:'Offerings',amount:'',method:'Bank transfer'})
  const [done,setDone]=useState<string|null>(null)
  const [err,setErr]=useState<string|null>(null)
  const [loading,setLoading]=useState(false)
  const submit = async (e: React.FormEvent)=>{
    e.preventDefault(); if(!s.amount) return
    setLoading(true); setErr(null)
    try{
      const fundSlug = (slugMap as any)[s.category] || 'offering'
      const r = await fetch('/api/giving/submit', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ fundSlug, amount: Number(s.amount), reference: s.method, note: `legacy GiveForm — ${s.category}` }) })
      const j = await r.json()
      if(!j.ok) throw new Error(j.error)
      setDone(`CE3-${Math.random().toString(36).slice(2,8).toUpperCase()} · pending verification — ${j.message || 'received'}`)
    } catch(e:any){ setErr(e.message) } finally { setLoading(false) }
  }
  if(done) return <div className="card p-6 text-center"><div className="h-12 w-12 rounded-full bg-emerald-500 text-white grid place-items-center mx-auto">✓</div><h3 className="font-display font-extrabold mt-3">Thank you for your partnership!</h3><p className="text-sm text-muted mt-2">Reference: {done}</p><button onClick={()=>setDone(null)} className="btn btn--ghost mt-4">Give again</button></div>
  return (
    <form onSubmit={submit} className="card p-6 space-y-4">
      <h2 className="font-display font-extrabold text-xl">Make a giving</h2>
      {err && <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm">{err}</div>}
      <div className="grid sm:grid-cols-2 gap-3">
        <select value={s.category} onChange={e=>setS({...s,category:e.target.value})} className="rounded-xl border border-black/10 px-4 py-3 text-sm">
          <option>Offerings</option><option>Tithes</option><option>Missions</option><option>Welfare</option><option>Building Project</option><option>ReachOut Partnership</option>
        </select>
        <input required placeholder="Amount (NGN)" value={s.amount} onChange={e=>setS({...s,amount:e.target.value})} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
      </div>
      <select value={s.method} onChange={e=>setS({...s,method:e.target.value})} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm">
        <option>Bank transfer</option><option>Card / Gateway</option><option>USSD</option>
      </select>
      <button disabled={loading} className="btn btn--navy w-full justify-center">{loading ? 'Submitting…' : 'Proceed to Pay'}</button>
      <p className="text-xs text-muted">Use verified church accounts only. Bank transfer → POP upload → finance verifies.</p>
    </form>
  )
}
