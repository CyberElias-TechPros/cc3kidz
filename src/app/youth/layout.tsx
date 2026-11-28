import FloatingHelpButton from '@/components/FloatingHelpButton'

export default function YouthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* P0 fix: youth.css specifies 'DM Serif Display' but it was never loaded —
          every editorial headline silently rendered in Georgia. Load it (runtime link,
          same pattern as kids layout; next/font/google is unavailable in this sandbox). */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <main>{children}</main>
      <FloatingHelpButton />
    </>
  )
}
