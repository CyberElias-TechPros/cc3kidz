import { notFound } from 'next/navigation'
import Link from 'next/link'
import churches from '@/data/groupChurches.json'
import cells from '@/data/cells.json'
import { ZoneBreadcrumb } from '@/components/group/ZoneBreadcrumb'
import { MiniZoneMap } from '@/components/group/ZoneMap'

export function generateStaticParams() {
  return (churches as any[]).map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c: any = (churches as any[]).find(x => x.slug === slug)
  return { title: c ? `${c.name} · CC3 Group` : 'Group Church' }
}

export default async function ChurchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c: any = (churches as any[]).find(x => x.slug === slug)
  if (!c) return notFound()

  const siblings = (churches as any[]).filter(x => x.slug !== slug)
  const myCells = (cells as any[]).filter((cl: any) => cl.churchId === c.id)

  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-10">
          <div className="eyebrow !text-gold">{c.isHeadquarters ? 'Headquarters' : 'Church'} · {c.area}</div>
          <h1 className="font-display font-black text-[2.2rem] leading-tight mt-2">{c.name}</h1>
          <p className="text-slate-200 mt-2 max-w-2xl">{c.address} · {c.city}</p>
          <div className="mt-3 inline-flex rounded-full bg-white text-navy px-3 py-1 text-xs font-bold">{c.pastor} · {c.title}</div>
        </div>
      </section>

      <div className="container-cc">
        <ZoneBreadcrumb current={c.shortName} church={c.name} />
      </div>

      <section className="section">
        <div className="container-cc grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-display font-extrabold">Service Times</h3>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                {c.serviceTimes.map((s: any) => (
                  <div key={s.day + s.time} className="rounded-xl bg-sand p-4">
                    <div className="text-xs font-bold tracking-widest uppercase text-gold">{s.day}</div>
                    <div className="font-display font-extrabold">{s.time}</div>
                    <div className="text-sm text-muted">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`} target="_blank" className="btn btn--navy">WhatsApp Pastor</a>
                <Link href="/cells" className="btn btn--ghost">Find a Cell</Link>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-display font-extrabold">About this church</h3>
              <p className="text-sm leading-7 text-slate-600 mt-2">Part of CC3 Group (PH Zone 3) — under the Loveworld Nation. We are a Christ Embassy church raising champions for Christ in {c.area}. Join us for vibrant worship, deep teaching of God's Word, and a family where you belong.</p>
              <div className="mt-3 flex gap-2 text-xs">
                <span className="rounded-full bg-gold/15 px-3 py-1">{c.cells} cells</span>
                <span className="rounded-full border border-black/10 px-3 py-1">{c.city}</span>
              </div>
            </div>

            <div className="card p-6 bg-navy text-white">
              <h3 className="font-display font-extrabold">Visit us</h3>
              <p className="text-sm text-white/80 mt-2">{c.address}</p>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(c.address)}`} target="_blank" className="mt-3 inline-flex btn btn--gold">Open in Maps →</a>
            </div>

            <MiniZoneMap churchId={c.id} />

            <div className="card p-6">
              <h3 className="font-display font-extrabold">Cells under {c.shortName} ({myCells.length})</h3>
              <p className="text-xs text-muted mt-1">Auto-assigned by area — each cell belongs to its nearest church.</p>
              <div className="mt-3 space-y-2">
                {myCells.map((cl: any) => (
                  <div key={cl.id} className="rounded-xl border border-black/10 p-3">
                    <div className="font-semibold text-sm">{cl.name}</div>
                    <div className="text-xs text-muted">{cl.area} · {cl.day} {cl.time} · {cl.leader} · {cl.members} members</div>
                  </div>
                ))}
                {myCells.length === 0 && <div className="text-sm text-muted">No cells yet — contact us to start one nearby.</div>}
              </div>
              <Link href="/cells" className="mt-3 inline-flex text-sm font-semibold underline">Go to Cell Finder →</Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-display font-extrabold">Other churches in CC3 Group</h3>
              <div className="mt-3 space-y-2">
                {siblings.slice(0, 6).map((s: any) => (
                  <Link key={s.id} href={`/group/${s.slug}`} className="flex justify-between items-center rounded-xl border border-black/10 px-4 py-3 hover:bg-sand">
                    <div><div className="font-semibold text-sm">{s.shortName}</div><div className="text-xs text-muted">{s.area}</div></div>
                    <span className="text-xs font-semibold">→</span>
                  </Link>
                ))}
              </div>
              <Link href="/group" className="mt-3 btn btn--ghost w-full justify-center">Back to Group Directory</Link>
            </div>

            <div className="card p-6">
              <h3 className="font-display font-extrabold">CC3 Group Info</h3>
              <div className="text-sm leading-7 text-slate-600 mt-2">
                <div><span className="font-semibold">Group Pastor:</span> Pastor Victor & Grace Okoro</div>
                <div><span className="font-semibold">Secretariat:</span> 30B Rumuokwuta/NTA Road</div>
                <div><span className="font-semibold">Zone:</span> PH Zone 3 · Zonal HQ Peter Odili Rd</div>
                <div><span className="font-semibold">Zonal Land:</span> Jessy & Jenny St</div>
              </div>
              <Link href="/about" className="mt-3 text-sm font-semibold underline">About our Zone →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
