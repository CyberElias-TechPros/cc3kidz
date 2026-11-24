import { store, uid } from '@/lib/store'
import { testimonySchema } from '@/lib/validation'
import { jsonError, jsonOk, parseJson, enforceRate, logAudit } from '@/lib/api-helpers'
import { requireRole } from '@/lib/rbac'

export async function POST(req: Request) {
  const rl = enforceRate(req, 'testimony', 20); if (rl) return rl
  const b = await req.json().catch(()=>null)
  const { error, data } = parseJson(b, testimonySchema)
  if (error) return jsonError(error, 400)
  const t: any = { id: uid(), name: data.name, title: data.title, category: data.category||'Other', body: data.body, consent: !!data.consent, status: 'pending' as const, createdAt: new Date().toISOString() }
  store.testimonies.push(t)
  try { require('@/lib/persist').scheduleFlush('testimonies') } catch {}
  await logAudit(req, 'testimony.create', 'Testimony', t.id)
  return jsonOk({ id: t.id, status: t.status })
}
export async function GET(req: Request) {
  const url = new URL(req.url)
  const scope = url.searchParams.get('scope') // admin=full, public=published only
  if (scope==='admin'){
    const { error: e } = requireRole(req as any, ['admin','superadmin'])
    if (e) return e
    return Response.json({ testimonies: store.testimonies.slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt)), pending: store.testimonies.filter(t => (t as any).status === 'pending').length })
  }
  // public: only published/approved
  const pub = store.testimonies.filter(t=> ['approved','published'].includes((t as any).status))
  return Response.json({ testimonies: pub.slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt)), count: pub.length })
}
export async function PATCH(req: Request){
  const { error: e } = requireRole(req as any, ['admin','superadmin'])
  if (e) return e
  const b= await req.json().catch(()=>null)
  const t= store.testimonies.find((x:any)=>x.id===b.id) as any
  if(!t) return jsonError('Not found',404)
  const allowed=['pending','approved','published','rejected']
  if (b.status && !allowed.includes(b.status)) return jsonError('Invalid status',400)
  if (b.status) t.status=b.status
  try{require('@/lib/persist').scheduleFlush('testimonies')}catch{}
  await logAudit(req,'testimony.moderate','Testimony',t.id, { status:b.status })
  return jsonOk({ testimony:t })
}
