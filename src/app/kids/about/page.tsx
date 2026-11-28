import Link from 'next/link'
export default function Page(){
  return <>
    <section className="page-hero page-hero--blue"><div className="container page-hero__inner"><div><nav className="breadcrumb"><Link href="/kids">Home</Link> › <span>About Us</span></nav><h1>A family that <span className="hl hl--yellow">grows together</span></h1><p>We are the children&apos;s church of Christ Embassy Central Church 3 Group, PH Zone 3, Port Harcourt — dedicated to nurturing children in God&apos;s Word. Coordinator: Sister Christy Olajide Abiola.</p></div><div className="page-hero__art">🤝</div></div></section>
    <section className="section section--white"><div className="container"><div className="content-split"><div className="image-frame"><img src="/kids/assets/images/classes/primary.webp" alt="Teacher with children" /></div><div><span className="eyebrow eyebrow--blue">Who we are</span><h2>A place where children belong</h2><p className="lead">Christ Embassy Central Church 3 Children&apos;s Church is a place dedicated to nurturing children in God&apos;s Word, helping them develop faith and become champions for Christ.</p><p>We believe children are the church of today. Every song, story, craft and conversation helps a child understand how deeply loved they are.</p><div className="btn-row"><Link className="btn btn--primary" href="/kids/classes">Meet our classes</Link><Link className="btn btn--secondary" href="/kids/contact">Visit us</Link></div></div></div></div></section>
    <section className="section section--white"><div className="container">
      <div className="lesson-feature" style={{ background: '#F8FAFF', border: '1.5px solid #E5E7EB', borderRadius: 16, padding: '1.2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#0E1B33', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, flex: 'none' }}>CA</div>
        <div>
          <div className="eyebrow eyebrow--pink">Coordinator, Children’s Church · Ministry of Children’s Affairs</div>
          <h3 style={{ marginTop: 4 }}>Sister Christy Olajide Abiola</h3>
          <p style={{ marginTop: 6, color: 'var(--ink-soft)' }}>Coordinator of the Children’s Church of CC3 — nurturing children in God’s Word with excellence, joy and godly character, in partnership with parents and teachers. Kiddies Rhapsody and all children’s activities are under her coordination with the approval of the Group Pastor.</p>
          <Link href="/kids/contact" className="btn btn--secondary btn--sm" style={{ marginTop: 10 }}>Contact Children’s Church</Link>
        </div>
      </div>
    </div></section>
    <section className="section section--cream"><div className="container"><div className="section-head section-head--center"><h2>Our vision &amp; mission</h2></div><div className="mission-grid"><article className="mission-card accent-yellow"><div className="mission-card__icon">🔭</div><h3>Our Vision</h3><p>To take God&apos;s divine presence to the nations and demonstrate the character of the Spirit.</p></article><article className="mission-card accent-pink"><div className="mission-card__icon">🌱</div><h3>Our Mission</h3><p>To raise a generation of Spirit-filled, Word-conscious children who demonstrate God&apos;s love.</p></article></div></div></section>
    <section className="section section--white"><div className="container"><div className="value-grid"><div className="value-card accent-pink"><span>❤️</span> Love</div><div className="value-card accent-blue"><span>🙏</span> Faith</div><div className="value-card accent-yellow"><span>⭐</span> Excellence</div><div className="value-card accent-green"><span>🛡️</span> Integrity</div></div></div></section>
  </>
}
