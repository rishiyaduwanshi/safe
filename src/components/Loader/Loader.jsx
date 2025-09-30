import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme.js';

/**
 * Animated Loading Component with multiple variants
 */
const Loader = ({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  text = '',
  fullScreen = false,
  className = '',
}) => {
  // Size variants
  const sizes = {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };

  // Dark theme color variants with glow effects
  const colors = {
    primary: {
      color: theme.colors.primary.main,
      glow: `0 0 20px ${theme.colors.primary.main}40, 0 0 40px ${theme.colors.primary.main}20`,
    },
    secondary: {
      color: theme.colors.text.secondary,
      glow: `0 0 15px ${theme.colors.text.secondary}30`,
    },
    success: {
      color: theme.colors.status.success,
      glow: `0 0 20px ${theme.colors.status.success}40`,
    },
    warning: {
      color: theme.colors.status.warning,
      glow: `0 0 20px ${theme.colors.status.warning}40`,
    },
    danger: {
      color: theme.colors.status.error,
      glow: `0 0 20px ${theme.colors.status.error}40`,
    },
    electric: {
      color: theme.colors.primary.main,
      glow: (theme?.shadows?.electric || '0 8px 24px 0 rgba(99, 102, 241, 0.4)').replace('box-shadow: ', ''),
    },
  };

  const loaderSize = sizes[size];
  const loaderColor = colors[color];

  // Dark theme container styles
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[4],
    ...(fullScreen && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(10, 10, 15, 0.95)',
      backdropFilter: 'blur(10px)',
      zIndex: theme.zIndex.overlay,
    }),
  };

  const textStyles = {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.fontWeight.medium,
  };

  // Dark Theme Spinner Loader with Glow
  const SpinnerLoader = () => (
    <motion.div
      style={{
        width: loaderSize,
        height: loaderSize,
        border: `3px solid ${theme.colors.border.default}`,
        borderTop: `3px solid ${loaderColor.color}`,
        borderRadius: '50%',
        boxShadow: loaderColor.glow,
        filter: `drop-shadow(0 0 10px ${loaderColor.color}40)`,
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="loader-spinner"
    />
  );

  // Dark Theme Dots Loader with Glow
  const DotsLoader = () => (
    <div
      style={{
        display: 'flex',
        gap: theme.spacing[2],
      }}
      className="loader-dots"
    >
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          style={{
            width: loaderSize / 3,
            height: loaderSize / 3,
            backgroundColor: loaderColor.color,
            borderRadius: '50%',
            boxShadow: loaderColor.glow,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );

  // Dark Theme Pulse Loader with Electric Glow
  const PulseLoader = () => (
    <motion.div
      style={{
        width: loaderSize,
        height: loaderSize,
        backgroundColor: loaderColor.color,
        borderRadius: '50%',
        boxShadow: loaderColor.glow,
        filter: `drop-shadow(0 0 15px ${loaderColor.color}60)`,
      }}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: 'easeInOut',
        ease: 'easeInOut',
      }}
      className="loader-pulse"
    />
  );

  // Bars Loader
  const BarsLoader = () => (
    <div
      style={{
        display: 'flex',
        gap: theme.spacing[1],
        alignItems: 'flex-end',
        height: loaderSize,
      }}
      className="loader-bars"
    >
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          style={{
            width: loaderSize / 6,
            backgroundColor: loaderColor,
            borderRadius: theme.borderRadius.sm,
          }}
          animate={{
            height: [`${loaderSize * 0.3}px`, `${loaderSize}px`, `${loaderSize * 0.3}px`],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );

  // Ring Loader
  const RingLoader = () => (
    <motion.div
      style={{
        width: loaderSize,
        height: loaderSize,
        border: `3px solid ${theme.colors.neutral.gray[200]}`,
        borderRadius: '50%',
        position: 'relative',
      }}
      className="loader-ring"
    >
      <motion.div
        style={{
          position: 'absolute',
          top: -3,
          left: -3,
          width: loaderSize,
          height: loaderSize,
          border: `3px solid transparent`,
          borderTop: `3px solid ${loaderColor}`,
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );

  // Render appropriate loader variant
  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return <DotsLoader />;
      case 'pulse':
        return <PulseLoader />;
      case 'bars':
        return <BarsLoader />;
      case 'ring':
        return <RingLoader />;
      case 'spinner':
      default:
        return <SpinnerLoader />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={containerStyles}
      className={`loader loader--${variant} loader--${size} ${className}`}
    >
      {renderLoader()}
      {text && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={textStyles}
          className="loader-text"
        >
          {text}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Loader;