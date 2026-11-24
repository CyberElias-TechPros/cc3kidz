import { notFound } from 'next/navigation'
import { getChurchBySlug } from '@/lib/churches'
import { ChurchBreadcrumb } from '@/components/church/ChurchNav'

export default async function ChurchContact({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const church = getChurchBySlug(slug)
  if (!church) return notFound()

  return (
    <>
      <ChurchBreadcrumb slug={slug} churchName={church.name} current="Contact" />
      <section className="section bg-white">
        <div className="container-cc grid md:grid-cols-2 gap-6 items-start">
          <div>
            <div className="eyebrow">Visit · Call · WhatsApp · {church.shortName}</div>
            <h1 className="font-display font-black text-3xl leading-tight mt-3 text-navy">Contact {church.name}</h1>
            <div className="mt-6 card p-6">
              <div className="text-xs font-bold tracking-widest uppercase text-gold">{church.name}</div>
              <div className="font-display font-extrabold text-lg mt-1 text-navy">{church.address}</div>
              <div className="text-sm text-slate-600 mt-1">{church.city}</div>
              <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
                <a href={`tel:${church.phone?.replace(/\s/g,'')}`} className="font-semibold text-navy hover:underline">📞 {church.phone}</a>
                <a href={`https://wa.me/${church.whatsapp?.replace(/\D/g,'')}`} target="_blank" className="font-semibold text-green-700 hover:underline">💬 WhatsApp {church.name}</a>
              </div>
              <div className="mt-4 rounded-lg bg-haze border border-black/5 p-3">
                <div className="text-xs font-bold tracking-wide text-muted">Service Times</div>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {church.serviceTimes.map((s:any, idx:number)=> <li key={idx} className="flex justify-between gap-2"><span className="font-semibold">{s.day} {s.label || s.name}</span><span className="text-muted">{s.time}</span></li>)}
                </ul>
              </div>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(church.address + ' ' + church.city)}`} target="_blank" className="mt-4 btn btn--navy w-full justify-center !py-2 text-sm">Open in Maps →</a>
            </div>
          </div>
          <form className="card p-6">
            <div className="font-display font-extrabold text-navy">We’d love to hear from you</div>
            <p className="text-sm text-muted mt-1">Message Pastor {church.pastor.split(' ').slice(-1).join(' ')}’s team at {church.shortName} — we respond on WhatsApp.</p>
            <label className="mt-4 block text-xs font-bold tracking-wide text-slate-700">Full name</label>
            <input className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-gold" placeholder="Your name" />
            <label className="mt-3 block text-xs font-bold tracking-wide text-slate-700">Phone / WhatsApp</label>
            <input className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-gold" placeholder="080…" />
            <label className="mt-3 block text-xs font-bold tracking-wide text-slate-700">Message</label>
            <textarea rows={4} className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-gold" placeholder={`Hi ${church.name} — I’d love to visit…`} />
            <a href={`https://wa.me/${church.whatsapp?.replace(/\D/g,'')}?text=${encodeURIComponent(`Hi ${church.name} — I found you on cc3kids/`)}`} target="_blank" className="mt-4 btn btn--gold w-full justify-center !py-2.5 text-sm">Send via WhatsApp →</a>
            <div className="mt-3 text-xs text-muted text-center">Form routes to WhatsApp · {church.shortName}</div>
          </form>
        </div>
      </section>
    </>
  )
}
