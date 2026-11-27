import FloatingHelpButton from '@/components/FloatingHelpButton'

export default function TeensLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <FloatingHelpButton />
    </>
  )
}
