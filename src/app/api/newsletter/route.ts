import { store, uid } from '@/lib/store'
import { newsletterSchema } from '@/lib/validation'
import { jsonError, jsonOk, parseJson, enforceRate } from '@/lib/api-helpers'
import { requireRole } from '@/lib/rbac'
export async function POST(req: Request){
  const rl=enforceRate(req,'newsletter',20); if(rl) return rl
  let email=''
  const ct=req.headers.get('content-type')||''
  let raw: any = {}
  if(ct.includes('application/json')){ raw=await req.json().catch(()=>({})); email=raw.email||'' }
  else { const fd=await req.formData().catch(()=>null); if(fd) email=(fd.get('email') as string)||''; raw={email} }
  const {error,data}=parseJson(raw, newsletterSchema)
  if(error) return jsonError(error,400)
  email=data.email.trim().toLowerCase()
  const exists=store.newsletters.find(n=>n.email.toLowerCase()===email)
  if(!exists) { store.newsletters.push({id:uid(),email,createdAt:new Date().toISOString()} as any); try{require('@/lib/persist').scheduleFlush('newsletters')}catch{} }
  return jsonOk({ message:'Subscribed — welcome to CE Central Church 3 family!' })
}
export async function GET(req: Request){
  const { error: e } = requireRole(req as any, ['admin','superadmin'])
  if (e) return jsonError('Forbidden — admin only',403)
  return Response.json({subscribers:store.newsletters.slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt)), count: store.newsletters.length})
}
