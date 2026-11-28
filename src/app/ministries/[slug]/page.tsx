import ministries from '@/data/ministries.json'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import VolunteerForm from '@/components/forms/VolunteerForm'

export function generateStaticParams() {
  return ministries.map((m: any) => ({ slug: m.slug }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const m: any = ministries.find((x: any) => x.slug === slug)
  return { title: m ? m.name : 'Ministry' }
}

export default async function MinistryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const m: any = ministries.find((x: any) => x.slug === slug)
  if (!m) return notFound()
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-12">
          <div className="eyebrow !text-gold">{m.group}</div>
          <h1 className="font-display font-black text-[2.4rem] leading-none mt-2">{m.name}</h1>
          <p className="text-slate-200 mt-3 max-w-2xl">{m.purpose}</p>
        </div>
      </section>
      <section className="section">
        <div className="container-cc grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="card p-6 space-y-4">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image src={m.image} alt={m.name} fill className="object-cover" />
            </div>
            <h2 className="font-display font-extrabold text-xl">Purpose</h2>
            <p className="text-sm leading-7 text-slate-600">{m.purpose}</p>
            <h2 className="font-display font-extrabold text-xl">Activities</h2>
            <ul className="list-disc pl-6 text-sm leading-7 text-slate-600">
              {m.activities.map((a: string) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <h2 className="font-display font-extrabold text-xl">Leadership</h2>
            <p className="text-sm text-muted">{m.leader}</p>
            {m.note && <p className="text-xs text-muted border-t pt-4">{m.note}</p>}
          </div>
          <div className="space-y-6">
            <VolunteerForm defaultDept={m.name} />
            <Link href="/ministries" className="btn btn--ghost w-full justify-center">
              Back to Directory
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
