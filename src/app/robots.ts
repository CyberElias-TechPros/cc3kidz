export default function robots() {
  const base = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://cecentralchurch3.org'
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin','/member','/api'] },
    sitemap: `${base}/sitemap.xml`
  }
}
