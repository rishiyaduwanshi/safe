import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  LayoutDashboard,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useModAuth } from '../contexts/ModAuthContext.jsx';
import { MOD_ROUTES } from '../constants/routes.js';

const NAV_ITEMS = [
  { label: 'Dashboard', path: MOD_ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'All Reports', path: MOD_ROUTES.REPORTS, icon: FileText },
];

const Sidebar = ({ open, onClose }) => {
  const { moderator, signout, isAuthenticated } = useModAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    await signout();
    navigate(MOD_ROUTES.LOGIN);
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed top-0 left-0 h-full w-64 z-50 flex flex-col lg:translate-x-0 lg:static lg:z-auto"
        style={{ background: '#0d0d14', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <Shield size={24} className="text-indigo-400 shrink-0" />
          <div>
            <p className="text-white font-bold text-sm leading-tight">S.A.F.E India</p>
            <p className="text-xs text-slate-500">Moderator Panel</p>
          </div>
          <button onClick={onClose} className="ml-auto lg:hidden text-slate-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Moderator info */}
        <div className="px-4 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-sm font-bold text-indigo-300">
              {moderator?.name?.charAt(0)?.toUpperCase() ?? 'M'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{moderator?.name ?? 'Moderator'}</p>
              <p className="text-xs text-slate-500 truncate">{moderator?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                  ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`
              }
            >
              <item.icon size={17} className="shrink-0" />
              <span>{item.label}</span>
              <ChevronRight size={14} className="ml-auto opacity-40" />
            </NavLink>
          ))}
        </nav>

        {/* Signout */}
        {isAuthenticated && (
          <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <button
              onClick={handleSignout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/8 border border-transparent transition-all duration-200"
            >
              <LogOut size={17} />
              Sign Out
            </button>
          </div>
        )}
      </motion.aside>
    </>
  );
};

const ModLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0A0A0F] text-white overflow-hidden">
      {/* Desktop static sidebar */}
      <div className="hidden lg:flex">
        <Sidebar open={true} onClose={() => { }} />
      </div>

      {/* Mobile animated sidebar */}
      <div className="lg:hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar (mobile only) */}
        <header
          className="lg:hidden flex items-center gap-3 px-4 h-14 border-b shrink-0"
          style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#0d0d14' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-sm">
            <Shield size={18} className="text-indigo-400" />
            Moderator Panel
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ModLayout;
