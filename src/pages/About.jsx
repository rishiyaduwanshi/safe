import { motion } from 'framer-motion';
import { Shield, Target, Users, Globe } from 'lucide-react';
import { Card, SpotlightEffect } from '../components/index.js';
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
      color: '#6366F1',
    },
    {
      icon: Target,
      title: 'Data-Driven',
      description: 'We use AI and analytics to provide actionable insights for better road safety.',
      color: '#34D399',
    },
    {
      icon: Users,
      title: 'Community Powered',
      description: 'Citizens are at the heart of our platform, reporting hazards and improving safety.',
      color: '#A78BFA',
    },
    {
      icon: Globe,
      title: 'Nationwide Impact',
      description: 'Building a safer India, one road at a time, with scalable solutions.',
      color: '#22D3EE',
    },
  ];

  return (
    <div className="about-page">
      <SpotlightEffect />

      <section className="text-white py-16 px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-bold mb-6"
          >
            About {STRINGS.APP_NAME}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl leading-relaxed opacity-90"
          >
            {STRINGS.APP_DESCRIPTION}
          </motion.p>
        </motion.div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-4 text-white"
          >
            Our Mission
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-center mb-16 text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            To revolutionize road safety in India through intelligent monitoring, citizen engagement,
            and data-driven policy making, creating safer roads for everyone.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card variant="elevated" size="lg" clickable={false}>
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-flex p-4 rounded-full mb-4"
                      style={{
                        background: `${value.color}20`,
                        color: value.color,
                      }}
                    >
                      <value.icon size={32} />
                    </motion.div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      {value.title}
                    </h3>

                    <p className="text-base text-slate-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-8 text-white"
          >
            The Problem We're Solving
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="text-lg text-slate-300 leading-relaxed mb-8"
          >
            <p className="mb-4">
              Every year in India, there are <strong>480,583 road accidents</strong> resulting in
              <strong> 172,890 deaths</strong> and severe injuries to many thousands more.
            </p>

            <p className="mb-4">
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
            className="bg-linear-to-r from-primary via-primary-light to-tertiary text-white p-8 rounded-2xl text-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              Our Solution
            </h3>

            <p className="text-lg leading-relaxed opacity-95">
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
