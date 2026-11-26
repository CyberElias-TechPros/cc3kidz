import { store } from '@/lib/store'
import { contactSchema } from '@/lib/validation'
import { jsonError, jsonOk, parseJson, enforceRate, enforceCsrf, logAudit } from '@/lib/api-helpers'
import { requireRole } from '@/lib/rbac'
import { createContact, notifyUsers } from '@/lib/dal'
export async function POST(req: Request){
  const csrf=enforceCsrf(req); if(csrf) return csrf
  const rl=enforceRate(req,'contact'); if(rl) return rl
  const b=await req.json().catch(()=>null)
  const {error,data}=parseJson(b,contactSchema)
  if(error) return jsonError(error,400)
  const r: any= await createContact({name:data.name,phone:data.phone,email:data.email,category:data.category||'General enquiries',message:data.message,method:data.method||'Phone',createdAt:new Date().toISOString(), status:'open'})
  await logAudit(req,'contact.create','Contact',r.id)
  try{
    const {getUsers}=await import('@/lib/auth')
    const ids = getUsers().filter((x:any)=>['admin','superadmin'].includes(x.role)).map((u:any)=>u.id)
    await notifyUsers(ids, { title:`New contact: ${r.category}`, body:`${r.name} — ${r.message.slice(0,80)}`, href:'/admin/communications' })
  }catch{}
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
