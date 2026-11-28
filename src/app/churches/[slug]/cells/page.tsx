import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getChurchBySlug, getCellsForChurch } from '@/lib/churches'
import { ChurchBreadcrumb } from '@/components/church/ChurchNav'

export default async function ChurchCells({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const church = getChurchBySlug(slug)
  if (!church) return notFound()
  const cells = getCellsForChurch(church.id)

  return (
    <>
      <ChurchBreadcrumb slug={slug} churchName={church.name} current="Cells" />
      <section className="section bg-white">
        <div className="container-cc">
          <div className="eyebrow">Cells · Where No One Walks Alone · {church.shortName}</div>
          <h1 className="font-display font-black text-3xl leading-tight mt-3 text-navy">{cells.length} Cells under {church.name}</h1>
          <p className="text-sm leading-7 text-slate-600 mt-3 max-w-2xl">Every cell under {church.shortName} meets weekly in homes, offices, and communities across {church.area} — same Word, same Pastor {church.pastor}’s shepherding, same Spirit-filled fellowship.</p>

          {cells.length === 0 ? (
            <div className="mt-8 card p-8 text-center">
              <div className="font-display font-extrabold text-navy">Cells launching soon near {church.area.split('·')[0].trim()}</div>
              <p className="text-sm text-muted mt-2">Be the pioneer — WhatsApp us and we’ll connect you to the forming cell closest to you.</p>
              <a href={`https://wa.me/${church.whatsapp?.replace(/\D/g,'')}`} target="_blank" className="mt-4 btn btn--navy inline-flex !py-2 text-sm">Chat on WhatsApp →</a>
            </div>
          ) : (
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cells.map((c:any)=> (
                <div key={c.id} className="card p-5">
                  <div className="text-xs font-bold tracking-widest uppercase text-gold">{c.area} · {c.day} {c.time}</div>
                  <h3 className="font-display font-extrabold mt-1 text-navy leading-tight">{c.name}</h3>
                  <div className="text-xs text-muted mt-1">{c.leader} · {c.asst}</div>
                  <p className="text-xs leading-5 text-slate-600 mt-2">{c.venue}</p>
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <span className="inline-flex rounded-full bg-navy text-white px-3 py-1 text-xs font-bold">{c.members} members</span>
                    <a href={`https://wa.me/${church.whatsapp?.replace(/\D/g,'')}?text=Hi%20${encodeURIComponent(church.name)}%2C%20I%20want%20to%20join%20${encodeURIComponent(c.name)}%20in%20${encodeURIComponent(c.area)}`} target="_blank" className="text-xs font-bold text-vermilion hover:underline">Join →</a>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 card p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-haze">
            <div className="font-display font-extrabold text-navy">Can’t find your area? We’ll place you.</div>
            <div className="flex gap-2">
              <a href={`https://wa.me/${church.whatsapp?.replace(/\D/g,'')}`} target="_blank" className="btn btn--navy !py-2 text-sm">WhatsApp Us</a>
              <Link href="/cells" className="btn btn--ghost !py-2 text-sm">Group Cell Finder</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
