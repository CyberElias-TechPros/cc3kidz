import type { AudienceId } from './audiences'

export type ClosingLabel = 'Prayer' | 'Confession'

export interface DevotionalSection {
  label: string
  text: string
}

export interface Devotional {
  slug: string
  date: string // yyyy-mm-dd
  title: string
  titleOriginal: string
  excerpt: string
  scripture: string
  scriptureReference: string
  subtitle?: string
  prayerLabel: ClosingLabel
  prayer: string
  extras: DevotionalSection[]
  furtherStudy: string
  oneYearPlan: string
  twoYearPlan: string
  readingMinutes: number
  edition: string // yyyy-mm + suffix
  editionTitle: string
  audience: AudienceId
  audienceLabel: string
  series: string
  tags: string[]
  sourcePages: number[]
  weekday: string
  dayOfMonth: number
  message: string
  body: string
  words: number
}

export interface DevotionalSummary extends Omit<Devotional, 'body' | 'message'> {}

export interface KidsIssue {
  slug: string
  date: string
  edition: string
  title: string
  excerpt: string
  pageCount: number
  sourcePdf: string
  pages: { number: number; image: string; kind: string }[]
}

export interface QuizQuestion {
  id: string
  articleSlug: string
  audience: AudienceId
  q: string
  options: string[]
  answer: number // index
  explain: string
  scriptureRef?: string
  points: number
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface QuizSet {
  id: string
  title: string
  audience: AudienceId
  date: string // devotional date
  slug: string
  questions: QuizQuestion[]
  source: { title: string; scriptureReference: string }
}

export interface GamificationProgress {
  userId?: string
  audience: AudienceId
  streak: number
  longestStreak: number
  lastReadDate: string | null
  totalPoints: number
  level: number
  badges: string[]
  completedSlugs: string[]
  quizAttempts: { quizId: string; score: number; at: string }[]
}

// Rhapsody query
export interface RhapsodyQuery {
  audience?: AudienceId
  edition?: string
  q?: string
  limit?: number
  offset?: number
  sortBy?: 'date-desc' | 'date-asc' | 'title'
}
