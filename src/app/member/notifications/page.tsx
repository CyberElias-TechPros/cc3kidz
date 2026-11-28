'use client'
import { useEffect, useState } from 'react'

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState({ events: true, services: true, media: false, announcements: true })
  const [items,setItems]=useState<any[]>([])
  const [unread,setUnread]=useState(0)
  const refresh=()=> fetch('/api/notifications').then(r=>r.json()).then(j=>{ setItems(j.notifications||[]); setUnread(j.unread||0) })
  useEffect(()=>{ refresh() },[])
  const markAll=async()=>{ await fetch('/api/notifications',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:'all'})}); refresh() }
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="flex justify-between items-start">
          <div><h2 className="font-display font-extrabold text-xl">Notifications</h2><p className="text-sm text-muted">{unread} unread · giving verified, event reminders, prayer follow-up.</p></div>
          <button onClick={markAll} className="btn btn--ghost !py-2 text-xs">Mark all read</button>
        </div>
        <div className="mt-4 space-y-2 max-h-[400px] overflow-auto">
          {items.length===0 && <div className="text-sm text-muted">No notifications yet — your giving verification, event tickets etc. will appear here.</div>}
          {items.map((n:any)=>(
            <div key={n.id} className={`rounded-xl border px-4 py-3 text-sm ${!n.read?'bg-navy/5 border-navy/15':'border-black/10'}`}>
              <div className="font-semibold">{n.title}</div><div className="text-muted text-xs">{n.body}</div>
              <div className="text-xs text-muted mt-1">{new Date(n.createdAt).toLocaleString()} {n.href && <a href={n.href} className="underline">Open</a>}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card p-6">
        <h3 className="font-display font-extrabold">Preferences</h3>
        <p className="text-sm text-muted">Control channels: Email · WhatsApp · Web Push · SMS</p>
        <div className="mt-4 space-y-3 text-sm">
          {Object.entries(prefs).map(([k, v]) => (
            <label key={k} className="flex items-center justify-between rounded-xl border border-black/10 px-4 py-3">
              <span className="capitalize">{k}</span>
              <input type="checkbox" checked={v as boolean} onChange={e => setPrefs({ ...prefs, [k]: e.target.checked })} />
            </label>
          ))}
        </div>
        <p className="text-xs text-muted mt-3">We avoid flooding — only relevant digests.</p>
      </div>
    </div>
  )
}
