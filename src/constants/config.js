// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.safeindia.gov.in/v1',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  
  // User Management
  USER_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/update',
  CHANGE_PASSWORD: '/user/change-password',
  
  // Safety Score
  SAFETY_SCORE: '/score/current',
  SCORE_HISTORY: '/score/history',
  SCORE_BREAKDOWN: '/score/breakdown',
  
  // Violations
  VIOLATIONS: '/violations',
  VIOLATION_DETAILS: '/violations/:id',
  APPEAL_VIOLATION: '/violations/:id/appeal',
  
  // Reports
  SUBMIT_REPORT: '/reports',
  USER_REPORTS: '/reports/user',
  REPORT_DETAILS: '/reports/:id',
  UPDATE_REPORT_STATUS: '/reports/:id/status',
  
  // Analytics (Admin)
  ANALYTICS_OVERVIEW: '/admin/analytics/overview',
  VIOLATION_STATS: '/admin/analytics/violations',
  GEOGRAPHIC_DATA: '/admin/analytics/geographic',
  SAFETY_TRENDS: '/admin/analytics/trends',
  
  // Location Services
  GEOCODE: '/location/geocode',
  REVERSE_GEOCODE: '/location/reverse-geocode',
  NEARBY_HAZARDS: '/location/nearby-hazards',
  
  // File Upload
  UPLOAD_IMAGE: '/upload/image',
  UPLOAD_DOCUMENT: '/upload/document',
};

// Storage Keys for Local Storage
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'safe_auth_token',
  REFRESH_TOKEN: 'safe_refresh_token',
  USER_DATA: 'safe_user_data',
  THEME_PREFERENCE: 'safe_theme',
  LANGUAGE_PREFERENCE: 'safe_language',
  ONBOARDING_COMPLETED: 'safe_onboarding',
  LOCATION_PERMISSION: 'safe_location_permission',
};

// Default Configuration Values
export const DEFAULTS = {
  PAGINATION_LIMIT: 20,
  IMAGE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  LOCATION_ACCURACY_THRESHOLD: 100, // meters
  SAFETY_SCORE_REFRESH_INTERVAL: 30000, // 30 seconds
  MAP_DEFAULT_ZOOM: 13,
  MAP_CENTER: { lat: 28.6139, lng: 77.2090 }, // New Delhi
};

// Feature Flags
export const FEATURES = {
  REAL_TIME_VIOLATIONS: true,
  GAMIFICATION: true,
  SOCIAL_SHARING: true,
  DARK_MODE: true,
  NOTIFICATIONS: true,
  OFFLINE_MODE: false,
  BETA_FEATURES: false,
};

export default {
  API_CONFIG,
  API_ENDPOINTS,
  STORAGE_KEYS,
  DEFAULTS,
  FEATURES,
};