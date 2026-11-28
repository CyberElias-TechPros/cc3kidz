import Link from 'next/link'
import { serviceTimes } from '@/lib/site'

export const metadata = {
  title: 'Parents & Guardians — CE Central Church 3 Teens | Safeguarding, Consent & Info',
  description:
    'Everything parents and guardians need for CC3 Teens Church: what we teach, schedules, safeguarding and photography policies, consent, and how to reach the teens leadership directly.',
}

const SCHEDULE = [
  { when: 'Sundays 8:00AM', what: 'Teens Church runs in its dedicated hall during the main service' },
  { when: 'Wednesdays 6:00PM', what: 'Midweek Teens fellowship — Word, discussion, mentorship' },
  { when: 'First Sunday 3:00PM', what: 'Global Communion Service — teens worship with the whole church family' },
]

export default function TeensParentsPage() {
  return (
    <div className="min-h-screen bg-haze">
      <section className="bg-navy text-white border-b border-white/10">
        <div className="container-cc py-10">
          <div className="flex gap-4 max-w-4xl">
            <div className="hidden sm:block w-[3px] self-stretch rounded-full bg-gold" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-white/60">Parents &amp; Guardians · Ages 13–19</div>
              <h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2">
                Parents, You&apos;re in the Right Place
              </h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-white/85 max-w-2xl">
                Your teenager&apos;s safety, discipleship and your peace of mind come first. Here is everything we
                ask parents to know — in plain language, nothing hidden.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-cc py-8 grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
        <div className="space-y-6">
          {/* WHAT CC3 TEENS IS */}
          <div className="card p-6">
            <h2 className="font-display font-extrabold text-xl text-navy">What CC3 Teens Church is</h2>
            <p className="text-sm leading-6 text-slate-600 mt-2">
              CE Central Church 3 Teens is the teens church of Christ Embassy Central Church 3 (Port Harcourt
              Zone 3), part of the LoveWorld Teens &amp; Youth Ministry. We exist to raise teenagers who know the
              Word, pray, worship authentically and take the Gospel to their schools and streets — with real
              mentorship from vetted youth leaders.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex gap-2"><span className="text-gold font-bold">✓</span> Age eligibility: 13–19 years (Children&apos;s Church serves 4–12; Youth Church serves 20–35).</li>
              <li className="flex gap-2"><span className="text-gold font-bold">✓</span> Every service is overseen by designated teens coordinators and pastors — teenagers are never unsupervised.</li>
              <li className="flex gap-2"><span className="text-gold font-bold">✓</span> Teaching is from the Word of God and the TeeVo devotional (Pastor Chris Oyakhilome) — we link to official resources; we never republish them.</li>
            </ul>
          </div>

          {/* SCHEDULES */}
          <div className="card p-6">
            <h2 className="font-display font-extrabold text-xl text-navy">Schedules</h2>
            <div className="mt-3 divide-y divide-black/5">
              {SCHEDULE.map(s => (
                <div key={s.when} className="py-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="text-sm font-extrabold text-navy sm:w-44">{s.when}</span>
                  <span className="text-sm text-slate-600">{s.what}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted mt-3">Confirmation: {serviceTimes.teens.footer} · Same building as the main church — 30B Rumuokwuta/NTA Road, Port Harcourt.</p>
          </div>

          {/* REGISTRATION & CONSENT */}
          <div className="card p-6">
            <h2 className="font-display font-extrabold text-xl text-navy">Registration &amp; consent</h2>
            <p className="text-sm leading-6 text-slate-600 mt-2">
              Joining is simple — walk in any Sunday, or <Link href="/teens/connect" className="underline text-navy font-semibold">send an interest note</Link>. For registration we collect only
              what ministry care requires: teen&apos;s name and age, a parent/guardian name, and one reachable phone number.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex gap-2"><span className="text-gold font-bold">•</span> Parent/guardian contact is required for any teen active in the ministry.</li>
              <li className="flex gap-2"><span className="text-gold font-bold">•</span> Outings, conferences and special programmes (TeeVo Clubs, T.I.T.H.E. outreaches, Trumpets) are announced in advance — written/WhatsApp consent is requested per event.</li>
              <li className="flex gap-2"><span className="text-gold font-bold">•</span> Registration data is kept by the ministry office only — it is never published on this website.</li>
            </ul>
          </div>

          {/* SAFEGUARDING */}
          <div className="card p-6">
            <h2 className="font-display font-extrabold text-xl text-navy">Safeguarding &amp; photography policy</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex gap-2"><span className="text-emerald-600 font-bold">✓</span> Leaders serving teens are members in good standing, screened and appointed by the pastoral team.</li>
              <li className="flex gap-2"><span className="text-emerald-600 font-bold">✓</span> Two-leader rule: activities are run so no teen is alone one-on-one with a single leader out of sight.</li>
              <li className="flex gap-2"><span className="text-emerald-600 font-bold">✓</span> Photographs: we publish only group moments from services/events; we do not publish names, ages or contact details alongside photos. If you do not want your teen photographed, tell the coordinator — we keep an opt-out register.</li>
              <li className="flex gap-2"><span className="text-emerald-600 font-bold">✓</span> No teenager&apos;s personal details are exposed on this website or in public materials.</li>
            </ul>
          </div>

          {/* HOW TO REACH US */}
          <div className="card p-6">
            <h2 className="font-display font-extrabold text-xl text-navy">How to reach the teens leadership</h2>
            <p className="text-sm leading-6 text-slate-600 mt-2">
              Questions, concerns or safeguarding reports go straight to the teens coordinators and the pastoral
              team — always through official channels, never through third parties.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/teens/connect" className="btn btn--navy !py-2 text-sm">Message the team →</Link>
              <Link href="/contact" className="btn btn--ghost !py-2 text-sm">Church contact page</Link>
            </div>
            <p className="text-xs text-muted mt-3">
              Serious safeguarding concerns are escalated to the Group Pastor the same day. We would rather
              over-communicate than leave you uncertain.
            </p>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-4">
          <div className="card p-6 bg-navy text-white">
            <h3 className="font-display font-extrabold text-lg">Quick answers</h3>
            <ul className="mt-3 space-y-3 text-sm text-white/80">
              <li><b className="text-white">Can my teen bring a friend?</b> Yes — friends are welcome every service.</li>
              <li><b className="text-white">Where do teens sit on Sunday?</b> Teens Church hall, not the main auditorium — ushers will walk you there.</li>
              <li><b className="text-white">What does my teen need?</b> A Bible (or the TeeVo app), a notebook, and a smile.</li>
              <li><b className="text-white">How do outings work?</b> Announced in advance; consent per event; leaders accompany throughout.</li>
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="font-display font-extrabold text-navy">Related links</h3>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/teens" className="rounded-xl bg-haze border border-black/5 p-3 hover:border-gold/30 text-navy font-semibold">Teens Church home →</Link>
              <Link href="/teens/rhapsody" className="rounded-xl bg-haze border border-black/5 p-3 hover:border-gold/30 text-navy font-semibold">TeeVo daily devotional →</Link>
              <Link href="/teens/achievements" className="rounded-xl bg-haze border border-black/5 p-3 hover:border-gold/30 text-navy font-semibold">TeeVo XP &amp; badges →</Link>
              <a href="https://ministryofteensandyouth.org" target="_blank" rel="noreferrer" className="rounded-xl bg-haze border border-black/5 p-3 hover:border-gold/30 text-navy font-semibold">Ministry of Teens &amp; Youth (global) ↗</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
