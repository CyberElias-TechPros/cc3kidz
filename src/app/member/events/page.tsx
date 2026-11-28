'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function MyEvents() {
  const [regs, setRegs] = useState<any[]>([])
  const [me,setMe]=useState<any>(null)
  useEffect(() => {
    fetch('/api/auth/me').then(r=>r.json()).then(j=> setMe(j.user))
    // mine=1 returns only my email's regs; fallback to all for legacy
    fetch('/api/events/register?mine=1').then(r=>r.json()).then(j=> setRegs(j.registrations||[])).catch(()=>{
      fetch('/api/events/register').then(r=>r.json()).then(j=> setRegs(j.registrations||[]))
    })
  }, [])
  return (
    <div className="card p-6">
      <h2 className="font-display font-extrabold text-xl">My Event Registrations</h2>
      <p className="text-sm text-muted">Tickets with QR (qrcode lib ready) · ics · reminders. {me?.email? `Filtered for ${me.email}` : ''}</p>
      <div className="mt-4 space-y-2">
        {regs.length === 0 && <div className="text-sm text-muted">No registrations yet — register from <Link href="/events" className="underline">Events</Link>.</div>}
        {regs.map(r => (
          <div key={r.id} className="rounded-xl border border-black/10 p-4 flex justify-between items-center">
            <div>
              <div className="font-semibold text-sm">{r.eventSlug} · attendees {r.attendees||1}</div>
              <div className="text-xs text-muted">{r.name} · {r.ticket} · {r.createdAt?.slice(0,10)}</div>
              <div className="text-xs text-muted">{r.status||'confirmed'}</div>
            </div>
            <div className="flex gap-2">
              <div className="hidden sm:grid h-12 w-12 place-items-center rounded-lg border bg-white text-[0.62rem]">QR<br/>{r.ticket.slice(0,6)}</div>
              <Link href={`/events/${r.eventSlug}`} className="text-xs rounded-full bg-navy text-white px-3 py-1 self-center">Details →</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2 text-xs">
        <a href="/api/export/ics" className="btn btn--navy !py-2">Download ICS</a>
        <Link href="/events" className="btn btn--ghost !py-2">Browse Events</Link>
      </div>
    </div>
  )
}
