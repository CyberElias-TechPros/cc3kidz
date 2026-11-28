import Link from 'next/link'

export const metadata = {
  title: 'LoveWorld Graduate Network — CE Central Church 3 Youth | Purpose after Campus',
  description:
    'The LoveWorld Graduate Network connects graduates and young professionals for mentorship, career purpose and global impact — staying rooted in Christ through every season after school. Join through CC3 Youth.',
}

const PILLARS = [
  { icon: '🧭', name: 'Mentorship', d: 'Direct access to mentors in the ministry who have walked your path — career, calling, character.' },
  { icon: '💼', name: 'Career & Purpose', d: 'Purpose-driven career guidance: interviews, workplaces, businesses — as mission fields and ministry platforms.' },
  { icon: '🌍', name: 'Global Impact', d: 'Projects and initiatives across the LoveWorld world — your profession becomes a tool for the Gospel.' },
  { icon: '🤝', name: 'Community', d: 'A network of graduates and young professionals who pray together, build together and stay accountable.' },
]

export default function GraduateNetworkPage() {
  return (
    <div className="min-h-screen bg-haze">
      {/* HERO */}
      <section className="bg-navy text-white border-b border-white/10">
        <div className="container-cc py-12">
          <div className="flex gap-4 max-w-4xl">
            <div className="hidden sm:block w-[3px] self-stretch rounded-full bg-gold" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-white/60">LoveWorld Youth Ministry · Graduates &amp; Young Professionals</div>
              <h1 className="font-display font-extrabold text-[2.6rem] leading-[0.95] tracking-tight mt-2">
                You don&apos;t graduate <span className="text-gold italic">from purpose.</span>
              </h1>
              <p className="mt-3 text-[1.05rem] leading-7 text-white/85 max-w-2xl">
                Campus ends; calling doesn&apos;t. The LoveWorld Graduate Network keeps graduates and young
                professionals rooted in Christ — through mentorship, career purpose and global impact
                opportunities that outlast NYSC, first jobs and relocations.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href="https://blwgraduatenetwork.org" target="_blank" rel="noreferrer" className="btn bg-gold text-navy !py-2.5">Join the Network ↗</a>
                <Link href="/youth/connect" className="btn bg-white/10 border border-white/20 text-white !py-2.5">Connect through CC3 Youth</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="text-xs font-bold tracking-widest uppercase text-gold">The Four Pillars</div>
          <h2 className="font-display font-extrabold text-2xl text-navy mt-1">What the Network gives you</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {PILLARS.map(p => (
              <div key={p.name} className="card p-6 hover:border-gold/40">
                <div className="text-2xl" aria-hidden>{p.icon}</div>
                <h3 className="font-display font-extrabold text-navy mt-2">{p.name}</h3>
                <p className="text-sm leading-6 text-slate-600 mt-1">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="section bg-haze">
        <div className="container-cc grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="card p-6">
            <h2 className="font-display font-extrabold text-xl text-navy">Who it&apos;s for</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li className="flex gap-2"><span className="text-gold font-bold">✓</span> Corps members and fresh graduates finding their footing after school.</li>
              <li className="flex gap-2"><span className="text-gold font-bold">✓</span> Young professionals (20–35) who want their career to carry Kingdom purpose.</li>
              <li className="flex gap-2"><span className="text-gold font-bold">✓</span> Postgraduate students and researchers who refuse to separate faith from scholarship.</li>
              <li className="flex gap-2"><span className="text-gold font-bold">✓</span> Entrepreneurs building businesses as vehicles for the Gospel and impact.</li>
            </ul>
            <p className="text-xs text-muted mt-4">
              Membership is via the official global platform; local meetups, mentoring circles and project teams
              are coordinated through CC3 Youth leadership.
            </p>
          </div>
          <aside className="space-y-4">
            <div className="card p-6 bg-navy text-white">
              <h3 className="font-display font-extrabold text-lg">Engage directly with mentors</h3>
              <p className="text-sm leading-6 text-white/80 mt-2">
                The Network&apos;s signature is proximity to mentors who have gone ahead — in ministry, industry
                and enterprise. That access is deliberate: purpose multiplies where wisdom is near.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-extrabold text-navy">Related platforms</h3>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/youth/creators-connect" className="rounded-xl bg-haze border border-black/5 p-3 hover:border-gold/30 text-navy font-semibold">Creators Connect →</Link>
                <Link href="/youth/word" className="rounded-xl bg-haze border border-black/5 p-3 hover:border-gold/30 text-navy font-semibold">Word &amp; Spirit (Rhapsody, PCDL) →</Link>
                <a href="https://pcdl.co" target="_blank" rel="noreferrer" className="rounded-xl bg-haze border border-black/5 p-3 hover:border-gold/30 text-navy font-semibold">PCDL — message library ↗</a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
