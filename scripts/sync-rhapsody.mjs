/**
 * Sync Rhapsody articles from rhapsody-blog GitHub repo into src/data/rhapsody/
 * Usage:
 *   node scripts/sync-rhapsody.mjs                    # uses local /tmp/rhapsody-blog if present else clones
 *   RHAPSODY_REPO=https://github.com/CyberElias-TechPros/rhapsody-blog node scripts/sync-rhapsody.mjs
 *
 * Generates:
 *   src/data/rhapsody/adults.json
 *   src/data/rhapsody/teens.json
 *   src/data/rhapsody/early-readers.json
 *   src/data/rhapsody/kids-issues.json
 *   src/data/rhapsody/manifest.json
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const REPO = process.env.RHAPSODY_REPO || 'https://github.com/CyberElias-TechPros/rhapsody-blog'
const TMP = process.env.RHAPSODY_TMP || '/tmp/rhapsody-blog'
const OUT = path.join(process.cwd(), 'src/data/rhapsody')

function ensureRepo() {
  if (fs.existsSync(path.join(TMP, 'content', 'devotionals'))) {
    console.log(`[sync:rhapsody] using existing ${TMP}`)
    return
  }
  console.log(`[sync:rhapsody] cloning ${REPO} → ${TMP}`)
  execSync(`git clone --depth 1 ${REPO} ${TMP}`, { stdio: 'inherit' })
}

let matter
try {
  matter = (await import('gray-matter')).default
} catch {
  console.error('[sync:rhapsody] gray-matter not installed — run npm install gray-matter')
  process.exit(1)
}

ensureRepo()

const srcDir = path.join(TMP, 'content/devotionals')
const kidsDir = path.join(TMP, 'content/kids')
if (!fs.existsSync(srcDir)) {
  console.error(`[sync:rhapsody] not found: ${srcDir}`)
  process.exit(1)
}

fs.mkdirSync(OUT, { recursive: true })

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.md'))
let byAudience = { adults: [], teens: [], 'early-readers': [] }

for (const file of files) {
  const raw = fs.readFileSync(path.join(srcDir, file), 'utf8')
  const { data, content } = matter(raw)
  const audience = data.audience || 'adults'
  const entry = {
    slug: data.slug,
    date: data.date,
    title: data.title,
    titleOriginal: data.titleOriginal,
    excerpt: data.excerpt,
    scripture: data.scripture,
    scriptureReference: data.scriptureReference,
    subtitle: data.subtitle || '',
    prayerLabel: data.prayerLabel || 'Prayer',
    prayer: data.prayer || '',
    extras: data.extras || [],
    furtherStudy: data.furtherStudy || '',
    oneYearPlan: data.oneYearPlan || '',
    twoYearPlan: data.twoYearPlan || '',
    readingMinutes: data.readingMinutes || 2,
    edition: data.edition,
    editionTitle: data.editionTitle,
    audience,
    audienceLabel: data.audienceLabel || '',
    series: data.series,
    tags: data.tags || [],
    sourcePages: data.sourcePages || [],
    weekday: data.weekday,
    dayOfMonth: data.dayOfMonth,
    message: content.trim().split('\n\n').slice(0, 5).join('\n\n').slice(0, 2000),
    body: content.trim(),
    words: data.words || content.split(/\s+/).length,
  }
  if (byAudience[audience]) byAudience[audience].push(entry)
}

for (const k of Object.keys(byAudience)) {
  byAudience[k].sort((a, b) => b.date.localeCompare(a.date))
  fs.writeFileSync(path.join(OUT, `${k}.json`), JSON.stringify(byAudience[k], null, 2))
  console.log(`[sync:rhapsody] ${k}: ${byAudience[k].length} devotionals → src/data/rhapsody/${k}.json`)
}

// kids issues
if (fs.existsSync(kidsDir)) {
  const kfiles = fs.readdirSync(kidsDir).filter(f => f.endsWith('.md'))
  let issues = []
  for (const file of kfiles) {
    const raw = fs.readFileSync(path.join(kidsDir, file), 'utf8')
    const { data } = matter(raw)
    issues.push({
      slug: data.slug,
      date: data.date,
      edition: data.edition,
      title: data.title,
      excerpt: data.excerpt,
      pageCount: data.pageCount,
      sourcePdf: data.sourcePdf,
      pages: data.pages?.slice(0, 3).map(p => ({ number: p.number, image: p.image, kind: p.kind })),
    })
  }
  issues.sort((a, b) => a.date.localeCompare(b.date))
  fs.writeFileSync(path.join(OUT, 'kids-issues.json'), JSON.stringify(issues, null, 2))
  console.log(`[sync:rhapsody] kids-issues: ${issues.length} → kids-issues.json`)
}

const manifest = {
  generatedAt: new Date().toISOString(),
  source: REPO,
  counts: Object.fromEntries(Object.entries(byAudience).map(([k, v]) => [k, v.length])),
  latestByAudience: Object.fromEntries(Object.entries(byAudience).map(([k, v]) => [k, v[0]?.date])),
  earliestByAudience: Object.fromEntries(Object.entries(byAudience).map(([k, v]) => [k, v[v.length - 1]?.date])),
}
fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2))
console.log('[sync:rhapsody] manifest → manifest.json')
console.log('[sync:rhapsody] done — total', files.length)
