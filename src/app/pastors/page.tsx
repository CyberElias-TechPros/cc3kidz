import Image from 'next/image'
import leaders from '@/data/leaders.json'
import Link from 'next/link'

export const metadata = { title: 'Pastors & Leadership' }

export default function PastorsPage() {
  const president = leaders.find((l: any) => l.id === 'president')
  const zonal = leaders.find((l: any) => l.id === 'zonal')
  const group = leaders.find((l: any) => l.id === 'group')
  const resident = leaders.find((l: any) => l.id === 'resident')
  const associate = leaders.find((l: any) => l.id === 'associate')

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
                <div className="text-xs font-semibold text-muted mt-1">{l.zone || l.group}</div>
                <p className="text-sm leading-6 text-slate-600 mt-3">{l.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resident + Associate — compact */}
      <section className="section bg-white">
        <div className="container-cc">
          <div className="max-w-2xl">
            <h2 className="font-display font-extrabold text-2xl tracking-tight text-navy">Central Church 3</h2>
            <p className="text-sm text-muted mt-1">Your pastors in Christ — present, prevailing in prayer by the Spirit, and close to home. You are most welcome!</p>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {[resident, associate].map((l: any) => (
              <div key={l.id} className="flex gap-4 border border-black/5 rounded-xl p-5 bg-white">
                <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0 bg-haze border border-black/5">
                  <Image src={l.image} alt={l.name} fill className="object-cover object-top" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-extrabold leading-tight text-navy">{l.name}</h3>
                  <div className="text-xs font-semibold tracking-wide text-gold mt-0.5">{l.title}</div>
                  <div className="text-xs text-muted mt-0.5">{l.church || ''}</div>
                  <p className="text-sm leading-6 text-slate-600 mt-2">{l.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white border border-black/5 rounded-xl p-6 md:p-8">
            <h3 className="font-display font-extrabold text-navy">Leadership structure</h3>
            <p className="text-sm leading-6 text-slate-600 mt-2 max-w-3xl">Zonal Pastor → Group Pastor → Resident Pastors → Assistant Pastor → Department Heads → Cell Leaders → Coordinators</p>
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
