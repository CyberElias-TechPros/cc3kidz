import { requireRole } from '@/lib/rbac'
import { store } from '@/lib/store'

export async function GET(req: Request){
  const { error: e } = requireRole(req as any, ['admin','superadmin'])
  if (e) return e
  const url = new URL(req.url)
  const limit = Math.min(parseInt(url.searchParams.get('limit')||'100'), 200)
  const logs = ((globalThis as any).__cc3?.auditLog || []).slice().sort((a:any,b:any)=> b.createdAt.localeCompare(a.createdAt)).slice(0, limit)
  return Response.json({ logs, count: logs.length })
}
