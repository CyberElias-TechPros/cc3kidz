import Link from 'next/link'
import data from '../../../../kids/data/events.json'
export default function Page(){
  const { upcoming, past } = data as any
  return <>
    <section className="page-hero page-hero--pink"><div className="container page-hero__inner"><div><nav className="breadcrumb"><Link href="/kids">Home</Link> › <span>Events</span></nav><h1>Celebrations &amp; <span className="hl hl--yellow">special days</span></h1><p>From Children&apos;s Praise Sunday to Christmas drama — never miss what&apos;s next.</p></div><div className="page-hero__art">🎉</div></div></section>
    <section className="section"><div className="container"><h2 style={{marginBottom:'1rem'}}>Upcoming events</h2><div className="event-list">{upcoming.map((e:any)=><div key={e.slug} className={`event-row accent-${e.color}`}><div className="event-row__date"><div className="event-row__day">{new Date(e.date).getDate()}</div><div className="event-row__month">{new Date(e.date).toLocaleString('en',{month:'short',year:'numeric'})}</div></div><div className="event-row__body"><h3>{e.title}</h3><div className="event-row__meta"><span>{e.time} – {e.endTime}</span><span>{e.venue}</span></div><p>{e.description}</p></div><div className="event-row__action"><Link className="btn btn--primary btn--sm" href="/kids/contact">Join us</Link></div></div>)}</div></div></section>
    <section className="section section--white"><div className="container"><h2 style={{marginBottom:'1rem'}}>Past highlights</h2><div className="past-grid">{past.map((p:any)=><div key={p.title} className="past-card"><img src={`/${p.image}`} alt={p.title}/><div className="past-card__body"><div className="past-card__date">{p.date}</div><h3>{p.title}</h3><p>{p.summary}</p></div></div>)}</div></div></section>
  </>
}
