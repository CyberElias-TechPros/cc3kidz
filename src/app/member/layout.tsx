import MemberNav from '@/components/MemberNav'

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="section">
      <div className="container-cc grid lg:grid-cols-[220px_1fr] gap-6">
        <MemberNav />
        <div>{children}</div>
      </div>
    </section>
  )
}
