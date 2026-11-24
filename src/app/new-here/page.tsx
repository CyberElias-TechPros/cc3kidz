import PlanVisitForm from '@/components/forms/PlanVisitForm'
import VolunteerForm from '@/components/forms/VolunteerForm'

export const metadata = { title: "I'm New — Plan Your Visit" }

export default function NewHerePage() {
  return (
    <>
      <section className="bg-haze border-b border-black/5">
        <div className="container-cc py-10 md:py-12">
          <div className="flex gap-5 max-w-3xl">
            <div className="hidden sm:block ankara-rule w-[3px] self-stretch shrink-0" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-muted">First time? · 30B Rumuokwuta/NTA Road</div>
              <h1 className="font-display font-extrabold text-[2.4rem] md:text-[2.8rem] leading-none tracking-tight mt-2 text-navy">Plan Your Visit</h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Come as you are — encounter the Word, experience His presence, and be raised to maturity in Christ. Giving your life a meaning.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-cc grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="space-y-6">
            <div className="bg-white border border-black/5 rounded-xl p-6">
              <h2 className="font-display font-extrabold text-xl tracking-tight text-navy">What to expect</h2>
              <ol className="list-decimal pl-6 text-sm leading-7 text-slate-600 mt-3">
                <li>Warm welcome at the entrance — ushers receive you in love and guide you to your seat. You are most welcome!</li>
                <li>Vibrant worship in psalms and hymns, and prevailing prayer (about 3 hours on Sundays) — lifted by the Spirit.</li>
                <li>Life-transforming ministry of the Word — the infallible, efficacious Word that builds you and causes you to reign.</li>
                <li>No dress code — come comfortably and modestly; decency and excellence unto the Lord.</li>
                <li>
                  Champions for Christ — Children &amp; Teens programmes run during main service — <a href="/kids" className="underline underline-offset-4 text-navy">Kids Church</a>.
                </li>
                <li>Find parking near NTA Road entrance; landmark: Opposite Patcoin Filling Station.</li>
              </ol>
            </div>

            <div className="bg-haze border border-black/5 rounded-xl p-6">
              <h3 className="font-display font-extrabold text-navy">Visit workflow</h3>
              <div className="mt-3 grid sm:grid-cols-3 gap-3 text-sm">
                {['Discover online', 'Plan your visit', 'Received in love', 'Attend to the Word', 'Planted in a cell', 'Perfected in Foundation School'].map(s => (
                  <div key={s} className="bg-white border border-black/5 px-3 py-3 font-medium text-navy text-xs leading-tight">
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div id="volunteer" className="scroll-mt-24">
              <VolunteerForm />
            </div>
          </div>
          <PlanVisitForm />
        </div>
      </section>
    </>
  )
}
