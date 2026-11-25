import { store, uid } from './store'
import bcrypt from 'bcryptjs'

export type Role = 'member' | 'leader' | 'admin' | 'superadmin'
export type AppUser = {
  id: string
  name: string
  email: string
  phone?: string
  password: string // bcrypt hash (file fallback); when PG present we dual-write passwordHash
  role: Role
  cellId?: string
  department?: string
  avatar?: string
  createdAt: string
}

function hash(p: string){ return bcrypt.hashSync(p, 10) }
function verifyHash(h: string, plain: string){
  if (!h.startsWith('$2')) return h === plain
  return bcrypt.compareSync(plain, h)
}

export function getUsers(): AppUser[] {
  const g: any = globalThis as any
  g.__cc3 = g.__cc3 || {}
  if (!g.__cc3.users) {
    const isProd = process.env.NODE_ENV === 'production' && !!process.env.DATABASE_URL
    if (isProd) {
      // In production with DB, do NOT seed demo accounts — rely on DB.
      g.__cc3.users = [] as AppUser[]
    } else {
      g.__cc3.users = [
        { id: 'u1', name: 'Demo Member', email: 'member@cc3.local', password: hash('member123'), role: 'member', cellId: 'cell-1', department: 'Ushering & Hospitality', createdAt: new Date().toISOString() },
        { id: 'u2', name: 'Cell Leader', email: 'leader@cc3.local', password: hash('leader123'), role: 'leader', cellId: 'cell-1', createdAt: new Date().toISOString() },
        { id: 'admin1', name: 'Admin', email: 'admin@cc3.local', password: hash('admin123'), role: 'admin', createdAt: new Date().toISOString() }
      ] as AppUser[]
    }
    g.__cc3.attendance = g.__cc3.attendance || []
    g.__cc3.deptAttendance = g.__cc3.deptAttendance || []
    g.__cc3.foundationProgress = g.__cc3.foundationProgress || []
    g.__cc3.notifications = g.__cc3.notifications || []
    g.__cc3.savedResources = g.__cc3.savedResources || {}
    try { require('./persist').flushKey('users') } catch {}
  } else {
    for (const u of g.__cc3.users){
      if (u.password && !u.password.startsWith('$2')) u.password = hash(u.password)
    }
  }
  return g.__cc3.users
}

export function findUserByEmail(email: string) {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase())
}
export function createUser(data: { name: string; email: string; password: string; phone?: string }) {
  if (findUserByEmail(data.email)) throw new Error('Email already registered')
  const u: AppUser = { id: uid(), name: data.name, email: data.email, phone: data.phone, password: hash(data.password), role: 'member', createdAt: new Date().toISOString() }
  getUsers().push(u)
  try { require('./persist').scheduleFlush('users') } catch {}
  // fire-and-forget PG mirror when DATABASE_URL present
  try{
    const { getPrisma } = require('./prisma') as any
    const prisma = getPrisma?.()
    if (prisma) prisma.user.create({ data:{ email:u.email, name:u.name, passwordHash:u.password, role:u.role, phone:u.phone }}).catch(()=>{})
  }catch{}
  return u
}
export async function verifyUser(email: string, password: string) {
  // prefer PG when present (source of truth in prod) else file
  try{
    const { getPrisma } = await import('./prisma')
    const prisma = getPrisma()
    if (prisma){
      const pu = await prisma.user.findUnique({ where:{ email }})
      if (pu && verifyHash(pu.passwordHash, password)){
        // ensure file mirror exists for session helpers that read file
        if (!findUserByEmail(email)){
          const g: any = globalThis as any
          g.__cc3.users.push({ id: pu.id, name: pu.name, email: pu.email, phone: pu.phone||undefined, password: pu.passwordHash, role: pu.role as Role, cellId: (pu as any).cellId, department: (pu as any).department, createdAt: pu.createdAt.toISOString() })
        }
        return { id: pu.id, name: pu.name, email: pu.email, phone: pu.phone, password: pu.passwordHash, role: pu.role as Role, cellId: (pu as any).cellId, department: (pu as any).department, createdAt: pu.createdAt.toISOString() }
      }
    }
  }catch{}
  const u = findUserByEmail(email)
  if (!u) return null
  if (!verifyHash(u.password, password)) return null
  return u
}
export function safeUser(u: AppUser) {
  const { password, ...rest } = u
  return rest
}
export function roleRank(r: Role){ return ({member:1, leader:2, admin:3, superadmin:4} as any)[r] || 0 }
export function canAccess(userRole: Role, required: Role){ return roleRank(userRole) >= roleRank(required) }
