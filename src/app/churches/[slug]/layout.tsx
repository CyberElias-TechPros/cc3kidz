import { notFound } from 'next/navigation'
import { getChurchBySlug } from '@/lib/churches'
import { ChurchHeader } from '@/components/church/ChurchHeader'
import { ChurchNav } from '@/components/church/ChurchNav'

export async function generateStaticParams() {
  const churches = (await import('@/data/groupChurches.json')).default as any[]
  return churches.map((c: any) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const church = getChurchBySlug(slug)
  if (!church) return { title: 'Church Not Found' }
  return {
    title: `${church.name} — ${church.pastor} | CC3 Group`,
    description: `${church.name} in ${church.area} — ${church.pastor}, ${church.title}. ${church.address}. Sunday ${church.serviceTimes?.[0]?.time} · Part of Christ Embassy Central Church 3 Group (PH Zone 3) pastored by Pastor Kelson Onoriode.`,
  }
}

export default async function ChurchLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const church = getChurchBySlug(slug)
  if (!church) return notFound()

  return (
    <>
      <ChurchHeader church={church} />
      <ChurchNav slug={slug} churchName={church.name} />
      <main>{children}</main>
      {/* Church footer — distinct from main site footer, church-specific */}
      <footer className="bg-navy text-white mt-12 border-t border-white/10">
        <div className="container-cc py-8 grid md:grid-cols-[1.4fr_1fr_1fr] gap-8">
          <div>
            <div className="font-display font-black text-sm leading-tight">{church.name}</div>
            <div className="text-xs font-semibold tracking-wide text-gold mt-1">{church.pastor} · {church.title}</div>
            <p className="text-xs leading-5 text-white/60 mt-3 max-w-sm">
              {church.address} · {church.city}<br />
              {church.phone} · {church.isHeadquarters ? 'Group Headquarters — Pastor Kelson Onoriode (Group Pastor, only Pastor at the Group Church)' : 'Under Pastor Kelson Onoriode, Group Pastor & Pastor, Central Church 3 (PH Zone 3)'}
            </p>
            <div className="mt-4 flex gap-2">
              <a href={`https://wa.me/${church.whatsapp?.replace(/\D/g, '')}`} target="_blank" className="btn btn--gold !py-2 text-xs">WhatsApp</a>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(church.address)}`} target="_blank" className="btn btn--ghost !bg-white/10 !border-white/15 !text-white !py-2 text-xs">Directions</a>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-white/50">This Church</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href={`/churches/${church.slug}/about`} className="text-white/80 hover:text-white hover:underline">About Us</a></li>
              <li><a href={`/churches/${church.slug}/pastor`} className="text-white/80 hover:text-white hover:underline">Our Pastor</a></li>
              <li><a href={`/churches/${church.slug}/services`} className="text-white/80 hover:text-white hover:underline">Service Times</a></li>
              <li><a href={`/churches/${church.slug}/cells`} className="text-white/80 hover:text-white hover:underline">Cells Near You</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-white/50">CC3 Group Family</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/group" className="text-white/80 hover:text-white hover:underline">Group Directory (7 Churches)</a></li>
              <li><a href="/pastors" className="text-white/80 hover:text-white hover:underline">Pastors & Leadership</a></li>
              <li><a href="/cells" className="text-white/80 hover:text-white hover:underline">Cell Finder</a></li>
              <li><a href="/" className="text-white/80 hover:text-white hover:underline">Central Church 3 Home</a></li>
            </ul>
            <div className="mt-4 text-xs text-white/40">© {new Date().getFullYear()} Christ Embassy Central Church 3 · Port Harcourt Zone 3</div>
          </div>
        </div>
      </footer>
    </>
  )
}
