// sw.js

const STATIC_CACHE_NAME = 'portfolio-static-v1'; // Cache cho các file khung sườn
const DYNAMIC_CACHE_NAME = 'portfolio-dynamic-v1'; // Cache cho các file được yêu cầu sau

// Các file "khung sườn" (app shell) tối quan trọng
const urlsToCache = [
  '/',
  '/index.html',
  '/style/reset.css',
  '/style/style.css',
  '/js/script.js',
  '/js/app.js',
  '/js/particles.js'
];

// Sự kiện 'install': cache các file khung sườn
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Precaching App Shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Sự kiện 'activate': dọn dẹp cache cũ
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Sự kiện 'fetch': Xử lý tất cả các yêu cầu mạng
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Nếu tìm thấy trong cache -> trả về từ cache
        if (response) {
          return response;
        }
        // Nếu không tìm thấy -> đi lấy từ mạng
        return fetch(event.request).then(
          networkResponse => {
            // Sau khi lấy từ mạng thành công, mở cache động và lưu lại yêu cầu này
            return caches.open(DYNAMIC_CACHE_NAME)
              .then(cache => {
                // Chúng ta phải clone() response vì response chỉ có thể được sử dụng một lần
                cache.put(event.request.url, networkResponse.clone());
                return networkResponse;
              })
          }
        ).catch(error => {
          console.log('Fetch failed; returning offline page instead.', error);
        });
      })
  );
});