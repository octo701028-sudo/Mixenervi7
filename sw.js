const CACHE_NAME = 'enervi7-full-v1';
const PRECACHE = ['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png','./yl_blends.json'];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(PRECACHE)).then(self.skipWaiting())); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(res=>{
    if(e.request.method==='GET' && res && res.status===200 && res.type==='basic'){ const clone=res.clone(); caches.open(CACHE_NAME).then(ca=>ca.put(e.request,clone)); }
    return res;
  }).catch(()=>caches.match('./index.html'))));
});