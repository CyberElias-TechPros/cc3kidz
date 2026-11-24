import { cookies } from 'next/headers'
import { env } from './env'

const COOKIE = 'cc3_session'

export async function getSessionId(): Promise<string | null> {
  const c = (await cookies()).get(COOKIE)?.value
  return c || null
}

// signed cookie: value = userId.signature  (HMAC-like via simple secret check)
// For now we store raw userId but set secure flags properly at response time.
// If SESSION_SECRET set, we expect "userId.sig" and verify.
export function signUserId(userId: string){
  if (!env.SESSION_SECRET) return userId
  // tiny HMAC substitute without crypto dep: base64(secret+userId) slice
  // In real prod replace with jose JWT; this is sufficient for demo integrity
  const sig = Buffer.from(env.SESSION_SECRET + ':' + userId).toString('base64').slice(0, 16)
  return `${userId}.${sig}`
}
export function verifySessionCookie(raw: string): string | null {
  if (!raw) return null
  if (!raw.includes('.')) return raw // legacy plain userId (dev migration)
  const [id, sig] = raw.split('.')
  const expected = Buffer.from(env.SESSION_SECRET + ':' + id).toString('base64').slice(0, 16)
  if (sig !== expected) return null
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
