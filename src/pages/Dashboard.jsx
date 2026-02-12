import { motion } from 'framer-motion';
import {
  Shield,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Clock,
  User
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, Button, LoadingAnimation, SpotlightEffect } from '../components/index.js';
import { STRINGS } from '../constants/index.js';

/**
 * Dashboard Page for Driver Safety Score and Activity
 */
const DashboardPage = () => {
  const userProfile = {
    name: 'Saksham Agarwal',
    safetyScore: 78,
    level: 'Good Driver',
    joinDate: '2023-08-15',
    totalDrives: 245,
    safeDrives: 210,
    violations: 8,
    reportsSubmitted: 12,
  };

  const safetyScoreHistory = [
    { month: 'Jan', score: 72 },
    { month: 'Feb', score: 75 },
    { month: 'Mar', score: 73 },
    { month: 'Apr', score: 78 },
    { month: 'May', score: 76 },
    { month: 'Jun', score: 78 },
  ];

  const violationTypes = [
    { name: 'Helmet', value: 3, color: '#EF4444' },
    { name: 'Speeding', value: 2, color: '#FBBF24' },
    { name: 'Signal', value: 2, color: '#A78BFA' },
    { name: 'Parking', value: 1, color: '#22D3EE' },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'violation',
      title: 'Helmet Violation Detected',
      location: 'MG Road, Delhi',
      time: '2 hours ago',
      severity: 'medium',
    },
    {
      id: 2,
      type: 'safe_drive',
      title: 'Safe Drive Completed',
      location: 'CP to Gurgaon',
      time: '1 day ago',
      severity: 'low',
    },
    {
      id: 3,
      type: 'report',
      title: 'Pothole Reported',
      location: 'Ring Road, Delhi',
      time: '3 days ago',
      severity: 'high',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const getSafetyScoreColor = (score) => {
    if (score >= 85) return '#10B981';
    if (score >= 70) return '#22D3EE';
    if (score >= 55) return '#F59E0B';
    return '#EF4444';
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'violation': return <AlertTriangle size={20} />;
      case 'safe_drive': return <CheckCircle size={20} />;
      case 'report': return <MapPin size={20} />;
      default: return <Clock size={20} />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'violation': return '#EF4444';
      case 'safe_drive': return '#10B981';
      case 'report': return '#22D3EE';
      default: return '#64748B';
    }
  };

  return (
    <LoadingAnimation>
      <div className="dashboard-page">
        <SpotlightEffect />

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-white py-12 px-6 pb-8 text-center"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold mb-2">
              {STRINGS.DASHBOARD_WELCOME}, {userProfile.name}!
            </h1>
            <p className="text-lg opacity-90">
              Track your safety performance and contribute to safer roads
            </p>
          </motion.div>
        </motion.section>

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Metrics Grid */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 mb-8">
              {/* Safety Score Card */}
              <motion.div variants={itemVariants}>
                <Card variant="elevated" size="lg">
                  <div className="text-center">
                    <div className="inline-flex p-3 rounded-full bg-cyan-400/20 text-cyan-400 mb-4">
                      <Shield size={28} />
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-2">
                      {userProfile.safetyScore}
                    </h3>

                    <p className="text-base text-slate-300">
                      {STRINGS.SAFETY_SCORE_TITLE}
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Safe Drives Card */}
              <motion.div variants={itemVariants}>
                <Card variant="elevated" size="lg">
                  <div className="text-center">
                    <div className="inline-flex p-3 rounded-full bg-green-500/20 text-green-500 mb-4">
                      <CheckCircle size={28} />
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-2">
                      {userProfile.safeDrives}
                    </h3>

                    <p className="text-base text-slate-300">
                      {STRINGS.SAFE_DRIVES}
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Violations Card */}
              <motion.div variants={itemVariants}>
                <Card variant="elevated" size="lg">
                  <div className="text-center">
                    <div className="inline-flex p-3 rounded-full bg-red-500/20 text-red-500 mb-4">
                      <AlertTriangle size={28} />
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-2">
                      {userProfile.violations}
                    </h3>

                    <p className="text-base text-slate-300">
                      {STRINGS.VIOLATIONS_DETECTED}
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Reports Card */}
              <motion.div variants={itemVariants}>
                <Card variant="elevated" size="lg">
                  <div className="text-center">
                    <div className="inline-flex p-3 rounded-full bg-cyan-400/20 text-cyan-400 mb-4">
                      <MapPin size={28} />
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-2">
                      {userProfile.reportsSubmitted}
                    </h3>

                    <p className="text-base text-slate-300">
                      {STRINGS.REPORTS_SUBMITTED}
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6 mb-8">
              {/* Safety Score Trend Chart */}
              <motion.div variants={itemVariants}>
                <Card variant="elevated" size="lg">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Safety Score Trend
                  </h3>

                  <div className="h-75 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={safetyScoreHistory}>
                        <defs>
                          <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(203, 213, 225, 0.2)" />
                        <XAxis dataKey="month" stroke="#64748B" />
                        <YAxis stroke="#64748B" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#FFFFFF',
                            border: 'none',
                            borderRadius: '0.75rem',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="score"
                          stroke="#6366F1"
                          strokeWidth={3}
                          fill="url(#scoreGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </motion.div>

              {/* Violation Breakdown Chart */}
              <motion.div variants={itemVariants}>
                <Card variant="elevated" size="lg">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Violation Breakdown
                  </h3>

                  <div className="h-75 mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={violationTypes}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {violationTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <Card variant="elevated" size="lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">
                    {STRINGS.RECENT_ACTIVITY}
                  </h3>

                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>

                <div className="flex flex-col gap-4">
                  {recentActivity.map((activity) => (
                    <motion.div
                      key={activity.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-background-tertiary border border-white/5"
                    >
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-full"
                        style={{
                          backgroundColor: `${getActivityColor(activity.type)}20`,
                          color: getActivityColor(activity.type)
                        }}
                      >
                        {getActivityIcon(activity.type)}
                      </div>

                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-white mb-1">
                          {activity.title}
                        </h4>

                        <div className="flex items-center gap-4 text-sm text-slate-300">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {activity.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </LoadingAnimation>
  );
};

export default DashboardPage;
