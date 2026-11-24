import stats from '@/data/impactStats.json'
import { ImpactStrip } from '@/components/group/ImpactStrip'

export const metadata = { title: 'Church Impact & Annual Report' }

export default function ImpactPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-12">
          <div className="eyebrow !text-gold">Impact · PH Zone 3 Missions</div>
          <h1 className="font-display font-black text-[2.4rem] leading-none mt-2">Church Impact &amp; Outreach Reporting</h1>
          <p className="text-slate-200 mt-3 max-w-2xl leading-7">Evangelism, missions, welfare, community — approved figures only, no vanity metrics. Inspired by loveworld.inc philanthropy metrics: 1M+ households · 13B+ meals.</p>
        </div>
      </section>

      <ImpactStrip />

      <section className="section">
        <div className="container-cc grid lg:grid-cols-3 gap-6">
          {[
            { t: 'Philippines Missions — Cavite & Pampanga', d: 'PH Zone 3 planted 2 churches; 1,250 souls won. Supported from Port Harcourt — follow-up via Loveworld Missions.', loc: 'Cavite/Pampanga', fig: `${stats.zone.missions.philippinesSouls} souls · ${stats.zone.missions.churchesPlanted} churches` },
            { t: 'ReachOut World Campaign', d: 'CC3 Group distributed 18,500 Rhapsodies — 391 languages goal. Sponsor a ReachOut Cell.', loc: 'PH Zone 3', fig: `${stats.group.rhapsodyCopies} copies` },
            { t: 'InnerCity Mission — Loveworld Schools', d: '1M+ households, 13B+ meals, schools in 100+ countries. CC3 partnership feeds &amp; educates.', loc: 'Global · Sponsor', fig: `${stats.global.households} households` },
            { t: 'Welfare Support — Q4', d: 'Community support coordinated via Welfare Dept — approved report.', loc: 'Rumuokwuta · Orazi', fig: '2,100 families' },
            { t: 'Campus Evangelism', d: 'LoveWorld campus fellowships — soul-winning &amp; follow-up in UniPort &amp; Rivers State University.', loc: 'Campuses', fig: `${stats.group.cells} cells` },
            { t: 'Annual Report 2025', d: 'Major programmes, ministry activities, outreach, achievements, vision 2026 — downloadable PDF', loc: 'Download', fig: 'PDF' }
          ].map(i => (
            <div key={i.t} className="card p-6">
              <div className="text-xs font-bold tracking-widest uppercase text-gold">{i.loc}</div>
              <h3 className="font-display font-extrabold leading-tight mt-1">{i.t}</h3>
              <p className="text-sm leading-6 text-slate-600 mt-2" dangerouslySetInnerHTML={{ __html: i.d }} />
              <div className="mt-3 inline-flex rounded-full bg-sand px-3 py-1 text-xs font-semibold">{i.fig}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
