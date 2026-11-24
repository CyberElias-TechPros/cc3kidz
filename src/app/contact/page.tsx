import { site } from '@/lib/site'
import ContactForm from '@/components/forms/ContactForm'

export const metadata = { title: 'Contact & Location' }

export default function ContactPage() {
  return (
    <>
      <section className="bg-haze border-b border-black/5">
        <div className="container-cc py-10 md:py-12">
          <div className="flex gap-5 max-w-3xl">
            <div className="hidden sm:block ankara-rule w-[3px] self-stretch shrink-0" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-muted">We&apos;d love to hear from you</div>
              <h1 className="font-display font-extrabold text-[2.4rem] md:text-[2.8rem] leading-none tracking-tight mt-2 text-navy">Contact &amp; Location</h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Prayer, counsel, partnership, visit enquiries — we hear you, in love and with excellence. Our team responds promptly, by the Spirit.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-cc grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <ContactForm />
          <div className="space-y-6">
            <div className="bg-white border border-black/5 rounded-xl p-6">
              <h3 className="font-display font-extrabold text-navy">Address</h3>
              <p className="text-sm leading-7 text-slate-600 mt-2">{site.address}</p>
              <p className="text-sm text-muted mt-2">Landmark: Opposite Patcoin Filling Station, near NTA Road. Office hours: as announced.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={`https://maps.google.com/?q=${site.lat},${site.lng}`} target="_blank" className="btn btn--navy text-xs">
                  Get Directions
                </a>
                {((site as any).phones || [site.phone]).map((ph:string)=> (
                  <a key={ph} href={`tel:${ph}`} className="btn btn--ghost text-xs">
                    {ph}
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-haze border border-black/5 rounded-xl overflow-hidden h-[320px] relative">
              <iframe title="Map" src={`https://maps.google.com/maps?q=${site.lat},${site.lng}&z=17&t=&ie=UTF8&iwloc=&output=embed`} className="absolute inset-0 h-full w-full border-0" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
