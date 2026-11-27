import './kids-style.css'
import './kids-components.css'
import './kids-animations.css'
import './kids-responsive.css'
import KidsNav from './KidsNav'
import KidsFooter from './KidsFooter'
import FloatingHelpButton from '@/components/FloatingHelpButton'

export const metadata = {
  title: "CE Central Church 3 Children's Church | Christ Embassy Central Church 3",
}

export default function KidsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="kids-scope">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <KidsNav />
      <main id="main">{children}</main>
      <KidsFooter />
      <FloatingHelpButton />
    </div>
  )
}
