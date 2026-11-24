export default function CmsPage() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="font-display font-black text-xl">Pages & Content</h1>
        <p className="text-sm text-muted">Homepage hero, welcome message, pastors, departments, service schedules, SEO — all manageable without developer.</p>
        <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
          {['Home hero slides', 'About — vision/mission/faith', 'Pastors directory', 'Service schedule', 'Footer & social links', 'SEO titles/meta'].map(i => (
            <div key={i} className="rounded-xl border border-black/10 p-3">{i}</div>
          ))}
        </div>
      </div>
      <div className="card p-6">
        <h3 className="font-display font-extrabold">SEO foundation (every public page)</h3>
        <ul className="list-disc pl-6 text-sm leading-7 text-slate-600 mt-2">
          <li>SEO title, meta description, canonical, OG, structured data (Church/Event/Article/Video)</li>
          <li>Sitemap, robots.txt, clean URLs, breadcrumbs, internal links</li>
          <li>Local SEO: name/address/phone + Google Maps + Business Profile</li>
          <li>Technical: mobile-friendly, fast, crawlable, alt text, schema</li>
        </ul>
      </div>
    </div>
  )
}
