import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/index.js';
import { ROUTES } from './constants/index.js';
import './App.css'

import HomePage from './pages/Home.jsx';
import DashboardPage from './pages/Dashboard.jsx';
import ReportPage from './pages/Report.jsx';
import ProfilePage from './pages/Profile.jsx';
import AboutPage from './pages/About.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.REPORT} element={<ReportPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
