function safeBase(){
  const raw = (process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://cecentralchurch3.org').trim()
  try { new URL(raw); return raw } catch { return 'https://cecentralchurch3.org' }
}
export default function robots() {
  const base = safeBase()
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin','/member','/api'] },
    sitemap: `${base}/sitemap.xml`
  }
}
