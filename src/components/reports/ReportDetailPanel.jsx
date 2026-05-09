import { motion, AnimatePresence } from 'framer-motion';
import { createElement } from 'react';
import { X, MapPin, Calendar, Brain, AlertCircle } from 'lucide-react';
import { useReportById } from '../../hooks/index.js';
import ReportStatusBadge from './ReportStatusBadge.jsx';
import SeverityBadge from './SeverityBadge.jsx';

const Row = ({ icon: Icon, label, value }) => {
  const iconEl = Icon
    ? createElement(Icon, { size: 15, className: 'text-slate-400 mt-0.5 shrink-0' })
    : null;

  return (
    <div className="flex items-start gap-3">
      {iconEl}
      <div>
        <p className="text-xs text-slate-400 mb-0.5">{label}</p>
        <p className="text-sm text-white">{value || '—'}</p>
      </div>
    </div>
  );
};

const ReportDetailPanel = ({ reportId, onClose }) => {
  const { data: report, isLoading, isError } = useReportById(reportId);

  const comments = Array.isArray(report?.publicComments)
    ? report.publicComments
    : Array.isArray(report?.comments)
      ? report.comments
      : [];

  const formatRole = (role) => {
    // For end-users, we display AI notes under "System" to avoid confusion.
    if (role === 'ai') return 'System';
    if (role === 'system') return 'System';
    if (role === 'moderator') return 'Moderator';
    if (role === 'admin') return 'Admin';
    return 'Note';
  };

  return (
    <AnimatePresence>
      {reportId && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 overflow-y-auto flex flex-col"
            style={{ background: '#0f172a', borderLeft: '1px solid #334155' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b" style={{ borderColor: '#334155' }}>
              <h2 className="text-lg font-bold text-white">Report Detail</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 px-4 md:px-6 py-5">
              {isLoading && (
                <div className="flex items-center justify-center h-40">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {isError && (
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#EF444415', color: '#EF4444' }}>
                  <AlertCircle size={18} />
                  <p className="text-sm">Failed to load report details.</p>
                </div>
              )}

              {report && (
                <div className="flex flex-col gap-6">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <ReportStatusBadge status={report.status} />
                    <SeverityBadge severity={report.severity} />
                    {report.needsReview && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: '#F59E0B20', color: '#F59E0B' }}>
                        ⏳ Needs Review
                      </span>
                    )}
                  </div>

                  {/* Report text */}
                  <div className="p-4 rounded-xl" style={{ background: '#1e293b', border: '1px solid #334155' }}>
                    <p className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wide">Report Description</p>
                    <p className="text-sm text-slate-200 leading-relaxed">{report.reportText}</p>
                  </div>

                  {report.status === 'rejected' && report.rejectionReason && (
                    <div className="p-4 rounded-xl" style={{ background: '#1e293b', border: '1px solid #334155' }}>
                      <p className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wide">Rejection Reason</p>
                      <p className="text-sm text-slate-200 leading-relaxed">{report.rejectionReason}</p>
                    </div>
                  )}

                  {/* Classification */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">AI Classification</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl" style={{ background: '#1e293b' }}>
                        <p className="text-xs text-slate-400 mb-1">Category</p>
                        <p className="text-sm text-white font-medium">
                          {report.category?.key?.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                        </p>
                        <p className="text-xs text-slate-500 capitalize">{report.category?.type}</p>
                      </div>
                      <div className="p-3 rounded-xl" style={{ background: '#1e293b' }}>
                        <p className="text-xs text-slate-400 mb-1">Confidence</p>
                        <p className="text-sm text-white font-medium">{(report.confidence * 100).toFixed(1)}%</p>
                        <div className="w-full h-1 rounded-full mt-1.5" style={{ background: '#334155' }}>
                          <div
                            className="h-1 rounded-full"
                            style={{ width: `${report.confidence * 100}%`, background: report.confidence >= 0.75 ? '#10B981' : report.confidence >= 0.55 ? '#F59E0B' : '#EF4444' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location + date */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Details</p>
                    <div className="flex flex-col gap-3 p-4 rounded-xl" style={{ background: '#1e293b' }}>
                      <Row icon={MapPin} label="Location" value={report.location?.address} />
                      <Row icon={Brain} label="AI Confidence" value={`${(report.confidence * 100).toFixed(1)}%`} />
                      <Row icon={Calendar} label="Submitted" value={new Date(report.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })} />
                    </div>
                  </div>

                  {/* Comments */}
                  {comments.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Comments</p>
                      <div className="flex flex-col gap-2 p-4 rounded-xl" style={{ background: '#1e293b', border: '1px solid #334155' }}>
                        {comments
                          .slice()
                          .sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime())
                          .map((c, idx) => (
                            <div key={`${c.createdAt || 'c'}-${idx}`} className="text-sm text-slate-200">
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-xs text-slate-400">{formatRole(c.authorRole)}</span>
                                <span className="text-[11px] text-slate-500">
                                  {c.createdAt ? new Date(c.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : ''}
                                </span>
                              </div>
                              <p className="mt-1 leading-relaxed">{c.message}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Report ID */}
                  <p className="text-xs text-slate-600 font-mono break-all">ID: {report._id}</p>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReportDetailPanel;
