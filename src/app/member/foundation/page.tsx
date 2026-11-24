'use client'
import { useEffect, useState } from 'react'
import modules from '@/data/foundationModules.json'
import Link from 'next/link'

export default function FoundationPortal(){
  const [user,setUser]=useState<any>(null)
  const [progress,setProgress]=useState<any[]>([])
  const [saving,setSaving]=useState<string|null>(null)

  useEffect(()=>{ fetch('/api/auth/me').then(r=>r.json()).then(d=> setUser(d.user)) },[])
  useEffect(()=>{ if(user) fetch('/api/foundation-progress').then(r=>r.json()).then(d=> setProgress(d.progress||[])) },[user])

  const isDone = (slug:string)=> progress.find(p=>p.moduleSlug===slug)?.completed
  const totalDone = progress.filter(p=>p.completed).length
  const pct = Math.round(totalDone / (modules as any[]).length * 100)

  const toggle = async (slug:string, completed:boolean)=>{
    setSaving(slug)
    const res=await fetch('/api/foundation-progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({moduleSlug:slug,completed})})
    const j=await res.json()
    setSaving(null)
    if(j.ok){
      setProgress(prev=>{
        const idx=prev.findIndex(p=>p.moduleSlug===slug)
        if(idx>=0){ const c=[...prev]; c[idx]=j.progress; return c }
        return [...prev, j.progress]
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="eyebrow">Foundation School</div>
            <h2 className="font-display font-extrabold text-xl">My Progress — {pct}%</h2>
            <p className="text-sm text-muted">Courses, cohorts, attendance, lessons, PDFs, quizzes, certificates. Progress syncs to Pastor dashboard.</p>
          </div>
          <div className="hidden sm:block rounded-xl bg-navy text-white px-4 py-3 text-center min-w-[120px]">
            <div className="text-xs tracking-widest uppercase text-gold">Completed</div>
            <div className="font-display font-black text-2xl">{totalDone}/{(modules as any[]).length}</div>
            <div className="text-xs text-white/70">{pct}%</div>
          </div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-black/10 overflow-hidden"><div className="h-full bg-navy transition-all" style={{width:`${pct}%`}}/></div>
        <div className="mt-4 space-y-2">
          {(modules as any[]).map((m:any)=>{
            const done=isDone(m.slug)
            return (
              <div key={m.slug} className={`flex items-center justify-between rounded-xl border px-4 py-3 ${done?'border-emerald-200 bg-emerald-50':'border-black/10'}`}>
                <div>
                  <div className="font-semibold text-sm">{m.order}. {m.title}</div>
                  <div className="text-xs text-muted">{m.desc} · {m.duration}</div>
                </div>
                <button disabled={!!saving} onClick={()=> toggle(m.slug, !done)} className={`text-xs rounded-full px-3 py-1 font-bold ${done?'bg-emerald-500 text-white':'bg-sand'}`}>{saving===m.slug?'…': done?'Done ✓':'Mark done'}</button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-extrabold">Graduation eligibility</h3>
        <p className="text-sm text-muted">Complete 6 modules + 75% attendance + assignment → certificate &amp; celebration.</p>
        <div className="mt-3 rounded-xl bg-sand p-4 text-sm flex justify-between items-center">
          <span>Status: {pct===100? 'Eligible — contact Foundation School admin':'In progress'}</span>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${pct===100?'bg-emerald-500 text-white':'bg-white border'}`}>{pct===100?'Ready':'Working'}</span>
        </div>
        {pct===100 && <Link href="/foundation-school" className="mt-3 btn btn--navy w-full justify-center">Proceed to Graduation →</Link>}
      </div>

      <div className="card p-6 bg-navy text-white">
        <h3 className="font-display font-extrabold">Cohort info</h3>
        <p className="text-sm text-white/80 mt-1">Cohort B — Dec 2026 · Saturdays 9AM · Secretariat Annex · Instructor: Pastor Victor</p>
        <p className="text-xs text-white/60 mt-2">Your progress is visible to Group Pastor on admin dashboard. Need help? Contact Foundation School.</p>
      </div>
    </div>
  )
}
