import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CircleAlert, ToggleLeft, ToggleRight, User } from 'lucide-react';
import { adminUsersApi } from '../../constants/admin.services.js';
import { ADMIN_ROUTES } from '../../constants/routes.js';
import { ToastHost } from '../../components/index.js';
import { useToast } from '../../hooks/index.js';
import StatusBadge from '../../components/shared/StatusBadge.jsx';

const normalizeUser = (user) => ({
  ...user,
  id: user?._id || user?.id,
});

const AdminUserDetail = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast, showToast } = useToast();

  const [uiError, setUiError] = useState('');

  const userQuery = useQuery({
    queryKey: ['admin-user', id],
    queryFn: () => adminUsersApi.getById(id),
    enabled: Boolean(id),
  });

  const selectedUser = useMemo(() => {
    const raw = userQuery.data?.data?.user;
    return raw ? normalizeUser(raw) : null;
  }, [userQuery.data]);

  const selectedProfile = userQuery.data?.data?.profile ?? null;
  const selectedStats = userQuery.data?.data?.stats ?? null;
  const selectedReports = Array.isArray(userQuery.data?.data?.reports)
    ? userQuery.data.data.reports
    : [];
  const selectedCssHistory = Array.isArray(userQuery.data?.data?.cssHistory)
    ? userQuery.data.data.cssHistory
    : [];

  const toggleMutation = useMutation({
    mutationFn: () => adminUsersApi.toggleStatus(id),
    onMutate: async () => {
      setUiError('');
      await queryClient.cancelQueries({ queryKey: ['admin-user', id] });

      const previous = queryClient.getQueryData(['admin-user', id]);
      let nextActive;

      queryClient.setQueryData(['admin-user', id], (old) => {
        const user = old?.data?.user;
        if (!user) return old;
        nextActive = !user?.isActive;
        return {
          ...old,
          data: {
            ...(old?.data || {}),
            user: { ...user, isActive: nextActive },
          },
        };
      });

      return { previous, nextActive };
    },
    onSuccess: (_data, _vars, ctx) => {
      showToast(ctx?.nextActive ? 'User activated' : 'User deactivated', 'success');
    },
    onError: (error, _vars, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(['admin-user', id], ctx.previous);
      setUiError(error?.message || 'Failed to toggle user status');
      showToast('Failed to update user status', 'error');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-user', id] });
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <ToastHost toast={toast} />

      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => navigate(ADMIN_ROUTES.USERS)}
          className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl border border-white/12 bg-white/5 text-slate-200 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={16} className="text-slate-300" />
          Back
        </button>

        <div className="flex items-center gap-2">
          <User size={20} className="text-cyan-400" />
          <div>
            <h1 className="text-xl font-bold text-white">User Details</h1>
            <p className="text-sm text-slate-400">/admin/users/{id}</p>
          </div>
        </div>
      </div>

      {(uiError || userQuery.isError) && (
        <div className="mb-5 flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-300">
          <CircleAlert size={16} className="shrink-0 mt-0.5" />
          <span>{uiError || userQuery.error?.message || 'Failed to load user.'}</span>
        </div>
      )}

      {userQuery.isLoading ? (
        <div className="text-slate-400 text-sm">Loading…</div>
      ) : !selectedUser ? (
        <div className="text-slate-400 text-sm">User not found.</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 rounded-2xl border border-white/12 bg-white/5 p-5"
          >
            <h2 className="text-sm font-semibold text-white mb-3">Recent Reports (last 50)</h2>

            {!selectedReports.length ? (
              <p className="text-sm text-slate-400">No reports found.</p>
            ) : (
              <div className="space-y-3">
                {selectedReports.map((report) => (
                  <div key={report._id} className="rounded-xl border border-white/10 bg-[#0C141B] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-slate-100 font-semibold truncate">
                          {report.category?.key ?? 'unknown'} • {report.severity}
                        </p>
                        <p className="text-xs text-slate-400 mt-1 whitespace-pre-wrap">{report.reportText}</p>
                        {report.location?.address && (
                          <p className="text-xs text-slate-500 mt-2">{report.location.address}</p>
                        )}
                      </div>

                      <div className="shrink-0 flex flex-col items-end gap-2">
                        <StatusBadge
                          tone={
                            report.status === 'approved'
                              ? 'active'
                              : report.status === 'rejected'
                                ? 'inactive'
                                : 'neutral'
                          }
                        >
                          {report.status}
                        </StatusBadge>
                        <span className="text-xs text-slate-500">
                          {report.confidence != null ? `${(report.confidence * 100).toFixed(0)}%` : '—'}
                        </span>
                      </div>
                    </div>

                    {report.rejectionReason && (
                      <p className="text-xs text-red-200/80 mt-3">Reason: {report.rejectionReason}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 rounded-2xl border border-white/12 bg-white/5 p-5"
          >
            <h2 className="text-sm font-semibold text-white mb-3">Summary</h2>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-400">Name</p>
                <p className="text-sm text-white font-medium">{selectedUser.name}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="text-sm text-slate-200">{selectedUser.email}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400">User ID</p>
                <p className="text-sm text-slate-200 break-all">{selectedUser.id}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-xs text-slate-400">Status</p>
                {selectedUser.isActive ? (
                  <StatusBadge tone="active">Active</StatusBadge>
                ) : (
                  <StatusBadge tone="inactive">Inactive</StatusBadge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border border-white/10 bg-[#0C141B] p-3">
                  <p className="text-xs text-slate-400">CSS</p>
                  <p className="text-lg font-bold text-white">
                    {typeof selectedUser.css === 'number' ? selectedUser.css.toFixed(0) : '—'}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-[#0C141B] p-3">
                  <p className="text-xs text-slate-400">Reports</p>
                  <p className="text-lg font-bold text-white">{selectedStats?.totalReports ?? 0}</p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0C141B] p-3">
                <p className="text-xs text-slate-400 mb-2">License / Profile</p>
                {!selectedProfile ? (
                  <p className="text-sm text-slate-400">Not verified (no profile linked).</p>
                ) : (
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-slate-200">
                      <span className="text-slate-400">DL</span>
                      <span className="font-semibold">{selectedProfile.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between text-slate-200">
                      <span className="text-slate-400">Vehicle</span>
                      <span className="font-semibold">{selectedProfile.vehicleType}</span>
                    </div>
                    <div className="flex justify-between text-slate-200">
                      <span className="text-slate-400">Status</span>
                      <span className="font-semibold">{selectedProfile.status}</span>
                    </div>
                    <div className="flex justify-between text-slate-200">
                      <span className="text-slate-400">Expiry</span>
                      <span className="font-semibold">{selectedProfile.expiryDate}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0C141B] p-3">
                <p className="text-xs text-slate-400 mb-2">By Status</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {['pending', 'review', 'approved', 'rejected'].map((key) => (
                    <div key={key} className="flex justify-between text-slate-200">
                      <span className="capitalize">{key}</span>
                      <span className="font-semibold">{selectedStats?.byStatus?.[key] ?? 0}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0C141B] p-3">
                <p className="text-xs text-slate-400 mb-2">CSS History (last 50)</p>
                {!selectedCssHistory.length ? (
                  <p className="text-sm text-slate-400">No CSS changes recorded yet.</p>
                ) : (
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {selectedCssHistory.map((event) => {
                      const delta = typeof event?.delta === 'number' ? event.delta : 0;
                      const deltaLabel = delta > 0 ? `+${delta}` : `${delta}`;
                      const moderatorName = event?.moderator?.name || event?.moderator?.email || '—';
                      return (
                        <div key={event._id} className="rounded-lg border border-white/10 bg-white/5 p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-xs text-slate-500">
                                {event?.createdAt ? new Date(event.createdAt).toLocaleString() : '—'}
                              </p>
                              <p className="text-sm text-slate-100 font-medium truncate">
                                {event?.decision ?? '—'} • {moderatorName}
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                {event?.previousCss ?? '—'} → {event?.nextCss ?? '—'}
                              </p>
                            </div>

                            <div className="shrink-0 flex flex-col items-end gap-1">
                              <StatusBadge tone={delta >= 0 ? 'active' : 'inactive'}>{deltaLabel}</StatusBadge>
                              {event?.categoryId != null && (
                                <span className="text-[11px] text-slate-500">cat: {event.categoryId}</span>
                              )}
                            </div>
                          </div>

                          {event?.note ? (
                            <p className="text-xs text-slate-300/80 mt-2 whitespace-pre-wrap">{event.note}</p>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => toggleMutation.mutate()}
                disabled={toggleMutation.isPending}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 text-sm px-3 py-2.5 rounded-xl border border-white/12 bg-white/5 text-slate-200 hover:bg-white/10 transition-colors disabled:opacity-60"
              >
                {selectedUser.isActive ? (
                  <>
                    <ToggleRight size={18} className="text-emerald-300" />
                    Deactivate User
                  </>
                ) : (
                  <>
                    <ToggleLeft size={18} className="text-red-300" />
                    Activate User
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminUserDetail;
