import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, FileText, Eye, Pencil, Clock, MapPin, User } from 'lucide-react';
import ReportBadge from './ReportBadge.jsx';
import {
  formatDateTime,
  formatLabel,
  SEVERITY_COLOR_MAP,
  STATUS_COLOR_MAP,
} from './reportQueueConfig.js';
import { flatCategory } from '../../../data/category.ts';

const ReportQueueRow = ({
  report,
  onApprove,
  onUpdateCategory,
  onReject,
  approving,
  rejecting,
  updatingCategory,
  canEditCategory,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [categoryKey, setCategoryKey] = useState(report.category?.key ?? '');
  const [moderatorComment, setModeratorComment] = useState('');
  const categorySelectRef = useRef(null);
  const canAct = report.status === 'pending' || report.status === 'review';

  const categoryLabel = formatLabel(report.category?.key);
  const statusLabel = formatLabel(report.status);
  const severityLabel = formatLabel(report.severity);
  const reporter = typeof report.submittedBy === 'object' && report.submittedBy !== null
    ? report.submittedBy
    : null;
  const confidencePct = Number.isFinite(report.confidence)
    ? `${Math.round(report.confidence * 100)}%`
    : null;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/8 overflow-hidden"
      style={{ background: 'rgba(13,13,20,0.8)', backdropFilter: 'blur(18px)' }}
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 p-5">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/12 border border-indigo-500/20 flex items-center justify-center shrink-0">
          <FileText size={18} className="text-indigo-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <ReportBadge
              text={statusLabel}
              colorClass={STATUS_COLOR_MAP[report.status] ?? 'text-slate-400 bg-white/5 border-white/10'}
            />
            {report.severity && (
              <ReportBadge
                text={severityLabel}
                colorClass={SEVERITY_COLOR_MAP[report.severity] ?? 'text-slate-400 bg-white/5 border-white/10'}
              />
            )}
            {report.needsReview && (
              <ReportBadge
                text="Needs Review"
                colorClass="text-orange-400 bg-orange-500/10 border-orange-500/20"
              />
            )}
          </div>

          <h3 className="text-sm font-semibold text-white mb-1.5">{categoryLabel}</h3>

          <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
            {report.reportText ?? 'No description'}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} />
              {formatDateTime(report.createdAt)}
            </span>
            {report.location?.address && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={12} />
                {report.location.address}
              </span>
            )}
            {reporter?.name && (
              <span className="inline-flex items-center gap-1.5">
                <User size={12} />
                {reporter.name}
              </span>
            )}
            <span>• ID: {report._id?.slice(-8)}</span>
          </div>
        </div>

        <div className="flex items-center lg:items-end gap-2 shrink-0">
          <button
            onClick={() => setExpanded((current) => !current)}
            className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-all"
          >
            <Eye size={15} />
          </button>

          {canAct && canEditCategory && (
            <button
              onClick={() => {
                setExpanded(true);
                setTimeout(() => categorySelectRef.current?.focus?.(), 0);
              }}
              className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 transition-all"
              title="Change category"
            >
              <Pencil size={15} />
            </button>
          )}

          {canAct && (
            <>
              <button
                onClick={() => {
                  onApprove?.(report._id, moderatorComment.trim());
                  setModeratorComment('');
                }}
                disabled={approving || rejecting}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/25 hover:bg-green-500/20 disabled:opacity-50 transition-all"
              >
                <CheckCircle size={13} />
                {approving ? 'Approving...' : 'Approve'}
              </button>

              <button
                onClick={() => onReject(report)}
                disabled={approving || rejecting}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 disabled:opacity-50 transition-all"
              >
                <XCircle size={13} />
                Reject
              </button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/6"
          >
            <div className="px-5 py-4 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-xs text-slate-500">
              {reporter?.email && (
                <div>
                  <span className="text-slate-400 font-medium">Reporter: </span>
                  {reporter.email}
                </div>
              )}
              {report.location?.address && (
                <div>
                  <span className="text-slate-400 font-medium">Location: </span>
                  {report.location.address}
                </div>
              )}
              {report.location?.lat != null && report.location?.lng != null && (
                <div>
                  <span className="text-slate-400 font-medium">Coordinates: </span>
                  {report.location.lat}, {report.location.lng}
                </div>
              )}
              <div>
                <span className="text-slate-400 font-medium">Category Type: </span>
                {formatLabel(report.category?.type)}
              </div>
              <div>
                <span className="text-slate-400 font-medium">Category Id: </span>
                {report.category?.id ?? 'N/A'}
              </div>
              {confidencePct && (
                <div>
                  <span className="text-slate-400 font-medium">Confidence: </span>
                  {confidencePct}
                </div>
              )}

              {canAct && canEditCategory && (
                <div className="col-span-2 mt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1">
                      <div className="text-slate-400 font-medium mb-1">Change category</div>
                      <select
                        ref={categorySelectRef}
                        value={categoryKey}
                        onChange={(event) => setCategoryKey(event.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500/50"
                      >
                        {flatCategory.map((cat) => (
                          <option key={cat.key} value={cat.key}>
                            {cat.label} ({cat.type})
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => onUpdateCategory?.(report._id, categoryKey)}
                      disabled={!categoryKey || updatingCategory || approving || rejecting}
                      className="h-9 px-4 rounded-xl text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/25 hover:bg-indigo-500/20 disabled:opacity-50 transition-all"
                    >
                      {updatingCategory ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              )}

              {canAct && (
                <div className="col-span-2">
                  <div className="text-slate-400 font-medium mb-1">Moderator comment (optional)</div>
                  <textarea
                    value={moderatorComment}
                    onChange={(event) => setModeratorComment(event.target.value)}
                    rows={2}
                    placeholder="Why approving / any notes..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-500/50 resize-none"
                  />
                </div>
              )}
              {report.rejectionReason && (
                <div className="col-span-2">
                  <span className="text-red-400 font-medium">Rejection reason: </span>
                  {report.rejectionReason}
                </div>
              )}

              {Array.isArray(report.comments) && report.comments.length > 0 && (
                <div className="col-span-2">
                  <div className="text-slate-400 font-medium mb-1">Comments:</div>
                  <div className="space-y-2">
                    {report.comments
                      .slice()
                      .sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime())
                      .map((c, idx) => (
                        <div
                          key={`${c.createdAt || 'c'}-${idx}`}
                          className="rounded-xl border border-white/8 bg-white/5 px-3 py-2 text-slate-300"
                        >
                          <div className="flex items-center justify-between gap-3 text-[11px] text-slate-500">
                            <span className="uppercase tracking-wide">{c.authorRole || 'note'}</span>
                            <span>{c.createdAt ? formatDateTime(c.createdAt) : ''}</span>
                          </div>
                          <div className="text-xs mt-1 leading-relaxed">{c.message}</div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default ReportQueueRow;
