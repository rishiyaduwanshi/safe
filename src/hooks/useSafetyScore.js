import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '../constants/services.js';
import { useMyReports } from './useReports.js';

/**
 * Fetches the user's Citizen Safety Score (CSS) from the backend.
 *
 * The score is STORED on the User document in MongoDB (default 100, max 200)
 * and is mutated by the moderator on approve/reject — never recomputed here.
 *
 *   approved report  →  +category.weight
 *   rejected report  →  −category.weight × 3  (misuse penalty)
 *   clamped [0, 200]
 *
 * myReports is included so Dashboard can show recent activity + pie chart.
 */
export function useSafetyScore() {
    const { data: myReports = [] } = useMyReports();

    const { data: statsRes, isLoading } = useQuery({
        queryKey: ['report-stats'],
        queryFn: () => reportsApi.getMyStats(),
        staleTime: 1000 * 60 * 2, // 2 min
    });

    const stats = statsRes?.data ?? null;

    return {
        score: stats?.css ?? 0,
        maxScore: stats?.maxCss ?? 1000,
        improvementFromLastMonth: stats?.improvementFromLastMonth ?? 0,
        approvedReports: stats?.counts?.approved ?? 0,
        violationReports: myReports.filter((r) => r.category?.type === 'violation').length,
        reportsSubmitted: stats?.counts?.total ?? myReports.length,
        monthlyBreakdown: stats?.monthlyBreakdown ?? [],
        myReports,
        isLoading,
    };
}
