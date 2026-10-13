const CACHE_NAME = 'learning-os-shell-v1'

async function cacheAppShell() {
  const cache = await caches.open(CACHE_NAME)
  const response = await fetch('/', { cache: 'reload' })
  const rootCopy = response.clone()
  const indexCopy = response.clone()
  const html = await response.text()
  await cache.put('/', rootCopy)
  await cache.put('/index.html', indexCopy)
  const discovered = [...html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)].map(match => match[1])
  await cache.addAll([...new Set(['/manifest.webmanifest', '/icon.svg', '/icon-192.png', '/icon-512.png', ...discovered])])
}

self.addEventListener('install', event => {
  event.waitUntil(cacheAppShell().then(() => self.skipWaiting()))
})

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()))
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()))
    return response
  }).catch(async () => {
    const cached = await caches.match(event.request)
    if (cached) return cached
    if (event.request.mode === 'navigate') return caches.match('/')
    return Response.error()
  }))
})
