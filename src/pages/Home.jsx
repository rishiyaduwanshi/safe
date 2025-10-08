import { motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  BarChart3, 
  Play, 
  ArrowRight, 
  Zap,
  Eye,
  Camera,
  Users,
  Star,
  X
} from 'lucide-react';
import { theme } from '../styles/theme.js';
import SpotlightEffect from '../components/SpotLightEffect.jsx';

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: "Violation Detection",
      description: "Real-time detection of helmet violations, overspeeding, wrong-side driving",
      color: theme.colors.primary.main
    },
    {
      icon: AlertTriangle,
      title: "Hazard Recognition", 
      description: "AI-powered detection of potholes, accidents, and road obstacles",
      color: "#f59e0b"
    },
    {
      icon: BarChart3,
      title: "Citizen Safety Score",
      description: "Dynamic scoring system for driver behavior and safety compliance", 
      color: "#10b981"
    },
    {
      icon: MapPin,
      title: "Traffic Analytics",
      description: "Smart traffic flow monitoring and congestion optimization",
      color: "#3b82f6"
    },
    {
      icon: Eye,
      title: "Transparency Portal",
      description: "Appeal violations, view evidence, track safety improvements",
      color: theme.colors.secondary
    },
    {
      icon: Star,
      title: "Policy Integration", 
      description: "Automated retraining triggers, insurance benefits, license rewards",
      color: "#06b6d4"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.colors.background.gradient,
      position: 'relative'
    }}> 
    <SpotlightEffect/>


      {/* Hero Section */}
      <div style={{ 
        padding: `${theme.spacing.responsive.section} ${theme.spacing.responsive.container}`, 
        position: 'relative' 
      }}>
        <div style={{ 
          maxWidth: theme.containers.hero, 
          margin: '0 auto', 
          textAlign: 'center',
          overflow: 'hidden'
        }}>
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: `${theme.spacing.responsive.sm} ${theme.spacing.responsive.lg}`,
              background: theme.colors.background.glass,
              border: `1px solid ${theme.colors.border.light}`,
              borderRadius: theme.borderRadius.full,
              marginBottom: theme.spacing.responsive['2xl'],
              backdropFilter: 'blur(10px)',
              maxWidth: '90%',
              textAlign: 'center'
            }}
          >
            <Zap size={16} style={{ color: theme.colors.primary.main, marginRight: theme.spacing[2], flexShrink: 0 }} />
            <span style={{
              color: theme.colors.text.secondary,
              fontSize: theme.typography.fontSize.responsive.badge,
              fontWeight: theme.typography.fontWeight.semibold,
              lineHeight: theme.typography.lineHeight.snug,
              fontFamily: theme.typography.fontFamily.primary.join(', ')
            }}>
              India's First AI-Powered Road Safety System
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: theme.typography.fontSize.responsive.hero,
              fontWeight: theme.typography.fontWeight.extrabold,
              lineHeight: '1.1',
              marginBottom: theme.spacing.responsive.xl,
              background: theme.colors.text.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              wordBreak: 'break-word',
              hyphens: 'auto'
            }}
          >
            S.A.F.E India
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: theme.typography.fontSize.responsive.xl,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.responsive.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              wordBreak: 'break-word'
            }}
          >
            Smart, Adaptive & Forensic Evaluation
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: theme.typography.fontSize.responsive.lg,
              color: theme.colors.text.muted,
              marginBottom: theme.spacing.responsive['2xl'],
              maxWidth: '90%',
              margin: `0 auto ${theme.spacing.responsive['2xl']}`,
              lineHeight: theme.typography.lineHeight.loose,
              padding: `0 ${theme.spacing.responsive.container}`
            }}
          >
            Revolutionizing road safety through cutting-edge AI technology, real-time violation detection, 
            intelligent hazard recognition, and comprehensive citizen safety scoring system.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.responsive.lg,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.responsive.section,
              width: '100%',
              padding: `0 ${theme.spacing.responsive.container}`
            }}
          >
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: theme.spacing.responsive.lg,
              justifyContent: 'center',
              width: '100%',
              maxWidth: theme.containers.md
            }}
          >
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: `${theme.spacing.responsive.md} ${theme.spacing.responsive.xl}`,
                    background: theme.colors.primary.gradient,
                    color: 'white',
                    border: 'none',
                    borderRadius: theme.borderRadius.xl,
                    fontSize: theme.typography.fontSize.responsive.button,
                    fontWeight: theme.typography.fontWeight.semibold,
                    fontFamily: theme.typography.fontFamily.primary.join(', '),
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: theme.spacing[2],
                    boxShadow: theme.shadows.electric,
                    minWidth: theme.componentSizes.button.minWidthLarge,
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Zap size={18} />
                  Get Started
                </motion.button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(4px)',
                  zIndex: 50
                }} />
                <Dialog.Content style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: theme.colors.background.modal,
                  border: `1px solid ${theme.colors.border.light}`,
                  borderRadius: theme.borderRadius['2xl'],
                  padding: theme.spacing.responsive['2xl'],
                  maxWidth: theme.containers.card,
                  width: '90%',
                  zIndex: 51,
                  boxShadow: theme.shadows.modal
                }}>
                  <Dialog.Title style={{
                    fontSize: theme.typography.fontSize['2xl'],
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.text.primary,
                    marginBottom: theme.spacing[4],
                    fontFamily: theme.typography.fontFamily.heading.join(', ')
                  }}>
                    Join S.A.F.E India
                  </Dialog.Title>
                  <Dialog.Description style={{
                    color: theme.colors.text.secondary,
                    marginBottom: theme.spacing[6],
                    lineHeight: theme.typography.lineHeight.relaxed,
                    fontFamily: theme.typography.fontFamily.primary.join(', ')
                  }}>
                    Start your journey towards safer roads. Create your citizen safety profile and begin tracking your road safety score.
                  </Dialog.Description>
                  <div style={{ display: 'flex', gap: theme.spacing[3] }}>
                    <button style={{
                      flex: 1,
                      padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
                      background: theme.colors.primary.gradient,
                      color: 'white',
                      border: 'none',
                      borderRadius: theme.borderRadius.lg,
                      fontWeight: theme.typography.fontWeight.semibold,
                      fontFamily: theme.typography.fontFamily.primary.join(', '),
                      cursor: 'pointer'
                    }}>
                      Sign Up
                    </button>
                    <Dialog.Close asChild>
                      <button style={{
                        padding: `${theme.spacing[3]} ${theme.spacing[6]}`,
                        background: theme.colors.background.secondary,
                        color: theme.colors.text.primary,
                        border: `1px solid ${theme.colors.border.light}`,
                        borderRadius: theme.borderRadius.lg,
                        fontWeight: theme.typography.fontWeight.semibold,
                        fontFamily: theme.typography.fontFamily.primary.join(', '),
                        cursor: 'pointer'
                      }}>
                        Cancel
                      </button>
                    </Dialog.Close>
                  </div>
                  <Dialog.Close asChild>
                    <button style={{
                      position: 'absolute',
                      top: theme.spacing[4],
                      right: theme.spacing[4],
                      background: 'transparent',
                      border: 'none',
                      color: theme.colors.text.secondary,
                      cursor: 'pointer'
                    }}>
                      <X size={20} />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: `${theme.spacing.responsive.md} ${theme.spacing.responsive.xl}`,
                background: theme.colors.background.glass,
                color: theme.colors.text.primary,
                border: `1px solid ${theme.colors.border.light}`,
                borderRadius: theme.borderRadius.xl,
                fontSize: theme.typography.fontSize.responsive.button,
                fontWeight: theme.typography.fontWeight.semibold,
                fontFamily: theme.typography.fontFamily.primary.join(', '),
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: theme.spacing[2],
                backdropFilter: 'blur(10px)',
                minWidth: theme.componentSizes.button.minWidthLarge,
                whiteSpace: 'nowrap'
              }}
            >
              <Play size={18} />
              Watch Demo
            </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(150px, 25vw, 200px), 1fr))',
              gap: theme.spacing.responsive.xl,
              marginBottom: theme.spacing.responsive.section,
              padding: `0 ${theme.spacing.responsive.container}`
            }}
          >
            {[
              { number: '480K+', label: 'Annual Accidents', color: '#ef4444' },
              { number: '172K+', label: 'Lives Lost', color: '#f59e0b' },
              { number: '95%', label: 'Preventable Cases', color: '#10b981' }
            ].map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: theme.typography.fontSize.responsive['3xl'],
                  fontWeight: theme.typography.fontWeight.extrabold,
                  color: stat.color,
                  marginBottom: theme.spacing.responsive.xs,
                  fontFamily: theme.typography.fontFamily.heading.join(', ')
                }}>
                  {stat.number}
                </div>
                <div style={{
                  color: theme.colors.text.muted,
                  fontSize: theme.typography.fontSize.responsive.button,
                  lineHeight: theme.typography.lineHeight.snug,
                  fontFamily: theme.typography.fontFamily.primary.join(', ')
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: `0 ${theme.spacing.responsive.container} ${theme.spacing.responsive.section}` }}>
        <div style={{ maxWidth: theme.containers.xl, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: theme.spacing.responsive['3xl'] }}
          >
            <h2 style={{
              fontSize: theme.typography.fontSize.responsive['4xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.responsive.lg,
              lineHeight: theme.typography.lineHeight.tight,
              fontFamily: theme.typography.fontFamily.heading.join(', ')
            }}>
              Comprehensive Safety Ecosystem
            </h2>
            <p style={{
              fontSize: theme.typography.fontSize.responsive.lg,
              color: theme.colors.text.secondary,
              maxWidth: '90%',
              margin: '0 auto',
              lineHeight: theme.typography.lineHeight.relaxed,
              padding: `0 ${theme.spacing.responsive.container}`,
              fontFamily: theme.typography.fontFamily.primary.join(', ')
            }}>
              Our integrated platform combines AI-powered detection, behavioral analytics, 
              and policy automation for unprecedented road safety management.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 80vw, 350px), 1fr))',
            gap: theme.spacing.responsive.xl,
            justifyItems: 'center'
          }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: theme.colors.background.card,
                  border: `1px solid ${theme.colors.border.light}`,
                  borderRadius: theme.borderRadius['2xl'],
                  padding: `${theme.spacing.responsive.xl} ${theme.spacing.responsive.lg}`,
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  maxWidth: theme.containers.card
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: theme.spacing.responsive.lg,
                  flexWrap: 'wrap',
                  gap: theme.spacing[3]
                }}>
                  <div style={{
                    width: theme.componentSizes.card.iconBox,
                    height: theme.componentSizes.card.iconBox,
                    borderRadius: theme.borderRadius.xl,
                    background: `${feature.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <feature.icon size={22} color={feature.color} />
                  </div>
                  <h3 style={{
                    fontSize: theme.typography.fontSize.responsive.xl,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.text.primary,
                    lineHeight: theme.typography.lineHeight.tight,
                    fontFamily: theme.typography.fontFamily.heading.join(', ')
                  }}>
                    {feature.title}
                  </h3>
                </div>
                <p style={{
                  color: theme.colors.text.muted,
                  lineHeight: theme.typography.lineHeight.relaxed,
                  fontSize: theme.typography.fontSize.responsive.button,
                  fontFamily: theme.typography.fontFamily.primary.join(', ')
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ padding: `0 ${theme.spacing.responsive.container} ${theme.spacing.responsive.section}` }}>
        <div style={{
          maxWidth: theme.containers.lg,
          margin: '0 auto',
          textAlign: 'center',
          background: theme.colors.background.glass,
          border: `1px solid ${theme.colors.border.light}`,
          borderRadius: theme.borderRadius['3xl'],
          padding: `${theme.spacing.responsive['2xl']} ${theme.spacing.responsive.xl}`,
          backdropFilter: 'blur(20px)'
        }}>
          <h2 style={{
            fontSize: theme.typography.fontSize.responsive['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.responsive.lg,
            lineHeight: theme.typography.lineHeight.tight,
            fontFamily: theme.typography.fontFamily.heading.join(', ')
          }}>
            Ready to Transform Road Safety?
          </h2>
          <p style={{
            fontSize: theme.typography.fontSize.responsive.lg,
            color: theme.colors.text.secondary,
            marginBottom: theme.spacing.responsive['2xl'],
            lineHeight: theme.typography.lineHeight.relaxed,
            padding: `0 ${theme.spacing.responsive.container}`,
            fontFamily: theme.typography.fontFamily.primary.join(', ')
          }}>
            Join thousands of citizens building a safer India through smart technology and community action.
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.responsive.lg,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'clamp(12px, 3vw, 16px)',
              justifyContent: 'center'
            }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: `${theme.spacing.responsive.md} ${theme.spacing.responsive.xl}`,
                background: theme.colors.primary.gradient,
                color: 'white',
                border: 'none',
                borderRadius: theme.borderRadius.xl,
                fontSize: theme.typography.fontSize.responsive.button,
                fontWeight: theme.typography.fontWeight.semibold,
                fontFamily: theme.typography.fontFamily.primary.join(', '),
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: theme.spacing[2],
                boxShadow: theme.shadows.electric,
                minWidth: theme.componentSizes.button.minWidthLarge,
                whiteSpace: 'nowrap'
              }}
            >
              <Users size={18} />
              Join Community
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: `${theme.spacing.responsive.md} ${theme.spacing.responsive.xl}`,
                background: theme.colors.background.secondary,
                color: theme.colors.text.primary,
                border: `1px solid ${theme.colors.border.light}`,
                borderRadius: theme.borderRadius.xl,
                fontSize: theme.typography.fontSize.responsive.button,
                fontWeight: theme.typography.fontWeight.semibold,
                fontFamily: theme.typography.fontFamily.primary.join(', '),
                cursor: 'pointer',
                minWidth: theme.componentSizes.button.minWidthLarge,
                whiteSpace: 'nowrap'
              }}
            >
              Learn More
            </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
