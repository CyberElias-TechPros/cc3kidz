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
        {/* Church Main — Plus Jakarta Sans: bolder, rounded, official — 500 body / 700-800 headings */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500;1,700&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{--font-display:'Plus Jakarta Sans',system-ui,sans-serif;--font-text:'Plus Jakarta Sans',system-ui,sans-serif;--font-sans:'Plus Jakarta Sans',system-ui,sans-serif}`
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
