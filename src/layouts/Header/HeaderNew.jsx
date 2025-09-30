import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, Home, BarChart3, FileText, User, Info } from 'lucide-react';
import { ROUTES, STRINGS } from '../../constants/index.js';


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
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: BarChart3 },
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
    height: '64px',
    background: scrolled 
      ? 'rgba(10, 10, 15, 0.95)' 
      : 'rgba(10, 10, 15, 0.8)',
    backdropFilter: 'blur(20px)',
    borderBottom: scrolled 
      ? '1px solid rgba(255, 255, 255, 0.1)' 
      : 'none',
    transition: 'all 0.3s ease',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#FFFFFF',
    transition: 'color 0.3s ease',
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  };

  const linkStyle = (isActive) => ({
    color: isActive ? '#6A5AE0' : '#CBD5E1',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'color 0.2s ease',
    padding: '8px 0',
    position: 'relative',
  });

  const mobileMenuStyle = {
    position: 'fixed',
    top: '64px',
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(10, 10, 15, 0.98)',
    backdropFilter: 'blur(30px)',
    padding: '24px',
    zIndex: 999,
  };

  const mobileLinkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '500',
    color: isActive ? '#6A5AE0' : '#CBD5E1',
    background: isActive ? 'rgba(106, 90, 224, 0.1)' : 'transparent',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.2s ease',
    marginBottom: '8px',
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
          <Shield size={28} style={{ color: '#6A5AE0' }} />
          <span className="gradient-text">{STRINGS.APP_NAME}</span>
        </Link>


        <nav style={{ ...navStyle, display: window.innerWidth >= 768 ? 'flex' : 'none' }}>
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={linkStyle(location.pathname === item.path)}
              onMouseEnter={(e) => e.target.style.color = '#6A5AE0'}
              onMouseLeave={(e) => e.target.style.color = location.pathname === item.path ? '#6A5AE0' : '#CBD5E1'}
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: '#6A5AE0',
                    borderRadius: '2px',
                  }}
                  layoutId="activeNav"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>


        <button
          style={{
            display: window.innerWidth < 768 ? 'block' : 'none',
            background: 'none',
            border: 'none',
            color: '#FFFFFF',
            padding: '8px',
            cursor: 'pointer',
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
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={mobileLinkStyle(location.pathname === item.path)}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;