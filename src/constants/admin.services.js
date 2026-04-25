import { API_CONFIG } from './config.js';
import { authApi } from './services.js';

const ADMIN_BASE = `${API_CONFIG.BASE_URL}/admin`;

const adminRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${ADMIN_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
    cache: 'no-store',
    ...options,
  });

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

  // Some endpoints (commonly DELETE) may return 204 No Content.
  return data ?? { success: true };
};

export const adminAuthApi = {
  signin: (credentials) => authApi.signin(credentials),
  me: () => authApi.verifyAuth(),
  signout: () => authApi.signout(),
};

export const adminModeratorsApi = {
  list: () => adminRequest('/moderators'),
  getById: (id) => adminRequest(`/moderators/${id}`),
  create: (payload) =>
    adminRequest('/moderators', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updatePermissions: (id, permissions) =>
    adminRequest(`/moderators/${id}/permissions`, {
      method: 'PATCH',
      body: JSON.stringify({ permissions }),
    }),
  toggleStatus: (id) =>
    adminRequest(`/moderators/${id}/toggle`, {
      method: 'PATCH',
    }),
  remove: (id) =>
    adminRequest(`/moderators/${id}`, {
      method: 'DELETE',
    }),
};
