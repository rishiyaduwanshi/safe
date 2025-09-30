import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { theme } from '../../styles/theme.js';
import { STRINGS, ROUTES } from '../../constants/index.js';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerStyles = {
    background: theme?.colors?.background?.secondary || '#111118',
    color: theme?.colors?.text?.primary || '#F8FAFC',
    padding: `${theme?.spacing?.[16] || '4rem'} ${theme?.spacing?.[6] || '1.5rem'} ${theme?.spacing?.[8] || '2rem'}`,
    marginTop: 'auto',
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme?.spacing?.[12] || '3rem',
    marginBottom: theme?.spacing?.[12] || '3rem',
  };

  const sectionTitleStyles = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    marginBottom: theme.spacing[4],
    color: theme.colors.neutral.white,
  };

  const linkStyles = {
    color: theme.colors.neutral.gray[300],
    textDecoration: 'none',
    fontSize: theme.typography.fontSize.sm,
    transition: theme.animations.transition.normal,
    display: 'block',
    marginBottom: theme.spacing[2],
  };

  const socialIconStyles = {
    color: theme.colors.neutral.gray[300],
    transition: theme.animations.transition.normal,
    cursor: 'pointer',
  };

  const dividerStyles = {
    height: '1px',
    background: theme.colors.neutral.gray[700],
    margin: `${theme.spacing[8]} 0`,
  };

  const bottomStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing[4],
    textAlign: 'center',
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.neutral.white,
    marginBottom: theme.spacing[4],
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={footerStyles}
      className="footer"
    >
      <div style={containerStyles}>

        <div style={gridStyles}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div style={logoStyles}>
              <Shield size={28} />
              <span>{STRINGS.APP_NAME}</span>
            </div>
            <p style={{ 
              color: theme.colors.neutral.gray[300], 
              lineHeight: theme.typography.lineHeight.relaxed,
              marginBottom: theme.spacing[4],
            }}>
              {STRINGS.APP_DESCRIPTION}
            </p>
            <div style={{ display: 'flex', gap: theme.spacing[4] }}>
              {[Github, Twitter, Linkedin, Mail].map((Icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.2, 
                    color: theme.colors.primary.light 
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} style={socialIconStyles} />
                </motion.div>
              ))}
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 style={sectionTitleStyles}>Quick Links</h3>
            <nav>
              <Link 
                to={ROUTES.HOME} 
                style={linkStyles}
                onMouseEnter={(e) => e.target.style.color = theme.colors.primary.light}
                onMouseLeave={(e) => e.target.style.color = theme.colors.neutral.gray[300]}
              >
                Home
              </Link>
              <Link 
                to={ROUTES.DASHBOARD} 
                style={linkStyles}
                onMouseEnter={(e) => e.target.style.color = theme.colors.primary.light}
                onMouseLeave={(e) => e.target.style.color = theme.colors.neutral.gray[300]}
              >
                Dashboard
              </Link>
              <Link 
                to={ROUTES.REPORT} 
                style={linkStyles}
                onMouseEnter={(e) => e.target.style.color = theme.colors.primary.light}
                onMouseLeave={(e) => e.target.style.color = theme.colors.neutral.gray[300]}
              >
                Report Hazard
              </Link>
              <Link 
                to={ROUTES.ABOUT} 
                style={linkStyles}
                onMouseEnter={(e) => e.target.style.color = theme.colors.primary.light}
                onMouseLeave={(e) => e.target.style.color = theme.colors.neutral.gray[300]}
              >
                About Us
              </Link>
            </nav>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 style={sectionTitleStyles}>Legal</h3>
            <nav>
              <Link 
                to={ROUTES.PRIVACY} 
                style={linkStyles}
                onMouseEnter={(e) => e.target.style.color = theme.colors.primary.light}
                onMouseLeave={(e) => e.target.style.color = theme.colors.neutral.gray[300]}
              >
                Privacy Policy
              </Link>
              <Link 
                to={ROUTES.TERMS} 
                style={linkStyles}
                onMouseEnter={(e) => e.target.style.color = theme.colors.primary.light}
                onMouseLeave={(e) => e.target.style.color = theme.colors.neutral.gray[300]}
              >
                Terms of Service
              </Link>
              <Link 
                to={ROUTES.CONTACT} 
                style={linkStyles}
                onMouseEnter={(e) => e.target.style.color = theme.colors.primary.light}
                onMouseLeave={(e) => e.target.style.color = theme.colors.neutral.gray[300]}
              >
                Contact Us
              </Link>
            </nav>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 style={sectionTitleStyles}>Contact</h3>
            <div style={{ color: theme.colors.neutral.gray[300] }}>
              <p style={{ marginBottom: theme.spacing[2] }}>
                Email: support@safeindia.gov.in
              </p>
              <p style={{ marginBottom: theme.spacing[2] }}>
                Phone: +91-11-1234-5678
              </p>
              <p>
                Address: New Delhi, India
              </p>
            </div>
          </motion.div>
        </div>


        <div style={dividerStyles} />


        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={bottomStyles}
        >
          <p style={{ 
            color: theme.colors.neutral.gray[400],
            fontSize: theme.typography.fontSize.sm,
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing[2],
          }}>
            © {currentYear} {STRINGS.APP_NAME}. Made with 
            <motion.span
              animate={{ 
                color: [
                  theme.colors.safety.red, 
                  theme.colors.accent.pink, 
                  theme.colors.safety.red
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart size={16} fill="currentColor" />
            </motion.span>
            for a safer India
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;