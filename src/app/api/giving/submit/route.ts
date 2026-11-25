import { store, uid } from '@/lib/store'
import { givingSchema } from '@/lib/validation'
import { jsonError, jsonOk, enforceRate, logAudit } from '@/lib/api-helpers'
import { verifySessionCookie } from '@/lib/session'
import { getUsers } from '@/lib/auth'
import { getFund } from '@/lib/giving'
import fs from 'node:fs'
import path from 'node:path'

export async function POST(req: Request){
  const rl = enforceRate(req,'giving',20); if (rl) return rl
  const ct = req.headers.get('content-type')||''
  let data:any = {}
  let popUrl: string | undefined
  let popMime: string | undefined

  if (ct.includes('multipart/form-data')){
    const fd = await req.formData()
    data.fundSlug = fd.get('fundSlug') as string
    data.amount = fd.get('amount') as string
    data.currency = (fd.get('currency') as string) || 'NGN'
    data.reference = fd.get('reference') as string
    data.note = fd.get('note') as string
    const file = fd.get('pop') as File | null
    if (file && file.size > 0){
      const maxMb = Number(process.env.UPLOAD_MAX_MB || 8)
      if (file.size > maxMb * 1024 * 1024) return jsonError(`POP file too large (max ${maxMb}MB)`,400)
      const allowed = ['image/jpeg','image/png','image/webp','application/pdf']
      if (file.type && !allowed.includes(file.type)) return jsonError('POP must be JPG, PNG, WEBP or PDF',400)
      // sanitize extension — allow only safe list, fallback by mime
      const rawExt = (file.name?.split('.').pop() || '').toLowerCase()
      const extByMime: Record<string,string> = { 'image/jpeg':'jpg','image/png':'png','image/webp':'webp','application/pdf':'pdf' }
      const safeExts = new Set(['jpg','jpeg','png','webp','pdf'])
      let ext = safeExts.has(rawExt) ? rawExt : extByMime[file.type] || 'jpg'
      if (ext === 'jpeg') ext = 'jpg'
      const dir = path.join(process.cwd(), 'public','uploads','pop')
      if (!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true})
      const fname = `${Date.now()}-${uid()}.${ext}`.replace(/[^a-zA-Z0-9._-]/g, '_')
      const buf = Buffer.from(await file.arrayBuffer())
      fs.writeFileSync(path.join(dir,fname), buf)
      popUrl = `/uploads/pop/${fname}`
      popMime = file.type || 'image/jpeg'
    }
  } else {
    data = await req.json().catch(()=>null)
  }

  const parsed = givingSchema.safeParse(data)
  if (!parsed.success) return jsonError(parsed.error.issues.map(i=>i.message).join('; '),400)
  const fund = getFund(parsed.data.fundSlug)
  if (!fund) return jsonError('Unknown fund',400)

  const cookie = req.headers.get('cookie')||''
  const raw = cookie.match(/cc3_session=([^;]+)/)?.[1]
  const sid = raw ? verifySessionCookie(decodeURIComponent(raw)) : null
  const user = sid ? getUsers().find(u=>u.id===sid) : null

  // idempotency: reject duplicate reference for same fund+amount within 10m
  if (parsed.data.reference) {
    const recent = store.giving.find(g => g.fundSlug === fund.slug && (g as any).reference === parsed.data.reference && g.amount === Number(parsed.data.amount) && Date.now() - new Date(g.createdAt).getTime() < 10*60*1000)
    if (recent) return jsonError('Duplicate submission — this reference was already used recently', 409)
  }

  const tx = {
    id: uid(),
    userId: user?.id,
    fundSlug: fund.slug,
    fundName: fund.name,
    amount: Number(parsed.data.amount),
    currency: parsed.data.currency||'NGN',
    reference: parsed.data.reference,
    popUrl, popMime,
    note: parsed.data.note,
    status: 'pending' as const,
    receiptNo: undefined as any,
    createdAt: new Date().toISOString(),
  }
  store.giving.push(tx)
  try{ require('@/lib/persist').scheduleFlush('giving') }catch{}
  await logAudit(req,'giving.submit','Giving',tx.id,{ fund: tx.fundSlug, amount: tx.amount })

  // fire notification for admin
  store.notifications.push({ id: uid(), title: `New giving: ${fund.name} ₦${tx.amount.toLocaleString()}`, body: `${user?.name||'Guest'} — ${fund.name} — ref ${tx.reference||'—'}`, href: '/admin/giving', read: false, createdAt: new Date().toISOString() })
  try{ require('@/lib/persist').scheduleFlush('notifications') }catch{}

  return jsonOk({ id: tx.id, status: tx.status, message: 'Received — finance team will verify and issue receipt. Thank you for giving!' })
}

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const mine = searchParams.get('mine')
  const cookie = req.headers.get('cookie')||''
  const raw = cookie.match(/cc3_session=([^;]+)/)?.[1]
  const sid = raw ? verifySessionCookie(decodeURIComponent(raw)) : null
  const user = sid ? getUsers().find(u=>u.id===sid) : null
  if (mine){
    if (!user) return Response.json({ ok:false, error:'Unauthorized'},{status:401})
    const list = store.giving.filter(g=>g.userId===user.id).sort((a,b)=> b.createdAt.localeCompare(a.createdAt))
    return Response.json({ giving: list })
  }
  if (!user || !['admin','superadmin'].includes(user.role)) return Response.json({ ok:false, error:'Forbidden — admin only'},{status:403})
  return Response.json({ giving: store.giving.slice().sort((a,b)=> b.createdAt.localeCompare(a.createdAt)) })
}
