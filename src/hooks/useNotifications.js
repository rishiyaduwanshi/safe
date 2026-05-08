import { useQuery } from '@tanstack/react-query';
import { notificationsApi } from '../constants/services.js';

export const notificationKeys = {
  all: () => ['notifications'],
};

export function useNotifications({ limit = 10, enabled = true } = {}) {
  return useQuery({
    queryKey: [...notificationKeys.all(), { limit }],
    queryFn: () => notificationsApi.getMyNotifications({ limit }),
    enabled,
    select: (res) => {
      const data = res?.data ?? {};
      return {
        notifications: Array.isArray(data.notifications) ? data.notifications : [],
        unreadCount: typeof data.unreadCount === 'number' ? data.unreadCount : 0,
      };
    },
    staleTime: 1000 * 30,
  });
}
