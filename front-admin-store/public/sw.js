/* eslint-disable no-console */

try {
  const PRECACHE = 'precache-v2'
  const RUNTIME = 'runtime'
  const CACHE_VERSION = 1
  const CURRENT_CACHES = {
    font: 'font-cache-v' + CACHE_VERSION
  }
  
  // A list of local resources we always want to be cached.
  const PRECACHE_URLS = [
    `offline.html`, // Alias for index.html
    // `/app`, // Alias for index.html
    // `/app/entrar`, // Alias for index.html
    `/app/dashboard` // Alias for index.html
  ]


  // The install handler takes care of precaching the resources we always need.
  self.addEventListener('install', (event) => {
    // console.log('installing sw')
    event.waitUntil(
      caches.open(PRECACHE)
        .then((cache) => {return cache.addAll(PRECACHE_URLS)})
        .then(self.skipWaiting())
    )
  })
  // The activate handler takes care of cleaning up old caches.
  self.addEventListener('activate', (event) => {
    const currentCaches = [PRECACHE, RUNTIME]
    // console.log('activate cache')
    event.waitUntil(
      caches
        .keys()
        .then((cacheNames) => {
          return cacheNames.filter(
            (cacheName) => {return !currentCaches.includes(cacheName)}
          )
        })
        .then((cachesToDelete) => {
          // console.log('cache is deleting')
          return Promise.all(
            cachesToDelete.map((cacheToDelete) => {
              return caches.delete(cacheToDelete)
            })
          )
        })
        .then(() => {return self.clients.claim()})
    )
  })
  self.addEventListener('notificationclick', function (event) {
    // console.log('Notification clicked')
    event.waitUntil(function () {
      return self.clients.openWindow('https://www.google.com')
    }())
  })
  // The fetch handler serves responses for same-      	origin resources from a cache.
  // If no response is found, it populates the runtime cache with the response
  // from the network before returning it to the page.
  // self.addEventListener('fetch', function(event) {
  //   // console.log('Handling fetch event for', event.request.url)
  
  //   event.respondWith(
  //     caches.open(CURRENT_CACHES.font).then(function(cache) {
  //       return cache.match(event.request).then(function(response) {
  //         if (response) {
  //           // If there is an entry in the cache for event.request, then response will be defined
  //           // and we can just return it. Note that in this example, only font resources are cached.
  //           // console.log(' Found response in cache:', response)
  
  //           return response
  //         }
  
  //         // Otherwise, if there is no entry in the cache for event.request, response will be
  //         // undefined, and we need to fetch() the resource.
  //         // console.log(' No response for %s found in cache. About to fetch ' +
  //         //   'from network...', event.request.url)
  
  //         // We call .clone() on the request since we might use it in a call to cache.put() later on.
  //         // Both fetch() and cache.put() "consume" the request, so we need to make a copy.
  //         // (see https://developer.mozilla.org/en-US/docs/Web/API/Request/clone)
  //         // return fetch(event.request.clone()).then(function(response) {
  //         //   // console.log('  Response for %s from network is: %O',
  //         //   //   event.request.url, response)
  
  //         //   if (response.status < 400 &&
  //         //       response.headers.has('content-type') &&
  //         //       response.headers.get('content-type').match(/^font\//i)) {
  //         //     // This avoids caching responses that we know are errors (i.e. HTTP status code of 4xx or 5xx).
  //         //     // We also only want to cache responses that correspond to fonts,
  //         //     // i.e. have a Content-Type response header that starts with "font/".
  //         //     // Note that for opaque filtered responses (https://fetch.spec.whatwg.org/#concept-filtered-response-opaque)
  //         //     // we can't access to the response headers, so this check will always fail and the font won't be cached.
  //         //     // All of the Google Web Fonts are served off of a domain that supports CORS, so that isn't an issue here.
  //         //     // It is something to keep in mind if you're attempting to cache other resources from a cross-origin
  //         //     // domain that doesn't support CORS, though!
  //         //     // We call .clone() on the response to save a copy of it to the cache. By doing so, we get to keep
  //         //     // the original response object which we will return back to the controlled page.
  //         //     // (see https://developer.mozilla.org/en-US/docs/Web/API/Request/clone)
  //         //     // console.log('  Caching the response to', event.request.url)
  //         //     cache.put(event.request, response.clone())
  //         //   } else {
  //         //     // console.log('  Not caching the response to', event.request.url)
  //         //   }
  
  //         //   // Return the original response object, which will be used to fulfill the resource request.
  //         //   return response
  //         // })
  //       }).catch(function(error) {
  //         // This catch() will handle exceptions that arise from the match() or fetch() operations.
  //         // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
  //         // It will return a normal response object that has the appropriate error code set.
  //         // console.error('  Error in fetch handler:', error)
  
  //         throw error
  //       })
  //     })
  //   )
  // })

  // self.addEventListener('fetch', (event) => {
  //   console.log('event')
  //   // Skip cross-origin requests, like those for Google Analytics.
  //   // const response = caches.match(event.request)
  //   //   .then(match => {
  //   //     if (match) {
  //   //       return match || fetch(event.request);
  //   //     }
  //   //     return caches.open(RUNTIME).then((cache) => {
  //   //       return fetch(event.request, {

  //   //       }).then((response) => {
  //   //         // Put a copy of the response in the runtime cache.
  //   //         return cache.put(event.request, response.clone()).then(() => {
  //   //           return response;
  //   //         });
  //   //       });
  //   //     });
  //   //   })
  //   // event.respondWith(response)
  //   // if (event.request.url.startsWith(self.location.origin)) {
  //   //   event.respondWith(
  //   //     caches.match(event.request).then((cachedResponse) => {
  //   //       if (cachedResponse) {
  //   //         return cachedResponse;
  //   //       }

  //   //       return caches.open(RUNTIME).then((cache) => {
  //   //         return fetch(event.request, {

  //   //         }).then((response) => {
  //   //           // Put a copy of the response in the runtime cache.
  //   //           return cache.put(event.request, response.clone()).then(() => {
  //   //             return response;
  //   //           });
  //   //         });
  //   //       });
  //   //     })
  //   //   );
  //   // }
  // })
} catch (e) {
  // console.log(e)
}