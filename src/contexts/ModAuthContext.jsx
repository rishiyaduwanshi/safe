import { createContext, useContext, useEffect, useReducer } from 'react';
import { modAuthApi } from '../constants/mod.services.js';

const ModAuthContext = createContext(null);

const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
};

const initialState = {
    moderator: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return { ...state, isLoading: action.payload, error: null };
        case ACTIONS.LOGIN_SUCCESS:
            return { ...state, moderator: action.payload, isAuthenticated: true, isLoading: false, error: null };
        case ACTIONS.LOGOUT:
            return { ...state, moderator: null, isAuthenticated: false, isLoading: false, error: null };
        case ACTIONS.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false };
        case ACTIONS.CLEAR_ERROR:
            return { ...state, error: null };
        default:
            return state;
    }
}

export function ModAuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Restore session on mount using httpOnly cookie
    useEffect(() => {
        const init = async () => {
            const mod = await modAuthApi.me();
            if (mod) {
                dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: mod });
            } else {
                dispatch({ type: ACTIONS.LOGOUT });
            }
        };
        init();
    }, []);

    const signin = async (email, password) => {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        dispatch({ type: ACTIONS.CLEAR_ERROR });
        try {
            const res = await modAuthApi.signin({ email, password });
            dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: res.data.moderator });
            return true;
        } catch (err) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: err?.message || 'Login failed. Please try again.' });
            return false;
        }
    };

    const signout = async () => {
        await modAuthApi.signout();
        dispatch({ type: ACTIONS.LOGOUT });
    };

    return (
        <ModAuthContext.Provider
            value={{
                ...state,
                signin,
                signout,
            }}
        >
            {children}
        </ModAuthContext.Provider>
    );
}

export const useModAuth = () => {
    const ctx = useContext(ModAuthContext);
    if (!ctx) throw new Error('useModAuth must be used within ModAuthProvider');
    return ctx;
};
