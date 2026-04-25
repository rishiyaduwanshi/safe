import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { modReportsApi } from '../constants/mod.services.js';

const PAGE_LIMIT = 15;

export function useModReportsQueue(options = {}) {
  const queryClient = useQueryClient();
  const initialFilters = options?.initialFilters;
  const [filters, setFilters] = useState(() => ({
    status: initialFilters?.status ?? '',
    needsReview: initialFilters?.needsReview ?? '',
  }));
  const [page, setPage] = useState(1);
  const [rejectTarget, setRejectTarget] = useState(null);

  const queryParams = { page, limit: PAGE_LIMIT, ...filters };

  const reportsQuery = useQuery({
    queryKey: ['mod-reports', queryParams],
    queryFn: () => modReportsApi.list(queryParams),
    keepPreviousData: true,
  });

  const invalidateReports = () => queryClient.invalidateQueries({ queryKey: ['mod-reports'] });

  const approveMutation = useMutation({
    mutationFn: ({ id, comment }) => modReportsApi.approve(id, { comment }),
    onSuccess: invalidateReports,
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, categoryKey }) => modReportsApi.updateCategory(id, categoryKey),
    onSuccess: invalidateReports,
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }) => modReportsApi.reject(id, reason),
    onSuccess: () => {
      invalidateReports();
      setRejectTarget(null);
    },
  });

  const reports = reportsQuery.data?.data?.reports ?? [];
  const pagination = reportsQuery.data?.data?.pagination ?? {};

  const totalPages = pagination.totalPages ?? 1;
  const totalReports = pagination.total ?? reports.length;

  const setStatusFilter = (status) => {
    setFilters((current) => ({ ...current, status }));
    setPage(1);
  };

  const toggleNeedsReviewFilter = () => {
    setFilters((current) => ({
      ...current,
      needsReview: current.needsReview === 'true' ? '' : 'true',
    }));
    setPage(1);
  };

  const openRejectModal = (report) => setRejectTarget(report);
  const closeRejectModal = () => setRejectTarget(null);

  const approveReport = (reportId, comment = '') => {
    if (!reportId) return;
    approveMutation.mutate({ id: reportId, comment });
  };

  const updateCategory = (reportId, categoryKey) => {
    if (!reportId || !categoryKey) return;
    updateCategoryMutation.mutate({ id: reportId, categoryKey });
  };

  const rejectReport = (reason) => {
    const reportId = rejectTarget?._id;
    if (!reportId) return;

    rejectMutation.mutate({ id: reportId, reason });
  };

  const isApprovingReport = (reportId) => (
    approveMutation.isPending && approveMutation.variables?.id === reportId
  );

  const isRejectingReport = (reportId) => (
    rejectMutation.isPending && rejectMutation.variables?.id === reportId
  );

  const isUpdatingCategory = (reportId) => (
    updateCategoryMutation.isPending && updateCategoryMutation.variables?.id === reportId
  );

  return {
    filters,
    page,
    setPage,
    reports,
    totalPages,
    totalReports,
    isLoading: reportsQuery.isLoading,
    isError: reportsQuery.isError,
    isFetching: reportsQuery.isFetching,
    refetchReports: reportsQuery.refetch,
    rejectTarget,
    setStatusFilter,
    toggleNeedsReviewFilter,
    openRejectModal,
    closeRejectModal,
    approveReport,
    updateCategory,
    rejectReport,
    isRejectPending: rejectMutation.isPending,
    isApprovingReport,
    isRejectingReport,
    isUpdatingCategory,
  };
}
