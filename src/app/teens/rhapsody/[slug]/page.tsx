import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDevotionalBySlug, getAdjacent } from '@/lib/rhapsody/store'
import { RhapsodyReader } from '@/components/rhapsody/RhapsodyReader'
import { GamificationBar } from '@/components/rhapsody/GamificationBar'

export async function generateStaticParams() {
  const { getDevotionals } = await import('@/lib/rhapsody/store')
  const { items } = getDevotionals({ audience: 'teens', limit: 20 })
  return items.map((d) => ({ slug: d.slug }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const d = getDevotionalBySlug(params.slug)
  if (!d || d.audience !== 'teens') return notFound()
  const { prev, next } = getAdjacent(d.slug)
  return (
    <div className="min-h-screen bg-haze">
      <div className="bg-[#172B76] text-white">
        <div className="container-cc py-4 flex items-center justify-between text-xs">
          <Link href="/teens/rhapsody" className="text-white/80 hover:text-white">← Back to TeeVo</Link>
          <span className="bg-white/10 border border-white/20 rounded-full px-3 py-1">{d.date} · TeeVo</span>
        </div>
      </div>
      <div className="container-cc py-6"><GamificationBar church="teens" /></div>
      <div className="container-cc pb-8 grid lg:grid-cols-[1.6fr_0.6fr] gap-6">
        <RhapsodyReader d={d} church="teens" />
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="font-display font-extrabold text-navy">Keep going</h3>
            <div className="mt-3 space-y-2 text-sm">
              {prev && <Link href={`/teens/rhapsody/${prev.slug}`} className="flex justify-between rounded-xl bg-haze p-3 border border-transparent hover:border-gold/30"><span>← {prev.title.slice(0, 22)}…</span><span className="text-muted">{prev.date}</span></Link>}
              {next && <Link href={`/teens/rhapsody/${next.slug}`} className="flex justify-between rounded-xl bg-haze p-3 border border-transparent hover:border-gold/30"><span>{next.title.slice(0, 22)}… →</span><span className="text-muted">{next.date}</span></Link>}
              <Link href={`/teens/rhapsody/quiz/${d.slug}`} className="btn bg-[#172B76] text-white w-full justify-center !py-2 text-xs">Take quiz for this TeeVo</Link>
            </div>
          </div>
          <div className="card p-5 bg-navy text-white">
            <h3 className="font-display font-extrabold">Leader: Pastor Binta Alex</h3>
            <p className="text-sm text-white/70 mt-1">Questions about today? Ask your Teens Church coordinator — not DMs.</p>
            <Link href="/teens/connect" className="mt-3 btn bg-white text-navy w-full justify-center !py-2 text-xs">Ask a Question →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
