import { BooksWidget } from '@/components/group/BooksWidget'

export const metadata = { title: 'Resources' }

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-12">
          <div className="eyebrow !text-gold">Spiritual Library · LoveWorld</div>
          <h1 className="font-display font-black text-[2.4rem] leading-none mt-2">Resources</h1>
          <p className="text-slate-200 mt-3 max-w-2xl leading-7">Bible study, prayer, evangelism, discipleship — plus official Loveworld Books &amp; eLibrary (affiliate) — where authorised.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-cc">
          <BooksWidget />
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container-cc grid lg:grid-cols-3 gap-6">
          {[
            { t: 'Bible Study', d: 'Study notes, reading plans, series' },
            { t: 'Prayer', d: 'Guides, programmes, schedules, materials' },
            { t: 'Evangelism', d: 'Soul-winning tools, outreach guides, salvation resources' },
            { t: 'Spiritual Growth', d: 'Faith, the Word, Holy Spirit, purpose, leadership' },
            { t: 'Official Resources', d: 'Rhapsody of Realities, Healing School, PCDL, LoveWorld — linked appropriately' },
            { t: 'Foundation School Materials', d: 'Approved notes & PDFs for students' }
          ].map(c => (
            <div key={c.t} className="card p-6">
              <h3 className="font-display font-extrabold">{c.t}</h3>
              <p className="text-sm leading-6 text-slate-600 mt-2">{c.d}</p>
              <button className="mt-3 btn btn--ghost !py-2 text-sm">Browse</button>
            </div>
          ))}
        </div>
        <div className="container-cc mt-6 text-xs text-muted">Ensure permission to host/reproduce materials. Search, filters, download, read online, audio/video, save &amp; share. Books via loveworldbooks.org — affiliate; support LoveWorld mission.</div>
      </section>
    </>
  )
}
