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
  Info 
} from 'lucide-react';
import { theme } from '../styles/theme.js';
import { ROUTES, STRINGS } from '../constants/index.js';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: TrendingUp },
    { name: 'Report', path: ROUTES.REPORT, icon: FileText },
    { name: 'Profile', path: ROUTES.PROFILE, icon: User },
    { name: 'About', path: ROUTES.ABOUT, icon: Info },
  ];

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: '70px',
    background: scrolled 
      ? 'rgba(10, 10, 15, 0.98)' 
      : 'rgba(10, 10, 15, 0.85)',
    backdropFilter: scrolled ? 'blur(32px)' : 'blur(16px)',
    borderBottom: scrolled 
      ? '1px solid rgba(255, 255, 255, 0.12)' 
      : '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    WebkitBackdropFilter: scrolled ? 'blur(32px)' : 'blur(16px)',
    boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none',
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 clamp(16px, 4vw, 24px)',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'clamp(8px, 2vw, 16px)',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    fontSize: 'clamp(16px, 4vw, 20px)',
    fontWeight: '700',
    fontFamily: theme.typography.fontFamily.heading.join(', '),
    color: '#FFFFFF',
    transition: 'opacity 0.2s ease',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(4px, 1vw, 8px)',
    background: 'rgba(255, 255, 255, 0.05)',
    padding: 'clamp(4px, 1vw, 6px)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    flexShrink: 0,
  };

  const linkStyle = (isActive) => ({
    color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: theme.typography.fontFamily.primary.join(', '),
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    padding: '8px 16px',
    borderRadius: '8px',
    position: 'relative',
    background: isActive ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
    border: isActive ? '1px solid rgba(255, 255, 255, 0.16)' : '1px solid transparent',
    ':hover': {
      color: '#FFFFFF',
      background: 'rgba(255, 255, 255, 0.08)',
    },
  });

  const mobileMenuStyle = {
    position: 'fixed',
    top: '70px',
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(10, 10, 15, 0.98)',
    backdropFilter: 'blur(24px)',
    padding: '24px',
    zIndex: 999,
    WebkitBackdropFilter: 'blur(24px)',
  };

  const mobileLinkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    fontFamily: theme.typography.fontFamily.primary.join(', '),
    color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
    background: isActive 
      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)' 
      : 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
    border: isActive 
      ? '1px solid rgba(99, 102, 241, 0.3)' 
      : '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    marginBottom: '8px',
    boxShadow: isActive ? '0 4px 20px rgba(99, 102, 241, 0.15)' : 'none',
  });

  return (
    <motion.header
      style={headerStyle}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div style={containerStyle}>

        <Link to="/" style={logoStyle}>
          <Shield size={28} style={{ color: theme.colors.primary.main }} />
          <span className="gradient-text">{STRINGS.APP_NAME}</span>
        </Link>


        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 20px)', flex: 1, justifyContent: 'flex-end' }}>
          <nav style={{ ...navStyle, display: window.innerWidth >= 768 ? 'flex' : 'none' }}>
            {navigation.filter(item => item.path !== '/dashboard').map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={linkStyle(location.pathname === item.path)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <Link 
            to="/dashboard"
            style={{
              display: window.innerWidth >= 768 ? 'flex' : 'none',
              alignItems: 'center',
              gap: '8px',
              padding: 'clamp(8px, 2vw, 10px) clamp(16px, 4vw, 20px)',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: 'clamp(12px, 3vw, 14px)',
              fontWeight: '600',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.3)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 6px 20px 0 rgba(99, 102, 241, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 14px 0 rgba(99, 102, 241, 0.3)';
            }}
          >
            <TrendingUp size={16} />
            Dashboard
          </Link>
        </div>

        <button
          style={{
            display: window.innerWidth < 768 ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#FFFFFF',
            padding: '10px',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>


      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            style={mobileMenuStyle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={mobileLinkStyle(location.pathname === item.path)}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {IconComponent && <IconComponent size={20} />}
                  {item.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
