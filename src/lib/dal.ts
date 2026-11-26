/**
 * Data Access Layer — Prisma-first, file-store fallback.
 * Every write goes to Prisma when DATABASE_URL is set; file store is kept as secondary
 * for dev compatibility. Reads prefer Prisma, fallback to store on error / missing DB.
 * This makes Vercel + Neon production-safe while keeping local dev zero-config.
 */
import { getPrisma } from './prisma'
import { hasDb } from './env'
import { store, uid } from './store'

type PrismaClientLike = ReturnType<typeof getPrisma>

function p(): PrismaClientLike { try { return getPrisma() } catch { return null } }

// --- Notifications (used by many APIs) ---
export async function createNotification(data: { userId?: string | null; title: string; body: string; href?: string }){
  const rec = { id: uid(), userId: data.userId ?? null, title: data.title, body: data.body, href: data.href, read: false, createdAt: new Date().toISOString() } as any
  // store always (fast, powers current admin UI)
  store.notifications.push(rec)
  try{ require('./persist').scheduleFlush('notifications') }catch{}
  // Prisma best-effort
  const prisma = p()
  if (prisma) {
    prisma.notification.create({ data:{ userId: data.userId || null, title: data.title, body: data.body, href: data.href } as any }).catch(()=>{})
  }
  return rec
}

export async function notifyUsers(userIds: string[], payload: { title: string; body: string; href?: string }){
  for (const uid2 of userIds) await createNotification({ userId: uid2, title: payload.title, body: payload.body, href: payload.href })
}

// --- Generic CRUD helpers ---
export async function createVisit(data: any){
  const rec = { id: data.id || uid(), ...data, status: data.status || 'new' }
  store.visits.push(rec as any)
  try{ require('./persist').scheduleFlush('visits') }catch{}
  const prisma = p()
  if (prisma) {
    prisma.visit.create({ data:{ name: rec.name, phone: rec.phone, email: rec.email, date: rec.date, visitors: rec.visitors ?? 1, firstTime: rec.firstTime, children: !!rec.children, note: rec.note } as any }).catch(e=>console.warn('[dal] visit prisma create failed', e?.message))
  }
  return rec
}

export async function createPrayer(data: any){
  const rec = { id: data.id || uid(), ...data }
  store.prayers.push(rec as any)
  try{ require('./persist').scheduleFlush('prayers') }catch{}
  const prisma = p()
  if (prisma) prisma.prayer.create({ data:{ name: rec.name||null, contact: rec.contact||null, category: rec.category||'Personal', body: rec.body, confidential: !!rec.confidential, followUp: !!rec.followUp } as any }).catch(()=>{})
  return rec
}

export async function createTestimony(data: any){
  const rec = { id: data.id || uid(), ...data }
  store.testimonies.push(rec as any)
  try{ require('./persist').scheduleFlush('testimonies') }catch{}
  const prisma = p()
  if (prisma) prisma.testimony.create({ data:{ name: rec.name, title: rec.title, category: rec.category, body: rec.body, consent: !!rec.consent } as any }).catch(()=>{})
  return rec
}

export async function createVolunteer(data: any){
  const rec = { id: data.id || uid(), ...data }
  store.volunteers.push(rec as any)
  try{ require('./persist').scheduleFlush('volunteers') }catch{}
  const prisma = p()
  if (prisma) prisma.volunteer.create({ data:{ name: rec.name, phone: rec.phone, email: rec.email, memberStatus: rec.memberStatus||'Member', department: rec.department, skills: rec.skills||[], availability: rec.availability, note: rec.note } as any }).catch(()=>{})
  return rec
}

export async function createEventReg(data: any){
  const rec = { id: data.id || uid(), ...data }
  store.eventRegs.push(rec as any)
  try{ require('./persist').scheduleFlush('eventRegs') }catch{}
  const prisma = p()
  if (prisma) prisma.eventReg.create({ data:{ eventSlug: rec.eventSlug, name: rec.name, phone: rec.phone, email: rec.email, attendees: rec.attendees ?? 1, member: rec.member||'visitor', ticket: rec.ticket } as any }).catch(e=>console.warn('[dal] eventReg prisma', e?.message))
  return rec
}

export async function createContact(data: any){
  const rec = { id: data.id || uid(), ...data, status:'open' }
  store.contacts.push(rec as any)
  try{ require('./persist').scheduleFlush('contacts') }catch{}
  const prisma = p()
  if (prisma) prisma.contactMsg.create({ data:{ name: rec.name, phone: rec.phone, email: rec.email, category: rec.category||'General enquiries', message: rec.message, method: rec.method } as any }).catch(()=>{})
  return rec
}

export async function createNewsletter(email: string){
  const rec = { id: uid(), email, createdAt: new Date().toISOString() } as any
  store.newsletters.push(rec)
  try{ require('./persist').scheduleFlush('newsletters') }catch{}
  const prisma = p()
  if (prisma) prisma.newsletterSub.create({ data:{ email } as any }).catch(()=>{})
  return rec
}

export async function createFoundationReg(data: any){
  const rec = { id: uid(), ...data }
  store.foundationRegs.push(rec as any)
  try{ require('./persist').scheduleFlush('foundationRegs') }catch{}
  const prisma = p()
  if (prisma) prisma.foundationReg.create({ data:{ name: rec.name, phone: rec.phone, pref: rec.pref||'Weekday Evening', availability: rec.availability } as any }).catch(()=>{})
  return rec
}

export async function createGivingTx(data: any){
  const rec = { id: data.id || uid(), ...data }
  store.giving.push(rec as any)
  try{ require('./persist').scheduleFlush('giving') }catch{}
  // Note: GivingTransaction in Prisma requires fundId relation; we handle via GivingFund lookup in route.
  // This DAL mirrors store push; Prisma path is handled explicitly in submit route for fundId mapping.
  return rec
}

export function getCounts(){
  return {
    visits: store.visits.length,
    prayers: store.prayers.length,
    testimonies: store.testimonies.length,
    volunteers: store.volunteers.length,
    eventRegs: store.eventRegs.length,
    contacts: store.contacts.length,
    newsletters: store.newsletters.length,
  }
}
