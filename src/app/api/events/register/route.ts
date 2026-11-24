import { store, uid } from '@/lib/store'
import { eventRegSchema } from '@/lib/validation'
import { jsonError, jsonOk, parseJson, enforceRate, logAudit } from '@/lib/api-helpers'
import { requireRole } from '@/lib/rbac'

export async function POST(req: Request) {
  const rl=enforceRate(req,'event-reg',30); if(rl) return rl
  const b=await req.json().catch(()=>null)
  const {error,data}=parseJson(b, eventRegSchema)
  if(error) return jsonError(error,400)
  // dedupe: same phone+slug within 24h?
  const r:any={ id: uid(), eventSlug: data.eventSlug, name: data.name, phone: data.phone, email: data.email, attendees: Number(data.attendees||1), member: data.member||'visitor', createdAt: new Date().toISOString(), ticket: `CC3-${uid().toUpperCase()}`, status:'confirmed' }
  store.eventRegs.push(r)
  try{require('@/lib/persist').scheduleFlush('eventRegs')}catch{}
  await logAudit(req,'event.register','EventReg',r.id,{ slug: r.eventSlug })
  return jsonOk({ id: r.id, ticket: r.ticket })
}
export async function GET(req: Request) {
  const url = new URL(req.url)
  const mine = url.searchParams.get('mine')
  if (mine){
    const { userFromRequest } = await import('@/lib/rbac')
    const u = userFromRequest(req as any)
    if (!u) return jsonError('Unauthorized',401)
    const list = store.eventRegs.filter((r:any)=> r.email && u.email && r.email.toLowerCase()===u.email.toLowerCase())
    return Response.json({ registrations: list })
  }
  const { error: e } = requireRole(req as any, ['leader','admin','superadmin'])
  if (e) return e
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')
  const regs = slug ? store.eventRegs.filter(r => (r as any).eventSlug === slug) : store.eventRegs
  return Response.json({ registrations: regs.slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt)), count: regs.length })
}
export async function PATCH(req: Request){
  const { error: e } = requireRole(req as any, ['admin','superadmin'])
  if(e) return e
  const b= await req.json().catch(()=>null)
  const t= (store.eventRegs as any[]).find(x=>x.id===b.id)
  if(!t) return jsonError('Not found',404)
  if (b.status) t.status=b.status
  try{require('@/lib/persist').scheduleFlush('eventRegs')}catch{}
  return jsonOk({ registration:t })
}
