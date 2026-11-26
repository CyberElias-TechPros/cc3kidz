/**
 * Rhapsody store — server-only JSON loader.
 * Reads bundled JSON snapshots generated from rhapsody-blog (src/data/rhapsody/*.json).
 * Falls back gracefully when files are missing.
 * Client components receive plain props via page loaders.
 */
import fs from 'node:fs'
import path from 'node:path'
import type { AudienceId } from './audiences'
import type { Devotional, KidsIssue, RhapsodyQuery } from './types'

let cache: Record<string, Devotional[]> | null = null
let kidsCache: KidsIssue[] | null = null

function dataDir() {
  return path.join(process.cwd(), 'src', 'data', 'rhapsody')
}

function loadAudience(audience: AudienceId): Devotional[] {
  if (cache && cache[audience]) return cache[audience]
  try {
    const file = path.join(dataDir(), `${audience}.json`)
    if (!fs.existsSync(file)) return []
    const raw = fs.readFileSync(file, 'utf8')
    const arr = JSON.parse(raw) as Devotional[]
    if (!cache) cache = {} as any
    cache[audience] = arr
    return arr
  } catch {
    return []
  }
}

function allDevotionals(): Devotional[] {
  const adults = loadAudience('adults')
  const teens = loadAudience('teens')
  const early = loadAudience('early-readers')
  return [...adults, ...teens, ...early]
}

export function getDevotionals(query: RhapsodyQuery = {}): { items: Devotional[]; total: number } {
  let items: Devotional[]
  if (query.audience) {
    items = [...loadAudience(query.audience)]
  } else {
    items = allDevotionals()
  }
  if (query.edition) {
    items = items.filter((d) => d.edition === query.edition)
  }
  if (query.q) {
    const q = query.q.toLowerCase()
    items = items.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.excerpt.toLowerCase().includes(q) ||
        d.scripture.toLowerCase().includes(q) ||
        d.body.toLowerCase().includes(q)
    )
  }
  if (query.sortBy === 'title') items.sort((a, b) => a.title.localeCompare(b.title))
  else if (query.sortBy === 'date-asc') items.sort((a, b) => a.date.localeCompare(b.date))
  else items.sort((a, b) => b.date.localeCompare(a.date))

  const total = items.length
  const offset = query.offset ?? 0
  const limit = query.limit ?? total
  items = items.slice(offset, offset + limit)
  return { items, total }
}

export function getDevotionalBySlug(slug: string): Devotional | null {
  return allDevotionals().find((d) => d.slug === slug) ?? null
}

export function getDevotionalByDate(date: string, audience: AudienceId = 'adults'): Devotional | null {
  const list = loadAudience(audience)
  return list.find((d) => d.date === date) ?? null
}

export function getTodayDevotional(audience: AudienceId = 'adults'): Devotional | null {
  const list = loadAudience(audience)
  if (!list.length) return null
  // Use server date in site timezone (Africa/Lagos) fallback to latest
  const today = new Date().toISOString().slice(0, 10)
  const exact = list.find((d) => d.date === today)
  if (exact) return exact
  // fallback to most recent (already sorted desc, so first is newest)
  return list[0] ?? null
}

export function getEditions(audience?: AudienceId): { edition: string; title: string; count: number; from: string; to: string }[] {
  const items = audience ? loadAudience(audience) : allDevotionals()
  const map = new Map<string, Devotional[]>()
  for (const d of items) {
    const arr = map.get(d.edition)
    if (arr) arr.push(d)
    else map.set(d.edition, [d])
  }
  const out: any[] = []
  for (const [edition, list] of map) {
    list.sort((a, b) => a.date.localeCompare(b.date))
    out.push({
      edition,
      title: list[0]?.editionTitle ?? edition,
      count: list.length,
      from: list[0]?.date ?? '',
      to: list[list.length - 1]?.date ?? '',
      audience: (list[0] as any)?.audience ?? 'adults',
    })
  }
  out.sort((a, b) => b.edition.localeCompare(a.edition))
  return out
}

export function getAdjacent(slug: string): { prev: Devotional | null; next: Devotional | null } {
  const cur = getDevotionalBySlug(slug)
  if (!cur) return { prev: null, next: null }
  const list = loadAudience(cur.audience)
  list.sort((a, b) => a.date.localeCompare(b.date)) // asc for adjacency
  const idx = list.findIndex((d) => d.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  return { prev: list[idx - 1] ?? null, next: list[idx + 1] ?? null }
}

export function getKidsIssues(): KidsIssue[] {
  if (kidsCache) return kidsCache
  try {
    const file = path.join(dataDir(), 'kids-issues.json')
    if (!fs.existsSync(file)) return []
    const raw = fs.readFileSync(file, 'utf8')
    kidsCache = JSON.parse(raw) as KidsIssue[]
    return kidsCache
  } catch {
    return []
  }
}

export function getRecentByAudience(audience: AudienceId, limit = 6): Devotional[] {
  const list = loadAudience(audience)
  return list.slice(0, limit)
}
