import { AnimatePresence } from 'framer-motion';
import { CheckCircle, ChevronLeft, ChevronRight, FileText, RefreshCw } from 'lucide-react';
import {
  ReportFilters,
  ReportQueueRow,
  RejectReportModal,
} from '../../components/mod/reports/index.js';
import { useModReportsQueue } from '../../hooks/index.js';

const ModReportsQueue = () => {
  const {
    filters,
    page,
    setPage,
    reports,
    totalPages,
    totalReports,
    isLoading,
    isError,
    isFetching,
    refetchReports,
    rejectTarget,
    setStatusFilter,
    toggleNeedsReviewFilter,
    openRejectModal,
    closeRejectModal,
    approveReport,
    rejectReport,
    isRejectPending,
    isApprovingReport,
    isRejectingReport,
  } = useModReportsQueue();

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <FileText size={20} className="text-indigo-400" />
            <h1 className="text-xl font-bold text-white">All Reports</h1>
          </div>
          <p className="text-sm text-slate-500">Review, approve, and moderate submitted reports</p>
          {!isLoading && !isError && (
            <p className="text-xs text-slate-500 mt-2">{totalReports} reports found</p>
          )}
        </div>

        <button
          onClick={() => refetchReports()}
          disabled={isFetching}
          className="p-2.5 rounded-xl text-slate-500 hover:text-white hover:bg-white/8 border border-white/8 transition-all"
        >
          <RefreshCw size={15} className={isFetching ? 'animate-spin' : ''} />
        </button>
      </div>

      <ReportFilters
        status={filters.status}
        needsReview={filters.needsReview}
        onStatusChange={setStatusFilter}
        onToggleNeedsReview={toggleNeedsReviewFilter}
      />

      <div
        className="rounded-2xl border border-white/8 p-4 sm:p-5"
        style={{ background: 'rgba(13,13,20,0.65)', backdropFilter: 'blur(16px)' }}
      >
        {isLoading ? (
          <div className="flex justify-center py-18">
            <div className="w-9 h-9 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : isError ? (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            Failed to load reports.
          </p>
        ) : reports.length === 0 ? (
          <div className="text-center py-18">
            <CheckCircle size={34} className="text-green-500/40 mx-auto mb-3" />
            <p className="text-sm text-slate-500">No reports match the current filters.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {reports.map((report) => (
              <ReportQueueRow
                key={report._id}
                report={report}
                onApprove={approveReport}
                onReject={openRejectModal}
                approving={isApprovingReport(report._id)}
                rejecting={isRejectingReport(report._id)}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6 pt-5 border-t border-white/6">
            <button
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="text-xs text-slate-500">Page {page} of {totalPages}</span>

            <button
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/8 disabled:opacity-30 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {rejectTarget && (
          <RejectReportModal
            report={rejectTarget}
            onClose={closeRejectModal}
            onConfirm={rejectReport}
            loading={isRejectPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModReportsQueue;
