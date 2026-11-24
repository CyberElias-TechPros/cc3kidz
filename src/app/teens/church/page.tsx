import Link from 'next/link'
export const metadata = { title: 'Teens Church — CC3 Teens | Service Times & What to Expect' }
export default function TeensChurchPage() {
  return (
    <>
      <section className="bg-haze border-b border-black/5">
        <div className="container-cc py-10">
          <div className="flex gap-4 max-w-4xl">
            <div className="hidden sm:block w-[3px] self-stretch rounded-full bg-gold" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-muted">Teens Church · PH Zone 3 · 13–19</div>
              <h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2 text-navy">Teens Church</h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Sunday Teens Church — worship, the Word, prayer and real friendship. Designed for teenagers, led with excellence, supervised with care.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-cc grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="space-y-6">
            <div className="card p-6">
              <div className="text-xs font-bold tracking-widest uppercase text-gold">Sundays · 8AM · During Main Service</div>
              <h2 className="font-display font-extrabold text-xl mt-1 text-navy">Service Information</h2>
              <p className="text-sm leading-7 text-slate-600 mt-2">Teens meet during the Main Celebration Service at the CC3 Group Secretariat, 30B Rumuokwuta/NTA Road. Check the church notice for room allocation. Visitors register at the welcome desk.</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-haze p-3"><div className="text-xs font-bold text-muted">Day</div><div className="font-extrabold text-navy">Sunday</div></div>
                <div className="rounded-xl bg-haze p-3"><div className="text-xs font-bold text-muted">Time</div><div className="font-extrabold text-navy">8AM</div></div>
                <div className="rounded-xl bg-haze p-3"><div className="text-xs font-bold text-muted">Duration</div><div className="font-extrabold text-navy">~90 mins</div></div>
              </div>
              <Link href="/events" className="mt-4 btn btn--ghost w-full justify-center">See Main Church Service Times →</Link>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-extrabold text-navy">What to Expect</h3>
              <ol className="mt-3 space-y-2 text-sm leading-7 text-slate-600 list-decimal pl-5">
                <li><b className="text-navy">Welcome & Check-in</b> — approved leaders receive you; first-timers get a welcome pack.</li>
                <li><b className="text-navy">Worship & Prayer</b> — songs, confession, prayer in the Spirit.</li>
                <li><b className="text-navy">The Word</b> — TeeVo-rooted teaching on identity, faith & purpose.</li>
                <li><b className="text-navy">Response & Fellowship</b> — quiz, testimony, group prayer, connect to TeeVo Club/cell.</li>
              </ol>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <Link href="/teens/word" className="rounded-full border border-black/10 px-3 py-1 hover:border-gold/30">Grow in the Word →</Link>
                <Link href="/teens/activities" className="rounded-full border border-black/10 px-3 py-1 hover:border-gold/30">TeeVo Clubs →</Link>
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-extrabold text-navy">New Teenagers & Parents</h3>
              <p className="text-sm leading-6 text-slate-600 mt-2">First visit? Come with a parent/guardian if under 15, or with consent details. You&apos;ll meet a coordinator, hear what we teach, and get contact/next-step info. No photographs of minors used without consent.</p>
              <Link href="/teens/connect" className="mt-3 btn btn--navy !py-2 text-xs">New Here? Contact Us</Link>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-extrabold text-navy">Frequently Asked Questions</h3>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                <li><b className="text-navy">Is there a fee?</b> No. Teens Church is free.</li>
                <li><b className="text-navy">Can friends come?</b> Yes — invite classmates; we&apos;ll welcome them.</li>
                <li><b className="text-navy">What about safeguarding?</b> Supervised rooms, vetted volunteers, no 1-to-1 private messaging, parental consent for events/media.</li>
                <li><b className="text-navy">Where&apos;s Youth/Kids?</b> <Link href="/youth" className="underline">Youth 20–35</Link> · <Link href="/kids" className="underline">Kids 4–12</Link> · <Link href="/" className="underline">Main Church</Link></li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-navy text-white rounded-xl p-6"><h3 className="font-display font-extrabold">Plan your first visit</h3><p className="text-sm leading-6 text-white/80 mt-2">30B Rumuokwuta / NTA Road, opposite Patcoin. Landmark: NTA Road entrance. Parking near main service area.</p><div className="mt-4 flex flex-wrap gap-2"><Link href="/new-here" className="btn bg-gold text-navy !py-2 text-xs w-full justify-center">Plan Your Visit →</Link><Link href="/contact" className="btn bg-white/10 border border-white/20 text-white !py-2 text-xs w-full justify-center">Ask a Question</Link></div></div>
            <div className="card p-5"><h3 className="font-display font-extrabold text-navy">Quick links</h3><div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <Link href="/teens/word" className="rounded-xl border border-black/10 p-3 hover:border-gold/30">Daily TeeVo</Link>
              <Link href="/teens/gifts" className="rounded-xl border border-black/10 p-3 hover:border-gold/30">Discover Gifts</Link>
              <Link href="/teens/events" className="rounded-xl border border-black/10 p-3 hover:border-gold/30">Events</Link>
              <Link href="/teens/resources" className="rounded-xl border border-black/10 p-3 hover:border-gold/30">Resources</Link>
            </div></div>
          </div>
        </div>
      </section>
    </>
  )
}
