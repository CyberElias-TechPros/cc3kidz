import { store, uid } from '@/lib/store'
import { foundationSchema } from '@/lib/validation'
import { jsonError, jsonOk, parseJson, enforceRate, logAudit } from '@/lib/api-helpers'
import { requireRole } from '@/lib/rbac'
export async function POST(req: Request){
  const rl=enforceRate(req,'foundation',20); if(rl) return rl
  const b=await req.json().catch(()=>null)
  const {error,data}=parseJson(b, foundationSchema)
  if(error) return jsonError(error,400)
  const r:any={id:uid(),name:data.name,phone:data.phone,pref:data.pref||'Weekday Evening',availability:data.availability||'',createdAt:new Date().toISOString(), status:'pending'}
  store.foundationRegs.push(r)
  try{require('@/lib/persist').scheduleFlush('foundationRegs')}catch{}
  await logAudit(req,'foundation.create','FoundationReg',r.id)
  return jsonOk({ id: r.id })
}
export async function GET(req: Request){
  const url = new URL(req.url)
  const scope = url.searchParams.get('scope') // admin
  if (scope==='admin'){
    const { error: e } = requireRole(req as any, ['admin','superadmin'])
    if (e) return e
  } else {
    // public only count
    return Response.json({ count: store.foundationRegs.length })
  }
  return Response.json({registrations:store.foundationRegs.slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt)), count: store.foundationRegs.length})
}
export async function PATCH(req: Request){
  const { error: e } = requireRole(req as any, ['admin','superadmin'])
  if(e) return e
  const b= await req.json().catch(()=>null)
  const t= (store.foundationRegs as any[]).find(x=>x.id===b.id)
  if(!t) return jsonError('Not found',404)
  if(b.status) t.status=b.status
  try{require('@/lib/persist').scheduleFlush('foundationRegs')}catch{}
  return jsonOk({ registration:t })
}
