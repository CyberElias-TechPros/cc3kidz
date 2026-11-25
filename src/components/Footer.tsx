import Link from 'next/link'
import { site } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-200">
      <div className="container-cc py-12">
        <div className="grid lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img src="/assets/images/loveworld-logo.png?v=2" alt="Christ Embassy LoveWorld" width={56} height={56} className="h-12 w-12 md:h-14 md:w-14 object-contain flex-shrink-0" />
              <div>
                <div className="font-display font-extrabold leading-none">Central Church 3</div>
                <div className="text-xs tracking-widest uppercase text-gold">Port Harcourt Zone 3</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Christ Embassy Central Church 3 — a LoveWorld church family. {site.tagline} We meet at{' '}
              {site.addressShort}.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 grid place-items-center rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 text-white transition-colors"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073C24 5.42 18.627 0 12 0S0 5.42 0 12.073C0 18.1 4.388 23.095 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.49 0-1.955.925-1.955 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.095 24 18.1 24 12.073z" />
                </svg>
              </a>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 grid place-items-center rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 text-white transition-colors"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="6" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={site.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 grid place-items-center rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 text-white transition-colors"
                aria-label="YouTube"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.5 12 20.5 12 20.5s7.505 0 9.376-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12 9.545 15.568z" />
                </svg>
              </a>
              <a href="/kids" className="inline-flex items-center rounded-lg bg-gold text-navy px-3 text-xs font-bold">
                Kids
              </a>
              <a href="/teens" className="inline-flex items-center rounded-lg bg-white text-navy px-3 text-xs font-bold">
                Teens
              </a>
              <a href="/youth" className="inline-flex items-center rounded-lg bg-white text-navy px-3 text-xs font-bold">
                Youth
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold tracking-wide text-sm">Church</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {site.footerLinks.church.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold tracking-wide text-sm">Connect</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {site.footerLinks.connect.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold tracking-wide text-sm">Ministry</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {site.footerLinks.ministry.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-semibold text-white">{site.addressShort}</div>
            <div className="text-slate-300">{site.address}</div>
            <div className="text-slate-400 text-xs mt-2">Zonal HQ: <a href="https://cephzone3.org/" target="_blank" rel="noreferrer" className="underline hover:text-white">Jessy & Jenny St, Peter Odili Rd — cephzone3.org ↗</a></div>
          </div>
          <div>
            <div className="font-semibold text-white">Service Times</div>
            <div className="text-slate-300">Sunday 8AM · Monday 6PM Prayer & Prophecy · Wednesday 5:30PM</div>
          </div>
          <div className="md:text-right">
            <div className="font-semibold text-white">Contact</div>
            <div className="text-slate-300 flex flex-col md:items-end gap-1">
              <div className="flex flex-wrap gap-x-2 gap-y-1 md:justify-end">
                {((site as any).phones || [site.phone]).map((p: string) => (
                  <a key={p} href={`tel:${p}`} className="hover:text-white underline underline-offset-4">
                    {p}
                  </a>
                ))}
              </div>
              <a href={`mailto:${site.email}`} className="hover:text-white underline underline-offset-4">
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <p className="text-gold font-bold tracking-[0.18em] uppercase text-[0.68rem]">Believers&apos; LoveWorld Incorporated</p>
          <p className="text-white font-display font-extrabold text-[1.05rem] mt-1 italic">Giving your life a meaning.</p>
          <p className="text-slate-400 text-xs mt-2 max-w-2xl mx-auto leading-5">Taking the divine presence of God to the nations and demonstrating the character of the Spirit. LoveWorld Nation — Every man&apos;s world is our world.</p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400 border-t border-white/10 pt-6">
          <div>© {new Date().getFullYear()} Christ Embassy Central Church 3 · Port Harcourt Zone 3 · LoveWorld Nation — Giving your life a meaning</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
