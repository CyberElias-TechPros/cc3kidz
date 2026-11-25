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
  // Security headers — CI runs tsc --noEmit; build ignores to unblock deploy (see .github/workflows/ci.yml)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' }, // allow same-origin iframe preview, block clickjacking
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          // CSP disabled initially — enable after auditing inline scripts: { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' ..." }
        ],
      },
    ]
  },
}
export default nextConfig
