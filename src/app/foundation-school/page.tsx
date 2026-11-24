import FoundationForm from '@/components/forms/FoundationForm'
export const metadata = { title: 'Foundation School' }

export default function FoundationSchoolPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-12">
          <div className="eyebrow !text-gold">Growth in the Word &middot; Discipleship</div>
          <h1 className="font-display font-black text-[2.4rem] leading-none mt-2">Foundation School</h1>
          <p className="text-slate-200 mt-3 max-w-2xl leading-7">Raised, established and perfected in the Word — the ordained pathway for every new creation in Christ to be grounded, grow, and function gloriously in the household of faith. Glory to God!</p>
        </div>
      </section>
      <section className="section">
        <div className="container-cc grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="font-display font-extrabold text-xl">What is Foundation School?</h2>
              <p className="text-sm leading-7 text-slate-600 mt-2">A 6–8 week systematic impartation — realities of the new creation, the infallible Word, living faith, prevailing prayer, the ministry of the Holy Spirit, Christian character and excellence, soul-winning, and life in the Local Assembly. For every new convert, every incoming member, and any believer desiring to be firm, rooted, and ready for service. Hallelujah!</p>
              <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
                {['Salvation & New Creation', 'The Word of God', 'Faith', 'Prayer', 'The Holy Spirit', 'Evangelism & Church Life'].map(c => (
                  <div key={c} className="rounded-xl bg-sand px-3 py-3 font-medium">{c}</div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-extrabold">Discipleship pathway</h3>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                {['New Creation in Christ', 'Foundation School', 'Planted in a Cell', 'Participation in Church', 'Functioning in Ministry', 'Raised for Leadership & Multiplication'].map(s => (
                  <span key={s} className="rounded-full bg-navy text-white px-4 py-2">{s}</span>
                ))}
              </div>
            </div>
          </div>
          <FoundationForm />
        </div>
      </section>
    </>
  )
}
