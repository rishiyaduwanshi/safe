import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { ROUTES } from '../constants/routes.js';

const ProtectedRoute = ({ children, requireAuth = true }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Show loading while checking auth status
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // If route requires authentication but user is not authenticated
    if (requireAuth && !isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    // If route is for non-authenticated users (login/signup) but user is authenticated
    if (!requireAuth && isAuthenticated) {
        const from = location.state?.from?.pathname || ROUTES.DASHBOARD;
        return <Navigate to={from} replace />;
    }

    return children;
};

export default ProtectedRoute;