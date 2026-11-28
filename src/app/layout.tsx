import type { Metadata } from 'next'
import './globals.css'
import SiteShell from '@/components/SiteShell'
import { site } from '@/lib/site'
import { ChurchJsonLd } from '@/components/JsonLd'

function safeBase(): string {
  const raw = (process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://cecentralchurch3.org').trim()
  try { new URL(raw); return raw } catch { return 'https://cecentralchurch3.org' }
}
const BASE = safeBase()

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`
  },
  description: site.description,
  metadataBase: new URL(BASE),
  openGraph: {
    title: site.name,
    description: site.description,
    type: 'website',
    url: BASE,
    siteName: site.name,
    images: [{ url: '/assets/images/cc3/service-congregation.jpg', width: 1200, height: 630, alt: site.name }]
  },
  twitter: { card: 'summary_large_image', title: site.name, description: site.description, images: ['/assets/images/cc3/service-congregation.jpg'] },
  icons: { icon: '/assets/images/loveworld-logo.png?v=2' },
  alternates: { canonical: BASE },
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
        <ChurchJsonLd />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
