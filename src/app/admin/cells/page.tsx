'use client'
import { useEffect, useMemo, useState } from 'react'
import cells from '@/data/cells.json'
import churches from '@/data/groupChurches.json'
import Link from 'next/link'

type Report = { id:string; cellId:string; churchId?:string; date:string; present:number; visitors?:number; souls?:number; topic?:string }

export default function AdminCells() {
  const [reports, setReports] = useState<Report[]>([])
  const [churchFilter, setChurchFilter] = useState('')
  const [q, setQ] = useState('')

  useEffect(()=>{ fetch('/api/attendance').then(r=>r.json()).then(d=> setReports(d.attendance||[])) },[])

  const churchStats = useMemo(()=>{
    return (churches as any[]).map((ch:any)=>{
      const chCells = (cells as any[]).filter(c=>c.churchId===ch.id)
      const chReports = reports.filter(r=> {
        const cell=(cells as any[]).find(c=>c.id===r.cellId)
        return cell?.churchId===ch.id
      })
      const avg = chReports.length ? Math.round(chReports.reduce((s,r)=>s+r.present,0)/chReports.length) : 0
      const lastWeek = chReports.slice(0, chCells.length).reduce((s,r)=>s+r.present,0)
      return { church:ch, cells:chCells, reports: chReports, avg, lastWeek, totalMembers: chCells.reduce((s:any,c:any)=>s+c.members,0) }
    })
  },[reports])

  const filteredCells = useMemo(()=>{
    return (cells as any[]).filter((c:any)=>{
      if (churchFilter && c.churchId!==churchFilter) return false
      if (q && !`${c.name} ${c.leader} ${c.area} ${c.church}`.toLowerCase().includes(q.toLowerCase())) return false
      return true
    })
  },[churchFilter,q])

  const totalPresentLast = reports.slice(0, (cells as any[]).length).reduce((s,r)=>s+r.present,0)
  const totalAvg = reports.length ? Math.round(reports.reduce((s,r)=>s+r.present,0)/Math.max(1,reports.length)) : 0

  return (
    <div className="space-y-6">
      <div className="card p-6 bg-navy text-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="eyebrow !text-gold">Pastor Dashboard · CC3 Group</div>
            <h1 className="font-display font-black text-2xl mt-1">Cells — 6 Churches · Zone Map Linked</h1>
            <p className="text-sm text-slate-200 mt-1">Group Pastor view: each cell auto-assigned to nearest church. Attendance flows from member portal → this dashboard.</p>
          </div>
          <div className="hidden lg:block rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-center">
            <div className="text-xs tracking-widest uppercase text-gold">Last reports total</div>
            <div className="font-display font-black text-2xl">{totalPresentLast || '—'}</div>
            <div className="text-xs text-white/70">present · {reports.length} reports · avg {totalAvg}</div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4"><div className="text-xs font-bold tracking-widest uppercase text-gold">Churches</div><div className="font-display font-black text-2xl">{(churches as any[]).length}</div><div className="text-xs text-muted">CC3 Group (+ Zonal HQ)</div></div>
        <div className="card p-4"><div className="text-xs font-bold tracking-widest uppercase text-gold">Cells</div><div className="font-display font-black text-2xl">{(cells as any[]).length}</div><div className="text-xs text-muted">Across all churches</div></div>
        <div className="card p-4"><div className="text-xs font-bold tracking-widest uppercase text-gold">Avg cell attendance</div><div className="font-display font-black text-2xl">{totalAvg || '—'}</div><div className="text-xs text-muted">Last {reports.length} reports</div></div>
        <div className="card p-4"><div className="text-xs font-bold tracking-widest uppercase text-gold">Multiplication</div><div className="font-display font-black text-2xl">{(cells as any[]).length} → 30</div><div className="text-xs text-muted">Goal FY 2026</div></div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-extrabold">Per-church breakdown</h3>
        <p className="text-xs text-muted">Auto-assignment ensures each cell belongs to its nearest church — map verified.</p>
        <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {churchStats.map((s:any)=>(
            <div key={s.church.id} className="rounded-xl border border-black/10 p-4 hover:shadow-card transition">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <div className="font-display font-extrabold leading-tight">{s.church.shortName}</div>
                  <div className="text-xs text-muted">{s.church.area} · {s.cells.length} cells</div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${s.avg>=12?'bg-emerald-500 text-white':'bg-gold/15 text-navy'}`}>avg {s.avg || '—'}</span>
              </div>
              <div className="mt-2 text-xs text-muted">Members: {s.totalMembers} · Reports: {s.reports.length} · Last wk: {s.lastWeek || '—'} present</div>
              <div className="mt-2 flex gap-1.5 flex-wrap">
                {s.cells.slice(0,3).map((c:any)=>(<span key={c.id} className="rounded-full bg-sand px-2 py-1 text-xs">{c.area}</span>))}
                {s.cells.length>3 && <span className="text-xs text-muted">+{s.cells.length-3}</span>}
              </div>
              <Link href={`/group/${s.church.slug}`} className="mt-3 inline-flex text-xs font-semibold underline">View church →</Link>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-3 justify-between">
          <h3 className="font-display font-extrabold">Cell directory + attendance</h3>
          <div className="flex gap-2">
            <select value={churchFilter} onChange={e=>setChurchFilter(e.target.value)} className="rounded-xl border border-black/10 px-3 py-2 text-sm">
              <option value="">All churches</option>
              {(churches as any[]).map((ch:any)=>(<option key={ch.id} value={ch.id}>{ch.shortName}</option>))}
            </select>
            <input placeholder="Search cell/leader/area" value={q} onChange={e=>setQ(e.target.value)} className="rounded-xl border border-black/10 px-3 py-2 text-sm"/>
          </div>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {filteredCells.map((c:any)=>{
            const last = reports.filter(r=>r.cellId===c.id).sort((a,b)=> b.date.localeCompare(a.date))[0]
            const avgCell = reports.filter(r=>r.cellId===c.id).reduce((s,r)=>s+r.present,0) / Math.max(1, reports.filter(r=>r.cellId===c.id).length)
            return (
              <div key={c.id} className="rounded-xl border border-black/10 p-4">
                <div className="flex justify-between gap-2">
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-muted">{c.area} · {c.church} · Leader {c.leader} · {c.members} members</div>
                  </div>
                  <span className="rounded-full bg-navy text-white px-2.5 py-1 text-xs h-fit">{c.day} {c.time}</span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-sand p-2"><div className="font-bold">{last?last.present:'—'}</div><div className="text-muted">Last</div></div>
                  <div className="rounded-lg bg-sand p-2"><div className="font-bold">{avgCell?Math.round(avgCell):'—'}</div><div className="text-muted">Avg</div></div>
                  <div className="rounded-lg bg-sand p-2"><div className="font-bold">{reports.filter(r=>r.cellId===c.id).length}</div><div className="text-muted">Reports</div></div>
                </div>
                <div className="mt-2 text-xs text-muted">{last?`Last: ${last.date} · ${last.topic||'No topic'}`:'No reports yet'}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-extrabold">Recent reports</h3>
        <div className="mt-3 space-y-2 max-h-[420px] overflow-auto">
          {reports.length===0 && <div className="text-sm text-muted">No attendance yet — leaders submit via member portal.</div>}
          {reports.slice(0,12).map((r:any)=>{
            const cell=(cells as any[]).find(c=>c.id===r.cellId)
            return (
              <div key={r.id} className="flex justify-between items-center rounded-xl border border-black/10 px-3 py-2 text-sm">
                <div><span className="font-semibold">{r.date}</span> · {cell?.name || r.cellId} · {cell?.church} <span className="text-muted">({r.present} present)</span></div>
                <span className="text-xs text-muted hidden sm:block">{r.topic}</span>
              </div>
            )
          })}
        </div>
      </div>

      <DeptSection />
    </div>
  )
}

function DeptSection(){
  const [deptReports,setDeptReports]=useState<any[]>([])
  useEffect(()=>{ fetch('/api/dept-attendance').then(r=>r.json()).then(d=> setDeptReports(d.attendance||[])) },[])
  if(!deptReports.length) return (
    <div className="card p-6">
      <h3 className="font-display font-extrabold">Department attendance</h3>
      <p className="text-sm text-muted">Departments (8) — choir, ushering, media etc. Leaders submit via member/departments.</p>
      <div className="text-sm text-muted mt-2">No department reports yet.</div>
    </div>
  )
  return (
    <div className="card p-6">
      <h3 className="font-display font-extrabold">Department attendance — recent</h3>
      <div className="mt-3 space-y-2 max-h-[320px] overflow-auto">
        {deptReports.slice(0,10).map((r:any)=>(
          <div key={r.id} className="flex justify-between items-center rounded-xl border border-black/10 px-3 py-2 text-sm">
            <span className="font-semibold">{r.date} · {r.departmentId}</span><span>{r.present} present · late {r.late||0}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
