import Link from 'next/link'

export const metadata = {
  title: 'Creators Connect — CE Central Church 3 Youth | Design, Film, Music, Tech for Christ',
  description:
    'Creators Connect is the LoveWorld platform for creatively and digitally gifted young people — design, photography, video, film, animation, writing, music and technology. Join through CC3 Youth.',
}

const TRACKS = [
  { icon: '🎨', name: 'Design & Branding', d: 'Graphics, UI, brand identity — make the Gospel beautiful everywhere it is seen.' },
  { icon: '📷', name: 'Photography', d: 'Capture worship, outreach and testimony — images that preach without words.' },
  { icon: '🎬', name: 'Video & Film', d: 'Edits, documentaries, short films — stories of faith for every screen.' },
  { icon: '✍️', name: 'Writing', d: 'Devotionals, scripts, copy, journalism — words that carry the Word.' },
  { icon: '🎵', name: 'Music & Sound', d: 'Songwriting, production, live sound — the sound of a generation.' },
  { icon: '💻', name: 'Technology', d: 'Code, data, web, AI tools — build the platforms the Gospel runs on.' },
]

export default function CreatorsConnectPage() {
  return (
    <div className="min-h-screen bg-haze">
      {/* HERO */}
      <section className="bg-navy text-white border-b border-white/10">
        <div className="container-cc py-12">
          <div className="flex gap-4 max-w-4xl">
            <div className="hidden sm:block w-[3px] self-stretch rounded-full bg-gold" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-white/60">LoveWorld Youth Ministry · Creative &amp; Digital</div>
              <h1 className="font-display font-extrabold text-[2.6rem] leading-[0.95] tracking-tight mt-2">
                Creators <span className="text-gold">Connect.</span>
              </h1>
              <p className="mt-3 text-[1.05rem] leading-7 text-white/85 max-w-2xl">
                Your gift is not a hobby — it&apos;s a ministry. Creators Connect is the official LoveWorld
                platform where creatively and digitally gifted young people are identified, trained and deployed
                — turning design, film, music, writing and technology into tools for the Gospel.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href="https://ministryofteensandyouth.org/creators-connect/" target="_blank" rel="noreferrer" className="btn bg-gold text-navy !py-2.5">Join Creators Connect ↗</a>
                <Link href="/youth/connect" className="btn bg-white/10 border border-white/20 text-white !py-2.5">Talk to CC3 Youth first</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="text-xs font-bold tracking-widest uppercase text-gold">The Tracks</div>
          <h2 className="font-display font-extrabold text-2xl text-navy mt-1">Six ways your creativity serves the Kingdom</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRACKS.map(t => (
              <div key={t.name} className="card p-6 hover:border-gold/40">
                <div className="text-2xl" aria-hidden>{t.icon}</div>
                <h3 className="font-display font-extrabold text-navy mt-2">{t.name}</h3>
                <p className="text-sm leading-6 text-slate-600 mt-1">{t.d}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-4 max-w-3xl">
            Track availability and local expression are coordinated by CC3 Youth leadership together with the
            global ministry platform — sign up on the official page to be considered for projects, training and
            showcases.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS LOCALLY */}
      <section className="section bg-haze">
        <div className="container-cc grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="card p-6">
            <h2 className="font-display font-extrabold text-xl text-navy">How it works through CC3 Youth</h2>
            <ol className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
              <li className="flex gap-3">
                <span className="h-7 w-7 grid place-items-center rounded-full bg-navy text-gold text-xs font-black flex-shrink-0">1</span>
                <span><b className="text-navy">Sign up on the official platform</b> — the link above goes to the ministry&apos;s Creators Connect page. Registration tells the global team who you are and what you carry.</span>
              </li>
              <li className="flex gap-3">
                <span className="h-7 w-7 grid place-items-center rounded-full bg-navy text-gold text-xs font-black flex-shrink-0">2</span>
                <span><b className="text-navy">Tell Brother Kelvin&apos;s team</b> — through <Link href="/youth/connect" className="underline text-navy font-semibold">CC3 Youth connect</Link>, so your gifts are known locally and you get added to church projects (media, events, outreach campaigns).</span>
              </li>
              <li className="flex gap-3">
                <span className="h-7 w-7 grid place-items-center rounded-full bg-navy text-gold text-xs font-black flex-shrink-0">3</span>
                <span><b className="text-navy">Create, train, deploy</b> — you&apos;ll plug into local production teams and global briefs, with mentorship from the ministry&apos;s creative network.</span>
              </li>
            </ol>
          </div>
          <aside className="space-y-4">
            <div className="card p-6 bg-navy text-white">
              <h3 className="font-display font-extrabold text-lg">Why it matters</h3>
              <p className="text-sm leading-6 text-white/80 mt-2">
                The Gospel travels on media. Every design, frame, lyric and line of code you dedicate to Christ
                carries His presence into places a preacher may never physically reach — that is ministry.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-extrabold text-navy">Related platforms</h3>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/youth/graduate-network" className="rounded-xl bg-haze border border-black/5 p-3 hover:border-gold/30 text-navy font-semibold">LoveWorld Graduate Network →</Link>
                <Link href="/youth/rise" className="rounded-xl bg-haze border border-black/5 p-3 hover:border-gold/30 text-navy font-semibold">Y.O.U-Rise outreach →</Link>
                <a href="https://lwappstore.com" target="_blank" rel="noreferrer" className="rounded-xl bg-haze border border-black/5 p-3 hover:border-gold/30 text-navy font-semibold">LoveWorld App Store ↗</a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
