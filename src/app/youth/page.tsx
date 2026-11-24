import Link from 'next/link'
import './youth.css'

export const metadata = { title: 'CC3 Youth Church — Made for Purpose | 20–35' }

export default function YouthPage() {
  return (
    <div className="youth-scope">
      {/* HERO — cinematic editorial, light with gold rule */}
      <section className="youth-hero">
        <div className="container-cc py-8 md:py-12">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
            <div>
              <div className="youth-kicker">
                <span className="h-2 w-2 rounded-full bg-[#C6A04A]" />
                CC3 Youth Church — Port Harcourt Zone 3
                <span className="hidden sm:inline-flex ml-1 rounded-full bg-[#0E1B33] text-white px-2 py-0.5 text-[10px] font-black">20–35</span>
              </div>
              <h1 className="youth-title mt-5">
                Made for<br />
                <em>Purpose.</em><br />
                Empowered to<br />
                influence.
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-slate-600 max-w-[52ch]">
                20–35 years · A community of young adults growing in the Word, walking in the Spirit, discovering purpose and advancing the Gospel — university, career, business and ministry, together.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/youth/church" className="inline-flex items-center gap-2 rounded-full bg-[#0E1B33] text-white px-6 py-3 text-sm font-bold hover:bg-black transition">Discover Youth Church <span>→</span></Link>
                <Link href="/youth/rise" className="inline-flex items-center gap-2 rounded-full border border-[#0E1B33] bg-white px-5 py-3 text-sm font-bold hover:bg-[#F5F1EB] transition">Join the Movement</Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500">
                <span className="rounded-full bg-white border border-black/10 px-3 py-1.5">Youth Church · Sundays + Midweek (confirm)</span>
                <span className="rounded-full bg-white border border-black/10 px-3 py-1.5 hidden sm:inline-flex">30B Rumuokwuta · PH Zone 3</span>
                <Link href="/youth/connect" className="rounded-full bg-[#C6A04A] text-[#0E1B33] px-3 py-1.5 font-black">Connect →</Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[20px] overflow-hidden bg-white border border-black/5 shadow-xl">
                <div className="aspect-[4/3] relative bg-[#F5F1EB]">
                  <img src="/assets/images/cc3/service-congregation.jpg" alt="Youth gathering" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute top-3 left-3 rounded-full bg-white border border-black/5 px-3 py-1 text-[10px] font-black tracking-widest uppercase">Fellowship · Prayer · Growth</div>
                  <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/95 backdrop-blur border border-black/5 p-3 flex items-center justify-between">
                    <div><div className="text-xs font-black text-[#0E1B33]">Youth Conference — TBC</div><div className="text-[11px] text-slate-500">Conference · Workshops · Outreach</div></div>
                    <Link href="/youth/events" className="rounded-full bg-[#0E1B33] text-white px-3 py-1.5 text-[11px] font-bold">Details →</Link>
                  </div>
                </div>
                <div className="p-4 grid grid-cols-3 gap-3">
                  {[
                    {k:'YOU R.I.S.E.', v:'Every City & Nation'},
                    {k:'Cells', v:'Weekly Fellowship'},
                    {k:'Growth', v:'Purpose & Career'},
                  ].map(s=>(
                    <div key={s.k} className="rounded-xl bg-[#FFFBF5] border border-black/5 p-3 text-center">
                      <div className="text-[11px] font-black tracking-wide text-[#0E1B33]">{s.k}</div>
                      <div className="text-[10px] text-slate-500 leading-tight">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01 — Welcome */}
      <section className="section bg-white">
        <div className="container-cc grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
          <div>
            <div className="inline-flex rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-bold tracking-wide text-[#0E1B33]">01 — Welcome to Youth Church</div>
            <h2 className="font-display font-black text-[2rem] leading-none tracking-tight mt-3 text-[#0E1B33]">A place for every expression of purpose.</h2>
            <p className="text-sm leading-7 text-slate-600 mt-3">Not just a service. CC3 Youth is students, graduates, young professionals and entrepreneurs — one family, many expressions. LoveWorld Nation → PH Zone 3 → CC3 Group → Youth Church.</p>
            <div className="mt-5 flex gap-2">
              <Link href="/youth/about" className="rounded-full bg-[#0E1B33] text-white px-5 py-2.5 text-xs font-bold">Our Identity →</Link>
              <Link href="/about" className="rounded-full border border-black/10 bg-white px-5 py-2.5 text-xs font-bold">Christ Embassy Vision</Link>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              {t:'Know the Word', d:'Rhapsody, Bible study, messages — daily supply.'},
              {t:'Find Fellowship', d:'Youth cells & professional groups — real community.'},
              {t:'Live Your Purpose', d:'Calling, career, leadership — with excellence.'},
            ].map(c=>(
              <div key={c.t} className="youth-card p-5">
                <div className="h-1 w-full rounded-full bg-[#C6A04A] mb-3" />
                <div className="text-sm font-black text-[#0E1B33]">{c.t}</div>
                <div className="text-xs leading-5 text-slate-600 mt-1">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Built on the Word */}
      <section className="section" style={{background:'#F5F1EB'}}>
        <div className="container-cc">
          <div className="inline-flex rounded-full bg-white border border-black/5 px-3 py-1 text-[11px] font-bold text-[#0E1B33]">02 — Built on the Word</div>
          <h2 className="font-display font-black text-2xl tracking-tight mt-3 text-[#0E1B33]">Teachings, messages, prayer and Rhapsody — daily.</h2>
          <div className="mt-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-4">
            <div className="youth-card p-6 bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-full bg-[#C6A04A]" />
              <div className="text-[10px] font-black tracking-widest uppercase text-[#C6A04A]">Rhapsody of Realities — Daily</div>
              <div className="font-display font-black text-lg mt-1 text-[#0E1B33] leading-tight">Your daily devotional — 8,300+ languages.</div>
              <div className="text-sm leading-6 text-slate-600 mt-2">Read, confess, live it. Official devotional — link, don&apos;t republish.</div>
              <a href="https://rhapsodyofrealities.org" target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-[#0E1B33] text-white px-4 py-2 text-xs font-bold">Open Rhapsody →</a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                {t:'Messages & Sermons', d:'Sundays, conferences, audio & video.', href:'/youth/word'},
                {t:'Bible Study', d:'New Creation, Faith, Holy Spirit, Purpose.', href:'/youth/word'},
                {t:'Prayer', d:'Prayer meetings, campaigns, testimonies.', href:'/prayer'},
                {t:'Reading Plans', d:'Foundations → Service → Leadership pathway.', href:'/youth/word'},
              ].map(c=>(
                <Link key={c.t} href={c.href} className="youth-card p-4 flex flex-col justify-between">
                  <div><div className="text-sm font-black text-[#0E1B33]">{c.t}</div><div className="text-xs leading-5 text-slate-600 mt-1">{c.d}</div></div>
                  <div className="text-xs font-bold text-[#C6A04A] mt-3">Explore →</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Purpose and influence */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="inline-flex rounded-full bg-[#0E1B33] text-white px-3 py-1 text-[11px] font-bold">03 — Purpose & Influence</div>
          <h2 className="font-display font-black text-2xl mt-3 text-[#0E1B33]">Spiritual growth, calling, leadership and development.</h2>
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            {[
              {t:'Purpose & Calling', d:'Discover gifts & influence — God&apos;s plan for your life.'},
              {t:'Leadership', d:'Personal, team & ministry leadership — responsibility.'},
              {t:'Career & Professional', d:'CV, interviews, workplace excellence.'},
              {t:'Entrepreneurship', d:'Business ideas, planning, stewardship.'},
            ].map(c=>(
              <div key={c.t} className="youth-card p-5">
                <div className="text-sm font-black text-[#0E1B33]">{c.t}</div>
                <div className="text-xs leading-6 text-slate-600 mt-1">{c.d}</div>
                <Link href="/youth/growth" className="mt-3 inline-flex text-xs font-bold text-[#C6A04A]">Learn more →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — YOU R.I.S.E. */}
      <section className="section youth-dark">
        <div className="container-cc">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <div>
              <div className="inline-flex rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-bold tracking-widest text-white">04 — Take the Gospel to the world</div>
              <h2 className="font-display font-black text-2xl mt-3 leading-tight">YOU R.I.S.E. — Youth Reaching Individuals, Streets, Every City & Nation.</h2>
              <p className="text-sm leading-6 text-white/70 mt-2">Global LoveWorld Youth evangelism thrust — locally expressed through CC3. Campaigns, street & campus outreaches, reports and testimonies.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/youth/rise" className="rounded-full bg-[#C6A04A] text-[#0E1B33] px-5 py-2.5 text-xs font-black">YOU R.I.S.E. →</Link>
                <Link href="/outreach" className="rounded-full border border-white/20 text-white px-5 py-2.5 text-xs font-bold">Outreach Reports</Link>
              </div>
            </div>
            <div className="youth-card p-5 bg-white text-[#0E1B33]">
              <div className="text-xs font-black tracking-widest uppercase text-[#C6A04A]">Outreach Reports</div>
              <div className="mt-3 space-y-3">
                {[
                  {t:'City Campaign — Rumuokwuta', d:'120 reached · 42 first-time decisions · Follow-up ongoing', time:'Nov 2026'},
                  {t:'Campus Outreach — RSU', d:'Students reaching students — 78 copies of Rhapsody shared', time:'Oct 2026'},
                ].map(r=>(
                  <div key={r.t} className="rounded-xl border border-black/5 p-3">
                    <div className="text-xs font-black text-[#0E1B33]">{r.t}</div>
                    <div className="text-xs leading-5 text-slate-600">{r.d}</div>
                    <div className="text-[10px] font-bold text-slate-500 mt-1">{r.time}</div>
                  </div>
                ))}
              </div>
              <Link href="/youth/rise" className="mt-4 inline-flex text-xs font-bold text-[#0E1B33]">All Reports →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Community */}
      <section className="section" style={{background:'#FFFBF5'}}>
        <div className="container-cc">
          <div className="inline-flex rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-bold text-[#0E1B33]">05 — Find your community</div>
          <h2 className="font-display font-black text-2xl mt-3 text-[#0E1B33]">Youth cells, students, graduates & young professionals.</h2>
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            {[
              {t:'Youth Cells', d:'Weekly fellowship — Word, prayer & follow-up.', href:'/youth/community'},
              {t:'Students', d:'Stay rooted on campus — fellowship away from home.', href:'/youth/community'},
              {t:'Graduates', d:'LoveWorld Graduate Network — connect & build.', href:'/youth/community'},
              {t:'Young Professionals', d:'Workplace excellence & mentorship.', href:'/youth/community'},
            ].map(c=>(
              <Link key={c.t} href={c.href} className="youth-card p-5 block">
                <div className="text-sm font-black text-[#0E1B33]">{c.t}</div>
                <div className="text-xs leading-5 text-slate-600 mt-1">{c.d}</div>
                <div className="text-xs font-bold text-[#C6A04A] mt-3">Find your group →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Events */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="inline-flex rounded-full bg-[#F5F1EB] border border-black/5 px-3 py-1 text-[11px] font-bold text-[#0E1B33]">06 — Events & Experiences</div>
          <h2 className="font-display font-black text-2xl mt-3 text-[#0E1B33]">Conferences, workshops, services & specials.</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              {t:'Youth Conference', d:'Annual gathering — Word, worship & direction (date TBC)', tag:'Conference'},
              {t:'Leadership Workshop', d:'Personal & team leadership — quarterly', tag:'Workshop'},
              {t:'YOU R.I.S.E. Campaign', d:'City-wide outreach — streets & campuses', tag:'Outreach'},
            ].map(e=>(
              <div key={e.t} className="youth-card p-5">
                <div className="inline-flex rounded-full bg-[#0E1B33] text-white px-3 py-1 text-[10px] font-black tracking-widest">{e.tag}</div>
                <div className="font-display font-black text-[#0E1B33] mt-2 leading-tight">{e.t}</div>
                <div className="text-xs leading-5 text-slate-600 mt-1">{e.d}</div>
                <Link href="/youth/events" className="mt-3 inline-flex text-xs font-bold text-[#C6A04A]">View Events →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Stories */}
      <section className="section" style={{background:'#F5F1EB'}}>
        <div className="container-cc">
          <div className="inline-flex rounded-full bg-white border border-black/5 px-3 py-1 text-[11px] font-bold text-[#0E1B33]">07 — Stories & Impact</div>
          <h2 className="font-display font-black text-2xl mt-3 text-[#0E1B33]">Testimonies, media & creative work.</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="youth-card p-6">
              <div className="text-xs font-black tracking-widest uppercase text-[#C6A04A]">Testimony</div>
              <div className="text-sm leading-6 text-slate-600 mt-2 italic">“Youth Church helped me find purpose after graduation — now I lead a youth cell and my career has direction.”</div>
              <div className="text-xs font-bold text-[#0E1B33] mt-2">— Emmanuel K., Graduate Network</div>
            </div>
            <div className="youth-card p-0 overflow-hidden">
              <div className="aspect-[16/10] relative bg-[#0E1B33]">
                <img src="/assets/images/cc3/reachout-world.webp" alt="Creative showcase" className="absolute inset-0 h-full w-full object-cover opacity-90" />
              </div>
              <div className="p-4"><div className="text-xs font-black text-[#0E1B33]">Creative Showcase</div><div className="text-xs text-slate-600">Photography, film & design by Youth — via Creators Connect.</div></div>
            </div>
            <div className="youth-card p-6 bg-[#0E1B33] text-white">
              <div className="text-xs font-black tracking-widest uppercase text-[#C6A04A]">Media</div>
              <div className="font-display font-black mt-1">Sermons · Podcasts · Articles · Gallery</div>
              <div className="text-sm text-white/70 mt-2">Searchable library — approved teachings & ministry media.</div>
              <Link href="/youth/media" className="mt-4 inline-flex rounded-full bg-white text-[#0E1B33] px-4 py-2 text-xs font-black">Explore Media →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mesh */}
      <section className="section bg-white">
        <div className="container-cc">
          <h3 className="font-display font-black text-center text-[#0E1B33]">One Church — Every Generation</h3>
          <div className="mt-6 grid md:grid-cols-4 gap-3">
            {[
              {h:'Main Church', p:'Sunday 8AM Celebration — family hub', href:'/'},
              {h:'Teens Church', p:'13–19 · A Generation Set Apart', href:'/teens'},
              {h:'Kids Church', p:'4–12 · Champions for Christ', href:'/kids'},
              {h:'Cells & Foundation', p:'Weekly fellowship & discipleship', href:'/cells'},
            ].map(b=>(
              <Link key={b.h} href={b.href} className="youth-card p-4 block"><div className="text-sm font-black text-[#0E1B33]">{b.h}</div><div className="text-xs leading-5 text-slate-600 mt-1">{b.p}</div><div className="text-xs font-bold text-[#C6A04A] mt-2">Visit →</div></Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
