import Link from 'next/link'
import './teens.css'

export const metadata = { title: 'CC3 Teens Church — A Generation Set Apart | 13–19' }

export default function TeensPage() {
  return (
    <div className="teens-scope">
      {/* ===== TASTE HERO — expressive indigo wave + oversized editorial ===== */}
      <section className="teens-taste-hero">
        <div className="teens-taste-hero__bg" aria-hidden />
        <div className="container-cc teens-taste-hero__inner">
          <div className="teens-taste-hero__left">
            <div className="teens-taste-kicker">
              <span className="h-2 w-2 rounded-full bg-[#FF8C70]" /> CC3 Teens Church • Port Harcourt Zone 3
            </div>
            <h1 className="teens-taste-title">
              <span>A GENERATION</span>
              <span className="accent">SET APART.</span>
            </h1>
            <p className="teens-taste-sub">Real faith. Real friends. Real purpose.<br />CC3 Teens Church — for teens 13 to 19</p>
            <Link href="/teens/church" className="teens-taste-cta">
              EXPLORE CC3 <span>→</span>
            </Link>
            <div className="teens-taste-meta">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/leaders/pastor-chris-oyakhilome.jpg" alt="" className="h-7 w-7 rounded-full object-cover border-2 border-white" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/leaders/pastor-linda-okocha.jpg" alt="" className="h-7 w-7 rounded-full object-cover border-2 border-white -ml-2" />
              <span className="text-xs font-bold text-[#0E1B33]">4.8K <span className="font-medium text-slate-500">Teens and counting</span></span>
            </div>
          </div>

          <div className="teens-taste-hero__right">
            <div className="teens-taste-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/main-family.webp" alt="Teens fellowship — placeholder, verified photo to replace" />
              {/* Floating TeeVo card */}
              <div className="teens-taste-float">
                <div className="text-[10px] font-black tracking-widest uppercase" style={{ color: '#315BFF' }}>● TEEVO</div>
                <div className="text-sm font-black leading-tight mt-1 text-[#0E1B33]">TODAY&apos;S TEEN,<br />TOMORROW&apos;S<br />IMPACT.</div>
                <div className="text-[11px] leading-4 text-slate-500 mt-2">You&apos;re not ordinary.<br />You&apos;re set apart.</div>
                <a href="https://teevo.org" target="_blank" rel="noreferrer" className="mt-3 inline-flex text-[11px] font-bold text-[#172B76]">READ TEEVO →</a>
              </div>
              <div className="teens-taste-badge">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" aria-hidden><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative scribble + dots like mockup */}
        <div className="teens-taste-scribble" aria-hidden>
          <svg viewBox="0 0 200 100" fill="none" stroke="#7954E8" strokeWidth="2" opacity="0.5"><path d="M10 30 C40 5, 60 80, 90 30 S140 80, 170 20" strokeLinecap="round"/></svg>
        </div>
      </section>

      {/* ===== UPCOMING EXPERIENCES — Gather. Grow. Go. ===== */}
      <section className="section bg-white" style={{ paddingTop: '2.5rem', paddingBottom: '2rem' }}>
        <div className="container-cc">
          <div className="grid lg:grid-cols-[0.9fr_1fr_1fr_1fr] gap-4 items-start">
            <div className="pr-4">
              <div className="text-[10px] font-black tracking-[0.14em] uppercase" style={{ color: '#7954E8' }}>UPCOMING EXPERIENCES</div>
              <h2 className="text-[2rem] font-black leading-none tracking-tight mt-2" style={{ fontFamily: 'var(--font-display), sans-serif', color: '#0E1B33' }}>
                Gather.<br />Grow. Go.
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full" style={{ background: '#7954E8' }} />
            </div>

            {[
              {
                n: '01',
                t: 'IGNITE NIGHTS',
                d: 'Worship. Word. Fire. Once a month, we gather and go deeper.',
                img: '/assets/images/cc3/service-congregation.jpg',
              },
              {
                n: '02',
                t: 'GROWTH HUB',
                d: 'Bible studies, mentorship & real talk for real life.',
                img: '/assets/images/cc3/service-chairs.jpg',
              },
              {
                n: '03',
                t: 'CITY REACH',
                d: 'Outreach. Impact. Changing lives in our city.',
                img: '/assets/images/main-family.webp',
              },
            ].map(card => (
              <article key={card.n} className="teens-taste-card">
                <div className="teens-taste-card__num">
                  <span className="num">{card.n}</span>
                  <span className="rule" />
                </div>
                <h3>{card.t}</h3>
                <p>{card.d}</p>
                <Link href="/teens/events" className="teens-taste-card__link">DETAILS <span>→</span></Link>
                <div className="teens-taste-card__img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.img} alt={card.t} />
                </div>
              </article>
            ))}
          </div>

          {/* Bottom strip */}
          <div className="mt-8 flex items-center justify-between rounded-2xl bg-[#0B1436] text-white px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full border border-white/20 grid place-items-center">→</span>
              <p className="text-sm"><span className="font-bold">More than a youth group.</span> We&apos;re a <span className="text-[#FF8C70] font-bold">family on mission.</span></p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-right">
              <div>
                <div className="text-xs font-black tracking-widest">13–19 YEARS</div>
                <div className="text-[10px] text-white/60">A Generation Set Apart</div>
              </div>
              <span className="text-[#7954E8] text-xl">✦</span>
            </div>
          </div>

          {/* Verified notice */}
          <div className="mt-4 text-center text-[11px] text-slate-400">TeeVo Clubs • TITHE outreaches • Creative departments — verified CC3 activities only. Stock/placeholder imagery to be replaced with approved media.</div>
        </div>
      </section>

      {/* ===== WORD & COMMUNITY STRIP — light ===== */}
      <section className="section" style={{ background: '#F5F6FC', padding: '2rem 0' }}>
        <div className="container-cc grid md:grid-cols-3 gap-4">
          {[
            { k: 'Word Centre', t: 'TeeVo daily — link, don’t republish', href: '/teens/word' },
            { k: 'TeeVo Clubs', t: 'Weekly Bible study in schools', href: '/teens/activities' },
            { k: 'Parents', t: 'Supervised, safeguarding, contact', href: '/teens/connect' },
          ].map(b => (
            <Link key={b.k} href={b.href} className="bg-white border border-black/5 rounded-2xl px-5 py-4 flex items-center justify-between hover:border-[#7954E8]/20 transition-colors">
              <div>
                <div className="text-xs font-black tracking-widest uppercase" style={{ color: '#7954E8' }}>{b.k}</div>
                <div className="text-sm font-bold text-[#0E1B33] mt-1">{b.t}</div>
              </div>
              <span className="h-8 w-8 rounded-full bg-[#172B76] text-white grid place-items-center text-sm">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== VISIT CTA ===== */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="rounded-[24px] overflow-hidden text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ background: 'linear-gradient(135deg,#0f1d4d 0%,#172B76 55%,#315BFF 100%)' }}>
            <div>
              <h3 className="text-xl font-black">Plan your first visit — Sundays 8AM</h3>
              <p className="text-sm text-white/80 mt-1">30B Rumuokwuta / NTA Road, Port Harcourt • Welcome desk from 7:30AM</p>
            </div>
            <div className="flex gap-2">
              <Link href="/teens/church" className="rounded-full bg-white text-[#172B76] px-5 py-2.5 text-sm font-black">New Here? →</Link>
              <Link href="/teens/connect" className="rounded-full border border-white/30 text-white px-5 py-2.5 text-sm font-bold">Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
