import { motion } from 'framer-motion';
import { MapPin, Clock, ChevronRight, Brain } from 'lucide-react';
import ReportStatusBadge from './ReportStatusBadge.jsx';
import SeverityBadge from './SeverityBadge.jsx';

const timeAgo = (dateStr) => {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const formatCategoryKey = (key) =>
  key?.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) ?? '—';

// ─── ReportCard ───────────────────────────────────────────────────────────────
// onClick is optional — when provided the card becomes clickable (expand detail)

const ReportCard = ({ report, onClick }) => {
  return (
    <motion.div
      whileHover={onClick ? { scale: 1.01 } : {}}
      onClick={onClick}
      className={`flex flex-col gap-3 p-4 rounded-xl border transition-colors ${onClick ? 'cursor-pointer hover:border-indigo-500/40' : ''
        }`}
      style={{ background: '#1e293b', borderColor: '#334155' }}
    >
      {/* Top row — category + badges */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-white truncate">
            {formatCategoryKey(report.category?.key)}
          </p>
          <p className="text-xs text-slate-400 capitalize">{report.category?.type}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <SeverityBadge severity={report.severity} />
          <ReportStatusBadge status={report.status} />
        </div>
      </div>

      {/* Report text preview */}
      <p className="text-sm text-slate-300 line-clamp-2">{report.reportText}</p>

      {/* Bottom row — metadata */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 text-xs text-slate-400">
          {report.location?.address && (
            <span className="flex items-center gap-1 truncate max-w-52">
              <MapPin size={12} />
              {report.location.address}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {timeAgo(report.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Brain size={12} />
            {(report.confidence * 100).toFixed(0)}% confidence
          </span>
        </div>
        {onClick && (
          <ChevronRight size={16} className="text-slate-500 shrink-0" />
        )}
      </div>

      {/* Review notice */}
      {report.needsReview && (
        <div className="text-xs px-3 py-1.5 rounded-lg" style={{ background: '#F59E0B15', color: '#F59E0B' }}>
          ⏳ Awaiting  review - confidence was below threshold
        </div>
      )}

      {report.status === 'rejected' && report.rejectionReason && (
        <div className="text-xs px-3 py-1.5 rounded-lg" style={{ background: '#EF444415', color: '#FCA5A5' }}>
          ❌ {report.rejectionReason}
        </div>
      )}
    </motion.div>
  );
};

export default ReportCard;
