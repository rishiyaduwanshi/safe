import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme.js';

/**
 * Premium Input Component with Dark Theme
 */
const Input = forwardRef(({ 
  variant = 'default',
  size = 'md',
  label,
  error,
  success,
  icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  className = '',
  style = {},
  ...props 
}, ref) => {
  
  // Size configurations
  const sizeConfig = {
    sm: {
      height: '40px',
      padding: icon ? '0 16px 0 44px' : '0 16px',
      fontSize: theme.typography.fontSize.sm,
      iconSize: 18,
    },
    md: {
      height: '48px',
      padding: icon ? '0 20px 0 52px' : '0 20px',
      fontSize: theme.typography.fontSize.base,
      iconSize: 20,
    },
    lg: {
      height: '56px',
      padding: icon ? '0 24px 0 60px' : '0 24px',
      fontSize: theme.typography.fontSize.lg,
      iconSize: 22,
    },
  };

  // Dark theme variants
  const variantStyles = {
    default: {
      background: theme?.colors?.background?.input || '#1A1A2E',
      border: `1px solid ${theme.colors.border.default}`,
      color: theme.colors.text.primary,
    },
    glass: {
      background: theme?.colors?.background?.glass || 'rgba(30, 30, 58, 0.5)',
      border: `1px solid ${theme?.colors?.border?.glass || 'rgba(255, 255, 255, 0.1)'}`,
      backdropFilter: 'blur(10px)',
      color: theme.colors.text.primary,
    },
    electric: {
      background: theme.colors.background.card,
      border: `2px solid ${theme.colors.primary.main}40`,
      color: theme.colors.text.primary,
      boxShadow: `0 0 20px ${theme.colors.primary.main}15`,
    },
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantStyles[variant];

  // Base input styles
  const inputStyles = {
    width: fullWidth ? '100%' : 'auto',
    height: currentSize.height,
    padding: iconPosition === 'right' && icon ? 
      '0 52px 0 20px' : currentSize.padding,
    fontSize: currentSize.fontSize,
    fontWeight: theme.typography.fontWeight.medium,
    border: currentVariant.border,
    borderRadius: theme.borderRadius.xl,
    background: currentVariant.background,
    color: currentVariant.color,
    backdropFilter: currentVariant.backdropFilter || 'none',
    boxShadow: currentVariant.boxShadow || 'none',
    outline: 'none',
    transition: theme.animations.transition.smooth,
    fontFamily: theme.typography.fontFamily.body.join(', '),
    ...style,
  };

  // Container styles
  const containerStyles = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[2],
    width: fullWidth ? '100%' : 'auto',
  };

  // Icon styles
  const iconStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [iconPosition === 'right' ? 'right' : 'left']: '16px',
    color: theme.colors.text.secondary,
    pointerEvents: 'none',
    zIndex: 2,
  };

  // Label styles
  const labelStyles = {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  };

  // Error/Success message styles
  const errorStyles = {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    marginTop: theme.spacing[1],
    color: theme.colors.status.error,
  };

  const successStyles = {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    marginTop: theme.spacing[1],
    color: theme.colors.status.success,
  };

  // Dynamic input styles based on state
  const getStateStyles = () => {
    if (error) {
      return {
        border: `1px solid ${theme.colors.status.error}`,
        boxShadow: `0 0 0 3px ${theme.colors.status.error}20`,
      };
    }
    if (success) {
      return {
        border: `1px solid ${theme.colors.status.success}`,
        boxShadow: `0 0 0 3px ${theme.colors.status.success}20`,
      };
    }
    return {};
  };

  return (
    <div style={containerStyles} className={`input-container ${className}`}>
      {label && <label style={labelStyles}>{label}</label>}
      
      <div style={{ position: 'relative' }}>
        {icon && (
          <div style={iconStyles}>
            {React.cloneElement(icon, { size: currentSize.iconSize })}
          </div>
        )}
        
        <motion.input
          ref={ref}
          style={{
            ...inputStyles,
            ...getStateStyles(),
          }}
          disabled={disabled}
          whileFocus={{
            scale: 1.01,
            transition: { duration: 0.2 }
          }}
          {...props}
        />
      </div>
      
      {error && <div style={errorStyles}>{error}</div>}
      {success && <div style={successStyles}>{success}</div>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;