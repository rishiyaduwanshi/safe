import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { ROUTES } from '../constants/routes.js';

const ProtectedRoute = ({ children, requireAuth = true }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white/60">Loading...</p>
                </div>
            </div>
        );
    }

    if (requireAuth && !isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    if (!requireAuth && isAuthenticated) {
        const from = location.state?.from?.pathname || ROUTES.DASHBOARD;
        return <Navigate to={from} replace />;
    }

    return children;
};

export default ProtectedRoute;