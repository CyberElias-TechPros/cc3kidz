export const metadata = { title: 'Evangelism & Outreach' }

export default function OutreachPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-12">
          <div className="eyebrow !text-gold">Beyond the walls</div>
          <h1 className="font-display font-black text-[2.4rem] leading-none mt-2">Evangelism & Outreach</h1>
          <p className="text-slate-200 mt-3 max-w-2xl leading-7">We don’t only attract people into church — we reach people where they are.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-cc grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="font-display font-extrabold text-xl">Outreach vision</h2>
              <ul className="list-disc pl-6 text-sm leading-7 text-slate-600 mt-2">
                <li>Street & community evangelism</li>
                <li>Campus evangelism & LoveWorld campus initiatives</li>
                <li>Rhapsody distribution & ReachOut campaigns</li>
                <li>Missions & special evangelistic programmes</li>
              </ul>
              <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-sand p-4"><div className="font-semibold">Upcoming outreach</div><div className="text-muted">Dec 13 — City-Wide Cell Outreach (see Events)</div></div>
                <div className="rounded-xl bg-sand p-4"><div className="font-semibold">ReachOut World</div><div className="text-muted">Dec 18 — Rhapsody drive (see Events)</div></div>
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-extrabold">Digital evangelism</h3>
              <p className="text-sm leading-7 text-slate-600 mt-2">Shareable gospel resources, prayer of salvation, short clips, and downloadable materials — one-click WhatsApp sharing.</p>
              <div className="mt-3 flex gap-2">
                <button className="btn btn--navy">Lead Someone to Christ</button>
                <button className="btn btn--ghost">Gospel Resources</button>
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-extrabold">Impact reporting</h3>
              <p className="text-sm leading-7 text-slate-600 mt-2">Approved impact figures only — no vanity metrics. Reports include date, location (appropriate detail), photos, video, story, and testimony.</p>
            </div>
          </div>
          <form className="card p-6 h-fit space-y-3">
            <h3 className="font-display font-extrabold">Join an outreach</h3>
            <input placeholder="Name" className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
            <input placeholder="Phone" className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
            <select className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm"><option>Select team</option><option>Evangelism</option><option>Follow-up</option><option>Rhapsody Distribution</option></select>
            <input placeholder="Availability" className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
            <button className="btn btn--navy w-full justify-center">Volunteer</button>
            <p className="text-xs text-muted">Follow-up details restricted to authorised leaders.</p>
          </form>
        </div>
      </section>
    </>
  )
}
