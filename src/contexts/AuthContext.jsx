import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authApi } from '../constants/services.js';

// Auth context
const AuthContext = createContext();

// Auth action types
const AUTH_ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR'
};

// Initial auth state
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
};

// Auth reducer
function authReducer(state, action) {
    switch (action.type) {
        case AUTH_ACTIONS.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
                error: null
            };

        case AUTH_ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                error: null
            };

        case AUTH_ACTIONS.LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
            };

        case AUTH_ACTIONS.SET_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };

        case AUTH_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}

// Auth provider component
export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Initialize auth state from localStorage
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = authApi.getToken();
                const user = authApi.getCurrentUser();

                if (token && user) {
                    // Verify token is still valid by trying to refresh
                    try {
                        await authApi.refreshToken();
                        dispatch({
                            type: AUTH_ACTIONS.LOGIN_SUCCESS,
                            payload: { user, token }
                        });
                    } catch (error) {
                        // Token is invalid, clear storage
                        authApi.signout();
                        dispatch({ type: AUTH_ACTIONS.LOGOUT });
                    }
                } else {
                    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
            }
        };

        initializeAuth();
    }, []);

    // Sign up function
    const signup = async (credentials) => {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
        dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

        try {
            const response = await authApi.signup(credentials);

            dispatch({
                type: AUTH_ACTIONS.LOGIN_SUCCESS,
                payload: {
                    user: response.data.user,
                    token: response.data.token
                }
            });

            return response;
        } catch (error) {
            dispatch({
                type: AUTH_ACTIONS.SET_ERROR,
                payload: error
            });
            throw error;
        }
    };

    // Sign in function
    const signin = async (credentials) => {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
        dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

        try {
            const response = await authApi.signin(credentials);

            dispatch({
                type: AUTH_ACTIONS.LOGIN_SUCCESS,
                payload: {
                    user: response.data.user,
                    token: response.data.token
                }
            });

            return response;
        } catch (error) {
            dispatch({
                type: AUTH_ACTIONS.SET_ERROR,
                payload: error
            });
            throw error;
        }
    };

    // Sign out function
    const signout = async () => {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

        try {
            await authApi.signout();
        } catch (error) {
            console.warn('Sign out error:', error);
        } finally {
            dispatch({ type: AUTH_ACTIONS.LOGOUT });
        }
    };

    // Clear error function
    const clearError = () => {
        dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
    };

    // Context value
    const value = {
        ...state,
        signup,
        signin,
        signout,
        clearError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}