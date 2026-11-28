import services from '@/data/services.json'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return services.map((s: any) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s: any = services.find((x: any) => x.slug === slug)
  return { title: s ? s.name : 'Service' }
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s: any = services.find((x: any) => x.slug === slug)
  if (!s) return notFound()
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-12">
          <div className="eyebrow !text-gold">{s.day} · {s.time} · {s.duration}</div>
          <h1 className="font-display font-black text-[2.4rem] leading-none mt-2">{s.name}</h1>
          <p className="text-slate-200 mt-3 max-w-2xl leading-7">{s.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/new-here" className="btn btn--gold">Plan Your Visit</Link>
            {s.isOnline && <Link href={s.onlineUrl || '/online'} className="btn btn--outline-light">Join Online</Link>}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-cc grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="prose-cc card p-6 space-y-4">
            <h2 className="text-xl">What to expect</h2>
            <p>Worship, inspiring teaching of the Word, prayer, and warm fellowship. First-time visitors are hosted personally.</p>
            <h2 className="text-xl">Venue</h2>
            <p>{s.venue}</p>
            <a href="https://maps.google.com/?q=4.8427161194266155,6.984262611031861" target="_blank" className="btn btn--ghost">Get Directions</a>
            <h2 className="text-xl">Add to calendar</h2>
            <p className="text-sm text-muted">Use your calendar app to add {s.day} {s.time} as a recurring event. Reminders available via church broadcast.</p>
          </div>
          <div className="card p-6">
            <h3 className="font-display font-extrabold">Upcoming occurrence</h3>
            <p className="text-sm text-muted mt-2">This service meets {s.day} at {s.time} ({s.duration}). Doors open 60 minutes earlier for intercession.</p>
            <Link href="/contact" className="btn btn--navy mt-4 w-full justify-center">Contact for questions</Link>
            <div className="mt-4 text-xs text-muted text-center">Children & Teens programmes run concurrently on Sundays.</div>
          </div>
        </div>
      </section>
    </>
  )
}
