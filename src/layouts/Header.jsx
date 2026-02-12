import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Shield,
  Home,
  TrendingUp,
  FileText,
  User,
  Info,
  LogIn,
  LogOut,
  UserPlus
} from 'lucide-react';
import { ROUTES, STRINGS } from '../constants/index.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, signout, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Public navigation items (always visible)
  const publicNavigation = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: ROUTES.ABOUT, icon: Info },
  ];

  // Protected navigation items (only visible when authenticated) 
  const protectedNavigation = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: TrendingUp },
    { name: 'Report', path: ROUTES.REPORT, icon: FileText },
    { name: 'Profile', path: ROUTES.PROFILE, icon: User },
  ];

  // Auth navigation items (only visible when not authenticated)
  const authNavigation = [
    { name: 'Sign In', path: ROUTES.LOGIN, icon: LogIn },
    { name: 'Sign Up', path: ROUTES.REGISTER, icon: UserPlus },
  ];

  // Get navigation items based on auth state
  const getNavigationItems = () => {
    const items = [...publicNavigation];

    if (isAuthenticated) {
      items.push(...protectedNavigation);
    } else {
      items.push(...authNavigation);
    }

    return items;
  };

  const navigation = getNavigationItems();

  // Handle logout
  const handleLogout = async () => {
    try {
      await signout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-1000 h-17.5 transition-all duration-[400 ease-in-out ${scrolled
          ? 'bg-[rgba(10,10,15,0.98)] backdrop-blur-[32px] border-b border-white1/2] shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
          : 'bg-[rgba(10,10,15,0.85)] backdrop-blur-lg border-b border-white/5'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-350 mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-2 md:gap-4">

        <Link to="/" className="flex items-center gap-2.5 no-underline text-base md:text-xl font-bold text-white transition-opacity duration-200 whitespace-nowrap shrink-0 hover:opacity-80">
          <Shield size={28} className="text-indigo-500" />
          <span className="gradient-text">{STRINGS.APP_NAME}</span>
        </Link>


        <div className="flex items-center gap-3 md:gap-5 flex-1 justify-end">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/5 p-1.5 rounded-xl border border-white/8 shrink-0">
            {navigation.filter(item => !item.path.includes('/login') && !item.path.includes('/register')).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`no-underline text-sm font-medium transition-all duration-200 px-3 py-2 rounded-lg relative ${location.pathname === item.path
                    ? 'text-white bg-white/12 border border-white/16'
                    : 'text-white/70 bg-transparent border border-transparent hover:text-white hover:bg-white/8'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/8 text-white/90 text-sm">
                  <User size={16} />
                  <span>{user?.name || user?.email?.split('@')[0] || 'User'}</span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className={`flex items-center gap-1.5 px-3 py-2 bg-red-600/10 border border-red-600/30 text-red-600/90 rounded-lg text-sm font-medium transition-all duration-200 ${isLoading
                      ? 'cursor-not-allowed opacity-70'
                      : 'hover:bg-red-600/20 hover:text-red-600'
                    }`}
                >
                  <LogOut size={14} />
                  {isLoading ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link
                  to={ROUTES.LOGIN}
                  className="flex items-center gap-1.5 px-3 lg:px-4 py-2 lg:py-2.5 bg-white/8 text-white/90 no-underline text-xs lg:text-sm font-medium rounded-lg border border-white/12 transition-all duration-200 whitespace-nowrap hover:bg-white/12 hover:text-white"
                >
                  <LogIn size={14} />
                  Sign In
                </Link>

                {/* Register Button */}
                <Link
                  to={ROUTES.REGISTER}
                  className="flex items-center gap-1.5 px-3 lg:px-4 py-2 lg:py-2.5 bg-linear-to-br from-indigo-500 to-purple-500 text-white no-underline text-xs lg:text-sm font-semibold rounded-lg transition-all duration-200 shadow-[0_4px_14px_0_rgba(99,102,241,0.3)] whitespace-nowrap hover:-translate-y-0.5 hover:shadow-[0_6px_20px_0_rgba(99,102,241,0.4)]"
                >
                  <UserPlus size={14} />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        <button
          className="md:hidden flex items-center justify-center bg-white/5 border border-white/8 text-white p-2.5 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>


      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-17.5 left-0 right-0 bottom-0 bg-[rgba(10,10,15,0.98)] backdrop-blur-xl p-6 z-999"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Mobile Navigation Links */}
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-5 py-4 no-underline text-base font-medium rounded-xl transition-all duration-200 mb-2 ${location.pathname === item.path
                      ? 'text-white bg-linear-to-br from-indigo-500/20 to-purple-500/15 border border-indigo-500/30 shadow-[0_4px_20px_rgba(99,102,241,0.15)]'
                      : 'text-white/80 bg-white/3 border border-white/8 hover:bg-white/8'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {IconComponent && <IconComponent size={20} />}
                  {item.name}
                </Link>
              );
            })}

            {/* Mobile Auth Actions */}
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="flex items-center gap-3 px-5 py-4 bg-white/5 rounded-xl border border-white/8 text-white/90 text-base font-medium mb-2">
                  <User size={20} />
                  <div>
                    <div>{user?.name || 'User'}</div>
                    <div className="text-sm opacity-70">{user?.email}</div>
                  </div>
                </div>

                {/* Mobile Logout Button */}
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className={`w-full flex items-center gap-3 px-5 py-4 bg-red-600/10 border border-red-600/30 text-red-600/90 rounded-xl text-base font-medium transition-all duration-200 mt-4 ${isLoading ? 'cursor-not-allowed opacity-70' : 'hover:bg-red-600/20'
                    }`}
                >
                  <LogOut size={20} />
                  {isLoading ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
