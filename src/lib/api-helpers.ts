import { z } from 'zod'
import { formatZod } from './validation'
import { rateLimit, clientIp } from './rate-limit'
import { verifySessionCookie } from './session'
import { getUsers } from './auth'

export function jsonError(message: string, status=400){
  return Response.json({ ok:false, error: message }, { status })
}
export function jsonOk(data: any, init?: ResponseInit){
  return Response.json({ ok:true, ...data }, init)
}
export function parseJson<T>(body: any, schema: z.ZodType<T>){
  const parsed = schema.safeParse(body)
  if (!parsed.success) return { error: formatZod(parsed.error) as string, data: null as any }
  return { error: null as any, data: parsed.data }
}
export function requireSession(req: Request){
  const raw = (req.headers.get('cookie')||'').match(/cc3_session=([^;]+)/)?.[1]
  const id = raw ? verifySessionCookie(decodeURIComponent(raw)) : null
  if (!id) return null
  return getUsers().find(u=>u.id===id) || null
}
export function enforceRate(req: Request, key: string, limit=20){
  const ip = clientIp(req)
  const r = rateLimit(`${key}:${ip}`, limit)
  if (!r.ok) return Response.json({ ok:false, error: `Too many requests. Retry in ${r.retryAfter}s` }, { status: 429, headers: { 'Retry-After': String(r.retryAfter) }})
  return null
}
export async function logAudit(req: Request, action: string, entity?: string, entityId?: string, meta?: any){
  try{
    const g: any = globalThis as any
    g.__cc3 = g.__cc3 || {}
    g.__cc3.auditLog = g.__cc3.auditLog || []
    const user = requireSession(req)
    g.__cc3.auditLog.push({ id: Math.random().toString(36).slice(2,9), userId: user?.id, action, entity, entityId, meta, ip: clientIp(req), createdAt: new Date().toISOString() })
    // also persist if using file store
    try { require('./persist').scheduleFlush('auditLog') } catch {}
  } catch {}
}
