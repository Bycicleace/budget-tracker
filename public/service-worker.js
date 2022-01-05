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
    // Activate
});

self.addEventListener('fetch', function(event) {
    // Handling requests
});

