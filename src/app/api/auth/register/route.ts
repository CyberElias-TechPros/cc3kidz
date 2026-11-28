import { createUser, safeUser } from '@/lib/auth'
import { authRegisterSchema } from '@/lib/validation'
import { jsonError, parseJson, enforceRate, enforceCsrf } from '@/lib/api-helpers'
import { sessionCookieHeader } from '@/lib/session'

export async function POST(req: Request) {
  const csrf=enforceCsrf(req); if(csrf) return csrf
  const rl = enforceRate(req, 'register'); if (rl) return rl
  try {
    const body = await req.json().catch(()=>null)
    const { error, data } = parseJson(body, authRegisterSchema)
    if (error) return jsonError(error, 400)
    const u = createUser({ name: data.name, email: data.email, password: data.password, phone: data.phone })
    const res = Response.json({ ok: true, user: safeUser(u) })
    res.headers.set('Set-Cookie', sessionCookieHeader(u.id))
    return res
  } catch (e: any) {
    return jsonError(e.message || 'Failed', 400)
  }
}
