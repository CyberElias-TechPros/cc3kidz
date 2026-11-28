import Link from 'next/link'
export const metadata = { title: 'Discover Your Gifts — CC3 Teens | Creative, Music, Media & Leadership' }
export default function TeensGiftsPage(){
  return (<>
    <section className="bg-haze border-b border-black/5"><div className="container-cc py-10"><div className="flex gap-4 max-w-4xl"><div className="hidden sm:block w-[3px] self-stretch rounded-full bg-gold" aria-hidden /><div><div className="text-xs font-semibold tracking-wide text-muted">Gifts · Talents · Service</div><h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2 text-navy">Discover Your Gifts</h1><p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Music, worship, drama, dance, media, tech, design — your gift has a place now, not later. Mentored, supervised, excellent.</p></div></div></div></section>
    <section className="section bg-white"><div className="container-cc">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {t:'Music & Worship', d:'Choir, instruments, leading — psalms & hymns in the Spirit.', i:'♪'},
          {t:'Media & Technology', d:'Livestream, sound, photography, livestream support — be excellent behind the scenes.', i:'◎'},
          {t:'Drama & Performance', d:'Skits, spoken word, storytelling — communicating the Word creatively.', i:'✦'},
          {t:'Dance & Creative Arts', d:'Choreography, creative expression — unto the Lord, with discipline.', i:'⬢'},
          {t:'Design & Digital', d:'Graphics, video, presentation — Creators Connect spirit, local expression.', i:'⬣'},
          {t:'Leadership & Service', d:'Ushering, coordination, outreach teams — responsibility builds character.', i:'◆'},
        ].map(c=>(
          <div key={c.t} className="card p-5"><div className="h-10 w-10 rounded-lg bg-gold/15 grid place-items-center text-gold font-bold">{c.i}</div><div className="text-sm font-extrabold text-navy mt-3">{c.t}</div><div className="text-sm leading-6 text-slate-600 mt-1">{c.d}</div><Link href="/teens/connect" className="mt-3 inline-flex text-xs font-bold text-gold">Express Interest →</Link></div>
        ))}
      </div>
      <div className="mt-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="card p-6"><h3 className="font-display font-extrabold text-navy">How joining works</h3><ol className="mt-3 space-y-2 text-sm leading-6 text-slate-600 list-decimal pl-5"><li>Tell us your interest via <Link href="/teens/connect" className="underline text-navy">enquiry form</Link> — minimal info, moderated.</li><li>Meet a coordinator — supervised intro, no unsupervised pairing.</li><li>Training & scheduling — fitted around school & family.</li><li>Showcase — Talent Showcase, services, outreach & special programmes.</li></ol></div>
        <div className="card p-6 bg-navy text-white"><h3 className="font-display font-extrabold">Talent Showcase</h3><p className="text-sm leading-6 text-white/80 mt-2">Periodic showcases of approved music, drama, art, media and testimonies — parents invited, media published only with consent.</p><Link href="/teens/events" className="mt-4 btn bg-gold text-navy w-full justify-center !py-2 text-xs">Upcoming Showcases</Link></div>
      </div>
    </div></section>
  </>)
}
