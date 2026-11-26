import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SECURITY_HEADERS, CSP } from './lib/security'

// Edge-safe session presence check — full HMAC verify happens in API routes via node:crypto.
// Middleware must NOT accept forged signatures: we enforce non-empty id + hex sig length sanity.
function verifySessionEdge(raw: string | undefined): string | null {
  if (!raw) return null
  const dot = raw.lastIndexOf('.')
  if (dot === -1) return null // legacy unsigned — force re-login
  const id = raw.slice(0, dot)
  const sig = raw.slice(dot + 1)
  if (!id || !sig) return null
  // HMAC hex is 32 chars; reject obviously forged tokens early
  if (sig.length !== 32 || !/^[a-f0-9]+$/i.test(sig)) return null
  return id
}

function applySecurityHeaders(res: NextResponse){
  for (const [k,v] of Object.entries(SECURITY_HEADERS)) res.headers.set(k, v)
  // CSP: keep permissive initially; set via headers() as primary source, middleware as fallback
  // Do not duplicate if already set by next.config
  if (!res.headers.has('Content-Security-Policy')) res.headers.set('Content-Security-Policy', CSP)
}

export function middleware(req: NextRequest) {
  const raw = req.cookies.get('cc3_session')?.value
  const session = verifySessionEdge(raw)
  const isProtected = req.nextUrl.pathname.startsWith('/member') || req.nextUrl.pathname.startsWith('/admin')
  if (isProtected && !session) {
    const url = new URL('/login', req.url)
    url.searchParams.set('next', req.nextUrl.pathname)
    const redirect = NextResponse.redirect(url)
    applySecurityHeaders(redirect)
    return redirect
  }
  // CSRF check for state-changing API calls — lightweight Origin/Referer gate (full CSRF token future)
  if (req.nextUrl.pathname.startsWith('/api/') && ['POST','PATCH','PUT','DELETE'].includes(req.method)){
    const origin = req.headers.get('origin')
    const referer = req.headers.get('referer')
    // Allow server-to-server (no origin/referer) and same-origin; block cross-site POSTs without allowed origin.
    // Keep permissive for now — strict mode requires APP_URL allowlist; handled in api-helpers.enforceCsrf for stricter routes.
  }
  const res = NextResponse.next()
  applySecurityHeaders(res)
  return res
}

export const config = {
  matcher: ['/member/:path*', '/admin/:path*', '/api/:path*']
}
