import { API_CONFIG } from './config.js';

// ─── Moderator API Base ───────────────────────────────────────────────────────

const MOD_BASE = `${API_CONFIG.BASE_URL}/moderator`;

const modRequest = async (endpoint, options = {}) => {
  const url = `${MOD_BASE}${endpoint}`;
  const cfg = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    credentials: 'include',
    cache: 'no-store',
    ...options,
  };

  const response = await fetch(url, cfg);

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
    throw {
      message: data?.message || 'Something went wrong',
      statusCode: response.status,
      success: false,
      errors: data?.errors || [],
    };
  }

  // Some endpoints may return 204 No Content.
  return data ?? { success: true };
};

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const modAuthApi = {
  signin: (credentials) =>
    modRequest('/auth/signin', { method: 'POST', body: JSON.stringify(credentials) }),

  signout: async () => {
    try {
      await modRequest('/auth/signout', { method: 'POST' });
    } catch (e) {
      console.warn('Moderator signout failed:', e);
    }
  },

  me: async () => {
    try {
      const res = await modRequest('/auth/me');
      return res?.data?.moderator ?? null;
    } catch {
      return null;
    }
  },

  refresh: () => modRequest('/auth/refresh', { method: 'POST' }),
};

// ─── Reports ──────────────────────────────────────────────────────────────────

export const modReportsApi = {
  /** List reports with optional filters */
  list: (params = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined && v !== '' && v !== null)
        .map(([k, v]) => [k, String(v)])
    ).toString();
    return modRequest(`/reports${qs ? `?${qs}` : ''}`);
  },

  /** Get single report */
  getById: (id) => modRequest(`/reports/${id}`),

  /** Approve a report */
  approve: (id, payload = {}) =>
    modRequest(`/reports/${id}/approve`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  /** Reject a report */
  reject: (id, reason, payload = {}) =>
    modRequest(`/reports/${id}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ reason, ...payload }),
    }),

  /** Update category for a report */
  updateCategory: (id, categoryKey, payload = {}) =>
    modRequest(`/reports/${id}/category`, {
      method: 'PATCH',
      body: JSON.stringify({ categoryKey, ...payload }),
    }),
};

// ─── Stats ────────────────────────────────────────────────────────────────────

export const modStatsApi = {
  get: () => modRequest('/stats'),
};
