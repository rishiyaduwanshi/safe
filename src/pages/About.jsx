import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users, Globe } from 'lucide-react';
import { Card } from '../components/index.js';
import { theme } from '../styles/theme.js';
import { STRINGS } from '../constants/index.js';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Our primary mission is to reduce road accidents and save lives through technology.',
      color: theme.colors.primary.main,
    },
    {
      icon: Target,
      title: 'Data-Driven',
      description: 'We use AI and analytics to provide actionable insights for better road safety.',
      color: theme.colors.accent.green,
    },
    {
      icon: Users,
      title: 'Community Powered',
      description: 'Citizens are at the heart of our platform, reporting hazards and improving safety.',
      color: theme.colors.accent.purple,
    },
    {
      icon: Globe,
      title: 'Nationwide Impact',
      description: 'Building a safer India, one road at a time, with scalable solutions.',
      color: theme.colors.accent.cyan,
    },
  ];

  return (
    <div className="about-page">

      <section style={{
        background: theme.colors.background.gradient,
        color: theme.colors.neutral.white,
        padding: `${theme.spacing[16]} ${theme.spacing[6]}`,
        textAlign: 'center',
      }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: theme.containers.lg, margin: '0 auto' }}
        >
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: theme.typography.fontSize['5xl'],
              fontWeight: theme.typography.fontWeight.bold,
              marginBottom: theme.spacing[6],
            }}
          >
            About {STRINGS.APP_NAME}
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: theme.typography.fontSize.xl,
              lineHeight: theme.typography.lineHeight.relaxed,
              opacity: 0.9,
            }}
          >
            {STRINGS.APP_DESCRIPTION}
          </motion.p>
        </motion.div>
      </section>


      <section style={{
        padding: `${theme.spacing[16]} ${theme.spacing[6]}`,
        maxWidth: theme.containers.xl,
        margin: '0 auto',
      }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={itemVariants}
            style={{
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: theme.typography.fontWeight.bold,
              textAlign: 'center',
              marginBottom: theme.spacing[4],
              color: theme.colors.text.primary,
            }}
          >
            Our Mission
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: theme.typography.fontSize.lg,
              textAlign: 'center',
              marginBottom: theme.spacing[16],
              color: theme.colors.text.secondary,
              maxWidth: theme.containers.md,
              margin: `0 auto ${theme.spacing[16]}`,
              lineHeight: theme.typography.lineHeight.relaxed,
            }}
          >
            To revolutionize road safety in India through intelligent monitoring, citizen engagement, 
            and data-driven policy making, creating safer roads for everyone.
          </motion.p>


          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fit, minmax(${theme.containers.card}, 1fr))`,
            gap: theme.spacing[8],
          }}>
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card variant="elevated" size="lg" clickable={false}>
                  <div style={{ textAlign: 'center' }}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      style={{
                        display: 'inline-flex',
                        padding: theme.spacing[4],
                        borderRadius: theme.borderRadius.full,
                        background: `${value.color}20`,
                        color: value.color,
                        marginBottom: theme.spacing[4],
                      }}
                    >
                      <value.icon size={32} />
                    </motion.div>
                    
                    <h3 style={{
                      fontSize: theme.typography.fontSize.xl,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: theme.colors.text.primary,
                      marginBottom: theme.spacing[3],
                    }}>
                      {value.title}
                    </h3>
                    
                    <p style={{
                      fontSize: theme.typography.fontSize.base,
                      color: theme.colors.text.secondary,
                      lineHeight: theme.typography.lineHeight.relaxed,
                    }}>
                      {value.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>


      <section style={{
        background: theme.colors.background.secondary,
        padding: `${theme.spacing[16]} ${theme.spacing[6]}`,
      }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ maxWidth: theme.containers.lg, margin: '0 auto' }}
        >
          <motion.h2
            variants={itemVariants}
            style={{
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: theme.typography.fontWeight.bold,
              textAlign: 'center',
              marginBottom: theme.spacing[8],
              color: theme.colors.text.primary,
            }}
          >
            The Problem We're Solving
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            style={{
              fontSize: theme.typography.fontSize.lg,
              color: theme.colors.text.secondary,
              lineHeight: theme.typography.lineHeight.relaxed,
              marginBottom: theme.spacing[8],
            }}
          >
            <p style={{ marginBottom: theme.spacing[4] }}>
              Every year in India, there are <strong>480,583 road accidents</strong> resulting in 
              <strong> 172,890 deaths</strong> and severe injuries to many thousands more.
            </p>
            
            <p style={{ marginBottom: theme.spacing[4] }}>
              A large share of these deaths result from human violations: non-use of safety devices 
              (helmets, seat belts), overspeeding, wrong side driving, and poor infrastructure like potholes.
            </p>
            
            <p>
              Current approaches are reactive and fragmented. There's no system that continuously measures 
              driver behavior, provides feedback, rewards good behavior, and systematically enforces 
              retraining when needed.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{
              background: theme.colors.primary.gradient,
              color: theme.colors.neutral.white,
              padding: theme.spacing[8],
              borderRadius: theme.borderRadius['2xl'],
              textAlign: 'center',
            }}
          >
            <h3 style={{
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              marginBottom: theme.spacing[4],
            }}>
              Our Solution
            </h3>
            
            <p style={{
              fontSize: theme.typography.fontSize.lg,
              lineHeight: theme.typography.lineHeight.relaxed,
              opacity: 0.95,
            }}>
              S.A.F.E India builds a unified ecosystem that detects violations in real-time, 
              enables citizen reporting, provides transparency through a Citizen Safety Score, 
              and supports data-driven policy making for proactive road safety.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
