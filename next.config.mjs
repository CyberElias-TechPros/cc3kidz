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
