import { API_CONFIG, API_ENDPOINTS } from './config.js';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  async request(endpoint, options = {}) {
    const { _isRetrying = false, ...fetchOptions } = options;
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      credentials: 'include',
      cache: 'no-store',
      ...fetchOptions,
    };

    try {
      const response = await fetch(url, config);
      const rawText = await response.text();
      let data = null;
      if (rawText) {
        try {
          data = JSON.parse(rawText);
        } catch {
          data = { message: rawText };
        }
      }

      if (!response.ok) {
        // ── Auto-refresh: when access token expires, silently refresh and retry ──
        const isAuthEndpoint =
          endpoint === API_ENDPOINTS.REFRESH_TOKEN ||
          endpoint === API_ENDPOINTS.LOGIN ||
          endpoint === API_ENDPOINTS.REGISTER;

        if (response.status === 401 && !_isRetrying && !isAuthEndpoint) {
          try {
            const refreshUrl = `${this.baseURL}${API_ENDPOINTS.REFRESH_TOKEN}`;
            const refreshRes = await fetch(refreshUrl, {
              method: 'POST',
              credentials: 'include',
              cache: 'no-store',
              headers: { 'Content-Type': 'application/json' },
            });
            if (refreshRes.ok) {
              // Tokens rotated — retry original request once
              return this.request(endpoint, { ...fetchOptions, _isRetrying: true });
            }
          } catch {
            // Refresh failed — fall through and throw the 401
          }
        }

        throw {
          message: data?.message || 'Something went wrong',
          statusCode: response.status,
          success: false,
          errors: data?.errors || []
        };
      }

      // Some endpoints may return 204 No Content.
      return data ?? { success: true };
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw {
          message: 'Network error. Please check your connection.',
          statusCode: 0,
          success: false,
          errors: []
        };
      }
      throw error;
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  async post(endpoint, body = null, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : null,
    });
  }

  async put(endpoint, body = null, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : null,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

const apiService = new ApiService();

export const authApi = {
  signup: async (credentials) => {
    return apiService.post(API_ENDPOINTS.REGISTER, credentials);
  },

  signin: async (credentials) => {
    return apiService.post(API_ENDPOINTS.LOGIN, credentials);
  },

  signout: async () => {
    try {
      await apiService.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.warn('Logout API call failed:', error);
    }
  },

  verifyAuth: async () => {
    try {
      const response = await apiService.get(API_ENDPOINTS.ME);
      if (response.success && response.data.user) {
        return response.data.user;
      }
      return null;
    } catch {
      return null;
    }
  },
};

export const reportsApi = {
  getMyReports: async () => {
    return apiService.get(API_ENDPOINTS.USER_REPORTS);
  },

  getMyStats: async () => {
    return apiService.get(API_ENDPOINTS.REPORT_STATS);
  },

  getReportById: async (id) => {
    return apiService.get(API_ENDPOINTS.REPORT_DETAILS.replace(':id', id));
  },

  submitReport: async (reportData) => {
    return apiService.post(API_ENDPOINTS.SUBMIT_REPORT, reportData);
  },
};

export const licenseApi = {
  lookup: async ({ dlNumber }) => {
    return apiService.post(API_ENDPOINTS.LICENSE_LOOKUP, { dlNumber });
  },
};

export const profileApi = {
  getMyProfile: async () => {
    return apiService.get(API_ENDPOINTS.PROFILE_ME);
  },
  save: async (profileData) => {
    return apiService.post(API_ENDPOINTS.PROFILE_SAVE, profileData);
  },
};

export const notificationsApi = {
  getMyNotifications: async ({ limit = 20, unreadOnly = false } = {}) => {
    const query = new URLSearchParams();
    if (limit) query.set('limit', String(limit));
    if (unreadOnly) query.set('unreadOnly', 'true');
    const qs = query.toString();
    return apiService.get(`${API_ENDPOINTS.NOTIFICATIONS}${qs ? `?${qs}` : ''}`);
  },

  markRead: async (id) => {
    return apiService.request(API_ENDPOINTS.NOTIFICATION_READ.replace(':id', id), { method: 'PATCH' });
  },

  markAllRead: async () => {
    return apiService.request(API_ENDPOINTS.NOTIFICATIONS_READ_ALL, { method: 'PATCH' });
  },
};

export const pushApi = {
  getVapidPublicKey: async () => {
    return apiService.get(API_ENDPOINTS.PUSH_VAPID_PUBLIC_KEY);
  },
  subscribe: async ({ subscription, userAgent }) => {
    return apiService.post(API_ENDPOINTS.PUSH_SUBSCRIBE, { subscription, userAgent });
  },
  unsubscribe: async ({ endpoint }) => {
    return apiService.request(API_ENDPOINTS.PUSH_UNSUBSCRIBE, {
      method: 'DELETE',
      body: JSON.stringify({ endpoint }),
    });
  },
};

export default apiService;
