import Link from 'next/link'
export default function NotFound(){
  return (
    <section className="section"><div className="container-cc max-w-xl mx-auto card p-8 text-center">
      <div className="h-12 w-12 rounded-full bg-navy text-white grid place-items-center mx-auto">?</div>
      <h1 className="font-display font-black text-xl mt-3">Page not found</h1>
      <p className="text-sm text-muted mt-2">We couldn’t find that page — try search or head home.</p>
      <div className="mt-4 flex gap-2 justify-center"><Link href="/" className="btn btn--navy">Home</Link><Link href="/search" className="btn btn--ghost">Search</Link></div>
    </div></section>
  )
}
