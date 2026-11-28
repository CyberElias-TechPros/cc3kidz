// Minimal service worker — cache-first for assets, network-first for pages/API no-cache.
// Registers only if user visits with consent; no push yet.
self.addEventListener('install', (e) => { self.skipWaiting() })
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()) })
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)
  if (url.pathname.startsWith('/api/')) return // never cache API
  // let browser handle navigation; this is placeholder for future offline shell
})
