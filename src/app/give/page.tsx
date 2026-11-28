import GiveForm from '@/components/forms/GiveForm'
import partnerships from '@/data/partnerships.json'
import arms from '@/data/partnershipArms.json'
import { SponsorCard, PartnershipArmCard } from '@/components/group/SponsorCard'
import GivingFlow from '@/components/giving/GivingFlow'
import BankAccounts from '@/components/giving/BankAccounts'

export const metadata = { title: 'Give / Partnership — Bank Transfer + POP' }

export default function GivePage() {
  return (
    <>
      <section className="bg-haze border-b border-black/5">
        <div className="container-cc py-10 md:py-12">
          <div className="flex gap-5 max-w-4xl">
            <div className="hidden sm:block ankara-rule w-[3px] self-stretch shrink-0" aria-hidden />
            <div>
              <div className="text-xs font-semibold tracking-wide text-muted">Bank Transfer · POP Verification · Receipt</div>
              <h1 className="font-display font-extrabold text-[2.4rem] md:text-[2.8rem] leading-none tracking-tight mt-2 text-navy">Give / Partnership</h1>
              <p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">
                Nigeria-ready: choose a partnership arm (Rhapsody, Healing Streams, InnerCity, LoveWorld TV, Missions) or Tithe/Offering, pay via bank transfer to the correct arm account below, upload POP — finance verifies and issues receipt. Every arm has its own account. See{' '}
                <a href="https://christembassy.org/giving" target="_blank" rel="noreferrer" className="underline underline-offset-4">
                  christembassy.org/giving
                </a>{' '}
                pattern.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                <span className="bg-white border border-black/10 px-2.5 py-1 font-semibold text-navy">NGN Bank Transfer</span>
                <span className="bg-white border border-black/10 px-2.5 py-1 font-semibold text-navy">POP Upload → Verification</span>
                <span className="bg-gold text-navy px-2.5 py-1 font-bold border border-gold">100% Audited · Receipted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-cc">
          <GivingFlow />
        </div>
      </section>

      <section className="section bg-haze">
        <div className="container-cc">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display font-extrabold text-xl tracking-tight text-navy">Partnership Arms — LoveWorld Nation</h2>
            <span className="bg-white border border-black/10 px-2.5 py-1 text-xs font-bold text-navy">Official · christembassy.org</span>
          </div>
          <p className="text-sm leading-6 text-slate-600 mt-2 max-w-3xl">
            Sponsor an arm of the ministry — same portal as{' '}
            <a href="https://rhapsodyofrealities.org" target="_blank" rel="noreferrer" className="underline underline-offset-4">
              Rhapsody
            </a>
            ,{' '}
            <a href="https://healingstreams.tv" target="_blank" rel="noreferrer" className="underline underline-offset-4">
              Healing Streams
            </a>
            ,{' '}
            <a href="https://theinnercitymission.ngo" target="_blank" rel="noreferrer" className="underline underline-offset-4">
              InnerCity Mission
            </a>{' '}
            &{' '}
            <a href="https://loveworldtelevisionministry.org" target="_blank" rel="noreferrer" className="underline underline-offset-4">
              LoveWorld TV
            </a>
            . Your CC3 Group contribution is reconciled by arm.
          </p>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(arms as any[]).map(a => (
              <PartnershipArmCard key={a.id} arm={a} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-cc">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display font-extrabold text-xl tracking-tight text-navy">Sponsor a Cause — See Progress</h2>
            <span className="bg-haze border border-black/5 px-2.5 py-1 text-xs font-bold text-navy">Partnership · Transparency</span>
          </div>
          <p className="text-sm text-muted mt-2">Active drives — progress bars update from giving verifications. Tap to sponsor airtime, languages, missions.</p>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(partnerships as any[]).map(p => (
              <SponsorCard key={p.id} item={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-haze">
        <div className="container-cc grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <div>
            <h3 className="font-display font-extrabold text-xl tracking-tight text-navy">Bank Accounts by Arm (8 funds)</h3>
            <p className="text-sm leading-6 text-slate-600 mt-1">Each arm has its own account — pay the right arm so finance can reconcile. Covers Tithe, Offering, Rhapsody, Healing Streams, Building, Missions, Welfare, LoveWorld TV. Admin updates in Admin → Giving.</p>
            <div className="mt-6">
              <BankAccounts />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white border border-black/5 rounded-xl p-6">
              <h3 className="font-display font-extrabold text-navy">Legacy general giving</h3>
              <p className="text-sm text-muted mt-1">Old form kept for compatibility; new flow above is primary.</p>
              <div className="mt-4">
                <GiveForm />
              </div>
            </div>
            <div className="bg-white border border-black/5 rounded-xl p-6">
              <h3 className="font-display font-extrabold text-navy">Need help?</h3>
              <p className="text-sm leading-6 text-slate-600 mt-2">Finance verifies within 24–48h. You’ll get notification + receipt. Issues? Church office or <a href="/contact" className="underline underline-offset-4">contact</a>.</p>
              <div className="mt-3 text-xs text-muted">Online: KingsPay (where enabled) · PayPal · Card · Bank Transfer + POP</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
