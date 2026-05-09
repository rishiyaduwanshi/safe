import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Shield,
  Home,
  TrendingUp,
  FileText,
  ClipboardList,
  User,
  Bell,
  Info,
  LogIn,
  LogOut,
  UserPlus
} from 'lucide-react';
import { ROUTES, STRINGS } from '../constants/index.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNotifications } from '../hooks/index.js';
import { notificationsApi } from '../constants/services.js';
import { useQueryClient } from '@tanstack/react-query';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated, user, signout, isLoading } = useAuth();

  const notifWrapRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsNotifOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onDocMouseDown = (e) => {
      if (!isNotifOpen) return;
      const el = notifWrapRef.current;
      if (!el) return;
      if (el.contains(e.target)) return;
      setIsNotifOpen(false);
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsNotifOpen(false);
    };

    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isNotifOpen]);

  const publicNavigation = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: ROUTES.ABOUT, icon: Info },
  ];

  const protectedNavigation = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: TrendingUp },
    { name: 'Report', path: ROUTES.REPORT, icon: FileText },
    { name: 'My Reports', path: ROUTES.MY_REPORTS, icon: ClipboardList },
    { name: 'Profile', path: ROUTES.PROFILE, icon: User },
  ];

  const authNavigation = [
    { name: 'Sign In', path: ROUTES.LOGIN, icon: LogIn },
    { name: 'Sign Up', path: ROUTES.REGISTER, icon: UserPlus },
  ];

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

  const { data: notifData } = useNotifications({ limit: 5, enabled: isAuthenticated });
  const notifications = notifData?.notifications ?? [];
  const unreadCount = notifData?.unreadCount ?? 0;

  const displayName = useMemo(() => {
    const name = user?.name || user?.email?.split('@')[0] || 'User';
    return typeof name === 'string' ? name : 'User';
  }, [user?.email, user?.name]);

  const refreshNotifications = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['notifications'] });
  }, [queryClient]);

  const onNotificationClick = useCallback(async (n) => {
    setIsNotifOpen(false);
    try {
      if (n?._id && !n?.readAt) {
        await notificationsApi.markRead(n._id);
      }
    } catch {
      // ignore
    } finally {
      refreshNotifications();
    }

    const reportId = n?.data?.reportId || n?.entityId;
    if (reportId) {
      navigate(`${ROUTES.MY_REPORTS}?id=${encodeURIComponent(String(reportId))}`);
    } else {
      navigate(ROUTES.MY_REPORTS);
    }
  }, [navigate, refreshNotifications]);

  const openAllNotifications = useCallback(() => {
    setIsNotifOpen(false);
    navigate(ROUTES.NOTIFICATIONS);
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signout();
      setIsMenuOpen(false);
      setIsNotifOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
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
                <div className="flex items-center gap-2 px-3 py-3 bg-white/5 rounded-lg border border-white/8 text-white/90 text-sm">
                  <User size={16} />
                  <span>{displayName}</span>
                </div>

                {/* Notifications */}
                <div ref={notifWrapRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setIsNotifOpen((v) => !v)}
                    className="relative flex items-center justify-center w-11 h-11 bg-white/5 rounded-lg border border-white/8 text-white/90 transition-all duration-200 hover:bg-white/10"
                    aria-label="Notifications"
                    aria-expanded={isNotifOpen}
                    aria-haspopup="menu"
                  >
                    <Bell size={18} />
                    {unreadCount > 0 ? (
                      <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1.5 rounded-full bg-indigo-500 text-white text-[11px] font-bold flex items-center justify-center border border-[rgba(10,10,15,0.9)]">
                        {unreadCount > 99 ? '99+' : String(unreadCount)}
                      </span>
                    ) : null}
                  </button>

                  <AnimatePresence>
                    {isNotifOpen ? (
                      <motion.div
                        key="notif-menu"
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-[rgba(10,10,15,0.98)] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden z-999"
                        role="menu"
                      >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
                          <div className="text-white font-semibold">Notifications</div>
                          <div className="text-xs text-white/60">
                            {unreadCount > 0 ? `${unreadCount} unread` : 'Up to date'}
                          </div>
                        </div>

                        {notifications.length === 0 ? (
                          <div className="px-4 py-8 text-center text-sm text-white/60">
                            No notifications yet
                          </div>
                        ) : (
                          <div className="max-h-80 overflow-auto">
                            {notifications.map((n) => (
                              <button
                                key={n._id}
                                type="button"
                                onClick={() => onNotificationClick(n)}
                                className={`w-full text-left px-4 py-3 border-b border-white/6 hover:bg-white/5 transition-colors ${!n?.readAt ? 'bg-white/3' : ''}`}
                                role="menuitem"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <div className="text-sm font-semibold text-white truncate">
                                      {n?.title || 'Notification'}
                                    </div>
                                    <div className="text-xs text-white/60 mt-0.5 line-clamp-2">
                                      {n?.message || ''}
                                    </div>
                                  </div>

                                  {!n?.readAt ? (
                                    <span className="shrink-0 mt-1 inline-flex w-2 h-2 rounded-full bg-indigo-500" />
                                  ) : null}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={openAllNotifications}
                          className="w-full px-4 py-3 text-sm font-semibold text-white/90 bg-white/5 hover:bg-white/8 transition-colors"
                          role="menuitem"
                        >
                          View all
                        </button>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className={`flex items-center gap-1.5 px-3 py-3 bg-red-600/10 border border-red-600/30 text-red-600/90 rounded-lg text-sm font-medium transition-all duration-200 ${isLoading
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
                  className="flex items-center gap-1.5 px-3 lg:px-4 py-3 lg:py-2.5 bg-white/8 text-white/90 no-underline text-xs lg:text-sm font-medium rounded-lg border border-white/12 transition-all duration-200 whitespace-nowrap hover:bg-white/12 hover:text-white"
                >
                  <LogIn size={14} />
                  Sign In
                </Link>

                {/* Register Button */}
                <Link
                  to={ROUTES.REGISTER}
                  className="flex items-center gap-1.5 px-3 lg:px-4 py-3 lg:py-2.5 bg-linear-to-br from-indigo-500 to-purple-500 text-white no-underline text-xs lg:text-sm font-semibold rounded-lg transition-all duration-200  whitespace-nowrap hover:-translate-y-0.5"
                >
                  <UserPlus size={14} />
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Controls: Bell + Hamburger (visible on mobile only) */}
        <div className="md:hidden flex items-center gap-2 shrink-0">
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => navigate(ROUTES.NOTIFICATIONS)}
              className="relative flex items-center justify-center w-10 h-10 bg-white/5 rounded-lg border border-white/8 text-white/90 transition-all duration-200 hover:bg-white/10"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1.5 rounded-full bg-indigo-500 text-white text-[11px] font-bold flex items-center justify-center border-2 border-[rgba(10,10,15,0.9)]">
                  {unreadCount > 99 ? '99+' : String(unreadCount)}
                </span>
              ) : null}
            </button>
          )}
          <button
            className="flex items-center justify-center w-10 h-10 bg-white/5 border border-white/8 text-white rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed top-17.5 left-0 right-0 bottom-0 bg-[rgba(10,10,15,0.98)] backdrop-blur-xl p-6 z-[1001] overflow-y-auto"
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

            {/* Mobile Notifications */}
            {isAuthenticated ? (
              <Link
                to={ROUTES.NOTIFICATIONS}
                className={`flex items-center justify-between gap-3 px-5 py-4 no-underline text-base font-medium rounded-xl transition-all duration-200 mb-2 ${location.pathname === ROUTES.NOTIFICATIONS
                  ? 'text-white bg-linear-to-br from-indigo-500/20 to-purple-500/15 border border-indigo-500/30 shadow-[0_4px_20px_rgba(99,102,241,0.15)]'
                  : 'text-white/80 bg-white/3 border border-white/8 hover:bg-white/8'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <Bell size={20} />
                  Notifications
                </span>
                {unreadCount > 0 ? (
                  <span className="min-w-6 h-6 px-2 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center">
                    {unreadCount > 99 ? '99+' : String(unreadCount)}
                  </span>
                ) : null}
              </Link>
            ) : null}

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
    </>
  );
};

export default Header;
