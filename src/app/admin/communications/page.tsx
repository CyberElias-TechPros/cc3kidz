export default function CommsPage() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="font-display font-black text-xl">Communications</h1>
        <p className="text-sm text-muted">Email, notifications, announcements — expiry-controlled, audience-targeted.</p>
        <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
          {['Urgent announcement', 'General announcement', 'Programme reminder', 'Schedule change', 'Registration deadline'].map(i => (
            <div key={i} className="rounded-xl border border-black/10 p-3">
              {i}
            </div>
          ))}
        </div>
      </div>
      <div className="card p-6">
        <h3 className="font-display font-extrabold">Integrations</h3>
        <p className="text-sm text-muted">Don’t reinvent: YouTube, Maps, WhatsApp, Google Calendar, Email provider, Payment gateway, Cloud storage, Analytics, KingsChat — via Vercel env vars.</p>
      </div>
    </div>
  )
}
