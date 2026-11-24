import { store, uid } from '@/lib/store'
import { volunteerSchema } from '@/lib/validation'
import { jsonError, jsonOk, parseJson, enforceRate, logAudit } from '@/lib/api-helpers'
import { requireRole } from '@/lib/rbac'

export async function POST(req: Request) {
  const rl = enforceRate(req, 'volunteer', 30); if (rl) return rl
  const b = await req.json().catch(()=>null)
  const { error, data } = parseJson(b, volunteerSchema)
  if (error) return jsonError(error, 400)
  const v: any = { id: uid(), name: data.name, phone: data.phone, email: data.email, memberStatus: data.memberStatus||'Member', department: data.department, skills: data.skills||[], availability: data.availability||'', note: data.note, status:'pending', createdAt: new Date().toISOString() }
  store.volunteers.push(v)
  try { require('@/lib/persist').scheduleFlush('volunteers') } catch {}
  await logAudit(req, 'volunteer.create', 'Volunteer', v.id, { dept: v.department })
  return jsonOk({ id: v.id })
}
export async function GET(req: Request) {
  const { error: e } = requireRole(req as any, ['leader','admin','superadmin'])
  if (e) return jsonError('Forbidden',403)
  return Response.json({ volunteers: store.volunteers.slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt)), count: store.volunteers.length })
}
export async function PATCH(req: Request){
  const { error: e } = requireRole(req as any, ['admin','superadmin'])
  if(e) return e
  const b= await req.json().catch(()=>null)
  const t= store.volunteers.find((x:any)=>x.id===b.id)
  if(!t) return jsonError('Not found',404)
  const allowed=['pending','contacted','approved','active','rejected']
  if (b.status && !allowed.includes(b.status)) return jsonError('Invalid status',400)
  if (b.status) (t as any).status=b.status
  try{require('@/lib/persist').scheduleFlush('volunteers')}catch{}
  await logAudit(req,'volunteer.update','Volunteer',t.id, { status:b.status })
  return jsonOk({ volunteer:t })
}
