import Link from 'next/link'

export function ZoneBreadcrumb({ current, church }: { current?: string; church?: string }) {
  return (
    <nav className="text-xs text-muted flex items-center flex-wrap gap-1.5 py-3">
      <span className="rounded-full bg-gold/15 border border-gold/20 px-2.5 py-1 font-bold tracking-widest uppercase text-[0.60rem]">LoveWorld Nation</span>
      <span className="opacity-30">›</span>
      <Link href="/" className="hover:underline underline-offset-4">PH Zone 3</Link>
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
      <span className="ml-auto hidden sm:inline-flex items-center gap-1 rounded-full bg-white border border-black/10 px-2.5 py-1 text-[0.62rem]">Zonal HQ · Jessy & Jenny St, Peter Odili Rd <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /></span>
    </nav>
  )
}
