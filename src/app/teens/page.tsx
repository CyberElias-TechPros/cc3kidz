import Link from 'next/link'
import Image from 'next/image'
import './teens.css'
import { TeensAnnouncement } from '@/components/ministry/TeensSubNav'
import { WebGLShader } from '@/components/effects/WebGLShader'

export const metadata = { title: 'LoveWorld Teens — Christ Embassy Teens Church | 13–19 • CC3 PH Zone 3' }

export default function TeensPage() {
  return (
    <div className="teens-scope">
      {/* HERO — Christ Embassy: LoveWorld Teens, effect change */}
      <section className="lw-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <WebGLShader className="absolute inset-0" intensity={0.6} opacity={0.1} />
        <div className="container-cc lw-hero__inner" style={{ position: 'relative' }}>
          <div>
            <span className="lw-kicker"><i /> LoveWorld Teens • Christ Embassy • CC3 Group • PH Zone 3</span>
            <h1 className="lw-title">EQUIPPED<br />TO <span className="gold">EFFECT</span><br />CHANGE.</h1>
            <p className="lw-sub">
              LoveWorld Teens Ministry — the vibrant teens church of Christ Embassy (Believers&apos; Loveworld).
              For teenagers 13–19: authentic worship, relevant Word, thriving community, mentorship &amp; fun —
              raising a generation who take the Gospel to their world.
            </p>
            <div className="lw-cta">
              <Link href="/teens/word" className="btn-lw btn-gold">TeeVo Daily →</Link>
              <Link href="/teens/church" className="btn-lw btn-ghost">Join Teens Church</Link>
            </div>
            <div className="lw-proof">
              <Image src="/assets/images/leaders/pastor-chris-oyakhilome.jpg" alt="Pastor Chris Oyakhilome — President, Loveworld Inc." width={28} height={28} />
              <span><b>TeeVo</b> by Pastor Chris Oyakhilome DSC DSC DD • President — Loveworld Inc.</span>
            </div>
            <div style={{ marginTop: '0.8rem', display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '.62rem', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.14)', padding: '.32rem .55rem', borderRadius: 999, color: '#fff' }}>Sundays 8AM</span>
              <span style={{ fontSize: '.62rem', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.14)', padding: '.32rem .55rem', borderRadius: 999, color: '#fff' }}>Wednesdays 6PM</span>
              <span style={{ fontSize: '.62rem', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', background: 'var(--ce-gold)', color: 'var(--ce-navy)', padding: '.32rem .55rem', borderRadius: 999 }}>Global Communion • 1st Sunday</span>
            </div>
          </div>

          <div className="lw-photoWrap">
            <div className="lw-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/main-family.webp" alt="CC3 Teens worship — vibrant teens church" />
              <div className="lw-float">
                <b>Today&apos;s teen,<br />tomorrow&apos;s impact.</b>
                <p>You&apos;re not ordinary — you&apos;re set apart to effect change.</p>
              </div>
              <div className="lw-badge">✦</div>
            </div>
            <div className="lw-trust">
              <div><b>In Christ <span>—</span> Excellence & Purpose</b><div style={{ fontSize: '.7rem', color: '#64748B' }}>Foundation School • Cell Ministry • Global Youth Leaders&apos; Forum</div></div>
              <span>★ ★ ★</span>
            </div>
          </div>
        </div>
      </section>
      <TeensAnnouncement />

      {/* UPCOMING — immediately after hero per request (was previously after TeeVo) */}
      <section className="section bg-white" style={{ paddingTop: '1.2rem', paddingBottom: '1.2rem' }}>
        <div className="container-cc">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '.8rem', flexWrap: 'wrap', alignItems: 'end' }}>
            <div>
              <span className="lw-pill" style={{ color: '#FF7A59', background: 'rgba(255,122,89,.08)', borderColor: 'rgba(255,122,89,.18)' }}>Upcoming • Global • Zonal</span>
              <h2 className="lw-h2" style={{ fontSize: 'clamp(1.4rem,3vw,1.9rem)' }}>Gather. Grow. <span className="gold">Go.</span></h2>
            </div>
            <Link href="/teens/events" className="btn-lw" style={{ background: '#fff', border: '1px solid rgba(14,27,51,.08)', color: 'var(--ce-navy)', fontSize: '.74rem' }}>All events →</Link>
          </div>

          <div style={{ marginTop: '.8rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '.7rem' }}>
            {[
              { cat: 'Global • Pastor Chris', t: 'Global Communion Service', d: 'First Sunday of every month — millions connected. Healing, Word & impartation.', img: 'https://images.unsplash.com/photo-15116327648-9bca21baa7a0?q=80&w=600&auto=format&fit=crop', href: '/pastors' },
              { cat: 'Wonders • Annual', t: 'Rhapsody TeeVo Wonders', d: 'Day of miracles, music & Word — 2,000+ teens. Register via teevotogo.org.', img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=600&auto=format&fit=crop', href: 'https://www.teevotogo.org/trwc/' },
              { cat: 'Youth • Zonal', t: 'Teens Fire Conference', d: 'Youth Fellowship, campus invasion & GYLF — equipping global leaders.', img: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=600&auto=format&fit=crop', href: '/teens/events' },
            ].map(e => (
              <article key={e.t} className="lw-event">
                <div className="lw-event__img">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={e.img} alt={e.t} /></div>
                <div className="lw-event__body">
                  <div className="lw-event__meta">{e.cat}</div>
                  <div className="lw-event__title">{e.t}</div>
                  <div className="lw-event__sub">{e.d}</div>
                  <a href={e.href} target={e.href.startsWith('http') ? '_blank' : undefined} rel={e.href.startsWith('http') ? 'noreferrer' : undefined} className="lw-event__cta">Details →</a>
                </div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: '.6rem', fontSize: '.68rem', color: '#64748B', textAlign: 'center' }}>Services: Sundays 10:00AM • Wednesdays 7:00PM • Nursery to Children (0–12) separate • Teens Church runs concurrently in every Christ Embassy location.</div>
        </div>
      </section>

      {/* WHAT WE DO — 4 pillars from Christ Embassy Teens offer */}
      <section className="section bg-white" style={{ paddingTop: '1.6rem', paddingBottom: '1.2rem' }}>
        <div className="container-cc">
          <span className="lw-pill">What we offer — Christ Embassy Teens Church</span>
          <h2 className="lw-h2">Authentic. Relevant. <span className="gold">Thriving.</span></h2>
          <p style={{ color: '#64748B', fontSize: '.88rem', marginTop: '.4rem', maxWidth: '60ch' }}>
            In Teens LoveWorld, every week is contemporary worship, Rhapsody (TeeVo) devotion, offering &amp; the Word — plus mentorship for real life.
          </p>

          <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '.8rem' }}>
            {[
              { t: 'Authentic Worship', d: 'Electrifying praise led by our teens choir — faith-building, Spirit-filled, Christ Embassy sound.', icon: '♪' },
              { t: 'Relevant Teaching', d: 'Bible truth for today: identity, purpose, divine health & spiritual effectiveness via TeeVo.', icon: '📖' },
              { t: 'Thriving Community', d: 'Cells, TeeVo Clubs in schools & small groups — no junior Holy Ghost. Real talk, real faith.', icon: '◉' },
              { t: 'Mentorship & Fun', d: 'Youth pastors & leaders walk with you — plus events, outreaches & campus influence.', icon: '★' },
            ].map(c => (
              <article key={c.t} className="lw-card">
                <div className="lw-card__icon">{c.icon}</div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                <Link href="/teens/activities" className="lw-link">Learn more <i>→</i></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TEEVO DAILY — cornerstone Christ Embassy teens product */}
      <section className="section" style={{ background: '#F8FAFF', paddingTop: '1.2rem', paddingBottom: '1.2rem' }}>
        <div className="container-cc">
          <div className="lw-teevo">
            <div>
              <span className="lw-teevo__badge">Rhapsody TeeVo • Pastor Chris Oyakhilome • 8,300+ languages</span>
              <h3>TeeVo Daily — your Word for today</h3>
              <p>Designed to inspire teenagers with answers from God&apos;s Word. We link to the official TeeVo — we do not republish Pastor Chris&apos;s devotional; visit the source.</p>
              <div style={{ display: 'flex', gap: '.5rem', marginTop: '.7rem', flexWrap: 'wrap' }}>
                <a href="https://www.teevotogo.org/" target="_blank" rel="noreferrer" className="btn-lw btn-gold" style={{ padding: '.6rem .9rem', fontSize: '.78rem' }}>Read TeeVo →</a>
                <Link href="/teens/word" className="btn-lw btn-ghost" style={{ borderColor: 'rgba(255,255,255,.2)', padding: '.6rem .9rem', fontSize: '.78rem' }}>TeeVo Centre</Link>
              </div>
              <div style={{ marginTop: '.6rem', fontSize: '.68rem', opacity: .8 }}>TeeVo Club: teen-led outreach in secondary schools — leader + assistant + executives, guided by your Pastor.</div>
            </div>
            <div className="lw-teevo__art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop" alt="Teen reading TeeVo" />
              <div className="lw-teevo__caption">
                <b>Wonders Conference</b> — annual Teens Rhapsody Wonders: miracles, Word &amp; joy. <a href="https://www.teevotogo.org/trwc/" target="_blank" rel="noreferrer" style={{ color: 'var(--ce-navy)', fontWeight: 800, textDecoration: 'underline' }}>teevotogo.org</a>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '.8rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '.6rem' }}>
            <Link href="https://www.teevotogo.org/teevo-club/" target="_blank" rel="noreferrer" className="lw-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '.6rem', padding: '.7rem .8rem' }}>
              <span className="lw-card__icon" style={{ background: 'var(--ce-teal)' }}>◉</span>
              <div><b style={{ fontSize: '.82rem', color: 'var(--ce-navy)' }}>Start a TeeVo Club</b><div style={{ fontSize: '.72rem', color: '#64748B' }}>In your school — reach every teenager</div></div>
              <span style={{ marginLeft: 'auto', fontWeight: 900 }}>→</span>
            </Link>
            <Link href="/teens/resources" className="lw-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '.6rem', padding: '.7rem .8rem' }}>
              <span className="lw-card__icon" style={{ background: 'var(--ce-violet)' }}>♦</span>
              <div><b style={{ fontSize: '.82rem', color: 'var(--ce-navy)' }}>Teens Bible (TeeVo Bible)</b><div style={{ fontSize: '.72rem', color: '#64748B' }}>Study help, engaging design for young minds</div></div>
              <span style={{ marginLeft: 'auto', fontWeight: 900 }}>→</span>
            </Link>
            <Link href="/teens/gifts" className="lw-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '.6rem', padding: '.7rem .8rem' }}>
              <span className="lw-card__icon" style={{ background: 'var(--ce-coral)' }}>✦</span>
              <div><b style={{ fontSize: '.82rem', color: 'var(--ce-navy)' }}>Foundation School (6 weeks)</b><div style={{ fontSize: '.72rem', color: '#64748B' }}>New Creation • Holy Spirit • Cell Ministry • Graduation</div></div>
              <span style={{ marginLeft: 'auto', fontWeight: 900 }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CELLS / CLUBS — Christ Embassy cell ministry */}
      <section className="section" style={{ background: '#EAF0F7', paddingTop: '1.2rem', paddingBottom: '1.2rem' }}>
        <div className="container-cc">
          <div className="lw-clubs">
            <div>
              <span className="lw-pill">Cell Ministry • Groups Engine</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, color: 'var(--ce-navy)', fontSize: '1.15rem', marginTop: '.4rem' }}>No junior Holy Ghost — real cells, real impact.</h3>
              <p style={{ fontSize: '.82rem', color: '#64748B', marginTop: '.3rem', lineHeight: 1.6 }}>
                Christ Embassy cell ministry drives everything: 3+ months committed members are trained as cell leaders, fostering evangelism &amp; discipleship under pastoral supervision. Teens: your cell is your family.
              </p>
              <div className="lw-clubs__list">
                {['Rumuokwuta Cell', 'TeeVo Club — CSS Port Harcourt', 'Girls Cell', 'Music/Drama', 'Prayer Team'].map(x => <span key={x} className="lw-chip">{x}</span>)}
              </div>
              <Link href="/cells" className="btn-lw btn-gold" style={{ marginTop: '.7rem', fontSize: '.76rem' }}>Find a cell →</Link>
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', background: '#fff', border: '1px solid rgba(14,27,51,.06)', padding: '.6rem' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=700&auto=format&fit=crop" alt="Teens small group" style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 12 }} />
              <div style={{ fontSize: '.72rem', color: '#64748B', marginTop: '.4rem', textAlign: 'center' }}>Ask Guest Services on Sunday — host will walk you to Teens Church (Dallas model, adapted for CC3).</div>
            </div>
          </div>
        </div>
      </section>

      {/* VISIT / PARENTS TRUST */}
      <section className="section bg-white" style={{ paddingTop: '1rem', paddingBottom: '1.2rem' }}>
        <div className="container-cc">
          <div className="lw-final">
            <div>
              <h3>Welcome, Parents — we take Teens seriously</h3>
              <p>Supervised, pastoral oversight, transparent. Wednesdays 7PM Fellowship Hall • Sundays during main service. Spanish &amp; Russian available in some zones.</p>
            </div>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              <Link href="/teens/connect" className="btn-lw" style={{ background: '#fff', color: 'var(--ce-navy)' }}>Talk to youth pastor →</Link>
              <Link href="/teens/about" className="btn-lw btn-ghost" style={{ borderColor: 'rgba(255,255,255,.2)' }}>About Teens Ministry</Link>
            </div>
          </div>
          <div style={{ marginTop: '.6rem', fontSize: '.68rem', color: '#64748B', textAlign: 'center' }}>
            Christ Embassy is Believers&apos; LoveWorld Incorporated — Pastor Chris Oyakhilome, President. CC3 Group is PH Zone 3 under Zonal Pastor Linda Okocha. Source: Christ Embassy “Our Church” &amp; LoveWorld Networks ministry arms.
          </div>
        </div>
      </section>
    </div>
  )
}
