import React from 'react';

const styles = {
  active: 'bg-emerald-500/14 border-emerald-500/30 text-emerald-200',
  inactive: 'bg-red-500/10 border-red-500/25 text-red-200',
  neutral: 'bg-white/7 border-white/12 text-slate-200',
};

const StatusBadge = ({ tone = 'neutral', children }) => {
  const cls = styles[tone] ?? styles.neutral;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs border ${cls}`}>
      {children}
    </span>
  );
};

export default StatusBadge;
