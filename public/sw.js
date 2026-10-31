const CACHE_NAME = 'precinho-pwa-v1';
const STATIC_ASSETS = [
  '/',
  '/chat',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/maskable-icon-512x512.png',
  '/icons/apple-touch-icon.png',
  '/assets/brand/logo-pague-menos.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[PWA] Pre-caching asset failed (non-blocking):', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key.startsWith('precinho-pwa-') && key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Bypass Service Worker completely for API calls and SSE streams
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/ucp/') ||
    url.pathname.startsWith('/acp/') ||
    request.headers.get('Accept')?.includes('text/event-stream') ||
    request.method !== 'GET'
  ) {
    return;
  }

  // 2. Navigation requests (HTML pages) -> Network first, fallback to cached page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallbackHome = await caches.match('/chat') || await caches.match('/');
          if (fallbackHome) return fallbackHome;
          return new Response(
            `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><title>Precinho Offline</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:system-ui,sans-serif;background:#001A80;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;padding:20px;text-align:center;}h1{margin-bottom:8px;}p{opacity:0.85;}</style></head><body><div><h1>Você está offline</h1><p>Conecte-se à internet para continuar seu atendimento com o Precinho.</p></div></body></html>`,
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
    return;
  }

  // 3. Static assets (images, icons, fonts, CSS/JS bundles) -> Stale-while-revalidate / Cache First
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to update cache for next time
        fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const clone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return networkResponse;
      });
    })
  );
});
