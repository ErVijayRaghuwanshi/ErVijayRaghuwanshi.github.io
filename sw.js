const CACHE_NAME = "portfolio-cache-v7";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/script.js",
  "/styles.css",
  "/favicon.ico",
  "/assets/profile.jpeg",
  "/assets/Vijay_Raghuwanshi_Resume.pdf",
  "/assets/screenshots/desktop.png",
  "/icons/icon-48x48.png",
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-144x144.png",
  "/icons/icon-152x152.png",
  "/icons/icon-192x192.png",
  "/icons/icon-256x256.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png",
  // Localized LeetCode Badges
  "/assets/leetcode/badge-background.png",
  "/assets/leetcode/Introduction_to_Pandas.gif",
  "/assets/leetcode/25100.gif",
  "/assets/leetcode/2550.gif",
  "/assets/leetcode/Top_SQL_50.gif",
  // Cache core CDN resources statically for absolute offline capability
  "https://cdn.tailwindcss.com",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
  "https://unpkg.com/aos@next/dist/aos.css",
  "https://unpkg.com/aos@next/dist/aos.js",
  "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
];

// Install → cache assets
self.addEventListener("install", event => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching static assets...");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // activate immediately
});

self.addEventListener("message", event => {
  if (event.data && event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});

// Activate → remove old caches
self.addEventListener("activate", event => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Removing old cache:", key);
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
        // Validate response before caching (cache success status and exclude opaque errors)
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === "error") {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Handle fetch errors silently
      });
    })
  );
});


