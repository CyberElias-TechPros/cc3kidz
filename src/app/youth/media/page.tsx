import Link from 'next/link'
export const metadata = { title: 'Media — CC3 Youth | Sermons, Podcasts, Articles & Video' }
export default function YouthMediaPage(){
  return (<>
    <section className="bg-haze border-b border-black/5"><div className="container-cc py-10"><div className="flex gap-4 max-w-4xl"><div className="hidden sm:block w-[3px] self-stretch rounded-full bg-navy" aria-hidden /><div><div className="text-xs font-semibold tracking-wide text-muted">Media · Teachings · Stories</div><h1 className="font-display font-extrabold text-[2.4rem] leading-none tracking-tight mt-2 text-navy">Media</h1><p className="mt-3 text-[1.02rem] leading-7 text-slate-600 max-w-2xl">Sermons, podcasts, articles, interviews, testimonies & video series — searchable, shareable, life-giving.</p></div></div></div></section>
    <section className="section bg-white"><div className="container-cc">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {t:'Sermons & Teachings', d:'Sunday & conference messages — video & audio.', h:'/media'},
          {t:'Podcasts', d:'On-the-go growth — audio series (coming soon).', h:'/media'},
          {t:'Articles', d:'Short articles — purpose, faith, career, relationships.', h:'/resources'},
          {t:'Interviews', d:'Young adults sharing journey, challenges, victories.', h:'/testimonies'},
          {t:'Testimonies', d:'Salvation, growth, evangelism, career — moderated, permissioned.', h:'/testimonies'},
          {t:'Video Series', d:'Growth pathways, YOU R.I.S.E. highlights, creative showcases.', h:'/media'},
        ].map(c=>(
          <Link key={c.t} href={c.h} className="card p-5 hover:border-gold/30 transition"><div className="text-sm font-extrabold text-navy">{c.t}</div><div className="text-sm leading-6 text-slate-600 mt-1">{c.d}</div><div className="text-xs font-bold text-gold mt-3">Open →</div></Link>
        ))}
      </div>
      <div className="mt-8 card p-6"><h3 className="font-display font-extrabold text-navy">Creators Connect — Your Creativity Matters</h3><p className="text-sm leading-6 text-slate-600 mt-2">Film, photo, design, writing, animation, tech, audio, strategy — via the global <a href="https://ministryofteensandyouth.org/what-we-do/" target="_blank" rel="noreferrer" className="underline text-navy">Creators Connect</a> vision. Local showcase of approved youth-created work.</p><div className="mt-4 flex gap-2"><Link href="/youth/connect" className="btn btn--navy !py-2 text-xs">Submit Work (Moderated)</Link><a href="https://ministryofteensandyouth.org" target="_blank" rel="noreferrer" className="btn btn--ghost !py-2 text-xs">Global Portal →</a></div></div>
    </div></section>
  </>)
}
