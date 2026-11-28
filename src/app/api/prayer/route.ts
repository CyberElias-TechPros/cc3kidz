import { store } from '@/lib/store'
import { prayerSchema } from '@/lib/validation'
import { jsonError, jsonOk, parseJson, enforceRate, enforceCsrf, logAudit } from '@/lib/api-helpers'
import { requireRole } from '@/lib/rbac'
import { createPrayer, notifyUsers } from '@/lib/dal'

export async function POST(req: Request) {
  const csrf = enforceCsrf(req); if (csrf) return csrf
  const rl = enforceRate(req, 'prayer'); if (rl) return rl
  const b = await req.json().catch(()=>null)
  const { error, data } = parseJson(b, prayerSchema)
  if (error) return jsonError(error, 400)
  const r: any = await createPrayer({ name: data.name, contact: data.contact, category: data.category||'Personal', body: data.body, confidential: !!data.confidential, followUp: !!data.followUp, status: 'open', createdAt: new Date().toISOString() })
  await logAudit(req, 'prayer.create', 'Prayer', r.id)
  try {
    const { getUsers } = await import('@/lib/auth')
    const ids = getUsers().filter((x:any)=>['admin','superadmin','leader'].includes(x.role)).map((u:any)=>u.id)
    await notifyUsers(ids, { title: `New prayer: ${r.category}`, body: `${r.name||'Anonymous'} — ${r.body.slice(0,80)}`, href: '/admin/prayer' })
  } catch {}
  return jsonOk({ id: r.id })
}
export async function GET(req: Request) {
  const { error: e, user } = requireRole(req as any, ['leader','admin','superadmin'])
  if (e) return Response.json({ count: store.prayers.length })
  return Response.json({ count: store.prayers.length, prayers: store.prayers.slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt)) })
}
export async function PATCH(req: Request){
  const { error: e, user } = requireRole(req as any, ['leader','admin','superadmin'])
  if (e) return e
  const b = await req.json().catch(()=>null)
  const t = store.prayers.find((x:any)=>x.id===b.id)
  if (!t) return jsonError('Not found',404)
  if (b.status) (t as any).status = b.status // open|assigned|closed
  if (b.assignedTo) (t as any).assignedTo = b.assignedTo
  try{ require('@/lib/persist').scheduleFlush('prayers')}catch{}
  await logAudit(req,'prayer.update','Prayer',t.id, { status: b.status })
  return jsonOk({ prayer: t })
}
