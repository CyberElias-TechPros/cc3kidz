import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getChurchBySlug } from '@/lib/churches'
import { ChurchBreadcrumb } from '@/components/church/ChurchNav'

export default async function ChurchMedia({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const church = getChurchBySlug(slug)
  if (!church) return notFound()
  return (
    <>
      <ChurchBreadcrumb slug={slug} churchName={church.name} current="Media" />
      <section className="section bg-white">
        <div className="container-cc">
          <div className="eyebrow">Word &amp; Worship · {church.shortName}</div>
          <h1 className="font-display font-black text-3xl leading-tight mt-3 text-navy">Media — {church.name}</h1>
          <p className="text-sm leading-7 text-slate-600 mt-3 max-w-2xl">Messages, worship, and moments from {church.name} — plus Loveworld teaching from our Man of God, Pastor Chris, and Zonal &amp; Group ministry.</p>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[
              { t: 'Sunday Sermons', d: 'Weekly teaching from Pastor ' + church.pastor.split(' ').slice(-1).join(' ') + ' — the Word that builds your spirit.', href: '/media' },
              { t: 'Worship & Music', d: 'Songs from CE ' + church.shortName + ' — the atmosphere of fellowship and celebration.', href: '/media' },
              { t: 'Loveworld Network', d: 'Pastor Chris, Zonal & Group messages on LoveworldSat, KingsChat and CELZ TV.', href: '/media' },
            ].map(m => (
              <Link key={m.t} href={m.href} className="card p-6 hover:border-gold/30 transition block">
                <div className="h-12 w-12 rounded-xl bg-navy text-white grid place-items-center text-xl">▶</div>
                <h3 className="font-display font-extrabold mt-4 text-navy">{m.t}</h3>
                <p className="text-sm leading-6 text-slate-600 mt-2">{m.d}</p>
                <span className="mt-3 inline-flex text-xs font-bold text-gold">Browse →</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 card p-6 bg-haze text-center">
            <div className="font-display font-extrabold text-navy">Sundays {church.serviceTimes?.[0]?.time} · {church.address}</div>
            <p className="text-sm text-muted mt-1">Join us in person — or catch the next teaching via Loveworld platforms and {church.shortName} WhatsApp updates.</p>
            <a href={`https://wa.me/${church.whatsapp?.replace(/\D/g,'')}`} target="_blank" className="mt-4 btn btn--navy !py-2 text-sm inline-flex">Get Media Updates on WhatsApp →</a>
          </div>
        </div>
      </section>
    </>
  )
}
