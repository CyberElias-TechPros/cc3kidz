import { verifyUser, safeUser } from '@/lib/auth'
import { authLoginSchema } from '@/lib/validation'
import { jsonError, parseJson, enforceRate } from '@/lib/api-helpers'
import { sessionCookieHeader } from '@/lib/session'

export async function POST(req: Request) {
  const rl = enforceRate(req, 'login', 20); if (rl) return rl
  const body = await req.json().catch(()=>null)
  const { error, data } = parseJson(body, authLoginSchema)
  if (error) return jsonError(error, 400)
  const u = await verifyUser(data.email, data.password)
  if (!u) return jsonError('Invalid credentials', 401)
  const res = Response.json({ ok: true, user: safeUser(u) })
  res.headers.set('Set-Cookie', sessionCookieHeader(u.id))
  return res
}
