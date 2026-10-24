/*
 * Service worker: lets My Path install on a phone and work offline.
 * Bump VERSION whenever you change any file, so phones pick up the new build.
 */
const PREFIX = "my-path-";
const VERSION = PREFIX + "v1";
const CORE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon.svg"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(CORE.map(u => new Request(u, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

// Only remove this app's old caches; other apps on the same domain keep theirs.
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

// Network first so edits show up right away; the cache is the offline fallback.
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(networkFirst(req));
});

async function networkFirst(req) {
  const cache = await caches.open(VERSION);
  const key = req.mode === "navigate" ? "./index.html" : req;
  try {
    const res = await Promise.race([
      fetch(req, { cache: "no-cache" }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 4000))
    ]);
    if (res && res.ok) cache.put(key, res.clone());
    return res;
  } catch (err) {
    return (await cache.match(key, { ignoreSearch: true })) || (await cache.match("./")) || Response.error();
  }
}
