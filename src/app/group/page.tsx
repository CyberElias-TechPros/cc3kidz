import Link from 'next/link'
import churches from '@/data/groupChurches.json'
import { ZoneBreadcrumb } from '@/components/group/ZoneBreadcrumb'
import { GroupSwitcher, MiniGroupStrip } from '@/components/group/GroupSwitcher'
import { ImpactStrip } from '@/components/group/ImpactStrip'
import { ZoneMap } from '@/components/group/ZoneMap'
import { MinistryAppsBar } from '@/components/group/MinistryAppsBar'

export const metadata = { title: 'CC3 Group — 6 Churches' }

export default function GroupPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-10">
          <div className="eyebrow !text-gold">PH Zone 3 · Zonal Church HQ</div>
          <h1 className="font-display font-black text-[2.4rem] leading-none mt-2">CC3 Group — One Family · 7 Expressions</h1>
          <p className="text-slate-200 mt-3 max-w-3xl leading-7">LoveWorld Nation → Port Harcourt Zone 3 (Zonal Church, Jessy & Jenny St, Peter Odili Rd) → Christ Embassy Central Church 3 (Group Headquarters, 30B Rumuokwuta/NTA Road) → 6 Churches → Cells. The only Pastor at the Group Church is Pastor Kelson Onoriode — also Group Pastor of the CC3 Group Family.</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/10 border border-white/15 px-3 py-1">Zonal Land: Jessy & Jenny St, Peter Odili Rd</span>
            <span className="rounded-full bg-gold text-navy px-3 py-1 font-bold">Central Church 3 (Group HQ): 30B Rumuokwuta · Pastor Kelson Onoriode</span>
          </div>
        </div>
      </section>

      <div className="container-cc">
        <ZoneBreadcrumb current="Directory" />
      </div>

      <MinistryAppsBar />

      <section className="section">
        <div className="container-cc">
          <GroupSwitcher />
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container-cc">
          <ZoneMap />
        </div>
      </section>

      <ImpactStrip />
      <MiniGroupStrip />

      <section className="section">
        <div className="container-cc grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="card p-6">
            <h3 className="font-display font-extrabold">Why a Group?</h3>
            <p className="text-sm leading-7 text-slate-600 mt-2">As Christ Embassy Port Harcourt Zone 3 expanded beyond 30 churches, the Zone was organized into Groups for effective pastoring, evangelism, and administration — modelled after <a href="https://live.cephzone3.org" target="_blank" className="underline">live.cephzone3.org</a> where every church streams Zonal programmes yet pastors its community locally.</p>
            <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl bg-sand p-4"><div className="font-bold">Shared Vision</div><div className="text-muted text-xs">One Word, one Spirit, one mission</div></div>
              <div className="rounded-xl bg-sand p-4"><div className="font-bold">Local Care</div><div className="text-muted text-xs">Pastor + cells near you</div></div>
              <div className="rounded-xl bg-sand p-4"><div className="font-bold">Zonal Strength</div><div className="text-muted text-xs">Global programmes + local impact</div></div>
            </div>
          </div>
          <div className="card p-6">
            <h3 className="font-display font-extrabold">Find your church</h3>
            <p className="text-sm text-muted mt-1">Filter by area or service time</p>
            <div className="mt-3 space-y-2">
              {(churches as any[]).map(c => (
                <Link key={c.id} href={`/group/${c.slug}`} className="flex justify-between items-center rounded-xl border border-black/10 px-4 py-3 hover:bg-sand transition">
                  <div><div className="font-semibold text-sm">{c.shortName}</div><div className="text-xs text-muted">{c.area} · {c.serviceTimes[0].day} {c.serviceTimes[0].time}</div></div>
                  <span className="rounded-full bg-navy text-white px-3 py-1 text-xs">Visit →</span>
                </Link>
              ))}
            </div>
            <Link href="/cells" className="mt-4 btn btn--navy w-full justify-center">Cell Finder</Link>
          </div>
        </div>
      </section>
    </>
  )
}
