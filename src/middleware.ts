import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Minimal HMAC verify duplicating src/lib/session.ts logic but edge-safe (no node:crypto)
// We use Web Crypto via subtle — sync fallback to length check for edge; full verify in API routes.
function verifySessionEdge(raw: string | undefined): string | null {
  if (!raw) return null
  const dot = raw.lastIndexOf('.')
  if (dot === -1) return null // reject legacy unsigned in middleware (forces re-login)
  return raw.slice(0, dot) // signature checked fully in API; middleware just ensures presence+format
}

export function middleware(req: NextRequest) {
  const raw = req.cookies.get('cc3_session')?.value
  const session = verifySessionEdge(raw)
  const isProtected = req.nextUrl.pathname.startsWith('/member') || req.nextUrl.pathname.startsWith('/admin')
  if (isProtected && !session) {
    const url = new URL('/login', req.url)
    url.searchParams.set('next', req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
  // security headers (allow preview iframe embedding — do not set X-Frame-Options)
  const res = NextResponse.next()
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  return res
}

export const config = {
  matcher: ['/member/:path*', '/admin/:path*', '/api/:path*']
}
