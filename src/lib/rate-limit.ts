const buckets = new Map<string, { count:number, reset:number }>()

// periodic cleanup to avoid memory leak (every 5m)
if (typeof setInterval !== 'undefined') {
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

// Production note: this is in-memory and won't share state across serverless instances.
// For true distributed limiting, replace with Upstash Redis (examples in docs/deploy.md):
//   import { Ratelimit } from "@upstash/ratelimit"; import { Redis } from "@upstash/redis";
//   const ratelimit = new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(20, "60 s") })
//   export async function rateLimit(key, limit){ const {success, remaining, reset} = await ratelimit.limit(key); return {ok: success, remaining, retryAfter: ...}}
// Until Redis is provisioned, this still mitigates per-instance bursts.

// Presets for sensitive endpoints — tighten over time and move to Redis.
export const RATE_PRESETS = {
  login: { limit: 8, windowMs: 60_000 },       // 8/min per IP
  register: { limit: 5, windowMs: 60_000 },
  forgotPassword: { limit: 3, windowMs: 60_000 },
  contact: { limit: 10, windowMs: 60_000 },
  giving: { limit: 10, windowMs: 60_000 },
  prayer: { limit: 15, windowMs: 60_000 },
} as const
