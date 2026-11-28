import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionCookie } from '@/lib/session'
import { getUsers } from '@/lib/auth'
import AdminShell from '@/components/AdminShell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const raw = (await cookies()).get('cc3_session')?.value || null
  const sid = raw ? verifySessionCookie(raw) : null
  const user = sid ? getUsers().find(u => u.id === sid) : null
  if (!user) redirect('/login?next=/admin')
  if (!['admin','superadmin'].includes(user.role)) redirect('/member')
  return <AdminShell user={user}>{children}</AdminShell>
}
