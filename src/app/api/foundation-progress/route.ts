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
  if (all && user && (user.role==='admin' || user.role==='superadmin')) return Response.json({ progress: store.foundationProgress })
  const effectiveUserId = userId || user?.id
  if (!effectiveUserId) return Response.json({ progress: [] })
  const list = store.foundationProgress.filter(p=>p.userId===effectiveUserId)
  return Response.json({ progress: list, count: list.length })
}

export async function POST(req: Request){
  const rl=enforceRate(req,'foundation-progress',60); if(rl) return rl
  const user = sessionFromReq(req)
  if (!user) return jsonError('Unauthorized',401)
  const b = await req.json().catch(()=>null)
  if (!b?.moduleSlug) return jsonError('moduleSlug required',400)
  let existing = store.foundationProgress.find(p=>p.userId===user.id && p.moduleSlug===b.moduleSlug)
  if (existing) {
    existing.completed = !!b.completed
    if (typeof b.score === 'number') existing.score = b.score
    existing.updatedAt = new Date().toISOString()
    try{ require('@/lib/persist').scheduleFlush('foundationProgress') }catch{}
    return jsonOk({ progress: existing })
  } else {
    const rec = { id: uid(), userId: user.id, moduleSlug: b.moduleSlug, completed: !!b.completed, score: b.score, updatedAt: new Date().toISOString() }
    store.foundationProgress.push(rec)
    try{ require('@/lib/persist').scheduleFlush('foundationProgress') }catch{}
    return jsonOk({ progress: rec })
  }
}
