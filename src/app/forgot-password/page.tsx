'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPage(){
  const [step,setStep]=useState<'request'|'reset'>('request')
  const [email,setEmail]=useState('')
  const [token,setToken]=useState('')
  const [pw,setPw]=useState('')
  const [msg,setMsg]=useState<string|null>(null)
  const [loading,setLoading]=useState(false)

  const request=async(e:React.FormEvent)=>{
    e.preventDefault(); setLoading(true); setMsg(null)
    const r=await fetch('/api/auth/forgot-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})})
    const j=await r.json()
    setMsg(j.message || j.error)
    setLoading(false)
    if (j.ok) setStep('reset')
  }
  const reset=async(e:React.FormEvent)=>{
    e.preventDefault(); setLoading(true); setMsg(null)
    const r=await fetch('/api/auth/reset-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token,password:pw})})
    const j=await r.json()
    setMsg(j.ok? j.message : j.error)
    setLoading(false)
  }
  return (
    <section className="section"><div className="container-cc max-w-md"><div className="card p-8">
      <div className="eyebrow">Account recovery</div>
      <h1 className="font-display font-black text-2xl mt-2">Forgot password</h1>
      <p className="text-sm text-muted mt-2">Enter email — we’ll email a reset link (or log token in dev console when RESEND_API_KEY not set). Rate-limited.</p>
      {msg && <div className="mt-3 rounded-xl bg-sand border px-3 py-2 text-sm">{msg}</div>}
      {step==='request' ? (
        <form onSubmit={request} className="mt-6 space-y-3">
          <input required type="email" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
          <button disabled={loading} className="btn btn--navy w-full justify-center">{loading?'Sending…':'Send reset link'}</button>
          <button type="button" onClick={()=>setStep('reset')} className="btn btn--ghost w-full justify-center text-xs">Already have token</button>
        </form>
      ) : (
        <form onSubmit={reset} className="mt-6 space-y-3">
          <input placeholder="Paste token from email/logs" value={token} onChange={e=>setToken(e.target.value)} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm font-mono text-xs" />
          <input type="password" required placeholder="New password (≥6)" value={pw} onChange={e=>setPw(e.target.value)} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
          <button disabled={loading} className="btn btn--navy w-full justify-center">{loading?'Resetting…':'Reset password'}</button>
        </form>
      )}
      <div className="mt-4 text-sm text-center"><Link href="/login" className="underline">Back to sign in</Link></div>
    </div></div></section>
  )
}
