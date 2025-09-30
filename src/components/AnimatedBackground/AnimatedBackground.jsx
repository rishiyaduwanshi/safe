import { motion } from 'framer-motion';
import { theme } from '../../styles/theme.js';

const AnimatedBackground = ({
  variant = 'hero', // hero, section, subtle
  children,
  className = '',
  ...props
}) => {
  // Floating particle variants
  const particleVariants = {
    float: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.1, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  // Background styles based on variant
  const backgroundStyles = {
    hero: {
      background: theme.colors.background.gradient,
      position: 'relative',
      overflow: 'hidden',
    },
    section: {
      background: theme.colors.background.secondary,
      position: 'relative',
      overflow: 'hidden',
    },
    subtle: {
      background: theme.colors.background.primary,
      position: 'relative',
      overflow: 'hidden',
    },
  };

  // Generate floating particles
  const particles = Array.from({ length: variant === 'hero' ? 8 : 4 }, (_, i) => (
    <motion.div
      key={i}
      variants={particleVariants}
      animate="float"
      style={{
        position: 'absolute',
        width: Math.random() * 200 + 100,
        height: Math.random() * 200 + 100,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.colors.primary.glow} 0%, transparent 70%)`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        filter: 'blur(40px)',
        zIndex: 1,
        pointerEvents: 'none',
      }}
      transition={{
        delay: i * 0.5,
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  ));

  // Mesh gradient overlay
  const meshGradient = (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.colors.background.mesh,
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  );

  return (
    <div
      style={backgroundStyles[variant]}
      className={`animated-background ${className}`}
      {...props}
    >

      {particles}
      

      {meshGradient}
      

      <div style={{ position: 'relative', zIndex: 3 }}>
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;