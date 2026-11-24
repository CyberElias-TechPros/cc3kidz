'use client'
import { useState } from 'react'
export default function GiveForm(){
  const [s,setS]=useState({category:'Offerings',amount:'',method:'Bank transfer'})
  const [done,setDone]=useState(false)
  if(done) return <div className="card p-6 text-center"><div className="h-12 w-12 rounded-full bg-emerald-500 text-white grid place-items-center mx-auto">✓</div><h3 className="font-display font-extrabold mt-3">Thank you for your partnership!</h3><p className="text-sm text-muted mt-2">Reference: CE3-{Math.random().toString(36).slice(2,8).toUpperCase()} — receipt sent to your chosen method. God bless you!</p><button onClick={()=>setDone(false)} className="btn btn--ghost mt-4">Give again</button></div>
  return (
    <form onSubmit={e=>{e.preventDefault(); if(!s.amount) return; setDone(true)}} className="card p-6 space-y-4">
      <h2 className="font-display font-extrabold text-xl">Make a giving</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        <select value={s.category} onChange={e=>setS({...s,category:e.target.value})} className="rounded-xl border border-black/10 px-4 py-3 text-sm">
          <option>Offerings</option><option>Tithes</option><option>Missions</option><option>Welfare</option><option>Building Project</option><option>ReachOut Partnership</option>
        </select>
        <input required placeholder="Amount (NGN)" value={s.amount} onChange={e=>setS({...s,amount:e.target.value})} className="rounded-xl border border-black/10 px-4 py-3 text-sm" />
      </div>
      <select value={s.method} onChange={e=>setS({...s,method:e.target.value})} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm">
        <option>Bank transfer</option><option>Card / Gateway</option><option>USSD</option>
      </select>
      <button className="btn btn--navy w-full justify-center">Proceed to Pay</button>
      <p className="text-xs text-muted">Use verified church accounts only. Receipt & transaction reference provided.</p>
    </form>
  )
}
