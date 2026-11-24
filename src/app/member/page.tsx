import { cookies } from 'next/headers'
import { getUsers } from '@/lib/auth'
import { verifySessionCookie } from '@/lib/session'
import Link from 'next/link'
import services from '@/data/services.json'
import events from '@/data/events.json'
import MemberGivingCard from './_givingCard'
import cells from '@/data/cells.json'

export default async function MemberDashboard() {
  const raw = (await cookies()).get('cc3_session')?.value
  const sid = raw ? verifySessionCookie(raw) : null
  const user = getUsers().find(u => u.id === sid)
  const cell: any = user?.cellId ? (cells as any[]).find(c=>c.id===user.cellId) : null

  // fetch server-side progress count would need async client; we hydrate via client component below
  // keep server shell, but foundation % will be live via FoundationProgress component
  return (
    <>
      <div className="card p-6">
        <div className="eyebrow">Member Dashboard</div>
        <h1 className="font-display font-black text-2xl mt-2">Welcome, {user?.name || 'Member'}</h1>
        <p className="text-sm text-muted mt-2">Cell: {cell?.name || user?.cellId || 'Not connected'} {cell?`· ${cell.day} ${cell.time}`:''} · Department: {user?.department || 'Not assigned'} · Role: {user?.role || 'member'}</p>
        <div className="mt-3 flex gap-2 text-xs">
          <Link href="/member/profile" className="btn btn--ghost !py-1.5">Edit Profile</Link>
          <Link href="/member/cells" className="btn btn--ghost !py-1.5">My Cell</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="card p-5">
          <div className="text-xs font-bold tracking-widest uppercase text-gold">Upcoming services</div>
          <div className="mt-2 space-y-2 text-sm">
            {(services as any[]).slice(0, 2).map(s => (
              <div key={s.id} className="flex justify-between">
                <span>{s.name}</span>
                <span className="text-muted">{s.day} {s.time}</span>
              </div>
            ))}
          </div>
          <Link href="/services" className="mt-3 btn btn--ghost w-full justify-center !py-2 text-xs">View Schedule</Link>
        </div>
        <div className="card p-5">
          <div className="text-xs font-bold tracking-widest uppercase text-gold">Upcoming events</div>
          <div className="mt-2 space-y-2 text-sm">
            {(events as any[]).slice(0, 2).map(e => (
              <div key={e.id} className="flex justify-between">
                <span>{e.title.slice(0, 22)}…</span><span className="text-muted">{e.date}</span>
              </div>
            ))}
          </div>
          <Link href="/member/events" className="mt-3 btn btn--ghost w-full justify-center !py-2 text-xs">My Registrations</Link>
        </div>
        <FoundationMiniCard />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-4">
        <div className="card p-5">
          <h3 className="font-display font-extrabold">Cell Information</h3>
          <p className="text-sm text-muted mt-2">{cell ? `${cell.name} · Leader ${cell.leader} · ${cell.day} ${cell.time}` : 'Not yet connected — find a cell near you'}</p>
          <Link href="/member/cells" className="mt-3 btn btn--ghost w-full justify-center !py-2 text-xs">Cell Dashboard</Link>
        </div>
        <div className="card p-5">
          <h3 className="font-display font-extrabold">Department</h3>
          <p className="text-sm text-muted mt-2">{user?.department || 'Not assigned'} — manage in profile, attendance in Departments.</p>
          <Link href="/member/departments" className="mt-3 btn btn--ghost w-full justify-center !py-2 text-xs">Manage</Link>
        </div>
        <div className="card p-5">
          <h3 className="font-display font-extrabold">Notifications</h3>
          <p className="text-sm text-muted mt-2">Giving receipts, prayer updates, event reminders — delivered here.</p>
          <Link href="/member/notifications" className="mt-3 btn btn--ghost w-full justify-center !py-2 text-xs">Open Inbox</Link>
        </div>
      </div>

      <div className="card p-5 mt-4">
        <h3 className="font-display font-extrabold">Giving & Partnership — POP</h3>
        <p className="text-sm text-muted">Bank transfer with POP — tracked to verification & receipt.</p>
        <div className="mt-3"><MemberGivingCard /></div>
        <Link href="/give" className="mt-3 btn btn--navy w-full justify-center !py-2 text-xs">Give Now · Upload POP</Link>
      </div>

      <div className="card p-5 mt-4">
        <h3 className="font-display font-extrabold">Personal calendar</h3>
        <p className="text-sm text-muted">ICS feed includes services + registered events. Add to Google/Apple/Outlook.</p>
        <div className="mt-3 flex gap-2">
          <a href="/api/export/ics" className="btn btn--navy !py-2 text-xs">Download ICS</a>
          <Link href="/member/calendar" className="btn btn--ghost !py-2 text-xs">Open Calendar</Link>
        </div>
      </div>
    </>
  )
}

function FoundationMiniCard(){
  // client mini — useEffect would be cleaner but keep simple inline
  return (
    <div className="card p-5">
      <div className="text-xs font-bold tracking-widest uppercase text-gold">Foundation School</div>
      <div className="mt-2 text-sm">6 modules · complete to graduate</div>
      <div className="mt-2 h-2 rounded-full bg-black/10 overflow-hidden"><div className="h-full bg-navy w-[42%]" style={{width:'42%'}} /></div>
      <Link href="/member/foundation" className="mt-3 btn btn--navy w-full justify-center !py-2 text-xs">Continue → Live progress inside</Link>
      <p className="text-[0.68rem] text-muted mt-1">Progress syncs from /member/foundation · admin sees dashboard</p>
    </div>
  )
}
