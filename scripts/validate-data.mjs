import fs from 'node:fs'
import path from 'node:path'
import { z } from 'zod'

// lightweight replica of src/lib/data-schemas without TS import
const serviceTime = z.object({ day: z.string().min(2), time: z.string().min(2), label: z.string().optional() })
const church = z.object({ id: z.string(), slug: z.string(), name: z.string(), shortName: z.string(), pastor: z.string(), address: z.string(), area: z.string(), serviceTimes: z.array(serviceTime) })
const cell = z.object({ id: z.string(), name: z.string(), leader: z.string(), area: z.string(), day: z.string(), time: z.string(), churchId: z.string() })
const event = z.object({ id: z.string(), slug: z.string(), title: z.string(), category: z.string(), date: z.string(), time: z.string(), venue: z.string(), image: z.string(), excerpt: z.string() })
const ministry = z.object({ id: z.string(), slug: z.string(), name: z.string(), group: z.string(), purpose: z.string(), href: z.string(), image: z.string() })

const files = {
  groupChurches: { path: 'src/data/groupChurches.json', schema: z.array(church) },
  cells: { path: 'src/data/cells.json', schema: z.array(cell) },
  events: { path: 'src/data/events.json', schema: z.array(event) },
  ministries: { path: 'src/data/ministries.json', schema: z.array(ministry) },
}

let ok = true
for (const [name, { path: p, schema }] of Object.entries(files)) {
  const full = path.join(process.cwd(), p)
  if (!fs.existsSync(full)) { console.warn(`[data] ${name}: missing ${p}`); continue }
  const json = JSON.parse(fs.readFileSync(full, 'utf8'))
  const r = schema.safeParse(json)
  if (!r.success) {
    console.error(`[data] ${name} FAILED:`, r.error.issues.map(i=>`${i.path.join('.')}: ${i.message}`).join('; '))
    ok = false
  } else {
    console.log(`[data] ${name} ✓ ${Array.isArray(json) ? json.length : 1} records`)
  }
}
if (!ok) process.exit(1)
else console.log('[data] all validated')
