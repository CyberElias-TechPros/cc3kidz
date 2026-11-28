import events from '@/data/events.json'
import services from '@/data/services.json'
import Link from 'next/link'

export const metadata = { title: 'Church Calendar' }

export default function CalendarPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-12">
          <div className="eyebrow !text-gold">Unified Schedule</div>
          <h1 className="font-display font-black text-[2.4rem] leading-none mt-2">Church Calendar</h1>
          <p className="text-slate-200 mt-3 max-w-2xl leading-7">Weekly services, prayer, cells, departments, Foundation School, outreach, conferences — Month / Week / List with filters.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-cc">
          <div className="flex flex-wrap gap-2">
            {['Month', 'Week', 'List'].map(v => (
              <span key={v} className={`rounded-full px-4 py-2 text-sm font-semibold border ${v === 'Month' ? 'bg-navy text-white border-navy' : 'bg-white border-black/10'}`}>{v}</span>
            ))}
            <span className="ml-2 rounded-full bg-gold/15 border border-gold/20 px-3 py-2 text-xs font-bold tracking-widest uppercase">Filters: Service · Prayer · Cell · Department · Youth · Outreach</span>
          </div>

          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card p-6">
              <h2 className="font-display font-extrabold text-xl">December 2026</h2>
              <div className="mt-4 grid grid-cols-7 gap-1 text-xs text-center">
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="font-bold text-muted py-2">{d}</div>)}
                {Array.from({length: 31}).map((_,i) => {
                  const day = i+1
                  const hasEvent = [7,13,15,18,20].includes(day)
                  const isService = [7,10,12,14,17,21,28].includes(day)
                  return (
                    <div key={day} className={`h-20 rounded-xl border p-2 text-left text-xs ${hasEvent ? 'bg-gold/15 border-gold/30' : isService ? 'bg-navy text-white border-navy' : 'bg-white border-black/5'}`}>
                      <div className="font-bold">{day}</div>
                      {hasEvent && <div className="mt-1 text-[10px] leading-tight">Event</div>}
                      {isService && <div className="text-[10px]">Service</div>}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="space-y-4">
              <div className="card p-6">
                <h3 className="font-display font-extrabold">Upcoming</h3>
                <div className="mt-3 space-y-3 text-sm">
                  {(services as any[]).slice(0,2).map(s => (
                    <div key={s.id} className="flex justify-between border-b py-2"><span>{s.name}</span><span className="text-muted">{s.day} {s.time}</span></div>
                  ))}
                  {(events as any[]).slice(0,3).map(e => (
                    <div key={e.id} className="flex justify-between border-b py-2"><span>{e.title.slice(0,24)}…</span><span className="text-muted">{e.date}</span></div>
                  ))}
                </div>
                <p className="text-xs text-muted mt-3">Subscribe: Google Calendar · Apple · Outlook · ICS download — auto-updates.</p>
                <Link href="/events" className="btn btn--navy mt-4 w-full justify-center">View Events</Link>
              </div>
              <div className="card p-6">
                <h3 className="font-display font-extrabold">Add to calendar</h3>
                <p className="text-sm text-muted mt-2">Members can subscribe to relevant public events without manual checking.</p>
                <button className="btn btn--ghost mt-3 w-full justify-center">Download ICS</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
