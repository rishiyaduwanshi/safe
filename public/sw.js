/* eslint-disable no-restricted-globals */

self.addEventListener('push', (event) => {
  console.log('[SW] 🔔 Push event received!');
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
    console.log('[SW] Payload:', JSON.stringify(payload));
  } catch {
    payload = { title: 'Notification', body: event.data?.text?.() };
  }

  const title = payload.title || 'SafeIndia';
  const body = payload.body || '';
  const url = payload.url || '/';

  event.waitUntil(
    (async () => {
      try {
        const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
        console.log('[SW] Posting to', allClients.length, 'client(s)');
        for (const client of allClients) {
          client.postMessage({ type: 'PUSH_NOTIFICATION', payload });
        }
      } catch {
        // ignore
      }

      console.log('[SW] Calling showNotification:', title);
      await self.registration.showNotification(title, {
        body,
        data: { url, ...(payload.data || {}) },
      });
      console.log('[SW] ✅ showNotification done');
    })()
  );
});

self.addEventListener('notificationclick', (event) => {
  const url = event?.notification?.data?.url || '/';
  event.notification.close();

  event.waitUntil(
    (async () => {
      const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      const existing = allClients[0];
      if (existing) {
        await existing.focus();
        if (typeof existing.navigate === 'function') {
          await existing.navigate(url);
        } else {
          await self.clients.openWindow(url);
        }
      } else {
        await self.clients.openWindow(url);
      }
    })()
  );
});
