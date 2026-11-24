import PrayerForm from '@/components/forms/PrayerForm'

export const metadata = { title: 'Prayer & Counselling' }

export default function PrayerPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-12">
          <div className="eyebrow !text-gold">Prevailing Prayer &middot; Spiritual Support</div>
          <h1 className="font-display font-black text-[2.4rem] leading-none mt-2">Prayer & Counselling</h1>
          <p className="text-slate-200 mt-3 max-w-2xl leading-7">We prevail together — private prayer submissions lifted by assigned intercessors, followed up in love and by the Spirit. Confidential, pastoral, and ordained for your lifting. Glory!</p>
        </div>
      </section>
      <section className="section">
        <div className="container-cc grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <PrayerForm />
          <div className="space-y-6">
            <div id="meeting" className="card p-6">
              <h3 className="font-display font-extrabold">Prayer meetings</h3>
              <p className="text-sm text-muted mt-2">Monday Prayer &amp; Prophecy 6PM · Friday Prevailing Prayer 5:30PM · Cell prayer chains · Special programmes as announced. We make power available!</p>
              <button className="btn btn--ghost mt-3">Join a Prayer Group</button>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-extrabold">Counselling & Pastoral support</h3>
              <p className="text-sm text-muted mt-2">Request a pastoral conversation — be strengthened, counselled by the Word, and guided into all God has ordained for you. We counsel in love, excellence, and by the Spirit.</p>
              <form className="mt-3 space-y-3" action="#" method="post">
                <input placeholder="Name" className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
                <select className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm">
                  <option>General</option>
                  <option>Marriage & Family</option>
                  <option>Work / Career</option>
                  <option>Spiritual Growth</option>
                </select>
                <button className="btn btn--navy w-full justify-center">Request Counselling</button>
              </form>
              <p className="text-xs text-muted mt-2">Sensitive matters referred to qualified external support where needed. Minimal data collected.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
