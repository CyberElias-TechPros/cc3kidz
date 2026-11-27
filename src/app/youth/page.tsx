import Link from 'next/link'
import './youth.css'
import { YouthAnnouncement } from '@/components/ministry/TeensSubNav'
import { WebGLShader } from '@/components/effects/WebGLShader'
import AnnouncementBar from '@/components/AnnouncementBar'
import YouthHeroSlider from '@/components/YouthHeroSlider'
import ChurchSlider, { type ChurchSlide } from '@/components/ChurchSlider'
import PlatformCard from '@/components/PlatformCard'
import { platformsFor } from '@/data/loveworld-platforms'
import { announcements } from '@/lib/site'

export const metadata = { title: 'CE Central Church 3 Youth — Made for Purpose • PH Zone 3' }

/* Authentic Christ Embassy Youth photos (Nigeria — zonal & national events) */
const youthHeroSlides: ChurchSlide[] = [
  { src: '/assets/images/cc3/youth/youth-arena-crusade.jpg', alt: 'Youth crusade night — packed arena worship at a Christ Embassy event in Nigeria', caption: 'Crusade night — packed arena' },
  { src: '/assets/images/cc3/youth/youth-zone3-auditorium.jpg', alt: 'Sunday service congregation — Christ Embassy Port Harcourt Zone 3 auditorium', caption: 'Sunday service — PH Zone 3 auditorium' },
  { src: '/assets/images/cc3/youth/youth-iclc-worship.jpg', alt: 'Youth worship with hands raised — ICLC Exhibition, Christ Embassy Port Harcourt Zone 3', caption: 'Worship without limits — ICLC Zone 3' },
]

const youthMomentSlides: ChurchSlide[] = [
  { src: '/assets/images/cc3/youth/youth-arena-crusade.jpg', alt: 'Arena crusade — thousands of young believers', caption: 'Arena nights — faith on another level', sub: 'Christ Embassy youth crusade, Nigeria' },
  { src: '/assets/images/cc3/youth/youth-convention.jpg', alt: 'Youth convention crowd — Christ Embassy Nigeria', caption: 'Convention — a generation for more', sub: 'Christ Embassy national youth gathering' },
  { src: '/assets/images/cc3/youth/youth-iclc-worship.jpg', alt: 'Worship — hands raised at ICLC Port Harcourt Zone 3', caption: 'Worship — ICLC Exhibition', sub: 'Christ Embassy Port Harcourt Zone 3' },
  { src: '/assets/images/cc3/youth/youth-city-serve.jpg', alt: 'City Serve — Rhapsody and missionary outreach in the community', caption: 'City Serve — taking the Word to our world', sub: 'Rhapsody & missionary outreach' },
  { src: '/assets/images/cc3/youth/youth-community.jpg', alt: 'Community groups — church family gathered midweek', caption: 'Community — real people, real faith', sub: 'Midweek groups & cell family' },
  { src: '/assets/images/cc3/youth/youth-zone3-tent.jpg', alt: 'Zonal HQ auditorium — Jessy & Jenny Street, Peter Odili Road, Port Harcourt', caption: 'Zonal HQ — Peter Odili Road', sub: 'Jessy & Jenny Street, Port Harcourt Zone 3' },
]

/* LoveWorld platforms for youth — leadership & outreach hub (G.Y.L.F. featured first) */
const youthPlatformItems = [...platformsFor('youth')].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

export default function YouthPage() {
  return (
    <div className="youth-scope">
      {/* ===== SWISS CINEMATIC HERO — Midnight Navy full-bleed ===== */}
      <section className="youth-swiss-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <WebGLShader className="absolute inset-0" intensity={1} opacity={0.12} />
        <YouthHeroSlider slides={youthHeroSlides} interval={6000} />
        <div className="youth-swiss-hero__overlay" />
        <div className="container-cc youth-swiss-hero__inner">
          <div className="youth-swiss-hero__left">
            <div className="youth-swiss-kicker">CC3 YOUTH CHURCH</div>
            <h1 className="youth-swiss-title">
              <span>Made for</span>
              <span className="gold">Purpose.</span>
            </h1>
            <p className="youth-swiss-sub">A generation discovering Jesus, living with purpose<br />and making an impact — in our city and beyond.</p>
            <div className="youth-swiss-cta">
              <Link href="/youth/community" className="btn-gold">JOIN A COMMUNITY →</Link>
              <Link href="/youth/word" className="btn-ghost">◎ WATCH OUR STORY</Link>
            </div>
            <div className="youth-swiss-meta">
              <div><b>REAL PEOPLE</b><br /><span>REAL FAITH</span></div>
              <div><b>BOLD PURPOSE</b><br /><span>BRIGHTER TOMORROWS</span></div>
              <div><b>A GENERATION</b><br /><span>FOR MORE</span></div>
            </div>
          </div>
          <div className="youth-swiss-hero__right" aria-hidden>
            <div className="youth-swiss-rail">
              <span>JESUS</span><span>PEOPLE</span><span>PURPOSE</span><span>OUR CITY</span><span>AND BEYOND</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR HEART — More Than a Church. A Movement. ===== */}
      <section className="section bg-white" style={{ padding: '2.2rem 0' }}>
        <div className="container-cc youth-swiss-heart">
          <div className="youth-swiss-heart__img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/cc3/youth/youth-convention.jpg" alt="Youth convention crowd — Christ Embassy Nigeria" />
            <div className="caption">
              <div className="text-xs font-black">SAME<br />PEOPLE<br />A BRIGHTER<br />TOMORROW<br /><span style={{ color: '#C6A66B' }}>CC3</span></div>
            </div>
          </div>
          <div className="youth-swiss-heart__copy">
            <div className="eyebrow">OUR HEART</div>
            <h3>More Than a Church.<br /><span className="gold">A Movement.</span></h3>
            <p>CC3 exists to see a generation know Jesus, live with purpose and bring hope to the world. We&apos;re a community of young adults (20–35) learning to follow, grow and make a difference together.</p>
            <Link href="/youth/about" className="link">OUR STORY <span>→</span></Link>
          </div>
          <div className="youth-swiss-heart__values">
            {[
              { t: 'DEEPER WITH JESUS', d: 'Real faith for real life.', icon: '†' },
              { t: 'STRONGER TOGETHER', d: 'Authentic community.', icon: '◐' },
              { t: 'GREATER IMPACT', d: 'A generation that serves.', icon: '▦' },
            ].map(v => (
              <div key={v.t} className="val">
                <div className="icon">{v.icon}</div>
                <div>
                  <div className="t">{v.t}</div>
                  <div className="d">{v.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Global announcement — moved down from above-navbar to here (2 sections after hero) */}
      <AnnouncementBar items={announcements as any} />
      <YouthAnnouncement />

      {/* ===== UPCOMING EVENTS — Swiss grid — moved 2 sections after hero for cleaner hero → heart flow */}
      <section className="section youth-swiss-events">
        <div className="container-cc">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="youth-swiss-eyebrow">UPCOMING EVENTS</div>
              <h2 className="youth-swiss-h2">Come Together.<br /><span className="gold">Go Further.</span></h2>
            </div>
            <Link href="/youth/events" className="hidden sm:inline-flex text-xs font-bold border border-black/10 rounded-full px-4 py-2 bg-white">VIEW ALL EVENTS →</Link>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { m: 'OCT', d: '18', t: 'CC3 Night', sub: 'WORSHIP • WORD • COMMUNITY', img: '/assets/images/cc3/youth/youth-choir.jpg' },
              { m: 'OCT', d: '25', t: 'Community Groups', sub: 'REAL CONVERSATIONS • REAL CHANGE', img: '/assets/images/cc3/youth/youth-community.jpg' },
              { m: 'NOV', d: '08', t: 'City Serve', sub: 'LOVE OUR CITY • MAKE A DIFFERENCE', img: '/assets/images/cc3/youth/youth-city-serve.jpg' },
            ].map(e => (
              <article key={e.t} className="youth-swiss-event">
                <div className="youth-swiss-event__img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={e.img} alt={e.t} />
                </div>
                <div className="youth-swiss-event__body">
                  <div className="date">
                    <span className="m">{e.m}</span>
                    <span className="d">{e.d}</span>
                  </div>
                  <div className="meta">
                    <div className="t">{e.t}</div>
                    <div className="sub">{e.sub}</div>
                  </div>
                  <span className="arrow">→</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IN PICTURES — authentic youth moments slider ===== */}
      <section className="section bg-white" style={{ padding: '2.2rem 0' }}>
        <div className="container-cc">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="youth-swiss-eyebrow">IN PICTURES</div>
              <h2 className="youth-swiss-h2">Youth Church.<br /><span className="gold">In Pictures.</span></h2>
            </div>
            <span className="hidden sm:inline text-xs text-black/40">Real people. Real faith. Real impact.</span>
          </div>
          <div className="youth-swiss-moments" style={{ marginTop: '1.2rem' }}>
            <ChurchSlider slides={youthMomentSlides} eagerFirst interval={4800} />
          </div>
        </div>
      </section>

      {/* ===== LOVEWORLD YOUTH PLATFORMS — leadership & outreach ===== */}
      <section className="section" style={{ background: '#F7F6F2', padding: '2.2rem 0' }}>
        <div className="container-cc">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="youth-swiss-eyebrow">LOVEWORLD PLATFORMS</div>
              <h2 className="youth-swiss-h2">Lead. Reach.<br /><span className="gold">Rise Higher.</span></h2>
            </div>
            <span className="hidden sm:inline text-xs text-black/40">Official platforms — opens in a new tab ↗</span>
          </div>
          <div style={{ marginTop: '1.2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: '0.7rem' }}>
            {youthPlatformItems.map(p => (
              <PlatformCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== VISIT ===== */}
      <section className="section" style={{ background: '#0F172A', color: '#fff', padding: '2rem 0' }}>
        <div className="container-cc flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black">Find your community — 20 to 35 · Led by Brother Kelvin</h3>
            <p className="text-sm text-white/70">30B Rumuokwuta / NTA Road • Sunday Service + midweek cells · Youth Leader: Brother Kelvin</p>
          </div>
          <div className="flex gap-2">
            <Link href="/youth/connect" className="rounded-full bg-[#C6A66B] text-[#0F172A] px-5 py-2.5 text-sm font-black">Plan a Visit →</Link>
            <Link href="/youth/rise" className="rounded-full border border-white/20 text-white px-5 py-2.5 text-sm font-bold">YOU R.I.S.E.</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
