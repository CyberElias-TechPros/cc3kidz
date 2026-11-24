'use client'
import { useState } from 'react'
import { site } from '@/lib/site'

function toWaLink(phone: string, text?: string) {
  const digits = phone.replace(/\D/g, '').replace(/^0/, '234')
  // ensure starts with 234
  const normalized = digits.startsWith('234') ? digits : `234${digits.replace(/^234/, '')}`
  const base = `https://wa.me/${normalized}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

const DEFAULT_MSG = 'Hello CE Central Church 3, I have a question.'

export default function FloatingHelpButton() {
  const [open, setOpen] = useState(false)
  const numbers: readonly string[] = (site as any).phones || [site.phone, site.whatsapp].filter(Boolean)
  const primary = numbers[0] || site.phone

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3" aria-live="polite">
      {open && (
        <div
          className="w-[min(360px,calc(100vw-24px))] bg-white border border-black/10 rounded-2xl shadow-[0_20px_40px_-16px_rgba(14,27,51,0.28)] overflow-hidden animate-fadeUp"
          role="dialog"
          aria-label="Contact help"
          aria-modal="false"
        >
          <div className="bg-navy text-white px-5 py-4 flex items-start justify-between gap-3">
            <div>
              <div className="font-display font-extrabold leading-none text-[0.95rem]">Ask a Question</div>
              <div className="text-[0.72rem] text-white/75 mt-1">We&apos;d love to help — reach us anytime</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close help panel"
              className="h-8 w-8 grid place-items-center rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white shrink-0"
            >
              ✕
            </button>
          </div>

          <div className="p-4 space-y-3">
            <div className="flex gap-2">
              <a
                href={toWaLink(primary, DEFAULT_MSG)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 btn btn--navy !py-3 !px-4 text-sm !rounded-full"
                onClick={() => setOpen(false)}
              >
                <span className="h-6 w-6 grid place-items-center rounded-full bg-white/15 text-[0.7rem]">◐</span>
                Chat with us
              </a>
              <a href={`tel:${primary}`} className="btn btn--ghost !py-3 !px-4 text-sm !rounded-full bg-white">
                Call
              </a>
            </div>
            <p className="text-[0.68rem] text-muted text-center">Tap to start a conversation — we reply same day</p>

            <div className="border-t border-black/5 pt-3">
              <div className="text-[0.62rem] font-bold tracking-[0.1em] uppercase text-muted mb-2">Contact lines</div>
              <div className="grid gap-2">
                {numbers.map((num) => (
                  <div key={num} className="flex items-center justify-between gap-2 bg-haze border border-black/5 rounded-full px-2 py-1.5">
                    <a href={`tel:${num}`} className="text-[0.78rem] font-semibold text-navy px-2 py-1 rounded-full hover:bg-white transition">
                      {num}
                    </a>
                    <div className="flex gap-1 shrink-0">
                      <a
                        href={toWaLink(num, DEFAULT_MSG)}
                        target="_blank"
                        rel="noreferrer"
                        className="h-7 px-3 grid place-items-center rounded-full bg-navy text-white text-[0.68rem] font-bold hover:bg-navy-800"
                      >
                        Chat
                      </a>
                      <a href={`tel:${num}`} className="h-7 px-3 grid place-items-center rounded-full bg-white border border-black/10 text-navy text-[0.68rem] font-bold">
                        Call
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <a href="/contact" className="flex-1 text-center text-[0.74rem] font-semibold text-navy underline underline-offset-4 py-2" onClick={() => setOpen(false)}>
                Visit contact page
              </a>
              <a href="/prayer" className="flex-1 text-center text-[0.74rem] font-semibold text-navy underline underline-offset-4 py-2" onClick={() => setOpen(false)}>
                Prayer & Counselling
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close help' : 'Ask a question — contact help'}
        className={`group inline-flex items-center gap-3 rounded-full border shadow-[0_12px_32px_-12px_rgba(14,27,51,0.35)] transition-all ${
          open ? 'bg-white border-black/10 text-navy px-5 py-3' : 'bg-navy border-navy text-white px-5 py-3 hover:bg-navy-800'
        }`}
      >
        <span className={`h-9 w-9 grid place-items-center rounded-full border text-sm shrink-0 transition ${open ? 'bg-haze border-black/10 text-navy' : 'bg-white/10 border-white/15 text-white group-hover:bg-white/15'}`}>
          {open ? '✕' : '？'}
        </span>
        <span className="text-left leading-tight">
          <span className={`block text-[0.82rem] font-extrabold tracking-tight ${open ? 'text-navy' : 'text-white'}`}>
            {open ? 'Close' : 'Ask a Question'}
          </span>
          <span className={`block text-[0.62rem] font-semibold tracking-wide uppercase ${open ? 'text-muted' : 'text-white/75'}`}>
            {open ? 'Hide contacts' : 'Need help? Chat with us'}
          </span>
        </span>
      </button>
    </div>
  )
}
