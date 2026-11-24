import cc3Photos from '@/data/cc3Photos.json';

// Client-safe? use as server component with plain img src (external with unoptimized/remotePatterns).
export default function Cc3FacebookGallery() {
  const gallery = cc3Photos.filter((p: any) => p.type === 'service');
  const covers = cc3Photos.filter((p: any) => p.type !== 'service');
  return (
    <>
      {covers.length > 0 && (
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {covers.map((p: any) => (
            <a key={p.id} href={p.source} target="_blank" rel="noreferrer" className="card overflow-hidden block group">
              <div className="relative h-48 sm:h-56 bg-sand overflow-hidden">
                <img src={p.url} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.02] transition" referrerPolicy="no-referrer" />
              </div>
              <div className="p-4">
                <div className="text-xs font-bold tracking-widest uppercase text-gold">{p.category}</div>
                <div className="font-display font-extrabold leading-tight mt-1">{p.title}</div>
                <div className="text-xs text-muted mt-1">Source: fb.com/cc3phzone3</div>
              </div>
            </a>
          ))}
        </div>
      )}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {gallery.map((p: any) => (
          <a key={p.id} href={p.source} target="_blank" rel="noreferrer" className="card overflow-hidden block group">
            <div className="relative h-56 bg-sand overflow-hidden">
              <img src={p.url} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.02] transition" referrerPolicy="no-referrer" />
            </div>
            <div className="p-5">
              <div className="text-xs font-bold tracking-widest uppercase text-gold">{p.category}</div>
              <h3 className="font-display font-extrabold leading-tight mt-1">{p.title}</h3>
              <div className="text-xs text-muted mt-2">CC3 Group · PH Zone 3 · via Facebook</div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
