'use client'
import { useState } from 'react'
export default function FoundationForm(){
  const [s,setS]=useState({name:'',phone:'',pref:'Weekday Evening',availability:''})
  const [done,setDone]=useState(false)
  const [err,setErr]=useState<string|null>(null)
  const [loading,setLoading]=useState(false)
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault()
    setLoading(true);setErr(null)
    try{
      const r=await fetch('/api/foundation',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(s)})
      const j=await r.json()
      if(!j.ok) throw new Error(j.error)
      setDone(true)
    }catch(e:any){setErr(e.message)} finally{setLoading(false)}
  }
  if(done) return <div className="card p-6 text-center"><div className="h-12 w-12 rounded-full bg-navy text-white grid place-items-center mx-auto">✓</div><h3 className="font-display font-extrabold mt-3">You’re registered!</h3><p className="text-sm text-muted mt-2">Our Foundation School coordinator will contact you. Class: {s.pref}. Welcome to the family!</p></div>
  return (
    <form onSubmit={submit} className="card p-6 h-fit space-y-3">
      <h3 className="font-display font-extrabold">Register</h3>
      {err && <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm">{err}</div>}
      <input required placeholder="Name" value={s.name} onChange={e=>setS({...s,name:e.target.value})} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <input required placeholder="Phone" value={s.phone} onChange={e=>setS({...s,phone:e.target.value})} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <select value={s.pref} onChange={e=>setS({...s,pref:e.target.value})} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm"><option>Weekday Evening</option><option>Weekend</option></select>
      <input placeholder="Availability" value={s.availability} onChange={e=>setS({...s,availability:e.target.value})} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <button disabled={loading} className="btn btn--navy w-full justify-center">{loading?'Registering…':'Submit Registration'}</button>
      <p className="text-xs text-muted">LMS: student accounts, lessons, quizzes, progress — Phase 3 member portal.</p>
    </form>
  )
}
