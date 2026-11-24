import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const session = req.cookies.get('cc3_session')?.value
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
