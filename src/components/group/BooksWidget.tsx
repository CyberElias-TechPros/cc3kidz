const BOOKS = [
  { title: 'The Power of Your Mind', price: '$13.99', espees: '12 Espees', cat: 'Christian Life', img: '📘' },
  { title: 'How To Pray Effectively', price: '$9.99', espees: '9 Espees', cat: 'Prayer', img: '🙏' },
  { title: 'Rhapsody Study Bible', price: '$24.99', espees: '20 Espees', cat: 'Bible', img: '📖' },
  { title: 'None Of These Diseases', price: '$11.99', espees: '10 Espees', cat: 'Healing', img: '✦' },
  { title: 'Kiddies: Jesus Loves Me', price: '$7.99', espees: '6 Espees', cat: 'Kiddies', img: '🧒' },
]

export function BooksWidget() {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-extrabold">Loveworld Books · eLibrary</h3>
        <a href="https://loveworldbooks.org" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold underline">Visit Store →</a>
      </div>
      <div className="mt-1 text-xs text-muted">Affiliate showcase — purchases support LoveWorld mission. eLibrary: 2 Espees/mo unlimited reading.</div>
      <div className="mt-4 grid sm:grid-cols-3 md:grid-cols-5 gap-3">
        {BOOKS.map(b => (
          <a key={b.title} href="https://loveworldbooks.org" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-black/10 bg-white p-3 hover:shadow-card transition">
            <div className="h-20 grid place-items-center rounded-lg bg-sand text-2xl">{b.img}</div>
            <div className="text-xs font-bold tracking-widest uppercase text-gold mt-2">{b.cat}</div>
            <div className="font-semibold text-sm leading-tight line-clamp-2">{b.title}</div>
            <div className="mt-1 flex items-center gap-2 text-xs"><span className="font-bold text-navy">{b.price}</span><span className="rounded-full bg-gold/15 px-2 py-0.5">{b.espees}</span></div>
          </a>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <a href="https://loveworldbooks.org" target="_blank" className="btn btn--gold">Browse Books</a>
        <a href="https://loveworldbooks.org" target="_blank" className="btn btn--ghost">eLibrary 2 Espees/mo</a>
        <a href="/kids" className="btn btn--ghost hidden sm:inline-flex">Kiddies →</a>
      </div>
    </div>
  )
}
