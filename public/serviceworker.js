self.addEventListener('install', function (event) {
  console.log('Hello world from the Service Worker 🤙');
});

self.addEventListener(
  'notificationclick',
  function (event) {
    event.notification.close();

    console.log(event);

    if (event.action === 'estimate-action') {
      clients.openWindow('www.google.de');
    }
  },
  false
);