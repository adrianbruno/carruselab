const VERSION = 'carrusel-ab-v2.5';
const ASSETS = ['/', '/index.html', '/manifest.json'];
self.addEventListener('install', e => {e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate', e => {e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==VERSION).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch', e => {
  if(e.request.url.includes('index.html')||e.request.mode==='navigate'){
    e.respondWith(fetch(e.request).then(res=>{const clone=res.clone();caches.open(VERSION).then(c=>c.put(e.request,clone));return res;}).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));
});
