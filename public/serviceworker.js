self.addEventListener('install', function (event) {
  console.log('Eztimate.App Service Worker successfully installed 🤙');
});

self.addEventListener(
  'notificationclick',
  function (event) {
    event.notification.close();

    if (event.action === 'estimate-action') {
      clients.openWindow('/instant');
    }
  },
  false
);