import services from '@/data/services.json'
import events from '@/data/events.json'

function toVcal(){
  const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//CC3//EN']
  for (const s of (services as any[])){
    lines.push('BEGIN:VEVENT')
    lines.push(`SUMMARY:${s.name}`)
    lines.push(`DTSTART:${s.day.slice(0,2).toUpperCase()}T080000`)
    lines.push(`DESCRIPTION:${s.description||s.name}`)
    lines.push('END:VEVENT')
  }
  for (const e of (events as any[])){
    lines.push('BEGIN:VEVENT')
    lines.push(`SUMMARY:${e.title}`)
    lines.push(`DTSTART:${(e.date||'2026-12-01').replace(/-/g,'')}T080000`)
    lines.push(`DESCRIPTION:${e.excerpt||''}`)
    lines.push(`LOCATION:${e.venue||''}`)
    lines.push('END:VEVENT')
  }
  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}
export async function GET(){
  const ics = toVcal()
  return new Response(ics, { headers:{ 'Content-Type':'text/calendar; charset=utf-8','Content-Disposition':'attachment; filename="cc3.ics"' }})
}
