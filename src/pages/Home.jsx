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
import SpotlightEffect from '../components/SpotLightEffect.jsx';

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: "Violation Detection",
      description: "Real-time detection of helmet violations, overspeeding, wrong-side driving",
      color: "#6366F1"
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
      color: "#111118"
    },
    {
      icon: Star,
      title: "Policy Integration",
      description: "Automated retraining triggers, insurance benefits, license rewards",
      color: "#06b6d4"
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-background-primary via-background-secondary to-background-tertiary relative">
      <SpotlightEffect />


      {/* Hero Section */}
      <div className="py-16 px-6 md:py-20 md:px-8 relative">
        <div className="max-w-4xl mx-auto text-center overflow-hidden">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-white/5 border border-white/10 rounded-full mb-8 md:mb-12 backdrop-blur-md max-w-[90%] text-center"
          >
            <Zap size={16} className="text-primary mr-2 shrink-0" />
            <span className="text-slate-300 text-sm md:text-base font-semibold leading-snug">
              India's First AI-Powered Road Safety System
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 md:mb-8 bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent wrap-break-words"
          >
            S.A.F.E India
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 mb-4 md:mb-6 font-semibold break-words"
          >
            Smart, Adaptive & Forensic Evaluation
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg text-slate-400 mb-12 md:mb-16 max-w-[90%] mx-auto leading-loose px-4 md:px-6"
          >
            Revolutionizing road safety through cutting-edge AI technology, real-time violation detection,
            intelligent hazard recognition, and comprehensive citizen safety scoring system.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-4 md:gap-6 justify-center items-center mb-16 md:mb-20 w-full px-4 md:px-6"
          >
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center w-full max-w-2xl">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 md:px-8 md:py-4 bg-linear-to-r from-primary via-primary-light to-tertiary text-white border-none rounded-xl text-sm md:text-base font-semibold cursor-pointer flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(99,102,241,0.4)] min-w-35 md:min-w-45 whitespace-nowrap"
                  >
                    <Zap size={18} />
                    Get Started
                  </motion.button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
                  <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background-primary border border-white/10 rounded-2xl p-8 max-w-md w-[90%] z-[51] shadow-[0_25px_50px_rgba(0,0,0,0.6)]">
                    <Dialog.Title className="text-2xl font-bold text-white mb-4">
                      Join S.A.F.E India
                    </Dialog.Title>
                    <Dialog.Description className="text-slate-300 mb-6 leading-relaxed">
                      Start your journey towards safer roads. Create your citizen safety profile and begin tracking your road safety score.
                    </Dialog.Description>
                    <div className="flex gap-3">
                      <button className="flex-1 px-6 py-3 bg-gradient-to-r from-primary via-primary-light to-tertiary text-white border-none rounded-lg font-semibold cursor-pointer">
                        Sign Up
                      </button>
                      <Dialog.Close asChild>
                        <button className="px-6 py-3 bg-background-secondary text-white border border-white/10 rounded-lg font-semibold cursor-pointer">
                          Cancel
                        </button>
                      </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                      <button className="absolute top-4 right-4 bg-transparent border-none text-slate-400 cursor-pointer">
                        <X size={20} />
                      </button>
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 md:px-8 md:py-4 bg-white/5 text-white border border-white/10 rounded-xl text-sm md:text-base font-semibold cursor-pointer flex items-center justify-center gap-2 backdrop-blur-md min-w-[140px] md:min-w-[180px] whitespace-nowrap"
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
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20 px-4 md:px-6"
          >
            {[
              { number: '480K+', label: 'Annual Accidents', color: '#ef4444' },
              { number: '172K+', label: 'Lives Lost', color: '#f59e0b' },
              { number: '95%', label: 'Preventable Cases', color: '#10b981' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold mb-1 md:mb-2" style={{ color: stat.color }}>
                  {stat.number}
                </div>
                <div className="text-slate-400 text-sm md:text-base leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 pb-16 md:px-8 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Comprehensive Safety Ecosystem
            </h2>
            <p className="text-base md:text-lg text-slate-300 max-w-[90%] mx-auto leading-relaxed px-4 md:px-6">
              Our integrated platform combines AI-powered detection, behavioral analytics,
              and policy automation for unprecedented road safety management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background-card border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md cursor-pointer transition-all duration-300 w-full max-w-md"
              >
                <div className="flex items-center mb-4 md:mb-6 flex-wrap gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${feature.color}20` }}
                  >
                    <feature.icon size={22} color={feature.color} />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white leading-tight">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 pb-16 md:px-8 md:pb-20">
        <div className="max-w-5xl mx-auto text-center bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Ready to Transform Road Safety?
          </h2>
          <p className="text-base md:text-lg text-slate-300 mb-8 md:mb-12 leading-relaxed px-4 md:px-6">
            Join thousands of citizens building a safer India through smart technology and community action.
          </p>
          <div className="flex flex-col gap-4 md:gap-6 justify-center items-center">
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 md:px-8 md:py-4 bg-linear-to-r from-primary via-primary-light to-tertiary text-white border-none rounded-xl text-sm md:text-base font-semibold cursor-pointer flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(99,102,241,0.4)] min-w-[140px] md:min-w-45 whitespace-nowrap"
              >
                <Users size={18} />
                Join Community
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 md:px-8 md:py-4 bg-background-secondary text-white border border-white/10 rounded-xl text-sm md:text-base font-semibold cursor-pointer min-w-35 md:min-w-45 whitespace-nowrap"
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
