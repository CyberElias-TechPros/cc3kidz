import events from '@/data/events.json'
import Link from 'next/link'

export default function AdminEvents() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="font-display font-black text-xl">Events Management</h1>
        <p className="text-sm text-muted">Create, publish/schedule, manage registrations, export, attendance, gallery post-event.</p>
        <div className="mt-4 flex gap-2">
          <button className="btn btn--navy">New Event</button>
          <button className="btn btn--ghost">Export Registrations</button>
        </div>
      </div>
      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-navy text-white">
            <tr>
              <th className="text-left px-4 py-2">Event</th>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Category</th>
              <th className="text-left px-4 py-2">Registrations</th>
            </tr>
          </thead>
          <tbody>
            {(events as any[]).map(e => (
              <tr key={e.id} className="border-t">
                <td className="px-4 py-3">
                  <Link href={`/events/${e.slug}`} className="underline">
                    {e.title}
                  </Link>
                </td>
                <td className="px-4 py-3">{e.date}</td>
                <td className="px-4 py-3">{e.category}</td>
                <td className="px-4 py-3">—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card p-6">
        <h3 className="font-display font-extrabold">Calendar</h3>
        <p className="text-sm text-muted">Unified church calendar: services, prayer, cells, departments, Foundation School, outreach — Month/Week/List + ICS subscriptions.</p>
      </div>
    </div>
  )
}
