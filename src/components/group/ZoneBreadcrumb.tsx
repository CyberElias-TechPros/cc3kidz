import Link from 'next/link'

export function ZoneBreadcrumb({ current, church }: { current?: string; church?: string }) {
  return (
    <nav className="text-xs text-muted flex items-center flex-wrap gap-1.5 py-3">
      <a href="https://cephzone3.org/" target="_blank" rel="noreferrer" className="rounded-full bg-gold/15 border border-gold/20 px-2.5 py-1 font-bold tracking-widest uppercase text-[0.66rem] hover:bg-gold/25 transition">LoveWorld Nation</a>
      <span className="opacity-30">›</span>
      <a href="https://cephzone3.org/" target="_blank" rel="noreferrer" className="hover:underline underline-offset-4">PH Zone 3 ↗</a>
      <span className="opacity-30">›</span>
      <Link href="/group" className="hover:underline underline-offset-4 font-semibold text-navy">CC3 Group</Link>
      {current && (
        <>
          <span className="opacity-30">›</span>
          <span className="font-semibold text-navy">{current}</span>
        </>
      )}
      {church && (
        <>
          <span className="opacity-30">›</span>
          <span className="rounded-full bg-navy text-white px-2.5 py-1 font-bold">{church}</span>
        </>
      )}
      <span className="ml-auto hidden sm:inline-flex items-center gap-1 rounded-full bg-white border border-black/10 px-2.5 py-1 text-[0.68rem]">30B Rumuokwuta/NTA Road, Opposite Patcoin <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /></span>
    </nav>
  )
}
