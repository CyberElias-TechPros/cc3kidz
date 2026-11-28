import Cc3FacebookGallery from './Cc3FacebookGallery'

export const metadata = { title: 'Gallery — CC3 Photos' }

const cats = ['Sunday Services', 'Midweek', 'Outreach', 'Cells', 'Teens & Children', 'Celebrations']

export default function GalleryPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-12">
          <div className="eyebrow !text-gold">Church Moments</div>
          <h1 className="font-display font-black text-[2.4rem] leading-none mt-2">Gallery</h1>
          <p className="text-slate-200 mt-3 max-w-2xl leading-7">Curated — not every photo from every event. Albums by category, with captions, date, photographer credit where appropriate.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-cc">
          <div className="flex flex-wrap gap-2">
            {cats.map(c => (
              <span key={c} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm">{c}</span>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-gold/20 bg-gold/[0.06] px-4 py-3 text-sm leading-6">
            Real CC3 photos from <a href="https://web.facebook.com/cc3phzone3" target="_blank" rel="noreferrer" className="font-bold underline underline-offset-2">fb.com/cc3phzone3</a> (6,374 followers). Tap any photo to open it on Facebook. Cover + profile images are from the Page header.
          </div>
          <h2 className="font-display font-black text-xl mt-8">CC3 — Facebook Photos</h2>
          <Cc3FacebookGallery />
          <p className="text-xs text-muted mt-8">Download where authorized · Share · Full-screen masonry view — coming soon with lightbox.</p>
        </div>
      </section>
    </>
  )
}
