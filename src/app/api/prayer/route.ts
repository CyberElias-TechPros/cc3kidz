import { store, uid } from '@/lib/store'
import { prayerSchema } from '@/lib/validation'
import { jsonError, jsonOk, parseJson, enforceRate, logAudit } from '@/lib/api-helpers'
import { requireRole } from '@/lib/rbac'

export async function POST(req: Request) {
  const rl = enforceRate(req, 'prayer', 20); if (rl) return rl
  const b = await req.json().catch(()=>null)
  const { error, data } = parseJson(b, prayerSchema)
  if (error) return jsonError(error, 400)
  const r: any = { id: uid(), name: data.name, contact: data.contact, category: data.category||'Personal', body: data.body, confidential: !!data.confidential, followUp: !!data.followUp, status: 'open', createdAt: new Date().toISOString() }
  store.prayers.push(r)
  try { require('@/lib/persist').scheduleFlush('prayers') } catch {}
  await logAudit(req, 'prayer.create', 'Prayer', r.id)
  // notify pastoral team (broadcast to admins/leaders via notifications)
  try {
    const { getUsers } = await import('@/lib/auth')
    for (const u of getUsers().filter((x:any)=>['admin','superadmin','leader'].includes(x.role))){
      store.notifications.push({ id: uid(), userId: u.id, title: `New prayer: ${r.category}`, body: `${r.name||'Anonymous'} — ${r.body.slice(0,80)}`, href: '/admin/prayer', read: false, createdAt: new Date().toISOString() })
    }
    require('@/lib/persist').scheduleFlush('notifications')
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
