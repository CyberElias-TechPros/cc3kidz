'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import services from '@/data/services.json'
import events from '@/data/events.json'
import ministries from '@/data/ministries.json'
import messages from '@/data/messages.json'

const INDEX = [
  ...(services as any[]).map((s: any) => ({ title: s.name, href: `/services/${s.slug}`, cat: 'Services', excerpt: s.description })),
  ...(events as any[]).map((e: any) => ({ title: e.title, href: `/events/${e.slug}`, cat: 'Events', excerpt: e.excerpt })),
  ...(ministries as any[]).map((m: any) => ({ title: m.name, href: m.href, cat: 'Ministries', excerpt: m.purpose })),
  ...(messages as any[]).map((m: any) => ({ title: m.title, href: `/media/${m.slug}`, cat: 'Media', excerpt: m.excerpt })),
  { title: 'Plan Your Visit', href: '/new-here', cat: 'New Here', excerpt: 'What to expect, directions, parking' },
  { title: 'Cell Finder', href: '/cells', cat: 'Cells', excerpt: 'Find a cell near you' },
  { title: 'Children Church', href: '/kids', cat: 'Kids', excerpt: 'Ages 0–12' },
]

export default function SearchPage() {
  const [q, setQ] = useState('')
  const results = useMemo(() => {
    if (!q.trim()) return []
    const needle = q.toLowerCase()
    return INDEX.filter(i => `${i.title} ${i.excerpt} ${i.cat}`.toLowerCase().includes(needle)).slice(0, 12)
  }, [q])

  return (
    <section className="section">
      <div className="container-cc max-w-2xl">
        <h1 className="font-display font-black text-[2rem]">Search</h1>
        <input autoFocus placeholder="Search services, events, ministries, messages…" value={q} onChange={e => setQ(e.target.value)} className="mt-4 w-full rounded-full border border-black/10 bg-white px-6 py-4 text-sm" />
        <div className="mt-6 space-y-3">
          {q && results.length === 0 && <div className="card p-6 text-center text-muted">No results for “{q}”.</div>}
          {results.map(r => (
            <Link key={r.href} href={r.href} className="card p-4 flex justify-between items-center">
              <div><div className="font-semibold text-sm">{r.title}</div><div className="text-xs text-muted">{r.excerpt.slice(0, 60)}</div></div>
              <span className="rounded-full bg-navy text-white px-3 py-1 text-xs">{r.cat}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
