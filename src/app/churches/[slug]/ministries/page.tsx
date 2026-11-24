import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getChurchBySlug } from '@/lib/churches'
import { ChurchBreadcrumb } from '@/components/church/ChurchNav'

export default async function ChurchMinistries({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const church = getChurchBySlug(slug)
  if (!church) return notFound()

  return (
    <>
      <ChurchBreadcrumb slug={slug} churchName={church.name} current="Ministries" />
      <section className="section bg-white">
        <div className="container-cc">
          <div className="eyebrow">Every Member a Minister · {church.shortName}</div>
          <h1 className="font-display font-black text-3xl leading-tight mt-3 text-navy">Find Your Place in {church.name}</h1>
          <p className="text-sm leading-7 text-slate-600 mt-3 max-w-2xl">From Teen Ministry to Music, Hospitality, and Evangelism — every member of {church.shortName} has a place to serve under Pastor {church.pastor}’s leadership.</p>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[
              { title: 'Children’s Ministry', desc: 'Raising the next generation in the Word — CE Kids, Noah’s Ark, and early-years teaching.' },
              { title: 'Youth & Teens', desc: 'On fire for Jesus — campus outreach, youth conferences, and leadership development.' },
              { title: 'Music & Media', desc: 'Leading worship with excellence — choir, band, sound, and visuals that carry His presence.' },
              { title: 'Loveworld Cell Ministry', desc: 'The building block of the church — every home a church, every member a leader.' },
              { title: 'Hospitality & Ushers', desc: 'We are family — the spirit of LoveWorld warmly welcomes everyone who walks in.' },
              { title: 'Evangelism & Healing', desc: 'Taking the divine presence beyond the walls — streets, schools, and hospitals.' },
            ].map(m => (
              <div key={m.title} className="card p-6 text-center">
                <div className="h-14 w-14 rounded-xl bg-haze border border-black/5 grid place-items-center mx-auto text-xl">✦</div>
                <h3 className="font-display font-extrabold mt-3 text-navy">{m.title}</h3>
                <p className="text-sm leading-6 text-slate-600 mt-2">{m.desc}</p>
                <a href={`https://wa.me/${church.whatsapp?.replace(/\D/g,'')}?text=Hi%20${encodeURIComponent(church.name)}%2C%20I%20want%20to%20serve%20in%20${encodeURIComponent(m.title)}`} target="_blank" className="mt-3 inline-flex text-xs font-bold text-gold hover:underline">I want to serve →</a>
              </div>
            ))}
          </div>
          <div className="mt-8 card p-6 bg-navy text-white text-center">
            <div className="font-display font-extrabold text-lg">Every home a church — every member a minister.</div>
            <a href={`https://wa.me/${church.whatsapp?.replace(/\D/g,'')}`} target="_blank" className="mt-4 btn btn--gold !py-2 text-sm inline-flex">Join a Ministry on WhatsApp →</a>
          </div>
        </div>
      </section>
    </>
  )
}
