import Link from 'next/link'
import './youth.css'

export const metadata = { title: 'CC3 Youth Church — Made for Purpose | 20–35' }

export default function YouthPage() {
  return (
    <div className="youth-scope">
      {/* ===== SWISS CINEMATIC HERO — Midnight Navy full-bleed ===== */}
      <section className="youth-swiss-hero">
        <div className="youth-swiss-hero__bg" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/main-family.webp" alt="" />
        </div>
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
        <div className="youth-swiss-hero__nav">
          <button aria-label="Previous">‹</button>
          <span>01 / 03</span>
          <button aria-label="Next">›</button>
        </div>
      </section>

      {/* ===== UPCOMING EVENTS — Swiss grid ===== */}
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
              { m: 'OCT', d: '18', t: 'CC3 Night', sub: 'WORSHIP • WORD • COMMUNITY', img: '/assets/images/cc3/service-congregation.jpg' },
              { m: 'OCT', d: '25', t: 'Community Groups', sub: 'REAL CONVERSATIONS • REAL CHANGE', img: '/assets/images/main-family.webp' },
              { m: 'NOV', d: '08', t: 'City Serve', sub: 'LOVE OUR CITY • MAKE A DIFFERENCE', img: '/assets/images/main-sermon.webp' },
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

      {/* ===== OUR HEART — More Than a Church. A Movement. ===== */}
      <section className="section bg-white" style={{ padding: '2.2rem 0' }}>
        <div className="container-cc youth-swiss-heart">
          <div className="youth-swiss-heart__img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/main-family.webp" alt="Youth community — B&W placeholder" />
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

      {/* ===== VISIT ===== */}
      <section className="section" style={{ background: '#0F172A', color: '#fff', padding: '2rem 0' }}>
        <div className="container-cc flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black">Find your community — 20 to 35</h3>
            <p className="text-sm text-white/70">30B Rumuokwuta / NTA Road • Sunday Service + midweek cells</p>
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
