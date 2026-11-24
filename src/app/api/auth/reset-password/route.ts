import { jsonError, jsonOk, enforceRate } from '@/lib/api-helpers'
import { getUsers } from '@/lib/auth'
import bcrypt from 'bcryptjs'

const g:any = globalThis as any
g.__cc3 = g.__cc3 || {}
g.__cc3.resetTokens = g.__cc3.resetTokens || {}

export async function POST(req: Request){
  const rl = enforceRate(req,'reset',10); if (rl) return rl
  const { token, password } = await req.json().catch(()=>({}))
  if (!token || !password) return jsonError('token and password required',400)
  if (String(password).length < 6) return jsonError('Password must be at least 6 characters',400)
  const rec = g.__cc3.resetTokens[token]
  if (!rec) return jsonError('Invalid or expired token',400)
  if (new Date(rec.expires) < new Date()) return jsonError('Token expired',400)
  const user = getUsers().find((u:any)=> u.email.toLowerCase()=== rec.email.toLowerCase())
  if (!user) return jsonError('User not found',404)
  user.password = bcrypt.hashSync(password, 10)
  delete g.__cc3.resetTokens[token]
  try{ require('@/lib/persist').scheduleFlush('users')}catch{}
  try{
    const { getPrisma } = await import('@/lib/prisma')
    const prisma = getPrisma()
    if (prisma){
      const pu = await prisma.user.findUnique({where:{email:user.email}})
      if (pu) await prisma.user.update({where:{id:pu.id}, data:{ passwordHash: user.password }})
    }
  }catch{}
  return jsonOk({ message:'Password reset — you can now sign in' })
}
