import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle, 
  CheckCircle, 
  MapPin,
  Calendar,
  Award,
  Eye,
  Clock,
  User
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, Button } from '../components/index.js';
import { theme } from '../styles/theme.js';
import { STRINGS } from '../constants/index.js';

/**
 * Dashboard Page for Driver Safety Score and Activity
 */
const DashboardPage = () => {
  // Sample data (in real app, this would come from API)
  const userProfile = {
    name: 'Rajesh Kumar',
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
    { name: 'Helmet', value: 3, color: theme.colors.safety.red },
    { name: 'Speeding', value: 2, color: theme.colors.safety.orange },
    { name: 'Signal', value: 2, color: theme.colors.accent.purple },
    { name: 'Parking', value: 1, color: theme.colors.accent.cyan },
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

  // Styles
  const headerStyles = {
    background: theme.colors.backgrounds.dashboard,
    color: theme.colors.neutral.white,
    padding: `${theme.spacing[12]} ${theme.spacing[6]} ${theme.spacing[8]}`,
    textAlign: 'center',
  };

  const contentStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: theme.spacing[6],
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing[6],
    marginBottom: theme.spacing[8],
  };

  const chartContainerStyles = {
    height: '300px',
    marginTop: theme.spacing[4],
  };

  const getSafetyScoreColor = (score) => {
    if (score >= 85) return theme.colors.safety.green;
    if (score >= 70) return theme.colors.accent.cyan;
    if (score >= 55) return theme.colors.safety.yellow;
    return theme.colors.safety.red;
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
      case 'violation': return theme.colors.safety.red;
      case 'safe_drive': return theme.colors.safety.green;
      case 'report': return theme.colors.accent.cyan;
      default: return theme.colors.neutral.gray[500];
    }
  };

  return (
    <div className="dashboard-page">

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={headerStyles}
        className="dashboard-header"
      >
        <motion.div variants={itemVariants}>
          <h1 style={{
            fontSize: theme.typography.fontSize['4xl'],
            fontWeight: theme.typography.fontWeight.bold,
            marginBottom: theme.spacing[2],
          }}>
            {STRINGS.DASHBOARD_WELCOME}, {userProfile.name}!
          </h1>
          <p style={{
            fontSize: theme.typography.fontSize.lg,
            opacity: 0.9,
          }}>
            Track your safety performance and contribute to safer roads
          </p>
        </motion.div>
      </motion.section>


      <div style={contentStyles}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

          <div style={gridStyles} className="metrics-grid">

            <motion.div variants={itemVariants}>
              <Card variant="elevated" size="lg">
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: theme.spacing[2],
                    marginBottom: theme.spacing[4],
                  }}>
                    <Shield size={24} color={getSafetyScoreColor(userProfile.safetyScore)} />
                    <h3 style={{
                      fontSize: theme.typography.fontSize.xl,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: theme.colors.neutral.gray[900],
                    }}>
                      {STRINGS.SAFETY_SCORE_TITLE}
                    </h3>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    style={{
                      fontSize: theme.typography.fontSize['5xl'],
                      fontWeight: theme.typography.fontWeight.black,
                      color: getSafetyScoreColor(userProfile.safetyScore),
                      marginBottom: theme.spacing[2],
                    }}
                  >
                    {userProfile.safetyScore}
                  </motion.div>
                  
                  <p style={{
                    fontSize: theme.typography.fontSize.lg,
                    color: theme.colors.neutral.gray[600],
                    marginBottom: theme.spacing[4],
                  }}>
                    {userProfile.level}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: theme.spacing[2] }}>
                    <TrendingUp size={16} color={theme.colors.safety.green} />
                    <span style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.safety.green }}>
                      +2 from last month
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>


            <motion.div variants={itemVariants}>
              <Card variant="elevated" size="lg">
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'inline-flex',
                    padding: theme.spacing[3],
                    borderRadius: theme.borderRadius.full,
                    background: `${theme.colors.safety.green}20`,
                    color: theme.colors.safety.green,
                    marginBottom: theme.spacing[4],
                  }}>
                    <CheckCircle size={28} />
                  </div>
                  
                  <h3 style={{
                    fontSize: theme.typography.fontSize['3xl'],
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.neutral.gray[900],
                    marginBottom: theme.spacing[2],
                  }}>
                    {userProfile.safeDrives}
                  </h3>
                  
                  <p style={{
                    fontSize: theme.typography.fontSize.base,
                    color: theme.colors.neutral.gray[600],
                  }}>
                    {STRINGS.SAFE_DRIVES}
                  </p>
                </div>
              </Card>
            </motion.div>


            <motion.div variants={itemVariants}>
              <Card variant="elevated" size="lg">
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'inline-flex',
                    padding: theme.spacing[3],
                    borderRadius: theme.borderRadius.full,
                    background: `${theme.colors.safety.red}20`,
                    color: theme.colors.safety.red,
                    marginBottom: theme.spacing[4],
                  }}>
                    <AlertTriangle size={28} />
                  </div>
                  
                  <h3 style={{
                    fontSize: theme.typography.fontSize['3xl'],
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.neutral.gray[900],
                    marginBottom: theme.spacing[2],
                  }}>
                    {userProfile.violations}
                  </h3>
                  
                  <p style={{
                    fontSize: theme.typography.fontSize.base,
                    color: theme.colors.neutral.gray[600],
                  }}>
                    {STRINGS.VIOLATIONS_DETECTED}
                  </p>
                </div>
              </Card>
            </motion.div>


            <motion.div variants={itemVariants}>
              <Card variant="elevated" size="lg">
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    display: 'inline-flex',
                    padding: theme.spacing[3],
                    borderRadius: theme.borderRadius.full,
                    background: `${theme.colors.accent.cyan}20`,
                    color: theme.colors.accent.cyan,
                    marginBottom: theme.spacing[4],
                  }}>
                    <MapPin size={28} />
                  </div>
                  
                  <h3 style={{
                    fontSize: theme.typography.fontSize['3xl'],
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.neutral.gray[900],
                    marginBottom: theme.spacing[2],
                  }}>
                    {userProfile.reportsSubmitted}
                  </h3>
                  
                  <p style={{
                    fontSize: theme.typography.fontSize.base,
                    color: theme.colors.neutral.gray[600],
                  }}>
                    {STRINGS.REPORTS_SUBMITTED}
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>


          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: theme.spacing[6],
            marginBottom: theme.spacing[8],
          }}>

            <motion.div variants={itemVariants}>
              <Card variant="elevated" size="lg">
                <h3 style={{
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.neutral.gray[900],
                  marginBottom: theme.spacing[4],
                }}>
                  Safety Score Trend
                </h3>
                
                <div style={chartContainerStyles}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={safetyScoreHistory}>
                      <defs>
                        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={theme.colors.primary.main} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={theme.colors.primary.main} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.neutral.gray[200]} />
                      <XAxis dataKey="month" stroke={theme.colors.neutral.gray[500]} />
                      <YAxis stroke={theme.colors.neutral.gray[500]} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: theme.colors.neutral.white,
                          border: 'none',
                          borderRadius: theme.borderRadius.lg,
                          boxShadow: theme.shadows.lg,
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke={theme.colors.primary.main}
                        strokeWidth={3}
                        fill="url(#scoreGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </motion.div>


            <motion.div variants={itemVariants}>
              <Card variant="elevated" size="lg">
                <h3 style={{
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.neutral.gray[900],
                  marginBottom: theme.spacing[4],
                }}>
                  Violation Breakdown
                </h3>
                
                <div style={chartContainerStyles}>
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


          <motion.div variants={itemVariants}>
            <Card variant="elevated" size="lg">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: theme.spacing[6],
              }}>
                <h3 style={{
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.neutral.gray[900],
                }}>
                  {STRINGS.RECENT_ACTIVITY}
                </h3>
                
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
                {recentActivity.map((activity) => (
                  <motion.div
                    key={activity.id}
                    whileHover={{ scale: 1.02 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing[4],
                      padding: theme.spacing[4],
                      borderRadius: theme.borderRadius.lg,
                      background: theme.colors.neutral.gray[50],
                      border: `1px solid ${theme.colors.neutral.gray[200]}`,
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: theme.borderRadius.full,
                      background: `${getActivityColor(activity.type)}20`,
                      color: getActivityColor(activity.type),
                    }}>
                      {getActivityIcon(activity.type)}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: theme.typography.fontSize.base,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: theme.colors.neutral.gray[900],
                        marginBottom: theme.spacing[1],
                      }}>
                        {activity.title}
                      </h4>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing[4],
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.neutral.gray[600],
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[1] }}>
                          <MapPin size={14} />
                          {activity.location}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[1] }}>
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
  );
};

export default DashboardPage;