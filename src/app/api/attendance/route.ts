import { store, uid } from '@/lib/store'
import cells from '@/data/cells.json'
import { getUsers } from '@/lib/auth'
import { verifySessionCookie } from '@/lib/session'
import { jsonError, jsonOk, enforceRate } from '@/lib/api-helpers'
import { z } from 'zod'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const cellId = searchParams.get('cellId')
  const churchId = searchParams.get('churchId')
  let list = store.attendance.slice().sort((a, b) => b.date.localeCompare(a.date))
  if (cellId) list = list.filter(r => r.cellId === cellId)
  if (churchId) list = list.filter(r => {
    const cell: any = (cells as any[]).find(c => c.id === r.cellId)
    return cell?.churchId === churchId
  })
  return Response.json({ attendance: list, count: list.length })
}

const schema = z.object({ cellId: z.string().min(1), date: z.string().min(4), present: z.number().int().min(0).max(500), visitors: z.number().int().min(0).max(500).optional(), souls: z.number().int().min(0).max(500).optional(), outreach: z.string().max(500).optional(), topic: z.string().max(120).optional(), note: z.string().max(1000).optional() })

export async function POST(req: Request) {
  const rl = enforceRate(req,'attendance',60); if(rl) return rl
  const cookie = req.headers.get('cookie') || ''
  const sessionMatch = cookie.match(/cc3_session=([^;]+)/)
  const raw = sessionMatch?.[1] ? decodeURIComponent(sessionMatch[1]) : null
  const sessionId = raw ? verifySessionCookie(raw) : null
  const user = sessionId ? getUsers().find(u => u.id === sessionId) : null
  if (!user) return jsonError('Unauthorized — please sign in to record attendance', 401)

  const b = await req.json().catch(()=>null)
  const parsed = schema.safeParse(b)
  if (!parsed.success) return jsonError(parsed.error.issues.map(i=>i.message).join('; '), 400)
  const cell: any = (cells as any[]).find(c => c.id === parsed.data.cellId)
  if (!cell) return jsonError('Invalid cell', 400)

  const r = {
    id: uid(),
    cellId: parsed.data.cellId,
    churchId: cell.churchId,
    date: parsed.data.date,
    present: Math.floor(parsed.data.present),
    visitors: parsed.data.visitors ? Math.floor(parsed.data.visitors) : 0,
    souls: parsed.data.souls ? Math.floor(parsed.data.souls) : 0,
    outreach: parsed.data.outreach || '',
    topic: parsed.data.topic || '',
    note: parsed.data.note || '',
    leaderId: user.id,
    createdAt: new Date().toISOString()
  }
  store.attendance.push(r)
  try{ require('@/lib/persist').scheduleFlush('attendance') }catch{}
  return jsonOk({ report: r })
}
