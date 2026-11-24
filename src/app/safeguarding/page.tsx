export const metadata = { title: 'Safeguarding & Child Protection' }

export default function SafeguardingPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-12">
          <div className="eyebrow !text-gold">Safety</div>
          <h1 className="font-display font-black text-[2.4rem] leading-none mt-2">Safeguarding Policy</h1>
          <p className="text-slate-200 mt-3 max-w-2xl leading-7">Children & youth safety is paramount — approved personnel, consent, and reporting.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-cc prose-cc max-w-3xl space-y-6">
          <div className="card p-6">
            <h2 className="text-xl">Child Protection Policy</h2>
            <p>Only vetted, approved personnel serve in Children's/Teens ministry. Two-adult rule, sign-in/sign-out, authorised pickup, incident reporting. Full policy available at church office.</p>
          </div>
          <div className="card p-6">
            <h2 className="text-xl">Reporting concerns</h2>
            <p>Speak to Resident Pastors or Lead Safeguarding Coordinator immediately. All concerns documented and escalated per church procedure. Contact via Contact page → Safeguarding category.</p>
          </div>
          <div className="card p-6">
            <h2 className="text-xl">Media consent & privacy</h2>
            <p>Photos/videos of children used only with parental/guardian consent. Full names, schools, private schedules never published. Approved gallery only — never all photos.</p>
          </div>
          <div className="card p-6">
            <h2 className="text-xl">Related</h2>
            <p className="text-sm"><a href="/kids" className="underline">Kids Church</a> · <a href="/privacy" className="underline">Privacy Policy</a> · <a href="/contact" className="underline">Contact</a></p>
          </div>
        </div>
      </section>
    </>
  )
}
