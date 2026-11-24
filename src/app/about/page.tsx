import Link from 'next/link'
import Image from 'next/image'
import history from '@/data/history.json'
import faith from '@/data/statementOfFaith.json'
import pastor from '@/data/pastorChris.json'
import cell from '@/data/cellSystem.json'
import foundation from '@/data/foundationSchool.json'
import leaders from '@/data/leaders.json'

export const metadata = { title: 'About Us — Vision, History & Beliefs' }

export default function AboutPage() {
  return (
    <>
      {/* Hero — editorial light, gold rule, no pill forest */}
      <section className="bg-haze border-b border-black/5">
        <div className="container-cc py-10 md:py-14">
          <div className="flex gap-5 max-w-4xl">
            <div className="hidden sm:block ankara-rule w-[3px] self-stretch shrink-0" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-muted">About · LoveWorld Nation · Port Harcourt Zone 3</div>
              <h1 className="font-display font-extrabold text-[2.4rem] md:text-[2.8rem] leading-[0.9] tracking-tight mt-2 text-navy">
                Christ Embassy Central Church 3
              </h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-3xl">
                A LoveWorld church family in Port Harcourt — raised in the Word, led by the Spirit, taking the divine presence of God to our world. Being in Christ Embassy is more than being in a church — <em>it&apos;s a Vision</em> — giving your life a meaning.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted">
                <span>LoveWorld Nation</span>
                <span className="h-1 w-1 rounded-full bg-black/20" />
                <span>PH Zone 3 · Peter Odili Rd</span>
                <span className="h-1 w-1 rounded-full bg-black/20" />
                <span className="font-semibold text-navy">CC3 Group · 30B Rumuokwuta</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-cc grid lg:grid-cols-[1.25fr_0.75fr] gap-10">
          <div className="prose-cc space-y-12">
            {/* Vision / Mission / Purpose — editorial triptych, no equal cards */}
            <div>
              <div className="eyebrow">Our Vision, Mission &amp; Purpose</div>
              <div className="mt-5 grid sm:grid-cols-3 gap-6">
                {[
                  { k: 'Vision', v: 'To take the divine presence of God to the nations and to demonstrate the character of the Holy Spirit.' },
                  { k: 'Mission', v: 'To raise generations of men and women who will come into their inheritance to fulfill God’s dream.' },
                  { k: 'Purpose', v: 'To bring them into their inheritance in Christ.' },
                ].map(b => (
                  <div key={b.k} className="border-l-2 border-gold pl-4 py-1">
                    <div className="text-xs font-bold tracking-widest uppercase text-gold">{b.k}</div>
                    <p className="text-sm mt-1.5 leading-6 font-medium text-navy">{b.v}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted mt-4">
                Wording is canonical — see <a href="https://loveworld.inc" target="_blank" className="underline underline-offset-4">loveworld.inc</a> and{' '}
                <a href="https://cephzone3.org" target="_blank" className="underline underline-offset-4">cephzone3.org</a>.
              </p>
            </div>

            {/* Statement of Faith — numbered list, not 2-col card grid */}
            <div>
              <h2 className="text-2xl">Statement of Faith</h2>
              <p className="text-sm text-muted mt-1">Our doctrine has its source in the Bible and is in total agreement with the foundational principles of the doctrines of Christ.</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {faith.map((f: any) => (
                  <div key={f.id} className="flex gap-3">
                    <div className="shrink-0 h-7 w-7 rounded-lg bg-haze border border-black/5 grid place-items-center text-xs font-bold text-navy">{f.id}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold leading-tight text-navy">{f.title}</div>
                      <div className="text-xs text-muted mt-0.5">{f.verse}</div>
                      <div className="text-sm mt-1 leading-6 text-slate-600">{f.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* History — vertical timeline with gold spine */}
            <div>
              <h2 className="text-2xl">Our History</h2>
              <div className="mt-6 relative pl-6 border-l-2 border-gold/20 space-y-7">
                {history.map((h: any) => (
                  <div key={h.year} className="relative">
                    <span className="absolute -left-[9px] top-1 h-3 w-3 rounded-full bg-gold border-2 border-white shadow" />
                    <div className="text-xs font-bold tracking-widest uppercase text-vermilion">{h.year}</div>
                    <div className="font-display font-extrabold text-navy leading-tight mt-0.5">{h.title}</div>
                    <div className="text-sm leading-6 text-slate-600 mt-1">{h.desc}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted mt-5">Headquarters: 8 Billings Way, Oregun, Ikeja, Lagos. Branches in 5 continents.</p>
            </div>

            {/* Leadership — editorial previews, no gradient overlay cards */}
            <div>
              <h2 className="text-2xl">Our Leadership</h2>
              <p className="text-sm text-muted mt-1">President · Zonal Pastor · Group Pastor — serving with excellence and love.</p>
              <div className="mt-6 grid sm:grid-cols-3 gap-5">
                {leaders.slice(0, 3).map((l: any) => (
                  <div key={l.id} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-black/5 bg-haze">
                      <Image src={l.image} alt={l.name} fill className="object-cover object-top group-hover:scale-[1.02] transition duration-500" />
                    </div>
                    <div className="mt-3">
                      <div className="font-display font-extrabold text-sm leading-tight text-navy">{l.name}</div>
                      <div className="text-xs font-semibold tracking-wide text-gold mt-0.5">{l.title}</div>
                      <p className="text-xs leading-5 text-slate-600 mt-2 line-clamp-3">{l.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/pastors" className="mt-5 inline-flex btn btn--ghost !py-2 text-xs">
                Meet all pastors
              </Link>
            </div>

            {/* Pastor Chris — split editorial */}
            <div className="border-t border-black/5 pt-8">
              <h2 className="text-2xl">Our President — {pastor.name}</h2>
              <div className="mt-4 flex gap-5">
                <div className="relative h-28 w-28 rounded-xl overflow-hidden shrink-0 border border-black/10 bg-haze">
                  <Image src={(leaders as any).find((x: any) => x.id === 'president')?.image || '/assets/images/leaders/pastor-chris-oyakhilome.jpg'} alt={pastor.name} fill className="object-cover object-top" />
                </div>
                <p className="flex-1 text-sm leading-7 text-slate-600">{pastor.bio}</p>
              </div>
              <p className="text-sm leading-7 text-slate-600 mt-3">
                <span className="font-semibold text-navy">Mandate:</span> {pastor.mandate}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {pastor.ministries.map((m: string) => (
                  <span key={m} className="inline-flex items-center bg-haze border border-black/5 px-2.5 py-1 text-xs font-medium text-navy">
                    {m}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={pastor.links.official} target="_blank" className="btn btn--navy !py-2 text-xs">
                  PastorChrisOnline
                </a>
                <a href={pastor.links.loveworld} target="_blank" className="btn btn--ghost !py-2 text-xs">
                  LoveWorld Inc
                </a>
              </div>
            </div>

            {/* Cell + Foundation — distinct panels, not identical cards */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-haze border border-black/5 rounded-xl p-5">
                <div className="text-xs font-bold tracking-widest uppercase text-vermilion">Cells</div>
                <h3 className="font-display font-extrabold text-navy mt-1">{cell.title}</h3>
                <p className="text-sm leading-6 text-slate-600 mt-2">{cell.definition}</p>
                <div className="mt-3 text-xs text-muted">{cell.size} · {cell.schedule}</div>
                <ul className="mt-3 list-disc pl-5 text-sm leading-6 text-slate-600">
                  {cell.purposes.map((p: string) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Link href="/cells" className="mt-4 btn btn--navy w-full justify-center text-xs">
                  Find a Cell
                </Link>
              </div>
              <div className="bg-white border border-black/10 rounded-xl p-5">
                <div className="text-xs font-bold tracking-widest uppercase text-gold">Growth</div>
                <h3 className="font-display font-extrabold text-navy mt-1">Foundation School</h3>
                <p className="text-sm leading-6 text-slate-600 mt-2">{foundation.intro}</p>
                <div className="mt-3 text-xs font-bold text-navy">{foundation.duration}</div>
                <ol className="mt-2 space-y-1 text-sm text-slate-600">
                  {foundation.classes.map((c: any) => (
                    <li key={c.id}>
                      <span className="font-bold text-navy">{c.id}.</span> {c.title}
                    </li>
                  ))}
                </ol>
                <Link href="/foundation-school" className="mt-4 btn btn--ghost w-full justify-center text-xs">
                  Explore Classes
                </Link>
              </div>
            </div>
          </div>

          {/* Right rail — kept but de-pilled, tiered radii */}
          <div className="space-y-6">
            <div className="bg-navy text-white rounded-xl p-6 border border-white/10">
              <div className="text-xs font-bold tracking-[0.14em] uppercase text-gold">LoveWorld Nation</div>
              <h3 className="font-display font-extrabold mt-2">A global family — one Vision</h3>
              <p className="text-sm leading-6 text-white/80 mt-2">
                From Lagos to Houston, London to Johannesburg — one Vision expressed locally, taking the divine presence to nations. You worship in Port Harcourt, yet partner with saints in 100+ nations through Rhapsody ReachOut, Healing Streams, and Global Communion — giving your life a meaning.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-white/10 border border-white/10 p-2.5">
                  <div className="font-extrabold text-gold">8,300+</div>
                  <div className="text-white/70 leading-tight">languages (Rhapsody)</div>
                </div>
                <div className="rounded-lg bg-white/10 border border-white/10 p-2.5">
                  <div className="font-extrabold text-gold">24/7</div>
                  <div className="text-white/70 leading-tight">LoveWorld TV</div>
                </div>
                <div className="rounded-lg bg-white/10 border border-white/10 p-2.5">
                  <div className="font-extrabold text-gold">1M+</div>
                  <div className="text-white/70 leading-tight">households reached</div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-display font-extrabold text-navy">Visit us</h3>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                Central Church 3 (Group HQ): <b className="text-navy">30B Rumuokwuta/NTA Road</b> — Pastor Kelson Onoriode
                <br />
                Zonal Church: Jessy &amp; Jenny Rd, Peter Odili Rd<br />
                Sunday 8AM · Wednesday 5:30PM · Friday Prayer 5:30PM
              </div>
              <Link href="/new-here" className="mt-4 btn btn--navy w-full justify-center">
                Plan Your Visit
              </Link>
              <Link href="/pastors" className="mt-2 btn btn--ghost w-full justify-center">
                Meet Our Pastors
              </Link>
            </div>

            <div className="card p-6">
              <h3 className="font-display font-extrabold text-navy">FAQs</h3>
              <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                <li>
                  <span className="font-semibold text-navy">Dress code?</span> Come as you are — modest and comfortable.
                </li>
                <li>
                  <span className="font-semibold text-navy">Online?</span> <Link href="/online" className="text-navy underline underline-offset-4">LoveWorld Live TV</Link> 24/7.
                </li>
                <li>
                  <span className="font-semibold text-navy">Children?</span> <Link href="/kids" className="text-navy underline underline-offset-4">Kids Church</Link> during service.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
