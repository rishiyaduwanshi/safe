import { API_CONFIG, API_ENDPOINTS } from './config.js';

// Base API class for making HTTP requests
class ApiService {
    constructor() {
        this.baseURL = API_CONFIG.BASE_URL;
        this.timeout = API_CONFIG.TIMEOUT;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            timeout: this.timeout,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include', // Cookie-based authentication
            ...options,
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
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

// Create API service instance
const apiService = new ApiService();

// Authentication API functions
export const authApi = {
    // Sign up / Register
    signup: async (credentials) => {
        return apiService.post(API_ENDPOINTS.REGISTER, credentials);
    },

    // Sign in / Login
    signin: async (credentials) => {
        return apiService.post(API_ENDPOINTS.LOGIN, credentials);
    },

    // Sign out / Logout - backend clears the cookie
    signout: async () => {
        try {
            await apiService.post(API_ENDPOINTS.LOGOUT);
        } catch (error) {
            console.warn('Logout API call failed:', error);
        }
    },

    // Verify auth by calling /me with accessToken cookie
    verifyAuth: async () => {
        try {
            const response = await apiService.get(API_ENDPOINTS.ME);
            if (response.success && response.data.user) {
                return response.data.user;
            }
            return null;
        } catch (error) {
            // 401 = accessToken expired or missing
            return null;
        }
    },
};

// Export the base API service for other modules
export default apiService;
