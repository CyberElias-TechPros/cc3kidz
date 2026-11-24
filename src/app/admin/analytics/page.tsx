'use client'
import { useEffect, useState } from 'react'

export default function AnalyticsPage() {
  const [s,setS]=useState<any>(null)
  const [giving,setGiving]=useState<any>(null)
  useEffect(()=>{
    Promise.all([
      fetch('/api/visit').then(r=>r.json()).catch(()=>({visits:[]})).then(j=> ({visits:j.count?? j.visits?.length??0})),
      fetch('/api/events/register').then(r=>r.json()).catch(()=>({})),
      fetch('/api/prayer').then(r=>r.json()).catch(()=>({count:0})),
      fetch('/api/testimony?scope=admin').then(r=>r.json()).catch(()=>({testimonies:[]})).then(j=> ({testimony:j.testimonies?.length??0, pending:j.pending??0})),
      fetch('/api/volunteer').then(r=>r.json()).catch(()=>({volunteers:[]})).then(j=> ({volunteer:j.volunteers?.length??j.count??0})),
      fetch('/api/attendance').then(r=>r.json()).catch(()=>({count:0})),
      fetch('/api/dept-attendance').then(r=>r.json()).catch(()=>({count:0})),
      fetch('/api/newsletter').then(r=>r.json()).catch(()=>({})),
      fetch('/api/giving/submit').then(r=>r.json()).catch(()=>({giving:[]})).then(j=> ({givingAll:(j.giving||[]).length, givingVerified:(j.giving||[]).filter((g:any)=>g.status==='verified').length, givingSum:(j.giving||[]).filter((g:any)=>g.status==='verified').reduce((a:number,b:any)=>a+Number(b.amount),0)})),
    ]).then(([visit,regs,prayer,testimony,vol,att,dept,news,giv])=>{
      setS({ visits: visit.visits, regs: (regs as any).registrations?.length ?? (regs as any).count ?? 0, prayer: (prayer as any).count ?? 0, testimony: (testimony as any).testimony ?? 0, pending: (testimony as any).pending ?? 0, volunteer: (vol as any).volunteer ?? 0, attendance: (att as any).count ?? 0, deptAttendance: (dept as any).count ?? 0, newsletter: (news as any).subscribers?.length ?? (news as any).count ?? 0, ...giv })
      setGiving(giv)
    })
  },[])
  const V=(v:any)=> s ? String(v ?? '0') : '…'
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="font-display font-black text-xl">Analytics & Insights — Live</h1>
        <p className="text-sm text-muted">From store (file-json or Postgres). Replace with BI later — trends, funnels, giving by fund, cell growth. Privacy: no invasive surveillance.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { k: 'Visitor enquiries', v: V(s?.visits), d: 'Plan a visit → follow-up funnel' },
          { k: 'Event registrations', v: V(s?.regs), d: 'By event, tickets issued' },
          { k: 'Giving — verified total', v: s? `₦${Number(s.givingSum||0).toLocaleString()}`: '…', d: `${V(s?.givingVerified)} verified / ${V(s?.givingAll)} submissions` },
          { k: 'Prayer requests', v: V(s?.prayer), d: 'Confidential pipeline' },
          { k: 'Testimonies', v: V(s?.testimony), d: `${V(s?.pending)} pending → moderation` },
          { k: 'Volunteers', v: V(s?.volunteer), d: 'By department' },
          { k: 'Cell attendance reports', v: V(s?.attendance), d: '7 churches · cells' },
          { k: 'Dept attendance', v: V(s?.deptAttendance), d: '8 departments' },
          { k: 'Newsletter', v: V(s?.newsletter), d: 'Subscribers' },
        ].map(c => (
          <div key={c.k} className="card p-5">
            <div className="text-xs font-bold tracking-widest uppercase text-gold">{c.k}</div>
            <div className="font-display font-extrabold text-xl mt-1">{c.v}</div>
            <div className="text-xs text-muted">{c.d}</div>
          </div>
        ))}
      </div>
      <div className="card p-6">
        <h3 className="font-display font-extrabold">Operational health</h3>
        <div className="mt-3 grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl bg-sand p-3"><div className="font-semibold">LCP ≤ 2.5s</div><div className="text-muted">WebP, lazy, CDN</div></div>
          <div className="rounded-xl bg-sand p-3"><div className="font-semibold">INP ≤ 200ms</div><div className="text-muted">Light JS</div></div>
          <div className="rounded-xl bg-sand p-3"><div className="font-semibold">CLS ≤ 0.1</div><div className="text-muted">Stable layout</div></div>
        </div>
        <p className="text-xs text-muted mt-3">WCAG 2.2 AA target — keyboard, screen reader, focus, captions, alt text. Security: RBAC, audit logs, rate limits.</p>
      </div>
    </div>
  )
}
