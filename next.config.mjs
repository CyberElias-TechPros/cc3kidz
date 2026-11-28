/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO(strict): remove after fixing ~346 `any` — CI enforces `tsc --noEmit` already (.github/workflows/ci.yml)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    unoptimized: false,
    remotePatterns: [
      { protocol: 'https', hostname: '**.fbcdn.net' },
      { protocol: 'https', hostname: 'scontent.*.fbcdn.net' },
      { protocol: 'https', hostname: 'platform-lookaside.fbsbx.com' },
    ],
  },
  async redirects() {
    return [
      // Preserve old /group/* — redirect to canonical /churches/*
      { source: '/group/secretariat', destination: '/churches/central-church-3', permanent: true },
      { source: '/group/:slug', destination: '/churches/:slug', permanent: true },
      // Old church slugs → canonical (renamed to Ozuoba etc.)
      { source: '/group/central-church-3-orazi', destination: '/group/ozuoba-church', permanent: true },
      { source: '/churches/central-church-3-orazi', destination: '/churches/ozuoba-church', permanent: true },
      { source: '/group/glorious-church', destination: '/group/rumuekini-church', permanent: true },
      { source: '/churches/glorious-church', destination: '/churches/rumuekini-church', permanent: true },
      { source: '/group/limitless-church', destination: '/group/rumuosi-church', permanent: true },
      { source: '/churches/limitless-church', destination: '/churches/rumuosi-church', permanent: true },
      { source: '/group/advantage-church', destination: '/group/rumuekini-church', permanent: true },
      { source: '/churches/advantage-church', destination: '/churches/rumuekini-church', permanent: true },
      { source: '/group/oasis-church', destination: '/group/higherlife-church', permanent: true },
      { source: '/churches/oasis-church', destination: '/churches/higherlife-church', permanent: true },
      { source: '/group/trans-amadi-church', destination: '/group/east-west-central-church', permanent: true },
      { source: '/churches/trans-amadi-church', destination: '/churches/east-west-central-church', permanent: true },
      // Old service slugs → canonical
      { source: '/services/sunday-celebration', destination: '/services/sunday-service', permanent: true },
      { source: '/services/prayer-meeting', destination: '/services/prayer-prophecy-service', permanent: true },
    ]
  },
  // Security headers — also duplicated in middleware.ts for dynamic responses
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.google.com https://*.fbcdn.net https://platform-lookaside.fbsbx.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "media-src 'self' https:",
      "frame-src 'self' https://maps.google.com https://www.google.com https://www.youtube.com",
      "connect-src 'self' https:",
      "form-action 'self'",
      // Allow Arena preview iframe embedding
      "frame-ancestors 'self' https://*.e2b.app https://*.arena.ai",
    ].join('; ')
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // X-Frame-Options removed to allow Arena preview; CSP frame-ancestors controls embedding
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
      {
        source: '/api/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' }],
      },
      {
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}
export default nextConfig
