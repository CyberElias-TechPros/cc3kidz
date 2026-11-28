'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const links = [
  { href: '/member', label: 'Dashboard' },
  { href: '/member/profile', label: 'Profile' },
  { href: '/member/cells', label: 'Cells' },
  { href: '/member/departments', label: 'Departments' },
  { href: '/member/events', label: 'My Events' },
  { href: '/member/foundation', label: 'Foundation School' },
  { href: '/member/resources', label: 'Resources' },
  { href: '/member/calendar', label: 'Calendar' },
  { href: '/member/notifications', label: 'Notifications' },
  { href: '/member/directory', label: 'Directory' }
]

export default function MemberNav() {
  const pathname = usePathname()
  const router = useRouter()
  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }
  return (
    <div className="card p-4">
      <div className="font-display font-extrabold">Member</div>
      <nav className="mt-3 space-y-1">
        {links.map(l => {
          const active = pathname === l.href
          return (
            <Link key={l.href} href={l.href} className={`block rounded-xl px-3 py-2 text-sm ${active ? 'bg-navy text-white' : 'hover:bg-black/5'}`}>
              {l.label}
            </Link>
          )
        })}
      </nav>
      <button onClick={logout} className="mt-4 btn btn--ghost w-full justify-center">
        Sign Out
      </button>
      <Link href="/admin" className="mt-2 block text-xs text-center text-muted underline">
        Admin (if permitted)
      </Link>
    </div>
  )
}
