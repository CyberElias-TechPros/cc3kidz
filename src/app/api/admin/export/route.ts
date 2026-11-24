import { store } from '@/lib/store'
import { verifySessionCookie } from '@/lib/session'
import { getUsers } from '@/lib/auth'

function toCsv(rows: any[], cols: string[]){
  const esc = (v:any)=> `"${String(v??'').replace(/"/g,'""')}"`
  return [cols.join(','), ...rows.map(r=> cols.map(c=> esc(r[c])).join(','))].join('\n')
}

export async function GET(req: Request){
  const cookie = req.headers.get('cookie')||''
  const raw = cookie.match(/cc3_session=([^;]+)/)?.[1]
  const sid = raw ? verifySessionCookie(decodeURIComponent(raw)) : null
  const user = sid ? getUsers().find(u=>u.id===sid): null
  if (!user || !['admin','superadmin'].includes(user.role)) return Response.json({ok:false,error:'Forbidden'},{status:403})
  const { searchParams } = new URL(req.url)
  const kind = searchParams.get('kind') || 'giving'
  let csv = ''
  let filename = `export-${kind}.csv`
  if (kind==='giving'){
    csv = toCsv(store.giving, ['id','fundSlug','fundName','amount','currency','reference','status','receiptNo','userId','createdAt'])
  } else if (kind==='giving-verified'){
    csv = toCsv(store.giving.filter(g=>g.status==='verified'), ['id','fundSlug','fundName','amount','currency','reference','receiptNo','verifiedAt','createdAt'])
    filename='giving-verified.csv'
  } else if (kind==='visits'){
    csv = toCsv(store.visits, ['id','name','phone','email','date','visitors','firstTime','createdAt'])
  } else if (kind==='events'){
    csv = toCsv(store.eventRegs, ['id','eventSlug','name','phone','email','attendees','ticket','createdAt'])
  } else if (kind==='attendance'){
    csv = toCsv(store.attendance, ['id','cellId','churchId','date','present','visitors','souls','topic','leaderId','createdAt'])
  } else {
    return Response.json({ok:false,error:'kind must be giving|giving-verified|visits|events|attendance'},{status:400})
  }
  return new Response(csv, { headers: { 'Content-Type':'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="${filename}"` }})
}
