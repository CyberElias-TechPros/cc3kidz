import { jsonError, jsonOk, enforceRate } from '@/lib/api-helpers'
import { findUserByEmail } from '@/lib/auth'
import { uid } from '@/lib/store'

// In-memory reset tokens (file-json fallback; in prod use DB + email)
const g: any = globalThis as any
g.__cc3 = g.__cc3 || {}
g.__cc3.resetTokens = g.__cc3.resetTokens || {} as Record<string, { email:string, expires:string }>

export async function POST(req: Request){
  const rl = enforceRate(req,'forgot',10); if (rl) return rl
  const { email } = await req.json().catch(()=>({}))
  if (!email) return jsonError('Email required',400)
  const user = findUserByEmail(email)
  // always return ok to prevent enumeration, but only create token if user exists
  if (user){
    const token = uid()+uid()
    g.__cc3.resetTokens[token]={ email: user.email, expires: new Date(Date.now()+60*60*1000).toISOString() }
    // log token for demo (in prod send via RESEND_API_KEY)
    console.log(`[CC3] Password reset for ${user.email}: token=${token} — use POST /api/auth/reset-password {token, password}`)
    try{
      if (process.env.RESEND_API_KEY){
        // placeholder: would call Resend here
        console.log(`[CC3] Would email reset link via Resend to ${user.email}`)
      }
    }catch{}
  }
  return jsonOk({ message: 'If that email exists, a reset link has been sent. Check your email or contact church office.' })
}

export async function GET(req: Request){
  // for demo: list tokens only for admin debug (not exposed normally)
  return jsonOk({ note: 'POST {email} to request reset; POST to /api/auth/reset-password {token,password} to confirm' })
}
