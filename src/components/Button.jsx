import { motion } from 'framer-motion';
import clsx from 'clsx';
import { theme } from '../styles/theme.js';

const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const variants = {
    primary: {
      background: theme.colors.primary.gradient,
      color: theme.colors.neutral.white,
      border: 'none',
      boxShadow: `0 8px 32px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset`,
      fontWeight: theme.typography.fontWeight.bold,
    },
    secondary: {
      background: theme.colors.background.card,
      color: theme.colors.text.primary,
      border: `2px solid ${theme.colors.primary.main}`,
      boxShadow: `0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
      backdropFilter: 'blur(20px)',
      fontWeight: theme.typography.fontWeight.semibold,
    },
    outline: {
      background: 'transparent',
      color: theme.colors.primary.main,
      border: `2px solid ${theme.colors.primary.main}`,
      boxShadow: `0 0 20px rgba(99, 102, 241, 0.2)`,
      fontWeight: theme.typography.fontWeight.semibold,
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.05)',
      color: theme.colors.text.primary,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
      fontWeight: theme.typography.fontWeight.semibold,
    },
    electric: {
      background: `linear-gradient(135deg, ${theme.colors.primary.main} 0%, ${theme.colors.primary.light} 50%, ${theme.colors.accent.purple} 100%)`,
      color: theme.colors.neutral.white,
      border: 'none',
      boxShadow: `0 0 40px rgba(99, 102, 241, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)`,
      fontWeight: theme.typography.fontWeight.extrabold,
      position: 'relative',
      overflow: 'hidden',
    },
    danger: {
      background: `linear-gradient(135deg, ${theme.colors.safety.red}, ${theme.colors.accent.red})`,
      color: theme.colors.neutral.white,
      border: 'none',
      boxShadow: theme.shadows.danger,
      fontWeight: theme.typography.fontWeight.semibold,
    },
    success: {
      background: `linear-gradient(135deg, ${theme.colors.safety.green}, ${theme.colors.accent.green})`,
      color: theme.colors.neutral.white,
      border: 'none',
      boxShadow: theme.shadows.success,
      fontWeight: theme.typography.fontWeight.semibold,
    },
    neumorphic: {
      background: theme.colors.background.tertiary,
      color: theme.colors.text.primary,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: theme.shadows.inner,
      fontWeight: theme.typography.fontWeight.medium,
    },
    glassmorphic: {
      ...theme.glassmorphism.light,
      color: theme.colors.text.primary,
      fontWeight: theme.typography.fontWeight.medium,
    },
    glow: {
      background: theme.colors.primary.gradient,
      color: theme.colors.neutral.white,
      border: 'none',
      boxShadow: theme.shadows.glow,
      animation: 'glow 2s ease-in-out infinite alternate',
      fontWeight: theme.typography.fontWeight.bold,
    },
    ghost: {
      background: 'transparent',
      color: theme.colors.text.secondary,
      border: 'none',
      boxShadow: 'none',
      fontWeight: theme.typography.fontWeight.medium,
    },
  };

  // Size variants
  const sizes = {
    xs: {
      padding: `${theme.spacing[2]} ${theme.spacing[4]}`,
      fontSize: theme.typography.fontSize.sm,
      minHeight: theme.componentSizes.button.xs,
      borderRadius: theme.borderRadius.lg,
    },
    sm: {
      padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
      fontSize: theme.typography.fontSize.base,
      minHeight: theme.componentSizes.button.sm,
      borderRadius: theme.borderRadius.xl,
    },
    md: {
      padding: `${theme.spacing[4]} ${theme.spacing[8]}`,
      fontSize: theme.typography.fontSize.lg,
      minHeight: theme.componentSizes.button.md,
      borderRadius: theme.borderRadius['2xl'],
    },
    lg: {
      padding: `${theme.spacing[5]} ${theme.spacing[12]}`,
      fontSize: theme.typography.fontSize.xl,
      minHeight: theme.componentSizes.button.lg,
      borderRadius: theme.borderRadius['3xl'],
    },
    xl: {
      padding: `${theme.spacing[6]} ${theme.spacing[16]}`,
      fontSize: theme.typography.fontSize['2xl'],
      minHeight: theme.componentSizes.button.xl,
      borderRadius: theme.borderRadius['3xl'],
    },
  };

  // Animation variants - More dramatic like onified.ai
  const animationVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.03,
      y: -4,
      boxShadow: variant === 'electric' 
        ? `0 0 60px rgba(106, 90, 224, 0.6), 0 12px 40px rgba(0, 0, 0, 0.4)`
        : variant === 'primary'
        ? `0 12px 40px rgba(106, 90, 224, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2) inset`
        : `0 12px 32px rgba(0, 0, 0, 0.3)`,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    tap: {
      scale: 0.97,
      y: -1,
      transition: { duration: 0.1 }
    },
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    }
  };

  const buttonStyles = {
    borderRadius: sizes[size].borderRadius || theme.borderRadius.xl,
    fontFamily: theme.typography.fontFamily.display?.join(', ') || theme.typography.fontFamily.primary.join(', '),
    fontWeight: variants[variant].fontWeight || theme.typography.fontWeight.bold,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[3],
    width: fullWidth ? '100%' : 'auto',
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Premium easing
    position: 'relative',
    overflow: 'hidden',
    outline: 'none',
    textDecoration: 'none',
    letterSpacing: '-0.02em', // Tighter letter spacing for premium feel
    textTransform: size === 'xl' || size === 'lg' ? 'none' : 'none', // Keep natural casing
    userSelect: 'none',
    ...variants[variant],
    ...sizes[size],
    ...(disabled && {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    }),
  };

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <motion.button
      variants={animationVariants}
      initial="initial"
      whileHover={!disabled && !loading ? "hover" : undefined}
      whileTap={!disabled && !loading ? "tap" : undefined}
      style={buttonStyles}
      className={clsx('button', `button--${variant}`, `button--${size}`, className)}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
      {...props}
    >

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            width: theme.componentSizes.icon.sm,
            height: theme.componentSizes.icon.sm,
            border: '2px solid currentColor',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      )}

      {icon && iconPosition === 'left' && !loading && (
        <span className="button-icon">{icon}</span>
      )}


      {!loading && children}

      {icon && iconPosition === 'right' && !loading && (
        <span className="button-icon">{icon}</span>
      )}


      <motion.div
        className="button-ripple"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 'inherit',
          opacity: 0,
          pointerEvents: 'none',
        }}
        whileTap={{
          opacity: 1,
          scale: 1.2,
          transition: { duration: 0.15 }
        }}
      />
    </motion.button>
  );
};

export default Button;
