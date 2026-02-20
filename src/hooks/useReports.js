import { useQuery } from '@tanstack/react-query';
import { reportsApi } from '../constants/services.js';

// ─── Query key factory — keeps keys consistent across the app ────────────────
export const reportKeys = {
  all: () => ['reports'],
  mine: () => [...reportKeys.all(), 'mine'],
  detail: (id) => [...reportKeys.all(), 'detail', id],
};

// ─── All reports for the logged-in user ──────────────────────────────────────
export function useMyReports() {
  return useQuery({
    queryKey: reportKeys.mine(),
    queryFn: () => reportsApi.getMyReports(),
    select: (res) => res.data.reports ?? [],
    staleTime: 1000 * 60 * 2, // 2 min
  });
}

// ─── Single report by ID ──────────────────────────────────────────────────────
export function useReportById(id) {
  return useQuery({
    queryKey: reportKeys.detail(id),
    queryFn: () => reportsApi.getReportById(id),
    select: (res) => res.data.report,
    enabled: !!id, // only runs when an id is provided
    staleTime: 1000 * 60 * 5,
  });
}
