import type { Metadata } from 'next'
import './globals.css'
import SiteShell from '@/components/SiteShell'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`
  },
  description: site.description,
  metadataBase: new URL('https://cc3.example.com'),
  openGraph: {
    title: site.name,
    description: site.description,
    type: 'website'
  },
  icons: { icon: '/assets/images/loveworld-logo.png?v=2' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Church Main — Nunito Sans: bold rounded, official + soothing */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,400;6..12,500;6..12,600;6..12,700;6..12,800;6..12,900&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{--font-display:'Nunito Sans',system-ui,sans-serif;--font-text:'Nunito Sans',system-ui,sans-serif;--font-sans:'Nunito Sans',system-ui,sans-serif}`
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
