'use client'
import { useEffect, useState } from 'react'

function getParts(target: string) {
  const t = new Date(target).getTime()
  const now = Date.now()
  const diff = Math.max(0, t - now)
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return { d, h, m, s, done: diff === 0 }
}

export default function Countdown({ target, onDoneLabel = 'Live now', variant = 'auto' }: { target: string; onDoneLabel?: string; variant?: 'light' | 'dark' | 'auto' }) {
  const [parts, setParts] = useState<ReturnType<typeof getParts> | null>(null)
  useEffect(() => {
    setParts(getParts(target))
    const id = setInterval(() => setParts(getParts(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  // Hydration-safe: render placeholder until client computes (server & initial client match)
  if (!parts) {
    const isDark = variant === 'dark'
    const Placeholder = ({ l }: { l: string }) => (
      <span
        className={`inline-flex flex-col items-center rounded-2xl border px-3 py-2 min-w-[56px] shadow-sm ${
          isDark ? 'bg-navy border-gold/20' : 'bg-white border-black/10'
        }`}
      >
        <span className={`font-display font-extrabold text-lg leading-none ${isDark ? 'text-white' : 'text-navy'}`}>--</span>
        <span className={`text-[0.64rem] tracking-widest uppercase font-bold ${isDark ? 'text-gold/90' : 'text-navy/60'}`}>{l}</span>
      </span>
    )
    return (
      <span className="inline-flex gap-2" suppressHydrationWarning>
        <Placeholder l="Days" />
        <Placeholder l="Hrs" />
        <Placeholder l="Min" />
        <Placeholder l="Sec" />
      </span>
    )
  }
  if (parts.done) return <span className="inline-flex items-center rounded-full bg-emerald-500 text-white px-3 py-1 text-xs font-bold">{onDoneLabel}</span>
  // light = white box for dark backgrounds (hero, navy bar). dark = navy box for light backgrounds (white cards)
  const isDark = variant === 'dark'
  const Box = ({ v, l }: { v: number; l: string }) => (
    <span
      className={`inline-flex flex-col items-center rounded-2xl border px-3 py-2 min-w-[56px] shadow-sm ${
        isDark ? 'bg-navy border-gold/20 shadow-md' : 'bg-white border-black/10'
      }`}
    >
      <span className={`font-display font-extrabold text-lg leading-none ${isDark ? 'text-white' : 'text-navy'}`}>{String(v).padStart(2, '0')}</span>
      <span className={`text-[0.64rem] tracking-widest uppercase font-bold ${isDark ? 'text-gold/90' : 'text-navy/60'}`}>{l}</span>
    </span>
  )
  return (
    <span className="inline-flex gap-2">
      <Box v={parts.d} l="Days" />
      <Box v={parts.h} l="Hrs" />
      <Box v={parts.m} l="Min" />
      <Box v={parts.s} l="Sec" />
    </span>
  )
}
