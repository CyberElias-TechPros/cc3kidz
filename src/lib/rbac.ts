import { getUsers } from './auth'
import { verifySessionCookie } from './session'
import { jsonError } from './api-helpers'
import type { Role } from './auth'

export function userFromRequest(req: Request){
  const cookie = req.headers.get('cookie')||''
  const raw = cookie.match(/cc3_session=([^;]+)/)?.[1]
  const sid = raw ? verifySessionCookie(decodeURIComponent(raw)) : null
  return sid ? (getUsers().find(u=>u.id===sid) || null) : null
}

export function requireUser(req: Request){
  const u = userFromRequest(req)
  if (!u) return { error: jsonError('Unauthorized — please sign in',401) as Response, user: null as any }
  return { error: null as any, user: u }
}

export function requireRole(req: Request, roles: Role[]){
  const u = userFromRequest(req)
  if (!u) return { error: jsonError('Unauthorized',401) as Response, user: null as any }
  if (!roles.includes(u.role)) return { error: jsonError('Forbidden — insufficient role',403) as Response, user: null as any }
  return { error: null, user: u }
}

export const isAdmin = (u:any)=> ['admin','superadmin'].includes(u?.role)
export const isLeaderUp = (u:any)=> ['leader','admin','superadmin'].includes(u?.role)
