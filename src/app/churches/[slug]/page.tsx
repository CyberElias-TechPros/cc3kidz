import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getChurchBySlug, getPastorForChurch, getCellsForChurch, getChurchStats } from '@/lib/churches'
import { ChurchBreadcrumb } from '@/components/church/ChurchNav'
import { ChurchSiblings } from '@/components/church/ChurchHeader'
import PlatformHub from '@/components/PlatformHub'
import cells from '@/data/cells.json'
import events from '@/data/events.json'

export default async function ChurchHome({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const church = getChurchBySlug(slug)
  if (!church) return notFound()

  const pastor = getPastorForChurch(church) as any
  const myCells = getCellsForChurch(church.id)
  const stats = getChurchStats(church)
  const isHQ = church.isHeadquarters

  return (
    <>
      <ChurchBreadcrumb slug={slug} churchName={church.name} />

      {/* Welcome — clone main welcome but church-specific */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="max-w-3xl mx-auto text-center">
            <span className="eyebrow !bg-white !border-black/5">Welcome — You Belong Here · {church.area}</span>
            <h2 className="font-display font-black text-[1.8rem] md:text-[2.4rem] leading-tight mt-4 text-navy">
              {isHQ ? 'A Family of Love, the Fullness of the Word, and Your Place of Increase.' : `Raising Champions for Christ in ${church.area.split('·')[0].trim()}.`}
            </h2>
            <p className="text-sm leading-6 text-slate-600 mt-3">
              {isHQ
                ? 'At Central Church 3 we hunger for the Word and fellowship of the Spirit — raising an ever-winning, joyous people, established in righteousness, living the victorious life in Christ. Blessed be God!'
                : `${church.name} is a vibrant LoveWorld church in ${church.area} — pastored by ${church.pastor}, under the oversight of Pastor Kelson Onoriode (Group Pastor & Pastor, Central Church 3). We are one family in Christ where no one walks alone.`}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Link href={`/churches/${slug}/pastor`} className="btn btn--navy !py-2 text-sm">Meet Our Pastor →</Link>
              <Link href={`/churches/${slug}/about`} className="btn btn--ghost !py-2 text-sm">Our Story</Link>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              { t: 'The Word', d: 'Infallible Word that builds your spirit and causes you to reign — Sunday, Midweek & Prayer services, Foundation School.', icon: '📖', accent: 'gold' },
              { t: 'Fellowship', d: `${stats.cells} vibrant cells under ${church.shortName} — one family where every life counts for the Gospel.`, icon: '🤝', accent: 'vermilion' },
              { t: 'Outreach', d: 'Taking the divine presence to streets, schools, and communities across Port Harcourt — souls, always.', icon: '🌍', accent: 'navy' },
            ].map(card => (
              <div key={card.t} className="card p-6 text-center hover:shadow-card transition">
                <div className="h-12 w-12 rounded-xl bg-haze border border-black/5 grid place-items-center mx-auto text-xl">{card.icon}</div>
                <h3 className="font-display font-extrabold mt-3 text-navy">{card.t}</h3>
                <p className="text-sm leading-6 text-slate-600 mt-2">{card.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pastor preview */}
      <section className="section bg-haze">
        <div className="container-cc grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-black/5 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pastor.image || '/assets/images/leaders/pastor-kelson-onoriode.jpg'} alt={pastor.name} className="absolute inset-0 h-full w-full object-cover object-top" />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <div className="text-white font-display font-extrabold leading-tight">{pastor.name}</div>
              <div className="text-white/80 text-xs">{pastor.title}</div>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-gold">Our Pastor</div>
            <h2 className="font-display font-black text-2xl leading-tight mt-2 text-navy">{pastor.name} — Shepherding {church.shortName}</h2>
            <p className="text-sm leading-7 text-slate-600 mt-3">{pastor.bio}</p>
            <div className="mt-4 rounded-xl bg-white border border-black/5 p-4">
              <div className="text-xs font-bold tracking-wide text-muted">Pastor’s Charge</div>
              <p className="text-sm leading-6 text-slate-600 mt-1">“We are raising champions for Christ — men and women established in righteousness, taking the divine presence to our world. You belong here.”</p>
            </div>
            <div className="mt-5 flex gap-2">
              <Link href={`/churches/${slug}/pastor`} className="btn btn--navy !py-2 text-sm">Pastor’s Message →</Link>
              <a href={`https://wa.me/${church.whatsapp?.replace(/\D/g,'')}`} target="_blank" className="btn btn--ghost !py-2 text-sm">Chat on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-gold">Join Us</div>
              <h2 className="font-display font-black text-2xl mt-1 text-navy">Service Times at {church.shortName}</h2>
            </div>
            <Link href={`/churches/${slug}/services`} className="btn btn--ghost !py-2 text-sm hidden sm:inline-flex">Full Schedule →</Link>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {church.serviceTimes.map((s: any) => (
              <div key={s.day + s.time} className="card p-5">
                <div className="text-xs font-bold tracking-widest uppercase text-vermilion">{s.day} · {s.time}</div>
                <div className="font-display font-extrabold text-lg mt-1 text-navy">{s.label || s.name}</div>
                <div className="text-xs text-muted mt-1">{church.address}</div>
                <Link href={`/churches/${slug}/services`} className="mt-3 inline-flex text-xs font-bold text-navy underline">Details →</Link>
              </div>
            ))}
          </div>
          <div className="mt-6 card p-5 bg-navy text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="font-display font-extrabold">Plan your first visit to {church.shortName}</div>
              <div className="text-sm text-white/70 mt-1">{church.address} · Sundays 8AM · Midweek as scheduled — we’ll welcome you personally.</div>
            </div>
            <Link href={`/churches/${slug}/contact`} className="btn btn--gold shrink-0">Get Directions →</Link>
          </div>
        </div>
      </section>

      {/* Cells */}
      <section className="section bg-haze">
        <div className="container-cc">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-gold">Cells — Where No One Walks Alone</div>
              <h2 className="font-display font-black text-2xl mt-1 text-navy">{myCells.length} Cells under {church.shortName}</h2>
              <p className="text-sm text-muted mt-1">Auto-assigned by area — each cell belongs to its nearest church.</p>
            </div>
            <Link href={`/churches/${slug}/cells`} className="btn btn--navy !py-2 text-sm hidden md:inline-flex">View All Cells →</Link>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {myCells.slice(0, 3).map((c: any) => (
              <div key={c.id} className="card p-5">
                <div className="text-xs font-bold tracking-widest uppercase text-gold">{c.area} · {c.day} {c.time}</div>
                <h3 className="font-display font-extrabold mt-1 text-navy">{c.name}</h3>
                <div className="text-xs text-muted mt-1">{c.leader} · {c.asst}</div>
                <div className="text-xs text-slate-600 mt-2">{c.venue}</div>
                <div className="mt-3 inline-flex rounded-full bg-navy text-white px-3 py-1 text-xs font-bold">{c.members} members</div>
              </div>
            ))}
            {myCells.length === 0 && <div className="card p-6 col-span-3 text-center text-muted">Cells launching soon — contact us to join the pioneer cell near you.</div>}
          </div>
          <Link href={`/churches/${slug}/cells`} className="mt-6 btn btn--ghost w-full md:hidden justify-center">View All {myCells.length} Cells →</Link>
        </div>
      </section>

      {/* Events preview */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="flex items-end justify-between">
            <h2 className="font-display font-black text-xl text-navy">Upcoming at {church.shortName}</h2>
            <Link href={`/churches/${slug}/events`} className="text-xs font-bold text-gold hover:underline hidden sm:block">All Events →</Link>
          </div>
          <div className="mt-5 grid md:grid-cols-3 gap-4">
            {(events as any[]).slice(0, 3).map((e: any) => (
              <Link key={e.slug} href={`/events/${e.slug}`} className="card p-5 hover:border-gold/30 transition block">
                <div className="text-xs font-bold tracking-widest uppercase text-vermilion">{e.date || 'Upcoming'} · {e.tag || 'CC3'}</div>
                <div className="font-display font-extrabold mt-1 text-navy line-clamp-2">{e.title}</div>
                <div className="text-xs text-muted mt-1 line-clamp-2">{e.excerpt || 'Join us — come expectant.'}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HQ callout + siblings */}
      <section className="section bg-haze">
        <div className="container-cc grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="card p-6 bg-navy text-white">
            <div className="text-xs font-bold tracking-widest uppercase text-gold">CC3 Group Family</div>
            <h3 className="font-display font-black text-xl mt-1">6 Churches · One Vision</h3>
            <p className="text-sm leading-6 text-white/70 mt-2">From {church.name} to our sister churches across Port Harcourt — one Vision expressed locally, taking the divine presence to nations. You worship locally, yet partner globally.</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg bg-white/10 border border-white/10 p-2"><div className="font-black text-gold">7</div><div className="text-white/60">Churches</div></div>
              <div className="rounded-lg bg-white/10 border border-white/10 p-2"><div className="font-black text-gold">92</div><div className="text-white/60">Cells</div></div>
              <div className="rounded-lg bg-white/10 border border-white/10 p-2"><div className="font-black text-gold">1</div><div className="text-white/60">Vision</div></div>
            </div>
            <Link href="/group" className="mt-4 btn btn--gold w-full justify-center text-sm">Explore All Churches →</Link>
          </div>
          <ChurchSiblings currentSlug={slug} />
        </div>
      </section>

      {/* LOVEWORLD PLATFORMS — shared across every group church (inherited from Main) */}
      <PlatformHub
        eyebrow="LoveWorld Platforms"
        title="Ministry Platforms — for Every Member"
        sub="Devotionals, healing, media, leadership and partnership — the official platforms of Believers' LoveWorld, available to every member of every CC3 church."
        audience="main"
        max={15}
        style={{ background: '#F8FAFC' }}
      />
    </>
  )
}
