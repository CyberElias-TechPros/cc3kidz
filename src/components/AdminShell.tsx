'use client'
import AdminNav from '@/components/AdminNav'
export default function AdminShell({ children, user }: { children: React.ReactNode; user: any }) {
  return (
    <section className="section">
      <div className="container-cc grid lg:grid-cols-[240px_1fr] gap-6">
        <AdminNav />
        <div>
          <div className="hidden lg:flex justify-end text-xs text-muted mb-3">
            Signed in as <span className="font-semibold text-navy ml-1">{user.name}</span> · {user.role}
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
