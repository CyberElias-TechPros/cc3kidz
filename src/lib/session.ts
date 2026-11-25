import { cookies } from 'next/headers'
import { env } from './env'
import { createHmac, timingSafeEqual } from 'node:crypto'

const COOKIE = 'cc3_session'

export async function getSessionId(): Promise<string | null> {
  const c = (await cookies()).get(COOKIE)?.value
  return c || null
}

function hmac(userId: string){
  return createHmac('sha256', env.SESSION_SECRET).update(userId).digest('hex').slice(0, 32)
}

function safeEqual(a: string, b: string){
  try {
    const ba = Buffer.from(a)
    const bb = Buffer.from(b)
    if (ba.length !== bb.length) return false
    return timingSafeEqual(ba, bb)
  } catch { return a === b }
}

export function signUserId(userId: string){
  const sig = hmac(userId)
  return `${userId}.${sig}`
}
export function verifySessionCookie(raw: string): string | null {
  if (!raw) return null
  const dot = raw.lastIndexOf('.')
  if (dot === -1) {
    // legacy plain userId — allow only in dev, reject in prod
    if (process.env.NODE_ENV === 'production') return null
    return raw
  }
  const id = raw.slice(0, dot)
  const sig = raw.slice(dot + 1)
  const expected = hmac(id)
  if (!safeEqual(sig, expected)) return null
  return id
}
export function sessionCookieHeader(userId: string, opts?: { maxAge?: number }){
  const signed = signUserId(userId)
  const maxAge = opts?.maxAge ?? 60*60*24*30
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${COOKIE}=${signed}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`
}
export function clearSessionCookieHeader(){
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`
}
export { COOKIE }
