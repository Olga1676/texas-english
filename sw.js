// Хранит приложение в телефоне, чтобы оно работало без интернета.
// При обновлении уроков увеличьте номер версии (и APP_VER в app.js).
const VERSION = 'te-v5';
const FILES = ['./', 'index.html', 'style.css', 'app.js', 'course-common.js', 'course-tracks.js', 'course-kids.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];

// cache: 'reload' — берём файлы с сайта, а не из кэша браузера, иначе в новую версию попадают старые файлы.
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// С интернетом — свежие файлы с сайта (и обновляем память), без интернета или при медленной сети — из памяти.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const hit = await cache.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request.url, { cache: 'no-cache' }).then(res => { if (res.ok) cache.put(e.request, res.clone()); return res; });
    if (!hit) return net;
    const slow = new Promise(r => setTimeout(() => r(hit), 4000));
    return Promise.race([net.catch(() => hit), slow]);
  }));
});
