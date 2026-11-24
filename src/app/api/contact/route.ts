import { store, uid } from '@/lib/store'
import { contactSchema } from '@/lib/validation'
import { jsonError, jsonOk, parseJson, enforceRate, logAudit } from '@/lib/api-helpers'
import { requireRole } from '@/lib/rbac'
export async function POST(req: Request){
  const rl=enforceRate(req,'contact',30); if(rl) return rl
  const b=await req.json().catch(()=>null)
  const {error,data}=parseJson(b,contactSchema)
  if(error) return jsonError(error,400)
  const r: any={id:uid(),name:data.name,phone:data.phone,email:data.email,category:data.category||'General enquiries',message:data.message,method:data.method||'Phone',createdAt:new Date().toISOString(), status:'open'}
  store.contacts.push(r)
  try{require('@/lib/persist').scheduleFlush('contacts')}catch{}
  await logAudit(req,'contact.create','Contact',r.id)
  try{ const {getUsers}=await import('@/lib/auth'); for(const u of getUsers().filter((x:any)=>['admin','superadmin'].includes(x.role))){ store.notifications.push({ id: uid(), userId:u.id, title:`New contact: ${r.category}`, body:`${r.name} — ${r.message.slice(0,80)}`, href:'/admin/communications', read:false, createdAt:new Date().toISOString()}); } require('@/lib/persist').scheduleFlush('notifications')}catch{}
  return jsonOk({ id: r.id })
}
export async function GET(req: Request){
  const { error: e } = requireRole(req as any, ['admin','superadmin'])
  if (e) return jsonError('Forbidden — admin only',403)
  return Response.json({contacts:store.contacts.slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt)), count: store.contacts.length})
}
export async function PATCH(req: Request){
  const { error: e } = requireRole(req as any, ['admin','superadmin'])
  if (e) return e
  const b= await req.json().catch(()=>null)
  const t= store.contacts.find((x:any)=>x.id===b.id)
  if(!t) return jsonError('Not found',404)
  if (b.status) (t as any).status=b.status
  try{require('@/lib/persist').scheduleFlush('contacts')}catch{}
  await logAudit(req,'contact.update','Contact',t.id, { status:b.status })
  return jsonOk({ contact:t })
}
