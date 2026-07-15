/* WebToolkit service worker — caches shell + assets for faster revisits. */
const CACHE_NAME = 'webtoolkit-v1';

const PRECACHE_URLS = [
  './',
  './index.html',
  './assets/css/site.css',
  './assets/js/app.js',
  './assets/js/config.js',
  './assets/js/converters.js',
  './assets/js/transform.worker.js',
  './assets/logo.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await Promise.all(
        PRECACHE_URLS.map(async (path) => {
          const url = new URL(path, self.registration.scope).href;
          try {
            await cache.add(url);
          } catch {
            /* Skip missing optional paths during install. */
          }
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
      await self.clients.claim();
    })(),
  );
});

function isSameOrigin(url) {
  return url.origin === self.location.origin;
}

function isCacheableAsset(url) {
  if (!isSameOrigin(url)) return false;
  const path = url.pathname;
  return (
    path.endsWith('.css') ||
    path.endsWith('.js') ||
    path.endsWith('.png') ||
    path.endsWith('.svg') ||
    path.endsWith('.ico') ||
    path.endsWith('.woff2')
  );
}

function isHtmlRequest(request, url) {
  if (request.mode === 'navigate') return true;
  const accept = request.headers.get('accept') || '';
  return accept.includes('text/html') || url.pathname.endsWith('.html') || url.pathname.endsWith('/');
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    const fallback = await caches.match(new URL('./index.html', self.registration.scope).href);
    if (fallback) return fallback;
    throw new Error('Offline and no cached response');
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (!isSameOrigin(url)) return;

  if (isCacheableAsset(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (isHtmlRequest(request, url)) {
    event.respondWith(networkFirst(request));
  }
});
