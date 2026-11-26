'use client'
import { useEffect, useState } from 'react'
import { loadProgress, BADGES } from '@/lib/gamification/engine'
import type { Progress } from '@/lib/gamification/engine'

export function BadgeGrid() {
  const [p, setP] = useState<Progress>(() => loadProgress())
  useEffect(() => {
    const u = () => setP(loadProgress())
    window.addEventListener('cc3:progress', u as any)
    return () => window.removeEventListener('cc3:progress', u as any)
  }, [])
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {Object.entries(BADGES).map(([id, meta]) => {
        const earned = p.badges.includes(id as any)
        return (
          <div key={id} className={`rounded-xl border p-4 text-center ${earned ? 'bg-white border-gold/30' : 'bg-haze border-black/5 opacity-60'}`}>
            <div className="text-2xl">{meta.icon}</div>
            <div className="text-sm font-bold text-navy mt-1">{meta.label}</div>
            <div className="text-xs text-muted">{meta.desc}</div>
            <div className={`mt-2 text-xs font-bold ${earned ? 'text-green-600' : 'text-muted'}`}>{earned ? 'Unlocked ✓' : 'Locked'}</div>
          </div>
        )
      })}
    </div>
  )
}

export function LeaderboardMock({ audience }: { audience?: string }) {
  // Mock leaderboard — real would come from /api/gamification/leaderboard
  const mock = [
    { name: 'Faith O.', xp: 1240, streak: 18, badge: '🏆' },
    { name: 'David E.', xp: 980, streak: 12, badge: '⚡' },
    { name: 'Grace C.', xp: 860, streak: 9, badge: '🌟' },
    { name: 'You', xp: loadProgress().totalPoints || 0, streak: loadProgress().streak, badge: '🔥', you: true },
  ].sort((a, b) => b.xp - a.xp)
  return (
    <div className="card overflow-hidden p-0">
      <div className="p-4 bg-navy text-white flex items-center justify-between">
        <h3 className="font-display font-extrabold">Leaderboard {audience ? `· ${audience}` : ''}</h3>
        <span className="text-xs bg-white/10 border border-white/20 rounded-full px-2 py-1">Weekly</span>
      </div>
      <div className="divide-y divide-black/5">
        {mock.map((r, i) => (
          <div key={r.name} className={`flex items-center justify-between p-4 ${r.you ? 'bg-amber-50' : 'bg-white'}`}>
            <div className="flex items-center gap-3">
              <span className={`h-8 w-8 grid place-items-center rounded-full text-sm font-black ${i === 0 ? 'bg-gold text-navy' : 'bg-haze text-navy'}`}>{i + 1}</span>
              <div>
                <div className="text-sm font-bold text-navy">{r.badge} {r.name}{r.you ? ' — You' : ''}</div>
                <div className="text-xs text-muted">{r.streak} day streak</div>
              </div>
            </div>
            <div className="text-sm font-black text-navy">{r.xp} XP</div>
          </div>
        ))}
      </div>
      <div className="p-3 text-center text-xs text-muted bg-haze">Full leaderboard coming with server sync — currently local progress.</div>
    </div>
  )
}
