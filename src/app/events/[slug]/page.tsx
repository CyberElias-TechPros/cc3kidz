import events from '@/data/events.json'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Countdown from '@/components/Countdown'
import EventRegisterForm from '@/components/forms/EventRegisterForm'

export function generateStaticParams() { return events.map((e: any) => ({ slug: e.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const e: any = events.find((x: any) => x.slug === slug)
  return { title: e ? e.title : 'Event' }
}

export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const e: any = events.find((x: any) => x.slug === slug)
  if (!e) return notFound()
  const target = new Date(e.date).toISOString()
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-10">
          <div className="flex flex-wrap gap-2 text-xs font-bold tracking-widest uppercase">
            <span className="rounded-full bg-white text-navy px-3 py-1">{e.category}</span>
            <span className="rounded-full bg-white/10 border border-white/15 px-3 py-1">{e.theme}</span>
          </div>
          <h1 className="font-display font-black text-[2.2rem] leading-tight mt-3 max-w-3xl">{e.title}</h1>
          <p className="text-slate-200 mt-2 max-w-2xl leading-7">{e.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-white text-navy px-3 py-2 font-semibold">{e.date} · {e.time} — {e.endTime}</span>
            <span className="rounded-full bg-white/10 border border-white/15 px-3 py-2">{e.venue}</span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-cc grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="space-y-6">
            <div className="card overflow-hidden p-0">
              <div className="relative h-[360px]"><Image src={e.image} alt={e.title} fill className="object-cover" /></div>
              <div className="p-6">
                <p className="text-slate-600 leading-7">{e.body}</p>
                <div className="mt-4 text-sm text-muted">Share: WhatsApp · X · Facebook (links placeholder)</div>
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-extrabold">Programme</h3>
              <ul className="mt-3 text-sm leading-7 text-slate-600 list-disc pl-6">
                <li>Worship & Praise</li>
                <li>Word & Ministry</li>
                <li>Testimonies</li>
                <li>Giving & Dedication</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card p-6">
              <div className="eyebrow">Countdown</div>
              <div className="mt-3"><Countdown target={target} variant="dark" /></div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <EventRegisterForm eventSlug={e.slug} title={e.title} />
                <a href={`/api/events/register?slug=${e.slug}`} target="_blank" className="btn btn--ghost justify-center">Add to Calendar</a>
              </div>
              <Link href="/contact" className="mt-3 btn btn--ghost w-full justify-center">Contact Organiser</Link>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-extrabold">Location</h3>
              <p className="text-sm text-muted mt-2">{e.venue}</p>
              <a href="https://maps.google.com/?q=4.8427161194266155,6.984262611031861" target="_blank" className="btn btn--ghost mt-3 w-full justify-center">Open Maps</a>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-extrabold">Related events</h3>
              <div className="mt-3 space-y-2 text-sm">
                {events.filter((x: any) => x.slug !== slug).slice(0, 3).map((x: any) => (
                  <Link key={x.id} href={`/events/${x.slug}`} className="block underline decoration-black/20 hover:decoration-navy">{x.title}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
