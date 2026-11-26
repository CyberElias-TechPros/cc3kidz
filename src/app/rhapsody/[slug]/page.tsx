import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDevotionalBySlug, getAdjacent } from '@/lib/rhapsody/store'
import { RhapsodyReader } from '@/components/rhapsody/RhapsodyReader'
import { GamificationBar } from '@/components/rhapsody/GamificationBar'

export async function generateStaticParams() {
  // Pre-render recent 20 for perf, rest on-demand
  const { getDevotionals } = await import('@/lib/rhapsody/store')
  const { items } = getDevotionals({ audience: 'adults', limit: 20 })
  return items.map((d) => ({ slug: d.slug }))
}

export default function RhapsodyDetail({ params }: { params: { slug: string } }) {
  const d = getDevotionalBySlug(params.slug)
  if (!d) return notFound()
  // ensure audience is adults; if teens/early, redirect to correct church path
  if (d.audience !== 'adults') {
    const church = d.audience === 'teens' ? 'teens' : 'kids'
    return (
      <div className="container-cc py-10">
        <div className="card p-6 text-center">
          <p className="text-sm text-slate-600">This devotional is for {d.audienceLabel}. Redirecting…</p>
          <Link href={`/${church}/rhapsody/${d.slug}`} className="btn btn--navy mt-3">Go to {church} →</Link>
        </div>
      </div>
    )
  }
  const { prev, next } = getAdjacent(d.slug)
  return (
    <div className="min-h-screen bg-haze">
      <div className="bg-navy text-white">
        <div className="container-cc py-4 flex items-center justify-between text-xs">
          <Link href="/rhapsody" className="text-white/80 hover:text-white">← Back to Rhapsody</Link>
          <span className="bg-white/10 border border-white/20 rounded-full px-3 py-1">{d.date} · {d.editionTitle}</span>
        </div>
      </div>
      <div className="container-cc py-6">
        <GamificationBar church="main" />
      </div>
      <div className="container-cc pb-8 grid lg:grid-cols-[1.6fr_0.6fr] gap-6">
        <RhapsodyReader d={d} church="main" />
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="font-display font-extrabold text-navy">Explore</h3>
            <div className="mt-3 space-y-2 text-sm">
              {prev && <Link href={`/rhapsody/${prev.slug}`} className="flex justify-between rounded-xl bg-haze p-3 hover:border-gold/30 border border-transparent"><span>← {prev.title.slice(0, 24)}…</span><span className="text-muted">{prev.date}</span></Link>}
              {next && <Link href={`/rhapsody/${next.slug}`} className="flex justify-between rounded-xl bg-haze p-3 hover:border-gold/30 border border-transparent"><span>{next.title.slice(0, 24)}… →</span><span className="text-muted">{next.date}</span></Link>}
              <Link href={`/rhapsody/quiz/${d.slug}`} className="btn btn--gold w-full justify-center !py-2 text-xs">Take quiz for this article</Link>
            </div>
          </div>
          <div className="card p-5 bg-navy text-white">
            <h3 className="font-display font-extrabold">Keep your streak</h3>
            <p className="text-sm text-white/70 mt-1">Mark as read + quiz daily to earn XP and badges.</p>
            <Link href="/rhapsody/achievements" className="mt-3 btn bg-white text-navy w-full justify-center !py-2 text-xs">View Achievements →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
