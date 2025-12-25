// sw.js
const CACHE_NAME = 'mirai-cache-v2';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/chat',
  '/chat.html',
  'https://cdn.jsdelivr.net/gh/Allwaysever/MirAI@main/Assets/HTML/MirAIStyle.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

// ========== 1. OFFLINE SUPPORT (Ditingkatkan) ==========
// Install event - precache assets saat install
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching app shell');
        return cache.addAll(PRECACHE_ASSETS)
          .catch(error => {
            console.error('Failed to cache some assets:', error);
          });
      })
      .then(() => {
        console.log('Service Worker: Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Fetch event - handle offline requests
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension requests
  if (event.request.url.startsWith('chrome-extension://')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return cached response
        if (response) {
          console.log('Service Worker: Serving from cache:', event.request.url);
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then(response => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Cache the new response
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
                console.log('Service Worker: Caching new resource:', event.request.url);
              })
              .catch(error => {
                console.error('Service Worker: Failed to cache:', error);
              });
            
            return response;
          })
          .catch(async error => {
            console.log('Service Worker: Fetch failed; returning offline page:', error);
            
            // If request is for HTML page, return offline page
            if (event.request.headers.get('accept')?.includes('text/html')) {
              return caches.match('/offline.html')
                .then(offlineResponse => offlineResponse || caches.match('/index.html'));
            }
            
            // For other file types, return appropriate fallback
            const url = new URL(event.request.url);
            if (url.pathname.endsWith('.css')) {
              return new Response('/* Offline fallback for CSS */', {
                headers: { 'Content-Type': 'text/css' }
              });
            }
            
            if (url.pathname.endsWith('.js')) {
              return new Response('// Offline fallback for JS', {
                headers: { 'Content-Type': 'application/javascript' }
              });
            }
            
            // Generic fallback
            return new Response('Offline - No internet connection', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// ========== 2. BACKGROUND SYNC ==========
// Listen for sync events
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync triggered:', event.tag);
  
  if (event.tag === 'sync-messages') {
    event.waitUntil(syncMessages());
  } else if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

// Function to sync messages when online
async function syncMessages() {
  try {
    console.log('Service Worker: Syncing messages...');
    // Get pending messages from IndexedDB
    const pendingMessages = await getPendingMessages();
    
    for (const message of pendingMessages) {
      await sendMessageToServer(message);
      await removePendingMessage(message.id);
    }
    
    console.log('Service Worker: Messages synced successfully');
  } catch (error) {
    console.error('Service Worker: Failed to sync messages:', error);
    throw error; // Will retry on next sync
  }
}

// Function to sync other data
async function syncData() {
  console.log('Service Worker: Syncing general data...');
  // Implement your data sync logic here
}

// Helper functions for Background Sync
async function getPendingMessages() {
  // This would typically use IndexedDB
  // For demo, returning empty array
  return [];
}

async function sendMessageToServer(message) {
  // Implement API call to send message
  console.log('Service Worker: Sending message:', message);
  return Promise.resolve();
}

async function removePendingMessage(id) {
  // Remove from IndexedDB
  console.log('Service Worker: Removing pending message:', id);
}

// ========== 3. PERIODIC SYNC ==========
// Listen for periodic sync events
self.addEventListener('periodicsync', event => {
  console.log('Service Worker: Periodic sync triggered:', event.tag);
  
  if (event.tag === 'update-content') {
    event.waitUntil(updateContent());
  } else if (event.tag === 'refresh-cache') {
    event.waitUntil(refreshCache());
  }
});

// Update content periodically
async function updateContent() {
  try {
    console.log('Service Worker: Periodic content update started');
    
    // Check for new content
    const response = await fetch('/api/latest-content', {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      await updateCachedContent(data);
      console.log('Service Worker: Content updated successfully');
      
      // Show notification if new content available
      if (data.hasNewContent) {
        await self.registration.showNotification('New Content Available', {
          body: 'Check out the latest updates!',
          icon: '/icon-192x192.png',
          badge: '/badge-72x72.png'
        });
      }
    }
  } catch (error) {
    console.error('Service Worker: Periodic sync failed:', error);
  }
}

// Refresh cache periodically
async function refreshCache() {
  try {
    console.log('Service Worker: Refreshing cache...');
    
    // Open cache
    const cache = await caches.open(CACHE_NAME);
    
    // Check each cached item
    const requests = await cache.keys();
    
    for (const request of requests) {
      try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
          await cache.put(request, networkResponse.clone());
          console.log('Service Worker: Updated cache for:', request.url);
        }
      } catch (error) {
        console.warn('Service Worker: Failed to refresh:', request.url, error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Cache refresh failed:', error);
  }
}

// Update cached content
async function updateCachedContent(data) {
  // Implement logic to update cache with new content
  const cache = await caches.open(CACHE_NAME);
  // Update specific resources based on data
}

// ========== ACTIVATE EVENT ==========
// Clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('Service Worker: Claiming clients');
      return self.clients.claim();
    })
  );
});

// ========== PUSH NOTIFICATIONS (Bonus) ==========
self.addEventListener('push', event => {
  console.log('Service Worker: Push received');
  
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'New Notification';
  const options = {
    body: data.body || 'You have a new message',
    icon: data.icon || '/icon-192x192.png',
    badge: '/badge-72x72.png',
    data: data.url || '/'
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        // If a window is already open, focus it
        for (const client of clientList) {
          if (client.url === event.notification.data && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Otherwise open a new window
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data);
        }
      })
  );
});
