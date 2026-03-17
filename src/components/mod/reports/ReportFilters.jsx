import { SlidersHorizontal } from 'lucide-react';
import { STATUS_OPTIONS } from './reportQueueConfig.js';

const FilterChip = ({ label, active, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${active
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30 shadow-[0_0_0_1px_rgba(99,102,241,0.2)]'
                : 'bg-white/4 text-slate-400 border-white/8 hover:bg-white/8 hover:text-white'
                }`}
        >
            {label}
        </button>
    );
};

const ReportFilters = ({ status, needsReview, onStatusChange, onToggleNeedsReview }) => {
    return (
        <div
            className="rounded-2xl border border-white/8 p-4 sm:p-5 mb-5"
            style={{ background: 'rgba(13,13,20,0.65)', backdropFilter: 'blur(16px)' }}
        >
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                <SlidersHorizontal size={14} />
                Filters
            </div>

            <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((option) => (
                    <FilterChip
                        key={option.value}
                        label={option.label}
                        active={status === option.value}
                        onClick={() => onStatusChange(option.value)}
                    />
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/6 flex flex-wrap items-center gap-2">
                <FilterChip
                    label="Needs Review Only"
                    active={needsReview === 'true'}
                    onClick={onToggleNeedsReview}
                />
                <span className="text-xs text-slate-500">Use this to focus on low-confidence reports first.</span>
            </div>
        </div>
    );
};

export default ReportFilters;
