const buckets = new Map<string, { count:number, reset:number }>()

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
