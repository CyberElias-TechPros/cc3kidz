import { YouthSubNav } from '@/components/ministry/TeensSubNav'
import { MinistryFamilyBar } from '@/components/ministry/MinistryFamilyBar'
import { MasterclassProvider } from '@/components/effects/MasterclassProvider'
import FloatingHelpButton from '@/components/FloatingHelpButton'

export default function YouthLayout({ children }: { children: React.ReactNode }) {
  return (
    <MasterclassProvider>
      <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <MinistryFamilyBar current="/youth" />
      <YouthSubNav />
      <main>{children}</main>
      <FloatingHelpButton />
      </>
    </MasterclassProvider>
  )
}
