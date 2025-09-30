import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './layouts/index.js';
import { ROUTES } from './constants/index.js';
import './App.css'

import HomePage from './pages/Home.jsx';
import DashboardPage from './pages/Dashboard.jsx';
import ReportPage from './pages/Report.jsx';
import ProfilePage from './pages/Profile.jsx';
import AboutPage from './pages/About.jsx';


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
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.REPORT,
        element: <ReportPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
