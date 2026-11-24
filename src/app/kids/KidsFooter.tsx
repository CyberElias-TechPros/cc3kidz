import Link from 'next/link'

export default function KidsFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="/kids">
              <img className="brand__mark" src="/kids/assets/images/logo.svg" alt="" width={46} height={46} />
              <span className="brand__text">
                <span className="brand__name">Christ Embassy Kids</span>
                <span className="brand__sub">Central Church 3 · PH Zone 3</span>
              </span>
            </Link>
            <p>Raising champions for Christ in Port Harcourt — a place where children discover God&apos;s Word, grow in faith and shine.</p>
          </div>
          <div className="footer-col">
            <h3>Explore</h3>
            <ul>
              <li><Link href="/kids/about">About Us</Link></li>
              <li><Link href="/kids/classes">Our Classes</Link></li>
              <li><Link href="/kids/lessons">Bible Lessons</Link></li>
              <li><Link href="/kids/events">Events</Link></li>
              <li><Link href="/kids/gallery">Gallery</Link></li>
              <li><Link href="/kids/kids-corner">Kids Corner</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>For Parents</h3>
            <ul>
              <li><Link href="/kids/parents">Parents&apos; Corner</Link></li>
              <li><Link href="/kids/resources">Resources</Link></li>
              <li><Link href="/kids/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Visit Us</h3>
            <ul className="footer-contact">
              <li><span>Christ Embassy Central Church 3 Group<br />PH Zone 3, Port Harcourt</span></li>
              <li><span>Children&apos;s Church holds on Sundays during the main service</span></li>
              <li><span>30B Rumuokwuta/NTA Road</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Christ Embassy Kids, Central Church 3. All rights reserved.</span>
          <span className="mt-2 flex flex-wrap gap-2 justify-center text-xs"><a href="/teens" className="underline">Teens Church</a> · <a href="/youth" className="underline">Youth Church</a> · <a href="/" className="underline">Main Church</a></span>
          <span>Back to <Link href="/">Main Church</Link></span>
        </div>
      </div>
    </footer>
  )
}
