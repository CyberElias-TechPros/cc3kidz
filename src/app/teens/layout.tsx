import { TeensSubNav } from '@/components/ministry/TeensSubNav'
import { MinistryFamilyBar } from '@/components/ministry/MinistryFamilyBar'
import { MasterclassProvider } from '@/components/effects/MasterclassProvider'
import FloatingHelpButton from '@/components/FloatingHelpButton'

export default function TeensLayout({ children }: { children: React.ReactNode }) {
  return (
    <MasterclassProvider>
      <>
      {/* Uses Main Church fonts (Nunito Sans) via root layout — identical feel to Main */}
      <MinistryFamilyBar current="/teens" />
      <TeensSubNav />
      <main>{children}</main>
      <FloatingHelpButton />
      </>
    </MasterclassProvider>
  )
}
