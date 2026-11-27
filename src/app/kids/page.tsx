import Link from 'next/link'
import lessonsData from '../../../kids/data/lessons.json'
import eventsData from '../../../kids/data/events.json'
import { getTodayDevotional } from '@/lib/rhapsody/store'
import { WebGLShader } from '@/components/effects/WebGLShader'

export default function KidsHome() {
  const featured = (lessonsData as any).lessons.find((l: any) => l.featured)
  const upcoming = (eventsData as any).upcoming.slice(0, 3)
  const kiddiesToday = getTodayDevotional('early-readers')

  return (
    <>
      {/* HERO — playful shader (child-friendly, design preserved) */}
      <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <WebGLShader className="absolute inset-0" intensity={0.5} opacity={0.08} />
        <svg className="deco deco--sun" viewBox="0 0 200 200" aria-hidden="true">
          <g fill="none" stroke="#FFB703" strokeWidth={10} strokeLinecap="round">
            <circle cx={100} cy={100} r={44} fill="#FFD34D" />
            <path d="M100 8v22M100 170v22M8 100h22M170 100h22M35 35l16 16M149 149l16 16M35 165l16-16M149 51l16-16" />
          </g>
        </svg>
        <svg className="deco deco--cloud deco--cloud-1" viewBox="0 0 160 60" aria-hidden="true"><path d="M14 46c-8 0-14-6-14-14s6-13 13-14c3-11 14-17 25-13 5-7 16-8 22-2 10-2 18 5 18 14 0 8-6 16-15 16z" fill="#ffffff" /></svg>
        <svg className="deco deco--cloud deco--cloud-2" viewBox="0 0 160 60" aria-hidden="true"><path d="M14 46c-8 0-14-6-14-14s6-13 13-14c3-11 14-17 25-13 5-7 16-8 22-2 10-2 18 5 18 14 0 8-6 16-15 16z" fill="#ffffff" /></svg>
        <div className="deco deco--dots" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="eyebrow">Raising Champions for Christ</span>
            <h1 className="hero__title">Welcome to a place where <span className="hl hl--yellow">little champions</span> grow!</h1>
            <p className="hero__text">Christ Embassy Central Church 3 Children&apos;s Church, PH Zone 3, Port Harcourt — a joyful place where children discover God&apos;s Word, grow in faith, develop their gifts and become champions for Christ.</p>
            <div className="hero__actions">
              <div className="btn-row">
                <Link className="btn btn--primary btn--lg" href="#classes">Explore Our World</Link>
                <Link className="btn btn--secondary btn--lg" href="/kids/about">Meet Our Church</Link>
              </div>
            </div>
            <div className="hero__meta">
              <span className="hero__meta-item"><span className="ico">📖</span> Bible-based lessons</span>
              <span className="hero__meta-item"><span className="ico">💙</span> Safe &amp; welcoming</span>
              <span className="hero__meta-item"><span className="ico">🎉</span> Fun for every age</span>
            </div>
          </div>
          <div className="hero__art">
            <div className="hero__blob"><img src="/kids/assets/images/hero-children.webp" alt="Smiling children" width={800} height={600} /></div>
            <div className="float-card verse-card"><p className="verse-card__quote">&quot;Don&apos;t let anyone look down on you because you are young, but set an example…&quot;</p><span className="verse-card__ref">1 Timothy 4:12</span></div>
            <div className="badge-card">Jesus loves you</div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track"><div className="marquee__group">{['Learn','Play','Worship','Grow','Shine','Serve','Laugh','Love'].map(w=><span key={w} className="marquee__item">{w}</span>)}</div><div className="marquee__group">{['Learn','Play','Worship','Grow','Shine','Serve','Laugh','Love'].map(w=><span key={w} className="marquee__item">{w}</span>)}</div></div>
      </div>

      <section className="section section--white" id="welcome">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow eyebrow--yellow">A special place for every child</span>
            <h2>Where little hearts <span className="hl hl--pink">meet a big God</span></h2>
            <p>Every Sunday, children from across Port Harcourt come together to sing, learn, play and discover how much God loves them.</p>
          </div>
          <div className="feature-grid">
            <article className="feature-card accent-yellow"><div className="feature-card__icon">📖</div><h3>Learn God&apos;s Word</h3><p>Discover Bible truths through stories, songs and hands-on activities.</p></article>
            <article className="feature-card accent-pink"><div className="feature-card__icon">🙏</div><h3>Grow in Faith</h3><p>Learn to pray, worship and trust God in everyday life.</p></article>
            <article className="feature-card accent-blue"><div className="feature-card__icon">🌟</div><h3>Become a Champion</h3><p>Develop confidence, godly character and a sense of purpose.</p></article>
          </div>
          <div className="stats-strip mt-4">
            <div className="stat"><div className="stat__num">4</div><div className="stat__label">Age groups</div></div>
            <div className="stat"><div className="stat__num">10</div><div className="stat__label">Bible lessons</div></div>
            <div className="stat"><div className="stat__num">5</div><div className="stat__label">Games</div></div>
            <div className="stat"><div className="stat__num">∞</div><div className="stat__label">Joy</div></div>
          </div>
        </div>
      </section>

      <section className="section" id="classes">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow eyebrow--blue">Grow at your pace</span>
            <h2>Four places to belong</h2>
            <p>Every class is led by caring teachers who know what makes each age special.</p>
          </div>
          <div className="class-grid">
            {[
              { name: 'Crèche', age: '0 – 3 years', img: '/kids/assets/images/classes/creche.webp', desc: 'A warm, gentle space for our littlest ones — soft toys, songs and tender care.' },
              { name: 'Preschool', age: '3 – 5 years', img: '/kids/assets/images/classes/preschool.webp', desc: 'Curiosity, colour and Bible stories come alive through play and craft.' },
              { name: 'Primary', age: '6 – 8 years', img: '/kids/assets/images/classes/primary.webp', desc: 'Children learn Bible basics, memorise verses and discover how to live out their faith.' },
              { name: 'Pre-teens', age: '9 – 12 years', img: '/kids/assets/images/classes/preteens.webp', desc: 'A place for big questions, real friendships and honest conversations about faith.' },
            ].map((c) => (
              <article key={c.name} className="class-card">
                <div className="class-card__media"><img src={c.img} alt={c.name} loading="lazy" /><span className="class-card__age">{c.age}</span></div>
                <div className="class-card__body"><h3>{c.name}</h3><p>{c.desc}</p><Link className="link-arrow" href="/kids/classes">Meet the class →</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {featured && (
        <section className="section">
          <div className="container">
            <div className="lesson-feature">
              <div className="lesson-feature__media">
                <img src={featured.cover ? `/kids/assets/images/lessons/${featured.slug ?? 'noahs-ark'}.webp` : '/kids/assets/images/lessons/noahs-ark.webp'} alt={featured.title} />
                <span className="sticker sticker--yellow lesson-feature__sticker">⭐ Lesson of the week</span>
              </div>
              <div className="lesson-feature__content">
                <span className="eyebrow">Featured lesson</span>
                <h2>{featured.title}</h2>
                <div className="lesson-feature__ref">{featured.reference} · {featured.category}</div>
                <p className="lesson-feature__key">{featured.keyLesson}</p>
                <div className="memory-card"><div className="memory-card__label">Memory verse</div><blockquote>&quot;{featured.memoryVerse}&quot;</blockquote><cite>{featured.memoryReference}</cite></div>
                <div className="btn-row"><Link className="btn btn--yellow" href={`/kids/lessons/${featured.slug}`}>Read the lesson</Link><Link className="btn btn--ghost-light" href="/kids/lessons">All lessons</Link></div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section section--white">
        <div className="container">
          <div className="section-head section-head--split">
            <div><span className="eyebrow eyebrow--pink">Save the date</span><h2>Something wonderful is coming</h2><p>Services, celebrations and friendly competitions — always something to look forward to.</p></div>
            <Link className="btn btn--secondary" href="/kids/events">View all events</Link>
          </div>
          <div className="event-grid">
            {upcoming.map((e: any) => (
              <div key={e.slug} className={`event-card accent-${e.color}`}>
                <div className="event-card__banner"><span className="event-card__emoji">{e.emoji}</span><span className="event-card__date"><span className="event-card__day">{new Date(e.date).getDate()}</span><span className="event-card__month">{new Date(e.date).toLocaleString('en', { month: 'short' })}</span></span></div>
                <div className="event-card__body"><h3>{e.title}</h3><p style={{ fontSize: '.84rem', color: 'var(--ink-soft)' }}>{e.description.slice(0, 90)}…</p><Link className="link-arrow" href="/kids/events">Learn more →</Link></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {kiddiesToday && (
        <section className="section section--cream">
          <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="lesson-feature" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.2rem', maxWidth: 760, margin: '0 auto', padding: '2rem 1.5rem' }}>
              <div className="lesson-feature__media" style={{ background: 'transparent', display: 'grid', placeItems: 'center', minHeight: 0, width: '100%', maxWidth: 520, border: '1.5px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.2rem' }}>
                <div style={{ textAlign: 'center', padding: '0.4rem' }}>
                  <div style={{ fontSize: '2rem' }}>⭐</div>
                  <div className="eyebrow eyebrow--yellow" style={{ marginTop: 8 }}>Kiddies Rhapsody — Today</div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', marginTop: 6 }}>{kiddiesToday.title}</div>
                  <div style={{ fontSize: '.8rem', color: 'var(--ink-soft)', marginTop: 4 }}>{kiddiesToday.scriptureReference} · {kiddiesToday.date}</div>
                </div>
              </div>
              <div className="lesson-feature__content" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <span className="eyebrow eyebrow--blue">From the Rhapsody for Early Readers</span>
                <h2 style={{ textAlign: 'center', marginTop: '0.6rem' }}>{kiddiesToday.title}</h2>
                <div className="lesson-feature__ref" style={{ justifyContent: 'center' }}>{kiddiesToday.scriptureReference}</div>
                <p className="lesson-feature__key" style={{ textAlign: 'center' }}>“{kiddiesToday.scripture.slice(0, 140)}…”</p>
                <p style={{ fontSize: '.9rem', color: 'var(--ink-soft)', marginTop: '.6rem', textAlign: 'center', maxWidth: 600 }}>{kiddiesToday.excerpt.slice(0, 160)}…</p>
                <div className="memory-card" style={{ textAlign: 'left', maxWidth: 560, width: '100%' }}><div className="memory-card__label">{kiddiesToday.prayerLabel}</div><blockquote>“{kiddiesToday.prayer.slice(0, 140)}…”</blockquote></div>
                <div className="btn-row" style={{ justifyContent: 'center' }}><Link className="btn btn--yellow" href={`/kids/rhapsody/${kiddiesToday.slug}`}>Read Kiddies Rhapsody</Link><Link className="btn btn--ghost-light" href={`/kids/rhapsody/quiz/${kiddiesToday.slug}`}>Take Quiz +10 XP</Link><Link className="btn btn--secondary" href="/kids/rhapsody">All Kiddies</Link></div>
                <div style={{ marginTop: '0.5rem', fontSize: '.78rem', color: 'var(--ink-soft)', textAlign: 'center' }}>
                  Love this? The official <a href="https://rhapsodyofrealities.org" target="_blank" rel="noreferrer" style={{ fontWeight: 800, color: 'var(--ink)' }}>Rhapsody for Early Readers</a> has more stories for little readers ↗
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '0.8rem', fontSize: '.75rem', color: 'var(--ink-soft)' }}>Coordinator: Sister Christy Olajide Abiola · Ministry of Children’s Affairs · PH Zone 3</div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="kids-panel">
            <div className="kids-panel__content">
              <span className="eyebrow eyebrow--yellow">Kids Corner</span>
              <h2>Play, learn and grow!</h2>
              <p>Our favourite corner — made for curious kids who love a good story and a tricky question. Now with daily Kiddies Rhapsody + quiz + XP!</p>
              <div className="activity-list">
                <Link href="/kids/rhapsody"><span className="ico accent-yellow">📖</span> Kiddies Rhapsody Daily</Link>
                <Link href="/kids/kids-corner#quiz"><span className="ico accent-blue">🎯</span> Bible Quiz</Link>
                <Link href="/kids/kids-corner#verse"><span className="ico accent-purple">⭐</span> Memory Verse</Link>
                <Link href="/kids/kids-corner#whoami"><span className="ico accent-yellow">🔎</span> Who Am I?</Link>
                <Link href="/kids/kids-corner#colouring"><span className="ico accent-pink">🎨</span> Colouring</Link>
              </div>
              <Link className="btn btn--primary" href="/kids/kids-corner">Enter Kids Corner</Link>
            </div>
            <div className="kids-panel__media"><img src="/kids/assets/images/kids-corner.webp" alt="Kids corner" loading="lazy" /><span className="sticker sticker--pink kids-panel__badge">🎉 Quiz + XP + Kiddies Rhapsody</span></div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="section-head section-head--split">
            <div><span className="eyebrow eyebrow--yellow">Our gallery</span><h2>Moments worth remembering</h2><p>Worship, laughter, drama and celebration — glimpse into our family.</p></div>
            <Link className="btn btn--secondary" href="/kids/gallery">View gallery</Link>
          </div>
          <div className="gallery-preview">
            <Link className="gallery-preview__item" href="/kids/gallery"><img src="/kids/assets/images/gallery/worship.webp" alt="Worship" /><span className="gallery-preview__cap">Worship &amp; Praise</span></Link>
            <Link className="gallery-preview__item" href="/kids/gallery"><img src="/kids/assets/images/gallery/celebration.webp" alt="Celebration" /><span className="gallery-preview__cap">Children&apos;s Day</span></Link>
            <Link className="gallery-preview__item" href="/kids/gallery"><img src="/kids/assets/images/gallery/drama.webp" alt="Drama" /><span className="gallery-preview__cap">Drama</span></Link>
          </div>
        </div>
      </section>

      <section className="section section--pink">
        <div className="container">
          <div className="parents-panel">
            <div><span className="eyebrow eyebrow--pink">Parents, you&apos;re welcome</span><h2>Dear Parents, You&apos;re Welcome!</h2><p>Find everything you need to know about classes, service times and how we keep your children safe.</p><div className="btn-row"><Link className="btn btn--primary" href="/kids/parents">Visit Parents&apos; Corner</Link><Link className="btn btn--secondary" href="/kids/contact">Ask a question</Link></div></div>
            <div className="parents-note"><h3>📌 What you&apos;ll find</h3><ul><li>Children&apos;s church guidelines</li><li>Service schedules</li><li>Registration</li><li>FAQs</li><li>Safe screen time: <a href="https://loveworldtelevisionministry.org" target="_blank" rel="noreferrer" style={{ fontWeight: 800, color: 'var(--ink)' }}>LoveWorld Children&apos;s Ministry TV</a> ↗ — songs &amp; Bible stories</li></ul></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container"><div className="final-cta"><span className="pill pill--white">Plan your visit</span><h2>Every Child Has a Great Future in Christ!</h2><p>Come and see us this Sunday. Bring your children, bring your questions.</p><div className="btn-row"><Link className="btn btn--yellow btn--lg" href="/kids/contact">Plan Your Visit</Link><Link className="btn btn--ghost-light btn--lg" href="/kids/contact">Contact Us</Link></div></div></div>
      </section>
    </>
  )
}
