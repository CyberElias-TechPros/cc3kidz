import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDevotionalBySlug, getAdjacent } from '@/lib/rhapsody/store'
import { RhapsodyReader } from '@/components/rhapsody/RhapsodyReader'
import { GamificationBar } from '@/components/rhapsody/GamificationBar'

export async function generateStaticParams() {
  const { getDevotionals } = await import('@/lib/rhapsody/store')
  const { items } = getDevotionals({ audience: 'adults', limit: 20 })
  return items.map(d => ({ slug: d.slug }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const d = getDevotionalBySlug(params.slug)
  if (!d) return notFound()
  const { prev, next } = getAdjacent(d.slug)
  return (
    <div className="min-h-screen bg-haze">
      <div className="bg-[#101A2B] text-white">
        <div className="container-cc py-4 flex items-center justify-between text-xs">
          <Link href="/youth/rhapsody" className="text-white/80 hover:text-white">← Back to Youth Rhapsody</Link>
          <span className="bg-white/10 border border-white/20 rounded-full px-3 py-1">{d.date}</span>
        </div>
      </div>
      <div className="container-cc py-6"><GamificationBar church="youth" /></div>
      <div className="container-cc pb-8 grid lg:grid-cols-[1.6fr_0.6fr] gap-6">
        <RhapsodyReader d={d} church="youth" />
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="font-display font-extrabold text-navy">Explore</h3>
            <div className="mt-3 space-y-2 text-sm">
              {prev && <Link href={`/youth/rhapsody/${prev.slug}`} className="flex justify-between rounded-xl bg-haze p-3 border border-transparent hover:border-gold/30"><span>← {prev.title.slice(0,22)}…</span><span className="text-muted">{prev.date}</span></Link>}
              {next && <Link href={`/youth/rhapsody/${next.slug}`} className="flex justify-between rounded-xl bg-haze p-3 border border-transparent hover:border-gold/30"><span>{next.title.slice(0,22)}… →</span><span className="text-muted">{next.date}</span></Link>}
              <Link href={`/youth/rhapsody/quiz/${d.slug}`} className="btn btn--gold w-full justify-center !py-2 text-xs">Take quiz</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
