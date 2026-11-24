'use client'
import { useEffect, useState } from 'react'
import seeds from '@/data/testimonies.json'
import TestimonyForm from '@/components/forms/TestimonyForm'

export default function TestimoniesPage() {
  const [live, setLive] = useState<any[]>([])
  useEffect(() => {
    fetch('/api/testimony')
      .then(r => r.json())
      .then(j => {
        const pub = (j.testimonies || []).map((t: any) => ({ ...t, date: t.createdAt?.slice(0, 10) || t.date, featured: false }))
        setLive(pub)
      })
      .catch(() => {})
  }, [])
  const all = [...live, ...(seeds as any[])]
  const categories = ['All', 'Salvation', 'Faith', 'Healing', 'Family', 'Career', 'Answered Prayer']
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? all : all.filter((t: any) => t.category === filter)
  const featured = filtered.find((t: any) => t.featured) || filtered[0]

  return (
    <>
      <section className="bg-haze border-b border-black/5">
        <div className="container-cc py-10 md:py-12">
          <div className="flex gap-5 max-w-3xl">
            <div className="hidden sm:block ankara-rule w-[3px] self-stretch shrink-0" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-muted">God is at work · Port Harcourt Zone 3</div>
              <h1 className="font-display font-extrabold text-[2.4rem] md:text-[2.8rem] leading-none tracking-tight mt-2 text-navy">Testimonies</h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">
                Approved, respectful, consent-driven. {live.length ? `${live.length} live approved` : ''} plus curated seeds. Submitted → Pending → Approved/Published by admins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {featured && (
        <section className="section bg-white">
          <div className="container-cc">
            <div className="bg-haze border border-black/5 rounded-xl p-8 md:p-10">
              <div className="h-1 w-12 bg-vermilion rounded-full" />
              <p className="font-display font-extrabold text-[1.5rem] md:text-[2rem] leading-tight mt-4 text-navy">“{featured.body}”</p>
              <div className="mt-4 text-sm font-semibold text-navy">
                {featured.name} · {featured.category} · {featured.date?.slice(0, 10)}
              </div>
              <div className="text-xs text-muted mt-1">{featured.title}</div>
            </div>
          </div>
        </section>
      )}

      <section className="section bg-haze">
        <div className="container-cc grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <div>
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-3.5 py-1.5 text-xs font-semibold border transition ${filter === c ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-black/10 hover:border-gold/30'}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="text-xs text-muted mt-3">
              {filtered.length} testimonies {filter !== 'All' && `· ${filter}`}
            </div>
            <div className="mt-6 space-y-4">
              {filtered.map((t: any) => (
                <div key={t.id} className="bg-white border border-black/5 rounded-xl p-6">
                  <div className="flex items-center gap-2">
                    <span className="bg-gold/15 text-navy px-2.5 py-1 text-xs font-bold tracking-wide border border-gold/20">{t.category}</span>
                    {(t as any).status && (
                      <span className={`px-2 py-1 text-xs font-bold border ${ (t as any).status === 'published' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>
                        {(t as any).status}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-extrabold leading-tight mt-3 text-navy">{t.title}</h3>
                  <p className="text-sm leading-7 text-slate-600 mt-2">“{t.body}”</p>
                  <div className="text-sm font-semibold text-navy mt-3">
                    {t.name} · <span className="text-muted font-normal">{t.date?.slice(0, 10)}</span>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <div className="bg-white border border-black/5 rounded-xl p-8 text-center text-sm text-muted">No testimonies in this category — be the first to share.</div>}
            </div>
          </div>
          <div className="lg:sticky lg:top-24 self-start">
            <TestimonyForm />
          </div>
        </div>
      </section>
    </>
  )
}
