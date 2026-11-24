import Link from 'next/link'
import './teens.css'

export const metadata = { title: 'CC3 Teens Church — A Generation Set Apart | 13–19' }

export default function TeensPage() {
  return (
    <div className="teens-scope">
      {/* HERO — asymmetric editorial, electric blue/indigo */}
      <section className="teens-hero">
        <div className="container-cc relative py-8 md:py-10">
          <div className="grid lg:grid-cols-[1.2fr_0.85fr] gap-8 items-center">
            <div>
              <div className="teens-eyebrow">
                <span className="h-2 w-2 rounded-full bg-[#F59E0B] animate-pulse" />
                CC3 Teens Church — Port Harcourt Zone 3
                <span className="hidden sm:inline-flex ml-2 rounded-full bg-white text-[#1E1B4B] px-2 py-0.5 text-[10px] font-black">13–19</span>
              </div>
              <h1 className="teens-title mt-5">
                A Generation<br />
                <em>Set Apart.</em><br />
                <span className="accent-violet">Growing</span> in the Word.
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-white/80 max-w-[52ch]">
                Full of the Spirit. Making a difference. CC3 Teens Church is where teenagers from across Port Harcourt grow in God&apos;s Word, discover God-given gifts, build real friendships and reach their world for Jesus.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/teens/church" className="inline-flex items-center gap-2 rounded-full bg-white text-[#1E1B4B] px-6 py-3 text-sm font-black hover:bg-white/90 transition">Discover Teens Church <span>→</span></Link>
                <a href="https://teevo.org" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#7C3AED] text-white px-5 py-3 text-sm font-bold hover:bg-[#6D28D9] transition">Explore TeeVo</a>
              </div>
              <div className="mt-7 grid grid-cols-3 gap-3 max-w-[520px]">
                {[
                  {k:'13–19', v:'Teenagers', sub:'JSS1 → University entry'},
                  {k:'TeeVo', v:'Daily', sub:'Official devotional'},
                  {k:'TITHE', v:'Outreach', sub:'Every teen a soul winner'},
                ].map(s=>(
                  <div key={s.k} className="teens-stat">
                    <div className="text-xs font-black tracking-wide text-white">{s.k}</div>
                    <div className="text-[11px] font-bold text-white/90">{s.v}</div>
                    <div className="text-[10px] text-white/60 leading-tight">{s.sub}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold text-white/70">
                <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-white/60" /> Sundays 8AM · During Main Service</span>
                <span className="hidden sm:inline text-white/30">·</span>
                <span>30B Rumuokwuta, Port Harcourt</span>
                <span className="hidden sm:inline text-white/30">·</span>
                <Link href="/teens/connect" className="underline decoration-white/30 underline-offset-4 hover:text-white">Parent info →</Link>
              </div>
            </div>

            {/* Right — collage */}
            <div className="relative">
              <div className="rounded-[22px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-3">
                <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
                  <div className="rounded-[16px] overflow-hidden bg-white aspect-[4/3] relative">
                    <img src="/assets/images/cc3/service-congregation.jpg" alt="Teens worship" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute bottom-2 left-2 rounded-full bg-[#1E1B4B] text-white px-3 py-1 text-[10px] font-black tracking-wide">WORSHIP · WORD · PRAYER</div>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-[14px] bg-white p-4">
                      <div className="text-[10px] font-black tracking-widest uppercase text-[#7C3AED]">TeeVo Today</div>
                      <div className="text-xs font-extrabold leading-tight text-[#0F172A] mt-1">You&apos;re God&apos;s Chosen & Set Apart</div>
                      <div className="text-[11px] leading-5 text-slate-500 mt-1">“You are a chosen generation…” — 1 Peter 2:9</div>
                      <a href="https://teevo.org" target="_blank" rel="noreferrer" className="mt-2 inline-flex rounded-full bg-[#1D4ED8] text-white px-3 py-1 text-[11px] font-bold">Read →</a>
                    </div>
                    <div className="rounded-[14px] bg-[#F59E0B] p-4 text-[#1E1B4B]">
                      <div className="text-[11px] font-black uppercase tracking-wide">Next Up</div>
                      <div className="text-sm font-black leading-tight mt-1">Teens Church — Sunday 8AM</div>
                      <div className="text-[11px] opacity-80">Check-in at welcome desk</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {[
                    {n:'TeeVo Clubs', a:'Schools', c:'#7C3AED'},
                    {n:'TITHE', a:'Outreach', c:'#FF4D6A'},
                    {n:'Creative', a:'Gifts & Teams', c:'#1D4ED8'},
                  ].map(b=>(
                    <div key={b.n} className="rounded-xl bg-white p-3 text-center">
                      <div className="mx-auto h-8 w-8 rounded-full grid place-items-center text-white font-black text-xs" style={{background:b.c}}>✦</div>
                      <div className="text-[11px] font-black text-[#0F172A] mt-1">{b.n}</div>
                      <div className="text-[10px] text-slate-500">{b.a}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-3 -right-2 hidden md:flex items-center gap-2 rounded-full bg-white shadow-xl border border-black/5 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-[#0F172A]">Safe · Supervised · Parent-aware</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01 — Welcome */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
            <div>
              <div className="teens-pill bg-[#1D4ED8]/10 text-[#1D4ED8] border border-[#1D4ED8]/15">01 — Welcome to Teens Church</div>
              <h2 className="font-display font-black text-[2rem] leading-none tracking-tight mt-3 text-[#0F172A]">There&apos;s a place for you to belong — and become.</h2>
              <p className="text-sm leading-7 text-slate-600 mt-3">Not a side programme. CC3 Teens Church is a local expression of Christ Embassy Central Church 3 — teenagers growing spiritually, finding purpose and influencing their generation. LoveWorld Nation → PH Zone 3 → CC3 Group → Teens Church.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/teens/about" className="rounded-full bg-[#0F172A] text-white px-5 py-2.5 text-xs font-bold">Our Identity →</Link>
                <Link href="/about" className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-xs font-bold hover:border-[#7C3AED]/30">Christ Embassy Vision</Link>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                {t:'Know the Word', d:'TeeVo-rooted teaching on identity, faith & character — every week.'},
                {t:'Find Your People', d:'Real friendships — small groups, not crowds. Safe, supervised.'},
                {t:'Use Your Gifts', d:'Music, media, drama, dance, tech — your talent has a place now.'},
              ].map(c=>(
                <div key={c.t} className="teens-card p-5">
                  <div className="h-9 w-9 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/15 grid place-items-center text-[#7C3AED] font-black">✓</div>
                  <div className="text-sm font-black text-[#0F172A] mt-3">{c.t}</div>
                  <div className="text-xs leading-5 text-slate-600 mt-1">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Spiritual foundation */}
      <section className="section" style={{background:'#F8FAFF'}}>
        <div className="container-cc">
          <div className="flex items-baseline justify-between gap-4">
            <div className="teens-pill bg-white border border-black/5 text-[#0F172A]">02 — Our spiritual foundation</div>
            <Link href="/teens/about" className="hidden sm:inline-flex text-xs font-bold text-[#1D4ED8]">Vision & Beliefs →</Link>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              {k:'Vision', t:'A Generation Set Apart', d:'Raising teenagers established in the Word, filled with the Spirit, conscious of identity in Christ.', c:'#1D4ED8'},
              {k:'Mission', t:'Grow, Equip, Send', d:'Nurture through the Word, fellowship, mentorship, creative expression & evangelism.', c:'#7C3AED'},
              {k:'Beliefs', t:'Same Foundation', d:'One faith — Bible as infallible Word, New Creation, Holy Spirit, faith & soul-winning.', c:'#FF4D6A'},
            ].map(b=>(
              <div key={b.k} className="teens-card p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full" style={{background:b.c}} />
                <div className="text-[10px] font-black tracking-widest uppercase" style={{color:b.c}}>{b.k}</div>
                <div className="font-display font-black text-lg mt-1 text-[#0F172A]">{b.t}</div>
                <div className="text-sm leading-6 text-slate-600 mt-2">{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Grow every day */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="teens-pill bg-[#F59E0B]/15 text-[#92400E] border border-[#F59E0B]/20">03 — Grow every day</div>
          <h2 className="font-display font-black text-2xl tracking-tight mt-3 text-[#0F172A]">TeeVo, Bible study & Word challenges — daily, not just Sunday.</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">Official LoveWorld resources, locally nurtured. Link, don&apos;t republish — build a daily habit.</p>

          <div className="mt-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-4">
            <Link href="/teens/word" className="teens-card p-6 bg-[#0F172A] text-white relative overflow-hidden block hover:border-[#7C3AED]/30">
              <div className="absolute inset-0 opacity-30" style={{background:'radial-gradient(400px 200px at 20% 0%, #7C3AED, transparent)'}} />
              <div className="relative">
                <div className="inline-flex rounded-full bg-white text-[#0F172A] px-3 py-1 text-[10px] font-black tracking-widest">TEEVO TODAY</div>
                <div className="font-display font-black text-xl mt-3 leading-tight">Your daily devotional — Scripture, message, prayer & confession.</div>
                <div className="text-sm leading-6 text-white/70 mt-2">1 Peter 2:9 · Read on teevo.org + related Bible study on CC3 Teens.</div>
                <div className="mt-4 inline-flex rounded-full bg-[#F59E0B] text-[#0F172A] px-4 py-2 text-xs font-black">Open TeeVo →</div>
              </div>
            </Link>
            <div className="grid grid-rows-3 gap-3">
              {[
                {t:'Bible Study Centre', d:'Identity · Faith · Holy Spirit · Purpose — topical studies.', href:'/teens/word'},
                {t:'Reading Plans', d:'30 Days in the Word — start a plan, stay consistent.', href:'/teens/word'},
                {t:'Quizzes & Challenges', d:'Memory verse, Bible quiz, application tasks — with friends.', href:'/teens/word'},
              ].map(c=>(
                <Link key={c.t} href={c.href} className="teens-card p-4 flex items-center justify-between gap-3 hover:border-[#1D4ED8]/15">
                  <div><div className="text-sm font-black text-[#0F172A]">{c.t}</div><div className="text-xs text-slate-600 mt-0.5">{c.d}</div></div>
                  <span className="h-8 w-8 rounded-full bg-[#1D4ED8]/10 grid place-items-center text-[#1D4ED8]">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Be part of something */}
      <section className="section" style={{background:'#FFF7ED'}}>
        <div className="container-cc">
          <div className="teens-pill bg-white border border-black/5 text-[#0F172A]">04 — Be part of something</div>
          <h2 className="font-display font-black text-2xl mt-3 text-[#0F172A]">TeeVo Clubs, TITHE & real ministry.</h2>
          <div className="mt-6 grid lg:grid-cols-2 gap-4">
            <div className="teens-card p-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 rounded-full bg-[#7C3AED] text-white px-3 py-1 text-[10px] font-black tracking-widest">GLOBAL · LOCAL</div>
              <div className="text-[10px] font-black tracking-widest uppercase text-[#7C3AED]">TeeVo Clubs</div>
              <h3 className="font-display font-black text-xl mt-1 text-[#0F172A]">Take TeeVo to your school.</h3>
              <p className="text-sm leading-6 text-slate-600 mt-2">Weekly Bible study & discussion right where you are — schools and neighbourhoods. Supervised, authorised, no student lists published.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/teens/activities" className="rounded-full bg-[#0F172A] text-white px-4 py-2 text-xs font-bold">How TeeVo Clubs Work →</Link>
                <Link href="/teens/connect" className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold">Find a Club</Link>
              </div>
              <div className="mt-4 rounded-xl bg-[#F8FAFF] border border-[#7C3AED]/10 p-3 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#7C3AED] animate-pulse" />
                <span className="text-xs font-bold text-[#0F172A]">Zone 3 historical: 108 TeeVo Clubs (June 2019) — reference</span>
              </div>
            </div>
            <div className="teens-card p-6 border-[#FF4D6A]/20">
              <div className="text-[10px] font-black tracking-widest uppercase text-[#FF4D6A]">TITHE — Teens in the Hood Evangelistic Special</div>
              <h3 className="font-display font-black text-xl mt-1 text-[#0F172A]">Every teenager a soul winner.</h3>
              <p className="text-sm leading-6 text-slate-600 mt-2">Global Teens Ministry evangelism — teens reaching teens in streets and schools with the Gospel.</p>
              <ul className="mt-3 space-y-1 text-sm text-slate-600"><li>• Outreaches · Campaigns · Follow-up · Approved reports</li><li>• Via authorised coordinators — ask to participate</li></ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/teens/activities" className="rounded-full bg-[#FF4D6A] text-white px-4 py-2 text-xs font-bold">TITHE →</Link>
                <Link href="/outreach" className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold">Reports</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Discover gifts */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="teens-pill bg-[#1E1B4B] text-white border border-white/10">05 — Discover your gifts</div>
          <h2 className="font-display font-black text-2xl mt-3 text-[#0F172A]">Serve. Create. Lead — your talent has a place now.</h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              {n:'Music & Worship', s:'Choir · Instruments · Leading'},
              {n:'Media & Tech', s:'Photo · Sound · Livestream'},
              {n:'Drama & Dance', s:'Skits · Spoken Word · Dance'},
              {n:'Design', s:'Graphics · Video · Slides'},
              {n:'Leadership', s:'Ushering · Coordination'},
              {n:'Outreach', s:'TITHE Teams · Follow-up'},
            ].map(c=>(
              <div key={c.n} className="teens-card p-4 text-center">
                <div className="mx-auto h-10 w-10 rounded-xl bg-[#1D4ED8] text-white grid place-items-center font-black">✦</div>
                <div className="text-xs font-black text-[#0F172A] mt-2">{c.n}</div>
                <div className="text-[11px] leading-tight text-slate-500">{c.s}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[16px] bg-[#0F172A] text-white p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div><div className="font-display font-black">Showcase your gift</div><div className="text-sm text-white/70">Talent showcases, services & outreaches — parent-invited, consent-published.</div></div>
            <Link href="/teens/gifts" className="rounded-full bg-white text-[#0F172A] px-5 py-2.5 text-xs font-black shrink-0">Explore Gifts →</Link>
          </div>
        </div>
      </section>

      {/* 06 — What's happening */}
      <section className="section" style={{background:'#F8FAFF'}}>
        <div className="container-cc">
          <div className="teens-pill bg-white border border-black/5 text-[#0F172A]">06 — What&apos;s happening?</div>
          <h2 className="font-display font-black text-2xl mt-3 text-[#0F172A]">Upcoming — don&apos;t miss fellowship.</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              {t:'Teens Church — Sunday', d:'Worship, Word & fellowship · Every Sunday 8AM', badge:'Weekly', c:'#1D4ED8'},
              {t:'TeeVo Club Rally', d:'Schools gathering — Bible challenge & outreach (TBC)', badge:'Monthly', c:'#7C3AED'},
              {t:'TITHE Campaign', d:'Street & school evangelism — teams + follow-up', badge:'As announced', c:'#FF4D6A'},
            ].map(e=>(
              <div key={e.t} className="teens-card p-5">
                <div className="inline-flex rounded-full text-white px-3 py-1 text-[10px] font-black tracking-widest uppercase" style={{background:e.c}}>{e.badge}</div>
                <div className="font-display font-black text-[#0F172A] mt-2 leading-tight">{e.t}</div>
                <div className="text-xs leading-5 text-slate-600 mt-1">{e.d}</div>
                <Link href="/teens/events" className="mt-3 inline-flex text-xs font-black text-[#1D4ED8]">Details →</Link>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/teens/events" className="rounded-full bg-[#0F172A] text-white px-5 py-2.5 text-xs font-bold">All Events →</Link>
            <Link href="/teens/resources" className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-xs font-bold">Resources</Link>
          </div>
        </div>
      </section>

      {/* 07 — Parents */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="rounded-[20px] bg-[#0F172A] text-white p-6 md:p-8 grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
            <div>
              <div className="teens-pill bg-white/10 border border-white/15 text-white">07 — Parents & Guardians</div>
              <h2 className="font-display font-black text-2xl mt-3 leading-tight">We take trust seriously.</h2>
              <p className="text-sm leading-6 text-white/70 mt-2">Supervised rooms, vetted volunteers, no private DMs, media/events only with consent. Concerns go to Group Pastor → Zonal office. You&apos;ll know who leads, when, where and how to reach us.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/teens/connect" className="rounded-full bg-white text-[#0F172A] px-5 py-2.5 text-xs font-black">Parent Information</Link>
                <Link href="/safeguarding" className="rounded-full border border-white/20 text-white px-5 py-2.5 text-xs font-bold">Safeguarding</Link>
              </div>
            </div>
            <div className="rounded-[16px] bg-white p-5 text-[#0F172A]">
              <div className="text-xs font-black tracking-widest uppercase text-[#1D4ED8]">At a glance for parents</div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>• <b className="text-[#0F172A]">Teachings:</b> Identity, faith, purpose — TeeVo & Bible, Christ Embassy doctrine</li>
                <li>• <b className="text-[#0F172A]">Leaders:</b> Appointed, trained, supervised — no private contact</li>
                <li>• <b className="text-[#0F172A]">Meets:</b> Sundays 8AM during Main Service — 30B Rumuokwuta</li>
                <li>• <b className="text-[#0F172A]">Contact:</b> Moderated form → authorised coordinator</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mesh */}
      <section className="section" style={{background:'#FFF7ED'}}>
        <div className="container-cc">
          <h3 className="font-display font-black text-center text-[#0F172A]">One Church — Every Generation</h3>
          <p className="text-sm text-center text-slate-600 mt-1">Teens is one expression — find your family.</p>
          <div className="mt-6 grid md:grid-cols-4 gap-3">
            {[
              {h:'Main Church', p:'Sunday 8AM Celebration — the home hub', href:'/'},
              {h:'Youth Church', p:'20–35 · Rooted, empowered, positioned', href:'/youth'},
              {h:'Kids Church', p:'4–12 · Champions for Christ', href:'/kids'},
              {h:'Cells & Foundation', p:'Weekly fellowship & discipleship', href:'/cells'},
            ].map(b=>(
              <Link key={b.h} href={b.href} className="teens-card p-4 block"><div className="text-sm font-black text-[#0F172A]">{b.h}</div><div className="text-xs leading-5 text-slate-600 mt-1">{b.p}</div><div className="text-xs font-black text-[#1D4ED8] mt-2">Visit →</div></Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
