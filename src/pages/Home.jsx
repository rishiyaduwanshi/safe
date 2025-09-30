import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  MapPin, 
  AlertTriangle,
  CheckCircle,
  Eye,
  Award,
  ArrowRight,
  Play,
  Star,
  Zap
} from 'lucide-react';
import { STRINGS, ROUTES } from '../constants/index.js';

const HomePage = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Shield, value: '480,583', label: 'Road Accidents (2023)', color: 'text-red-400' },
    { icon: TrendingUp, value: '172,890', label: 'Lives Lost', color: 'text-yellow-400' },
    { icon: Users, value: '10M+', label: 'Drivers Monitored', color: 'text-blue-400' },
    { icon: CheckCircle, value: '85%', label: 'Safety Improvement', color: 'text-green-400' },
  ];

  const features = [
    {
      icon: Eye,
      title: 'Real-time Violation Detection',
      description: 'AI-powered system detects helmet violations, overspeeding, and traffic rule violations in real-time.',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-500/10',
    },
    {
      icon: MapPin,
      title: 'Hazard Reporting',
      description: 'Citizens can report potholes, road damage, and infrastructure issues with location-based mapping.',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      icon: Award,
      title: 'Safety Score System',
      description: 'Comprehensive scoring system that tracks driving behavior and rewards safe practices.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: AlertTriangle,
      title: 'Instant Alerts',
      description: 'Immediate notifications to authorities and emergency services for accidents and violations.',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500/10',
    },
  ];

  const heroStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 100%)',
    color: '#FFFFFF',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 10,
  };

  const titleStyle = {
    fontSize: 'clamp(3rem, 8vw, 6rem)',
    fontWeight: '900',
    marginBottom: '32px',
    lineHeight: '1.1',
  };

  const subtitleStyle = {
    fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
    color: '#CBD5E1',
    marginBottom: '48px',
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: '0 auto 48px',
  };

  const buttonStyle = {
    padding: '16px 32px',
    fontSize: '1.125rem',
    fontWeight: '700',
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    margin: '0 8px',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #6A5AE0 0%, #8B5CF6 50%, #EC4899 100%)',
    color: '#FFFFFF',
    boxShadow: '0 8px 32px rgba(106, 90, 224, 0.3)',
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: 'rgba(255, 255, 255, 0.05)',
    color: '#FFFFFF',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
  };

  const sectionStyle = {
    padding: '80px 24px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '32px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', color: '#FFFFFF' }}>

      <section style={heroStyle}>        

        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: '80px',
            left: '32px',
            width: '256px',
            height: '256px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '48px',
            width: '320px',
            height: '320px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />

        <div style={containerStyle}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={titleStyle}>
              <span className="gradient-text">S.A.F.E India</span>
            </h1>
            <p style={subtitleStyle}>
              Smart, Adaptive & Forensic Evaluation for national road safety. 
              Building safer roads through AI-powered monitoring and enforcement.
            </p>
            
            <motion.div
              style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.button
                style={primaryButtonStyle}
                onClick={() => navigate(ROUTES.DASHBOARD)}
                whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(106, 90, 224, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                style={secondaryButtonStyle}
                whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={18} />
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>


      <section style={{ ...sectionStyle, background: 'linear-gradient(145deg, #111118 0%, #1A1A2E 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '800', marginBottom: '24px' }}>
            <span className="gradient-text">The Problem We're Solving</span>
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#CBD5E1', maxWidth: '800px', margin: '0 auto' }}>
            India faces a massive road safety crisis. Our AI-powered platform provides the solution.
          </p>
        </motion.div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <div style={cardStyle}>
                <div style={{ 
                  display: 'inline-flex', 
                  padding: '16px', 
                  borderRadius: '50%', 
                  marginBottom: '24px',
                  background: `${stat.color.includes('red') ? 'rgba(239, 68, 68, 0.2)' : 
                              stat.color.includes('yellow') ? 'rgba(245, 158, 11, 0.2)' :
                              stat.color.includes('blue') ? 'rgba(59, 130, 246, 0.2)' :
                              'rgba(34, 197, 94, 0.2)'}`
                }}>
                  <stat.icon size={32} style={{ 
                    color: stat.color.includes('red') ? '#EF4444' : 
                           stat.color.includes('yellow') ? '#F59E0B' :
                           stat.color.includes('blue') ? '#3B82F6' :
                           '#22C55E'
                  }} />
                </div>
                <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', marginBottom: '12px', color: '#FFFFFF' }}>
                  {stat.value}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#CBD5E1', fontWeight: '500' }}>
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      <section style={sectionStyle}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '800', marginBottom: '24px' }}>
            <span style={{ 
              background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Advanced Features
            </span>
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#CBD5E1', maxWidth: '800px', margin: '0 auto' }}>
            Comprehensive safety monitoring powered by cutting-edge AI technology
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div style={{
                ...cardStyle,
                height: '100%',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                textAlign: 'left'
              }}>
                <div style={{ 
                  display: 'inline-flex', 
                  padding: '16px', 
                  borderRadius: '16px', 
                  marginBottom: '24px',
                  background: feature.bgColor || 'rgba(139, 92, 246, 0.2)',
                  transition: 'all 0.3s ease'
                }}>
                  <feature.icon size={40} color={feature.iconColor || '#8B5CF6'} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px', color: '#FFFFFF' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#CBD5E1', fontSize: '1.125rem', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      <section style={{ 
        ...sectionStyle, 
        background: 'linear-gradient(145deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '800', marginBottom: '24px' }}>
            <span style={{ 
              background: 'linear-gradient(135deg, #A78BFA 0%, #F472B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Ready to Make Roads Safer?
            </span>
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#CBD5E1', marginBottom: '48px', maxWidth: '640px', margin: '0 auto 48px' }}>
            Join thousands of citizens already contributing to India's road safety revolution.
          </p>
          
          <motion.button
            onClick={() => navigate(ROUTES.DASHBOARD)}
            style={primaryButtonStyle}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(106, 90, 224, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            <Shield size={24} />
            Get Started Today
            <Zap size={20} />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;