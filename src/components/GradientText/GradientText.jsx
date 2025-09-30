import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme.js';

const GradientText = ({
  children,
  gradient = 'primary',
  animate = false,
  size = 'inherit',
  weight = 'inherit',
  className = '',
  ...props
}) => {
  // Gradient options
  const gradients = {
    primary: theme.colors.primary.gradient,
    accent: 'linear-gradient(135deg, #A78BFA 0%, #EC4899 100%)',
    success: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    warning: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
    electric: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
  };

  // Animation variants
  const textVariants = {
    static: {},
    shimmer: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const textStyle = {
    background: gradients[gradient] || gradient,
    backgroundSize: animate ? '200% 100%' : '100% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    fontSize: size,
    fontWeight: weight,
    display: 'inline-block',
    ...props.style,
  };

  // Filter out non-DOM props
  const { style: customStyle, ...domProps } = props;
  
  return (
    <motion.span
      variants={textVariants}
      animate={animate ? 'shimmer' : 'static'}
      style={textStyle}
      className={`gradient-text ${className}`}
      {...domProps}
    >
      {children}
    </motion.span>
  );
};

export default GradientText;