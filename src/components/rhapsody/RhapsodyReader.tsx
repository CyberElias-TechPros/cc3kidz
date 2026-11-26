'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { Devotional } from '@/lib/rhapsody/types'
import { recordRead } from '@/lib/gamification/engine'

export function RhapsodyReader({ d, church }: { d: Devotional; church: 'main'|'youth'|'teens'|'kids' }) {
  const [completed, setCompleted] = useState(false)
  const audience = d.audience
  const quizHref = `/${church === 'main' ? 'rhapsody' : church}/quiz/${d.slug}`

  useEffect(() => {
    // track view for analytics (local)
    try {
      const key = `cc3:rhapsody:view:${d.slug}`
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, new Date().toISOString())
      }
    } catch {}
  }, [d.slug])

  const handleComplete = () => {
    recordRead(d.slug, audience)
    setCompleted(true)
  }

  const messageParagraphs = useMemo(() => {
    // body already has all, but we will render message + extras cleanly
    return d.body.split('\n\n')
  }, [d.body])

  return (
    <article className="card overflow-hidden">
      {/* header */}
      <div className="bg-navy text-white p-6">
        <div className="text-xs font-bold tracking-widest uppercase text-gold">
          {d.series} · {d.editionTitle} · {d.weekday}, {d.date}
        </div>
        <h1 className="font-display font-extrabold text-2xl leading-tight mt-2">{d.title}</h1>
        {d.subtitle && <div className="text-sm text-white/80 mt-1">{d.subtitle}</div>}
        <div className="mt-3 rounded-xl bg-white/10 border border-white/15 p-3">
          <div className="text-xs font-bold tracking-wide text-gold">Opening Scripture</div>
          <div className="text-sm leading-6 text-white mt-1">“{d.scripture}”</div>
          <div className="text-xs font-semibold text-white/70 mt-1">{d.scriptureReference}</div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1">{d.readingMinutes} min read</span>
          <span className="rounded-full bg-white/10 border border-white/20 px-3 py-1">{d.words ?? '—'} words</span>
          <Link href={quizHref} className="rounded-full bg-gold text-navy px-3 py-1 font-bold">Take Quiz →</Link>
        </div>
      </div>

      {/* body */}
      <div className="p-6 prose max-w-none">
        {messageParagraphs.map((para, i) => {
          if (!para.trim()) return null
          if (para.trim().startsWith('## ')) {
            const t = para.trim().replace(/^##\s+/, '')
            return <h3 key={i} className="font-display font-extrabold text-navy mt-6 mb-2">{t}</h3>
          }
          if (para.trim().startsWith('**') && para.trim().endsWith('**')) {
            return <p key={i} className="text-sm font-bold text-navy bg-haze rounded-lg px-3 py-2">{para.replace(/\*\*/g,'')}</p>
          }
          return <p key={i} className="text-[15px] leading-7 text-slate-700 mt-3">{para}</p>
        })}

        {/* Prayer/Confession */}
        {d.prayer && (
          <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4">
            <div className="text-xs font-black tracking-widest uppercase text-amber-700">{d.prayerLabel}</div>
            <p className="text-sm leading-6 text-slate-800 mt-2 italic">“{d.prayer}”</p>
          </div>
        )}

        {/* Extras (Speak/Act for teens) */}
        {d.extras?.length > 0 && (
          <div className="mt-6 grid gap-3">
            {d.extras.map((e, i) => (
              <div key={i} className="rounded-xl border border-black/5 bg-haze p-4">
                <div className="text-xs font-black tracking-widest uppercase text-navy">{e.label}</div>
                <p className="text-sm leading-6 text-slate-700 mt-1">{e.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Further study & plans */}
        <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
          {d.furtherStudy && (
            <div className="rounded-xl bg-white border border-black/5 p-4">
              <div className="text-xs font-bold text-gold">Further Study</div>
              <div className="text-navy font-medium mt-1">{d.furtherStudy}</div>
            </div>
          )}
          {d.oneYearPlan && (
            <div className="rounded-xl bg-white border border-black/5 p-4">
              <div className="text-xs font-bold text-muted">1-Year Plan</div>
              <div className="text-slate-600 mt-1">{d.oneYearPlan}</div>
              {d.twoYearPlan && <div className="text-xs text-muted mt-1">2-Year: {d.twoYearPlan}</div>}
            </div>
          )}
        </div>

        <div className="mt-4 text-xs text-muted">Source: {d.series}, {d.editionTitle} Edition · Pages {d.sourcePages.join(', ') || '—'}</div>
      </div>

      {/* gamified CTA */}
      <div className="border-t border-black/5 bg-haze p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {!completed ? (
            <button onClick={handleComplete} className="btn btn--navy !py-2 text-xs">Mark as Read +{d.audience === 'teens' ? 15 : d.audience === 'early-readers' ? 10 : 20} XP</button>
          ) : (
            <span className="rounded-full bg-green-600 text-white px-3 py-1 text-xs font-bold">Completed ✓ +XP</span>
          )}
          <Link href={quizHref} className="btn btn--gold !py-2 text-xs">Take Quiz (20 XP each)</Link>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <span>Did this bless you?</span>
          <button onClick={() => navigator.share?.({ title: d.title, text: d.excerpt, url: window.location.href }).catch(()=>{})} className="rounded-full border border-black/10 bg-white px-3 py-1 hover:border-gold/30">Share →</button>
        </div>
      </div>
    </article>
  )
}
