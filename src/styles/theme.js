export const colors = {
  accent: '#6A5AE0',
  secondary: '#8B5CF6',  
  tertiary: '#EC4899',
  
  primary: {
    main: '#6366F1',
    light: '#8B5CF6',
    dark: '#4F46E5',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
    glow: 'rgba(99, 102, 241, 0.5)',
  },
  
  // Dark background system
  background: {
    primary: '#0A0A0F', // Deep dark background
    secondary: '#111118', // Slightly lighter
    tertiary: '#1A1A2E', // Card background
    card: '#1E1E3A', // Card background with purple tint
    cardHover: '#252542', // Card hover states
    hover: '#252542', // Hover states
    modal: '#0F0F14', // Modal overlay
    gradient: 'linear-gradient(135deg, #0A0A0F 0%, #111118 50%, #1A1A2E 100%)',
    mesh: 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
    hero: 'linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 100%)',
    
    // Glassmorphism backgrounds
    glass: 'rgba(30, 30, 58, 0.5)', // Glass effect background
    glassCard: 'rgba(30, 30, 58, 0.6)', // Glass card background
    
    // Input backgrounds
    input: '#1A1A2E', // Input field background
    inputFocus: '#252542', // Input focused background
    inputHover: '#212139', // Input hover background
    disabled: 'rgba(30, 30, 58, 0.3)', // Disabled background
  },
  
  // Text colors for dark theme
  text: {
    primary: '#F8FAFC',
    secondary: '#CBD5E1', // Secondary text
    muted: '#64748B', // Muted text
    accent: '#6366F1', // Accent text
    dim: '#475569', // Very dim text
    placeholder: '#64748B', // Placeholder text
    gradient: 'linear-gradient(135deg, #F8FAFC 0%, #CBD5E1 100%)', // Gradient text
  },
  
  // Border colors for dark theme
  border: {
    default: 'rgba(203, 213, 225, 0.2)', // Default border
    hover: 'rgba(203, 213, 225, 0.3)', // Hover border
    focus: 'rgba(99, 102, 241, 0.5)', // Focus border
    glass: 'rgba(255, 255, 255, 0.1)', // Glass effect border
    card: 'rgba(255, 255, 255, 0.05)', // Card border
    muted: 'rgba(100, 116, 139, 0.3)', // Muted border
  },
  
  // Status colors for dark theme
  status: {
    success: '#10B981', // Success green
    error: '#EF4444', // Error red
    warning: '#F59E0B', // Warning yellow
    info: '#3B82F6', // Info blue
  },
  
  // Accent colors optimized for dark theme
  accent: {
    blue: '#60A5FA', // Bright blue
    purple: '#A78BFA', // Light purple
    pink: '#F472B6', // Bright pink
    green: '#34D399', // Emerald green
    teal: '#2DD4BF', // Bright teal
    orange: '#FBBF24', // Amber
    red: '#F87171', // Light red
    cyan: '#22D3EE', // Bright cyan
    violet: '#C084FC', // Light violet
    yellow: '#FDE047', // Bright yellow
  },
  
  // Safety colors for dark theme
  safety: {
    green: '#10B981', // Success green
    yellow: '#F59E0B', // Warning yellow
    red: '#EF4444', // Danger red
    blue: '#3B82F6', // Info blue
  },
  
  // Neutral grays
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
  },
};

export const shadows = {
  // Dark Theme Shadows - Enhanced with glows
  none: 'none',
  subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.4)',
  card: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
  cardHover: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
  button: '0 4px 14px 0 rgba(99, 102, 241, 0.4)',
  buttonHover: '0 8px 25px 0 rgba(99, 102, 241, 0.6)',
  modal: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
  dropdown: '0 10px 25px rgba(0, 0, 0, 0.5)',
  
  // Glow effects for dark theme
  glow: '0 0 30px rgba(99, 102, 241, 0.5)',
  glowHover: '0 0 40px rgba(99, 102, 241, 0.7)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
  neon: '0 0 5px rgba(99, 102, 241, 0.5), 0 0 10px rgba(99, 102, 241, 0.3), 0 0 15px rgba(99, 102, 241, 0.2)',
  text: '0 2px 4px rgba(0, 0, 0, 0.8)',
  
  // Premium glassmorphism for dark theme
  glass: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
  glassCard: '0 4px 24px 0 rgba(0, 0, 0, 0.4)',
  glassNavbar: '0 2px 16px 0 rgba(0, 0, 0, 0.5)',
  
  // Colored shadows for dark theme accents
  electric: '0 8px 24px 0 rgba(99, 102, 241, 0.4)',
  success: '0 8px 24px 0 rgba(16, 185, 129, 0.4)',
  warning: '0 8px 24px 0 rgba(245, 158, 11, 0.4)',
  danger: '0 8px 24px 0 rgba(239, 68, 68, 0.4)',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  default: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  full: '9999px',
};

export const borderWidth = {
  thin: '1px',
  default: '2px',
  thick: '4px',
  none: '0',
};

export const spacing = {
  // Fixed spacing
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  64: '16rem',    // 256px
  
  // Responsive spacing using clamp()
  responsive: {
    xs: 'clamp(0.25rem, 1vw, 0.5rem)',      // 4px-8px
    sm: 'clamp(0.5rem, 2vw, 0.75rem)',      // 8px-12px  
    md: 'clamp(0.75rem, 3vw, 1rem)',        // 12px-16px
    lg: 'clamp(1rem, 4vw, 1.5rem)',         // 16px-24px
    xl: 'clamp(1.5rem, 6vw, 2rem)',         // 24px-32px
    '2xl': 'clamp(2rem, 8vw, 3rem)',        // 32px-48px
    '3xl': 'clamp(3rem, 10vw, 4rem)',       // 48px-64px
    '4xl': 'clamp(4rem, 12vw, 5rem)',       // 64px-80px
    section: 'clamp(3rem, 8vw, 5rem)',      // Section spacing
    container: 'clamp(1rem, 4vw, 1.5rem)',  // Container padding
  }
};

// Container system for consistent max-widths
export const containers = {
  sm: '640px',     // Small container
  md: '768px',     // Medium container  
  lg: '1024px',    // Large container
  xl: '1200px',    // Extra large container
  '2xl': '1400px', // 2X large container
  hero: '1000px',  // Hero section container
  content: '800px', // Content container
  card: '400px',   // Card max width
};

// Component sizes for consistent UI scaling
export const componentSizes = {
  button: {
    minWidth: 'clamp(120px, 25vw, 160px)',
    minWidthLarge: 'clamp(140px, 30vw, 180px)',
  },
  icon: {
    sm: '16px',
    md: '20px', 
    lg: '24px',
    xl: '32px',
  },
  card: {
    iconBox: 'clamp(40px, 8vw, 48px)',
    padding: 'clamp(20px, 4vw, 32px)',
  },
  header: {
    height: '64px',
    mobileHeight: '56px',
  }
};

export const typography = {

  fontFamily: {
    primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    heading: ['Inter', 'SF Pro Display', '-apple-system', 'sans-serif'],
    mono: ['SF Mono', 'Monaco', 'Inconsolata', 'monospace'],
    display: ['Inter', 'system-ui', 'sans-serif'],
  },
  

  fontSize: {
    // Fixed sizes
    xs: '0.75rem',      // 12px - captions
    sm: '0.875rem',     // 14px - body small
    base: '1rem',       // 16px - body
    lg: '1.125rem',     // 18px - body large
    xl: '1.25rem',      // 20px - small headings
    '2xl': '1.5rem',    // 24px - headings
    '3xl': '1.875rem',  // 30px - large headings
    '4xl': '2.25rem',   // 36px - section titles
    '5xl': '3rem',      // 48px - page titles
    '6xl': '3.75rem',   // 60px - hero titles
    '7xl': '4.5rem',    // 72px - display
    '8xl': '6rem',      // 96px - mega display
    '9xl': '8rem',      // 128px - ultra display
    
    // Responsive sizes using clamp()
    responsive: {
      xs: 'clamp(0.75rem, 2vw, 0.875rem)',    // 12px-14px
      sm: 'clamp(0.875rem, 2.5vw, 1rem)',     // 14px-16px
      base: 'clamp(1rem, 3vw, 1.125rem)',     // 16px-18px
      lg: 'clamp(1.125rem, 3.5vw, 1.25rem)',  // 18px-20px
      xl: 'clamp(1.25rem, 4vw, 1.5rem)',      // 20px-24px
      '2xl': 'clamp(1.5rem, 5vw, 2rem)',      // 24px-32px
      '3xl': 'clamp(1.875rem, 6vw, 2.5rem)',  // 30px-40px
      '4xl': 'clamp(2.25rem, 7vw, 3rem)',     // 36px-48px
      '5xl': 'clamp(3rem, 8vw, 4rem)',        // 48px-64px
      '6xl': 'clamp(3.75rem, 10vw, 5rem)',    // 60px-80px
      hero: 'clamp(2.5rem, 8vw, 5rem)',       // Hero text
      button: 'clamp(0.875rem, 3vw, 1rem)',   // Button text
      badge: 'clamp(0.75rem, 2vw, 0.875rem)', // Badge text
    }
  },
  
  // Font Weights
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
};

// Dark Glassmorphism effects
export const glassmorphism = {
  light: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: shadows.glass,
  },
  medium: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(16px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: shadows.glassCard,
  },
  strong: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(12px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: shadows.modal,
  },
  card: {
    background: 'rgba(30, 30, 58, 0.7)',
    backdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    boxShadow: shadows.electric,
  },
};

// Premium Animation System
export const animations = {
  transition: {
    fast: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    normal: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  
  // Framer Motion variants
  fadeIn: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  
  cardHover: {
    whileHover: { 
      scale: 1.02, 
      y: -4,
      boxShadow: shadows.cardHover,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    whileTap: { scale: 0.98 }
  },
  
  buttonHover: {
    whileHover: { 
      scale: 1.05,
      boxShadow: shadows.buttonHover,
      transition: { duration: 0.2 }
    },
    whileTap: { scale: 0.95 }
  },
  
  float: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  
  glow: {
    animate: {
      boxShadow: [
        '0 0 20px rgba(99, 102, 241, 0.3)',
        '0 0 40px rgba(99, 102, 241, 0.6)',
        '0 0 20px rgba(99, 102, 241, 0.3)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
};

// Breakpoints for responsive design
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Z-index scale
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// Export theme object
export const theme = {
  colors,
  shadows,
  borderRadius,
  borderWidth,
  spacing,
  typography,
  glassmorphism,
  animations,
  breakpoints,
  containers,
  componentSizes,
  zIndex,
};

export default theme;