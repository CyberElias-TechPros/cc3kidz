import Link from 'next/link'
import type { Devotional } from '@/lib/rhapsody/types'

export function RhapsodyCard({ d, href, compact }: { d: Devotional; href: string; compact?: boolean }) {
  const kicker =
    d.audience === 'teens' ? 'TEEVO' : d.audience === 'early-readers' ? 'KIDDIES RHAPSODY' : 'RHAPSODY OF REALITIES'
  return (
    <Link href={href} className="group block rounded-xl border border-black/5 bg-white p-4 hover:border-gold/30 hover:shadow-sm transition">
      <div className="flex items-center gap-2">
        <span className="rounded-full px-2 py-1 text-[10px] font-black tracking-widest uppercase bg-haze border border-black/5 text-navy">
          {kicker}
        </span>
        <span className="text-xs text-muted">{d.date} · {d.readingMinutes} min</span>
      </div>
      <h3 className="mt-2 font-display font-extrabold text-navy leading-tight group-hover:text-[#172B76] line-clamp-2">
        {d.title}
      </h3>
      {!compact && <p className="mt-1 text-sm leading-6 text-slate-600 line-clamp-2">{d.excerpt}</p>}
      <div className="mt-2 text-xs text-muted truncate">{d.scriptureReference} · {d.editionTitle}</div>
      <div className="mt-2 text-xs font-bold text-gold group-hover:underline">Read &amp; take quiz →</div>
    </Link>
  )
}
