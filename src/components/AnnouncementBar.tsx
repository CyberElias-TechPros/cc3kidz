'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'

type Ann = { id: string; badge: string; title: string; href: string; expiresAt: string }

export default function AnnouncementBar({ items }: { items: Ann[] }) {
  const [dismissed, setDismissed] = useState<string | null>(null)
  const [idx, setIdx] = useState(0)
  const [now, setNow] = useState<string | null>(null)

  // Hydration-safe: compute date only on client after mount so server & initial client match
  useEffect(() => {
    setNow(new Date().toISOString().slice(0, 10))
  }, [])

  const active = useMemo(() => {
    if (!now) return items.filter(a => a.id !== dismissed)
    return items.filter(a => a.expiresAt >= now && a.id !== dismissed)
  }, [items, now, dismissed])
  const current = active[idx % active.length]

  useEffect(() => {
    if (active.length <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % active.length), 5000)
    return () => clearInterval(t)
  }, [active.length])

  if (!current) return null

  return (
    <div className="bg-navy text-white text-[0.82rem] relative z-50 border-b border-white/10">
      <div className="container-cc flex items-center justify-between gap-3 py-[0.55rem]">
        <div className="flex items-center gap-3 min-w-0 flex-1 justify-center">
          <span className="hidden sm:inline-flex items-center rounded-full bg-white/10 border border-white/15 px-2.5 py-1 text-[0.68rem] font-bold tracking-widest uppercase">
            {current.badge}
          </span>
          <Link href={current.href} className="truncate hover:underline underline-offset-4 decoration-white/40">
            {current.title}
          </Link>
          <Link
            href={current.href}
            className="hidden md:inline-flex items-center gap-1 rounded-full bg-gold text-navy px-3 py-1 text-xs font-bold"
          >
            Details <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {active.length > 1 && (
            <div className="hidden sm:flex items-center gap-1">
              {active.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition ${i === idx % active.length ? 'bg-gold w-4' : 'bg-white/30'}`}
                />
              ))}
            </div>
          )}
          <button
            onClick={() => setDismissed(current.id)}
            aria-label="Dismiss announcement"
            className="h-7 w-7 grid place-items-center rounded-full bg-white/10 hover:bg-white/15 border border-white/15"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
