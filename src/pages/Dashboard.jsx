import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, Button, LoadingAnimation, SpotlightEffect, SafetyScoreCard } from '../components/index.js';
import { ROUTES } from '../constants/routes.js';
import { useSafetyScore } from '../hooks/index.js';
import { useAuth } from '../contexts/AuthContext.jsx';

const timeAgo = (dateStr) => {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const formatCategoryLabel = (key) => {
  if (!key) return 'Other';
  return key
    .replace(/_/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const formatStatusLabel = (status) => {
  if (status === 'review') return 'Under Review';
  if (!status) return 'Pending';
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const STATUS_COLOR_MAP = {
  pending: { bg: '#F59E0B20', text: '#F59E0B' },
  review: { bg: '#6366F120', text: '#6366F1' },
  approved: { bg: '#10B98120', text: '#10B981' },
  rejected: { bg: '#EF444420', text: '#EF4444' },
};

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    score: safetyScore,
    hasCssHistory,
    cssHistory,
    maxScore,
    improvementFromLastMonth,
    approvedReports,
    pendingReports,
    rejectedReports,
    totalReports,
    monthlyBreakdown,
    myReports,
    isLoading,
  } = useSafetyScore();

  const displayName = typeof user?.name === 'string' && user.name.trim()
    ? user.name.trim()
    : 'User';

  const PIE_COLORS = ['#EF4444', '#FBBF24', '#A78BFA', '#22D3EE', '#10B981', '#F97316'];
  const categoryBreakdown = useMemo(() => {
    const categoryMap = {};

    myReports.forEach((report) => {
      const key = formatCategoryLabel(report.category?.key);
      categoryMap[key] = (categoryMap[key] || 0) + 1;
    });

    return Object.entries(categoryMap).map(([name, value], index) => ({
      name,
      value,
      color: PIE_COLORS[index % PIE_COLORS.length],
    }));
  }, [myReports]);

  const recentReports = useMemo(() => {
    return myReports.slice(0, 5).map((report) => ({
      id: report._id,
      title: formatCategoryLabel(report.category?.key) || report.reportText?.slice(0, 40) || 'Report',
      location: report.location?.address || 'Location not available',
      time: timeAgo(report.createdAt),
      status: report.status,
      severity: report.severity,
    }));
  }, [myReports]);

  const metricCards = [
    {
      key: 'approved',
      value: approvedReports,
      label: 'Approved Reports',
      icon: CheckCircle,
      iconWrapClass: 'bg-green-500/20 text-green-500',
    },
    {
      key: 'pending',
      value: pendingReports,
      label: 'Pending Review',
      icon: Clock,
      iconWrapClass: 'bg-amber-500/20 text-amber-400',
    },
    {
      key: 'rejected',
      value: rejectedReports,
      label: 'Rejected Reports',
      icon: AlertTriangle,
      iconWrapClass: 'bg-red-500/20 text-red-500',
    },
    {
      key: 'total',
      value: totalReports,
      label: 'Total Reports',
      icon: MapPin,
      iconWrapClass: 'bg-cyan-400/20 text-cyan-400',
    },
  ];

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

  if (isLoading) {
    return (
      <LoadingAnimation>
        <div className="min-h-screen flex items-center justify-center px-6">
          <Card variant="glass" size="lg">
            <div className="text-center p-8">
              <div className="w-14 h-14 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-5" />
              <h2 className="text-white text-xl mb-2">Loading dashboard...</h2>
              <p className="text-slate-300 text-base">Fetching your latest report stats</p>
            </div>
          </Card>
        </div>
      </LoadingAnimation>
    );
  }

  return (
    <LoadingAnimation>
      <div className="dashboard-page pb-8">
        <SpotlightEffect />
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-white py-12 px-6 pb-8 text-center"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {displayName}!
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
                  <SafetyScoreCard
                    score={safetyScore}
                    hasHistory={hasCssHistory}
                    maxScore={maxScore}
                    improvementFromLastMonth={improvementFromLastMonth}
                    size="sm"
                  />
                </Card>
              </motion.div>

              {metricCards.map((metric) => (
                <motion.div key={metric.key} variants={itemVariants} className="flex">
                  <Card variant="elevated" size="lg" className="flex-1 flex flex-col justify-center">
                    <div className="text-center">
                      <div className={`inline-flex p-3 rounded-full mb-4 ${metric.iconWrapClass}`}>
                        <metric.icon size={28} />
                      </div>

                      <h3 className="text-3xl font-bold text-white mb-2">
                        {metric.value}
                      </h3>

                      <p className="text-base text-slate-300">
                        {metric.label}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6 mb-8">
              {/* Safety Score Trend Chart */}
              <motion.div variants={itemVariants}>
                <Card variant="elevated" size="lg">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Monthly Reports
                  </h3>

                  <div className="h-75 mt-4">
                    {monthlyBreakdown.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                        No monthly report data yet
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyBreakdown}>
                          <defs>
                            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(203, 213, 225, 0.2)" />
                          <XAxis dataKey="month" stroke="#64748B" />
                          <YAxis allowDecimals={false} stroke="#64748B" />
                          <ChartTooltip
                            contentStyle={{
                              backgroundColor: '#FFFFFF',
                              border: 'none',
                              borderRadius: '0.75rem',
                              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            }}
                            formatter={(value) => [value, 'Reports']}
                          />
                          <Area
                            type="monotone"
                            dataKey="count"
                            stroke="#6366F1"
                            strokeWidth={3}
                            fill="url(#scoreGradient)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </Card>
              </motion.div>

              {/* Violation Breakdown Chart */}
              <motion.div variants={itemVariants}>
                <Card variant="elevated" size="lg">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Report Category Breakdown
                  </h3>

                  <div className="h-75 mt-4">
                    {categoryBreakdown.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                        No reports yet
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryBreakdown}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                          >
                            {categoryBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* CSS History */}
            <motion.div variants={itemVariants} className="mb-8">
              <Card variant="elevated" size="lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">CSS History</h3>
                  <span className="text-sm text-slate-400">Last 50 changes</span>
                </div>

                {!cssHistory?.length ? (
                  <div className="text-center py-10 text-slate-400 text-sm">
                    No CSS changes recorded yet
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {cssHistory.slice(0, 10).map((event) => {
                      const delta = typeof event?.delta === 'number' ? event.delta : 0;
                      const deltaLabel = delta > 0 ? `+${delta}` : `${delta}`;
                      const deltaClass = delta >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400';

                      return (
                        <div
                          key={event._id}
                          className="flex items-start gap-4 p-4 rounded-lg bg-background-tertiary border border-white/10"
                        >
                          <div className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-bold ${deltaClass}`}>
                            {deltaLabel}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-3 flex-wrap">
                              <p className="text-sm font-semibold text-white">
                                {event?.previousCss ?? '—'} → {event?.nextCss ?? '—'}
                              </p>
                              <span className="text-xs text-slate-400">
                                {event?.createdAt ? new Date(event.createdAt).toLocaleString() : ''}
                              </span>
                            </div>

                            <p className="text-sm text-slate-300 mt-1">
                              {event?.decision === 'approved' ? 'Approved report' : event?.decision === 'rejected' ? 'Rejected report' : 'Update'}
                              {event?.categoryId != null ? ` • Category: ${event.categoryId}` : ''}
                            </p>

                            {event?.note ? (
                              <p className="text-sm text-slate-200/90 mt-2 whitespace-pre-wrap">
                                {event.note}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}

                    {cssHistory.length > 10 && (
                      <p className="text-xs text-slate-400 pt-1">
                        Showing latest 10 changes. More available.
                      </p>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <Card variant="elevated" size="lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">
                    Recent Reports
                  </h3>

                  <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.MY_REPORTS)}>
                    View All
                  </Button>
                </div>

                <div className="flex flex-col gap-4">
                  {recentReports.length === 0 && (
                    <div className="text-center py-10 text-slate-400 text-sm">
                      No recent reports found
                    </div>
                  )}

                  {recentReports.map((report) => {
                    const statusColors = STATUS_COLOR_MAP[report.status] ?? STATUS_COLOR_MAP.pending;

                    return (
                      <motion.div
                        key={report.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-4 p-4 rounded-lg bg-background-tertiary border border-white/10"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400">
                          <MapPin size={20} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3 mb-1 flex-wrap">
                            <h4 className="text-base font-semibold text-white">
                              {report.title}
                            </h4>
                            <span
                              className="px-2 py-1 rounded-full text-xs font-semibold"
                              style={{ backgroundColor: statusColors.bg, color: statusColors.text }}
                            >
                              {formatStatusLabel(report.status)}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-slate-300 flex-wrap">
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {report.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {report.time}
                            </span>
                            <span className="capitalize">
                              Severity: {report.severity}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
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
