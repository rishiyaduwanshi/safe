import { motion } from 'framer-motion';
import clsx from 'clsx';

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
  // Variant classes using Tailwind
  const variantClasses = {
    primary: 'bg-gradient-to-br from-primary via-primary-light to-tertiary text-white shadow-[0_8px_32px_rgba(99,102,241,0.3),0_0_0_1px_rgba(255,255,255,0.1)_inset] font-bold hover:shadow-[0_12px_40px_rgba(106,90,224,0.4),0_0_0_1px_rgba(255,255,255,0.2)_inset]',
    secondary: 'bg-background-card text-white border-2 border-primary backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] font-semibold',
    outline: 'bg-transparent text-primary border-2 border-primary shadow-[0_0_20px_rgba(99,102,241,0.2)] font-semibold hover:bg-primary/10',
    glass: 'bg-white/5 text-white border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] font-semibold',
    electric: 'bg-gradient-to-br from-primary via-primary-light to-tertiary text-white shadow-[0_0_40px_rgba(99,102,241,0.4),0_8px_32px_rgba(0,0,0,0.3)] font-extrabold relative overflow-hidden animate-glow',
    danger: 'bg-gradient-to-br from-red-500 to-red-400 text-white shadow-[0_8px_24px_rgba(239,68,68,0.4)] font-semibold',
    success: 'bg-gradient-to-br from-green-500 to-emerald-400 text-white shadow-[0_8px_24px_rgba(16,185,129,0.4)] font-semibold',
    neumorphic: 'bg-background-tertiary text-white border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] font-medium',
    glassmorphic: 'bg-white/5 text-white border border-white/10 backdrop-blur-xl saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.3)] font-medium',
    glow: 'bg-gradient-to-br from-primary via-primary-light to-tertiary text-white animate-glow font-bold shadow-[0_0_30px_rgba(99,102,241,0.5)]',
    ghost: 'bg-transparent text-slate-400 border-none shadow-none font-medium hover:text-white',
  };

  // Size classes using Tailwind
  const sizeClasses = {
    xs: 'px-4 py-2 text-sm min-h-[32px] rounded-lg',
    sm: 'px-6 py-3 text-base min-h-[40px] rounded-xl',
    md: 'px-8 py-4 text-lg min-h-[48px] rounded-2xl',
    lg: 'px-12 py-5 text-xl min-h-[56px] rounded-3xl',
    xl: 'px-16 py-6 text-2xl min-h-[64px] rounded-3xl',
  };

  // Animation variants
  const animationVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.03,
      y: -4,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    tap: {
      scale: 0.97,
      y: -1,
      transition: { duration: 0.1 }
    },
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
      className={clsx(
        // Base styles
        'inline-flex items-center justify-center gap-3 relative overflow-hidden outline-none',
        'transition-all duration-300 ease-out tracking-tight select-none',
        // Variant and size
        variantClasses[variant],
        sizeClasses[size],
        // Full width
        fullWidth && 'w-full',
        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        // Custom classes
        className
      )}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
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
        className="absolute inset-0 bg-white/10 rounded-[inherit] opacity-0 pointer-events-none"
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
