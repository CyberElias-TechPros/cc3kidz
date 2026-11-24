import { store, uid } from '@/lib/store'
import { verifySessionCookie } from '@/lib/session'
import { getUsers } from '@/lib/auth'
import { jsonError, jsonOk, logAudit } from '@/lib/api-helpers'

export async function POST(req: Request){
  const cookie = req.headers.get('cookie')||''
  const raw = cookie.match(/cc3_session=([^;]+)/)?.[1]
  const sid = raw ? verifySessionCookie(decodeURIComponent(raw)) : null
  const user = sid ? getUsers().find(u=>u.id===sid) : null
  if (!user || !['admin','superadmin'].includes(user.role)) return jsonError('Forbidden — admin only',403)
  const { id, action, receiptNo } = await req.json().catch(()=> ({}))
  const tx: any = (store.giving as any[]).find(g=>g.id===id)
  if (!tx) return jsonError('Not found',404)
  if (action==='verify'){
    tx.status = 'verified'
    tx.verifiedAt = new Date().toISOString()
    tx.receiptNo = receiptNo || `RCPT-${Date.now().toString().slice(-6)}`
    tx.verifiedBy = user.id
    // notify member who gave
    if (tx.userId){
      store.notifications.push({ id: uid(), userId: tx.userId, title: `Giving verified — ${tx.fundName} receipt ${tx.receiptNo}`, body: `Your ${tx.fundName} giving of ₦${Number(tx.amount).toLocaleString()} has been verified. Receipt: ${tx.receiptNo}`, href:'/member', read:false, createdAt:new Date().toISOString() })
    }
  } else if (action==='reject'){
    tx.status='rejected'
    if (tx.userId){
      store.notifications.push({ id: uid(), userId: tx.userId, title: `Giving needs attention — ${tx.fundName}`, body: `Your submission for ${tx.fundName} was flagged. Please contact finance or resubmit with clearer POP.`, href:'/member', read:false, createdAt:new Date().toISOString() })
    }
  } else return jsonError('action must be verify|reject',400)
  try{ require('@/lib/persist').scheduleFlush('giving'); require('@/lib/persist').scheduleFlush('notifications') }catch{}
  await logAudit(req,'giving.verify','Giving',tx.id,{ action, receiptNo: tx.receiptNo })
  return jsonOk({ giving: tx })
}
