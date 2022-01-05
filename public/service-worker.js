const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'version-01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    "./index.html",
    "./css/styles.css",
    "./js/index.js",
    "./js/idb.js"
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    )
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
            .then(function(keyList) {
                let cacheKeepList = keyList.filter(function(key) {
                    return key.indexOf(APP_PREFIX);
                });
                cacheKeepList.push(CACHE_NAME);
                return Promise.all(
                    keyList.map(function(key, i) {
                        return caches.delete(keyList[i]);
                    })
                );
            })
            
    );
});

self.addEventListener('fetch', function(event) {
    // Handling requests
});

