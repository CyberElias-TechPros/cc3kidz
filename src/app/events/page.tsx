import Link from 'next/link'
import Image from 'next/image'
import events from '@/data/events.json'

export const metadata = { title: 'Events & Programmes' }

export default function EventsPage() {
  const featured = events.filter((e: any) => e.featured)
  const upcoming = events.filter((e: any) => !e.featured)

  return (
    <>
      {/* Hero — Haze editorial, left rule, no navy block */}
      <section className="bg-haze border-b border-black/5">
        <div className="container-cc py-10 md:py-12">
          <div className="flex gap-5 max-w-3xl">
            <div className="hidden sm:block ankara-rule w-[3px] self-stretch shrink-0" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-muted">Calendar · PH Zone 3</div>
              <h1 className="font-display font-extrabold text-[2.4rem] md:text-[2.8rem] leading-none tracking-tight mt-2 text-navy">Events &amp; Programmes</h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">From Healing Streams to Global Communion — our appointed times for increase, impartation, and souls. Your week, set in glory — ordained for your lifting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured — editorial: large feature + companion, not equal 3-col SaaS grid */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-display font-extrabold text-xl tracking-tight text-navy">Featured</h2>
            <span className="text-xs text-muted">{events.length} on the calendar</span>
          </div>
          <div className="mt-8 grid lg:grid-cols-[1.35fr_0.85fr] gap-6">
            {featured.slice(0, 1).map((e: any) => (
              <Link key={e.id} href={`/events/${e.slug}`} className="group bg-white border border-black/5 rounded-xl overflow-hidden">
                <div className="relative h-64 bg-haze">
                  <Image src={e.image} alt={e.title} fill className="object-cover group-hover:scale-[1.02] transition duration-700" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white text-navy px-2.5 py-1 text-xs font-bold border border-black/10">{e.category}</span>
                    <span className="bg-navy text-white px-2.5 py-1 text-xs font-bold">{e.date}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold tracking-wide text-vermilion">{e.theme}</div>
                  <h3 className="font-display font-extrabold text-[1.35rem] leading-tight mt-1 text-navy">{e.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{e.excerpt}</p>
                  <div className="mt-3 text-xs text-muted">{e.time} — {e.endTime} · {e.venue}</div>
                </div>
              </Link>
            ))}
            <div className="space-y-4">
              {featured.slice(1).map((e: any) => (
                <Link key={e.id} href={`/events/${e.slug}`} className="block border-l-2 border-gold pl-4 py-2 hover:bg-haze/40 transition">
                  <div className="text-xs font-bold tracking-wide text-gold">{e.category} · {e.date}</div>
                  <h3 className="font-display font-extrabold leading-tight mt-1 text-navy">{e.title}</h3>
                  <div className="text-xs text-muted mt-1">{e.time} · {e.venue}</div>
                  <p className="text-sm leading-6 text-slate-600 mt-2 line-clamp-2">{e.excerpt}</p>
                </Link>
              ))}
              {upcoming.slice(0, 2).map((e: any) => (
                <Link key={e.id} href={`/events/${e.slug}`} className="block border-l-2 border-black/10 pl-4 py-2 hover:border-gold/40 transition">
                  <div className="text-xs font-bold tracking-wide text-muted">{e.category} · {e.date}</div>
                  <h4 className="font-semibold leading-tight mt-1 text-navy text-sm">{e.title}</h4>
                  <div className="text-xs text-muted mt-1">{e.time} — {e.venue}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full schedule — list, not card forest */}
      <section className="section bg-haze">
        <div className="container-cc">
          <h2 className="font-display font-extrabold text-xl tracking-tight text-navy">Full schedule</h2>
          <p className="text-sm text-muted mt-1">Featured first, then chronological — every published event.</p>
          <div className="mt-6 bg-white border border-black/5 rounded-xl overflow-hidden">
            {events.map((e: any) => (
              <Link key={e.id} href={`/events/${e.slug}`} className="flex flex-col md:flex-row md:items-center gap-4 px-5 py-4 border-t first:border-t-0 border-black/5 hover:bg-haze/50 transition">
                <div className="shrink-0">
                  <div className="text-xs font-bold tracking-wide text-gold">{e.category}</div>
                  <div className="text-xs font-semibold text-navy">{e.date} · {e.time}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold leading-tight text-navy">{e.title}</div>
                  <div className="text-xs text-muted mt-0.5">{e.theme} · {e.venue}</div>
                </div>
                <span className="btn btn--ghost !py-1.5 text-xs shrink-0">{e.cta}</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 bg-white border border-black/5 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-extrabold text-navy">Calendar subscriptions</h3>
              <p className="text-sm text-muted mt-1">Google Calendar · Apple Calendar · Outlook · ICS download — add public events without manual checking.</p>
            </div>
            <button className="btn btn--navy text-xs">Download ICS</button>
          </div>
        </div>
      </section>
    </>
  )
}
