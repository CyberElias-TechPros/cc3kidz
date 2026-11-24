import { YouthSubNav } from '@/components/ministry/TeensSubNav'
import { MinistryFamilyBar } from '@/components/ministry/MinistryFamilyBar'

export default function YouthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MinistryFamilyBar current="/youth" />
      <YouthSubNav />
      <main>{children}</main>
    </>
  )
}
