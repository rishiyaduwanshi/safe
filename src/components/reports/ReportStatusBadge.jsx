const STATUS_CONFIG = {
  pending: { label: 'Pending', bg: '#0EA5E920', color: '#0EA5E9', dot: '#0EA5E9' },
  review: { label: 'In Review', bg: '#F59E0B20', color: '#F59E0B', dot: '#F59E0B' },
  approved: { label: 'Approved', bg: '#10B98120', color: '#10B981', dot: '#10B981' },
  rejected: { label: 'Rejected', bg: '#EF444420', color: '#EF4444', dot: '#EF4444' },
};

const ReportStatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
};

export default ReportStatusBadge;
