import Image from 'next/image'
import Link from 'next/link'
import ministries from '@/data/ministries.json'
import { SectionHeading } from '@/components/Section'

export const metadata = { title: 'Ministries & Departments' }

export default function MinistriesPage() {
  return (
    <>
      <section className="bg-haze border-b border-black/5">
        <div className="container-cc py-10 md:py-12">
          <div className="flex gap-5 max-w-3xl">
            <div className="hidden sm:block ankara-rule w-[3px] self-stretch shrink-0" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-muted">Serve with us · 8 departments</div>
              <h1 className="font-display font-extrabold text-[2.4rem] md:text-[2.8rem] leading-none tracking-tight mt-2 text-navy">Ministries &amp; Departments</h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Functioning in your divine assignment — eight departments, one Vision. Find your place, serve with excellence, and flourish.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-cc">
          <SectionHeading title="All departments" desc="Eight expressions of the same Vision — ordained for souls, raised for excellence. Glory to God!" />
          {/* Editorial list — left rule, not 3-col identical cards with gradient */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {ministries.map((m: any) => (
              <Link key={m.id} href={m.href} className="flex gap-4 group border border-black/10 bg-white p-4 rounded-xl hover:border-gold/30 transition">
                <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0 bg-haze">
                  <Image src={m.image} alt={m.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-muted">{m.group}</div>
                  <h3 className="font-display font-extrabold leading-tight text-navy group-hover:text-navy-700">{m.name}</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-600 line-clamp-2">{m.purpose}</p>
                  <div className="mt-1.5 text-xs text-muted">{m.leader}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 bg-haze border border-black/5 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-extrabold text-navy">Want to volunteer?</h3>
              <p className="text-sm text-muted mt-1">Tell us your skills, availability, and department of interest — our coordinators will follow up.</p>
            </div>
            <Link href="/new-here#volunteer" className="btn btn--navy text-sm">
              Join a Department
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
