import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Button, Card, LoadingAnimation } from '../components/index.js';
import { ROUTES } from '../constants/routes.js';
import { useNotifications } from '../hooks/index.js';
import { notificationsApi, pushApi } from '../constants/services.js';
import { useQueryClient } from '@tanstack/react-query';

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const NotificationsPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [pushState, setPushState] = useState({
    supported: true,
    permission: typeof Notification !== 'undefined' ? Notification.permission : 'default',
    subscribed: false,
    isLoading: false,
    error: '',
  });

  const { data: notifData, isLoading } = useNotifications({ limit: 50, enabled: true });
  const notifications = notifData?.notifications ?? [];
  const unreadCount = notifData?.unreadCount ?? 0;

  const refreshNotifications = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  }, [queryClient]);

  useEffect(() => {
    const supported =
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      typeof Notification !== 'undefined';

    if (!supported) {
      setPushState((s) => ({ ...s, supported: false }));
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        const sub = reg ? await reg.pushManager.getSubscription() : null;
        if (!cancelled) {
          setPushState((s) => ({
            ...s,
            supported: true,
            permission: Notification.permission,
            subscribed: Boolean(sub),
          }));
        }
      } catch {
        // ignore
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const enablePushNotifications = useCallback(async () => {
    const supported =
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      'PushManager' in window &&
      typeof Notification !== 'undefined';

    if (!supported) {
      console.log('[Push] ❌ Not supported in this browser');
      setPushState((s) => ({ ...s, supported: false, error: 'Push notifications not supported in this browser.' }));
      return;
    }

    setPushState((s) => ({ ...s, isLoading: true, error: '' }));

    try {
      console.log('[Push] Requesting permission... current:', Notification.permission);
      const permission = await Notification.requestPermission();
      console.log('[Push] Permission result:', permission);
      if (permission !== 'granted') {
        setPushState((s) => ({ ...s, isLoading: false, permission, subscribed: false }));
        return;
      }

      console.log('[Push] Registering service worker...');
      await navigator.serviceWorker.register('/sw.js');
      const readyReg = await navigator.serviceWorker.ready;
      console.log('[Push] SW ready');

      const existing = await readyReg.pushManager.getSubscription();
      console.log('[Push] Existing subscription:', existing ? 'YES' : 'NO');
      if (existing) {
        console.log('[Push] Sending existing sub to backend...');
        await pushApi.subscribe({ subscription: existing.toJSON(), userAgent: navigator.userAgent });
        console.log('[Push] ✅ Existing sub sent to backend');
        setPushState((s) => ({ ...s, isLoading: false, permission, subscribed: true }));
        return;
      }

      console.log('[Push] Fetching VAPID public key...');
      const keyRes = await pushApi.getVapidPublicKey();
      const publicKey = keyRes?.data?.publicKey;
      console.log('[Push] VAPID key received:', publicKey ? 'YES' : 'NO');
      if (!publicKey) {
        throw new Error('Missing VAPID public key (push not configured)');
      }

      console.log('[Push] Creating push subscription...');
      const subscription = await readyReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      console.log('[Push] Subscription created, sending to backend...');

      await pushApi.subscribe({ subscription: subscription.toJSON(), userAgent: navigator.userAgent });
      console.log('[Push] ✅ Push fully enabled!');

      setPushState((s) => ({ ...s, isLoading: false, permission, subscribed: true }));
    } catch (e) {
      const msg = e?.message || 'Failed to enable notifications';
      console.log('[Push] ❌ Error:', msg);
      setPushState((s) => ({ ...s, isLoading: false, error: msg }));
    }
  }, []);

  const onNotificationClick = useCallback(async (n) => {
    try {
      if (n?._id && !n?.readAt) {
        await notificationsApi.markRead(n._id);
      }
    } catch {
      // ignore
    } finally {
      refreshNotifications();
    }

    const reportId = n?.data?.reportId || n?.entityId;
    if (reportId) {
      navigate(`${ROUTES.MY_REPORTS}?id=${encodeURIComponent(String(reportId))}`);
    } else {
      navigate(ROUTES.MY_REPORTS);
    }
  }, [navigate, refreshNotifications]);

  return (
    <LoadingAnimation>
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 md:pt-10 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-6"
        >
          {/* Title Row */}
          <div className="flex items-center gap-3 text-white mb-4">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white/5 border border-white/10 shrink-0">
              <Bell size={18} />
            </span>
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-bold">Notifications</h1>
              <p className="text-sm text-slate-300">
                {unreadCount > 0 ? `${unreadCount} unread` : 'Up to date'}
              </p>
            </div>
          </div>

          {/* Push Status Row */}
          {pushState.supported ? (
            <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/8">
              <div className="text-sm text-slate-300">
                Push notifications:{' '}
                <span className="text-white font-semibold">
                  {pushState.subscribed ? 'Enabled' : pushState.permission === 'denied' ? 'Blocked' : 'Off'}
                </span>
              </div>
              {!pushState.subscribed && pushState.permission !== 'denied' ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={enablePushNotifications}
                  disabled={pushState.isLoading}
                >
                  {pushState.isLoading ? 'Enabling...' : 'Enable'}
                </Button>
              ) : null}
            </div>
          ) : (
            <div className="text-sm text-slate-400 p-3 rounded-xl bg-white/5 border border-white/8">
              Push not supported in this browser
            </div>
          )}

          {pushState.error ? (
            <div className="text-sm text-red-300 mt-3 whitespace-pre-wrap">
              {pushState.error}
            </div>
          ) : null}
        </motion.div>

        <Card variant="elevated" size="lg">
          {isLoading ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              Loading...
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm">
              No notifications yet
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {notifications.map((n) => (
                <button
                  key={n._id}
                  type="button"
                  onClick={() => onNotificationClick(n)}
                  className="w-full text-left flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-background-tertiary border border-white/10"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3">
                      <p className="text-sm font-semibold text-white">
                        {n?.title || 'Notification'}
                      </p>
                      <span className="text-xs text-slate-400 shrink-0">
                        {n?.createdAt ? new Date(n.createdAt).toLocaleString() : ''}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 mt-1 break-words">
                      {n?.message || ''}
                    </p>
                  </div>

                  {!n?.readAt ? (
                    <span className="shrink-0 mt-1 inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300">
                      New
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          )}
        </Card>
      </div>
    </LoadingAnimation>
  );
};

export default NotificationsPage;
