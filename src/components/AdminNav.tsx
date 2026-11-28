'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/cms', label: 'Pages & CMS' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/media', label: 'Media' },
  { href: '/admin/people', label: 'People & Visitors' },
  { href: '/admin/cells', label: 'Cells' },
  { href: '/admin/prayer', label: 'Prayer' },
  { href: '/admin/foundation', label: 'Foundation School' },
  { href: '/admin/volunteers', label: 'Volunteers' },
  { href: '/admin/giving', label: 'Giving' },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/communications', label: 'Communications' },
  { href: '/admin/settings', label: 'Settings & Roles' }
]

export default function AdminNav() {
  const pathname = usePathname()
  return (
    <div className="card p-4 sticky top-[72px]">
      <div className="font-display font-extrabold">Administration</div>
      <div className="text-xs text-muted">Phase 4 operating platform</div>
      <nav className="mt-4 space-y-1">
        {links.map(l => (
          <Link key={l.href} href={l.href} className={`block rounded-xl px-3 py-2 text-sm ${pathname === l.href ? 'bg-navy text-white' : 'hover:bg-black/5'}`}>
            {l.label}
          </Link>
        ))}
      </nav>
      <Link href="/member" className="mt-4 block text-xs text-center text-muted underline">
        Member portal →
      </Link>
    </div>
  )
}
