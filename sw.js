const CACHE_NAME = "portfolio-cache-v3"; // Bumped version
const urlsToCache = [
  "/",
  "/index.html", 
  "/manifest.json", 
  "/sw.js",
  "/script.js", 
  "/style.css",
  "/assets/profile.jpeg",
  "/assets/Vijay_Raghuwanshi_Resume.pdf",
  "/assets/screenshots/desktop.png",
  "/assets/icon-32x32.png", 
  "/assets/icon-48x48.png",
  "/assets/icon-72x72.png",
  "/assets/icon-96x96.png", 
  "/assets/icon-144x144.png",
  "/assets/icon-152x152.png",
  "/assets/icon-128x128.png",
  "/assets/icon-192x192.png",
];

// Install → cache assets
self.addEventListener("install", event => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // activate immediately
});

self.addEventListener("message", event => {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});


// Activate → remove old caches
self.addEventListener("activate", event => {
  console.log("Service Worker activating...");
  event.waitUntil(
    self.clients.claim().then(() => {
      return self.clients.matchAll({ type: "window" }).then(clients => {
        clients.forEach(client => client.navigate(client.url));
      });
    }),
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  return self.clients.claim();
});

// Fetch → network-first for HTML, cache-first for others
// Update the fetch listener fallback path as well
self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/index.html")) // Removed prefix here
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(res => res || fetch(event.request))
    );
  }
});

