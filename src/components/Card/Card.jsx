import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { theme } from '../../styles/theme.js';

const Card = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  clickable = false,
  glassmorphic = false,
  gradient = false,
  loading = false,
  onClick,
  ...props
}) => {
  // Card variants
  const variants = {
    default: {
      background: `linear-gradient(145deg, rgba(20, 20, 25, 0.95) 0%, rgba(25, 25, 35, 0.9) 100%)`,
      boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
    },
    dark: {
      background: `linear-gradient(145deg, rgba(15, 15, 20, 0.98) 0%, rgba(20, 20, 30, 0.95) 100%)`,
      boxShadow: `0 25px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
      border: '1px solid rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(25px)',
    },
    elevated: {
      background: `linear-gradient(145deg, rgba(25, 25, 35, 0.9) 0%, rgba(30, 30, 45, 0.85) 100%)`,
      boxShadow: `0 32px 64px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(106, 90, 224, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
      border: '1px solid rgba(106, 90, 224, 0.2)',
      backdropFilter: 'blur(30px)',
    },
    outlined: {
      background: 'rgba(10, 10, 15, 0.6)',
      border: `2px solid rgba(106, 90, 224, 0.3)`,
      boxShadow: `0 8px 32px rgba(0, 0, 0, 0.2), 0 0 20px rgba(106, 90, 224, 0.1)`,
      backdropFilter: 'blur(15px)',
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
      backdropFilter: 'blur(25px)',
    },
    glow: {
      background: `linear-gradient(145deg, rgba(20, 20, 25, 0.9) 0%, rgba(25, 25, 35, 0.85) 100%)`,
      boxShadow: `0 0 40px rgba(106, 90, 224, 0.3), 0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
      border: '1px solid rgba(106, 90, 224, 0.3)',
      backdropFilter: 'blur(20px)',
    },
  };

  // Size variants
  const sizes = {
    sm: { 
      padding: theme.spacing[6],
      borderRadius: '16px',
    },
    md: { 
      padding: theme.spacing[8],
      borderRadius: '20px',
    },
    lg: { 
      padding: theme.spacing[10],
      borderRadius: '24px',
    },
    xl: { 
      padding: theme.spacing[12],
      borderRadius: '28px',
    },
  };

  // Animation variants
  const animationVariants = {
    initial: { opacity: 0, y: 30, scale: 0.92 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    hover: clickable ? {
      scale: 1.03,
      y: -8,
      boxShadow: variant === 'glow' 
        ? `0 0 60px rgba(106, 90, 224, 0.4), 0 32px 64px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)`
        : `0 32px 64px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
      transition: { duration: 0.3, ease: 'easeOut' }
    } : {
      y: -2,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    tap: clickable ? {
      scale: 0.98,
      y: -2,
      transition: { duration: 0.15 }
    } : {},
  };

  const cardStyles = {
    borderRadius: sizes[size].borderRadius || theme.borderRadius.xl,
    position: 'relative',
    overflow: 'hidden',
    cursor: clickable ? 'pointer' : 'default',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    ...variants[glassmorphic ? 'glass' : variant],
    ...sizes[size],
    ...(gradient && {
      background: `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.secondary} 100%)`,
      color: theme.colors.neutral.white,
    }),
  };

  return (
    <motion.div
      variants={animationVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      style={cardStyles}
      className={clsx('card', className)}
      onClick={clickable ? onClick : undefined}
      {...props}
    >
      {loading && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <div className="loading-spinner">Loading...</div>
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default Card;