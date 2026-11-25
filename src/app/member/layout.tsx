import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionCookie } from '@/lib/session'
import { getUsers } from '@/lib/auth'
import MemberShell from '@/components/MemberShell'

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const raw = (await cookies()).get('cc3_session')?.value || null
  const sid = raw ? verifySessionCookie(raw) : null
  const user = sid ? getUsers().find(u => u.id === sid) : null
  if (!user) redirect('/login?next=/member')
  return <MemberShell user={user}>{children}</MemberShell>
}
