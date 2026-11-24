'use client'
import { useState } from 'react'
export default function NewsletterForm(){
  const [email,setEmail]=useState('')
  const [status,setStatus]=useState<{ok:boolean;msg:string}|null>(null)
  const [loading,setLoading]=useState(false)
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try{
      const r=await fetch('/api/newsletter',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})})
      const j=await r.json()
      if(!j.ok) throw new Error(j.error)
      setStatus({ok:true,msg:j.message})
      setEmail('')
    }catch(e:any){ setStatus({ok:false,msg:e.message}) } finally{ setLoading(false)}
  }
  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 w-full">
      <input required type="email" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} className="flex-1 rounded-full border border-white/20 bg-white/10 backdrop-blur px-5 py-3 text-sm text-white placeholder:text-white/60" />
      <button disabled={loading} className="btn btn--gold whitespace-nowrap">{loading?'Subscribing…':'Subscribe'}</button>
      {status && <span className={`text-xs mt-1 ${status.ok?'text-emerald-300':'text-red-300'}`}>{status.msg}</span>}
    </form>
  )
}
