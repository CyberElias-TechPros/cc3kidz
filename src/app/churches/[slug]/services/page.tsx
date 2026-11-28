import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getChurchBySlug } from '@/lib/churches'
import { ChurchBreadcrumb } from '@/components/church/ChurchNav'

export default async function ChurchServices({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const church = getChurchBySlug(slug)
  if (!church) return notFound()

  return (
    <>
      <ChurchBreadcrumb slug={slug} churchName={church.name} current="Services" />
      <section className="section bg-white">
        <div className="container-cc">
          <div className="eyebrow">Sunday &amp; Midweek · {church.shortName}</div>
          <h1 className="font-display font-black text-3xl leading-tight mt-3 text-navy">Join Us at {church.name}</h1>
          <p className="text-sm leading-7 text-slate-600 mt-3 max-w-2xl">{church.address} · {church.phone} · Part of CC3 Group (PH Zone 3). We fellowship in the Word throughout the week — Sundays, Midweek & Prayer, and cells.</p>

          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {church.serviceTimes.map((s:any)=> (
              <div key={s.day + s.time} className="card p-6">
                <div className="text-xs font-bold tracking-widest uppercase text-vermilion">{s.day} {s.time}</div>
                <h3 className="font-display font-black text-xl mt-1 text-navy">{s.label || s.name}</h3>
                <p className="text-sm text-muted mt-2">{s.description || `Fellowship at ${church.name} — ${s.day} ${s.time}. Come expectant.`}</p>
                <div className="mt-4 rounded-lg bg-haze border border-black/5 px-3 py-2 text-xs text-slate-600">{church.address}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-5">
            <div className="card p-6 bg-navy text-white">
              <div className="font-display font-extrabold">First time? We’ll save you a seat.</div>
              <p className="text-sm text-white/70 mt-2">Text us on WhatsApp and our hospitality team will meet you at the door and walk you in.</p>
              <div className="mt-4 flex gap-2">
                <a href={`https://wa.me/${church.whatsapp?.replace(/\D/g,'')}`} target="_blank" className="btn btn--gold !py-2 text-sm">WhatsApp {church.shortName} →</a>
              </div>
            </div>
            <div className="card p-6">
              <div className="font-display font-extrabold text-navy">Find a Cell Near You</div>
              <p className="text-sm text-muted mt-2">{church.name} has a cell close to you — same Word, same fellowship, every week.</p>
              <Link href={`/churches/${slug}/cells`} className="mt-4 btn btn--navy !py-2 text-sm inline-flex">Browse Cells →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
