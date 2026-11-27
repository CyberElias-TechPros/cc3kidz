import Link from 'next/link'
import Image from 'next/image'
import './kids-layout.css'
import { site } from '@/lib/site'
import { SectionHeading } from '@/components/Section'
import NewsletterForm from '@/components/forms/NewsletterForm'
import { nextServiceDate } from '@/lib/dates'
import services from '@/data/services.json'
import ministries from '@/data/ministries.json'
import events from '@/data/events.json'
import cc3Photos from '@/data/cc3Photos.json'
import { ZoneBreadcrumb } from '@/components/group/ZoneBreadcrumb'
import HeroSlider from '@/components/HeroSlider'
import { MinistryFamilyBar } from '@/components/ministry/MinistryFamilyBar'
import { WebGLShader } from '@/components/effects/WebGLShader'
import { ScrollReveal, KineticHeading } from '@/components/effects/KineticText'
import ServiceCountdown from '@/components/ServiceCountdown'
import AnnouncementBar from '@/components/AnnouncementBar'
import PlatformHub from '@/components/PlatformHub'
import { announcements } from '@/lib/site'

export default function Home() {
  const next = nextServiceDate('Sunday', '8:00 AM')
  // Local CC3 images — stable, no fbcdn expiry/broken optimizer
  const coverUrl = '/assets/images/cc3/service-congregation.jpg'
  const sundayServiceUrl = '/assets/images/cc3/service-congregation.jpg'
  const wordWorshipUrl = '/assets/images/cc3/service-chairs.jpg'
  const praiseUrl = '/assets/images/cc3/reachout-world.webp'
  const fellowshipUrl = '/assets/images/main-family.webp'
  const worshipEncounterUrl = '/assets/images/cc3/service-congregation.jpg'
  const outreachUrl = '/assets/images/cc3/reachout-world.webp'
  const familyUrl = '/assets/images/main-family.webp'
  const teensUrl = '/assets/images/cc3/service-congregation.jpg'

  // Bento gallery — distinct real images per card
  const galleryItems = [
    { src: praiseUrl, cap: 'Worship & Praise', href: '/gallery' },
    { src: familyUrl, cap: 'Church Family', href: '/gallery' },
    { src: outreachUrl, cap: 'Media & Outreach', href: '/gallery' },
  ]

  return (
    <>
      <div className="container-cc"><ZoneBreadcrumb /></div>
      <MinistryFamilyBar current="/" hideLabel hideAges excludeCurrent />

      {/* HERO — Pastor slider: Chris → Linda → Kelson (5s) — Masterclass shader */}
      <section className="kl-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <WebGLShader className="absolute inset-0" intensity={0.8} opacity={0.15} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(600px 400px at 80% 20%, rgba(198,160,74,0.08), transparent 60%)' }} aria-hidden />
        <div className="container-cc kl-hero__inner" style={{ position: 'relative' }}>
          <div>
            <span className="kl-hero__kicker"><i /> Port Harcourt · 30B Rumuokwuta · Sunday 8AM</span>
            <h1 className="kl-hero__title" style={{marginTop:'1.4rem'}}>
              Christ Embassy:<br/>Giving your life a meaning
            </h1>
            <p className="kl-hero__text">A LoveWorld family at Rumuokwuta — raised in the efficacious Word, led by the Spirit, manifesting the grace and glory of God in righteousness. Glory!</p>
            <p className="text-gold font-extrabold tracking-[0.10em] uppercase text-[0.88rem] mt-3 italic">God&apos;s Word. His Presence. The Glorious Life.</p>
            <div className="kl-hero__cta">
              <Link href="/new-here" className="btn btn--navy">Experience the Word this Sunday</Link>
              <Link href="/online" className="btn btn--ghost">Join Our Live Stream →</Link>
            </div>
            <div className="kl-hero__hairline" />
          </div>
          <div className="kl-hero__art">
            <HeroSlider />
          </div>
        </div>
      </section>

      {/* Announcement — moved after hero per request (was site-top Upcoming bar) */}
      <AnnouncementBar items={announcements as any} />

      {/* WELCOME — kept as cards per choice */}
      <section className="section" style={{background:'#fff'}}>
        <div className="container-cc">
          <div style={{textAlign:'center',maxWidth:'720px',margin:'0 auto 2.2rem'}}>
            <span className="eyebrow" style={{background:'#fff',border:'1.5px solid rgba(14,27,51,0.08)',borderRadius:'999px',padding:'0.4rem 0.9rem',display:'inline-flex',gap:'0.5rem'}}>
              <span style={{width:8,height:8,borderRadius:'50%',background:'#C6A04A',boxShadow:'0 0 0 4px #EAF0F7',display:'inline-block'}}/> Welcome — You Belong Here
            </span>
            <h2 style={{fontFamily:'var(--font-display),serif',fontWeight:800,fontSize:'clamp(1.8rem,3.5vw,2.6rem)',lineHeight:1.05,marginTop:'0.9rem',color:'#0E1B33'}}>
              A Family of Love, the Fullness of the Word, and Your Place of Increase.
            </h2>
            <p style={{color:'#64748B',marginTop:'0.6rem'}}>At Central Church 3 we hunger for the Word and fellowship of the Spirit — raising an ever-winning, joyous people, established in righteousness, living the victorious life in Christ. Blessed be God!</p>
          </div>
          <div className="kl-feature-grid">
            {[
              {t:'The Word',d:'The infallible Word that builds your spirit, fortifies your faith and causes you to reign in life — Sunday Service, Midweek & Monday Prayer & Prophecy, Foundation School. Hallelujah!',a:'gold', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8"/><path d="M8 11h8"/></svg>
              )},
              {t:'Fellowship',d:'92 vibrant cells in 6 churches — one family in Christ where no one walks alone; every life counts for the Gospel. Glory!',a:'vermilion', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              )},
              {t:'Mission & Service',d:'Choir, media, ushering, soul-winning — discover the anointing on your life and fulfil your divine assignment with excellence.',a:'navy', icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
              )},
            ].map(c=>(
              <article key={c.t} className="kl-feature-card">
                <div className={`kl-feature-card__icon kl-feature-card__icon--${c.a}`}>{c.icon}</div>
                <h3 style={{fontFamily:'var(--font-display),serif',fontWeight:800,color:'#0E1B33',letterSpacing:'-0.01em'}}>{c.t}</h3>
                <p style={{fontSize:'0.9rem',color:'#64748B',marginTop:'0.4rem',lineHeight:1.6}}>{c.d}</p>
              </article>
            ))}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0.5rem',marginTop:'1.6rem',background:'#0E1B33',borderRadius:'16px',padding:'1rem 0.6rem',color:'#fff',boxShadow:'0 12px 32px -12px rgba(14,27,51,0.25)'}}>
            {[{n:'6',l:'churches · one group'},{n:'3',l:'weekly services'},{n:'100%',l:'LoveWorld family'}].map(s=>(
              <div key={s.l} style={{textAlign:'center',padding:'0.3rem',borderRight:'1px solid rgba(255,255,255,0.1)'}}>
                <div style={{fontFamily:'var(--font-display),serif',fontWeight:800,color:'#C6A04A',fontSize:'1.5rem'}}>{s.n}</div>
                <div style={{fontSize:'0.58rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(255,255,255,0.6)'}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — When we gather: real Sunday service image */}
      <section className="section" style={{background:'#fff', borderTop:'1px solid rgba(14,27,51,0.06)'}}>
        <div className="container-cc kl-services">
          <div className="kl-services__sticky">
            <span className="eyebrow" style={{background:'#fff',border:'1.5px solid rgba(14,27,51,0.06)',borderRadius:'999px',padding:'0.35rem 0.8rem'}}>Our Week in the Word</span>
            <h2 style={{fontFamily:'var(--font-display),serif',fontWeight:800,color:'#0E1B33',fontSize:'clamp(1.8rem,3vw,2.4rem)',lineHeight:0.95,marginTop:'0.7rem'}}>Service Times</h2>
            <p style={{color:'#64748B',fontSize:'0.92rem',marginTop:'0.6rem',maxWidth:'32ch'}}>Appointed times to receive the Word and impartation — at Rumuokwuta or online. Come early for prevailing intercession.</p>
            <Link href="/services" style={{display:'inline-flex',marginTop:'1.2rem',fontSize:'0.82rem',fontWeight:700,color:'#0E1B33',borderBottom:'1.5px solid #0E1B33',paddingBottom:'2px',textDecoration:'none'}}>View full schedule →</Link>
            <div className="kl-services__image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sundayServiceUrl} alt="CC3 Sunday Service — Port Harcourt Zone 3" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="kl-services__list">
            {services.slice(0,4).map((s:any)=>(
              <Link key={s.id} href={`/services/${s.slug}`} className="kl-service-row" style={{textDecoration:'none'}}>
                <span className="kl-service-row__time"><i aria-hidden />{s.day} · {s.time}</span>
                <div style={{minWidth:0}}>
                  <div className="kl-service-row__title">{s.name}</div>
                  <div className="kl-service-row__desc">{s.description}</div>
                </div>
                <span className="kl-service-row__arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED MESSAGE — Worship Encounter real image */}
      <section className="section" style={{background:'#EAF0F7'}}>
        <div className="container-cc">
          <div className="kl-lesson">
            <div className="kl-lesson__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={worshipEncounterUrl} alt="CC3 Worship Encounter — Sunday Service" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="eyebrow" style={{background:'rgba(255,255,255,0.1)',borderColor:'rgba(255,255,255,0.2)',color:'#C6A04A',borderRadius:'999px',padding:'0.35rem 0.7rem'}}>Sunday Service · 8AM</span>
              <h2 style={{fontFamily:'var(--font-display),serif',fontWeight:800,color:'#fff',fontSize:'clamp(1.6rem,3vw,2.3rem)',lineHeight:1,marginTop:'0.7rem'}}>Faith That Prevails</h2>
              <p style={{color:'rgba(255,255,255,0.78)',marginTop:'0.5rem',fontSize:'0.9rem'}}>Faith is not a mystery — it is the lifestyle of the new creation. Learn how the Word builds prevailing, ever-increasing faith that reigns. Glory!</p>
              <div style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'14px',padding:'0.8rem 0.9rem',marginTop:'0.9rem'}}>
                <div style={{fontSize:'0.58rem',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'#C6A04A'}}>Scripture</div>
                <blockquote style={{fontFamily:'var(--font-display),serif',fontWeight:700,marginTop:'0.2rem'}}>“Now faith is the substance of things hoped for…”</blockquote>
                <cite style={{fontStyle:'normal',fontSize:'0.66rem',color:'rgba(255,255,255,0.6)'}}>Hebrews 11:1 · Romans 10:17</cite>
              </div>
              <div style={{display:'flex',gap:'0.6rem',marginTop:'1rem'}}>
                <Link href="/media/faith-that-prevails" className="btn" style={{background:'#C6A04A',color:'#0E1B33',borderRadius:'999px',fontWeight:800,boxShadow:'4px 4px 0 #080f1f'}}>Watch message</Link>
                <Link href="/new-here" className="btn" style={{background:'transparent',color:'#fff',border:'1.5px solid rgba(255,255,255,0.4)',borderRadius:'999px'}}>Visit Sunday</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT & UPCOMING — service-aware: next service via live countdown */}
      <section className="section" style={{background:'#fff'}}>
        <div className="container-cc">
          <div style={{marginBottom:'1.2rem'}}>
            <ServiceCountdown />
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:'1rem',flexWrap:'wrap',marginBottom:'1.2rem'}}>
            <SectionHeading eyebrow="Current & Upcoming" title="Your Week Set in Glory" desc="One current focus, then blessed appointments ahead — all for your increase." />
            <Link href="/events" className="btn btn--navy" style={{borderRadius:'999px'}}>View all events →</Link>
          </div>
          {(() => {
            const sorted = [...(events as any[])].sort((a,b)=> new Date(a.date).getTime() - new Date(b.date).getTime())
            const current = sorted[0]
            const upcoming = sorted.slice(1,4)
            return (
              <>
                {current && (
                  <Link href={`/events/${current.slug}`} style={{textDecoration:'none',display:'block',marginBottom:'1.2rem'}}>
                    <div style={{display:'grid',gridTemplateColumns:'1.2fr 0.8fr',gap:'1.2rem',background:'#0E1B33',border:'1.5px solid #080f1f',borderRadius:'24px',overflow:'hidden',boxShadow:'6px 6px 0 #080f1f'}}>
                      <div style={{padding:'1.6rem'}}>
                        <div style={{display:'inline-flex',gap:'0.5rem',alignItems:'center'}}>
                          <span style={{background:'#C6A04A',color:'#0E1B33',borderRadius:'999px',padding:'0.25rem 0.6rem',fontSize:'0.62rem',fontWeight:800,letterSpacing:'0.08em',textTransform:'uppercase'}}>Current</span>
                          <span style={{background:'rgba(255,255,255,0.1)',color:'#fff',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'999px',padding:'0.25rem 0.6rem',fontSize:'0.62rem',fontWeight:700}}>{current.category}</span>
                        </div>
                        <h3 style={{fontFamily:'var(--font-display),serif',fontWeight:800,color:'#fff',fontSize:'clamp(1.4rem,2.5vw,1.9rem)',lineHeight:1.05,marginTop:'0.8rem'}}>{current.title}</h3>
                        <p style={{color:'rgba(255,255,255,0.78)',fontSize:'0.88rem',marginTop:'0.5rem',lineHeight:1.6}}>{current.excerpt}</p>
                        <div style={{display:'flex',gap:'0.6rem',marginTop:'0.9rem',flexWrap:'wrap',alignItems:'center'}}>
                          <span style={{background:'#fff',color:'#0E1B33',borderRadius:'999px',padding:'0.4rem 0.7rem',fontSize:'0.72rem',fontWeight:700}}>{current.date} · {current.time}</span>
                          <span style={{color:'rgba(255,255,255,0.7)',fontSize:'0.72rem'}}>{current.venue}</span>
                        </div>
                        <div style={{marginTop:'1rem'}}>
                          <span style={{display:'inline-flex',alignItems:'center',gap:'0.4rem',background:'#C6A04A',color:'#0E1B33',borderRadius:'999px',padding:'0.6rem 1rem',fontSize:'0.8rem',fontWeight:800}}>View details →</span>
                        </div>
                      </div>
                      <div style={{position:'relative',minHeight:'260px',background:'#fff'}}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={current.image} alt={current.title} referrerPolicy="no-referrer" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} />
                      </div>
                    </div>
                  </Link>
                )}
                <div className="kl-event-editorial">
                  {upcoming.map((e:any)=>(
                    <Link key={e.id} href={`/events/${e.slug}`} className="kl-event-row kl-event-row--withImg" style={{textDecoration:'none',color:'inherit'}}>
                      <div className="kl-event-row__date"><div className="kl-event-row__day">{e.date.slice(8,10)}</div><div className="kl-event-row__month">{e.date.slice(5,7)}/26</div></div>
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

      {/* CONSOLIDATED — Ministries + Gallery bento: real CC3 images per card */}
      <section className="section" style={{background:'#fff', borderTop:'1px solid rgba(14,27,51,0.06)'}}>
        <div className="container-cc">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:'1rem',flexWrap:'wrap',marginBottom:'1.5rem'}}>
            <SectionHeading eyebrow="Life at CC3" title="Join a Service Unit" desc="Take your place and function in your divine assignment — with joy, excellence and the power of the Spirit." />
            <Link href="/ministries" className="btn" style={{background:'#fff',border:'1.5px solid #0E1B33',borderRadius:'999px'}}>Directory →</Link>
          </div>
          <div className="kl-bento">
            <div className="kl-bento__ministries">
              {ministries.slice(0,4).map((m:any)=>(
                <Link key={m.id} href={m.href} className="kl-class-card" style={{textDecoration:'none'}}>
                  <div className="kl-class-card__media"><Image src={m.image} alt={m.name} width={400} height={300} style={{width:'100%',height:'100%',objectFit:'cover'}} /></div>
                  <div className="kl-class-card__body">
                    <div style={{fontSize:'0.58rem',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'#64748B'}}>{m.group}</div>
                    <h3>{m.name}</h3>
                    <p style={{fontSize:'0.78rem',color:'#64748B'}}>{m.purpose}</p>
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
          <div style={{textAlign:'center',marginTop:'1.2rem'}}>
            <Link href="/gallery" style={{fontSize:'0.82rem',fontWeight:700,color:'#0E1B33',borderBottom:'1.5px solid #0E1B33',paddingBottom:'2px',textDecoration:'none'}}>View full gallery →</Link>
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="section" style={{background:'#EAF0F7'}}>
        <div className="container-cc">
          <div className="kl-panel">
            <div className="kl-panel__content">
              <span className="eyebrow" style={{background:'#fff',border:'1.5px solid rgba(14,27,51,0.06)',borderRadius:'999px',padding:'0.35rem 0.7rem',display:'inline-flex',gap:'0.4rem'}}>
                <span style={{width:7,height:7,borderRadius:'50%',background:'#C6A04A',boxShadow:'0 0 0 4px #fff',display:'inline-block'}}/> Your Journey in Christ
              </span>
              <h2 style={{fontFamily:'var(--font-display),serif',fontWeight:800,color:'#0E1B33',fontSize:'1.9rem',lineHeight:1,marginTop:'0.6rem'}}>Be Nurtured. Serve. Shine.</h2>
              <p style={{color:'#64748B',fontSize:'0.9rem',marginTop:'0.5rem'}}>From first visit to family — a pathway where you are nurtured in the Word, perfected for ministry, and established in righteousness to shine ever brighter.</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.5rem',margin:'1rem 0'}}>
                {[
                  {l:'Plan a visit',h:'/new-here',c:'#fff',i:'◼'},
                  {l:'Join a cell',h:'/cells',c:'#fff',i:'⬢'},
                  {l:'Foundation School',h:'/foundation-school',c:'#FEF2F0',i:'⬣'},
                  {l:'Serve in Church',h:'/ministries',c:'#fff',i:'✦'},
                ].map(a=>(
                  <Link key={a.l} href={a.h} style={{display:'flex',gap:'0.5rem',alignItems:'center',padding:'0.55rem 0.65rem',background:'#fff',border:'1px solid rgba(14,27,51,0.06)',borderRadius:'12px',fontSize:'0.8rem',fontWeight:600,color:'#0E1B33',textDecoration:'none'}}>
                    <span style={{width:26,height:26,borderRadius:'8px',background:a.c,border:'1px solid rgba(14,27,51,0.06)',display:'grid',placeItems:'center',fontSize:'0.65rem'}}>{a.i}</span>{a.l}
                  </Link>
                ))}
              </div>
              <Link href="/new-here" className="btn btn--navy" style={{borderRadius:'999px',boxShadow:'4px 4px 0 #080f1f'}}>Plan your visit →</Link>
            </div>
            <div className="kl-panel__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={familyUrl} alt="CC3 congregation family" referrerPolicy="no-referrer" />
              <span style={{position:'absolute',bottom:'1rem',left:'1rem',background:'#0E1B33',color:'#fff',border:'1px solid #fff',borderRadius:'10px',padding:'0.35rem 0.6rem',fontSize:'0.68rem',fontWeight:700,boxShadow:'3px 3px 0 #fff'}}>◆ Sunday 8AM · All welcome</span>
            </div>
          </div>
        </div>
      </section>

      {/* PASTORS WELCOME */}
      <section className="section" style={{background:'#fff'}}>
        <div className="container-cc">
          <div className="kl-parents">
            <div>
              <span className="eyebrow" style={{background:'#fff',border:'1px solid rgba(14,27,51,0.06)',borderRadius:'999px',padding:'0.35rem 0.7rem'}}>Pastors, you&apos;re welcome</span>
              <h2 style={{fontFamily:'var(--font-display),serif',fontWeight:800,color:'#0E1B33',fontSize:'1.7rem',lineHeight:1,marginTop:'0.6rem'}}>Dear Guest, You Are Most Welcome!</h2>
              <p style={{color:'#64748B',fontSize:'0.9rem',marginTop:'0.5rem',maxWidth:'48ch'}}>Whether your first time or returning, come with expectation — vibrant worship, prayer in the Spirit, the Word in demonstration, and a warm fellowship in love. Hallelujah!</p>
              <div style={{display:'flex',gap:'0.6rem',marginTop:'1rem',flexWrap:'wrap'}}>
                <Link href="/pastors" className="btn btn--navy" style={{borderRadius:'999px',boxShadow:'4px 4px 0 #080f1f'}}>Meet our pastors</Link>
                <Link href="/new-here" className="btn" style={{background:'#fff',border:'1px solid #0E1B33',borderRadius:'999px'}}>Plan your visit</Link>
              </div>
            </div>
            <div className="kl-parents__note">
              <h3 style={{fontFamily:'var(--font-display),serif',fontWeight:800,color:'#0E1B33'}}>What you&apos;ll find</h3>
              <ul style={{marginTop:'0.5rem',display:'flex',flexDirection:'column',gap:'0.3rem'}}>
                {['Warm welcome at the entrance — ushers guide you to your seat.','Vibrant worship, prayer and the Word for about 3 hours on Sunday.','Children & Teens churches run during main service.','Parking off NTA Road — Opposite Patcoin, Rumuokwuta.'].map(li=>(
                  <li key={li} style={{display:'flex',gap:'0.5rem',fontSize:'0.82rem',color:'#4a3a5c',padding:'0.2rem 0'}}><span style={{color:'#C6A04A'}}>✓</span>{li}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIES — light editorial */}
      <section className="section" style={{background:'#EAF0F7'}}>
        <div className="container-cc">
          <div style={{background:'#fff',border:'1px solid rgba(14,27,51,0.08)',borderRadius:'24px',padding:'2.2rem',position:'relative',overflow:'hidden'}}>
            <div style={{width:40,height:2,background:'#C6A04A',borderRadius:999}} />
            <p style={{fontFamily:'var(--font-display),serif',fontWeight:800,fontSize:'clamp(1.3rem,2.8vw,1.8rem)',lineHeight:1.2,marginTop:'0.8rem',color:'#0E1B33'}}>“I had struggled with back pain for two years. During prayer meeting, hands were laid on me and the pain left instantly.”</p>
            <div style={{marginTop:'0.6rem',fontSize:'0.8rem',fontWeight:700,color:'#64748B'}}>Sister Grace E. · Healing · 10 Nov 2026</div>
            <div style={{display:'flex',gap:'0.5rem',marginTop:'1rem'}}>
              <Link href="/testimonies" className="btn btn--navy" style={{borderRadius:'999px'}}>Read all testimonies</Link>
              <Link href="/testimonies#submit" className="btn" style={{background:'#fff',border:'1.5px solid #0E1B33',borderRadius:'999px'}}>Share your testimony</Link>
            </div>
          </div>
        </div>
      </section>

      {/* LOVEWORLD PLATFORMS — ministry arms & resources for every member */}
      <PlatformHub
        eyebrow="LoveWorld Platforms"
        title="One Church Family — Every Platform You Need"
        sub="From the daily Rhapsody to Healing Streams, PCDL, KingsChat and ReachOut World — the official ministry platforms of Believers' LoveWorld, for your daily walk and global impact."
        audience="main"
        max={12}
        style={{ background: '#F8FAFC' }}
      />

      {/* FINAL CTA */}
      <section className="section" style={{background:'#fff'}}>
        <div className="container-cc">
          <div className="kl-final">
            <div style={{position:'relative',zIndex:1}}>
              <span style={{background:'rgba(255,255,255,0.12)',border:'1px solid rgba(255,255,255,0.25)',color:'#fff',borderRadius:'999px',padding:'0.35rem 0.8rem',fontSize:'0.68rem',fontWeight:700}}>Plan your visit</span>
              <h2 style={{fontFamily:'var(--font-display),serif',fontWeight:800,fontSize:'clamp(1.8rem,3.5vw,2.8rem)',lineHeight:1,marginTop:'0.8rem',maxWidth:'18ch',marginInline:'auto'}}>In Christ, Your Future is Greatness — Shining Ever Brighter.</h2>
              <p style={{color:'rgba(255,255,255,0.8)',maxWidth:'52ch',margin:'0.6rem auto 0',fontSize:'0.92rem'}}>Come this Sunday — come with expectation, come with family. Grow in grace, increase in glory, and take your world for Jesus! Blessed be God!</p>
              <div style={{display:'flex',gap:'0.6rem',justifyContent:'center',marginTop:'1.2rem',flexWrap:'wrap'}}>
                <Link href="/new-here" className="btn" style={{background:'#C6A04A',color:'#0E1B33',borderRadius:'999px',fontWeight:800,boxShadow:'4px 4px 0 #080f1f',padding:'0.9rem 1.4rem'}}>Plan Your Visit</Link>
                <Link href="/contact" className="btn" style={{background:'transparent',color:'#fff',border:'1.5px solid rgba(255,255,255,0.4)',borderRadius:'999px'}}>Contact us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{background:'#fff'}}>
        <div className="container-cc" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.8rem'}}>
          <div>
            <div style={{fontSize:'0.62rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#C6A04A'}}>Contact & Location</div>
            <h2 style={{fontFamily:'var(--font-display),serif',fontWeight:800,color:'#0E1B33',fontSize:'1.6rem',marginTop:'0.4rem'}}>Find us in Port Harcourt</h2>
            <p style={{color:'#64748B',marginTop:'0.4rem',fontSize:'0.9rem'}}>{site.address}</p>
            <div style={{display:'flex',gap:'0.5rem',marginTop:'0.9rem'}}>
              <Link href="/contact" className="btn btn--navy" style={{borderRadius:'999px'}}>Get directions</Link>
              <a href={`https://maps.google.com/?q=${site.lat},${site.lng}`} target="_blank" rel="noreferrer" className="btn" style={{background:'#fff',border:'1.5px solid #0E1B33',borderRadius:'999px'}}>Open in maps</a>
            </div>
          </div>
          <div style={{border:'1px solid rgba(14,27,51,0.08)',borderRadius:'16px',overflow:'hidden',height:'280px',position:'relative',boxShadow:'0 8px 24px -12px rgba(14,27,51,0.12)'}}>
            <iframe title="Map" src={`https://maps.google.com/maps?q=${site.lat},${site.lng}&z=17&t=&ie=UTF8&iwloc=&output=embed`} style={{position:'absolute',inset:0,width:'100%',height:'100%',border:0}} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section" style={{background:'#EAF0F7'}}>
        <div className="container-cc" style={{background:'#fff',border:'1px solid rgba(14,27,51,0.06)',borderRadius:'16px',padding:'1.5rem',display:'flex',justifyContent:'space-between',gap:'1rem',flexWrap:'wrap',alignItems:'center'}}>
          <div>
            <h3 style={{fontFamily:'var(--font-display),serif',fontWeight:800,color:'#0E1B33'}}>Stay updated — news & events</h3>
            <p style={{fontSize:'0.8rem',color:'#64748B',marginTop:'0.2rem'}}>Reminders for special programmes, not spam.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}
