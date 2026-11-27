import FloatingHelpButton from '@/components/FloatingHelpButton'

export default function YouthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <FloatingHelpButton />
    </>
  )
}
