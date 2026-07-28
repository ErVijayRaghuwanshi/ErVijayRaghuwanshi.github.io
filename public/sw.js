const CACHE_NAME = "portfolio-react-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico"
];

// Install → cache basic shell
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener("message", event => {
  if (event.data && event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});

// Activate → remove old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch → network-first for HTML, cache-first with dynamic caching for other resources
self.addEventListener("fetch", event => {
  // Navigation requests (HTML pages) -> Network-First, fallback to cached index.html
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/index.html"))
    );
    return;
  }

  // Bypass caching for analytics/dynamic APIs (LeetCode, GitHub commits, non-GET requests)
  if (
    event.request.method !== "GET" ||
    event.request.url.includes("leetcode-stats-api") ||
    event.request.url.includes("api.github.com")
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Caching Strategy: Cache-First with Dynamic Caching
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === "error") {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Fail silently
      });
    })
  );
});
