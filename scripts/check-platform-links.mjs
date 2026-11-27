#!/usr/bin/env node
/**
 * LoveWorld platform link-health checker.
 * Verifies every platform URL responds (200/301/302/999-anti-bot tolerated).
 * Run: npm run check:links   (designed for CI — sandbox networks may block outbound)
 */
import { platforms } from '../src/data/loveworld-platforms.ts'

const okCodes = new Set([200, 301, 302, 303, 307, 308, 999]) // 999 = LinkedIn/anti-bot "ok-ish"
const seen = new Map()
let failures = 0

for (const p of platforms) {
  if (seen.has(p.url)) continue
  seen.set(p.url, p.id)
  let status = 0
  try {
    const res = await fetch(p.url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CC3LinkChecker/1.0)' },
    })
    status = res.status
  } catch {
    // HEAD may be rejected; try GET
    try {
      const res = await fetch(p.url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(15000),
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CC3LinkChecker/1.0)' },
      })
      status = res.status
      try { await res.body?.cancel() } catch {}
    } catch (e) {
      status = -1
    }
  }
  const good = okCodes.has(status)
  if (!good) failures++
  console.log(`${good ? '✅' : '❌'} [${status}] ${p.url}  (${p.id})`)
}

console.log(`\n${seen.size} unique URLs checked · ${failures} failing`)
if (failures > 0) {
  console.error('Fix or drop the failing platforms in src/data/loveworld-platforms.ts')
  process.exit(1)
}
