'use client'
import { useEffect, useState } from 'react'
import modules from '@/data/foundationModules.json'
import { getUsers } from '@/lib/auth'

export default function AdminFoundation(){
  const [progress,setProgress]=useState<any[]>([])
  const [regs,setRegs]=useState<any[]>([])
  useEffect(()=>{
    fetch('/api/foundation-progress?all=1').then(r=>r.json()).then(d=> setProgress(d.progress||[]))
    fetch('/api/foundation').then(r=>r.json()).then(d=> setRegs(d.registrations|| d.foundationRegs|| d.items|| []))
  },[])

  // aggregate per user
  const byUser: Record<string, any[]> = {}
  progress.forEach(p=>{ byUser[p.userId]=byUser[p.userId]||[]; byUser[p.userId].push(p) })
  const totalStudents = Object.keys(byUser).length || regs.length || 0
  const totalModules = (modules as any[]).length
  const avgPct = totalStudents ? Math.round(Object.values(byUser).reduce((s,arr:any)=> s + (arr.filter((p:any)=>p.completed).length/totalModules*100),0)/Math.max(1,totalStudents)) : 0
  const gradEligible = Object.values(byUser).filter((arr:any)=> arr.filter((p:any)=>p.completed).length===totalModules).length

  return (
    <div className="space-y-6">
      <div className="card p-6 bg-navy text-white">
        <h1 className="font-display font-black text-xl">Foundation School Management</h1>
        <p className="text-sm text-white/70">Instructor dashboard — live progress feeds from member portal. Cohort B Dec 2026 upcoming, Cohort A Nov 2026 active.</p>
        <div className="mt-3 grid sm:grid-cols-4 gap-3 text-sm">
          <div className="rounded-xl bg-white/10 border border-white/15 p-3"><div className="font-bold">{totalStudents}</div><div className="text-white/70 text-xs">Students tracking</div></div>
          <div className="rounded-xl bg-white/10 border border-white/15 p-3"><div className="font-bold">{avgPct}% avg</div><div className="text-white/70 text-xs">Completion</div></div>
          <div className="rounded-xl bg-white/10 border border-white/15 p-3"><div className="font-bold">{gradEligible}</div><div className="text-white/70 text-xs">Graduation ready</div></div>
          <div className="rounded-xl bg-gold text-navy p-3"><div className="font-bold">{(modules as any[]).length} modules</div><div className=" text-xs">Salvation → Evangelism</div></div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 text-sm">
        {['Cohort A — Nov 2026 (active)', 'Cohort B — Dec 2026 (upcoming)', 'Graduates — Oct 2026 — 18'].map(c => (
          <div key={c} className="rounded-xl border border-black/10 p-3 bg-white">{c}</div>
        ))}
      </div>

      <div className="card p-6">
        <h3 className="font-display font-extrabold">Student progress</h3>
        <p className="text-xs text-muted"> Live from member portal — tap member to view detail</p>
        <div className="mt-3 space-y-2 max-h-[420px] overflow-auto">
          {Object.keys(byUser).length===0 && <div className="text-sm text-muted">No progress yet — students mark modules done in member portal.</div>}
          {Object.entries(byUser).map(([uid, arr]:any)=> {
            const done = arr.filter((p:any)=>p.completed).length
            const pct = Math.round(done/totalModules*100)
            return (
              <div key={uid} className="flex items-center justify-between rounded-xl border border-black/10 px-3 py-2">
                <div><div className="font-semibold text-sm">{uid}</div><div className="text-xs text-muted">{done}/{totalModules} modules</div></div>
                <div className="flex items-center gap-2"><div className="w-20 h-2 rounded-full bg-black/10 overflow-hidden"><div className="h-full bg-navy" style={{width:`${pct}%`}}/></div><span className="text-xs font-bold">{pct}%</span></div>
              </div>
            )
          })}
        </div>
        {regs.length>0 && <div className="mt-3 text-xs text-muted">{regs.length} registrations via public form</div>}
      </div>

      <div className="card p-6">
        <h3 className="font-display font-extrabold">Modules</h3>
        <div className="mt-2 grid sm:grid-cols-2 gap-2 text-sm">
          {(modules as any[]).map((m:any)=>(
            <div key={m.slug} className="rounded-xl border border-black/10 p-3"><div className="font-semibold">{m.order}. {m.title}</div><div className="text-xs text-muted">{m.desc}</div></div>
          ))}
        </div>
      </div>
    </div>
  )
}
