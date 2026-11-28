import Link from 'next/link'
import services from '@/data/services.json'
import { SectionHeading } from '@/components/Section'

export const metadata = { title: 'Church Services' }

export default function ServicesPage() {
  return (
    <>
      {/* Hero — editorial Haze */}
      <section className="bg-haze border-b border-black/5">
        <div className="container-cc py-10 md:py-12">
          <div className="flex gap-5 max-w-3xl">
            <div className="hidden sm:block ankara-rule w-[3px] self-stretch shrink-0" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-muted">Weekly Schedule · 30B Rumuokwuta/NTA Road</div>
              <h1 className="font-display font-extrabold text-[2.4rem] md:text-[2.8rem] leading-none tracking-tight mt-2 text-navy">Church Services</h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-slate-600">Join us in person at Rumuokwuta or via our Live Stream — one rhythm in the Word: Sunday Service, Midweek & Monday Prayer & Prophecy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly rhythm — timeline + detail */}
      <section className="section bg-white">
        <div className="container-cc">
          <SectionHeading title="Our weekly rhythm" desc="Our appointed times — each ordained for your lifting. Come early; we prevail in prayer by the Spirit." />
          <div className="mt-10 timeline">
            {services.slice(0, 3).map((s: any) => (
              <div key={s.id} className="relative pt-8 md:pt-10 md:px-6">
                <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-gold border-2 border-white shadow" />
                <div className="bg-white border border-black/5 rounded-xl p-6">
                  <div className="text-xs font-bold tracking-wide text-vermilion">
                    {s.day} · {s.time} · {s.duration}
                  </div>
                  <h3 className="font-display font-extrabold text-lg mt-1 leading-tight text-navy">{s.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{s.description}</p>
                  <div className="mt-3 text-xs text-muted">{s.venue}</div>
                  <Link href={`/services/${s.slug}`} className="mt-4 inline-flex btn btn--ghost !py-2 text-xs">
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full schedule — table as editorial reference */}
      <section className="section bg-haze">
        <div className="container-cc">
          <SectionHeading title="Full schedule" desc="Every appointed time — ordained for fellowship, edification, and covenant blessings. Always current, always by the Word." />
          <div className="mt-8 overflow-hidden card p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="text-left px-5 py-3 font-semibold text-xs tracking-wide">Service</th>
                    <th className="text-left px-5 py-3 font-semibold text-xs tracking-wide">Schedule</th>
                    <th className="text-left px-5 py-3 font-semibold text-xs tracking-wide">Venue / Access</th>
                    <th className="text-left px-5 py-3 font-semibold text-xs tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s: any) => (
                    <tr key={s.id} className="border-t border-black/5 hover:bg-haze/60">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-navy">{s.name}</div>
                        <div className="text-xs text-muted">{s.duration}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {s.day} · {s.time}
                      </td>
                      <td className="px-5 py-4 text-slate-600 text-xs">
                        {s.venue}
                        {s.isOnline ? ' · Online available' : ''}
                      </td>
                      <td className="px-5 py-4">
                        <Link href={`/services/${s.slug}`} className="btn btn--ghost !py-2 text-xs">
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {services.map((s: any) => (
              <Link key={s.id} href={`/services/${s.slug}`} className="bg-white border border-black/5 rounded-xl p-5 hover:border-gold/30 transition block">
                <div className="text-xs font-bold tracking-wide text-gold">{s.day} · {s.time}</div>
                <div className="font-display font-extrabold mt-1 leading-tight text-navy">{s.name}</div>
                <div className="text-sm text-slate-600 mt-1 line-clamp-2">{s.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
