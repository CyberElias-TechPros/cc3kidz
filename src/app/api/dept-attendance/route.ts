import { store, uid } from '@/lib/store'
import { getUsers } from '@/lib/auth'
import { verifySessionCookie } from '@/lib/session'
import { jsonError, jsonOk, enforceRate } from '@/lib/api-helpers'
import { z } from 'zod'

const schema = z.object({ departmentId: z.string().min(1), date: z.string().min(4), present: z.number().int().min(0).max(500), late: z.number().int().min(0).max(500).optional(), absent: z.number().int().min(0).max(500).optional(), activity: z.string().max(300).optional(), note: z.string().max(1000).optional() })

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const dept = searchParams.get('departmentId')
  let list = store.deptAttendance.slice().sort((a,b)=> b.date.localeCompare(a.date))
  if (dept) list = list.filter(r=> r.departmentId===dept)
  return Response.json({ attendance: list, count: list.length })
}

export async function POST(req: Request){
  const rl=enforceRate(req,'dept-att',60); if(rl) return rl
  const cookie = req.headers.get('cookie') || ''
  const m = cookie.match(/cc3_session=([^;]+)/)
  const raw = m?.[1] ? decodeURIComponent(m[1]) : null
  const sid = raw ? verifySessionCookie(raw) : null
  const user = sid ? getUsers().find(u=>u.id===sid) : null
  const b = await req.json().catch(()=>null)
  const p = schema.safeParse(b)
  if (!p.success) return jsonError(p.error.issues.map(i=>i.message).join('; '),400)
  const r = { id: uid(), departmentId: p.data.departmentId, date: p.data.date, present: Math.floor(p.data.present), late: p.data.late?Math.floor(p.data.late):0, absent: p.data.absent?Math.floor(p.data.absent):0, activity: p.data.activity||'', note: p.data.note||'', leaderId: user?.id||'anonymous', createdAt: new Date().toISOString() }
  store.deptAttendance.push(r)
  try{ require('@/lib/persist').scheduleFlush('deptAttendance') }catch{}
  return jsonOk({ report:r })
}
