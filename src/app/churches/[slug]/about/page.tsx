import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getChurchBySlug, getPastorForChurch } from '@/lib/churches'
import { ChurchBreadcrumb } from '@/components/church/ChurchNav'

export default async function ChurchAbout({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const church = getChurchBySlug(slug)
  if (!church) return notFound()
  const pastor = getPastorForChurch(church) as any

  return (
    <>
      <ChurchBreadcrumb slug={slug} churchName={church.name} current="About" />
      <section className="section bg-white">
        <div className="container-cc max-w-3xl">
          <div className="eyebrow">About · {church.area}</div>
          <h1 className="font-display font-black text-3xl leading-tight mt-3 text-navy">About {church.name}</h1>
          <p className="text-sm leading-7 text-slate-600 mt-4">
            {church.name} is a vibrant LoveWorld church in {church.area} · {church.city}, pastored by {church.pastor} ({church.title}). As part of the CC3 Group Family (Port Harcourt Zone 3) under Pastor Kelson Onoriode (Group Pastor & Pastor, Central Church 3 at 30B Rumuokwuta) and Pastor Linda Okocha (Zonal Pastor), we are raising champions for Christ — established in the Word, led by the Spirit, taking the divine presence to {church.area.split('·')[0].trim()} and beyond.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[
              { k: 'Vision', v: 'To take the divine presence of God to the nations and demonstrate the character of the Holy Spirit.' },
              { k: 'Mission', v: 'To raise generations of men and women who will come into their inheritance to fulfill God’s dream.' },
              { k: 'Purpose', v: 'To bring them into their inheritance in Christ.' },
            ].map(b => (
              <div key={b.k} className="border-l-2 border-gold pl-4 py-1">
                <div className="text-xs font-bold tracking-widest uppercase text-gold">{b.k}</div>
                <p className="text-sm leading-6 font-medium text-navy mt-1">{b.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 card p-6">
            <h3 className="font-display font-extrabold text-navy">Our Pastor — {pastor.name}</h3>
            <p className="text-sm leading-7 text-slate-600 mt-2">{pastor.bio}</p>
            <Link href={`/churches/${slug}/pastor`} className="mt-4 btn btn--navy !py-2 text-sm inline-flex">Meet Our Pastor →</Link>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="card p-5">
              <div className="text-xs font-bold tracking-widest uppercase text-gold">Visit Us</div>
              <div className="font-display font-extrabold mt-1 text-navy">{church.name}</div>
              <div className="text-sm text-slate-600 mt-1">{church.address} — {church.city}</div>
              <div className="text-xs text-muted mt-1">{church.serviceTimes?.[0]?.day} {church.serviceTimes?.[0]?.time} · {church.serviceTimes?.length} services weekly</div>
            </div>
            <div className="card p-5 bg-navy text-white">
              <div className="text-xs font-bold tracking-widest uppercase text-gold">CC3 Group</div>
              <div className="font-display font-extrabold mt-1">6 Churches · One Vision</div>
              <div className="text-sm text-white/70 mt-1">Part of the CC3 Group Family — headquartered at Christ Embassy Central Church 3 (30B Rumuokwuta, Pastor Kelson Onoriode).</div>
              <Link href="/group" className="mt-3 btn btn--gold !py-2 text-xs inline-flex">Meet the Family →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
