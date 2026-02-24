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
            ...fetchOptions,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

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
                    message: data.message || 'Something went wrong',
                    statusCode: response.status,
                    success: false,
                    errors: data.errors || []
                };
            }

            return data;
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

export default apiService;
