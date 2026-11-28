'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import services from '@/data/services.json'

type Service = typeof services[number]

function parseTime(t: string): { h: number; m: number } {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!m) return { h: 8, m: 0 }
  let h = parseInt(m[1], 10)
  const mm = parseInt(m[2], 10)
  const ap = m[3].toUpperCase()
  if (ap === 'PM' && h !== 12) h += 12
  if (ap === 'AM' && h === 12) h = 0
  return { h, m: mm }
}

function dayIndex(d: string): number {
  const map: Record<string, number> = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 }
  return map[d] ?? 0
}

function parseDuration(dur: string): number {
  const h = dur.match(/(\d+(?:\.\d+)?)\s*hours?/i)
  if (h) return parseFloat(h[1]) * 60
  const m = dur.match(/(\d+)\s*min/i)
  if (m) return parseInt(m[1], 10)
  return 120
}

function nextOccurrence(s: Service, now: Date): Date {
  const targetDay = dayIndex(s.day)
  const { h, m } = parseTime(s.time)
  const d = new Date(now)
  d.setSeconds(0, 0)
  const curDay = d.getDay()
  let diff = targetDay - curDay
  const candidate = new Date(now)
  candidate.setDate(now.getDate() + diff)
  candidate.setHours(h, m, 0, 0)
  if (candidate <= now) {
    // if already passed today, push to next week; unless it's currently within duration we want LIVE
    candidate.setDate(candidate.getDate() + 7)
  }
  return candidate
}

function getServiceState(now: Date) {
  // weekly services only (ignore First Sunday, childrens)
  const weekly = (services as Service[]).filter(s => ['Sunday', 'Monday', 'Wednesday'].includes(s.day))
  let best: { s: Service; start: Date; end: Date; diff: number } | null = null
  let live: { s: Service; start: Date; end: Date } | null = null

  for (const s of weekly) {
    const { h, m } = parseTime(s.time)
    const targetDay = dayIndex(s.day)
    // check if live right now: today's day matches and within duration
    const todayStart = new Date(now)
    todayStart.setHours(h, m, 0, 0)
    const durMin = parseDuration(s.duration)
    const todayEnd = new Date(todayStart.getTime() + durMin * 60000)
    if (now.getDay() === targetDay && now >= todayStart && now < todayEnd) {
      // prioritize live by earliest start today
      if (!live || todayStart < live.start) live = { s, start: todayStart, end: todayEnd }
    }
    const nxt = nextOccurrence(s, now)
    const diff = nxt.getTime() - now.getTime()
    if (!best || diff < best.diff) best = { s, start: nxt, end: new Date(nxt.getTime() + durMin * 60000), diff }
  }
  if (live) return { mode: 'live' as const, live }
  return { mode: 'next' as const, next: best! }
}

function fmtDuration(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const d = Math.floor(totalSec / 86400)
  const h = Math.floor((totalSec % 86400) / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  if (d > 0) return `${d}d ${h}h ${m}m`
  if (h > 0) return `${h}h ${m}m ${s}s`
  return `${m}m ${s}s`
}

export default function ServiceCountdown() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!now) {
    return (
      <div className="rounded-xl bg-haze border border-black/5 px-4 py-3 text-xs text-muted">Loading service time…</div>
    )
  }

  const state = getServiceState(now)

  if (state.mode === 'live') {
    const elapsed = now.getTime() - state.live.start.getTime()
    const remaining = state.live.end.getTime() - now.getTime()
    return (
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl bg-emerald-500 text-white px-4 py-3 border border-emerald-600 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
          <span className="text-xs font-black tracking-widest uppercase">Live now</span>
          <span className="rounded-full bg-white text-emerald-600 px-2 py-0.5 text-xs font-bold">{state.live.s.name}</span>
        </div>
        <span className="text-xs font-semibold opacity-90 hidden sm:block">·</span>
        <span className="text-xs">Started {fmtDuration(elapsed)} ago · ends in {fmtDuration(remaining)}</span>
        <Link href={`/services/${state.live.s.slug}`} className="ml-auto text-xs font-bold underline underline-offset-4">Join →</Link>
      </div>
    )
  }

  const n = state.next
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl bg-navy text-white px-4 py-3 border border-navy-ink">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-gold animate-pulse" />
        <span className="text-xs font-bold tracking-widest uppercase text-gold">Next service</span>
        <span className="rounded-full bg-white text-navy px-2 py-0.5 text-xs font-bold">{n.s.name}</span>
        <span className="text-xs font-semibold">{n.s.day} {n.s.time}</span>
      </div>
      <span className="text-xs font-mono font-bold bg-white/10 border border-white/15 rounded-full px-3 py-1">in {fmtDuration(n.diff)}</span>
      <span className="text-xs text-white/60 hidden lg:block">WAT · 30B Rumuokwuta/NTA Road</span>
      <Link href={`/services/${n.s.slug}`} className="ml-auto text-xs font-bold bg-gold text-navy px-3 py-1.5 rounded-full hover:bg-white transition">Details →</Link>
    </div>
  )
}
