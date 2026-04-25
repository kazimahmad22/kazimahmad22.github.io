const CACHE_NAME = 'kazim-portfolio-cache-v1.0.2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './main.js',
  'https://cdn.jsdelivr.net/gh/kazimahmad22/kazimahmad22.github.io@main/assets/favicon.png',
  'https://cdn.jsdelivr.net/gh/kazimahmad22/kazimahmad22.github.io@main/assets/profile%20picture.webp',
  'https://cdn.jsdelivr.net/gh/kazimahmad22/kazimahmad22.github.io@main/assets/ICA%20Thailand.webp',
  'https://cdn.jsdelivr.net/gh/kazimahmad22/kazimahmad22.github.io@main/assets/Leads%20Flex.webp',
  'https://cdn.jsdelivr.net/gh/kazimahmad22/kazimahmad22.github.io@main/assets/Melissa%20Washington.webp',
  'https://cdn.jsdelivr.net/gh/kazimahmad22/kazimahmad22.github.io@main/assets/Snow%20Buddy%20Sled%20Dog%20Adventure.webp',
  'https://cdn.jsdelivr.net/gh/kazimahmad22/kazimahmad22.github.io@main/assets/wordpress.svg',
  'https://cdn.jsdelivr.net/gh/kazimahmad22/kazimahmad22.github.io@main/assets/elementor.svg',
  'https://cdn.jsdelivr.net/gh/kazimahmad22/kazimahmad22.github.io@main/assets/figma.svg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
  'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap'
];

// Install Event - Caching basic assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - Cleaning up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch Event - Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests for simplified logic (except specific ones like Google Fonts/CDNs we explicitly cached)
  const isCachable = event.request.url.startsWith(self.location.origin) || 
                     ASSETS_TO_CACHE.some(asset => event.request.url.startsWith(asset));

  if (!isCachable || event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchedResponse = fetch(event.request).then((networkResponse) => {
        // Update cache with the new version
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // Silently fail if network is down
      });

      // Return cached response immediately if available, otherwise wait for network
      return cachedResponse || fetchedResponse;
    })
  );
});
