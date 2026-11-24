import Link from 'next/link'
import './teens.css'

export const metadata = { title: 'CC3 Teens Church — A Generation Set Apart | 13–19' }

/* Spec reference: Screen T01 — Homepage (Highest priority)
   Palette: #172B76 #315BFF #7954E8 #FF8C70 #F5F6FC #151B2D
   Type: Space Grotesk / Plus Jakarta Sans / Inter
   Content is placeholder-verified: no invented CC3 leadership/stats used as fact
*/
export default function TeensPage() {
  return (
    <div className="teens-scope">
      {/* ========== HERO — Spec: large editorial headline + intro + real photography ========== */}
      <section className="teens-hero">
        <div className="container-cc relative py-7 md:py-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
            <div>
              <div className="teens-kicker">
                <span className="h-2 w-2 rounded-full bg-[#FF8C70] animate-pulse" />
                CC3 Teens Church · Port Harcourt Zone 3
                <span className="hidden sm:inline-flex ml-2 rounded-full bg-[#172B76] text-white px-2.5 py-0.5 text-[10px] font-black tracking-widest">13–19</span>
              </div>

              <h1 className="teens-title mt-5 font-teens-display">
                A Generation
                <br />
                <em>Set Apart.</em>
              </h1>

              <p className="teens-subtitle mt-4 font-teens-body">
                Discover a place to grow in the Word, develop your gifts, build meaningful friendships and make a positive difference. CC3 Teens Church — a local expression of Christ Embassy, raised in the Word and the Spirit.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/teens/church" className="inline-flex items-center gap-2 rounded-full bg-[#172B76] text-white px-6 py-3 text-sm font-bold hover:bg-[#12205e] transition">
                  Discover Teens Church <span>→</span>
                </Link>
                <Link href="/teens/word" className="inline-flex items-center gap-2 rounded-full bg-white border border-[#172B76]/10 text-[#151B2D] px-6 py-3 text-sm font-bold hover:border-[#7954E8]/30 transition">
                  Explore the Word Centre
                </Link>
              </div>

              {/* Trust stats — verifiable only */}
              <div className="mt-7 grid grid-cols-3 gap-3 max-w-[560px]">
                {[
                  { k: '13–19', v: 'Teenagers', sub: 'JSS · SS · University entry' },
                  { k: 'TeeVo', v: 'Daily devotional', sub: 'Link to official resource' },
                  { k: 'TITHE', v: 'Teens evangelism', sub: 'Every teen a soul winner' },
                ].map(s => (
                  <div key={s.k} className="teens-stat">
                    <div className="text-xs font-black tracking-wide text-[#151B2D] font-teens-heading">{s.k}</div>
                    <div className="text-[11px] font-bold text-[#315BFF]">{s.v}</div>
                    <div className="text-[10px] text-slate-500 leading-tight">{s.sub}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#172B76]" /> Sundays 8AM · During Main Celebration
                </span>
                <span className="hidden sm:inline text-black/10">·</span>
                <span>30B Rumuokwuta / NTA Road, Port Harcourt</span>
                <span className="hidden sm:inline text-black/10">·</span>
                <Link href="/teens/connect" className="underline decoration-[#7954E8]/30 underline-offset-4 hover:text-[#172B76]">
                  Parent info →
                </Link>
              </div>
            </div>

            {/* Right — editorial photo composition (real CC3 where available, stock marked as exploration only) */}
            <div className="relative">
              <div className="rounded-[22px] overflow-hidden border border-[#172B76]/10 bg-white p-3 shadow-[0_20px_40px_-18px_rgba(23,43,118,0.2)]">
                <div className="grid grid-cols-[1.25fr_0.8fr] gap-3">
                  <div className="rounded-[16px] overflow-hidden bg-[#F5F6FC] aspect-[4/3] relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/images/cc3/service-congregation.jpg" alt="CC3 Teens — worship and Word (placeholder: replace with verified CC3 Teens photo)" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute bottom-2 left-2 rounded-full bg-[#172B76] text-white px-3 py-1 text-[10px] font-black tracking-wide">WORSHIP · WORD · PRAYER</div>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-[14px] bg-white border border-[#7954E8]/10 p-4">
                      <div className="text-[10px] font-black tracking-widest uppercase text-[#7954E8]">TeeVo today</div>
                      <div className="text-xs font-extrabold leading-tight text-[#151B2D] mt-1">You&apos;re God&apos;s Chosen & Set Apart</div>
                      <div className="text-[11px] leading-5 text-slate-500 mt-1">“You are a chosen generation…” — 1 Peter 2:9</div>
                      <a href="https://teevo.org" target="_blank" rel="noreferrer" className="mt-2 inline-flex rounded-full bg-[#315BFF] text-white px-3 py-1 text-[11px] font-bold">
                        Read on TeeVo →
                      </a>
                    </div>
                    <div className="rounded-[14px] p-4 text-white" style={{ background: '#172B76' }}>
                      <div className="text-[11px] font-black uppercase tracking-wide text-white/80">Next gathering</div>
                      <div className="text-sm font-black leading-tight mt-1">Teens Church — Sunday 8AM</div>
                      <div className="text-[11px] text-white/70">Check-in at welcome desk · Supervised</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {[
                    { n: 'TeeVo Clubs', a: 'Schools', c: '#7954E8' },
                    { n: 'TITHE', a: 'Outreach', c: '#FF8C70' },
                    { n: 'Creative', a: 'Gifts & Teams', c: '#315BFF' },
                  ].map(b => (
                    <div key={b.n} className="rounded-xl bg-[#F5F6FC] border border-black/5 p-3 text-center">
                      <div className="mx-auto h-8 w-8 rounded-full grid place-items-center text-white font-black text-xs" style={{ background: b.c }}>
                        ✦
                      </div>
                      <div className="text-[11px] font-black text-[#151B2D] mt-1">{b.n}</div>
                      <div className="text-[10px] text-slate-500">{b.a}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-xl bg-[#FFF4F0] border border-[#FF8C70]/15 px-3 py-2 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#151B2D]">Photography: placeholders — replace with verified CC3 Teens media</span>
                  <span className="text-[10px] font-black tracking-widest uppercase text-[#FF8C70]">Verified only</span>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-2 hidden md:flex items-center gap-2 rounded-full bg-white shadow-xl border border-black/5 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-[#151B2D]">Safe · Supervised · Parent-aware</span>
              </div>
            </div>
          </div>

          {/* Meeting info strip — spec: small meeting information strip */}
          <div className="mt-8 grid grid-cols-3 divide-x divide-black/5 rounded-2xl bg-white border border-[#172B76]/10 overflow-hidden max-w-[720px]">
            {[
              { k: 'Sundays', v: '8:00 AM · Teens Church' },
              { k: 'Venue', v: '30B Rumuokwuta — Group Church' },
              { k: 'First time?', v: 'Welcome desk · New Here →' },
            ].map(s => (
              <div key={s.k} className="px-4 py-3 text-center">
                <div className="text-[10px] font-black tracking-widest uppercase text-[#7954E8]">{s.k}</div>
                <div className="text-xs font-bold text-[#151B2D] mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WELCOME — What CC3 Teens Church is ========== */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="grid lg:grid-cols-[0.9fr_1.15fr] gap-8 items-start">
            <div>
              <div className="teens-pill bg-[#315BFF]/10 text-[#172B76] border border-[#315BFF]/15">Welcome</div>
              <h2 className="font-teens-heading font-extrabold text-[2rem] leading-none tracking-tight mt-3 text-[#151B2D]">There&apos;s a place for you to belong — and become.</h2>
              <p className="text-sm leading-7 text-slate-600 mt-3">
                Not a side programme. CC3 Teens Church is the teenage expression of Christ Embassy Central Church 3 — teenagers growing spiritually, finding purpose and influencing their generation. LoveWorld Nation → Port Harcourt Zone 3 → CC3 Group Church → Teens Church.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/teens/about" className="rounded-full bg-[#151B2D] text-white px-5 py-2.5 text-xs font-bold">
                  Our Identity →
                </Link>
                <Link href="/about" className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-xs font-bold hover:border-[#7954E8]/30">
                  Christ Embassy Vision
                </Link>
              </div>
              <p className="mt-4 text-[11px] leading-5 text-slate-500 border-l-2 border-[#FF8C70]/30 pl-3">
                Content status: placeholder — vision, history, leadership and activities to be verified by Teens Church Pastor / Group Pastor before launch.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { t: 'Know the Word', d: 'TeeVo-rooted teaching on identity, faith & character — every week.', icon: '✦' },
                { t: 'Find Your People', d: 'Real friendships — small groups, not crowds. Safe, supervised.', icon: '◐' },
                { t: 'Use Your Gifts', d: 'Music, media, drama, dance, tech — your talent has a place now.', icon: '✺' },
              ].map(c => (
                <div key={c.t} className="teens-card p-5">
                  <div className="h-9 w-9 rounded-xl bg-[#7954E8]/10 border border-[#7954E8]/15 grid place-items-center text-[#7954E8] font-black">{c.icon}</div>
                  <div className="text-sm font-black text-[#151B2D] mt-3 font-teens-heading">{c.t}</div>
                  <div className="text-xs leading-5 text-slate-600 mt-1">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== IDENTITY — Vision / Mission / Values ========== */}
      <section className="section" style={{ background: '#F5F6FC' }}>
        <div className="container-cc">
          <div className="flex items-baseline justify-between gap-4">
            <div className="teens-pill bg-white border border-black/5 text-[#151B2D]">Identity</div>
            <Link href="/teens/about" className="hidden sm:inline-flex text-xs font-bold text-[#315BFF]">
              Vision & Beliefs →
            </Link>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { k: 'Vision', t: 'A Generation Set Apart', d: 'Raising teenagers established in the Word, filled with the Spirit, conscious of identity in Christ.', c: '#172B76' },
              { k: 'Mission', t: 'Grow, Equip, Send', d: 'Nurture through the Word, fellowship, mentorship, creative expression & evangelism.', c: '#7954E8' },
              { k: 'Beliefs', t: 'Same Foundation', d: 'One faith — Bible as infallible Word, New Creation, Holy Spirit, faith & soul-winning.', c: '#FF8C70' },
            ].map(b => (
              <div key={b.k} className="teens-card p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full" style={{ background: b.c }} />
                <div className="text-[10px] font-black tracking-widest uppercase" style={{ color: b.c }}>
                  {b.k}
                </div>
                <div className="font-teens-heading font-extrabold text-lg mt-1 text-[#151B2D]">{b.t}</div>
                <div className="text-sm leading-6 text-slate-600 mt-2">{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curved organic divider — Teens graphic language */}
      <div className="teens-organic-divider" aria-hidden>
        <svg viewBox="0 0 1440 36" preserveAspectRatio="none">
          <path d="M0 36 Q 360 0 720 18 T 1440 36 L 1440 0 L 0 0 Z" fill="#FFFFFF" />
        </svg>
      </div>

      {/* ========== WORD CENTRE — TeeVo / Bible study / Scripture challenges ========== */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="teens-pill bg-[#FF8C70]/10 text-[#7a2b1a] border border-[#FF8C70]/15">Word Centre</div>
              <h2 className="font-teens-heading font-extrabold text-2xl tracking-tight mt-3 text-[#151B2D]">TeeVo, Bible study & Scripture challenges — daily, not just Sunday.</h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">Official LoveWorld resources, locally nurtured. Link, don&apos;t republish — build a daily habit. Searchable resource categories.</p>
            </div>
            <Link href="/search" className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#F5F6FC] border border-black/5 px-4 py-2 text-xs font-bold text-[#172B76]">
              ⌕ Search Word Centre
            </Link>
          </div>

          <div className="mt-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-4">
            <Link href="/teens/word" className="teens-card p-6 text-white relative overflow-hidden block hover:border-[#7954E8]/20" style={{ background: '#172B76' }}>
              <div className="absolute inset-0 opacity-25" style={{ background: 'radial-gradient(420px 220px at 18% 0%, #7954E8, transparent)' }} />
              <div className="relative">
                <div className="inline-flex rounded-full bg-white text-[#151B2D] px-3 py-1 text-[10px] font-black tracking-widest">TEEVO TODAY — OFFICIAL LINK</div>
                <div className="font-teens-display font-extrabold text-xl mt-3 leading-tight">Your daily devotional — Scripture, message, prayer & confession.</div>
                <div className="text-sm leading-6 text-white/75 mt-2">1 Peter 2:9 · Read on teevo.org — we link to the official resource, never copy copyrighted content.</div>
                <div className="mt-4 inline-flex rounded-full bg-[#FF8C70] text-white px-4 py-2 text-xs font-black">Open TeeVo →</div>
              </div>
            </Link>

            <div className="grid grid-rows-3 gap-3">
              {[
                { t: 'Bible Study Centre', d: 'Identity · Faith · Holy Spirit · Purpose — topical studies.', href: '/teens/word' },
                { t: 'Reading Plans', d: '30 Days in the Word — progress stored locally, private.', href: '/teens/word' },
                { t: 'Quizzes & Challenges', d: 'Memory verse, Bible quiz, application tasks — with friends.', href: '/teens/word' },
              ].map(c => (
                <Link key={c.t} href={c.href} className="teens-card p-4 flex items-center justify-between gap-3 hover:border-[#315BFF]/15">
                  <div>
                    <div className="text-sm font-black text-[#151B2D] font-teens-heading">{c.t}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{c.d}</div>
                  </div>
                  <span className="h-8 w-8 rounded-full bg-[#315BFF]/10 grid place-items-center text-[#315BFF] shrink-0">→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Resource detail affordance */}
          <div className="mt-4 grid md:grid-cols-4 gap-3 text-xs">
            {[
              'Devotionals · Bible studies · Scripture memory',
              'Bible reading plans · Teachings · Quizzes',
              'Search + categories — no login required to read',
              'Related resources · Attribution · Date — on every page',
            ].map(t => (
              <div key={t} className="rounded-full bg-[#F5F6FC] border border-black/5 px-4 py-2 text-center font-semibold text-[#151B2D]">
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MINISTRY ACTIVITIES — TeeVo Clubs (T09) + TITHE (T10) ========== */}
      <section className="section" style={{ background: '#FFF7F2' }}>
        <div className="container-cc">
          <div className="teens-pill bg-white border border-black/5 text-[#151B2D]">Ministry activities</div>
          <h2 className="font-teens-heading font-extrabold text-2xl mt-3 text-[#151B2D]">TeeVo Clubs, TITHE & real ministry.</h2>
          <p className="text-sm text-slate-600 mt-1">Global TeeVo Clubs & TITHE concepts, with CC3 local expression clearly distinguished. Verified clubs only.</p>

          <div className="mt-6 grid lg:grid-cols-2 gap-4">
            <div className="teens-card p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 rounded-full bg-[#7954E8] text-white px-3 py-1 text-[10px] font-black tracking-widest">GLOBAL · LOCAL</div>
              <div className="text-[10px] font-black tracking-widest uppercase text-[#7954E8]">TeeVo Clubs — Screen T09</div>
              <h3 className="font-teens-heading font-extrabold text-xl mt-1 text-[#151B2D]">Take TeeVo to your school.</h3>
              <p className="text-sm leading-6 text-slate-600 mt-2">
                Weekly Bible study & discussion right where you are — schools and neighbourhoods. Supervised, authorised. No school names or student identities published without approval.
              </p>
              <ul className="mt-3 space-y-1 text-xs leading-5 text-slate-600">
                <li>• How clubs operate · Official LoveWorld context</li>
                <li>• Approved CC3 club directory (verified only) · Activity reports</li>
                <li>• Enquiry process — routed to authorised coordinator</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/teens/activities" className="rounded-full bg-[#151B2D] text-white px-4 py-2 text-xs font-bold">
                  How TeeVo Clubs Work →
                </Link>
                <Link href="/teens/connect" className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold">
                  Find a Club
                </Link>
              </div>
              <div className="mt-4 rounded-xl bg-[#F5F6FC] border border-[#7954E8]/10 p-3 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#7954E8] animate-pulse" />
                <span className="text-xs font-bold text-[#151B2D]">Zone 3 historical reference: 108 TeeVo Clubs (June 2019) — not current CC3 count</span>
              </div>
            </div>

            <div className="teens-card p-6 border-[#FF8C70]/20">
              <div className="text-[10px] font-black tracking-widest uppercase text-[#FF8C70]">TITHE & Outreach — Screen T10</div>
              <h3 className="font-teens-heading font-extrabold text-xl mt-1 text-[#151B2D]">Every teenager a soul winner.</h3>
              <p className="text-sm leading-6 text-slate-600 mt-2">Global Teens Ministry evangelism — teens reaching teens in streets and schools with the Gospel. Local outreaches distinguished from global initiative.</p>
              <ul className="mt-3 space-y-1 text-xs leading-5 text-slate-600">
                <li>• Initiative intro · LoveWorld official info · CC3 local records</li>
                <li>• Upcoming outreaches · Media · Reports · Participation route</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/teens/activities" className="rounded-full bg-[#FF8C70] text-white px-4 py-2 text-xs font-bold">
                  TITHE →
                </Link>
                <Link href="/outreach" className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold">
                  Outreach Reports
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== EVENTS — T12/T13 — 3 featured + numbered identities ========== */}
      <section className="section" style={{ background: '#F5F6FC' }}>
        <div className="container-cc">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <div className="teens-pill bg-white border border-black/5 text-[#151B2D]">Events</div>
              <h2 className="font-teens-heading font-extrabold text-2xl mt-3 text-[#151B2D]">What&apos;s happening?</h2>
            </div>
            <Link href="/teens/events" className="rounded-full bg-[#172B76] text-white px-4 py-2 text-xs font-bold hidden sm:inline-flex">
              All events →
            </Link>
          </div>

          {/* Empty state handling — if no published events, show welcoming intro (spec T01) */}
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { n: '01', t: 'Teens Church — Sunday', d: 'Worship, Word & fellowship · Every Sunday 8AM', badge: 'Weekly', c: '#315BFF', href: '/teens/events' },
              { n: '02', t: 'TeeVo Club Rally', d: 'Schools gathering — Bible challenge & outreach (TBC, verified date required)', badge: 'Monthly', c: '#7954E8', href: '/teens/events' },
              { n: '03', t: 'TITHE Campaign', d: 'Street & school evangelism — teams + follow-up · Authorised coordinator only', badge: 'As announced', c: '#FF8C70', href: '/teens/events' },
            ].map(e => (
              <div key={e.t} className="teens-card p-5 relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="inline-flex rounded-full text-white px-3 py-1 text-[10px] font-black tracking-widest uppercase" style={{ background: e.c }}>
                    {e.badge}
                  </div>
                  <div className="teens-event-num">{e.n}</div>
                </div>
                <div className="font-teens-heading font-black text-[#151B2D] mt-2 leading-tight">{e.t}</div>
                <div className="text-xs leading-5 text-slate-600 mt-1">{e.d}</div>
                <Link href={e.href} className="mt-3 inline-flex text-xs font-black" style={{ color: e.c }}>
                  View details →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-white border border-black/5 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-600">
              <b className="text-[#151B2D]">No upcoming events?</b> We show a welcoming ministry introduction instead of an empty grid — registration only when required, guardian-aware, no public attendee lists.
            </div>
            <Link href="/teens/events" className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold">
              Past events archive
            </Link>
          </div>
        </div>
      </section>

      {/* ========== CREATIVE DISCOVERY — T11 — Departments ========== */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="teens-pill text-white" style={{ background: '#172B76' }}>
            Creative discovery
          </div>
          <h2 className="font-teens-heading font-extrabold text-2xl mt-3 text-[#151B2D]">Discover your gifts — serve, create, lead.</h2>
          <p className="text-sm text-slate-600 mt-1">Proposed departments, verified before shown as active. Each has purpose, activities, leader contact route, requirements.</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { n: 'Music & Worship', s: 'Choir · Instruments' },
              { n: 'Media', s: 'Photo · Sound · Stream' },
              { n: 'Graphics', s: 'Design · Slides' },
              { n: 'Drama & Arts', s: 'Skits · Spoken · Dance' },
              { n: 'Technical', s: 'Support · Setup' },
              { n: 'Hospitality', s: 'Ushering · Welcome' },
              { n: 'Evangelism', s: 'TITHE Teams' },
              { n: 'Prayer', s: 'Intercession · Follow-up' },
            ].map(c => (
              <div key={c.n} className="teens-card p-4 text-center">
                <div className="mx-auto h-10 w-10 rounded-xl text-white grid place-items-center font-black" style={{ background: '#315BFF' }}>
                  ✦
                </div>
                <div className="text-[11px] font-black text-[#151B2D] mt-2 font-teens-heading">{c.n}</div>
                <div className="text-[10px] leading-tight text-slate-500">{c.s}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[16px] text-white p-5 flex flex-col md:flex-row items-center justify-between gap-4" style={{ background: '#151B2D' }}>
            <div>
              <div className="font-teens-heading font-black">Showcase your gift</div>
              <div className="text-sm text-white/70">Talent showcases, services & outreaches — parent-invited, consent-published.</div>
            </div>
            <Link href="/teens/gifts" className="rounded-full bg-white text-[#151B2D] px-5 py-2.5 text-xs font-black shrink-0">
              Explore Departments →
            </Link>
          </div>
        </div>
      </section>

      {/* ========== MEDIA — T14 ========== */}
      <section className="section" style={{ background: '#F5F6FC' }}>
        <div className="container-cc">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <div className="teens-pill bg-white border border-black/5 text-[#151B2D]">Media library</div>
              <h2 className="font-teens-heading font-extrabold text-2xl mt-3 text-[#151B2D]">Teaching, worship & ministry media</h2>
            </div>
            <Link href="/teens/resources" className="hidden sm:inline-flex rounded-full bg-white border border-black/10 px-4 py-2 text-xs font-bold">
              All media →
            </Link>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { k: 'Teaching', t: 'Faith & Identity — Pastor (TBC)', d: 'Approved teaching preview · T15–20 min · With transcript' },
              { k: 'Worship', t: 'Teens Choir — “We Are Set Apart”', d: 'Ministry media · Photography only with consent' },
              { k: 'Event report', t: 'TITHE Outreach — February (sample)', d: 'Sample report card · Will show verified CC3 reports only' },
            ].map(m => (
              <div key={m.t} className="teens-card p-5">
                <div className="text-[10px] font-black tracking-widest uppercase" style={{ color: '#7954E8' }}>
                  {m.k}
                </div>
                <div className="font-teens-heading font-bold text-[#151B2D] mt-1 leading-tight">{m.t}</div>
                <div className="text-xs leading-5 text-slate-600 mt-1">{m.d}</div>
                <div className="mt-3 text-xs font-bold text-[#315BFF]">Watch / Listen →</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center text-[11px] text-slate-500">Search · Category filtering · Featured · Video/audio playback · Related content — only with ownership & consent.</div>
        </div>
      </section>

      {/* ========== PARENTS & GUARDIANS — T18 — Prominent, not footer link ========== */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="rounded-[20px] text-white p-6 md:p-8 grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-center" style={{ background: '#151B2D' }}>
            <div>
              <div className="teens-pill bg-white/10 border border-white/15 text-white">Parents & Guardians — Screen T18</div>
              <h2 className="font-teens-heading font-extrabold text-2xl mt-3 leading-tight">We take trust seriously.</h2>
              <p className="text-sm leading-6 text-white/70 mt-2">
                A dedicated section for parents: ministry vision, leadership & accountability, meeting arrangements, FAQs, media consent, safeguarding, event arrangements and a monitored enquiry channel.
              </p>
              <ul className="mt-3 space-y-1 text-xs leading-5 text-white/70">
                <li>• Supervised rooms · Vetted volunteers · No private DMs</li>
                <li>• Media/events only with consent · Concerns → Group Pastor → Zonal office</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/teens/connect" className="rounded-full bg-white text-[#151B2D] px-5 py-2.5 text-xs font-black">
                  Parent Information
                </Link>
                <Link href="/safeguarding" className="rounded-full border border-white/20 text-white px-5 py-2.5 text-xs font-bold">
                  Safeguarding
                </Link>
              </div>
            </div>
            <div className="rounded-[16px] bg-white p-5 text-[#151B2D]">
              <div className="text-xs font-black tracking-widest uppercase text-[#315BFF]">At a glance for parents</div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>
                  • <b className="text-[#151B2D]">Teachings:</b> Identity, faith, purpose — TeeVo & Bible, Christ Embassy doctrine
                </li>
                <li>
                  • <b className="text-[#151B2D]">Leaders:</b> Appointed, trained, supervised — no private contact
                </li>
                <li>
                  • <b className="text-[#151B2D]">Meets:</b> Sundays 8AM during Main Service — 30B Rumuokwuta (Group Church)
                </li>
                <li>
                  • <b className="text-[#151B2D]">Enquiry:</b> Moderated form → authorised coordinator (monitored)
                </li>
                <li>
                  • <b className="text-[#151B2D]">Safeguarding:</b> Restricted-access process · Escalation documented
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== VISIT CTA — T19 ========== */}
      <section className="section" style={{ background: '#F5F6FC' }}>
        <div className="container-cc">
          <div className="rounded-[20px] bg-white border border-black/5 p-6 md:p-7 grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
            <div>
              <div className="text-[10px] font-black tracking-widest uppercase text-[#172B76]">Visit & Contact — Screen T19</div>
              <h2 className="font-teens-heading font-extrabold text-2xl mt-2 text-[#151B2D]">Plan your first visit</h2>
              <p className="text-sm leading-6 text-slate-600 mt-2">Come this Sunday — welcome desk from 7:30AM. First-time teenagers and parents: start at New Here, then check meeting info, visitor arrangements and FAQs.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/teens/church" className="rounded-full bg-[#172B76] text-white px-5 py-2.5 text-xs font-bold">
                  New Here? Start here →
                </Link>
                <Link href="/teens/connect" className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-xs font-bold">
                  Contact & Directions
                </Link>
                <a href="https://maps.google.com/?q=4.8396,6.9848" target="_blank" rel="noreferrer" className="rounded-full bg-[#FF8C70] text-white px-5 py-2.5 text-xs font-bold">
                  Open Map
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/5 bg-[#F5F6FC] p-4">
              <div className="text-xs font-black text-[#151B2D]">Contact (verified before launch)</div>
              <div className="text-xs leading-5 text-slate-600 mt-1">CC3 Group Church · 30B Rumuokwuta/NTA Road · PH Zone 3 · Phones/emails to be confirmed by secretariat.</div>
              <div className="mt-3 text-[11px] text-slate-500">Enquiry form: minimal fields, guardian-aware, appropriate consent — no public attendee lists.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== GENERATION MESH ========== */}
      <section className="section" style={{ background: '#FFF7F2' }}>
        <div className="container-cc">
          <h3 className="font-teens-heading font-black text-center text-[#151B2D]">One Church — Every Generation</h3>
          <p className="text-sm text-center text-slate-600 mt-1">Teens is one expression — find your family. Shared affiliation signature, distinct identities.</p>
          <div className="mt-6 grid md:grid-cols-4 gap-3">
            {[
              { h: 'Main Church', p: 'Sunday 8AM Celebration — the home hub', href: '/' },
              { h: 'Youth Church', p: '20–35 · Established, empowered, positioned', href: '/youth' },
              { h: 'Kids Church', p: '4–12 · Champions for Christ', href: '/kids' },
              { h: 'Cells & Foundation', p: 'Weekly fellowship & discipleship', href: '/cells' },
            ].map(b => (
              <Link key={b.h} href={b.href} className="teens-card p-4 block">
                <div className="text-sm font-black text-[#151B2D] font-teens-heading">{b.h}</div>
                <div className="text-xs leading-5 text-slate-600 mt-1">{b.p}</div>
                <div className="text-xs font-black mt-2" style={{ color: '#315BFF' }}>
                  Visit →
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center text-[11px] text-slate-500">CC3 / Christ Embassy Port Harcourt Zone 3 · LoveWorld affiliation · Content collection: 0/14 — placeholders until verified.</div>
        </div>
      </section>
    </div>
  )
}
