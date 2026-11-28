import Link from 'next/link'
import { getDevotionals, getEditions } from '@/lib/rhapsody/store'

export default function ArchivePage({ searchParams }: { searchParams: { edition?: string; q?: string } }) {
  const edition = searchParams?.edition
  const q = searchParams?.q
  const { items, total } = getDevotionals({ audience: 'adults', edition, q, limit: 30 })
  const editions = getEditions('adults')

  return (
    <div className="min-h-screen bg-haze">
      <div className="bg-white border-b border-black/5">
        <div className="container-cc py-6 flex items-center justify-between">
          <h1 className="font-display font-extrabold text-xl text-navy">Archive — {total} devotionals</h1>
          <Link href="/rhapsody" className="btn btn--ghost !py-2 text-xs">← Today</Link>
        </div>
        <div className="container-cc pb-4 flex gap-2 flex-wrap">
          <Link href="/rhapsody/archive" className={`rounded-full px-3 py-1 text-xs font-bold border ${!edition ? 'bg-navy text-white border-navy' : 'bg-white border-black/10'}`}>All</Link>
          {editions.slice(0, 8).map((e) => (
            <Link key={e.edition} href={`/rhapsody/archive?edition=${e.edition}`} className={`rounded-full px-3 py-1 text-xs font-bold border ${edition === e.edition ? 'bg-navy text-white border-navy' : 'bg-white border-black/10'}`}>{e.title} ({e.count})</Link>
          ))}
        </div>
      </div>
      <div className="container-cc py-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((d) => (
          <Link key={d.slug} href={`/rhapsody/${d.slug}`} className="card p-4 hover:border-gold/30">
            <div className="text-xs text-muted">{d.date} · {d.scriptureReference}</div>
            <div className="font-extrabold text-navy mt-1">{d.title}</div>
            <div className="text-sm text-slate-600 mt-1 line-clamp-2">{d.excerpt}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
