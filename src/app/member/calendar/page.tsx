import services from '@/data/services.json'
import events from '@/data/events.json'

export default function PersonalCalendar() {
  return (
    <div className="card p-6">
      <h2 className="font-display font-extrabold text-xl">Personal Calendar</h2>
      <p className="text-sm text-muted">Unified: services + prayer + cells + departments + Foundation School.</p>
      <div className="mt-4 space-y-2 text-sm">
        {(services as any[]).slice(0, 3).map(s => (
          <div key={s.id} className="rounded-xl border border-black/10 px-4 py-3 flex justify-between">
            <span>{s.name}</span>
            <span className="text-muted">
              {s.day} {s.time}
            </span>
          </div>
        ))}
        {(events as any[]).slice(0, 3).map(e => (
          <div key={e.id} className="rounded-xl border border-black/10 px-4 py-3 flex justify-between">
            <span>{e.title}</span>
            <span className="text-muted">{e.date}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted mt-3">Subscribe via ICS: Google Calendar / Apple / Outlook — auto-updates.</p>
    </div>
  )
}
