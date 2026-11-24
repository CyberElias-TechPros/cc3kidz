'use client'
import { useEffect, useState } from 'react'
export default function HealthBadge(){
  const [h,setH]=useState<any>(null)
  useEffect(()=>{ fetch('/api/health').then(r=>r.json()).then(setH).catch(()=>{}) },[])
  if(!h) return null
  return <span className="rounded-full bg-emerald-500 text-white px-2 py-1 text-[10px] font-bold">● {h.db}</span>
}
