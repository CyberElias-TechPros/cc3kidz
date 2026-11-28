import Link from 'next/link'
import Image from 'next/image'
import messages from '@/data/messages.json'

export const metadata = { title: 'Media & Messages' }

export default function MediaPage() {
  return (
    <>
      <section className="bg-haze border-b border-black/5">
        <div className="container-cc py-10 md:py-12">
          <div className="flex gap-5 max-w-3xl">
            <div className="hidden sm:block ankara-rule w-[3px] self-stretch shrink-0" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-muted">Library · Word & worship</div>
              <h1 className="font-display font-extrabold text-[2.4rem] md:text-[2.8rem] leading-none tracking-tight mt-2 text-navy">Media &amp; Messages</h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Our own media library — not just YouTube links. Video, audio, photos, and documents.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-cc">
          <div className="flex flex-wrap gap-2">
            {['All', 'Sermons', 'Teachings', 'Worship', 'Testimonies', 'Podcast'].map(k => (
              <span key={k} className={`px-3.5 py-1.5 text-xs font-semibold border ${k === 'All' ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-black/10'}`}>
                {k}
              </span>
            ))}
          </div>
          <div className="mt-3 text-xs text-muted">Filter by speaker · topic · scripture · series</div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {messages.map((m: any) => (
              <Link key={m.id} href={`/media/${m.slug}`} className="bg-white border border-black/5 rounded-xl overflow-hidden group hover:border-gold/30 transition">
                <div className="relative h-48 bg-haze">
                  <Image src="/assets/images/main-sermon.webp" alt={m.title} fill className="object-cover group-hover:scale-[1.02] transition duration-700" />
                  <div className="absolute top-3 left-3 bg-white text-navy px-2.5 py-1 text-xs font-bold border border-black/10">{m.service}</div>
                  <div className="absolute bottom-3 right-3 bg-navy text-white px-2.5 py-1 text-xs font-bold">{m.duration}</div>
                </div>
                <div className="p-5">
                  <div className="text-xs font-bold tracking-wide text-gold">{m.minister} · {m.date}</div>
                  <h3 className="font-display font-extrabold leading-tight mt-1 text-navy">{m.title}</h3>
                  <p className="text-sm leading-6 text-slate-600 mt-2 line-clamp-2">{m.excerpt}</p>
                  <div className="mt-2 text-xs text-muted">{m.scripture}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="bg-navy text-white px-2.5 py-1 text-xs font-semibold">Video</span>
                    <span className="bg-white border border-black/10 px-2.5 py-1 text-xs font-semibold text-navy">Audio-only</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 bg-haze border border-black/5 rounded-xl p-6">
            <h3 className="font-display font-extrabold text-navy">Playlists</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Faith', 'Prayer', 'Holy Spirit', 'Christian Living', 'Evangelism', 'Leadership', 'Divine Health', 'New Creation'].map(p => (
                <span key={p} className="bg-white border border-black/5 px-3 py-1.5 text-xs font-medium text-navy">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
