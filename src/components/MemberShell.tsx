'use client'
import MemberNav from '@/components/MemberNav'
export default function MemberShell({ children, user }: { children: React.ReactNode; user: any }) {
  return (
    <section className="section">
      <div className="container-cc grid lg:grid-cols-[220px_1fr] gap-6">
        <MemberNav />
        <div>
          <div className="hidden lg:flex justify-end text-xs text-muted mb-3">
            Welcome, <span className="font-semibold text-navy ml-1">{user.name}</span>
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
