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
    height: theme.componentSizes.header.height,
    background: scrolled 
      ? `${theme.colors.background.primary}F2` 
      : `${theme.colors.background.primary}CC`,
    backdropFilter: 'blur(20px)',
    borderBottom: scrolled 
      ? '1px solid rgba(255, 255, 255, 0.1)' 
      : 'none',
    transition: 'all 0.3s ease',
  };

  const containerStyle = {
    maxWidth: theme.containers.xl,
    margin: '0 auto',
    padding: `0 ${theme.spacing[6]}`,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
    textDecoration: 'none',
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    fontFamily: theme.typography.fontFamily.heading.join(', '),
    color: theme.colors.text.primary,
    transition: 'color 0.3s ease',
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[8],
  };

  const linkStyle = (isActive) => ({
    color: isActive ? theme.colors.primary.main : theme.colors.text.secondary,
    textDecoration: 'none',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily.primary.join(', '),
    transition: 'color 0.2s ease',
    padding: `${theme.spacing[2]} 0`,
    position: 'relative',
  });

  const mobileMenuStyle = {
    position: 'fixed',
    top: theme.componentSizes.header.height,
    left: 0,
    right: 0,
    bottom: 0,
    background: `${theme.colors.background.primary}FA`,
    backdropFilter: 'blur(30px)',
    padding: theme.spacing[6],
    zIndex: 999,
  };

  const mobileLinkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
    padding: theme.spacing[4],
    textDecoration: 'none',
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily.primary.join(', '),
    color: isActive ? theme.colors.primary.main : theme.colors.text.secondary,
    background: isActive ? 'rgba(106, 90, 224, 0.1)' : 'transparent',
    borderRadius: theme.borderRadius.xl,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.2s ease',
    marginBottom: theme.spacing[2],
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


        <nav style={{ ...navStyle, display: window.innerWidth >= 768 ? 'flex' : 'none' }}>
          {navigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={linkStyle(location.pathname === item.path)}
              onMouseEnter={(e) => e.target.style.color = theme.colors.primary.main}
              onMouseLeave={(e) => e.target.style.color = location.pathname === item.path ? theme.colors.primary.main : theme.colors.text.secondary}
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: theme.borderWidth.default,
                    background: theme.colors.primary.main,
                    borderRadius: theme.borderRadius.sm,
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
            color: theme.colors.text.primary,
            padding: theme.spacing[2],
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
