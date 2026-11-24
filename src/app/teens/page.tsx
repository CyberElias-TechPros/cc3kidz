import Link from 'next/link'
import Image from 'next/image'
import '../kids-layout.css'
import './teens.css'
import { site } from '@/lib/site'
import { SectionHeading } from '@/components/Section'
import NewsletterForm from '@/components/forms/NewsletterForm'
import services from '@/data/services.json'
import ministries from '@/data/ministries.json'
import events from '@/data/events.json'
import { ZoneBreadcrumb } from '@/components/group/ZoneBreadcrumb'

export const metadata = { title: 'CC3 Teens Church — A Generation Set Apart | 13–19' }

// Teens mirrors Main Church component system (kl-* from kids-layout.css)
// Palette accents mapped to Teens via .teens-scope overrides, but structure/feeling = Main
export default function TeensPage() {
  const coverUrl = '/assets/images/cc3/service-congregation.jpg'
  const familyUrl = '/assets/images/main-family.webp'
  const outreachUrl = '/assets/images/cc3/reachout-world.webp'

  const galleryItems = [
    { src: coverUrl, cap: 'Worship & Word', href: '/teens/resources' },
    { src: familyUrl, cap: 'Teens Family', href: '/teens/resources' },
    { src: outreachUrl, cap: 'TITHE Outreach', href: '/teens/resources' },
  ]

  return (
    <div className="teens-scope">
      {/* HERO — same kl-hero as Main: kicker, title, text, gold line, dual CTA, slider art */}
      <section className="kl-hero">
        <div className="container-cc kl-hero__inner">
          <div>
            <span className="kl-hero__kicker"><i /> Port Harcourt · 30B Rumuokwuta · Sunday 8AM</span>
            <h1 className="kl-hero__title" style={{ marginTop: '1.4rem' }}>
              A Generation<br />Set Apart.
            </h1>
            <p className="kl-hero__text">
              Discover a place to grow in the Word, develop your gifts, build meaningful friendships and make a positive difference — a teenage expression of Christ Embassy Central Church 3, Port Harcourt Zone 3.
            </p>
            <p className="text-gold font-extrabold tracking-[0.10em] uppercase text-[0.82rem] mt-3 italic">Growing in the Word. Living with Purpose. Influencing Our World.</p>
            <div className="kl-hero__cta">
              <Link href="/teens/church" className="btn btn--navy">Discover Teens Church</Link>
              <Link href="/teens/word" className="btn btn--ghost">Explore the Word Centre →</Link>
            </div>
            <div className="kl-hero__hairline" />
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-muted">
              <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[var(--kl-navy)]" /> Sundays 8AM · During Main Celebration</span>
              <span className="hidden sm:inline text-black/10">·</span>
              <span>30B Rumuokwuta — Group Church</span>
              <span className="hidden sm:inline text-black/10">·</span>
              <Link href="/teens/connect" className="underline decoration-gold/30 underline-offset-4 hover:text-navy">Parent info →</Link>
            </div>
          </div>
          <div className="kl-hero__art">
            {/* Teens hero art — same card shape as Main, with Teens collage inside */}
            <div className="kl-hero__slider">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverUrl} alt="Teens worship — placeholder, replace with verified CC3 Teens photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="kl-hero__slide-caption" style={{ background: 'linear-gradient(transparent, rgba(8,15,31,0.78))' }}>
                <div className="kl-hero__slide-name">CC3 Teens Church — Worship & Word</div>
                <div className="kl-hero__slide-title">Sundays 8AM · Supervised · Parent-aware</div>
              </div>
              <div className="kl-hero__dots"><span className="kl-hero__dot is-active" /><span className="kl-hero__dot" /><span className="kl-hero__dot" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* WELCOME — same centered + kl-feature-grid + stat bar as Main */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container-cc">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.2rem' }}>
            <span className="eyebrow" style={{ background:'#fff', border:'1.5px solid rgba(14,27,51,0.08)', borderRadius:'999px', padding:'0.4rem 0.9rem', display:'inline-flex', gap:'0.5rem' }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#C6A04A', boxShadow:'0 0 0 4px #EAF0F7', display:'inline-block' }} /> Welcome — You Belong Here
            </span>
            <h2 style={{ fontFamily:'var(--font-display),serif', fontWeight:800, fontSize:'clamp(1.8rem,3.5vw,2.6rem)', lineHeight:1.05, marginTop:'0.9rem', color:'#0E1B33' }}>
              There&apos;s a Place for You to Belong — and Become.
            </h2>
            <p style={{ color:'#64748B', marginTop:'0.6rem' }}>
              Not a side programme. CC3 Teens Church is a local expression of Christ Embassy — teenagers growing spiritually, finding purpose and influencing their generation. LoveWorld Nation → Port Harcourt Zone 3 → CC3 Group Church → Teens Church.
            </p>
          </div>
          <div className="kl-feature-grid">
            {[
              { t:'Know the Word', d:'TeeVo-rooted teaching on identity, faith & character — every week. Official TeeVo via teevo.org, never copied.', a:'gold', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8"/><path d="M8 11h8"/></svg> },
              { t:'Find Your People', d:'Real friendships — small groups, not crowds. Safe, supervised, parent-aware fellowship.', a:'vermilion', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
              { t:'Use Your Gifts', d:'Music, media, drama, dance, tech — your talent has a place now. Creativity with excellence.', a:'navy', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg> },
            ].map(c=>(
              <article key={c.t} className="kl-feature-card">
                <div className={`kl-feature-card__icon kl-feature-card__icon--${c.a}`}>{c.icon}</div>
                <h3 style={{ fontFamily:'var(--font-display),serif', fontWeight:800, color:'#0E1B33', letterSpacing:'-0.01em' }}>{c.t}</h3>
                <p style={{ fontSize:'0.9rem', color:'#64748B', marginTop:'0.4rem', lineHeight:1.6 }}>{c.d}</p>
              </article>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0.5rem', marginTop:'1.6rem', background:'#0E1B33', borderRadius:'16px', padding:'1rem 0.6rem', color:'#fff', boxShadow:'0 12px 32px -12px rgba(14,27,51,0.25)' }}>
            {[{ n:'13–19', l:'teenagers' },{ n:'TeeVo', l:'daily devotional' },{ n:'TITHE', l:'each one reach one' },{ n:'100%', l:'LoveWorld family' }].map(s=>(
              <div key={s.l} style={{ textAlign:'center', padding:'0.3rem', borderRight:'1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontFamily:'var(--font-display),serif', fontWeight:800, color:'#C6A04A', fontSize:'1.5rem' }}>{s.n}</div>
                <div style={{ fontSize:'0.58rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — same sticky + list pattern as Main: “Our Week in the Word” */}
      <section className="section" style={{ background:'#fff', borderTop:'1px solid rgba(14,27,51,0.06)' }}>
        <div className="container-cc kl-services">
          <div className="kl-services__sticky">
            <span className="eyebrow" style={{ background:'#fff', border:'1.5px solid rgba(14,27,51,0.06)', borderRadius:'999px', padding:'0.35rem 0.8rem' }}>Our Week in the Word</span>
            <h2 style={{ fontFamily:'var(--font-display),serif', fontWeight:800, color:'#0E1B33', fontSize:'clamp(1.8rem,3vw,2.4rem)', lineHeight:0.95, marginTop:'0.7rem' }}>Appointed Times<br />in His Presence</h2>
            <p style={{ color:'#64748B', fontSize:'0.92rem', marginTop:'0.6rem', maxWidth:'32ch' }}>Appointed times for Teens to receive the Word — during Main Celebration and through weekly TeeVo Clubs & fellowship. Come early for prayer.</p>
            <Link href="/teens/events" style={{ display:'inline-flex', marginTop:'1.2rem', fontSize:'0.82rem', fontWeight:700, color:'#0E1B33', borderBottom:'1.5px solid #0E1B33', paddingBottom:'2px', textDecoration:'none' }}>View full Teens calendar →</Link>
            <div className="kl-services__image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverUrl} alt="Teens gathering — Sunday Celebration" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="kl-services__list">
            {[
              { day: 'Sunday', time:'8:00 AM', name:'Teens Church — Celebration', description:'Worship, Word & fellowship during Main Service. Welcome desk from 7:30AM. Supervised.', slug:'sunday-celebration' },
              { day: 'Weekly', time:'Schools', name:'TeeVo Clubs', description:'Weekly Bible study in schools & zones — supervised, authorised. No student lists published without consent.', slug:'teevo-clubs' },
              { day: 'As announced', time:'Quarterly', name:'TITHE & Outreach', description:'Evangelism thrust — teens reaching teens. Via authorised coordinators only.', slug:'tithe' },
              { day: 'As announced', time:'Monthly', name:'Creative Rehearsals', description:'Choir, media, drama, dance — excellence for service and outreaches.', slug:'creative' },
            ].map(s=>(
              <Link key={s.slug} href={`/teens/events`} className="kl-service-row" style={{ textDecoration:'none' }}>
                <span className="kl-service-row__time"><i />{s.day} · {s.time}</span>
                <div>
                  <div className="kl-service-row__title">{s.name}</div>
                  <div className="kl-service-row__desc">{s.description}</div>
                </div>
                <span className="kl-service-row__arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED — same dark kl-lesson as Main: “Faith That Prevails” → TeeVo focus */}
      <section className="section" style={{ background:'#EAF0F7' }}>
        <div className="container-cc">
          <div className="kl-lesson">
            <div className="kl-lesson__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverUrl} alt="Teens Word Encounter" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="eyebrow" style={{ background:'rgba(255,255,255,0.1)', borderColor:'rgba(255,255,255,0.2)', color:'#C6A04A', borderRadius:'999px', padding:'0.35rem 0.7rem' }}>TeeVo Daily · Official</span>
              <h2 style={{ fontFamily:'var(--font-display),serif', fontWeight:800, color:'#fff', fontSize:'clamp(1.6rem,3vw,2.3rem)', lineHeight:1, marginTop:'0.7rem' }}>You&apos;re God&apos;s Chosen & Set Apart</h2>
              <p style={{ color:'rgba(255,255,255,0.78)', marginTop:'0.5rem', fontSize:'0.9rem' }}>Your daily devotional — Scripture, message, prayer & confession from TeeVo. We link to the official resource at teevo.org, never republishing copyrighted content.</p>
              <div style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:'14px', padding:'0.8rem 0.9rem', marginTop:'0.9rem' }}>
                <div style={{ fontSize:'0.58rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#C6A04A' }}>Scripture</div>
                <blockquote style={{ fontFamily:'var(--font-display),serif', fontWeight:700, marginTop:'0.2rem' }}>“You are a chosen generation, a royal priesthood…”</blockquote>
                <cite style={{ fontStyle:'normal', fontSize:'0.66rem', color:'rgba(255,255,255,0.6)' }}>1 Peter 2:9 · TeeVo.org</cite>
              </div>
              <div style={{ display:'flex', gap:'0.6rem', marginTop:'1rem' }}>
                <a href="https://teevo.org" target="_blank" rel="noreferrer" className="btn" style={{ background:'#C6A04A', color:'#0E1B33', borderRadius:'999px', fontWeight:800, boxShadow:'4px 4px 0 #080f1f' }}>Read on TeeVo</a>
                <Link href="/teens/word" className="btn" style={{ background:'transparent', color:'#fff', border:'1.5px solid rgba(255,255,255,0.4)', borderRadius:'999px' }}>Word Centre</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS — same “Current & Upcoming: Current dark card + editorial rows” as Main */}
      <section className="section" style={{ background:'#fff' }}>
        <div className="container-cc">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:'1rem', flexWrap:'wrap', marginBottom:'1.2rem' }}>
            <SectionHeading eyebrow="Current & Upcoming" title="Your Week Set in Glory" desc="One current focus, then blessed appointments ahead — all for your increase." />
            <Link href="/teens/events" className="btn btn--navy" style={{ borderRadius:'999px' }}>View all events →</Link>
          </div>
          {/* Map main events data into Teens-flavoured Current + rows — reuses same markup */}
          {(() => {
            const teensCurrent = { title:'Teens Church — Sunday Celebration', category:'Weekly', excerpt:'Worship, Word & fellowship every Sunday 8AM during Main Service. New teens register at the welcome desk. Parents check signage for rooms.', date:'Every Sunday', time:'8:00 AM', venue:'30B Rumuokwuta — Group Church', image: coverUrl, slug:'teens-sunday' }
            const teensUpcoming = [
              { id:'t1', title:'TeeVo Club Rally — Schools Gathering', excerpt:'Bible challenge & outreach rehearsal. Verified date to be announced by coordinator.', date:'2026-03-15', time:'3:00 PM', venue:'As announced', category:'TeeVo Clubs', image: outreachUrl, slug:'teevo-rally' },
              { id:'t2', title:'TITHE Campaign — Street & School Evangelism', excerpt:'Teens reaching teens with the Gospel — teams + follow-up via authorised coordinators.', date:'2026-03-22', time:'10:00 AM', venue:'City zones', category:'TITHE', image: outreachUrl, slug:'tithe-campaign' },
              { id:'t3', title:'Creative Showcase — Music, Dance & Spoken Word', excerpt:'Talent for ministry — parent-invited, consent-published. Excellence in service.', date:'2026-04-05', time:'4:00 PM', venue:'Group Church', category:'Creative', image: familyUrl, slug:'creative-showcase' },
            ]
            return (
              <>
                <Link href={`/teens/events`} style={{ textDecoration:'none', display:'block', marginBottom:'1.2rem' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1.2fr 0.8fr', gap:'1.2rem', background:'#0E1B33', border:'1.5px solid #080f1f', borderRadius:'24px', overflow:'hidden', boxShadow:'6px 6px 0 #080f1f' }}>
                    <div style={{ padding:'1.6rem' }}>
                      <div style={{ display:'inline-flex', gap:'0.5rem', alignItems:'center' }}>
                        <span style={{ background:'#C6A04A', color:'#0E1B33', borderRadius:'999px', padding:'0.25rem 0.6rem', fontSize:'0.62rem', fontWeight:800, letterSpacing:'0.08em', textTransform:'uppercase' }}>Current</span>
                        <span style={{ background:'rgba(255,255,255,0.1)', color:'#fff', border:'1px solid rgba(255,255,255,0.15)', borderRadius:'999px', padding:'0.25rem 0.6rem', fontSize:'0.62rem', fontWeight:700 }}>{teensCurrent.category}</span>
                      </div>
                      <h3 style={{ fontFamily:'var(--font-display),serif', fontWeight:800, color:'#fff', fontSize:'clamp(1.4rem,2.5vw,1.9rem)', lineHeight:1.05, marginTop:'0.8rem' }}>{teensCurrent.title}</h3>
                      <p style={{ color:'rgba(255,255,255,0.78)', fontSize:'0.88rem', marginTop:'0.5rem', lineHeight:1.6 }}>{teensCurrent.excerpt}</p>
                      <div style={{ display:'flex', gap:'0.6rem', marginTop:'0.9rem', flexWrap:'wrap', alignItems:'center' }}>
                        <span style={{ background:'#fff', color:'#0E1B33', borderRadius:'999px', padding:'0.4rem 0.7rem', fontSize:'0.72rem', fontWeight:700 }}>{teensCurrent.date} · {teensCurrent.time}</span>
                        <span style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.72rem' }}>{teensCurrent.venue}</span>
                      </div>
                      <div style={{ marginTop:'1rem' }}>
                        <span style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', background:'#C6A04A', color:'#0E1B33', borderRadius:'999px', padding:'0.6rem 1rem', fontSize:'0.8rem', fontWeight:800 }}>View details →</span>
                      </div>
                    </div>
                    <div style={{ position:'relative', minHeight:'260px', background:'#fff' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={teensCurrent.image} alt={teensCurrent.title} referrerPolicy="no-referrer" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
                    </div>
                  </div>
                </Link>
                <div className="kl-event-editorial">
                  {teensUpcoming.map(e=>(
                    <Link key={e.id} href={`/teens/events`} className="kl-event-row kl-event-row--withImg" style={{ textDecoration:'none', color:'inherit' }}>
                      <div className="kl-event-row__date"><div className="kl-event-row__day">{(e.date as string).slice(8,10)}</div><div className="kl-event-row__month">{(e.date as string).slice(5,7)}/26</div></div>
                      <div className="kl-event-row__thumb">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={e.image} alt={e.title} referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="kl-event-row__cat">{e.category}</div>
                        <div className="kl-event-row__title">{e.title}</div>
                        <div className="kl-event-row__excerpt">{e.excerpt}</div>
                        <div className="kl-event-row__meta"><span>{e.time}</span><span>·</span><span>{e.venue}</span></div>
                      </div>
                      <span className="kl-event-row__arrow">→</span>
                    </Link>
                  ))}
                </div>
              </>
            )
          })()}
        </div>
      </section>

      {/* MINISTRIES + GALLERY — same kl-bento as Main */}
      <section className="section" style={{ background:'#fff', borderTop:'1px solid rgba(14,27,51,0.06)' }}>
        <div className="container-cc">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:'1rem', flexWrap:'wrap', marginBottom:'1.5rem' }}>
            <SectionHeading eyebrow="Life at Teens" title="Fulfil Your Calling" desc="Take your place and function in your divine assignment — with joy, excellence and the power of the Spirit. Verified departments only." />
            <Link href="/teens/gifts" className="btn" style={{ background:'#fff', border:'1.5px solid #0E1B33', borderRadius:'999px' }}>Departments →</Link>
          </div>
          <div className="kl-bento">
            <div className="kl-bento__ministries">
              {[
                { name:'TeeVo Clubs', purpose:'Weekly Bible study in schools — supervised, authorised. No lists without consent.', group:'TeeVo / Schools', href:'/teens/activities', image: coverUrl },
                { name:'TITHE Outreach', purpose:'Every teen a soul winner — streets & schools, follow-up via coordinators.', group:'Evangelism', href:'/teens/activities', image: outreachUrl },
                { name:'Music & Worship', purpose:'Choir, instruments, worship — excellence for Celebration and outreaches.', group:'Creative / Choir', href:'/teens/gifts', image: coverUrl },
                { name:'Media & Tech', purpose:'Photography, sound, livestream — skill with excellence.', group:'Media / Tech', href:'/teens/gifts', image: familyUrl },
              ].map(m=>(
                <Link key={m.name} href={m.href} className="kl-class-card" style={{ textDecoration:'none' }}>
                  <div className="kl-class-card__media"><Image src={m.image} alt={m.name} width={400} height={300} style={{ width:'100%', height:'100%', objectFit:'cover' }} /></div>
                  <div className="kl-class-card__body">
                    <div style={{ fontSize:'0.58rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'#64748B' }}>{m.group}</div>
                    <h3>{m.name}</h3>
                    <p style={{ fontSize:'0.78rem', color:'#64748B' }}>{m.purpose}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="kl-bento__gallery">
              {galleryItems.map((g,i)=>(
                <Link key={i} href={g.href} className="kl-bento__gallery-item">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={g.cap} referrerPolicy="no-referrer" />
                  <span className="kl-bento__gallery-cap">{g.cap}</span>
                </Link>
              ))}
            </div>
          </div>
          <div style={{ textAlign:'center', marginTop:'1.2rem' }}>
            <Link href="/teens/resources" style={{ fontSize:'0.82rem', fontWeight:700, color:'#0E1B33', borderBottom:'1.5px solid #0E1B33', paddingBottom:'2px', textDecoration:'none' }}>View full Teens gallery →</Link>
          </div>
        </div>
      </section>

      {/* NEXT STEPS — same kl-panel as Main */}
      <section className="section" style={{ background:'#EAF0F7' }}>
        <div className="container-cc">
          <div className="kl-panel">
            <div className="kl-panel__content">
              <span className="eyebrow" style={{ background:'#fff', border:'1.5px solid rgba(14,27,51,0.06)', borderRadius:'999px', padding:'0.35rem 0.7rem', display:'inline-flex', gap:'0.4rem' }}>
                <span style={{ width:7, height:7, borderRadius:'50%', background:'#C6A04A', boxShadow:'0 0 0 4px #fff', display:'inline-block' }} /> Your Journey in Teens
              </span>
              <h2 style={{ fontFamily:'var(--font-display),serif', fontWeight:800, color:'#0E1B33', fontSize:'1.9rem', lineHeight:1, marginTop:'0.6rem' }}>Be Nurtured. Serve. Shine.</h2>
              <p style={{ color:'#64748B', fontSize:'0.9rem', marginTop:'0.5rem' }}>From first welcome to family — nurtured in the Word via TeeVo & Foundation School, perfected for ministry, established to shine ever brighter.</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem', margin:'1rem 0' }}>
                {[
                  { l:'New Here?', h:'/teens/church', c:'#fff', i:'◼' },
                  { l:'Word Centre', h:'/teens/word', c:'#fff', i:'⬢' },
                  { l:'Foundation School', h:'/foundation-school', c:'#FEF2F0', i:'⬣' },
                  { l:'Departments', h:'/teens/gifts', c:'#fff', i:'✦' },
                ].map(a=>(
                  <Link key={a.l} href={a.h} style={{ display:'flex', gap:'0.5rem', alignItems:'center', padding:'0.55rem 0.65rem', background:'#fff', border:'1px solid rgba(14,27,51,0.06)', borderRadius:'12px', fontSize:'0.8rem', fontWeight:600, color:'#0E1B33', textDecoration:'none' }}>
                    <span style={{ width:26, height:26, borderRadius:'8px', background:a.c, border:'1px solid rgba(14,27,51,0.06)', display:'grid', placeItems:'center', fontSize:'0.65rem' }}>{a.i}</span>{a.l}
                  </Link>
                ))}
              </div>
              <Link href="/teens/church" className="btn btn--navy" style={{ borderRadius:'999px', boxShadow:'4px 4px 0 #080f1f' }}>Plan your first visit →</Link>
            </div>
            <div className="kl-panel__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={familyUrl} alt="Teens family — placeholder" referrerPolicy="no-referrer" />
              <span style={{ position:'absolute', bottom:'1rem', left:'1rem', background:'#0E1B33', color:'#fff', border:'1px solid #fff', borderRadius:'10px', padding:'0.35rem 0.6rem', fontSize:'0.68rem', fontWeight:700, boxShadow:'3px 3px 0 #fff' }}>◆ Sunday 8AM · Supervised</span>
            </div>
          </div>
        </div>
      </section>

      {/* PARENTS — same kl-parents as Main */}
      <section className="section" style={{ background:'#fff' }}>
        <div className="container-cc">
          <div className="kl-parents">
            <div>
              <span className="eyebrow" style={{ background:'#fff', border:'1px solid rgba(14,27,51,0.06)', borderRadius:'999px', padding:'0.35rem 0.7rem' }}>Parents, you&apos;re welcome</span>
              <h2 style={{ fontFamily:'var(--font-display),serif', fontWeight:800, color:'#0E1B33', fontSize:'1.7rem', lineHeight:1, marginTop:'0.6rem' }}>We Take Trust Seriously.</h2>
              <p style={{ color:'#64748B', fontSize:'0.9rem', marginTop:'0.5rem', maxWidth:'48ch' }}>Supervised rooms, vetted volunteers, no private DMs, media and events only with consent. Concerns → Group Pastor → Zonal office. You&apos;ll know who leads, when, where and how to reach us.</p>
              <div style={{ display:'flex', gap:'0.6rem', marginTop:'1rem', flexWrap:'wrap' }}>
                <Link href="/teens/connect" className="btn btn--navy" style={{ borderRadius:'999px', boxShadow:'4px 4px 0 #080f1f' }}>Parent Information</Link>
                <Link href="/safeguarding" className="btn" style={{ background:'#fff', border:'1px solid #0E1B33', borderRadius:'999px' }}>Safeguarding</Link>
              </div>
            </div>
            <div className="kl-parents__note">
              <h3 style={{ fontFamily:'var(--font-display),serif', fontWeight:800, color:'#0E1B33' }}>What you&apos;ll find</h3>
              <ul style={{ marginTop:'0.5rem', display:'flex', flexDirection:'column', gap:'0.3rem' }}>
                {[
                  'Appointed, trained, supervised leaders — no private contact.',
                  'Teaching: Identity, faith, purpose — TeeVo & Bible, Christ Embassy doctrine.',
                  'Meets Sundays 8AM during Main Service — 30B Rumuokwuta (Group Church).',
                  'Monitored enquiry form → authorised coordinator.',
                ].map(li=>(
                  <li key={li} style={{ display:'flex', gap:'0.5rem', fontSize:'0.82rem', color:'#4a3a5c', padding:'0.2rem 0' }}><span style={{ color:'#C6A04A' }}>✓</span>{li}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIES — same light editorial as Main */}
      <section className="section" style={{ background:'#EAF0F7' }}>
        <div className="container-cc">
          <div style={{ background:'#fff', border:'1px solid rgba(14,27,51,0.08)', borderRadius:'24px', padding:'2.2rem', position:'relative', overflow:'hidden' }}>
            <div style={{ width:40, height:2, background:'#C6A04A', borderRadius:999 }} />
            <p style={{ fontFamily:'var(--font-display),serif', fontWeight:800, fontSize:'clamp(1.3rem,2.8vw,1.8rem)', lineHeight:1.2, marginTop:'0.8rem', color:'#0E1B33' }}>“TeeVo taught me who I am in Christ — now I help friends study the Word too.”</p>
            <div style={{ marginTop:'0.6rem', fontSize:'0.8rem', fontWeight:700, color:'#64748B' }}>J. — CC3 Teens · Sample testimony (verified testimonies only at launch)</div>
            <div style={{ display:'flex', gap:'0.5rem', marginTop:'1rem' }}>
              <Link href="/teens/resources" className="btn btn--navy" style={{ borderRadius:'999px' }}>Explore Teens resources</Link>
              <Link href="/teens/connect" className="btn" style={{ background:'#fff', border:'1.5px solid #0E1B33', borderRadius:'999px' }}>Contact & Visit</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA — same kl-final as Main */}
      <section className="section" style={{ background:'#fff' }}>
        <div className="container-cc">
          <div className="kl-final">
            <div style={{ position:'relative', zIndex:1 }}>
              <span style={{ background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.25)', color:'#fff', borderRadius:'999px', padding:'0.35rem 0.8rem', fontSize:'0.68rem', fontWeight:700 }}>Plan your visit</span>
              <h2 style={{ fontFamily:'var(--font-display),serif', fontWeight:800, fontSize:'clamp(1.8rem,3.5vw,2.8rem)', lineHeight:1, marginTop:'0.8rem', maxWidth:'18ch', marginInline:'auto' }}>A Generation Set Apart — Shining Ever Brighter.</h2>
              <p style={{ color:'rgba(255,255,255,0.8)', maxWidth:'52ch', margin:'0.6rem auto 0', fontSize:'0.92rem' }}>Come this Sunday — bring a friend, bring family. Grow in the Word, discover purpose and take your world for Jesus! Blessed be God!</p>
              <div style={{ display:'flex', gap:'0.6rem', justifyContent:'center', marginTop:'1.2rem', flexWrap:'wrap' }}>
                <Link href="/teens/church" className="btn" style={{ background:'#C6A04A', color:'#0E1B33', borderRadius:'999px', fontWeight:800, boxShadow:'4px 4px 0 #080f1f', padding:'0.9rem 1.4rem' }}>Plan Your Visit</Link>
                <Link href="/teens/connect" className="btn" style={{ background:'transparent', color:'#fff', border:'1.5px solid rgba(255,255,255,0.4)', borderRadius:'999px' }}>Contact us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location — same two-col + map as Main */}
      <section className="section" style={{ background:'#fff' }}>
        <div className="container-cc" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.8rem' }}>
          <div>
            <div style={{ fontSize:'0.62rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#C6A04A' }}>Contact & Location</div>
            <h2 style={{ fontFamily:'var(--font-display),serif', fontWeight:800, color:'#0E1B33', fontSize:'1.6rem', marginTop:'0.4rem' }}>Find us in Port Harcourt</h2>
            <p style={{ color:'#64748B', marginTop:'0.4rem', fontSize:'0.9rem' }}>{site.address} · Teens check-in at welcome desk. Content to be verified before launch.</p>
            <div style={{ display:'flex', gap:'0.5rem', marginTop:'0.9rem' }}>
              <Link href="/teens/connect" className="btn btn--navy" style={{ borderRadius:'999px' }}>Get directions</Link>
              <a href={`https://maps.google.com/?q=${site.lat},${site.lng}`} target="_blank" rel="noreferrer" className="btn" style={{ background:'#fff', border:'1.5px solid #0E1B33', borderRadius:'999px' }}>Open in maps</a>
            </div>
          </div>
          <div style={{ border:'1px solid rgba(14,27,51,0.08)', borderRadius:'16px', overflow:'hidden', height:'280px', position:'relative', boxShadow:'0 8px 24px -12px rgba(14,27,51,0.12)' }}>
            <iframe title="Map" src={`https://maps.google.com/maps?q=${site.lat},${site.lng}&z=17&t=&ie=UTF8&iwloc=&output=embed`} style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:0 }} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section" style={{ background:'#EAF0F7' }}>
        <div className="container-cc" style={{ background:'#fff', border:'1px solid rgba(14,27,51,0.06)', borderRadius:'16px', padding:'1.5rem', display:'flex', justifyContent:'space-between', gap:'1rem', flexWrap:'wrap', alignItems:'center' }}>
          <div>
            <h3 style={{ fontFamily:'var(--font-display),serif', fontWeight:800, color:'#0E1B33' }}>Stay updated — Teens news & events</h3>
            <p style={{ fontSize:'0.8rem', color:'#64748B', marginTop:'0.2rem' }}>Reminders for special programmes, not spam.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <div className="container-cc" style={{ padding:'1rem 0 0', textAlign:'center', fontSize:'11px', color:'#94A3B8' }}>CC3 Teens Church · Port Harcourt Zone 3 · Affiliate of Christ Embassy · Content collection 0/14 — placeholders until verified.</div>
    </div>
  )
}
