'use client'
import { useEffect, useState } from 'react'
export default function CookieConsent(){
  const [show,setShow]=useState(false)
  useEffect(()=>{ if(!localStorage.getItem('cc3_consent')) setShow(true)},[])
  if(!show) return null
  const accept=()=>{ localStorage.setItem('cc3_consent','1'); setShow(false)}
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 card p-4 shadow-lg border border-black/10">
      <div className="text-sm font-semibold">We use cookies</div>
      <div className="text-xs text-muted mt-1">Essential cookies for login, giving POP, and security. No tracking without consent. See <a href="/privacy" className="underline">Privacy</a>.</div>
      <div className="mt-3 flex gap-2">
        <button onClick={accept} className="btn btn--navy !py-2 text-xs">Accept</button>
        <a href="/privacy" className="btn btn--ghost !py-2 text-xs">Learn more</a>
      </div>
    </div>
  )
}
