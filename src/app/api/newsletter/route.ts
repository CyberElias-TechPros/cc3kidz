import { store } from '@/lib/store'
import { newsletterSchema } from '@/lib/validation'
import { jsonError, jsonOk, parseJson, enforceRate, enforceCsrf } from '@/lib/api-helpers'
import { requireRole } from '@/lib/rbac'
import { createNewsletter } from '@/lib/dal'
export async function POST(req: Request){
  const csrf=enforceCsrf(req); if(csrf) return csrf
  const rl=enforceRate(req,'newsletter'); if(rl) return rl
  let email=''
  const ct=req.headers.get('content-type')||''
  let raw: any = {}
  if(ct.includes('application/json')){ raw=await req.json().catch(()=>({})); email=raw.email||'' }
  else { const fd=await req.formData().catch(()=>null); if(fd) email=(fd.get('email') as string)||''; raw={email} }
  const {error,data}=parseJson(raw, newsletterSchema)
  if(error) return jsonError(error,400)
  email=data.email.trim().toLowerCase()
  const exists=store.newsletters.find(n=>n.email.toLowerCase()===email)
  if(!exists) await createNewsletter(email)
  return jsonOk({ message:'Subscribed — welcome to CE Central Church 3 family!' })
}
export async function GET(req: Request){
  const { error: e } = requireRole(req as any, ['admin','superadmin'])
  if (e) return jsonError('Forbidden — admin only',403)
  return Response.json({subscribers:store.newsletters.slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt)), count: store.newsletters.length})
}
