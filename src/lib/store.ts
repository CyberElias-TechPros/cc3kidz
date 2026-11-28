export type Visit = { id: string; name: string; phone: string; email?: string; date: string; visitors: number; firstTime: string; children: boolean; note?: string; createdAt: string }
export type Prayer = { id: string; name?: string; contact?: string; category: string; body: string; confidential: boolean; followUp: boolean; createdAt: string }
export type Testimony = { id: string; name: string; title: string; category: string; body: string; consent: boolean; status: 'pending'|'approved'|'published'; createdAt: string }
export type Volunteer = { id: string; name: string; phone: string; email?: string; memberStatus: string; department: string; skills: string[]; availability: string; note?: string; createdAt: string }
export type EventReg = { id: string; eventSlug: string; name: string; phone: string; email?: string; attendees: number; member: string; createdAt: string; ticket?: string }
export type ContactMsg = { id: string; name: string; phone?: string; email?: string; category: string; message: string; method?: string; createdAt: string }
export type NewsletterSub = { id: string; email: string; createdAt: string }
export type FoundationReg = { id: string; name: string; phone: string; pref: string; availability?: string; createdAt: string }
export type AttendanceReport = { id: string; cellId: string; churchId?: string; date: string; present: number; visitors?: number; souls?: number; outreach?: string; topic?: string; note?: string; leaderId?: string; createdAt: string }
export type DeptAttendance = { id: string; departmentId: string; date: string; present: number; late?: number; absent?: number; activity?: string; note?: string; leaderId?: string; createdAt: string }
export type FoundationProgress = { id: string; userId: string; moduleSlug: string; completed: boolean; score?: number; updatedAt: string }
export type GivingStatus = 'pending'|'verified'|'rejected'
export type GivingTransaction = { id: string; userId?: string; fundSlug: string; fundName: string; amount: number; currency: string; reference?: string; popUrl?: string; note?: string; status: GivingStatus; receiptNo?: string; createdAt: string; verifiedAt?: string }
export type Notification = { id: string; userId?: string; title: string; body: string; href?: string; read: boolean; createdAt: string }

const g: any = globalThis as any
g.__cc3 = g.__cc3 || {}
g.__cc3.visits = g.__cc3.visits || []
g.__cc3.prayers = g.__cc3.prayers || []
g.__cc3.testimonies = g.__cc3.testimonies || []
g.__cc3.volunteers = g.__cc3.volunteers || []
g.__cc3.eventRegs = g.__cc3.eventRegs || []
g.__cc3.contacts = g.__cc3.contacts || []
g.__cc3.newsletters = g.__cc3.newsletters || []
g.__cc3.foundationRegs = g.__cc3.foundationRegs || []
g.__cc3.attendance = g.__cc3.attendance || []
g.__cc3.deptAttendance = g.__cc3.deptAttendance || []
g.__cc3.foundationProgress = g.__cc3.foundationProgress || []
g.__cc3.giving = g.__cc3.giving || []
g.__cc3.notifications = g.__cc3.notifications || []
g.__cc3.auditLog = g.__cc3.auditLog || []

// Persist to .data/db.json when running without Postgres (dev fallback)
if (typeof process !== 'undefined' && !process.env.DATABASE_URL){
  try {
    // lazy to avoid bundling issues
    const { mergeIntoGlobal } = require('./persist')
    mergeIntoGlobal('visits', g.__cc3.visits)
    mergeIntoGlobal('prayers', g.__cc3.prayers)
    mergeIntoGlobal('testimonies', g.__cc3.testimonies)
    mergeIntoGlobal('volunteers', g.__cc3.volunteers)
    mergeIntoGlobal('eventRegs', g.__cc3.eventRegs)
    mergeIntoGlobal('contacts', g.__cc3.contacts)
    mergeIntoGlobal('newsletters', g.__cc3.newsletters)
    mergeIntoGlobal('foundationRegs', g.__cc3.foundationRegs)
    mergeIntoGlobal('attendance', g.__cc3.attendance)
    mergeIntoGlobal('deptAttendance', g.__cc3.deptAttendance)
    mergeIntoGlobal('foundationProgress', g.__cc3.foundationProgress)
    mergeIntoGlobal('giving', g.__cc3.giving)
    mergeIntoGlobal('notifications', g.__cc3.notifications)
  } catch {}
}

export const store = g.__cc3 as {
  visits: Visit[]
  prayers: Prayer[]
  testimonies: Testimony[]
  volunteers: Volunteer[]
  eventRegs: EventReg[]
  contacts: ContactMsg[]
  newsletters: NewsletterSub[]
  foundationRegs: FoundationReg[]
  attendance: AttendanceReport[]
  deptAttendance: DeptAttendance[]
  foundationProgress: FoundationProgress[]
  giving: GivingTransaction[]
  notifications: Notification[]
  auditLog: any[]
}

export function uid() { return Math.random().toString(36).slice(2, 9) }
