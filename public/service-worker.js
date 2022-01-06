const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'version-01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    "./index.html",
    "./css/styles.css",
    "./js/index.js",
    "./js/idb.js",
    "https://cdn.jsdelivr.net/npm/chart.js@2.8.0"
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
            .then(() => console.log("Cache created"))
            .catch(function(err) {console.log("Cache Error: " + err)})
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
                        if (cacheKeepList.indexOf(key) === -1) {
                            return caches.delete(keyList[i]);
                        }  
                    })
                );
            })
            .catch(err => console.log("Cache Deletion error: " + err))
            
    );
});

self.addEventListener('fetch', function(event) {
    //console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function (request) {
            if (request) {
                console.log("responded with cache: " + event.request.url);
                return request;
            } else {
                console.log("responded with server: " + event.request.url);
                return fetch(event.request);
            }
        })
    );
});

