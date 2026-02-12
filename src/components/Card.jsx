import { motion } from 'framer-motion';
import clsx from 'clsx';

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
  // Card variant classes using Tailwind
  const variantClasses = {
    default: 'bg-gradient-to-br from-[rgba(20,20,25,0.95)] to-[rgba(25,25,35,0.9)] shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 backdrop-blur-xl',
    dark: 'bg-gradient-to-br from-[rgba(15,15,20,0.98)] to-[rgba(20,20,30,0.95)] shadow-[0_25px_50px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] border border-white/[0.08] backdrop-blur-[25px]',
    elevated: 'bg-background-card shadow-[0_20px_25px_-5px_rgba(0,0,0,0.4),0_10px_10px_-5px_rgba(0,0,0,0.2)] border border-primary/20 backdrop-blur-[30px]',
    outlined: 'bg-background-primary border-2 border-primary/30 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.4),0_2px_4px_-1px_rgba(0,0,0,0.3)] backdrop-blur-[15px]',
    glass: 'bg-white/5 backdrop-blur-xl saturate-[180%] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
    glow: 'bg-gradient-to-br from-[rgba(20,20,25,0.9)] to-[rgba(25,25,35,0.85)] shadow-[0_0_40px_rgba(106,90,224,0.3),0_20px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] border border-[rgba(106,90,224,0.3)] backdrop-blur-xl',
  };

  // Size classes using Tailwind
  const sizeClasses = {
    sm: 'p-6 rounded-2xl',
    md: 'p-8 rounded-3xl',
    lg: 'p-10 rounded-3xl',
    xl: 'p-12 rounded-3xl',
    full: 'p-8 rounded-3xl w-full',
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
        ? '0 0 60px rgba(106, 90, 224, 0.4), 0 32px 64px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
        : '0 32px 64px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
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

  return (
    <motion.div
      variants={animationVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      className={clsx(
        // Base styles
        'relative overflow-hidden transition-all duration-300 ease-out',
        // Cursor
        clickable ? 'cursor-pointer' : 'cursor-default',
        // Variant
        glassmorphic ? variantClasses.glass : variantClasses[variant],
        // Size
        sizeClasses[size],
        // Gradient override
        gradient && 'bg-gradient-to-br from-tertiary to-secondary-light text-white',
        // Custom classes
        className
      )}
      onClick={clickable ? onClick : undefined}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
          <div className="loading-spinner">Loading...</div>
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default Card;