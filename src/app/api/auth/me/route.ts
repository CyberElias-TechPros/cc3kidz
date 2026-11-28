import { getUsers, safeUser } from '@/lib/auth'
import { verifySessionCookie } from '@/lib/session'
import { cookies } from 'next/headers'

export async function GET() {
  const raw = (await cookies()).get('cc3_session')?.value
  const id = raw ? verifySessionCookie(raw) : null
  if (!id) return Response.json({ user: null })
  const u = getUsers().find(x => x.id === id)
  return Response.json({ user: u ? safeUser(u) : null })
}

export async function PUT(req: Request){
  const raw = (await cookies()).get('cc3_session')?.value
  const id = raw ? verifySessionCookie(raw) : null
  if(!id) return Response.json({ok:false,error:'Unauthorized'},{status:401})
  const u = getUsers().find(x=>x.id===id)
  if(!u) return Response.json({ok:false,error:'Not found'},{status:404})
  const b=await req.json().catch(()=> ({}))
  if(typeof b.name === 'string' && b.name.trim()) u.name=b.name.trim()
  if(b.phone!==undefined) u.phone=String(b.phone)
  if(b.department!==undefined) u.department=String(b.department)
  if(b.cellId!==undefined) u.cellId=String(b.cellId)
  try{ require('@/lib/persist').scheduleFlush('users') }catch{}
  return Response.json({ok:true,user:safeUser(u)})
}
