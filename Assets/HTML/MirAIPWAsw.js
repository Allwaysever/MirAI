// MirAIPWAsw.js - Service Worker Terpadu untuk MirAI
const CACHE_VERSION = 'mirai-pwa-v4.0';
const OFFLINE_URL = '/offline.html';

// Assets yang akan di-cache saat install
const PRECACHE_ASSETS = [
    '/',
    '/offline.html',
    '/chat',
    '/chat.html',
    '/PWA/offline.html',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
    'https://raw.githubusercontent.com/Allwaysever/MirAI/refs/heads/main/Assets/HI%20new.png',
    'https://raw.githubusercontent.com/Allwaysever/MirAI/refs/heads/main/Assets/Name%20Logo.png',
    'https://raw.githubusercontent.com/Allwaysever/MirAI/refs/heads/main/Assets/Favicon.png'
];

// ========== INSTALL EVENT ==========
self.addEventListener('install', event => {
    console.log('🚀 [SW] Install event triggered');
    
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(cache => {
                console.log('📦 [SW] Caching app shell dan offline page');
                // Cache critical assets terlebih dahulu
                return cache.addAll([
                    OFFLINE_URL,
                    '/',
                    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
                ])
                .then(() => {
                    console.log('✅ [SW] Critical assets cached');
                    // Cache sisanya di background
                    cache.addAll(PRECACHE_ASSETS.filter(url => 
                        !url.includes(OFFLINE_URL) && 
                        url !== '/' &&
                        !url.includes('font-awesome')
                    )).catch(err => {
                        console.log('[SW] Some assets failed to cache:', err);
                    });
                });
            })
            .then(() => {
                console.log('⚡ [SW] Skip waiting untuk immediate activation');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ [SW] Install failed:', error);
            })
    );
});

// ========== ACTIVATE EVENT ==========
self.addEventListener('activate', event => {
    console.log('🎯 [SW] Activate event triggered');
    
    event.waitUntil(
        Promise.all([
            // Hapus cache lama
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_VERSION) {
                            console.log(`🗑️ [SW] Deleting old cache: ${cacheName}`);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            
            // Klaim semua clients
            self.clients.claim()
        ])
        .then(() => {
            console.log('✅ [SW] Now ready to handle fetches');
            
            // Kirim message ke semua clients bahwa SW aktif
            self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        type: 'SW_ACTIVATED',
                        version: CACHE_VERSION
                    });
                });
            });
        })
    );
});

// ========== FETCH EVENT ==========
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;
    
    const requestUrl = new URL(event.request.url);
    
    // Skip Chrome extensions
    if (requestUrl.protocol === 'chrome-extension:') return;
    
    // Skip Google API calls (biarkan langsung ke network)
    if (requestUrl.href.includes('generativelanguage.googleapis.com')) {
        return;
    }
    
    // Skip OneSignal
    if (requestUrl.href.includes('onesignal.com')) {
        return;
    }
    
    // Skip CDNJS/CSS
    if (requestUrl.href.includes('cdnjs.cloudflare.com') || 
        requestUrl.href.includes('fonts.googleapis.com') ||
        requestUrl.href.includes('fonts.gstatic.com')) {
        return event.respondWith(
            caches.match(event.request)
                .then(cached => cached || fetch(event.request))
        );
    }
    
    console.log(`🔍 [SW] Fetching: ${requestUrl.pathname}`);
    
    // Handle navigation requests (HTML pages)
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Update cache dengan response baru
                    const responseClone = response.clone();
                    caches.open(CACHE_VERSION)
                        .then(cache => cache.put(event.request, responseClone))
                        .catch(err => console.log('[SW] Cache update failed:', err));
                    return response;
                })
                .catch(async () => {
                    console.log('📵 [SW] Offline detected for navigation, serving offline page');
                    
                    // Coba cari di cache dulu
                    const cached = await caches.match(event.request);
                    if (cached) return cached;
                    
                    // Fallback ke offline page
                    const offlinePage = await caches.match(OFFLINE_URL);
                    if (offlinePage) return offlinePage;
                    
                    // Ultimate fallback
                    return new Response(
                        '<h1>Offline</h1><p>Please check your internet connection.</p>',
                        { 
                            headers: { 'Content-Type': 'text/html; charset=utf-8' } 
                        }
                    );
                })
        );
        return;
    }
    
    // Handle other requests (CSS, JS, images, etc)
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // Jika ada di cache, kembalikan
                if (cachedResponse) {
                    console.log(`📦 [SW] Serving from cache: ${requestUrl.pathname}`);
                    return cachedResponse;
                }
                
                // Jika tidak ada di cache, fetch dari network
                return fetch(event.request)
                    .then(networkResponse => {
                        // Validasi response
                        if (!networkResponse || networkResponse.status !== 200) {
                            return networkResponse;
                        }
                        
                        // Clone response untuk cache
                        const responseToCache = networkResponse.clone();
                        
                        // Simpan ke cache untuk penggunaan selanjutnya
                        caches.open(CACHE_VERSION)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                                console.log(`💾 [SW] Cached: ${requestUrl.pathname}`);
                            })
                            .catch(err => {
                                console.error('[SW] Failed to cache response:', err);
                            });
                        
                        return networkResponse;
                    })
                    .catch(error => {
                        console.log(`❌ [SW] Network error for ${requestUrl.pathname}:`, error);
                        
                        // Untuk CSS/JS, kembalikan fallback minimal
                        if (requestUrl.pathname.endsWith('.css')) {
                            return new Response(
                                '/* MirAI Offline Mode */\nbody { background: #1a1a1a; color: #fff; }',
                                { headers: { 'Content-Type': 'text/css' } }
                            );
                        }
                        
                        if (requestUrl.pathname.endsWith('.js')) {
                            return new Response(
                                '// MirAI Offline Mode\nconsole.log("App is offline");',
                                { headers: { 'Content-Type': 'application/javascript' } }
                            );
                        }
                        
                        // Untuk images, kembalikan placeholder
                        if (requestUrl.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
                            return new Response(
                                '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="#2a2a2a"/><text x="50" y="50" text-anchor="middle" fill="#fff" font-family="Arial" font-size="12">Image</text></svg>',
                                { headers: { 'Content-Type': 'image/svg+xml' } }
                            );
                        }
                        
                        return new Response(
                            'Offline - Unable to fetch resource',
                            { status: 503, statusText: 'Service Unavailable' }
                        );
                    });
            })
    );
});

// ========== BACKGROUND SYNC ==========
self.addEventListener('sync', event => {
    console.log(`🔄 [SW] Background Sync: ${event.tag}`);
    
    if (event.tag === 'sync-messages') {
        event.waitUntil(syncPendingMessages());
    }
});

async function syncPendingMessages() {
    console.log('[SW] Syncing pending messages...');
    // Implementasi sync untuk pesan yang belum terkirim
    try {
        // Baca dari IndexedDB jika ada
        const db = await openIDB();
        const messages = await getAllFromStore(db, 'pendingMessages');
        
        for (const message of messages) {
            await sendMessageToAPI(message);
            await deleteFromStore(db, 'pendingMessages', message.id);
        }
        
        console.log('[SW] Messages synced successfully');
        
        // Kirim notification
        await self.registration.showNotification('MirAI', {
            body: 'Messages synced successfully',
            icon: 'https://raw.githubusercontent.com/Allwaysever/MirAI/refs/heads/main/Assets/Favicon.png'
        });
        
    } catch (error) {
        console.error('[SW] Sync failed:', error);
    }
}

// ========== PUSH NOTIFICATIONS ==========
self.addEventListener('push', event => {
    console.log('[SW] Push notification received');
    
    const data = event.data ? event.data.json() : {};
    
    const options = {
        body: data.body || 'New notification from MirAI',
        icon: data.icon || 'https://raw.githubusercontent.com/Allwaysever/MirAI/refs/heads/main/Assets/Favicon.png',
        badge: 'https://raw.githubusercontent.com/Allwaysever/MirAI/refs/heads/main/Assets/Favicon.png',
        data: {
            url: data.url || '/',
            timestamp: new Date().toISOString()
        },
        actions: [
            {
                action: 'open',
                title: 'Open App'
            },
            {
                action: 'dismiss',
                title: 'Dismiss'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title || 'MirAI', options)
    );
});

self.addEventListener('notificationclick', event => {
    console.log('[SW] Notification clicked:', event.action);
    
    event.notification.close();
    
    if (event.action === 'open' || event.action === '') {
        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true })
                .then(clientList => {
                    // Cari client yang sudah terbuka
                    for (const client of clientList) {
                        if (client.url.includes('/chat') && 'focus' in client) {
                            return client.focus();
                        }
                    }
                    
                    // Buka baru jika tidak ada
                    if (clients.openWindow) {
                        return clients.openWindow(event.notification.data.url || '/chat');
                    }
                })
        );
    }
});

// ========== MESSAGE HANDLER ==========
self.addEventListener('message', event => {
    console.log('[SW] Message received:', event.data);
    
    switch (event.data.type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
        case 'GET_CACHE_STATUS':
            event.ports[0].postMessage({
                cacheVersion: CACHE_VERSION,
                isOnline: navigator.onLine
            });
            break;
            
        case 'CLEAR_CACHE':
            caches.delete(CACHE_VERSION).then(() => {
                event.ports[0].postMessage({ success: true });
            });
            break;
    }
});

// ========== HELPER FUNCTIONS ==========
function openIDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('MirAI_SyncDB', 1);
        
        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            
            if (!db.objectStoreNames.contains('pendingMessages')) {
                const store = db.createObjectStore('pendingMessages', { keyPath: 'id' });
                store.createIndex('timestamp', 'timestamp', { unique: false });
            }
        };
        
        request.onsuccess = function(event) {
            resolve(event.target.result);
        };
        
        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

function getAllFromStore(db, storeName) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        
        request.onsuccess = function(event) {
            resolve(event.target.result);
        };
        
        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

function deleteFromStore(db, storeName, id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(id);
        
        request.onsuccess = function(event) {
            resolve(true);
        };
        
        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

async function sendMessageToAPI(message) {
    // Implementasi pengiriman pesan ke API
    console.log('[SW] Sending message:', message);
    return Promise.resolve();
}

// ========== PERIODIC BACKGROUND TASKS ==========
// Clean up old data periodically
setInterval(async () => {
    try {
        console.log('[SW] Running periodic cleanup');
        
        // Clean up IndexedDB
        const db = await openIDB();
        const oldMessages = await getAllFromStore(db, 'pendingMessages');
        const now = Date.now();
        const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
        
        for (const message of oldMessages) {
            if (message.timestamp < oneWeekAgo) {
                await deleteFromStore(db, 'pendingMessages', message.id);
            }
        }
        
        console.log('[SW] Cleanup completed');
    } catch (error) {
        console.error('[SW] Cleanup failed:', error);
    }
}, 24 * 60 * 60 * 1000); // Setiap 24 jam
