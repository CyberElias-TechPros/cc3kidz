/**
 * Quiz generation — deterministic, article-aware.
 * Each devotional yields a 5-question set:
 *  1) Title / main idea
 *  2) Opening scripture reference
 *  3) Key truth / excerpt fact
 *  4) Prayer / confession or further study
 *  5) Reading plan / audience-specific extra
 *
 * Distractors are derived from other devotionals in same audience where possible,
 * so quizzes stay fresh across days without LLM generation.
 */
import type { AudienceId } from './audiences'
import type { Devotional, QuizQuestion, QuizSet } from './types'
import { getDevotionals } from './store'

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

function pickDistractors(pool: string[], correct: string, n: number, seed: number): string[] {
  const uniq = [...new Set(pool.filter((p) => p && p !== correct))]
  // deterministic shuffle by seed
  uniq.sort((a, b) => hashStr(a + seed) - hashStr(b + seed))
  const out = uniq.slice(0, n)
  while (out.length < n) out.push(`Option ${out.length + 1}`)
  return out
}

function allScriptures(audience: AudienceId): string[] {
  return getDevotionals({ audience, limit: 100 }).items.map((d) => d.scriptureReference).filter(Boolean)
}
function allTitles(audience: AudienceId): string[] {
  return getDevotionals({ audience, limit: 100 }).items.map((d) => d.title).filter(Boolean)
}
function allExcerpts(audience: AudienceId): string[] {
  return getDevotionals({ audience, limit: 50 }).items.map((d) => d.excerpt.slice(0, 90)).filter(Boolean)
}

export function generateQuizFor(d: Devotional): QuizSet {
  const audience = d.audience as AudienceId
  const seed = hashStr(d.slug)
  const titlePool = allTitles(audience)
  const scripturePool = allScriptures(audience)
  const excerptPool = allExcerpts(audience)

  const questions: QuizQuestion[] = []

  // Q1 — What is the theme/title focus?
  const titleCorrect = d.title
  const titleDists = pickDistractors(titlePool, titleCorrect, 3, seed + 1)
  questions.push({
    id: `${d.slug}-q1`,
    articleSlug: d.slug,
    audience,
    q: `What is the main theme of today's ${audience === 'teens' ? 'TeeVo' : audience === 'early-readers' ? 'Kiddies Rhapsody' : 'Rhapsody'}: "${d.title}"?`,
    options: shuffleWithCorrect(titleCorrect, titleDists, seed + 11),
    answer: correctIndex(titleCorrect, shuffleWithCorrect(titleCorrect, titleDists, seed + 11)),
    explain: d.excerpt.slice(0, 180),
    scriptureRef: d.scriptureReference,
    points: 20,
    difficulty: 'easy',
  })

  // Q2 — Opening scripture
  const scriptureCorrect = d.scriptureReference || d.scripture.slice(0, 60)
  const scriptDists = pickDistractors(scripturePool, scriptureCorrect, 3, seed + 2)
  questions.push({
    id: `${d.slug}-q2`,
    articleSlug: d.slug,
    audience,
    q: `Which scripture is the opening verse for this devotional?`,
    options: shuffleWithCorrect(scriptureCorrect, scriptDists, seed + 12),
    answer: correctIndex(scriptureCorrect, shuffleWithCorrect(scriptureCorrect, scriptDists, seed + 12)),
    explain: d.scripture.slice(0, 180),
    scriptureRef: d.scriptureReference,
    points: 20,
    difficulty: 'medium',
  })

  // Q3 — Key truth from excerpt
  const excerptTruth = d.excerpt.slice(0, 120)
  const excerptDists = pickDistractors(excerptPool, excerptTruth, 3, seed + 3)
  questions.push({
    id: `${d.slug}-q3`,
    articleSlug: d.slug,
    audience,
    q: `Which statement best reflects the key message of this article?`,
    options: shuffleWithCorrect(excerptTruth, excerptDists, seed + 13),
    answer: correctIndex(excerptTruth, shuffleWithCorrect(excerptTruth, excerptDists, seed + 13)),
    explain: d.excerpt.slice(0, 200),
    points: 20,
    difficulty: 'medium',
  })

  // Q4 — Prayer/Confession understanding
  const prayerSnippet = d.prayer ? d.prayer.slice(0, 110) : d.furtherStudy || 'Faith in the Word'
  // Build a small pool of prayer-like answers from same audience
  const prayerPool = getDevotionals({ audience, limit: 40 }).items.map((x) => x.prayer.slice(0, 110)).filter(Boolean)
  const prayerDists = pickDistractors(prayerPool, prayerSnippet, 3, seed + 4)
  questions.push({
    id: `${d.slug}-q4`,
    articleSlug: d.slug,
    audience,
    q: d.prayerLabel === 'Confession' ? `Complete the confession from today:` : `What is the closing prayer focus?`,
    options: shuffleWithCorrect(prayerSnippet, prayerDists, seed + 14),
    answer: correctIndex(prayerSnippet, shuffleWithCorrect(prayerSnippet, prayerDists, seed + 14)),
    explain: d.prayer.slice(0, 200) || 'See the Prayer/Confession section.',
    points: 20,
    difficulty: 'hard',
  })

  // Q5 — Reading plan / further study
  const studyCorrect = d.furtherStudy || d.oneYearPlan || 'Study the Word daily'
  const studyPool = getDevotionals({ audience, limit: 40 }).items.map((x) => x.furtherStudy).filter(Boolean)
  const studyDists = pickDistractors(studyPool, studyCorrect, 3, seed + 5)
  questions.push({
    id: `${d.slug}-q5`,
    articleSlug: d.slug,
    audience,
    q: `What is listed under Further Study for today?`,
    options: shuffleWithCorrect(studyCorrect, studyDists, seed + 15),
    answer: correctIndex(studyCorrect, shuffleWithCorrect(studyCorrect, studyDists, seed + 15)),
    explain: `Further Study: ${d.furtherStudy || d.oneYearPlan}`,
    points: 20,
    difficulty: 'medium',
  })

  return {
    id: `quiz-${d.slug}`,
    title: `${d.title} — Quiz`,
    audience,
    date: d.date,
    slug: d.slug,
    questions,
    source: { title: d.title, scriptureReference: d.scriptureReference },
  }
}

function shuffleWithCorrect(correct: string, distractors: string[], seed: number): string[] {
  const arr = [correct, ...distractors]
  // deterministic shuffle
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = (hashStr(String(seed + i)) + i) % (i + 1)
    const tmp = out[i]
    out[i] = out[j]
    out[j] = tmp
  }
  return out
}
function correctIndex(correct: string, options: string[]): number {
  return options.indexOf(correct)
}

export function getQuizForSlug(slug: string): QuizSet | null {
  // re-use store lookup
  const { getDevotionalBySlug } = require('./store') as typeof import('./store')
  const d = getDevotionalBySlug(slug)
  if (!d) return null
  return generateQuizFor(d)
}
