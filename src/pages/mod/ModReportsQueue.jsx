import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, XCircle, AlertTriangle, FileText, ChevronLeft, ChevronRight,
  RefreshCw, SlidersHorizontal, Eye,
} from 'lucide-react';
import { modReportsApi } from '../../constants/mod.services.js';

/* ---------- constants ---------- */
const STATUS_OPTS = [
  { value: '', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'review', label: 'Under Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];
const SEV_OPTS = [
  { value: '', label: 'All Severity' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];
const SEV_COLOR = {
  low: 'text-green-400  bg-green-500/10  border-green-500/20',
  medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  high: 'text-red-400    bg-red-500/10    border-red-500/20',
};
const STATUS_COLOR = {
  pending: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  review: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  approved: 'text-green-400  bg-green-500/10  border-green-500/20',
  rejected: 'text-red-400    bg-red-500/10    border-red-500/20',
};

/* ---------- sub-components ---------- */
const Badge = ({ text, colorClass }) => (
  <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${colorClass}`}>
    {text}
  </span>
);

const FilterChip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${active
      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
      : 'bg-white/4 text-slate-400 border-white/8 hover:bg-white/8 hover:text-white'
      }`}
  >
    {label}
  </button>
);

/* ---------- Reject modal ---------- */
const RejectModal = ({ report, onClose, onConfirm, loading }) => {
  const [reason, setReason] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-2xl p-6 border border-white/10"
        style={{ background: '#0d0d14' }}
      >
        <h3 className="text-base font-bold text-white mb-1">Reject Report</h3>
        <p className="text-xs text-slate-500 mb-4">
          ID: <span className="text-slate-400">{report._id}</span>
        </p>
        <textarea
          value={reason} onChange={e => setReason(e.target.value)}
          placeholder="Reason for rejection (optional)…"
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-red-500/50 resize-none mb-4"
        />
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-white/6 border border-white/8 hover:bg-white/10 transition-all">
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reason)} disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Rejecting…' : 'Confirm Reject'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

/* ---------- Report row ---------- */
const ReportRow = ({ report, onApprove, onReject, approving, rejecting }) => {
  const [expanded, setExpanded] = useState(false);
  const canAct = report.status === 'pending' || report.status === 'review';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-white/8 overflow-hidden"
      style={{ background: 'rgba(13,13,20,0.7)' }}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <div className="w-9 h-9 rounded-lg bg-indigo-500/12 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
          <FileText size={16} className="text-indigo-400" />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2 mb-1.5">
            <Badge text={report.status} colorClass={STATUS_COLOR[report.status] ?? 'text-slate-400 bg-white/5 border-white/10'} />
            {report.severity && <Badge text={report.severity} colorClass={SEV_COLOR[report.severity] ?? 'text-slate-400 bg-white/5 border-white/10'} />}
            {report.needsReview && <Badge text="Needs Review" colorClass="text-orange-400 bg-orange-500/10 border-orange-500/20" />}
          </div>
          <p className="text-sm text-slate-300 line-clamp-2">{report.description ?? 'No description'}</p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-600">
            <span>{new Date(report.createdAt).toLocaleDateString()}</span>
            {report.category && <span>• {report.category}</span>}
            <span>• ID: {report._id?.slice(-8)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => setExpanded(v => !v)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-all">
            <Eye size={15} />
          </button>
          {canAct && (
            <>
              <button onClick={() => onApprove(report._id)} disabled={approving || rejecting}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/25 hover:bg-green-500/20 disabled:opacity-50 transition-all">
                <CheckCircle size={13} />
                {approving ? '…' : 'Approve'}
              </button>
              <button onClick={() => onReject(report)} disabled={approving || rejecting}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 disabled:opacity-50 transition-all">
                <XCircle size={13} />
                Reject
              </button>
            </>
          )}
        </div>
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/6"
          >
            <div className="px-4 py-3 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-500">
              {report.location?.address && <div><span className="text-slate-400 font-medium">Location: </span>{report.location.address}</div>}
              {report.aiClassification?.category && <div><span className="text-slate-400 font-medium">AI Category: </span>{report.aiClassification.category}</div>}
              {report.aiClassification?.confidence != null && <div><span className="text-slate-400 font-medium">AI Confidence: </span>{(report.aiClassification.confidence * 100).toFixed(0)}%</div>}
              {report.rejectionReason && <div className="col-span-2"><span className="text-red-400 font-medium">Rejection reason: </span>{report.rejectionReason}</div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ---------- Main page ---------- */
const ModReportsQueue = () => {
  const qc = useQueryClient();
  const [filters, setFilters] = useState({ status: 'review', needsReview: '' });
  const [page, setPage] = useState(1);
  const [rejectTarget, setRejectTarget] = useState(null);

  const queryParams = { page, limit: 15, ...filters };

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['mod-reports', queryParams],
    queryFn: () => modReportsApi.list(queryParams),
    keepPreviousData: true,
  });

  const reports = data?.data?.reports ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  const approveMutation = useMutation({
    mutationFn: (id) => modReportsApi.approve(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['mod-reports'] }),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }) => modReportsApi.reject(id, reason),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mod-reports'] });
      setRejectTarget(null);
    },
  });

  const handleFilterStatus = (val) => { setFilters(p => ({ ...p, status: val })); setPage(1); };
  const handleFilterNR = (val) => { setFilters(p => ({ ...p, needsReview: val })); setPage(1); };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <AlertTriangle size={20} className="text-orange-400" />
            <h1 className="text-lg font-bold text-white">Reports Queue</h1>
          </div>
          <p className="text-xs text-slate-500">Review and moderate submitted reports</p>
        </div>
        <button onClick={() => refetch()} disabled={isFetching}
          className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-all">
          <RefreshCw size={15} className={isFetching ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5 pb-5 border-b border-white/6">
        <SlidersHorizontal size={15} className="text-slate-500 self-center mr-1" />
        {STATUS_OPTS.map(o => (
          <FilterChip key={o.value} label={o.label} active={filters.status === o.value} onClick={() => handleFilterStatus(o.value)} />
        ))}
        <div className="w-px bg-white/8 self-stretch mx-1" />
        <FilterChip label="Needs Review Only" active={filters.needsReview === 'true'} onClick={() => handleFilterNR(filters.needsReview === 'true' ? '' : 'true')} />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : isError ? (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          Failed to load reports.
        </p>
      ) : reports.length === 0 ? (
        <div className="text-center py-16">
          <CheckCircle size={32} className="text-green-500/40 mx-auto mb-3" />
          <p className="text-sm text-slate-500">No reports match the current filters.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {reports.map(r => (
            <ReportRow
              key={r._id}
              report={r}
              onApprove={(id) => approveMutation.mutate(id)}
              onReject={(report) => setRejectTarget(report)}
              approving={approveMutation.isPending && approveMutation.variables === r._id}
              rejecting={rejectMutation.isPending && rejectMutation.variables?.id === r._id}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 disabled:opacity-30 transition-all">
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs text-slate-500">Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 disabled:opacity-30 transition-all">
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Reject modal */}
      <AnimatePresence>
        {rejectTarget && (
          <RejectModal
            report={rejectTarget}
            onClose={() => setRejectTarget(null)}
            onConfirm={(reason) => rejectMutation.mutate({ id: rejectTarget._id, reason })}
            loading={rejectMutation.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModReportsQueue;
