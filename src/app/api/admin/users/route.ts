import { requireRole } from '@/lib/rbac'
import { getUsers } from '@/lib/auth'

export async function GET(req: Request){
  const { error: e } = requireRole(req as any, ['admin','superadmin'])
  if (e) return e
  const users = getUsers().map(u=> ({ id:u.id, name:u.name, email:u.email, phone:u.phone, role:u.role, cellId:u.cellId, department:u.department, createdAt:u.createdAt }))
  return Response.json({ users, count: users.length })
}

export async function PATCH(req: Request){
  const { error: e, user: actor } = requireRole(req as any, ['superadmin','admin'])
  if (e) return e
  const b = await req.json().catch(()=>null)
  const target = getUsers().find(u=>u.id===b.id)
  if (!target) return Response.json({ok:false,error:'User not found'},{status:404})
  if (b.role){
    const allowed=['member','leader','admin','superadmin'] as const
    if (!allowed.includes(b.role)) return Response.json({ok:false,error:'Invalid role'},{status:400})
    // only superadmin can grant superadmin
    if (b.role==='superadmin' && actor.role!=='superadmin') return Response.json({ok:false,error:'Only superadmin can grant superadmin'},{status:403})
    target.role=b.role as any
  }
  if (b.department!==undefined) target.department=b.department
  if (b.cellId!==undefined) target.cellId=b.cellId
  try{ require('@/lib/persist').scheduleFlush('users')}catch{}
  return Response.json({ok:true,user:{id:target.id, role:target.role}})
}
