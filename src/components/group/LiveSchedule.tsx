import networks from '@/data/loveWorldNetworks.json'

const SCHEDULE = [
  { time: '11:00 AM', title: 'Healthy Living', live: false },
  { time: '12:30 PM', title: 'Life of a Saint — Pastor Chris', live: true },
  { time: '1:30 PM', title: 'Worship with LMAM', live: false },
  { time: '3:00 PM', title: 'Your LoveWorld Specials (Rerun)', live: false },
  { time: '7:00 PM', title: 'Loveworld Networks — Evening News', live: false },
]

export function LiveSchedule() {
  return (
    <div className="space-y-4">
      <div className="card p-5">
        <h3 className="font-display font-extrabold">Today on Loveworld</h3>
        <div className="mt-3 space-y-2">
          {SCHEDULE.map(s => (
            <div key={s.time} className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm ${s.live ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-black/10'}`}>
              <span className="font-semibold text-navy">{s.time}</span>
              <span className="text-muted">{s.title}</span>
              {s.live ? <span className="rounded-full bg-emerald-500 text-white px-2 py-0.5 text-xs font-bold">LIVE</span> : <span className="text-xs text-muted">Up Next</span>}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted mt-2">Schedule mirrors LoveWorld Networks (WAT). Live via <a href="https://loveworldtelevisionministry.org" target="_blank" rel="noreferrer" className="underline">loveworldtelevisionministry.org</a></p>
      </div>
      <div className="card p-5">
        <h3 className="font-display font-extrabold text-sm">LoveWorld Networks — 11 Channels</h3>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          {(networks as any[]).map(n => (
            <div key={n.id} className="rounded-xl border border-black/10 px-2.5 py-2 bg-white">
              <div className="font-semibold text-navy flex items-center gap-1"><span>{n.icon}</span> {n.name}</div>
              <div className="text-muted">{n.region} · {n.lang}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <a href="https://loveworldtelevisionministry.org" target="_blank" rel="noreferrer" className="btn btn--navy !py-1.5 text-xs">Watch LiveTV →</a>
          <a href="https://pastorchrisonline.org" target="_blank" rel="noreferrer" className="rounded-full border border-black/10 px-3 py-1.5">PastorChrisOnline</a>
        </div>
      </div>
      <div className="card p-5 bg-navy text-white">
        <h3 className="font-display font-extrabold text-sm">Funded on air</h3>
        <div className="mt-3 space-y-3 text-sm">
          {[
            { label: 'Your LoveWorld Specials', pct: 68, href: '/give#loveWorld-tv' },
            { label: 'Global Communion — LoveWorld Networks', pct: 91, href: '/give#loveWorld-tv' },
            { label: 'Healing Streams Live', pct: 68, href: '/give#healing-streams' },
          ].map(r => (
            <div key={r.label}>
              <div className="flex justify-between text-xs"><span className="text-white/80">{r.label}</span><span className="font-bold">{r.pct}%</span></div>
              <div className="mt-1 h-1.5 rounded-full bg-white/15 overflow-hidden"><div className="h-full bg-gold" style={{ width: `${r.pct}%` }} /></div>
            </div>
          ))}
        </div>
        <a href="/give" className="mt-4 inline-flex btn btn--gold w-full justify-center">Sponsor Airtime</a>
      </div>
    </div>
  )
}
