'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminOverview() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/visit').then(r => r.json()),
      fetch('/api/prayer').then(r => r.json()),
      fetch('/api/testimony').then(r => r.json()),
      fetch('/api/volunteer').then(r => r.json()),
      fetch('/api/events/register').then(r => r.json()),
      fetch('/api/attendance').then(r => r.json()),
      fetch('/api/dept-attendance').then(r => r.json()),
      fetch('/api/foundation-progress?all=1').then(r => r.json())
    ]).then(([visits, prayer, testimony, volunteer, regs, att, dept, foundation]) => {
      setStats({ visits: visits.visits?.length || 0, prayer: prayer.count || 0, testimony: testimony.testimonies?.length || 0, pending: testimony.pending || 0, volunteer: volunteer.volunteers?.length || 0, regs: regs.registrations?.length || 0, attendance: att.count||0, deptAttendance: dept.count||0, foundationEligible: (foundation.progress||[]).filter((p:any)=>p.completed).length })
    })
  }, [])

  return (
    <div className="space-y-6">
      <div className="card p-6 bg-navy text-white">
        <div className="eyebrow !text-gold">Overview</div>
        <h1 className="font-display font-black text-2xl mt-2">Dashboard — pending tasks</h1>
        <p className="text-sm text-slate-200 mt-2">Live Phase 2/3 metrics + publishing workflow: Draft → Review → Approval → Published</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { k: 'Event registrations', v: stats ? stats.regs : '—', sub: 'Across all events', href: '/admin/events' },
          { k: 'New visitors', v: stats ? stats.visits : '—', sub: 'Plan Your Visit', href: '/admin/people' },
          { k: 'Prayer requests', v: stats ? stats.prayer : '—', sub: 'Restricted to Prayer Team', href: '/admin/prayer' },
          { k: 'Pending testimonies', v: stats ? stats.pending : '—', sub: `${stats?.testimony || 0} total`, href: '/admin/media' },
          { k: 'Volunteer apps', v: stats ? stats.volunteer : '—', sub: 'All departments', href: '/admin/volunteers' },
          { k: 'Cell attendance reports', v: stats ? stats.attendance : '—', sub: '6 churches · 15 cells', href: '/admin/cells' },
          { k: 'Dept attendance', v: stats ? stats.deptAttendance : '—', sub: '8 departments', href: '/admin/cells' },
          { k: 'Foundation grad-ready', v: stats ? Math.round(stats.foundationEligible/6) : '—', sub: 'Complete 6 modules', href: '/admin/foundation' },
          { k: 'Announcements', v: '2', sub: 'Expiry-controlled', href: '/admin/cms' }
        ].map(c => (
          <Link key={c.k} href={c.href} className="card p-5">
            <div className="text-xs font-bold tracking-widest uppercase text-gold">{c.k}</div>
            <div className="font-display font-extrabold text-2xl mt-1">{c.v}</div>
            <div className="text-xs text-muted mt-1">{c.sub}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-display font-extrabold">Publishing workflow</h3>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {['Draft', 'Review', 'Approval', 'Published', 'Scheduled', 'Archived'].map(s => (
              <span key={s} className="rounded-full border border-black/10 px-3 py-1.5 font-semibold">
                {s}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted mt-3">Content Creator → Reviewer → Authorized Publisher → Public site. All modules support Create/Edit/Preview/Draft/Publish/Schedule/Unpublish/Archive.</p>
        </div>
        <div className="card p-6">
          <h3 className="font-display font-extrabold">Security & Privacy</h3>
          <p className="text-sm text-muted mt-2">HTTPS, MFA for privileged accounts, RBAC, secure password storage, rate limiting, CSRF, audit logs, backups. Privacy: NDPA-aligned, minimal data, retention & deletion.</p>
          <Link href="/admin/settings" className="btn btn--ghost mt-4 w-full justify-center">
            Manage Roles & Permissions
          </Link>
        </div>
      </div>
    </div>
  )
}
