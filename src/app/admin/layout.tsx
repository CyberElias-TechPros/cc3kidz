'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import AdminNav from '@/components/AdminNav'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth/me').then(r=>r.json()).then(j=>{
      if (!j.user) { router.replace('/login?next='+encodeURIComponent(pathname||'/admin')); return }
      if (!['admin','superadmin'].includes(j.user.role)) {
        router.replace('/member')
        return
      }
      setUser(j.user)
      setLoading(false)
    }).catch(()=>{ router.replace('/login?next='+encodeURIComponent(pathname||'/admin')) })
  }, [pathname, router])

  if (loading) return <section className="section"><div className="container-cc"><div className="card p-8 text-sm text-muted">Checking permissions…</div></div></section>
  if (!user || !['admin','superadmin'].includes(user.role)) return null

  return (
    <section className="section">
      <div className="container-cc grid lg:grid-cols-[240px_1fr] gap-6">
        <AdminNav />
        <div>{children}</div>
      </div>
    </section>
  )
}
