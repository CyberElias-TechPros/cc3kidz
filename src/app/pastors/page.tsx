import Image from 'next/image'
import leaders from '@/data/leaders.json'
import Link from 'next/link'

export const metadata = { title: 'Pastors & Leadership' }

export default function PastorsPage() {
  const president = leaders.find((l: any) => l.id === 'president')
  const zonal = leaders.find((l: any) => l.id === 'zonal')
  const group = leaders.find((l: any) => l.id === 'group')

  return (
    <>
      {/* Hero — Haze editorial, left rule */}
      <section className="bg-haze border-b border-black/5">
        <div className="container-cc py-10 md:py-12">
          <div className="flex gap-5 max-w-3xl">
            <div className="hidden sm:block ankara-rule w-[3px] self-stretch shrink-0" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-muted">Leadership · Port Harcourt Zone 3</div>
              <h1 className="font-display font-extrabold text-[2.4rem] md:text-[2.8rem] leading-none tracking-tight mt-2 text-navy">Pastors &amp; Leadership</h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-slate-600">Shepherds after God’s heart — serving Central Church 3 and our Zone with love, the Word, and excellence. From President to cell leader, one Vision — giving your life a meaning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* President — full editorial feature, not card */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-black/5 bg-haze">
              <Image src={president?.image || '/assets/images/leaders/pastor-chris-oyakhilome.jpg'} alt={president?.name || 'President'} fill className="object-cover object-top" priority />
            </div>
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-gold">President — LoveWorld Inc.</div>
              <h2 className="font-display font-extrabold text-[1.8rem] md:text-[2.2rem] leading-tight tracking-tight mt-1 text-navy">{president?.name}</h2>
              <p className="mt-3 leading-7 text-slate-600 text-sm">{president?.bio}</p>
              <div className="mt-6 flex gap-3">
                <a href="https://pastorchrisonline.org" target="_blank" rel="noreferrer" className="btn btn--navy !py-2 text-xs">
                  PastorChrisOnline
                </a>
                <a href="https://loveworld.inc" target="_blank" rel="noreferrer" className="btn btn--ghost !py-2 text-xs">
                  LoveWorld Inc
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zonal + Group — two-up editorial */}
      <section className="section bg-haze">
        <div className="container-cc grid md:grid-cols-2 gap-8">
          {[zonal, group].map((l: any) => (
            <div key={l.id} className="bg-white border border-black/5 rounded-xl overflow-hidden flex flex-col">
              <div className="relative h-64 bg-haze">
                <Image src={l.image} alt={l.name} fill className="object-cover object-top" />
              </div>
              <div className="p-6 flex-1">
                <div className="text-xs font-bold tracking-widest uppercase text-gold">{l.title}</div>
                <h3 className="font-display font-extrabold text-xl leading-tight mt-1 text-navy">{l.name}</h3>
                <div className="text-xs font-semibold text-muted mt-1">{l.zone || l.group}{l.church ? ` · ${l.church}` : ''}</div>
                <p className="text-sm leading-6 text-slate-600 mt-3">{l.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Central Church 3 — Group Church, pastored solely by Kelson */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="max-w-2xl">
            <h2 className="font-display font-extrabold text-2xl tracking-tight text-navy">Christ Embassy Central Church 3</h2>
            <p className="text-sm text-muted mt-1">Group Headquarters at 30B Rumuokwuta/NTA Road — the only Pastor at the Group Church is Pastor Kelson Onoriode. Welcome home!</p>
            <div className="mt-4 rounded-xl bg-navy text-white p-5">
              <div className="text-xs font-bold tracking-widest uppercase text-gold">Pastor, Central Church 3 &amp; Group Pastor, CC3 Group</div>
              <div className="font-display font-extrabold text-lg mt-1">Pastor Kelson Onoriode</div>
              <p className="text-sm leading-6 text-white/80 mt-2">Shepherding the Central Church 3 congregation and providing pastoral oversight for the 6 churches in the CC3 Group Family — with excellence, prayer and the Word.</p>
              <div className="mt-3 text-xs text-white/60">30B Rumuokwuta/NTA Road, Opposite Patcoin Filling Station · Sundays 8AM · Pastoral care, cells & outreach</div>
            </div>
          </div>

          <div className="mt-10 bg-white border border-black/5 rounded-xl p-6 md:p-8">
            <h3 className="font-display font-extrabold text-navy">Leadership structure</h3>
            <p className="text-sm leading-6 text-slate-600 mt-2 max-w-3xl">Zonal Pastor → Group Pastor (Pastor Kelson Onoriode, also Pastor of Central Church 3) → Church Pastors (6 churches) → Department Heads → Cell Leaders → Coordinators</p>
            <p className="text-xs text-muted mt-2">Only publicly authorised information is displayed. Department leaders listed on their ministry pages.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/ministries" className="btn btn--navy !py-2 text-sm">
                View Ministries
              </Link>
              <Link href="/cells" className="btn btn--ghost !py-2 text-sm">
                Cell Leaders
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}