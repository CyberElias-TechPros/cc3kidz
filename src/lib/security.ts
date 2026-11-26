/**
 * Production security primitives — CSRF/Origin, XSS sanitization, security headers.
 * Middleware runs on edge (no node:crypto); API routes do full HMAC verify via src/lib/session.
 */

const ALLOWED_ORIGINS = (() => {
  const fromEnv = (process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || '').split(',').map(s=>s.trim()).filter(Boolean)
  const defaults = ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://cc3.example.com', 'https://cecentralchurch3.org']
  return new Set([...defaults, ...fromEnv])
})()

export function isOriginAllowed(req: Request): boolean {
  const origin = req.headers.get('origin')
  const referer = req.headers.get('referer')
  // Same-origin POST without Origin header (e.g. direct fetch from same site) is allowed
  if (!origin && !referer) return true
  const check = (url: string | null) => {
    if (!url) return false
    try {
      const u = new URL(url)
      const originStr = `${u.protocol}//${u.host}`
      if (ALLOWED_ORIGINS.has(originStr)) return true
      // allow any subdomain of vercel preview for this app
      if (u.hostname.endsWith('.vercel.app')) return true
      // allow port-based local
      if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') return true
      return false
    } catch { return false }
  }
  // If Origin present, it must be allowed. Referer is fallback hint.
  if (origin) return check(origin)
  if (referer) return check(referer)
  return true
}

export function enforceCsrf(req: Request): Response | null {
  // Apply to state-changing methods for JSON/form APIs
  const method = req.method?.toUpperCase()
  if (!method || !['POST','PUT','PATCH','DELETE'].includes(method)) return null
  // API routes under /api/ should have Origin check; skip for same-origin GETs without Origin
  if (!isOriginAllowed(req)) {
    return Response.json({ ok:false, error:'Forbidden — invalid origin' }, { status:403 })
  }
  return null
}

// Very small HTML-escape for admin tables — prevents reflected XSS if body contains tags.
// For rich content we would use DOMPurify; here we escape on render path and keep raw in store.
// Call this in components that render user content via innerHTML; normal JSX auto-escapes.
export function escapeHtml(s: string): string {
  if (!s) return ''
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')
}

export function stripHtml(s: string, maxLen = 5000): string {
  if (!s) return ''
  // remove tags, decode basic entities, trim
  let out = s.replace(/<[^>]*>/g, '')
  out = out.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"')
  if (out.length > maxLen) out = out.slice(0, maxLen)
  return out.trim()
}

// Security headers applied both in next.config.mjs (static) and middleware (dynamic).
// CSP kept report-only initially; tighten after auditing inline scripts/embeds.
export const SECURITY_HEADERS: Record<string,string> = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-DNS-Prefetch-Control': 'on',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
}

export const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.google.com https://*.fbcdn.net https://platform-lookaside.fbsbx.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: https: blob:",
  "media-src 'self' https:",
  "frame-src 'self' https://maps.google.com https://www.google.com https://www.youtube.com",
  "connect-src 'self' https:",
  "form-action 'self'",
].join('; ')
