export const metadata = { title: 'News & Updates' }
export default function NewsPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-12">
          <div className="eyebrow !text-gold">Stay Informed</div>
          <h1 className="font-display font-black text-[2.4rem] leading-none mt-2">News & Updates</h1>
          <p className="text-slate-200 mt-3 max-w-2xl leading-7">Announcements, ministry news, pastor’s updates, outreach reports — expiry-controlled and published with approval.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-cc">
          <div className="flex flex-wrap gap-2">
            {['All', 'Church News', 'Announcements', 'Ministry News', 'Outreach Reports', 'Cell News'].map(c => (
              <span key={c} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm">{c}</span>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { t: 'Welcome to our new website', d: 'Central Church 3 launches its digital home — Phase 1 live.', date: 'Nov 23, 2026' },
              { t: 'ReachOut World Preparation Meeting', d: 'All partnership leaders meet this Saturday 10AM.', date: 'Nov 20, 2026' },
              { t: 'Cell Leaders Training — December', d: 'Equipping for multiplication. See Cells.', date: 'Nov 18, 2026' }
            ].map(n => (
              <div key={n.t} className="card p-6">
                <div className="text-xs text-muted">{n.date}</div>
                <h3 className="font-display font-extrabold leading-tight mt-1">{n.t}</h3>
                <p className="text-sm leading-6 text-slate-600 mt-2">{n.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
