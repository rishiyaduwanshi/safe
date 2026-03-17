import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const RADIUS = 65;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// ── Helpers ──────────────────────────────────────────────────────────────────

// Thresholds on 0–1000 scale (CIBIL-style)
export const getScoreColor = (score, hasHistory = true) => {
    if (!hasHistory) return '#64748B'; // no history
    if (score >= 750) return '#10B981'; // excellent
    if (score >= 600) return '#22D3EE'; // good
    if (score >= 400) return '#F59E0B'; // fair
    return '#EF4444'; // poor
};

// Returns a plain-English label + color — easy for any user to understand
export const getScoreGrade = (score, hasHistory = true) => {
    if (!hasHistory) return { grade: 'No History', color: '#64748B' };
    if (score >= 900) return { grade: 'Exceptional', color: '#10B981' };
    if (score >= 750) return { grade: 'Excellent', color: '#10B981' };
    if (score >= 650) return { grade: 'Good', color: '#22D3EE' };
    if (score >= 600) return { grade: 'Fair', color: '#F59E0B' };
    if (score >= 400) return { grade: 'Average', color: '#F59E0B' };
    return { grade: 'Poor', color: '#EF4444' };
};

// ── Component ────────────────────────────────────────────────────────────────

/**
 * SafetyScoreCard
 *
 * Renders a circular SVG gauge that animates from 0 → `score`.
 *
 * Props:
 *   score                   – current score (0-1000)
 *   hasHistory              – whether score is initialized from moderation history
 *   maxScore                – max possible score (default 1000)
 *   improvementFromLastMonth – numeric delta to show trend label
 *   size                    – 'sm' | 'md' (default 'md')
 *   showTrend               – show "+N this month" label (default true)
 */
const SafetyScoreCard = ({
    score,
    hasHistory = score > 0,
    maxScore = 1000,
    improvementFromLastMonth = 0,
    size = 'md',
    showTrend = true,
}) => {
    const [animated, setAnimated] = useState(0);

    useEffect(() => {
        const t = setTimeout(() => {
            let current = 0;
            const steps = 60;
            const step = score / steps;
            const interval = setInterval(() => {
                current += step;
                if (current >= score) {
                    setAnimated(score);
                    clearInterval(interval);
                } else {
                    setAnimated(Math.floor(current));
                }
            }, 30);
            return () => clearInterval(interval);
        }, 400);
        return () => clearTimeout(t);
    }, [score]);

    const dim = size === 'sm' ? 120 : 150;
    const cx = dim / 2;
    const cy = dim / 2;
    const strokeW = size === 'sm' ? 8 : 10;
    const r = size === 'sm' ? 50 : RADIUS;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - animated / maxScore);
    const color = getScoreColor(score, hasHistory);
    const { grade, color: gradeColor } = getScoreGrade(score, hasHistory);

    const TrendIcon = improvementFromLastMonth > 0
        ? TrendingUp
        : improvementFromLastMonth < 0
            ? TrendingDown
            : Minus;

    const trendColor = improvementFromLastMonth > 0
        ? '#10B981'
        : improvementFromLastMonth < 0
            ? '#EF4444'
            : '#64748B';

    const trendLabel = improvementFromLastMonth > 0
        ? `+${improvementFromLastMonth} reports vs last month`
        : improvementFromLastMonth < 0
            ? `${improvementFromLastMonth} reports vs last month`
            : 'Same as last month';

    return (
        <div className="text-center">
            <div className="relative mx-auto" style={{ width: dim, height: dim }}>
                <svg width={dim} height={dim} className="-rotate-90">
                    <circle
                        cx={cx} cy={cy} r={r}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={strokeW}
                        fill="transparent"
                    />
                    <circle
                        cx={cx} cy={cy} r={r}
                        stroke={color}
                        strokeWidth={strokeW}
                        fill="transparent"
                        strokeLinecap="round"
                        strokeDasharray={circ}
                        strokeDashoffset={offset}
                        style={{ transition: 'stroke-dashoffset 0.05s linear' }}
                    />
                </svg>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <div
                        className={`font-bold ${size === 'sm' ? 'text-xl' : 'text-2xl'}`}
                        style={{ color }}
                    >
                        {animated}
                    </div>
                    <div className="text-xs text-slate-400">/ {maxScore}</div>
                </div>
            </div>

            {/* Plain-English status label */}
            <div
                className="mt-3 inline-block px-3 py-1 rounded-full text-sm font-semibold"
                style={{ background: `${gradeColor}20`, color: gradeColor }}
            >
                {grade}
            </div>

            <div className="text-xs text-slate-400 mt-1">Safety Score</div>

            {showTrend && (
                <div
                    className="mt-2 flex items-center justify-center gap-1 text-sm font-medium"
                    style={{ color: trendColor }}
                >
                    <TrendIcon size={14} />
                    {trendLabel}
                </div>
            )}
        </div>
    );
};

export default SafetyScoreCard;
