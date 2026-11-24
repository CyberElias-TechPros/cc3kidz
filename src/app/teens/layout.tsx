import { TeensSubNav } from '@/components/ministry/TeensSubNav'
import { MinistryFamilyBar } from '@/components/ministry/MinistryFamilyBar'

export default function TeensLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <MinistryFamilyBar current="/teens" />
      <TeensSubNav />
      <main>{children}</main>
    </>
  )
}
