import Countdown from '@/components/Countdown'
import { nextServiceDate } from '@/lib/dates'
import { LiveSchedule } from '@/components/group/LiveSchedule'

export const metadata = { title: 'Online Church — LoveWorld Networks Live' }

export default function OnlinePage() {
  const next = nextServiceDate('Sunday', '8:00 AM')
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-cc py-12">
          <div className="eyebrow !text-gold">Live Streaming · LoveWorld Networks · 11 Channels · 24/7</div>
          <h1 className="font-display font-black text-[2.4rem] leading-none mt-2">Online Church</h1>
          <p className="text-slate-200 mt-3 max-w-2xl leading-7">Join live or on-demand — LoveWorld SAT, USA, UK, Canada, XP, MENA and more via <a href="https://loveworldtelevisionministry.org" target="_blank" rel="noreferrer" className="underline decoration-gold">loveworldtelevisionministry.org</a> & satellite + KingsChat Live. Up-next schedule & funded progress below — partner to keep the Gospel on air.</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/10 border border-white/15 px-3 py-1">YouTube · Loveworld SAT · KingsChat Live</span>
            <a href="https://loveworldtelevisionministry.org" target="_blank" rel="noreferrer" className="rounded-full bg-emerald-500 text-white px-3 py-1 font-bold">Watch on LoveWorld TV →</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-cc grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="card overflow-hidden p-0 bg-black">
            <div className="flex items-center justify-between px-5 py-3 bg-navy text-white text-sm">
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> We are preparing — next live in:</span>
              <Countdown target={next.toISOString()} />
            </div>
            <div className="aspect-video relative bg-[#0b1226] grid place-items-center text-white">
              <div className="text-center p-8">
                <div className="font-display font-extrabold text-xl">Live stream will appear here when online</div>
                <p className="text-sm text-white/70 mt-2">Embed YouTube / LoveWorld authorized player. When offline, see next service + schedule. Your LoveWorld Specials 68% funded · Global Communion 91% · Healing Streams 68% — sponsor airtime keeps it on air.</p>
                <div className="mt-3 h-2 rounded-full bg-white/15 overflow-hidden max-w-md mx-auto"><div className="h-full bg-gold" style={{ width: '68%' }} /></div>
                <div className="text-xs text-white/60 mt-1">68% funded — sponsor 30 / 15 / 5 mins on <a href="/give#loveWorld-tv" className="underline">LoveWorld TV arm</a></div>
                <div className="mt-4 flex justify-center gap-2">
                  <a href="https://pastorchrisonline.org" target="_blank" rel="noreferrer" className="btn btn--ghost !bg-white/10 !border-white/15 !text-white">PastorChrisOnline</a>
                  <a href="https://loveworldtelevisionministry.org" target="_blank" rel="noreferrer" className="btn btn--gold">Open LoveWorld TV</a>
                </div>
              </div>
            </div>
            <div className="p-5 bg-white flex flex-wrap gap-2">
              <a href="/give#loveWorld-tv" className="btn btn--navy">Join Next Live Service</a>
              <a href="/services" className="btn btn--ghost">Service Schedule</a>
              <a href="/give" className="btn btn--gold">Sponsor Airtime</a>
            </div>
          </div>
          <div className="space-y-6">
            <LiveSchedule />
            <div className="card p-6">
              <h3 className="font-display font-extrabold">Online visitor</h3>
              <ol className="list-decimal pl-6 text-sm leading-7 text-slate-600 mt-2">
                <li>Click “I’m connecting for the first time”</li>
                <li>Receive a welcome</li>
                <li>Submit prayer / follow-up</li>
                <li>Connect with a cell & attend physically</li>
              </ol>
              <a href="/contact" className="btn btn--navy mt-4 w-full justify-center">I’m Connecting First Time</a>
            </div>
            <div className="card p-6">
              <h3 className="font-display font-extrabold">Engage during service</h3>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <a href="/prayer" className="btn btn--ghost justify-center">Prayer Request</a>
                <a href="/testimonies" className="btn btn--ghost justify-center">Testimony</a>
                <a href="/give" className="btn btn--ghost justify-center">Giving</a>
                <a href="/media" className="btn btn--ghost justify-center">Sermon Notes</a>
              </div>
            </div>
            <div className="card p-6 bg-gold/10 border-gold/20">
              <h4 className="font-display font-bold">Testimony</h4>
              <p className="text-sm text-slate-700 mt-1">“Through LoveWorld TV I was healed watching Healing Streams — Praise God!” — Mercy, Port Harcourt</p>
              <div className="text-xs text-muted mt-2">Via <a href="https://healingstreams.tv" target="_blank" rel="noreferrer" className="underline">healingstreams.tv</a></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
