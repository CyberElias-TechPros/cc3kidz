import { store } from '@/lib/store'
import { verifySessionCookie } from '@/lib/session'
import { getUsers } from '@/lib/auth'

export async function GET(req: Request){
  const cookie = req.headers.get('cookie')||''
  const raw = cookie.match(/cc3_session=([^;]+)/)?.[1]
  const sid = raw ? verifySessionCookie(decodeURIComponent(raw)) : null
  const user = sid ? getUsers().find(u=>u.id===sid): null
  if (!user) return Response.json({ notifications: [] })
  const mine = store.notifications.filter(n=> !n.userId || n.userId===user.id).sort((a,b)=> b.createdAt.localeCompare(a.createdAt)).slice(0,50)
  return Response.json({ notifications: mine, unread: mine.filter(n=>!n.read).length })
}
export async function POST(req: Request){
  const { id } = await req.json().catch(()=> ({}))
  const cookie = req.headers.get('cookie')||''
  const raw = cookie.match(/cc3_session=([^;]+)/)?.[1]
  const sid = raw ? verifySessionCookie(decodeURIComponent(raw)) : null
  const user = sid ? getUsers().find(u=>u.id===sid): null
  if (!user) return Response.json({ ok:false }, {status:401})
  if (id==='all'){
    store.notifications.forEach(n=>{ if(!n.userId || n.userId===user.id) n.read=true })
  } else {
    const n = store.notifications.find(x=>x.id===id); if(n) n.read=true
  }
  try{ require('@/lib/persist').scheduleFlush('notifications') }catch{}
  return Response.json({ ok:true })
}
