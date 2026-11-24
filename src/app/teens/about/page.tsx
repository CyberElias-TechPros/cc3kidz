import Link from 'next/link'
export const metadata = { title: 'About — CC3 Teens Church | 13–19' }
export default function TeensAboutPage() {
  return (
    <>
      <section className="bg-haze border-b border-black/5">
        <div className="container-cc py-10">
          <div className="flex gap-4 max-w-4xl">
            <div className="hidden sm:block w-[3px] self-stretch rounded-full" style={{background:'linear-gradient(#C6A04A,#E84C3D)'}} aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-muted">Teens Ministry · LoveWorld Nation · PH Zone 3</div>
              <h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2 text-navy">About CC3 Teens Church</h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Raising a generation of teenagers who are established in God&apos;s Word, filled with the Holy Spirit, conscious of their identity in Christ, and equipped to influence their world. <em>Giving your life a meaning.</em></p>
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-cc grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
          <div className="space-y-10">
            <div>
              <div className="eyebrow">Our Vision & Mission</div>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <div className="border-l-2 border-gold pl-4 py-1"><div className="text-xs font-bold tracking-widest uppercase text-gold">Vision</div><p className="text-sm font-medium text-navy mt-1 leading-6">To raise a generation of teenagers who are established in God&apos;s Word, filled with the Holy Spirit, conscious of their identity in Christ, and equipped to influence their world with the Gospel.</p></div>
                <div className="border-l-2 border-vermilion pl-4 py-1"><div className="text-xs font-bold tracking-widest uppercase text-vermilion">Mission</div><p className="text-sm font-medium text-navy mt-1 leading-6">To nurture, train and equip teenagers through the teaching of God&apos;s Word, fellowship, mentorship, creative expression, leadership development and purposeful evangelism.</p></div>
              </div>
              <p className="text-xs text-muted mt-3">Proposed CC3 statements — to be approved by responsible church leadership before publication. Aligned with Christ Embassy Vision: <em>Taking the divine presence of God to the nations…</em></p>
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-navy">Who We Are</h2>
              <p className="text-sm leading-7 text-slate-600 mt-2">CC3 Teens Church is the teenage expression of Christ Embassy Central Church 3, PH Zone 3. We are not a separate church — we are one family. Teens meet during main church, have their own fellowship, cells, outreaches and creative platforms, all under pastoral oversight of CC3 Group and PH Zone 3.</p>
              <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
                <div className="card p-4"><div className="text-xs font-bold text-gold">13–19</div><div className="font-semibold text-navy">Teenagers</div><div className="text-xs text-muted">Junior & Senior Secondary — university transition</div></div>
                <div className="card p-4"><div className="text-xs font-bold text-gold">Sundays 8AM</div><div className="font-semibold text-navy">Teens Church</div><div className="text-xs text-muted">During Main Service · 30B Rumuokwuta</div></div>
                <div className="card p-4"><div className="text-xs font-bold text-gold">Schools</div><div className="font-semibold text-navy">TeeVo Clubs</div><div className="text-xs text-muted">Taking TeeVo to schools — see <Link href="/teens/activities" className="underline text-navy">Activities</Link></div></div>
              </div>
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-navy">Our Beliefs</h2>
              <p className="text-sm text-muted">Rooted in Christ Embassy Statement of Faith — Bible as infallible Word, New Creation realities, Holy Spirit, faith and evangelism.</p>
              <Link href="/about#faith" className="mt-3 inline-flex btn btn--ghost !py-2 text-xs">Read Statement of Faith →</Link>
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-navy">Leadership</h2>
              <p className="text-sm text-muted">Serving under CC3 Group Pastor & PH Zone 3. Profiles published only with approval.</p>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {[
                  { role: 'Teens Church Pastor', note: 'Appointed by Group Pastor — oversight, teaching & care' },
                  { role: 'Assistant / Coordinator', note: 'Discipleship, programmes, school liaison' },
                  { role: 'Cell & Outreach Leaders', note: 'Fellowship & TITHE — trained, supervised' },
                  { role: 'Creative & Media', note: 'Music, drama, media, tech — youth-led, adult-guided' },
                ].map(c=>(
                  <div key={c.role} className="border border-black/5 rounded-xl p-4 bg-haze"><div className="text-xs font-bold tracking-wide text-navy">{c.role}</div><div className="text-xs leading-5 text-slate-600 mt-1">{c.note}</div><div className="text-[0.62rem] font-bold text-muted mt-2">CONTACT VIA AUTHORISED CHANNELS ONLY</div></div>
                ))}
              </div>
              <Link href="/teens/connect" className="mt-4 inline-flex btn btn--navy !py-2 text-xs">Contact Teens Leaders</Link>
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-navy">Our Connection to LoveWorld</h2>
              <p className="text-sm leading-7 text-slate-600 mt-2">LoveWorld Nation → PH Zone 3 → CC3 Group → Teens Church. Officially connected to the <a href="https://ministryofteensandyouth.org" target="_blank" rel="noreferrer" className="underline text-navy">Global Ministry of Teens and Youth</a> — TITHE, TeeVo Clubs, ITPLC, Creators Connect.</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs"><a href="https://teevo.org" target="_blank" rel="noreferrer" className="rounded-full border border-black/10 px-3 py-1 hover:border-gold/30">teevo.org</a><a href="https://rhapsodyofrealities.org" target="_blank" rel="noreferrer" className="rounded-full border border-black/10 px-3 py-1 hover:border-gold/30">Rhapsody</a><a href="https://pcdl.co" target="_blank" rel="noreferrer" className="rounded-full border border-black/10 px-3 py-1 hover:border-gold/30">PCDL</a></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="card p-5"><h3 className="font-display font-extrabold text-navy">At a glance</h3><ul className="mt-3 space-y-2 text-sm text-slate-600"><li>• <b>Age:</b> 13–19 (JSS1 – SS3/University entry)</li><li>• <b>Meets:</b> Sundays during Main Service</li><li>• <b>Venue:</b> 30B Rumuokwuta (as assigned)</li><li>• <b>Main resources:</b> TeeVo, Bible, PCDL</li><li>• <b>Initiatives:</b> TeeVo Clubs, TITHE</li></ul><Link href="/teens/church" className="mt-4 btn btn--navy w-full justify-center">Teens Church Info →</Link></div>
            <div className="card p-5 bg-navy text-white border-white/10"><div className="text-xs font-bold tracking-widest uppercase text-gold">Safeguarding</div><h3 className="font-display font-extrabold mt-1">Parents & Guardians</h3><p className="text-sm leading-6 text-white/80 mt-2">Approved supervision, consent for media/events, moderated contact, no public DMs, no published student lists.</p><Link href="/teens/connect" className="mt-3 inline-flex btn bg-white text-navy !py-2 text-xs w-full justify-center">Parent Information →</Link></div>
          </div>
        </div>
      </section>
    </>
  )
}
