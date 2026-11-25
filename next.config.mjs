/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // Allow preview iframe — do not set X-Frame-Options here; handle per-route if needed
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ]
  },
}
export default nextConfig
