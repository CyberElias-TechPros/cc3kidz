import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getChurchBySlug, getPastorForChurch } from '@/lib/churches'
import { ChurchBreadcrumb } from '@/components/church/ChurchNav'

export default async function ChurchPastor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const church = getChurchBySlug(slug)
  if (!church) return notFound()
  const pastor = getPastorForChurch(church) as any

  return (
    <>
      <ChurchBreadcrumb slug={slug} churchName={church.name} current="Pastor" />
      <section className="section bg-white">
        <div className="container-cc grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-black/5 bg-haze">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pastor.image} alt={pastor.name} className="absolute inset-0 h-full w-full object-cover object-top" />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <div className="text-white font-display font-extrabold">{pastor.name}</div>
              <div className="text-white/80 text-xs">{pastor.title} · {church.name}</div>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-gold">{pastor.title}</div>
            <h1 className="font-display font-black text-3xl leading-tight mt-2 text-navy">{pastor.name}</h1>
            <div className="text-sm font-semibold text-muted mt-1">{church.name} · {church.area} · {church.address}</div>
            <p className="text-sm leading-7 text-slate-600 mt-4">{pastor.bio}</p>
            <div className="mt-6 rounded-xl bg-haze border border-black/5 p-4">
              <div className="text-xs font-bold tracking-wide text-muted">Pastor’s Heart</div>
              <p className="text-sm leading-6 text-slate-600 mt-2">“We are called to take the divine presence to {church.area.split('·')[0].trim()} — every street, every school, every home — raising a people established in righteousness, living the victorious life in Christ.”</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={`https://wa.me/${church.whatsapp?.replace(/\D/g,'')}`} target="_blank" className="btn btn--navy !py-2 text-sm">WhatsApp Pastor →</a>
              <Link href={`/churches/${slug}/services`} className="btn btn--ghost !py-2 text-sm">Service Times</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-haze">
        <div className="container-cc max-w-3xl text-center">
          <h2 className="font-display font-black text-xl text-navy">Under Loveworld Leadership</h2>
          <p className="text-sm text-muted mt-2">Pastor Chris Oyakhilome (President, LoveWorld Inc.) → Pastor Linda Okocha (Zonal Pastor, PH Zone 3) → Pastor Kelson Onoriode (Group Pastor & Pastor, Central Church 3 at 30B Rumuokwuta — the only Pastor at the Group Church) → {pastor.name} ({church.title})</p>
          <Link href="/pastors" className="mt-4 btn btn--ghost !py-2 text-sm inline-flex">Meet Our National Pastors →</Link>
        </div>
      </section>
    </>
  )
}
