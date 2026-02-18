// Service Worker for PWA
const CACHE_NAME = 'pms-raebareli-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/css/main.css',
    '/assets/js/main.js',
    '/manifest.json',
    'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                // Only cache local resources, skip external CDNs during install
                const localUrls = urlsToCache.filter(url => !url.startsWith('http'));
                return cache.addAll(localUrls).catch(err => {
                    console.warn('Failed to cache some resources:', err);
                });
            })
    );
});

// Fetch from cache
self.addEventListener('fetch', event => {
    // Skip caching for chrome-extension and other non-http requests
    if (!event.request.url.startsWith('http') ||
        event.request.url.includes('firestore.googleapis.com') ||
        event.request.url.includes('apis.google.com') ||
        event.request.url.includes('firebase')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    response => {
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
                    }
                ).catch(error => {
                    console.warn('Fetch failed for:', event.request.url, error);
                    // Return a fallback or just fail gracefully
                    return new Response('Network error', {
                        status: 408,
                        headers: { 'Content-Type': 'text/plain' }
                    });
                });
            })
    );
});

// Update Service Worker
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

// Background sync for form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'sync-forms') {
        event.waitUntil(syncForms());
    }
});

async function syncForms() {
    // Implement form sync logic here
    console.log('Syncing forms...');
}

// Push notifications
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'New notification from PMS Raebareli',
        icon: '/assets/images/logo/icon-192x192.png',
        badge: '/assets/images/logo/icon-72x72.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View',
                icon: '/assets/images/logo/icon-96x96.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/images/logo/icon-96x96.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('PMS Raebareli', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
