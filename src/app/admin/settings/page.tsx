'use client'
import { useEffect, useState } from 'react'

export default function SettingsPage() {
  const [logs,setLogs]=useState<any[]>([])
  const [users,setUsers]=useState<any[]>([])
  useEffect(()=>{
    fetch('/api/audit-log?limit=50').then(r=>r.json()).then(j=> setLogs(j.logs||[])).catch(()=>{})
    fetch('/api/auth/me').then(r=>r.json()).catch(()=>{})
    // users list via auth/me? expose limited admin list
    fetch('/api/admin/users').then(r=>r.json()).then(j=> setUsers(j.users||[])).catch(()=> setUsers([]))
  },[])
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="font-display font-black text-xl">Roles & Permissions</h1>
        <p className="text-sm text-muted">RBAC enforced server-side (requireRole) + client guard. Roles: member → leader → admin → superadmin. Each API checks role before leaking data.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-navy text-white"><tr><th className="text-left px-3 py-2">Role</th><th className="text-left px-3 py-2">Modules</th><th className="text-left px-3 py-2">Guard</th></tr></thead>
            <tbody className="text-slate-600">
              {[
                ['Super Admin', 'All', 'All routes + users'],
                ['Admin', 'All except user role escalation', 'admin:*'],
                ['Leader', 'Own cell, own department', 'leader:* — cellId scoped'],
                ['Member', 'Member portal only', 'member:*'],
                ['Guest', 'Public pages only', 'no session → /login redirect'],
              ].map(r => (<tr key={r[0]} className="border-t"><td className="px-3 py-2 font-semibold">{r[0]}</td><td className="px-3 py-2">{r[1]}</td><td className="px-3 py-2 font-mono text-xs">{r[2]}</td></tr>))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card p-6">
        <h3 className="font-display font-extrabold">Users (admin view)</h3>
        <p className="text-xs text-muted">Seed: member@cc3.local / leader@cc3.local / admin@cc3.local. Promote via Admin API or Postgres directly.</p>
        <div className="mt-3 rounded-xl border border-black/10 p-3 text-xs text-muted">{users.length? `${users.length} users` : 'User list endpoint needs admin auth — see /api/admin/users (create to expose). Showing audit logs below instead.'} </div>
      </div>
      <div className="card p-6">
        <h3 className="font-display font-extrabold">System & Audit</h3>
        <p className="text-sm text-muted">Audit logs persisted to .data/db.json (or Postgres AuditLog). Export, retention 90 days.</p>
        <div className="mt-4 card p-0 overflow-hidden">
          <table className="w-full text-xs"><thead className="bg-navy text-white"><tr><th className="text-left px-3 py-1">Time</th><th className="text-left px-3 py-1">Action</th><th className="text-left px-3 py-1">Entity</th><th className="text-left px-3 py-1">User</th></tr></thead><tbody>{logs.length===0? <tr><td colSpan={4} className="px-3 py-4 text-center text-muted">No logs yet — submit a form to generate.</td></tr> : logs.map((l:any)=><tr key={l.id} className="border-t"><td className="px-3 py-1.5">{l.createdAt?.slice(0,19).replace('T',' ')}</td><td className="px-3 py-1.5">{l.action}</td><td className="px-3 py-1.5">{l.entity} {l.entityId?`#${l.entityId.slice(0,4)}`:''}</td><td className="px-3 py-1.5">{l.userId || 'anon'}</td></tr>)}</tbody></table>
        </div>
        <p className="text-xs text-muted mt-3">Backup: daily Postgres dump + .data/db.json file-json for dev. PWA: manifest + offline cache can be added via next-pwa (not yet — safe to add).</p>
      </div>
    </div>
  )
}
