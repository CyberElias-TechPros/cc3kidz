import { store, uid } from '@/lib/store'
import { eventRegSchema } from '@/lib/validation'
import { jsonError, jsonOk, parseJson, enforceRate, enforceCsrf, logAudit } from '@/lib/api-helpers'
import { requireRole } from '@/lib/rbac'
import { createEventReg } from '@/lib/dal'

export async function POST(req: Request) {
  const csrf=enforceCsrf(req); if(csrf) return csrf
  const rl=enforceRate(req,'event-reg'); if(rl) return rl
  const b=await req.json().catch(()=>null)
  const {error,data}=parseJson(b, eventRegSchema)
  if(error) return jsonError(error,400)
  const { default: events } = await import('@/data/events.json')
  const ev = (events as any[]).find(e => e.slug === data.eventSlug)
  if (!ev) return jsonError('Event not found', 404)
  if (typeof ev.capacity === 'number') {
    const existing = (store.eventRegs as any[]).filter(x => x.eventSlug === data.eventSlug).reduce((s,v)=> s+ (Number(v.attendees)||1), 0)
    if (existing + Number(data.attendees||1) > ev.capacity) return jsonError(`Event full — capacity ${ev.capacity} reached`, 409)
  }
  const dup = (store.eventRegs as any[]).find(x => x.eventSlug===data.eventSlug && x.phone === data.phone && Date.now() - new Date(x.createdAt).getTime() < 24*60*60*1000)
  if (dup) return jsonError('You already registered for this event (duplicate within 24h)', 409)
  const r:any= await createEventReg({ id: uid(), eventSlug: data.eventSlug, name: data.name, phone: data.phone, email: data.email, attendees: Number(data.attendees||1), member: data.member||'visitor', createdAt: new Date().toISOString(), ticket: `CC3-${uid().toUpperCase()}`, status:'confirmed' })
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
