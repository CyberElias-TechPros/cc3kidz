import messages from '@/data/messages.json'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export function generateStaticParams() { return messages.map((m: any) => ({ slug: m.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const m: any = messages.find((x: any) => x.slug === slug)
  return { title: m ? m.title : 'Message' }
}

export default async function MessageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const m: any = messages.find((x: any) => x.slug === slug)
  if (!m) return notFound()
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-10">
          <div className="eyebrow !text-gold">{m.service} · {m.date} · {m.minister}</div>
          <h1 className="font-display font-black text-[2.2rem] leading-tight mt-2 max-w-3xl">{m.title}</h1>
          <p className="text-slate-200 mt-2 max-w-2xl leading-7">{m.excerpt}</p>
        </div>
      </section>
      <section className="section">
        <div className="container-cc grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="space-y-6">
            <div className="card overflow-hidden p-0 bg-black">
              <div className="aspect-video relative">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${m.youtubeId}`}
                  title={m.title}
                  allowFullScreen
                />
              </div>
              <div className="p-5 bg-white">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-navy text-white px-3 py-1 text-xs">Resume</span>
                  <span className="rounded-full border border-black/10 px-3 py-1 text-xs">Speed 1x</span>
                  <span className="rounded-full border border-black/10 px-3 py-1 text-xs">Audio-only</span>
                  <span className="rounded-full border border-black/10 px-3 py-1 text-xs">Transcript</span>
                  <span className="rounded-full border border-black/10 px-3 py-1 text-xs">Share</span>
                </div>
                <p className="text-sm text-muted mt-3">Scripture: {m.scripture} · Series: {m.series}</p>
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-extrabold">Notes & Transcript</h3>
              <p className="text-sm leading-7 text-slate-600 mt-2">Message notes (PDF) and transcript are available for download — approved by church leadership. Use external hosting for video delivery.</p>
              <div className="mt-3 flex gap-2">
                <button className="btn btn--navy">Download PDF</button>
                <button className="btn btn--ghost">View Related Messages</button>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-display font-extrabold">Details</h3>
              <div className="mt-3 text-sm leading-7 text-slate-600">
                <div><span className="font-semibold">Speaker:</span> {m.minister}</div>
                <div><span className="font-semibold">Service:</span> {m.service}</div>
                <div><span className="font-semibold">Duration:</span> {m.duration}</div>
                <div><span className="font-semibold">Tags:</span> {m.tags.join(', ')}</div>
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-extrabold">Related messages</h3>
              <div className="mt-3 space-y-2 text-sm">
                {messages.filter((x: any) => x.slug !== slug).slice(0, 3).map((x: any) => (
                  <Link key={x.id} href={`/media/${x.slug}`} className="block underline decoration-black/10">{x.title}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
