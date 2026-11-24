import Link from 'next/link'
import './youth.css'

export const metadata = { title: 'CC3 Youth Church — Made for Purpose | 20–35' }

/* Spec: Screen Y01 — Highest priority
   Palette: #101A2B #263B55 #C6A66B #E9E4DA #F7F6F2 #252B33
   Type: DM Serif Display / Manrope / Inter
   Cinematic hero (60%), editorial, restrained gold
*/
export default function YouthPage() {
  return (
    <div className="youth-scope">
      {/* ========== HERO — Cinematic 60% image + editorial headline + service info ========== */}
      <section className="youth-hero">
        <div className="container-cc py-8 md:py-12">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
            <div>
              <div className="youth-kicker">
                <span className="h-2 w-2 rounded-full" style={{ background: '#C6A66B' }} />
                CC3 Youth Church · Port Harcourt Zone 3
                <span className="hidden sm:inline-flex ml-1 rounded-full bg-[#101A2B] text-white px-2.5 py-0.5 text-[10px] font-black tracking-widest">20–35</span>
              </div>

              <h1 className="youth-title mt-5">
                Made for
                <br />
                <em>Purpose.</em>
              </h1>

              <p className="youth-subtitle mt-4">A community established in the Word, empowered by the Spirit and committed to making an impact — university, career, business and ministry, together.</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/youth/church" className="inline-flex items-center gap-2 rounded-full bg-[#101A2B] text-white px-6 py-3 text-sm font-bold hover:bg-black transition">
                  Discover Youth Church <span>→</span>
                </Link>
                <Link href="/youth/word" className="inline-flex items-center gap-2 rounded-full bg-white border border-[#101A2B]/15 text-[#101A2B] px-6 py-3 text-sm font-bold hover:bg-[#E9E4DA]/40 transition">
                  Explore the Word
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500">
                <span className="rounded-full bg-white border border-black/10 px-3 py-1.5">Youth Church · Sundays + Midweek (confirm)</span>
                <span className="rounded-full bg-white border border-black/10 px-3 py-1.5 hidden sm:inline-flex">30B Rumuokwuta · PH Zone 3</span>
                <Link href="/youth/connect" className="rounded-full px-3 py-1.5 font-black text-white" style={{ background: '#C6A66B', color: '#101A2B' }}>
                  Connect →
                </Link>
              </div>

              {/* Service info — persistent on mobile per spec */}
              <div className="mt-6 grid grid-cols-3 divide-x divide-black/5 rounded-2xl bg-white border border-[#101A2B]/10 overflow-hidden max-w-[640px]">
                {[
                  { k: 'Sundays', v: '8:00 AM · Youth Church' },
                  { k: 'Midweek', v: 'As announced' },
                  { k: 'Visit', v: 'New Here →' },
                ].map(s => (
                  <div key={s.k} className="px-4 py-3 text-center">
                    <div className="text-[10px] font-black tracking-widest uppercase" style={{ color: '#C6A66B' }}>
                      {s.k}
                    </div>
                    <div className="text-xs font-bold text-[#101A2B] mt-1">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cinematic 60% visual field */}
            <div className="relative">
              <div className="rounded-[20px] overflow-hidden bg-white border border-black/5 shadow-[0_24px_48px_-16px_rgba(16,26,43,0.18)]">
                <div className="aspect-[4/3.2] relative bg-[#E9E4DA]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/images/cc3/service-congregation.jpg" alt="CC3 Youth — editorial gathering (placeholder: replace with verified youth conference photo)" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101A2B]/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 rounded-full bg-white border border-black/5 px-3 py-1 text-[10px] font-black tracking-widest uppercase text-[#101A2B]">Fellowship · Prayer · Growth</div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="rounded-xl bg-white/95 backdrop-blur border border-black/5 p-3 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-black text-[#101A2B]">Youth Conference — TBC</div>
                        <div className="text-[11px] text-slate-500">Conference · Workshops · Outreach · Date to be confirmed</div>
                      </div>
                      <Link href="/youth/events" className="rounded-full bg-[#101A2B] text-white px-3 py-1.5 text-[11px] font-bold">
                        Details →
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-4 grid grid-cols-3 gap-3">
                  {[
                    { k: 'YOU R.I.S.E.', v: 'Every City & Nation' },
                    { k: 'Cells', v: 'Weekly Fellowship' },
                    { k: 'Growth', v: 'Purpose & Career' },
                  ].map(s => (
                    <div key={s.k} className="rounded-xl border border-black/5 p-3 text-center" style={{ background: '#F7F6F2' }}>
                      <div className="text-[11px] font-black tracking-wide text-[#101A2B] font-youth-heading">{s.k}</div>
                      <div className="text-[10px] text-slate-500 leading-tight">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden md:block absolute -bottom-2 -right-2 rounded-full bg-[#101A2B] text-white px-4 py-2 text-xs font-bold shadow-xl">
                Documentary & editorial photography · Consent-verified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WELCOME — Introduction ========== */}
      <section className="section bg-white">
        <div className="container-cc grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
          <div>
            <div className="inline-flex rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-bold tracking-wide text-[#101A2B]">Welcome to Youth Church</div>
            <h2 className="font-youth-display text-[2rem] leading-none tracking-tight mt-3 text-[#101A2B]">A place for every expression of purpose.</h2>
            <p className="text-sm leading-7 text-slate-600 mt-3">
              Not just a service. CC3 Youth is students, graduates, young professionals and entrepreneurs — one family, many expressions. LoveWorld Nation → PH Zone 3 → CC3 Group Church → Youth Church.
            </p>
            <div className="mt-5 flex gap-2">
              <Link href="/youth/about" className="rounded-full bg-[#101A2B] text-white px-5 py-2.5 text-xs font-bold">
                Our Identity →
              </Link>
              <Link href="/about" className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-xs font-bold">
                Christ Embassy Vision
              </Link>
            </div>
            <p className="mt-4 text-[11px] leading-5 text-slate-500 border-l-2 pl-3" style={{ borderColor: '#C6A66B' }}>
              Content status: placeholder — vision, leadership, schedules and programs to be verified before publication.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { t: 'Know the Word', d: 'Rhapsody, Bible study, messages — daily supply.' },
              { t: 'Find Fellowship', d: 'Youth cells & professional groups — real community.' },
              { t: 'Live Your Purpose', d: 'Calling, career, leadership — with excellence.' },
            ].map(c => (
              <div key={c.t} className="youth-card p-5">
                <div className="h-1 w-full rounded-full mb-3" style={{ background: '#C6A66B' }} />
                <div className="text-sm font-black text-[#101A2B] font-youth-heading">{c.t}</div>
                <div className="text-xs leading-5 text-slate-600 mt-1">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SPIRITUAL FOUNDATION — Word, prayer, growth ========== */}
      <section className="section" style={{ background: '#E9E4DA' }}>
        <div className="container-cc">
          <div className="inline-flex rounded-full bg-white border border-black/5 px-3 py-1 text-[11px] font-bold text-[#101A2B]">Spiritual foundation</div>
          <h2 className="font-youth-display text-2xl tracking-tight mt-3 text-[#101A2B]">Word, prayer and spiritual growth — established daily.</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { k: 'Word', t: 'Built on the Word', d: 'Bible study, messages, Rhapsody — the foundation for purpose.' },
              { k: 'Prayer', t: 'Empowered by the Spirit', d: 'Prayer meetings, campaigns, fellowship of the Spirit.' },
              { k: 'Growth', t: 'Positioned for impact', d: 'Leadership, character, influence — in every sphere.' },
            ].map(c => (
              <div key={c.k} className="youth-card p-6 bg-white">
                <div className="text-[10px] font-black tracking-widest uppercase" style={{ color: '#C6A66B' }}>
                  {c.k}
                </div>
                <div className="font-youth-heading font-bold text-[#101A2B] mt-1">{c.t}</div>
                <div className="text-sm leading-6 text-slate-600 mt-2">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURED MESSAGE ========== */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="flex items-baseline justify-between gap-4">
            <div className="inline-flex rounded-full bg-[#101A2B] text-white px-3 py-1 text-[11px] font-bold">Featured message</div>
            <Link href="/youth/word" className="hidden sm:inline-flex text-xs font-bold" style={{ color: '#C6A66B' }}>
              Teaching archive →
            </Link>
          </div>
          <div className="mt-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-4">
            <div className="youth-card p-0 overflow-hidden">
              <div className="aspect-video relative bg-[#101A2B]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/main-sermon.webp" alt="Featured message — placeholder" className="absolute inset-0 h-full w-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/95 backdrop-blur p-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-black text-[#101A2B]">Faith for Purpose — Latest Teaching (TBC)</div>
                    <div className="text-[11px] text-slate-500">Speaker · Date · Video/audio · Scripture refs · Transcript where available</div>
                  </div>
                  <span className="rounded-full bg-[#101A2B] text-white px-3 py-1 text-[11px] font-bold">▶ Play</span>
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs font-bold text-[#101A2B]">Latest approved teaching — dynamic</div>
                <div className="text-xs leading-5 text-slate-600 mt-1">Filtered by topic, speaker, date and type. Captions/transcripts where available.</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { t: 'Messages & Sermons', d: 'Sundays, conferences, audio & video.' },
                { t: 'Bible Study Series', d: 'New Creation · Faith · Holy Spirit · Purpose.' },
                { t: 'Prayer Resources', d: 'Campaigns, reading plans, testimonies.' },
                { t: 'Teaching Archive', d: 'Searchable library by topic/speaker/date.' },
              ].map(c => (
                <Link key={c.t} href="/youth/word" className="youth-card p-4 flex flex-col justify-between">
                  <div>
                    <div className="text-sm font-black text-[#101A2B] font-youth-heading">{c.t}</div>
                    <div className="text-xs leading-5 text-slate-600 mt-1">{c.d}</div>
                  </div>
                  <div className="text-xs font-bold mt-3" style={{ color: '#C6A66B' }}>
                    Explore →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== DEVOTIONAL — Rhapsody Resource Centre ========== */}
      <section className="section" style={{ background: '#F1EFEA' }}>
        <div className="container-cc">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4">
            <div className="youth-card p-6 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full" style={{ background: '#C6A66B' }} />
              <div className="text-[10px] font-black tracking-widest uppercase" style={{ color: '#C6A66B' }}>
                Rhapsody of Realities — Daily · 8,300+ languages
              </div>
              <div className="font-youth-display text-lg mt-1 text-[#101A2B] leading-tight">Your daily devotional — read, confess, live it.</div>
              <div className="text-sm leading-6 text-slate-600 mt-2">Official devotional — we link, we don&apos;t republish. Featured resource, daily link, related teachings, approved materials.</div>
              <a href="https://rhapsodyofrealities.org" target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-[#101A2B] text-white px-4 py-2 text-xs font-bold">
                Open Rhapsody →
              </a>
              <div className="mt-3 text-[11px] text-slate-500">Avoid copying/redistributing copyrighted material without authorization.</div>
            </div>
            <div className="youth-card p-6 bg-[#101A2B] text-white">
              <div className="text-[10px] font-black tracking-widest uppercase text-[#C6A66B]">Prayer & Spiritual Growth</div>
              <div className="font-youth-heading font-bold mt-1">Private, personal growth — not public leaderboards.</div>
              <ul className="mt-3 space-y-1 text-xs leading-5 text-white/70">
                <li>• Reading plan progress · Private bookmarks · Downloadable study guides</li>
                <li>• Searchable Scripture references · Future personal accounts remain private</li>
              </ul>
              <Link href="/youth/word" className="mt-4 inline-flex rounded-full bg-white text-[#101A2B] px-4 py-2 text-xs font-black">
                Study resources →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== OUTREACH — YOU R.I.S.E. ========== */}
      <section className="section youth-dark">
        <div className="container-cc">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <div>
              <div className="inline-flex rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-bold tracking-widest text-white">Outreach — YOU R.I.S.E.</div>
              <h2 className="font-youth-display text-2xl mt-3 leading-tight">Reaching Individuals, Streets, Every City & Nation.</h2>
              <p className="text-sm leading-6 text-white/70 mt-2">Global LoveWorld Youth evangelism thrust — locally expressed through CC3. Campaigns, street & campus outreaches, reports and testimonies. Official global info distinguished from CC3 records.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/youth/rise" className="rounded-full px-5 py-2.5 text-xs font-black" style={{ background: '#C6A66B', color: '#101A2B' }}>
                  YOU R.I.S.E. →
                </Link>
                <Link href="/outreach" className="rounded-full border border-white/20 text-white px-5 py-2.5 text-xs font-bold">
                  Outreach Reports
                </Link>
              </div>
              <div className="mt-4 text-[11px] text-white/60">Participation via authorised route · Location published only when approved.</div>
            </div>
            <div className="youth-card p-5 bg-white text-[#101A2B]">
              <div className="text-xs font-black tracking-widest uppercase" style={{ color: '#C6A66B' }}>
                Outreach reports — samples (to be replaced with verified CC3 records)
              </div>
              <div className="mt-3 space-y-3">
                {[
                  { t: 'City Campaign — Rumuokwuta', d: '120 reached · 42 first-time decisions · Follow-up ongoing', time: 'Nov 2026 (sample)' },
                  { t: 'Campus Outreach — RSU', d: 'Students reaching students — 78 copies of Rhapsody shared', time: 'Oct 2026 (sample)' },
                ].map(r => (
                  <div key={r.t} className="rounded-xl border border-black/5 p-3" style={{ background: '#F7F6F2' }}>
                    <div className="text-xs font-black text-[#101A2B]">{r.t}</div>
                    <div className="text-xs leading-5 text-slate-600">{r.d}</div>
                    <div className="text-[10px] font-bold text-slate-500 mt-1">{r.time}</div>
                  </div>
                ))}
              </div>
              <Link href="/youth/rise" className="mt-4 inline-flex text-xs font-bold text-[#101A2B]">
                All campaigns →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== COMMUNITY — Cells & Fellowship ========== */}
      <section className="section" style={{ background: '#F7F6F2' }}>
        <div className="container-cc">
          <div className="inline-flex rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-bold text-[#101A2B]">Community</div>
          <h2 className="font-youth-display text-2xl mt-3 text-[#101A2B]">Youth cells, fellowship & belonging.</h2>
          <p className="text-sm text-slate-600 mt-1">Only groups approved for public discovery — no private membership lists, addresses or sensitive info.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: 'Youth Cells', d: 'Weekly fellowship — Word, prayer & follow-up. Enquiry to join.', href: '/youth/community' },
              { t: 'Student Community', d: 'Stay rooted on campus — verified campus fellowships only.', href: '/youth/community' },
              { t: 'Graduates & Professionals', d: 'LoveWorld Graduate Network · Workplace excellence & mentorship.', href: '/youth/community' },
            ].map(c => (
              <Link key={c.t} href={c.href} className="youth-card p-5 block">
                <div className="text-sm font-black text-[#101A2B] font-youth-heading">{c.t}</div>
                <div className="text-xs leading-5 text-slate-600 mt-1">{c.d}</div>
                <div className="text-xs font-bold mt-3" style={{ color: '#C6A66B' }}>
                  Find your group →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DEVELOPMENT — Purpose & Development Centre ========== */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="inline-flex rounded-full bg-[#101A2B] text-white px-3 py-1 text-[11px] font-bold">Development Centre</div>
          <h2 className="font-youth-display text-2xl mt-3 text-[#101A2B]">Purpose, leadership, career & creativity.</h2>
          <p className="text-sm text-slate-600 mt-1">Major opportunity to serve youth between services — commercial opportunities clearly attributed, not church programs unless approved.</p>
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            {[
              { t: 'Purpose & Calling', d: 'Discover gifts & influence — God&apos;s plan.' },
              { t: 'Leadership', d: 'Personal, team & ministry leadership.' },
              { t: 'Career & Professional', d: 'CV, interviews, workplace excellence.' },
              { t: 'Entrepreneurship', d: 'Business ideas, planning, stewardship.' },
              { t: 'Digital Skills', d: 'Technology & digital skills.' },
              { t: 'Creative', d: 'Media, design, production.' },
              { t: 'Ministry Service', d: 'Serve in approved departments.' },
              { t: 'Mentorship', d: 'Guidance for next steps.' },
            ].map(c => (
              <div key={c.t} className="youth-card p-5">
                <div className="text-sm font-black text-[#101A2B] font-youth-heading">{c.t}</div>
                <div className="text-xs leading-6 text-slate-600 mt-1">{c.d}</div>
                <Link href="/youth/growth" className="mt-3 inline-flex text-xs font-bold" style={{ color: '#C6A66B' }}>
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-[#F7F6F2] border border-black/5 p-4 grid md:grid-cols-2 gap-3 text-xs">
            <div>
              <b className="text-[#101A2B]">Opportunity cards:</b> title · category · description · eligibility · organizer · closing date · apply link
            </div>
            <div>
              <b className="text-[#101A2B]">Creators Connect:</b> portfolio — photography, graphics, film, music · Participation opportunities
            </div>
          </div>
        </div>
      </section>

      {/* ========== EVENTS & CONFERENCES ========== */}
      <section className="section" style={{ background: '#E9E4DA' }}>
        <div className="container-cc">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <div className="inline-flex rounded-full bg-white border border-black/5 px-3 py-1 text-[11px] font-bold text-[#101A2B]">Events & Conferences</div>
              <h2 className="font-youth-display text-2xl mt-3 text-[#101A2B]">Conferences, workshops & specials.</h2>
            </div>
            <Link href="/youth/events" className="hidden sm:inline-flex rounded-full bg-[#101A2B] text-white px-4 py-2 text-xs font-bold">
              All events →
            </Link>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { n: '01', t: 'Youth Conference', d: 'Annual gathering — Word, worship & direction (date TBC)', tag: 'Conference' },
              { n: '02', t: 'Leadership Workshop', d: 'Personal & team leadership — quarterly (TBC)', tag: 'Workshop' },
              { n: '03', t: 'YOU R.I.S.E. Campaign', d: 'City-wide outreach — streets & campuses', tag: 'Outreach' },
            ].map(e => (
              <div key={e.t} className="youth-card p-5 relative">
                <div className="flex items-start justify-between">
                  <div className="inline-flex rounded-full bg-[#101A2B] text-white px-3 py-1 text-[10px] font-black tracking-widest">{e.tag}</div>
                  <div className="text-3xl font-black leading-none" style={{ color: 'rgba(16,26,43,0.08)', fontFamily: 'var(--font-youth-display)' }}>
                    {e.n}
                  </div>
                </div>
                <div className="font-youth-heading font-bold text-[#101A2B] mt-2 leading-tight">{e.t}</div>
                <div className="text-xs leading-5 text-slate-600 mt-1">{e.d}</div>
                <Link href="/youth/events" className="mt-3 inline-flex text-xs font-bold" style={{ color: '#C6A66B' }}>
                  View →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[11px] text-slate-500 text-center">Filtering by type/date · Past events · Speaker bios · Session schedules · Venue directions — when verified.</div>
        </div>
      </section>

      {/* ========== MEDIA LIBRARY ========== */}
      <section className="section" style={{ background: '#F7F6F2' }}>
        <div className="container-cc">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <div className="inline-flex rounded-full bg-white border border-black/5 px-3 py-1 text-[11px] font-bold text-[#101A2B]">Media library</div>
              <h2 className="font-youth-display text-2xl mt-3 text-[#101A2B]">Stories, media & creative work.</h2>
            </div>
            <Link href="/youth/media" className="hidden sm:inline-flex rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold">
              All media →
            </Link>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="youth-card p-6">
              <div className="text-xs font-black tracking-widest uppercase" style={{ color: '#C6A66B' }}>
                Testimony
              </div>
              <div className="youth-quote mt-2">“Youth Church helped me find purpose after graduation — now I lead a youth cell and my career has direction.”</div>
              <div className="text-xs font-bold text-[#101A2B] mt-2">— Emmanuel K., Graduate Network (sample — verified only at launch)</div>
              <div className="mt-3 text-[11px] text-slate-500">Submission: form · consent · moderation · private review — not auto-published.</div>
            </div>
            <div className="youth-card p-0 overflow-hidden">
              <div className="aspect-[16/10] relative bg-[#101A2B]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/cc3/reachout-world.webp" alt="Creative showcase — placeholder" className="absolute inset-0 h-full w-full object-cover opacity-90" />
              </div>
              <div className="p-4">
                <div className="text-xs font-black text-[#101A2B] font-youth-heading">Creative Showcase</div>
                <div className="text-xs text-slate-600">Photography, film & design by Youth — via Creators Connect · Portfolio distinctive.</div>
              </div>
            </div>
            <div className="youth-card p-6 text-white" style={{ background: '#101A2B' }}>
              <div className="text-xs font-black tracking-widest uppercase" style={{ color: '#C6A66B' }}>
                Media
              </div>
              <div className="font-youth-heading font-bold mt-1">Sermons · Podcasts · Articles · Gallery</div>
              <div className="text-sm text-white/70 mt-2">Searchable library — approved teachings & ministry media. Video via approved host, not direct API for large files.</div>
              <Link href="/youth/media" className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-xs font-black" style={{ color: '#101A2B' }}>
                Explore Media →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== VISIT — Contact, Join a Cell & Visit (Y21) ========== */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="rounded-[20px] bg-white border border-black/5 p-6 md:p-7 grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
            <div>
              <div className="text-[10px] font-black tracking-widest uppercase" style={{ color: '#C6A66B' }}>
                Contact, Join a Cell & Visit — Y21
              </div>
              <h2 className="font-youth-display text-2xl mt-2 text-[#101A2B]">Three distinct routes — not one generic form.</h2>
              <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                {[
                  { t: 'General enquiry', d: 'Ministry questions' },
                  { t: 'Join a cell', d: 'Fellowship enquiry' },
                  { t: 'Visit', d: 'Directions & times' },
                ].map(c => (
                  <div key={c.t} className="rounded-xl p-3 text-center" style={{ background: '#F7F6F2', border: '1px solid rgba(16,26,43,0.06)' }}>
                    <div className="font-bold text-[#101A2B]">{c.t}</div>
                    <div className="text-slate-600 text-[11px]">{c.d}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/youth/connect" className="rounded-full bg-[#101A2B] text-white px-5 py-2.5 text-xs font-bold">
                  Contact →
                </Link>
                <a href="https://maps.google.com/?q=4.8396,6.9848" target="_blank" rel="noreferrer" className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-xs font-bold">
                  Directions
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-black/5 p-4" style={{ background: '#F7F6F2' }}>
              <div className="text-xs font-black text-[#101A2B]">Contact (verified before launch)</div>
              <div className="text-xs leading-5 text-slate-600 mt-1">CC3 Group Church · 30B Rumuokwuta/NTA Road · Port Harcourt Zone 3 · Official social links to be confirmed.</div>
              <div className="mt-3 text-[11px] text-slate-500">Reroute by enquiry type · Minimal personal info · Privacy & safeguarding respected.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== GENERATION MESH ========== */}
      <section className="section" style={{ background: '#E9E4DA' }}>
        <div className="container-cc">
          <h3 className="font-youth-display text-center text-[#101A2B]">One Church — Every Generation</h3>
          <div className="mt-6 grid md:grid-cols-4 gap-3">
            {[
              { h: 'Main Church', p: 'Sunday 8AM Celebration — family hub', href: '/' },
              { h: 'Teens Church', p: '13–19 · A Generation Set Apart', href: '/teens' },
              { h: 'Kids Church', p: '4–12 · Champions for Christ', href: '/kids' },
              { h: 'Cells & Foundation', p: 'Weekly fellowship & discipleship', href: '/cells' },
            ].map(b => (
              <Link key={b.h} href={b.href} className="youth-card p-4 block">
                <div className="text-sm font-black text-[#101A2B] font-youth-heading">{b.h}</div>
                <div className="text-xs leading-5 text-slate-600 mt-1">{b.p}</div>
                <div className="text-xs font-bold mt-2" style={{ color: '#C6A66B' }}>
                  Visit →
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center text-[11px] text-slate-500">CC3 / Christ Embassy Port Harcourt Zone 3 · LoveWorld affiliation · Content collection: 0/15 Youth — placeholders until verified.</div>
        </div>
      </section>
    </div>
  )
}
