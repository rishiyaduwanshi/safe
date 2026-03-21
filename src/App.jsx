import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/index.js';
import ModLayout from './layouts/ModLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import { ROUTES, MOD_ROUTES, ADMIN_ROUTES } from './constants/index.js';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ModAuthProvider, useModAuth } from './contexts/ModAuthContext.jsx';
import { AdminAuthProvider, useAdminAuth } from './contexts/AdminAuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import HomePage from './pages/Home.jsx';
import DashboardPage from './pages/Dashboard.jsx';
import ReportPage from './pages/Report.jsx';
import MyReportsPage from './pages/MyReports.jsx';
import ProfilePage from './pages/Profile.jsx';
import AboutPage from './pages/About.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';

import ModLogin from './pages/mod/ModLogin.jsx';
import ModDashboard from './pages/mod/ModDashboard.jsx';
import ModReportsQueue from './pages/mod/ModReportsQueue.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminModerators from './pages/admin/AdminModerators.jsx';

// Route guard for moderator-only pages
const ModProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useModAuth();
  if (isLoading) return null;
  return isAuthenticated ? children : <Navigate to={MOD_ROUTES.LOGIN} replace />;
};

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  if (isLoading) return null;
  return isAuthenticated ? children : <Navigate to={ADMIN_ROUTES.LOGIN} replace />;
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <ProtectedRoute requireAuth={false}>
            <SignIn />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.REGISTER,
        element: (
          <ProtectedRoute requireAuth={false}>
            <SignUp />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.DASHBOARD,
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.REPORT,
        element: (
          <ProtectedRoute>
            <ReportPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.MY_REPORTS,
        element: (
          <ProtectedRoute>
            <MyReportsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.PROFILE,
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ── Moderator portal (own sidebar layout + auth context) ──────
  {
    path: '/mod',
    element: <ModAuthProvider><ModLayout /></ModAuthProvider>,
    children: [
      { index: true, element: <Navigate to={MOD_ROUTES.LOGIN} replace /> },
      { path: 'login', element: <ModLogin /> },
      { path: 'dashboard', element: <ModProtectedRoute><ModDashboard /></ModProtectedRoute> },
      { path: 'reports', element: <ModProtectedRoute><ModReportsQueue /></ModProtectedRoute> },
      { path: 'reports/queue', element: <ModProtectedRoute><ModReportsQueue /></ModProtectedRoute> },
    ],
  },

  {
    path: '/admin',
    element: <AdminAuthProvider><AdminLayout /></AdminAuthProvider>,
    children: [
      { index: true, element: <Navigate to={ADMIN_ROUTES.LOGIN} replace /> },
      { path: 'login', element: <AdminLogin /> },
      { path: 'dashboard', element: <AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute> },
      { path: 'moderators', element: <AdminProtectedRoute><AdminModerators /></AdminProtectedRoute> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
