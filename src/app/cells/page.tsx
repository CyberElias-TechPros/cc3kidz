import { SectionHeading } from '@/components/Section'
import CellFinder from '@/components/CellFinder'
import JoinCellForm from '@/components/forms/JoinCellForm'
import { ZoneMap } from '@/components/group/ZoneMap'
import { ZoneBreadcrumb } from '@/components/group/ZoneBreadcrumb'

export const metadata = { title: 'Cells & Groups' }

export default function CellsPage() {
  return (
    <>
      <section className="bg-haze border-b border-black/5">
        <div className="container-cc py-10 md:py-12">
          <div className="flex gap-5 max-w-3xl">
            <div className="hidden sm:block ankara-rule w-[3px] self-stretch shrink-0" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-muted">Cell Ministry · 92 cells · 7 churches</div>
              <h1 className="font-display font-extrabold text-[2.4rem] md:text-[2.8rem] leading-none tracking-tight mt-2 text-navy">Find a Cell Near You</h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">The Cell System is central to spiritual growth and fellowship — small families where you are known, nurtured, and sent.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="container-cc">
        <ZoneBreadcrumb current="Cells" />
      </div>
      <section className="section bg-white">
        <div className="container-cc">
          <ZoneMap />
          <p className="text-xs text-muted mt-3 text-center">Each cell is auto-assigned to its nearest church (7 churches) — filter by church above to see cells. Tap a church on the map to view its cells.</p>
        </div>
      </section>
      <section className="section bg-haze">
        <div className="container-cc">
          <SectionHeading title="What is a cell?" desc="A home-based fellowship of 5–25 members meeting weekly for prayer, the Word, outreach, and care. Benefits: belonging, discipleship, evangelism practice, and leadership development." />
          <div className="mt-8">
            <CellFinder />
          </div>
          <div className="mt-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <div className="bg-white border border-black/5 rounded-xl p-6">
              <h3 className="font-display font-extrabold text-navy">Cell Leader Resources — restricted access</h3>
              <p className="text-sm leading-6 text-slate-600 mt-2">Meeting guides, study materials, outreach reports, and attendance submission live in the Member Portal (coming soon). Contact your Cell Coordinator for access.</p>
              <p className="text-xs text-muted mt-3">Privacy: private home addresses and member contacts are not published publicly.</p>
            </div>
            <JoinCellForm />
          </div>
        </div>
      </section>
    </>
  )
}
