'use client'
import { useState } from 'react'
import Link from 'next/link'
export default function Page(){
  const [sent,setSent]=useState(false)
  if(sent) return <><section className="page-hero page-hero--blue"><div className="container page-hero__inner"><div><nav className="breadcrumb"><Link href="/kids">Home</Link> › <span>Contact</span></nav><h1>Message <span className="hl hl--yellow">sent</span> 💛</h1><p>Thank you! Our team will respond within 2 days.</p></div><div className="page-hero__art">✅</div></div></section><section className="section"><div className="container"><div className="form-success is-show"><h3>We&apos;ll be in touch!</h3><p>Keep an eye on your email/phone for our reply.</p><div className="btn-row"><Link className="btn btn--primary" href="/kids">Back home</Link></div></div></div></section></>
  return <>
    <section className="page-hero page-hero--blue"><div className="container page-hero__inner"><div><nav className="breadcrumb"><Link href="/kids">Home</Link> › <span>Contact</span></nav><h1>We&apos;d <span className="hl hl--pink">love to hear</span> from you</h1><p>Questions, registration, or just saying hello — we&apos;re here to help.</p></div><div className="page-hero__art">💌</div></div></section>
    <section className="section"><div className="container"><div className="contact-layout">
      <div className="contact-cards">
        <div className="contact-card accent-yellow"><div className="contact-card__icon">📍</div><div><h3>Visit us</h3><p>Christ Embassy Central Church 3, PH Zone 3, Port Harcourt. Sundays during main service.</p></div></div>
        <div className="contact-card accent-blue"><div className="contact-card__icon">⏰</div><div><h3>Service times</h3><p>Sundays · during main service · arrive 15 mins early for check-in.</p></div></div>
        <div className="contact-card accent-pink"><div className="contact-card__icon">📧</div><div><h3>Enquiries</h3><p>Use the form — we respond within 2 working days. <Link href="/">Main church</Link></p></div></div>
        <div className="map-card"><div><div className="map-card__pin">📍</div><p>30B Rumuokwuta/NTA Road, Opp. Patcoin Filling Station, Port Harcourt</p></div></div>
      </div>
      <form className="contact-form" onSubmit={(e)=>{e.preventDefault(); setSent(true)}}>
        <h2>Send a message</h2><p>We reply within 2 working days. Fields marked * are required.</p>
        <div className="form-grid">
          <div className="field"><label>Your name *</label><input className="input" required placeholder="Jane Doe"/></div>
          <div className="field"><label>Email *</label><input className="input" type="email" required placeholder="jane@example.com"/></div>
          <div className="field full"><label>Enquiry type</label><select className="select"><option>General enquiry</option><option>Children&apos;s registration</option><option>Volunteering</option><option>Safeguarding concern</option></select></div>
          <div className="field full"><label>Message *</label><textarea className="textarea" required placeholder="How can we help?"/></div>
        </div>
        <div className="form-actions"><button className="btn btn--primary" type="submit">Send message</button><span className="form-note">We never publish children&apos;s personal information.</span></div>
      </form>
    </div></div></section>
  </>
}
