'use client'
import { useState } from 'react'

const FAQS = [
  { q: 'What time are your services?', a: 'Sunday Service 8AM (3 hrs), Monday Prayer & Prophecy 6PM, Wednesday Midweek 5:30PM. Children’s Church runs during Sunday service.', cat: 'Visiting' },
  { q: 'Where are you located?', a: '30B Rumuokwuta/NTA Road, Opposite Patcoin Filling Station, Port Harcourt. Landmark: NTA Road. Maps link on Contact.', cat: 'Visiting' },
  { q: 'Can I attend if I’m not a member?', a: 'Yes — all are welcome. No membership required. Plan Your Visit for a hosted welcome.', cat: 'Visiting' },
  { q: 'What happens during a service?', a: 'Vibrant worship, prayer, teaching of the Word, testimonies, and fellowship. First-time visitors are hosted personally.', cat: 'Visiting' },
  { q: 'Is there a dress code?', a: 'Come as you are — modest and comfortable. No strict dress code.', cat: 'Visiting' },
  { q: 'Is there a children’s ministry?', a: 'Yes — Champions for Christ 0–12 during main service. See Children Church.', cat: 'Visiting' },
  { q: 'How do I join a cell?', a: 'Use Cell Finder by area/neighbourhood, view meeting days, contact leader. Or request connection via Cells page.', cat: 'Membership' },
  { q: 'How do I join a department?', a: 'Visit Ministries directory, view purpose/activities/schedule, submit volunteer application — Review → Training → Assignment.', cat: 'Membership' },
  { q: 'How do I attend Foundation School?', a: 'Register on Foundation School page — 6-week curriculum covering salvation, new creation, Word, faith, prayer, Holy Spirit, evangelism.', cat: 'Spiritual Growth' },
  { q: 'Where can I watch services?', a: 'Online Church page shows live status/countdown + YouTube integration. When offline, see next service.', cat: 'Online' },
]

export default function FAQPage() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('All')
  const filtered = FAQS.filter(f => (cat === 'All' || f.cat === cat) && (!query || `${f.q} ${f.a}`.toLowerCase().includes(query.toLowerCase())))

  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-12">
          <div className="eyebrow !text-gold">Help Centre</div>
          <h1 className="font-display font-black text-[2.4rem] leading-none mt-2">Frequently Asked Questions</h1>
          <p className="text-slate-200 mt-3 max-w-2xl leading-7">Searchable help centre — Visiting, Membership, Spiritual Growth, Church activities, Online.</p>
          <div className="mt-6 flex gap-2 max-w-xl">
            <input placeholder="Search FAQs…" value={query} onChange={e => setQuery(e.target.value)} className="flex-1 rounded-full bg-white text-navy px-5 py-3 text-sm" />
            <select value={cat} onChange={e => setCat(e.target.value)} className="rounded-full bg-white text-navy px-4 py-3 text-sm">
              <option>All</option>
              <option>Visiting</option>
              <option>Membership</option>
              <option>Spiritual Growth</option>
              <option>Online</option>
            </select>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container-cc max-w-3xl">
          <div className="space-y-3">
            {filtered.map((f, i) => (
              <details key={i} className="card p-5 group open:bg-sand/50">
                <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">{f.q}<span className="text-muted">›</span></summary>
                <p className="text-sm leading-7 text-slate-600 mt-3">{f.a}</p>
                <span className="mt-2 inline-flex rounded-full bg-navy text-white px-2 py-1 text-xs">{f.cat}</span>
              </details>
            ))}
            {filtered.length === 0 && <div className="card p-8 text-center text-muted">No results — try another keyword or contact us.</div>}
          </div>
          <div className="card p-6 mt-6">
            <h3 className="font-display font-extrabold">Still need help?</h3>
            <p className="text-sm text-muted mt-2">Contact support via Contact page — General enquiries, Prayer, Events, Foundation School, etc. Routed to right team.</p>
            <a href="/contact" className="btn btn--navy mt-4">Contact Us</a>
          </div>
        </div>
      </section>
    </>
  )
}
