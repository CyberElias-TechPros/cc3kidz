import Link from 'next/link'
import { getDevotionals, getEditions } from '@/lib/rhapsody/store'

export default function Page({ searchParams }: { searchParams: { edition?: string } }) {
  const edition = searchParams?.edition
  const { items, total } = getDevotionals({ audience: 'teens', edition, limit: 30 })
  const editions = getEditions('teens')
  return (
    <div className="min-h-screen bg-haze">
      <div className="bg-white border-b border-black/5">
        <div className="container-cc py-6 flex items-center justify-between">
          <h1 className="font-display font-extrabold text-xl text-navy">TeeVo Archive — {total}</h1>
          <Link href="/teens/rhapsody" className="btn btn--ghost !py-2 text-xs">← Today</Link>
        </div>
        <div className="container-cc pb-4 flex gap-2 flex-wrap">
          <Link href="/teens/rhapsody/archive" className={`rounded-full px-3 py-1 text-xs font-bold border ${!edition ? 'bg-[#172B76] text-white border-[#172B76]' : 'bg-white border-black/10'}`}>All</Link>
          {editions.slice(0,8).map(e=> <Link key={e.edition} href={`/teens/rhapsody/archive?edition=${e.edition}`} className={`rounded-full px-3 py-1 text-xs font-bold border ${edition===e.edition?'bg-[#172B76] text-white border-[#172B76]':'bg-white border-black/10'}`}>{e.title} ({e.count})</Link>)}
        </div>
      </div>
      <div className="container-cc py-6 grid md:grid-cols-3 gap-4">
        {items.map(d=> <Link key={d.slug} href={`/teens/rhapsody/${d.slug}`} className="card p-4 hover:border-gold/30"><div className="text-xs text-muted">{d.date}</div><div className="font-extrabold text-navy mt-1">{d.title}</div><div className="text-sm text-slate-600 mt-1 line-clamp-2">{d.excerpt}</div></Link>)}
      </div>
    </div>
  )
}
