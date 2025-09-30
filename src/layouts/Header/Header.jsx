import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Shield, 
  Home, 
  BarChart3, 
  AlertTriangle, 
  User, 
  Info,
  Settings,
  LogOut 
} from 'lucide-react';
import { theme } from '../../styles/theme.js';
import { STRINGS, ROUTES, MENU_ITEMS } from '../../constants/index.js';
import Button from '../../components/Button/Button.jsx';

/**
 * Navigation Header Component
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Clean & Modern Header
  const headerStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '70px', // Slightly shorter for cleaner look
    background: 'rgba(10, 10, 15, 0.95)', // Solid dark background
    backdropFilter: 'blur(20px) saturate(150%)',
    borderBottom: `1px solid rgba(255, 255, 255, 0.08)`, // Ultra-subtle border
    zIndex: theme?.zIndex?.sticky || 1100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 clamp(2rem, 6vw, 4rem)`,
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme?.spacing?.[2] || '0.5rem',
    fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', // Smaller, more refined
    fontWeight: '700', // Less heavy, more elegant
    color: '#FFFFFF',
    textDecoration: 'none',
    letterSpacing: '-0.01em', // Tighter letter spacing
    transition: 'all 0.3s ease',
  };

  const navStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(1.5rem, 4vw, 2.5rem)',
  };


  const menuItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.6rem 1rem', // Cleaner padding
    borderRadius: '8px', // Subtle rounding
    textDecoration: 'none',
    color: 'rgba(255, 255, 255, 0.7)', // Subtle text
    fontSize: '0.9rem', // Perfect size
    fontWeight: '500',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth transition
    position: 'relative',
    '&:hover': {
      color: '#FFFFFF',
      background: 'rgba(255, 255, 255, 0.05)',
    },
  };


  const activeMenuItemStyles = {
    ...menuItemStyles,
    color: '#FFFFFF',
    background: 'rgba(255, 255, 255, 0.08)',
    fontWeight: '600',
  };

  const mobileMenuStyles = {
    position: 'fixed',
    top: '70px',
    left: 0,
    right: 0,
    background: 'rgba(10, 10, 15, 0.98)',
    backdropFilter: 'blur(20px)',
    border: 'none',
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '1.5rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  };

  const getIcon = (iconName) => {
    const icons = {
      Home, BarChart3, AlertTriangle, User, Info
    };
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent size={18} /> : null;
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={headerStyles}
        className="header"
      >
        {/* Logo */}
        <NavLink to={ROUTES.HOME} style={logoStyles} className="logo">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Shield size={24} strokeWidth={2.5} />
            <span style={{ 
              fontWeight: '700',
              fontSize: '1.2rem',
              letterSpacing: '-0.02em',
            }}>
              {STRINGS.APP_NAME}
            </span>
          </motion.div>
        </NavLink>

        {/* Desktop Navigation */}
        <nav style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          '@media (maxWidth: 768px)': { display: 'none' }
        }}>
          <div style={navStyles}>
            {MENU_ITEMS.slice(1, 4).map((item) => ( // Show only key items
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <NavLink
                  to={item.path}
                  style={location.pathname === item.path ? activeMenuItemStyles : menuItemStyles}
                  className="nav-item"
                >
                  <span>{item.label}</span>
                </NavLink>
              </motion.div>
            ))}
          </div>
          

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '0.6rem 1.2rem',
              color: '#FFFFFF',
              fontSize: '0.9rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
          >
            Get Started
          </motion.button>
        </nav>


        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            cursor: 'pointer',
            padding: '0.5rem',
            color: '#FFFFFF',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
          }}
          className="mobile-menu-button md:hidden"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </motion.header>


      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={mobileMenuStyles}
          className="mobile-menu md:hidden"
        >
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              style={location.pathname === item.path ? activeMenuItemStyles : menuItemStyles}
              className="mobile-nav-item"
            >
              {getIcon(item.icon)}
              <span>{item.label}</span>
            </NavLink>
          ))}
          
          <div style={{ marginTop: theme.spacing[4] }}>
            <Button
              variant="primary"
              size="md"
              fullWidth
              icon={<User size={18} />}
            >
              Login
            </Button>
          </div>
        </motion.nav>
      )}


      <div style={{ height: '80px' }} />
    </>
  );
};

export default Header;