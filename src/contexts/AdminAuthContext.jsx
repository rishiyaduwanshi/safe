import { createContext, useContext, useEffect, useReducer } from 'react';
import { adminAuthApi } from '../constants/admin.services.js';

const AdminAuthContext = createContext(null);

const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
};

const initialState = {
    admin: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

const isAdminRole = (user) => user?.role === 'admin';

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return { ...state, isLoading: action.payload };
        case ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                admin: action.payload,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };
        case ACTIONS.LOGOUT:
            return {
                ...state,
                admin: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            };
        case ACTIONS.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false };
        case ACTIONS.CLEAR_ERROR:
            return { ...state, error: null };
        default:
            return state;
    }
}

export function AdminAuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const restore = async () => {
            const user = await adminAuthApi.me();
            if (isAdminRole(user)) {
                dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: user });
            } else {
                dispatch({ type: ACTIONS.LOGOUT });
            }
        };
        restore();
    }, []);

    const signin = async (email, password) => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        dispatch({ type: ACTIONS.CLEAR_ERROR });

        try {
            const response = await adminAuthApi.signin({ email, password });
            const user = response?.data?.user;

            if (!isAdminRole(user)) {
                await adminAuthApi.signout();
                dispatch({ type: ACTIONS.SET_ERROR, payload: 'Admin access required.' });
                return false;
            }

            dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: user });
            return true;
        } catch (error) {
            dispatch({
                type: ACTIONS.SET_ERROR,
                payload: error?.message || 'Unable to sign in. Please try again.',
            });
            return false;
        }
    };

    const signout = async () => {
        await adminAuthApi.signout();
        dispatch({ type: ACTIONS.LOGOUT });
    };

    return (
        <AdminAuthContext.Provider
            value={{
                ...state,
                signin,
                signout,
            }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
}

export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider');
    return context;
};
