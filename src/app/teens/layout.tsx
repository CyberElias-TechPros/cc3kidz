import { TeensSubNav } from '@/components/ministry/TeensSubNav'
import { MinistryFamilyBar } from '@/components/ministry/MinistryFamilyBar'

export default function TeensLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MinistryFamilyBar current="/teens" />
      <TeensSubNav />
      <main>{children}</main>
    </>
  )
}
