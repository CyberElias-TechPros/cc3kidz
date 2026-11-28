import { jsonError, jsonOk, enforceRate, enforceCsrf } from '@/lib/api-helpers'
import { findUserByEmail } from '@/lib/auth'

const g: any = globalThis as any
g.__cc3 = g.__cc3 || {}
g.__cc3.resetTokens = g.__cc3.resetTokens || {} as Record<string, { email:string, expires:string }>

export async function POST(req: Request){
  const csrf=enforceCsrf(req); if(csrf) return csrf
  const rl = enforceRate(req,'forgotPassword'); if (rl) return rl
  const { email } = await req.json().catch(()=>({}))
  if (!email) return jsonError('Email required',400)
  const user = findUserByEmail(email)
  if (user){
    const { randomBytes } = await import('node:crypto')
    const token = randomBytes(32).toString('hex')
    g.__cc3.resetTokens[token]={ email: user.email, expires: new Date(Date.now()+60*60*1000).toISOString() }
    const origin = req.headers.get('origin') || process.env.APP_URL || 'https://cc3.example.com'
    console.log(`[CC3] Password reset for ${user.email}: token=${token}`)
    try{
      const { sendEmail, resetPasswordEmail } = await import('@/lib/email')
      const tpl = resetPasswordEmail(user.email, token, origin)
      await sendEmail({ to: user.email, ...tpl })
    }catch(e:any){ console.warn('[forgot-password] email send failed', e?.message) }
    // In production without DB, tokens are in-memory and lost on cold start — log warning
    if (!process.env.DATABASE_URL && process.env.NODE_ENV==='production') console.warn('[forgot-password] DATABASE_URL not set — reset tokens in-memory only')
  }
  return jsonOk({ message: 'If that email exists, a reset link has been sent. Check your email or contact church office.' })
}

export async function GET(req: Request){
  // for demo: list tokens only for admin debug (not exposed normally)
  return jsonOk({ note: 'POST {email} to request reset; POST to /api/auth/reset-password {token,password} to confirm' })
}
