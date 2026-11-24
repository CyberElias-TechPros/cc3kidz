'use client'
export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: ()=>void }){
  return (
    <section className="section"><div className="container-cc max-w-xl mx-auto card p-8 text-center">
      <div className="h-12 w-12 rounded-full bg-red-500 text-white grid place-items-center mx-auto">!</div>
      <h1 className="font-display font-black text-xl mt-3">Something went wrong</h1>
      <p className="text-sm text-muted mt-2">{error.message || 'Unexpected error — try again.'}</p>
      <div className="mt-4 flex gap-2 justify-center">
        <button onClick={()=>reset()} className="btn btn--navy">Try again</button>
        <a href="/" className="btn btn--ghost">Home</a>
      </div>
      <div className="mt-3 text-xs text-muted">If this persists, contact church office. Error logged.</div>
    </div></section>
  )
}
