export function nextServiceDate(day: string, time: string) {
  // Very small helper: returns next occurrence of a weekday at given time
  const map: Record<string, number> = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 }
  const targetDow = map[day] ?? 0
  const m = time.match(/(\d+):(\d+)\s*(AM|PM)/i)
  if (!m) return new Date()
  let h = parseInt(m[1], 10)
  const min = parseInt(m[2], 10)
  const ap = m[3].toUpperCase()
  if (ap === 'PM' && h !== 12) h += 12
  if (ap === 'AM' && h === 12) h = 0
  const now = new Date()
  const d = new Date(now)
  d.setHours(h, min, 0, 0)
  let diff = (targetDow - d.getDay() + 7) % 7
  if (diff === 0 && d.getTime() <= now.getTime()) diff = 7
  d.setDate(d.getDate() + diff)
  return d
}

export function formatLong(d: string) {
  return new Date(d).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}
