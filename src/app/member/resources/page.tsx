export default function SavedResources() {
  return (
    <div className="card p-6">
      <h2 className="font-display font-extrabold text-xl">Saved Resources</h2>
      <p className="text-sm text-muted">Your library — Bible study, prayer, evangelism, spiritual growth. Heart to save from Resources.</p>
      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        {['Prayer Guide — May', 'Faith That Prevails — notes', 'Cell Evangelism Toolkit'].map(r => (
          <div key={r} className="rounded-xl border border-black/10 p-4 text-sm">
            {r}
          </div>
        ))}
      </div>
    </div>
  )
}
