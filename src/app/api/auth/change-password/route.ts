import { jsonError, jsonOk, enforceRate } from '@/lib/api-helpers'
import { requireUser } from '@/lib/rbac'
import bcrypt from 'bcryptjs'
import { getUsers } from '@/lib/auth'
import { z } from 'zod'

const schema = z.object({ current: z.string().min(1), next: z.string().min(6).max(72) })

export async function POST(req: Request){
  const rl = enforceRate(req,'change-password',10); if(rl) return rl
  const { error: e, user } = requireUser(req as any)
  if (e) return e
  const b = await req.json().catch(()=>null)
  const parsed = schema.safeParse(b)
  if (!parsed.success) return jsonError(parsed.error.issues.map(i=>i.message).join('; '),400)
  const { current, next } = parsed.data
  // verify current
  const stored = user.password
  const ok = stored.startsWith('$2') ? bcrypt.compareSync(current, stored) : stored===current
  if (!ok) return jsonError('Current password incorrect',400)
  user.password = bcrypt.hashSync(next, 10)
  try{ require('@/lib/persist').scheduleFlush('users')}catch{}
  // also update prisma if present
  try{
    const { getPrisma } = await import('@/lib/prisma')
    const prisma = getPrisma()
    if (prisma){
      const pu = await prisma.user.findUnique({where:{email:user.email}})
      if (pu) await prisma.user.update({where:{id:pu.id}, data:{ passwordHash: user.password }})
    }
  }catch{}
  return jsonOk({ message:'Password updated' })
}
