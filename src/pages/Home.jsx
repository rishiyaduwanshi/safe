import React from 'react';
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


      {/* Hero Section */}
      <div style={{ 
        padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px)', 
        position: 'relative' 
      }}>
        <div style={{ 
          maxWidth: '1000px', 
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
              padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)',
              background: theme.colors.background.glass,
              border: `1px solid ${theme.colors.border.light}`,
              borderRadius: '999px',
              marginBottom: 'clamp(24px, 5vw, 32px)',
              backdropFilter: 'blur(10px)',
              maxWidth: '90%',
              textAlign: 'center'
            }}
          >
            <Zap size={16} style={{ color: theme.colors.primary.main, marginRight: '8px', flexShrink: 0 }} />
            <span style={{
              color: theme.colors.text.secondary,
              fontSize: 'clamp(12px, 2.5vw, 14px)',
              fontWeight: '600',
              lineHeight: '1.4'
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
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: 'clamp(16px, 4vw, 24px)',
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
              fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
              color: theme.colors.text.secondary,
              marginBottom: 'clamp(12px, 3vw, 16px)',
              fontWeight: '600',
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
              fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
              color: theme.colors.text.muted,
              marginBottom: 'clamp(32px, 6vw, 48px)',
              maxWidth: '90%',
              margin: '0 auto clamp(32px, 6vw, 48px)',
              lineHeight: '1.7',
              padding: '0 clamp(8px, 2vw, 16px)'
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
              gap: 'clamp(12px, 3vw, 16px)',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 'clamp(48px, 8vw, 64px)',
              width: '100%',
              padding: '0 clamp(16px, 4vw, 24px)'
            }}
          >
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'clamp(12px, 3vw, 16px)',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '500px'
            }}
          >
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: 'clamp(12px, 3vw, 16px) clamp(24px, 6vw, 32px)',
                    background: theme.colors.primary.gradient,
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: 'clamp(14px, 3vw, 16px)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: theme.shadows.electric,
                    minWidth: 'clamp(140px, 30vw, 180px)',
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
                  borderRadius: '16px',
                  padding: '32px',
                  maxWidth: '400px',
                  width: '90%',
                  zIndex: 51,
                  boxShadow: theme.shadows.modal
                }}>
                  <Dialog.Title style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: theme.colors.text.primary,
                    marginBottom: '16px'
                  }}>
                    Join S.A.F.E India
                  </Dialog.Title>
                  <Dialog.Description style={{
                    color: theme.colors.text.secondary,
                    marginBottom: '24px',
                    lineHeight: '1.6'
                  }}>
                    Start your journey towards safer roads. Create your citizen safety profile and begin tracking your road safety score.
                  </Dialog.Description>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                      flex: 1,
                      padding: '12px 24px',
                      background: theme.colors.primary.gradient,
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}>
                      Sign Up
                    </button>
                    <Dialog.Close asChild>
                      <button style={{
                        padding: '12px 24px',
                        background: theme.colors.background.secondary,
                        color: theme.colors.text.primary,
                        border: `1px solid ${theme.colors.border.light}`,
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}>
                        Cancel
                      </button>
                    </Dialog.Close>
                  </div>
                  <Dialog.Close asChild>
                    <button style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
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
                padding: 'clamp(12px, 3vw, 16px) clamp(24px, 6vw, 32px)',
                background: theme.colors.background.glass,
                color: theme.colors.text.primary,
                border: `1px solid ${theme.colors.border.light}`,
                borderRadius: '12px',
                fontSize: 'clamp(14px, 3vw, 16px)',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backdropFilter: 'blur(10px)',
                minWidth: 'clamp(140px, 30vw, 180px)',
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
              gap: 'clamp(16px, 4vw, 32px)',
              marginBottom: 'clamp(48px, 10vw, 80px)',
              padding: '0 clamp(8px, 2vw, 16px)'
            }}
          >
            {[
              { number: '480K+', label: 'Annual Accidents', color: '#ef4444' },
              { number: '172K+', label: 'Lives Lost', color: '#f59e0b' },
              { number: '95%', label: 'Preventable Cases', color: '#10b981' }
            ].map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 'clamp(24px, 6vw, 32px)',
                  fontWeight: '800',
                  color: stat.color,
                  marginBottom: 'clamp(4px, 2vw, 8px)'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  color: theme.colors.text.muted,
                  fontSize: 'clamp(14px, 3vw, 16px)',
                  lineHeight: '1.4'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '0 clamp(16px, 4vw, 24px) clamp(48px, 10vw, 80px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '64px' }}
          >
            <h2 style={{
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              fontWeight: '700',
              color: theme.colors.text.primary,
              marginBottom: 'clamp(12px, 3vw, 16px)',
              lineHeight: '1.2'
            }}>
              Comprehensive Safety Ecosystem
            </h2>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 18px)',
              color: theme.colors.text.secondary,
              maxWidth: '90%',
              margin: '0 auto',
              lineHeight: '1.6',
              padding: '0 clamp(8px, 2vw, 16px)'
            }}>
              Our integrated platform combines AI-powered detection, behavioral analytics, 
              and policy automation for unprecedented road safety management.
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 80vw, 350px), 1fr))',
            gap: 'clamp(16px, 4vw, 24px)',
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
                  borderRadius: '16px',
                  padding: 'clamp(20px, 5vw, 32px) clamp(16px, 4vw, 24px)',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  maxWidth: '400px'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: 'clamp(12px, 3vw, 16px)',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div style={{
                    width: 'clamp(40px, 10vw, 48px)',
                    height: 'clamp(40px, 10vw, 48px)',
                    borderRadius: '12px',
                    background: `${feature.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <feature.icon size={22} color={feature.color} />
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(18px, 4vw, 20px)',
                    fontWeight: '600',
                    color: theme.colors.text.primary,
                    lineHeight: '1.3'
                  }}>
                    {feature.title}
                  </h3>
                </div>
                <p style={{
                  color: theme.colors.text.muted,
                  lineHeight: '1.6',
                  fontSize: 'clamp(14px, 3vw, 16px)'
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ padding: '0 clamp(16px, 4vw, 24px) clamp(48px, 10vw, 80px)' }}>
        <div style={{
          maxWidth: '90%',
          margin: '0 auto',
          textAlign: 'center',
          background: theme.colors.background.glass,
          border: `1px solid ${theme.colors.border.light}`,
          borderRadius: '20px',
          padding: 'clamp(24px, 6vw, 48px) clamp(16px, 4vw, 32px)',
          backdropFilter: 'blur(20px)'
        }}>
          <h2 style={{
            fontSize: 'clamp(20px, 5vw, 28px)',
            fontWeight: '700',
            color: theme.colors.text.primary,
            marginBottom: 'clamp(12px, 3vw, 16px)',
            lineHeight: '1.3'
          }}>
            Ready to Transform Road Safety?
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 3vw, 18px)',
            color: theme.colors.text.secondary,
            marginBottom: 'clamp(24px, 5vw, 32px)',
            lineHeight: '1.6',
            padding: '0 clamp(8px, 2vw, 16px)'
          }}>
            Join thousands of citizens building a safer India through smart technology and community action.
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(12px, 3vw, 16px)',
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
                padding: 'clamp(12px, 3vw, 16px) clamp(24px, 6vw, 32px)',
                background: theme.colors.primary.gradient,
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: 'clamp(14px, 3vw, 16px)',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: theme.shadows.electric,
                minWidth: 'clamp(140px, 35vw, 180px)',
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
                padding: 'clamp(12px, 3vw, 16px) clamp(24px, 6vw, 32px)',
                background: theme.colors.background.secondary,
                color: theme.colors.text.primary,
                border: `1px solid ${theme.colors.border.light}`,
                borderRadius: '12px',
                fontSize: 'clamp(14px, 3vw, 16px)',
                fontWeight: '600',
                cursor: 'pointer',
                minWidth: 'clamp(140px, 35vw, 180px)',
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