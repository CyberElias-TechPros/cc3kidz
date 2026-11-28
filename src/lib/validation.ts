import { z } from 'zod'

export const visitSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(8).max(20),
  email: z.string().email().optional().or(z.literal('')),
  date: z.string().min(4),
  visitors: z.coerce.number().int().min(1).max(20).default(1),
  firstTime: z.string().optional(),
  children: z.boolean().optional().default(false),
  note: z.string().max(500).optional(),
})
export const prayerSchema = z.object({
  name: z.string().max(80).optional(),
  contact: z.string().max(80).optional(),
  category: z.string().default('Personal'),
  body: z.string().min(5).max(2000),
  confidential: z.boolean().optional().default(true),
  followUp: z.boolean().optional().default(false),
})
export const testimonySchema = z.object({
  name: z.string().min(2).max(80),
  title: z.string().min(5).max(120),
  category: z.string().default('Other'),
  body: z.string().min(20).max(5000),
  consent: z.boolean().refine(v=>v===true, { message: 'Consent required' }),
})
export const volunteerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal('')),
  memberStatus: z.string().optional(),
  department: z.string().min(2),
  skills: z.array(z.string()).optional().default([]),
  availability: z.string().max(120).optional(),
  note: z.string().max(500).optional(),
})
export const eventRegSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal('')),
  attendees: z.coerce.number().int().min(1).max(20).default(1),
  member: z.string().optional().default('visitor'),
  eventSlug: z.string().min(2),
})
export const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  category: z.string().optional(),
  message: z.string().min(10).max(5000),
  method: z.string().optional(),
})
export const newsletterSchema = z.object({ email: z.string().email() })
export const foundationSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  pref: z.string().optional(),
  availability: z.string().optional(),
})
export const givingSchema = z.object({
  fundSlug: z.string().min(2),
  amount: z.coerce.number().positive().max(100000000),
  currency: z.string().optional().default('NGN'),
  reference: z.string().max(80).optional(),
  note: z.string().max(500).optional(),
  // popFile handled separately as FormData
})
export const authRegisterSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(6).max(72),
  phone: z.string().max(20).optional(),
})
export const authLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

// Additional schemas that previously had inline zod — now centralized for reuse + validation parity
export const attendanceSchema = z.object({
  cellId: z.string().min(1),
  date: z.string().min(4),
  present: z.coerce.number().int().min(0).max(500),
  visitors: z.coerce.number().int().min(0).max(500).optional(),
  souls: z.coerce.number().int().min(0).max(500).optional(),
  outreach: z.string().max(500).optional(),
  topic: z.string().max(120).optional(),
  note: z.string().max(1000).optional(),
})
export const deptAttendanceSchema = z.object({
  departmentId: z.string().min(1),
  date: z.string().min(4),
  present: z.coerce.number().int().min(0).max(500),
  late: z.coerce.number().int().min(0).max(500).optional().default(0),
  absent: z.coerce.number().int().min(0).max(500).optional().default(0),
  activity: z.string().max(200).optional(),
  note: z.string().max(1000).optional(),
})
export const foundationProgressSchema = z.object({
  moduleSlug: z.string().min(2).max(80),
  completed: z.boolean().optional().default(false),
  score: z.number().int().min(0).max(100).optional(),
})
export const givingVerifySchema = z.object({
  id: z.string().min(1),
  action: z.enum(['verify','reject']),
  receiptNo: z.string().max(40).optional(),
})

export function formatZod(e: z.ZodError){
  return e.issues.map(i=> `${i.path.join('.')}: ${i.message}`).join('; ')
}
