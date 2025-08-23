// Service Worker pour optimisation performance et cache
const STATIC_CACHE = 'solodesign-static-v1'
const DYNAMIC_CACHE = 'solodesign-dynamic-v1'

// Ressources à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/',
  '/about-us',
  '/services',
  '/projects',
  '/contact',
  '/favicon.ico',
  '/logo_white_png.png',
  '/manifest.json'
]

// Installation du Service Worker
self.addEventListener('install', event => {
  if (self && 'ENV' in self ? self.ENV === 'development' : false) {
    console.log('🔧 Service Worker: Installation')
  }
  
  event.waitUntil(
    Promise.all([
      // Cache statique
      caches.open(STATIC_CACHE).then(cache => {
        if (self && 'ENV' in self ? self.ENV === 'development' : false) {
          console.log('📦 Service Worker: Cache des assets statiques')
        }
        return cache.addAll(STATIC_ASSETS)
      }),
      
      // Préchargement des ressources critiques
      caches.open(DYNAMIC_CACHE).then(() => {
        if (self && 'ENV' in self ? self.ENV === 'development' : false) {
          console.log('⚡ Service Worker: Préparation du cache dynamique')
        }
        return Promise.resolve()
      })
    ])
  )
  
  // Activer immédiatement
  self.skipWaiting()
})

// Activation du Service Worker
self.addEventListener('activate', event => {
  if (self && 'ENV' in self ? self.ENV === 'development' : false) {
    console.log('✅ Service Worker: Activation')
  }
  
  event.waitUntil(
    Promise.all([
      // Nettoyer les anciens caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              if (self && 'ENV' in self ? self.ENV === 'development' : false) {
                console.log('🗑️ Service Worker: Suppression ancien cache', cacheName)
              }
              return caches.delete(cacheName)
            }
          })
        )
      }),
      
      // Prendre le contrôle de tous les clients
      self.clients.claim()
    ])
  )
})

// Stratégies de cache
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)
  
  // Ignorer les requêtes non-GET et les APIs externes
  if (request.method !== 'GET' || 
      url.origin !== self.location.origin ||
      url.pathname.startsWith('/api/')) {
    return
  }
  
  // Stratégie Cache First pour les assets statiques
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(request))
    return
  }
  
  // Stratégie Network First pour les pages HTML
  if (isPageRequest(request)) {
    event.respondWith(networkFirst(request))
    return
  }
  
  // Stratégie Stale While Revalidate pour les images
  if (isImageRequest(request)) {
    event.respondWith(staleWhileRevalidate(request))
    return
  }
  
  // Stratégie par défaut: Network First
  event.respondWith(networkFirst(request))
})

// Cache First - Pour assets statiques (CSS, JS, fonts)
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    if (self && 'ENV' in self ? self.ENV === 'development' : false) {
      console.log('❌ Service Worker: Cache First failed', error)
    }
    return new Response('Offline', { status: 503 })
  }
}

// Network First - Pour pages HTML
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    if (self && 'ENV' in self ? self.ENV === 'development' : false) {
      console.log('🔄 Service Worker: Network failed, trying cache')
    }
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Page offline de fallback
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SoloDesign - Hors ligne</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <style>
            body { font-family: system-ui; text-align: center; padding: 2rem; }
            .offline { color: #666; }
          </style>
        </head>
        <body>
          <h1>SoloDesign</h1>
          <p class="offline">Vous êtes hors ligne. Veuillez vérifier votre connexion.</p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
      status: 503
    })
  }
}

// Stale While Revalidate - Pour images
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE)
  const cachedResponse = await cache.match(request)
  
  // Révalidation en arrière-plan
  const networkPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  }).catch(() => cachedResponse)
  
  // Retourner immédiatement le cache si disponible
  return cachedResponse || networkPromise
}

// Helpers
function isStaticAsset(pathname) {
  return pathname.startsWith('/_next/static/') ||
         pathname.startsWith('/fonts/') ||
         pathname.endsWith('.css') ||
         pathname.endsWith('.js') ||
         pathname.endsWith('.woff') ||
         pathname.endsWith('.woff2')
}

function isPageRequest(request) {
  return request.headers.get('accept')?.includes('text/html')
}

function isImageRequest(request) {
  return request.headers.get('accept')?.includes('image/') ||
         request.url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)
}
