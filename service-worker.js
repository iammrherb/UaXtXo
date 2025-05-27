/**
 * Service Worker for Portnox Total Cost Analyzer
 * Enables offline functionality and performance optimization
 */

const CACHE_NAME = 'portnox-tco-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/ultimate-executive-center.css',
  '/js/views/ultimate-executive-platform.js',
  '/js/data/complete-vendor-data-fixed.js',
  '/js/enhancements/ultimate-chart-system-fixed.js',
  '/js/enhancements/comprehensive-data-enhancement.js',
  '/js/features/ai-insights.js',
  '/js/features/advanced-analytics.js',
  '/js/performance/performance-optimizer.js',
  '/js/features/real-time-collaboration.js',
  '/img/vendors/portnox-logo.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'sync-analysis') {
    event.waitUntil(syncAnalysisData());
  }
});

async function syncAnalysisData() {
  try {
    const response = await fetch('/api/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timestamp: Date.now(),
        data: 'pending_analysis'
      })
    });
    
    if (response.ok) {
      console.log('Analysis data synced successfully');
    }
  } catch (error) {
    console.error('Sync failed:', error);
  }
}
