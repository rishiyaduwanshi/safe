export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4040/api/v1',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  RETRY_ATTEMPTS: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS) || 3,
};

export const API_ENDPOINTS = {
  LOGIN: '/auth/signin',
  REGISTER: '/auth/signup',
  LOGOUT: '/auth/signout',
  REFRESH_TOKEN: '/auth/refresh-token',
  ME: '/auth/me',
  SUBMIT_REPORT: '/reports',
  USER_REPORTS: '/reports/me',
  REPORT_STATS: '/reports/stats',
  REPORT_DETAILS: '/reports/:id',
  LICENSE_LOOKUP: '/license/lookup',
  PROFILE_ME: '/profile/me',
  PROFILE_SAVE: '/profile/save',
};

