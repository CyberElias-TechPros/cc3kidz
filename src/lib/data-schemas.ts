import { z } from 'zod'

export const serviceTimeSchema = z.object({
  day: z.string().min(2),
  time: z.string().min(2),
  label: z.string().optional(),
  name: z.string().optional(),
  duration: z.string().optional(),
})

export const churchSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  shortName: z.string(),
  pastor: z.string(),
  title: z.string().optional(),
  address: z.string(),
  area: z.string(),
  city: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  serviceTimes: z.array(serviceTimeSchema),
  cells: z.number().optional(),
  featured: z.boolean().optional(),
  isHeadquarters: z.boolean().optional(),
  coords: z.object({ lat: z.number(), lng: z.number() }).optional(),
})

export const cellSchema = z.object({
  id: z.string(),
  name: z.string(),
  leader: z.string(),
  asst: z.string().optional(),
  area: z.string(),
  day: z.string(),
  time: z.string(),
  venue: z.string().optional(),
  members: z.number().optional(),
  churchId: z.string(),
  church: z.string().optional(),
})

export const eventSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  theme: z.string().optional(),
  category: z.string(),
  date: z.string(), // ISO date
  time: z.string(),
  endTime: z.string().optional(),
  venue: z.string(),
  image: z.string(),
  excerpt: z.string(),
  body: z.string().optional(),
  cta: z.string().optional(),
  featured: z.boolean().optional(),
  capacity: z.number().positive().optional(),
})

export const ministrySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  group: z.string(),
  purpose: z.string(),
  activities: z.array(z.string()).optional(),
  leader: z.string().optional(),
  href: z.string(),
  image: z.string(),
})

export const givingFundSchema = z.object({
  id: z.string().optional(),
  slug: z.string(),
  name: z.string(),
  desc: z.string().optional(),
  purpose: z.string().optional(),
  description: z.string().optional(),
})

export function validateAll(data: Record<string, unknown>) {
  const results: { name: string; ok: boolean; error?: string }[] = []
  const checks: [string, z.ZodTypeAny, unknown][] = [
    ['groupChurches', z.array(churchSchema), data.groupChurches],
    ['cells', z.array(cellSchema), data.cells],
    ['events', z.array(eventSchema), data.events],
    ['ministries', z.array(ministrySchema), data.ministries],
  ]
  for (const [name, schema, val] of checks) {
    if (val === undefined) { results.push({ name, ok: true }); continue }
    const r = schema.safeParse(val)
    results.push({ name, ok: r.success, error: r.success ? undefined : r.error.issues.map(i=>`${i.path.join('.')}: ${i.message}`).join('; ') })
  }
  return results
}
