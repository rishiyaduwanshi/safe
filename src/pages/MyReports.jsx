import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingAnimation, SpotlightEffect } from '../components/index.js';
import { ReportCard, ReportDetailPanel } from '../components/reports/index.js';
import { useMyReports } from '../hooks/index.js';
import { ROUTES } from '../constants/index.js';

// ─── Filter options ───────────────────────────────────────────────────────────
const STATUS_FILTERS = ['all', 'pending', 'review', 'approved', 'rejected'];
const SEVERITY_FILTERS = ['all', 'low', 'medium', 'high', 'critical'];

const FilterChip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all border ${active
      ? 'text-white border-indigo-500'
      : 'text-slate-400 border-slate-700 hover:border-slate-500'
      }`}
    style={active ? { background: 'rgba(99,102,241,0.2)' } : { background: 'transparent' }}
  >
    {label === 'all' ? 'All' : label}
  </button>
);

// ─── Loading skeleton ─────────────────────────────────────────────────────────
const ReportSkeleton = () => (
  <div className="flex flex-col gap-3 p-4 rounded-xl animate-pulse" style={{ background: '#1e293b' }}>
    <div className="flex justify-between">
      <div className="h-4 w-32 rounded" style={{ background: '#334155' }} />
      <div className="h-5 w-20 rounded-full" style={{ background: '#334155' }} />
    </div>
    <div className="h-3 w-full rounded" style={{ background: '#334155' }} />
    <div className="h-3 w-3/4 rounded" style={{ background: '#334155' }} />
    <div className="h-3 w-24 rounded" style={{ background: '#334155' }} />
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const MyReportsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);

  const { data: reports = [], isLoading, isError } = useMyReports();

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) setSelectedId(id);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      const matchStatus = statusFilter === 'all' || r.status === statusFilter;
      const matchSeverity = severityFilter === 'all' || r.severity === severityFilter;
      return matchStatus && matchSeverity;
    });
  }, [reports, statusFilter, severityFilter]);

  return (
    <div className="min-h-screen py-8 px-6 bg-linear-to-b from-background-primary via-background-secondary to-background-tertiary">
      <SpotlightEffect />
      <LoadingAnimation>
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8 flex-wrap gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl" style={{ background: '#6366F115' }}>
                <FileText size={22} className="text-indigo-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">My Reports</h1>
                <p className="text-sm text-slate-400">
                  {isLoading ? 'Loading…' : `${reports.length} total`}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(ROUTES.REPORT)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(to right, #6366F1, #8B5CF6)' }}
            >
              <Plus size={16} />
              New Report
            </button>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="flex flex-col gap-3 mb-6"
          >
            {/* Status filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500 font-medium w-14 shrink-0">Status</span>
              {STATUS_FILTERS.map((s) => (
                <FilterChip key={s} label={s} active={statusFilter === s} onClick={() => setStatusFilter(s)} />
              ))}
            </div>
            {/* Severity filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500 font-medium w-14 shrink-0">Severity</span>
              {SEVERITY_FILTERS.map((s) => (
                <FilterChip key={s} label={s} active={severityFilter === s} onClick={() => setSeverityFilter(s)} />
              ))}
            </div>
          </motion.div>

          {/* Count after filter */}
          {!isLoading && (
            <p className="text-xs text-slate-500 mb-4">
              Showing {filtered.length} of {reports.length} reports
            </p>
          )}

          {/* Report List */}
          <div className="flex flex-col gap-3">
            {isLoading && Array.from({ length: 4 }).map((_, i) => <ReportSkeleton key={i} />)}

            {isError && (
              <div className="text-center py-16">
                <p className="text-slate-400">Failed to load reports. Please try again.</p>
              </div>
            )}

            {!isLoading && !isError && filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-20 flex flex-col items-center gap-4"
              >
                <div className="text-5xl">📋</div>
                <p className="text-white font-semibold text-lg">No reports found</p>
                <p className="text-slate-400 text-sm max-w-xs">
                  {reports.length === 0
                    ? 'You haven\'t submitted any reports yet.'
                    : 'No reports match the selected filters.'}
                </p>
                {reports.length === 0 && (
                  <button
                    onClick={() => navigate(ROUTES.REPORT)}
                    className="mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{ background: 'linear-gradient(to right, #6366F1, #8B5CF6)' }}
                  >
                    Submit your first report
                  </button>
                )}
              </motion.div>
            )}

            {filtered.map((report, i) => (
              <motion.div
                key={report._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <ReportCard
                  report={report}
                  onClick={() => setSelectedId(report._id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </LoadingAnimation>

      {/* Detail panel — rendered outside the scrollable area */}
      <ReportDetailPanel
        reportId={selectedId}
        onClose={() => {
          setSelectedId(null);
          if (searchParams.get('id')) {
            setSearchParams((prev) => {
              const next = new URLSearchParams(prev);
              next.delete('id');
              return next;
            }, { replace: true });
          }
        }}
      />
    </div>
  );
};

export default MyReportsPage;
