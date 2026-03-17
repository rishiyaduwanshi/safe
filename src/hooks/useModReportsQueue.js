import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { modReportsApi } from '../constants/mod.services.js';

const PAGE_LIMIT = 15;

export function useModReportsQueue() {
    const queryClient = useQueryClient();
    const [filters, setFilters] = useState({ status: '', needsReview: '' });
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
        mutationFn: (reportId) => modReportsApi.approve(reportId),
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

    const approveReport = (reportId) => approveMutation.mutate(reportId);

    const rejectReport = (reason) => {
        const reportId = rejectTarget?._id;
        if (!reportId) return;

        rejectMutation.mutate({ id: reportId, reason });
    };

    const isApprovingReport = (reportId) => (
        approveMutation.isPending && approveMutation.variables === reportId
    );

    const isRejectingReport = (reportId) => (
        rejectMutation.isPending && rejectMutation.variables?.id === reportId
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
        rejectReport,
        isRejectPending: rejectMutation.isPending,
        isApprovingReport,
        isRejectingReport,
    };
}
