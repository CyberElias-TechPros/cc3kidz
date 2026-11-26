'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { loadProgress, levelFromPoints, BADGES } from '@/lib/gamification/engine'
import type { Progress } from '@/lib/gamification/engine'

export function GamificationBar({ church }: { church: 'main'|'youth'|'teens'|'kids' }) {
  const [p, setP] = useState<Progress>(() => loadProgress())

  useEffect(() => {
    const update = () => setP(loadProgress())
    update()
    window.addEventListener('cc3:progress', update as any)
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener('cc3:progress', update as any)
      window.removeEventListener('storage', update)
    }
  }, [])

  const level = levelFromPoints(p.totalPoints)
  const nextLevelAt = (level * level) * 10 // inverse of sqrt calc approx
  const progressPct = Math.min(100, Math.round(((p.totalPoints % 100) / 100) * 100))

  return (
    <div className="rounded-xl border border-black/5 bg-white p-4 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 grid place-items-center rounded-full bg-navy text-white font-black">L{level}</div>
        <div>
          <div className="text-sm font-extrabold text-navy">Level {level} · {p.totalPoints} XP</div>
          <div className="text-xs text-muted">Streak {p.streak} · Best {p.longestStreak} · {p.completedSlugs.length} completed</div>
        </div>
      </div>
      <div className="flex-1 min-w-[180px]">
        <div className="h-2 rounded-full bg-haze overflow-hidden">
          <div className="h-2 bg-gold rounded-full transition-all" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="text-[10px] text-muted mt-1">{progressPct}% to Level {level + 1}</div>
      </div>
      <div className="flex items-center gap-1.5 flex-wrap">
        {p.badges.slice(0, 6).map((b) => {
          const meta = (BADGES as any)[b]
          return (
            <span key={b} title={`${meta?.label}: ${meta?.desc}`} className="h-7 w-7 grid place-items-center rounded-full bg-haze border border-black/5">
              {meta?.icon ?? '🏅'}
            </span>
          )
        })}
        {p.badges.length === 0 && <span className="text-xs text-muted">No badges yet — complete today’s devotional!</span>}
      </div>
      <Link href={`/${church === 'main' ? 'rhapsody' : church}/achievements`} className="btn btn--ghost !py-1.5 text-xs">Achievements →</Link>
    </div>
  )
}

export function StreakWidget() {
  const [p, setP] = useState<Progress>(() => loadProgress())
  useEffect(() => {
    const u = () => setP(loadProgress())
    window.addEventListener('cc3:progress', u as any)
    return () => window.removeEventListener('cc3:progress', u as any)
  }, [])
  const days = Array.from({ length: 7 }, (_, i) => {
    const isActive = i < (p.streak % 7 || (p.streak > 0 ? 7 : 0))
    return isActive
  })
  return (
    <div className="rounded-xl bg-navy text-white p-4 flex items-center justify-between">
      <div>
        <div className="text-xs font-bold tracking-widest uppercase text-gold">Daily Streak</div>
        <div className="font-display font-extrabold text-xl mt-1">{p.streak} {p.streak === 1 ? 'day' : 'days'} 🔥</div>
        <div className="text-xs text-white/60">Longest {p.longestStreak} · Keep it going!</div>
      </div>
      <div className="flex gap-1.5">
        {days.map((on, i) => (
          <div key={i} className={`h-8 w-8 grid place-items-center rounded-full text-xs font-bold ${on ? 'bg-gold text-navy' : 'bg-white/10 text-white/50'}`}>{on ? '✓' : '·'}</div>
        ))}
      </div>
    </div>
  )
}
