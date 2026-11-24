import stats from '@/data/impactStats.json'

export function ImpactStrip() {
  return (
    <div className="section--navy">
      <div className="container-cc">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card !bg-white/5 !border-white/10 p-6 text-white">
            <div className="text-xs tracking-widest uppercase font-bold text-gold">Households Reached</div>
            <div className="font-display font-black text-3xl mt-1">{stats.group.householdsReached}</div>
            <div className="text-xs text-white/70 mt-1">{stats.group.label}</div>
          </div>
          <div className="card !bg-white/5 !border-white/10 p-6 text-white">
            <div className="text-xs tracking-widest uppercase font-bold text-gold">Cells / Fellowships</div>
            <div className="font-display font-black text-3xl mt-1">{stats.group.cells}</div>
            <div className="text-xs text-white/70 mt-1">Across 7 churches · {stats.zone.householdsReached} zone households</div>
          </div>
          <div className="card !bg-white/5 !border-white/10 p-6 text-white">
            <div className="text-xs tracking-widest uppercase font-bold text-gold">Souls Won (Missions)</div>
            <div className="font-display font-black text-3xl mt-1">{stats.group.soulsWon}</div>
            <div className="text-xs text-white/70 mt-1">PH Zone 3 Missions: Philippines {stats.zone.missions.philippinesSouls} souls · {stats.zone.missions.churchesPlanted} churches ({stats.zone.missions.locations.join('/')})</div>
          </div>
          <div className="card !bg-white/5 !border-white/10 p-6 text-white">
            <div className="text-xs tracking-widest uppercase font-bold text-gold">Rhapsody Distributed</div>
            <div className="font-display font-black text-3xl mt-1">{stats.group.rhapsodyCopies}</div>
            <div className="text-xs text-white/70 mt-1">Global: {stats.global.languages} languages · {stats.global.countries} nations · {stats.global.households} households</div>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-white/60">InnerCity Mission: Loveworld Schools · 13B+ meals — <a href="/give" className="underline decoration-white/40 hover:text-white">Partner now</a></div>
      </div>
    </div>
  )
}
