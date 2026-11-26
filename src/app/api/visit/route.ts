import { store } from '@/lib/store'
import { visitSchema } from '@/lib/validation'
import { jsonError, jsonOk, parseJson, enforceRate, enforceCsrf, logAudit } from '@/lib/api-helpers'
import { requireRole } from '@/lib/rbac'
import { createVisit, notifyUsers } from '@/lib/dal'

export async function POST(req: Request) {
  const csrf = enforceCsrf(req); if (csrf) return csrf
  const rl = enforceRate(req, 'visit'); if (rl) return rl
  const b = await req.json().catch(()=>null)
  const { error, data } = parseJson(b, visitSchema)
  if (error) return jsonError(error, 400)
  const v: any = await createVisit({ name: data.name, phone: data.phone, email: data.email, date: data.date, visitors: Number(data.visitors||1), firstTime: data.firstTime, children: !!data.children, note: data.note, status:'new', createdAt: new Date().toISOString() })
  await logAudit(req, 'visit.create', 'Visit', v.id, { name: v.name })
  try{
    const {getUsers}=await import('@/lib/auth')
    const ids = getUsers().filter((x:any)=>['admin','superadmin'].includes(x.role)).map((u:any)=>u.id)
    await notifyUsers(ids, { title:`New visitor: ${v.name}`, body:`${v.phone} — ${v.date} — ${v.firstTime||''}`, href:'/admin/people' })
  }catch{}
  return jsonOk({ id: v.id })
}
export async function GET(req: Request) {
  const { error: e } = requireRole(req as any, ['leader','admin','superadmin'])
  if (e) return e
  const url = new URL(req.url)
  const q = url.searchParams.get('q')?.toLowerCase()
  let list = store.visits.slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt))
  if (q) list = list.filter((v:any)=> `${v.name} ${v.phone} ${v.email}`.toLowerCase().includes(q))
  return Response.json({ visits: list, count: list.length })
}
export async function PATCH(req: Request){
  const { error: e } = requireRole(req as any, ['admin','superadmin'])
  if (e) return e
  const b= await req.json().catch(()=>null)
  const t= (store.visits as any[]).find(x=>x.id===b.id)
  if(!t) return jsonError('Not found',404)
  if (b.status) t.status=b.status // new|contacted|connected|assigned-cell|foundation|archived
  if (b.note) t.adminNote=b.note
  try{require('@/lib/persist').scheduleFlush('visits')}catch{}
  await logAudit(req,'visit.update','Visit',t.id, { status:b.status })
  return jsonOk({ visit:t })
}
