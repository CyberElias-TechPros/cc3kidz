/**
 * Gamification engine — client + server shared logic.
 * Points, levels, streaks, badges. Persisted in localStorage (client) and
 * optionally mirrored to Prisma (server) when DATABASE_URL is present.
 *
 * Level curve: level = floor(sqrt(totalPoints / 10)) + 1  (so 100pts ≈ L4, 400≈L7, 900≈L10)
 * Badge rules are explicit below.
 */

export type BadgeId =
  | 'first-light'
  | 'streak-3'
  | 'streak-7'
  | 'streak-30'
  | 'scholar'
  | 'quiz-master'
  | 'perfect-score'
  | 'word-hungry'
  | 'faithful-reader'
  | 'teevo-champion'
  | 'kiddies-star'

export const BADGES: Record<BadgeId, { label: string; desc: string; icon: string }> = {
  'first-light': { label: 'First Light', desc: 'Completed first devotional', icon: '🌅' },
  'streak-3': { label: '3-Day Streak', desc: 'Read 3 days in a row', icon: '🔥' },
  'streak-7': { label: 'Week Warrior', desc: '7-day streak', icon: '⚡' },
  'streak-30': { label: '30-Day Flame', desc: '30-day streak — on fire!', icon: '🏆' },
  scholar: { label: 'Scholar', desc: 'Completed 10 devotionals', icon: '📚' },
  'quiz-master': { label: 'Quiz Master', desc: 'Passed 10 quizzes (≥60%)', icon: '🧠' },
  'perfect-score': { label: 'Perfect Score', desc: '100% on any quiz', icon: '💯' },
  'word-hungry': { label: 'Word Hungry', desc: '500 points earned', icon: '🍞' },
  'faithful-reader': { label: 'Faithful Reader', desc: '50 devotionals completed', icon: '👑' },
  'teevo-champion': { label: 'TeeVo Champion', desc: 'Completed 20 TeeVo devotionals', icon: '🌟' },
  'kiddies-star': { label: 'Kiddies Star', desc: 'Completed 20 Kiddies Rhapsody devotionals', icon: '⭐' },
}

export interface Progress {
  streak: number
  longestStreak: number
  lastReadDate: string | null // yyyy-mm-dd
  totalPoints: number
  level: number
  badges: BadgeId[]
  completedSlugs: string[]
  quizStats: { totalAttempts: number; passed: number; perfect: number }
  readCounts: { adults: number; teens: number; 'early-readers': number }
}

export const LS_KEY = 'cc3.rhapsody.progress.v1'

export function levelFromPoints(points: number): number {
  return Math.floor(Math.sqrt(Math.max(0, points) / 10)) + 1
}

export function pointsForQuiz(scorePercent: number, questions = 5): number {
  // 20pts per question correct, bonus for perfect
  const raw = Math.round((scorePercent / 100) * questions * 20)
  return scorePercent === 100 ? raw + 10 : raw // perfect bonus
}

export function pointsForRead(audience: string): number {
  if (audience === 'early-readers') return 10
  if (audience === 'teens') return 15
  return 20
}

export function computeStreak(lastDate: string | null, today: string, currentStreak: number): { streak: number; isNewDay: boolean } {
  if (!lastDate) return { streak: 1, isNewDay: true }
  if (lastDate === today) return { streak: currentStreak, isNewDay: false }
  const d1 = new Date(lastDate + 'T00:00:00Z')
  const d2 = new Date(today + 'T00:00:00Z')
  const diffDays = Math.round((d2.getTime() - d1.getTime()) / 86400000)
  if (diffDays === 1) return { streak: currentStreak + 1, isNewDay: true }
  if (diffDays > 1) return { streak: 1, isNewDay: true }
  // diff 0 already handled, diff negative (time travel) -> keep
  return { streak: currentStreak, isNewDay: false }
}

export function evaluateBadges(p: Progress): BadgeId[] {
  const badges: BadgeId[] = []
  const completed = p.completedSlugs.length
  if (completed >= 1) badges.push('first-light')
  if (p.streak >= 3) badges.push('streak-3')
  if (p.streak >= 7) badges.push('streak-7')
  if (p.streak >= 30) badges.push('streak-30')
  if (completed >= 10) badges.push('scholar')
  if (p.quizStats.passed >= 10) badges.push('quiz-master')
  if (p.quizStats.perfect >= 1) badges.push('perfect-score')
  if (p.totalPoints >= 500) badges.push('word-hungry')
  if (completed >= 50) badges.push('faithful-reader')
  if ((p.readCounts.teens ?? 0) >= 20) badges.push('teevo-champion')
  if ((p.readCounts['early-readers'] ?? 0) >= 20) badges.push('kiddies-star')
  return badges
}

export function defaultProgress(): Progress {
  return {
    streak: 0,
    longestStreak: 0,
    lastReadDate: null,
    totalPoints: 0,
    level: 1,
    badges: [],
    completedSlugs: [],
    quizStats: { totalAttempts: 0, passed: 0, perfect: 0 },
    readCounts: { adults: 0, teens: 0, 'early-readers': 0 },
  }
}

// Client helpers
export function loadProgress(): Progress {
  if (typeof window === 'undefined') return defaultProgress()
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return defaultProgress()
    const p = JSON.parse(raw) as Progress
    // migrate: ensure fields
    return { ...defaultProgress(), ...p, readCounts: { ...defaultProgress().readCounts, ...(p as any).readCounts } }
  } catch {
    return defaultProgress()
  }
}

export function saveProgress(p: Progress) {
  if (typeof window === 'undefined') return
  p.level = levelFromPoints(p.totalPoints)
  p.badges = evaluateBadges(p) as any
  p.longestStreak = Math.max(p.longestStreak, p.streak)
  localStorage.setItem(LS_KEY, JSON.stringify(p))
  // also dispatch event for reactive UI
  window.dispatchEvent(new CustomEvent('cc3:progress', { detail: p }))
}

export function recordRead(slug: string, audience: string) {
  const today = new Date().toISOString().slice(0, 10)
  const p = loadProgress()
  if (p.completedSlugs.includes(slug)) {
    // already completed today, still update streak check but no duplicate points
    return p
  }
  const { streak } = computeStreak(p.lastReadDate, today, p.streak)
  p.streak = streak
  p.lastReadDate = today
  p.completedSlugs = [...p.completedSlugs, slug]
  p.totalPoints += pointsForRead(audience)
  const aud = audience as keyof Progress['readCounts']
  if (p.readCounts[aud] !== undefined) p.readCounts[aud]! += 1
  saveProgress(p)
  return p
}

export function recordQuiz(quizId: string, scorePercent: number, questions = 5) {
  const p = loadProgress()
  p.quizStats.totalAttempts += 1
  if (scorePercent >= 60) p.quizStats.passed += 1
  if (scorePercent === 100) p.quizStats.perfect += 1
  p.totalPoints += pointsForQuiz(scorePercent, questions)
  saveProgress(p)
  return p
}
