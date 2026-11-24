'use client'
import { useEffect, useState } from 'react'
import ministries from '@/data/ministries.json'
import Link from 'next/link'

export default function MemberDepartments(){
  const [user,setUser]=useState<any>(null)
  const [reports,setReports]=useState<any[]>([])
  const [dept,setDept]=useState('choir')
  const [form,setForm]=useState({date:new Date().toISOString().slice(0,10),present:0,late:0,absent:0,activity:''})
  const isLeader = user?.role==='leader'||user?.role==='admin'

  useEffect(()=>{ fetch('/api/auth/me').then(r=>r.json()).then(d=> setUser(d.user)) },[])
  useEffect(()=>{ fetch('/api/dept-attendance?departmentId='+dept).then(r=>r.json()).then(d=> setReports(d.attendance||[])) },[dept])

  // set default dept from user
  useEffect(()=>{ if(user?.department){ const match=(ministries as any[]).find(m=> m.name===user.department); if(match) setDept(match.id) } },[user])

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault()
    const res=await fetch('/api/dept-attendance',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({departmentId:dept,...form})})
    const j=await res.json()
    if(j.ok){ setForm({date:new Date().toISOString().slice(0,10),present:0,late:0,absent:0,activity:''}); fetch('/api/dept-attendance?departmentId='+dept).then(r=>r.json()).then(d=> setReports(d.attendance||[])) } else alert(j.error)
  }

  const myDept=(ministries as any[]).find(m=>m.id===dept)

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="eyebrow">Department</div>
        <h2 className="font-display font-extrabold text-xl">{myDept?.name || 'My Departments'}</h2>
        <p className="text-sm text-muted">{myDept?.purpose || 'Department connection + volunteer applications.'} · {myDept?.group}</p>
        <div className="mt-2 text-xs">Assigned: <strong>{user?.department || 'Not assigned'}</strong> {isLeader && <span className="rounded-full bg-gold/15 px-2 py-1">Leader access</span>}</div>
        <div className="mt-3 flex gap-2">
          <select value={dept} onChange={e=>setDept(e.target.value)} className="rounded-xl border border-black/10 px-3 py-2 text-sm">
            {(ministries as any[]).map((m:any)=>(<option key={m.id} value={m.id}>{m.name}</option>))}
          </select>
          <Link href="/ministries" className="btn btn--ghost !py-2 text-xs">Ministry Directory</Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <form onSubmit={submit} className="card p-6 space-y-3">
          <h3 className="font-display font-extrabold">Department attendance — {myDept?.name}</h3>
          {!isLeader && <p className="text-xs bg-gold/15 border border-gold/20 rounded-xl px-3 py-2">Viewing as member — leaders can submit. Ask your HOD for access.</p>}
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-sm"><span className="font-semibold">Date</span><input type="date" required value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"/></label>
            <label className="text-sm"><span className="font-semibold">Present</span><input type="number" min={0} value={form.present} onChange={e=>setForm({...form,present:parseInt(e.target.value)||0})} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"/></label>
            <label className="text-sm"><span className="font-semibold">Late</span><input type="number" min={0} value={form.late} onChange={e=>setForm({...form,late:parseInt(e.target.value)||0})} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"/></label>
            <label className="text-sm"><span className="font-semibold">Absent</span><input type="number" min={0} value={form.absent} onChange={e=>setForm({...form,absent:parseInt(e.target.value)||0})} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"/></label>
          </div>
          <label className="text-sm"><span className="font-semibold">Activity / Rehearsal</span><input placeholder="e.g. Choir rehearsal Sat 10AM — 22 present" value={form.activity} onChange={e=>setForm({...form,activity:e.target.value})} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 text-sm"/></label>
          <button disabled={!isLeader} className="btn btn--navy w-full justify-center disabled:opacity-50">Submit Report</button>
          <p className="text-xs text-muted text-center">Department reports feed into Pastor dashboard · grouped per church via members.</p>
        </form>

        <div className="card p-6">
          <h3 className="font-display font-extrabold">Recent — {myDept?.name}</h3>
          <div className="mt-3 space-y-2 max-h-[380px] overflow-auto">
            {reports.length===0 && <div className="text-sm text-muted">No reports yet.</div>}
            {reports.map((r:any)=>(
              <div key={r.id} className="rounded-xl border border-black/10 p-3">
                <div className="flex justify-between text-xs"><span className="font-semibold">{r.date}</span><span className="rounded-full bg-navy text-white px-2 py-0.5">{r.present} present</span></div>
                <div className="text-xs text-muted mt-1">{r.activity} · late {r.late} · absent {r.absent}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-muted">Avg present: {reports.length?Math.round(reports.reduce((s,a)=>s+a.present,0)/reports.length):'—'}</div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-extrabold">All departments</h3>
        <div className="mt-3 grid sm:grid-cols-2 gap-3">
          {(ministries as any[]).map((m:any)=>(
            <div key={m.id} className={`rounded-xl border p-4 ${m.id===dept?'border-gold bg-gold/5':'border-black/10'}`}>
              <div className="font-semibold">{m.name}</div>
              <div className="text-xs text-muted">{m.group} · {m.leader}</div>
              <div className="text-xs mt-1">{m.purpose.slice(0,70)}…</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
