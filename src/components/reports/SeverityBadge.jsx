const SEVERITY_CONFIG = {
  low: { label: 'Low', bg: '#10B98120', color: '#10B981' },
  medium: { label: 'Medium', bg: '#F59E0B20', color: '#F59E0B' },
  high: { label: 'High', bg: '#EF444420', color: '#EF4444' },
  critical: { label: 'Critical', bg: '#DC262620', color: '#DC2626' },
};

const SeverityBadge = ({ severity }) => {
  const cfg = SEVERITY_CONFIG[severity] ?? SEVERITY_CONFIG.low;
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
};

export default SeverityBadge;
