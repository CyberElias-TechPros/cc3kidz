import { TeensSubNav } from '@/components/ministry/TeensSubNav'
import { MinistryFamilyBar } from '@/components/ministry/MinistryFamilyBar'

export default function TeensLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Uses Main Church fonts (Nunito Sans) via root layout — identical feel to Main */}
      <MinistryFamilyBar current="/teens" />
      <TeensSubNav />
      <main>{children}</main>
    </>
  )
}
