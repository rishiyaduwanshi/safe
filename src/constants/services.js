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
            ...options,
        };

        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

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
        const response = await apiService.post(API_ENDPOINTS.REGISTER, credentials);
        if (response.success && response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response;
    },

    // Sign in / Login
    signin: async (credentials) => {
        const response = await apiService.post(API_ENDPOINTS.LOGIN, credentials);
        if (response.success && response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response;
    },

    // Sign out / Logout
    signout: async () => {
        try {
            await apiService.post(API_ENDPOINTS.LOGOUT);
        } catch (error) {
            console.warn('Logout API call failed, clearing local storage anyway:', error);
        } finally {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        }
    },

    // Refresh token
    refreshToken: async () => {
        const response = await apiService.post(API_ENDPOINTS.REFRESH_TOKEN);
        if (response.success && response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }
        return response;
    },

    // Get current user from localStorage
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Get current token from localStorage
    getToken: () => {
        return localStorage.getItem('authToken');
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    }
};

// Export the base API service for other modules
export default apiService;
