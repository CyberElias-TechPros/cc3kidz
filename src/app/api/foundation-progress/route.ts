import { store, uid } from '@/lib/store'
import { getUsers } from '@/lib/auth'
import { verifySessionCookie } from '@/lib/session'
import { jsonError, jsonOk, enforceRate } from '@/lib/api-helpers'

function sessionFromReq(req: Request){
  const cookie = req.headers.get('cookie') || ''
  const m = cookie.match(/cc3_session=([^;]+)/)
  const raw = m?.[1] ? decodeURIComponent(m[1]) : null
  const sid = raw ? verifySessionCookie(raw) : null
  return sid ? getUsers().find(u=>u.id===sid) : null
}

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  const all = searchParams.get('all')
  const user = sessionFromReq(req)
  if (!user) return jsonError('Unauthorized',401)
  if (all) {
    if (!['admin','superadmin'].includes(user.role)) return jsonError('Forbidden',403)
    return Response.json({ progress: store.foundationProgress })
  }
  if (userId && userId !== user.id && !['admin','superadmin'].includes(user.role)) return jsonError('Forbidden — cannot view other users progress',403)
  const effectiveUserId = userId || user.id
  const list = store.foundationProgress.filter(p=>p.userId===effectiveUserId)
  return Response.json({ progress: list, count: list.length })
}

export async function POST(req: Request){
  const csrf=require('@/lib/api-helpers').enforceCsrf(req); if(csrf) return csrf
  const rl=enforceRate(req,'foundation-progress'); if(rl) return rl
  const user = sessionFromReq(req)
  if (!user) return jsonError('Unauthorized',401)
  const b = await req.json().catch(()=>null)
  const parsed = require('@/lib/validation').foundationProgressSchema.safeParse(b)
  if (!parsed.success) return jsonError(parsed.error.issues.map((i:any)=>i.message).join('; '),400)
  const { moduleSlug, completed, score } = parsed.data as any
  let existing = store.foundationProgress.find(p=>p.userId===user.id && p.moduleSlug===moduleSlug)
  if (existing) {
    existing.completed = !!completed
    if (typeof score === 'number') existing.score = score
    existing.updatedAt = new Date().toISOString()
    try{ require('@/lib/persist').scheduleFlush('foundationProgress') }catch{}
    // Prisma mirror best-effort
    try{
      const { getPrisma } = await import('@/lib/prisma')
      const prisma = getPrisma()
      if (prisma) prisma.foundationProgress.upsert({ where:{ userId_moduleSlug:{ userId:user.id, moduleSlug } } as any, update:{ completed: !!completed, score }, create:{ userId:user.id, moduleSlug, completed: !!completed, score } }).catch(()=>{})
    }catch{}
    return jsonOk({ progress: existing })
  } else {
    const rec = { id: uid(), userId: user.id, moduleSlug, completed: !!completed, score, updatedAt: new Date().toISOString() }
    store.foundationProgress.push(rec)
    try{ require('@/lib/persist').scheduleFlush('foundationProgress') }catch{}
    try{
      const { getPrisma } = await import('@/lib/prisma')
      const prisma = getPrisma()
      if (prisma) prisma.foundationProgress.create({ data:{ userId:user.id, moduleSlug, completed: !!completed, score } as any }).catch(()=>{})
    }catch{}
    return jsonOk({ progress: rec })
  }
}
