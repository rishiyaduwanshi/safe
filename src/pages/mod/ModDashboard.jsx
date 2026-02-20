import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  FileText, Clock, CheckCircle, XCircle, AlertTriangle, ArrowRight, BarChart3,
} from 'lucide-react';
import { modStatsApi } from '../../constants/mod.services.js';
import { MOD_ROUTES } from '../../constants/routes.js';
import { useModAuth } from '../../contexts/ModAuthContext.jsx';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const STAT_CONFIG = [
  { key: 'total', label: 'Total Reports', icon: FileText, color: 'text-slate-300', bg: 'bg-slate-500/12', border: 'border-slate-500/20' },
  { key: 'pending', label: 'Pending', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { key: 'review', label: 'Needs Review', icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { key: 'approved', label: 'Approved', icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { key: 'rejected', label: 'Rejected', icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
];

const StatCard = ({ config, value }) => {
  const Icon = config.icon;
  return (
    <motion.div variants={itemVariants}
      className={`rounded-2xl p-5 border ${config.border} flex items-center gap-4`}
      style={{ background: 'rgba(13,13,20,0.8)', backdropFilter: 'blur(20px)' }}
    >
      <div className={`w-11 h-11 rounded-xl ${config.bg} ${config.border} border flex items-center justify-center shrink-0`}>
        <Icon size={20} className={config.color} />
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value ?? '—'}</p>
        <p className="text-xs text-slate-500 mt-0.5">{config.label}</p>
      </div>
    </motion.div>
  );
};

const ModDashboard = () => {
  const { moderator } = useModAuth();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['mod-stats'],
    queryFn: () => modStatsApi.get(),
    staleTime: 1000 * 30,
  });

  const stats = data?.data ?? {};

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <BarChart3 size={22} className="text-indigo-400" />
          <h1 className="text-xl font-bold text-white">Dashboard</h1>
        </div>
        <p className="text-sm text-slate-500">
          Welcome back, <span className="text-slate-300 font-medium">{moderator?.name}</span>. Here's your overview.
        </p>
      </motion.div>

      {/* Stats grid */}
      {isError ? (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          Failed to load stats. Please refresh.
        </p>
      ) : (
        <motion.div
          variants={containerVariants} initial="hidden" animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8"
        >
          {STAT_CONFIG.map(cfg => (
            <StatCard key={cfg.key} config={cfg} value={isLoading ? null : stats[cfg.key]} />
          ))}
        </motion.div>
      )}

      {/* Quick actions */}
      <motion.div
        variants={containerVariants} initial="hidden" animate="visible"
        className="grid sm:grid-cols-2 gap-4"
      >
        <motion.button
          variants={itemVariants}
          onClick={() => navigate(MOD_ROUTES.REPORTS_QUEUE)}
          className="group flex items-center justify-between p-5 rounded-2xl border border-orange-500/20 bg-orange-500/8 hover:bg-orange-500/12 text-left transition-all duration-200"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={17} className="text-orange-400" />
              <span className="text-sm font-semibold text-white">Review Queue</span>
            </div>
            <p className="text-xs text-slate-500">Process reports flagged for review</p>
          </div>
          <ArrowRight size={16} className="text-orange-400 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <motion.button
          variants={itemVariants}
          onClick={() => navigate(MOD_ROUTES.REPORTS)}
          className="group flex items-center justify-between p-5 rounded-2xl border border-white/8 bg-white/4 hover:bg-white/7 text-left transition-all duration-200"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileText size={17} className="text-indigo-400" />
              <span className="text-sm font-semibold text-white">All Reports</span>
            </div>
            <p className="text-xs text-slate-500">Browse and manage all submitted reports</p>
          </div>
          <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ModDashboard;
