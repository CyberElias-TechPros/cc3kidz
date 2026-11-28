import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getChurchBySlug } from '@/lib/churches'
import { ChurchBreadcrumb } from '@/components/church/ChurchNav'
import events from '@/data/events.json'

export default async function ChurchEvents({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const church = getChurchBySlug(slug)
  if (!church) return notFound()

  return (
    <>
      <ChurchBreadcrumb slug={slug} churchName={church.name} current="Events" />
      <section className="section bg-white">
        <div className="container-cc">
          <div className="eyebrow">What’s On · {church.shortName}</div>
          <h1 className="font-display font-black text-3xl leading-tight mt-3 text-navy">Events at {church.name}</h1>
          <p className="text-sm text-muted mt-2">Fellowship, Word encounters, and soul-winning seasons — come expectant.</p>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {(events as any[]).map((e:any)=> (
              <Link key={e.slug} href={`/events/${e.slug}`} className="card p-5 hover:border-gold/30 transition block">
                <div className="text-xs font-bold tracking-widest uppercase text-vermilion">{e.date || 'Upcoming'}</div>
                <h3 className="font-display font-extrabold mt-1 text-navy">{e.title}</h3>
                <p className="text-sm leading-6 text-slate-600 mt-2 line-clamp-3">{e.excerpt || 'Join us at ' + church.name + '.'}</p>
                <span className="mt-3 inline-flex text-xs font-bold text-gold">Details →</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 card p-6 bg-haze">
            <div className="font-display font-extrabold text-navy">Want this church’s Sunday livestream?</div>
            <p className="text-sm text-muted mt-1">Sundays {church.serviceTimes?.[0]?.time} · {church.address} · or catch the teaching via Loveworld platforms.</p>
            <Link href={`/churches/${slug}/media`} className="mt-3 btn btn--navy !py-2 text-sm inline-flex">Media &amp; Sermons →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
