const buckets = new Map<string, { count:number, reset:number }>()

// periodic cleanup to avoid memory leak (every 5m)
if (typeof setInterval !== 'undefined') {
  // only in server runtime, not edge
  try {
    setInterval(() => {
      const now = Date.now()
      for (const [k, v] of buckets) if (now > v.reset) buckets.delete(k)
    }, 5 * 60 * 1000).unref?.()
  } catch {}
}

export function rateLimit(key: string, limit = 20, windowMs = 60_000){
  const now = Date.now()
  const b = buckets.get(key)
  if (!b || now > b.reset){
    buckets.set(key, { count: 1, reset: now + windowMs })
    return { ok: true, remaining: limit - 1 }
  }
  if (b.count >= limit) return { ok: false, remaining: 0, retryAfter: Math.ceil((b.reset - now)/1000) }
  b.count++
  return { ok: true, remaining: limit - b.count }
}
export function clientIp(req: Request){
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
}
// For prod scale, swap this file with a Redis implementation:
//   export async function rateLimit(key,limit,windowMs){ return await redisRateLimit(key,limit,windowMs) }
// See docs/deploy.md for Upstash example.
