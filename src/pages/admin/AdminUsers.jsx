import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, CircleAlert, Search, ToggleLeft, ToggleRight } from 'lucide-react';
import { adminUsersApi } from '../../constants/admin.services.js';
import { ToastHost } from '../../components/index.js';
import { useToast } from '../../hooks/index.js';
import AdminTable from '../../components/shared/AdminTable.jsx';
import StatusBadge from '../../components/shared/StatusBadge.jsx';

const normalizeUser = (user) => ({
  ...user,
  id: user?._id || user?.id,
});

const AdminUsers = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast, showToast } = useToast();

  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [page] = useState(1);
  const [limit] = useState(20);
  const [selectedId, setSelectedId] = useState('');
  const [uiError, setUiError] = useState('');

  const listQueryKey = useMemo(() => ['admin-users', { q, status, page, limit }], [q, status, page, limit]);

  const { data, isLoading, isError } = useQuery({
    queryKey: listQueryKey,
    queryFn: () => adminUsersApi.list({ q, status, page, limit }),
  });

  const users = useMemo(() => {
    const items = data?.data?.items;
    return Array.isArray(items) ? items.map(normalizeUser) : [];
  }, [data]);

  const selectedQuery = useQuery({
    queryKey: ['admin-user', selectedId],
    queryFn: () => adminUsersApi.getById(selectedId),
    enabled: Boolean(selectedId),
  });

  const toggleMutation = useMutation({
    mutationFn: (id) => adminUsersApi.toggleStatus(id),
    onMutate: async (id) => {
      setUiError('');
      await queryClient.cancelQueries({ queryKey: listQueryKey });

      const previous = queryClient.getQueryData(listQueryKey);
      let nextActive;

      queryClient.setQueryData(listQueryKey, (old) => {
        const items = old?.data?.items;
        if (!Array.isArray(items)) return old;

        const updated = items.map((item) => {
          const itemId = item?._id || item?.id;
          if (itemId !== id) return item;
          nextActive = !item?.isActive;
          return { ...item, isActive: nextActive };
        });

        return {
          ...old,
          data: { ...(old?.data || {}), items: updated },
        };
      });

      // Also optimistically update selected user cache
      queryClient.setQueryData(['admin-user', id], (old) => {
        const user = old?.data?.user;
        if (!user) return old;
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
    onSuccess: (_data, _id, ctx) => {
      showToast(ctx?.nextActive ? 'User activated' : 'User deactivated', 'success');
    },
    onError: (error, _id, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(listQueryKey, ctx.previous);
      setUiError(error?.message || 'Failed to toggle user status');
      showToast('Failed to update user status', 'error');
    },
    onSettled: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: listQueryKey });
      if (id) queryClient.invalidateQueries({ queryKey: ['admin-user', id] });
    },
  });

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'css', label: 'CSS' },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'Action', className: 'text-right' },
  ];

  const selectedUser = selectedQuery.data?.data?.user ?? null;
  const selectedProfile = selectedQuery.data?.data?.profile ?? null;
  const selectedStats = selectedQuery.data?.data?.stats ?? null;
  const selectedReports = Array.isArray(selectedQuery.data?.data?.reports)
    ? selectedQuery.data.data.reports
    : [];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <ToastHost toast={toast} />

      <div className="flex items-center gap-3 mb-6">
        <Users size={22} className="text-cyan-400" />
        <div>
          <h1 className="text-xl font-bold text-white">User Management</h1>
          <p className="text-sm text-slate-400">List and activate/deactivate citizen accounts.</p>
        </div>
      </div>

      {(uiError || isError) && (
        <div className="mb-5 flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-300">
          <CircleAlert size={16} className="shrink-0 mt-0.5" />
          <span>{uiError || 'Failed to load users list.'}</span>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/12 bg-white/5 p-5 mb-6"
      >
        <div className="grid md:grid-cols-3 gap-3">
          <div className="relative md:col-span-2">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or email"
              className="w-full bg-[#0C141B] border border-white/12 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500/70"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-[#0C141B] border border-white/12 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500/70"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="text-slate-400 text-sm">Loading users…</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AdminTable columns={columns}>
              {users.map((user) => {
                const isSelected = selectedId === user.id;
                return (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedId(user.id)}
                    className={`cursor-pointer hover:bg-white/4 transition-colors ${isSelected ? 'bg-white/4' : ''}`}
                  >
                    <td className="px-4 py-3 text-slate-100 font-medium">{user.name}</td>
                    <td className="px-4 py-3 text-slate-300">{user.email}</td>
                    <td className="px-4 py-3 text-slate-200">{typeof user.css === 'number' ? user.css.toFixed(0) : '—'}</td>
                    <td className="px-4 py-3">
                      {user.isActive ? (
                        <StatusBadge tone="active">Active</StatusBadge>
                      ) : (
                        <StatusBadge tone="inactive">Inactive</StatusBadge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/users/${user.id}`);
                          }}
                          className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-white/12 bg-white/5 text-slate-200 hover:bg-white/10 transition-colors"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMutation.mutate(user.id);
                          }}
                          className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-white/12 bg-white/5 text-slate-200 hover:bg-white/10 transition-colors"
                        >
                          {user.isActive ? (
                            <>
                              <ToggleRight size={16} className="text-emerald-300" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <ToggleLeft size={16} className="text-red-300" />
                              Activate
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {!users.length && (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-400">
                    No users found.
                  </td>
                </tr>
              )}
            </AdminTable>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/12 bg-white/5 p-5">
              <h2 className="text-sm font-semibold text-white mb-3">User Details</h2>

              {!selectedId ? (
                <p className="text-sm text-slate-400">Select a user to view details.</p>
              ) : selectedQuery.isLoading ? (
                <p className="text-sm text-slate-400">Loading…</p>
              ) : selectedQuery.isError ? (
                <p className="text-sm text-red-300">Failed to load user.</p>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-400">Name</p>
                    <p className="text-sm text-white font-medium">{selectedUser?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Email</p>
                    <p className="text-sm text-slate-200">{selectedUser?.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-slate-400">Status</p>
                    {selectedUser?.isActive ? (
                      <StatusBadge tone="active">Active</StatusBadge>
                    ) : (
                      <StatusBadge tone="inactive">Inactive</StatusBadge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="rounded-xl border border-white/10 bg-[#0C141B] p-3">
                      <p className="text-xs text-slate-400">CSS</p>
                      <p className="text-lg font-bold text-white">
                        {typeof selectedUser?.css === 'number' ? selectedUser.css.toFixed(0) : '—'}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-[#0C141B] p-3">
                      <p className="text-xs text-slate-400">Reports</p>
                      <p className="text-lg font-bold text-white">
                        {selectedStats?.totalReports ?? 0}
                      </p>
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
                    <p className="text-xs text-slate-400 mb-2">Recent Reports (last 50)</p>
                    {!selectedReports.length ? (
                      <p className="text-sm text-slate-400">No reports found.</p>
                    ) : (
                      <div className="max-h-72 overflow-y-auto space-y-2">
                        {selectedReports.map((report) => (
                          <div key={report._id} className="rounded-lg border border-white/10 bg-white/5 p-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-sm text-slate-100 font-medium truncate">
                                  {report.category?.key ?? 'unknown'} • {report.severity}
                                </p>
                                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                                  {report.reportText}
                                </p>
                                {report.location?.address && (
                                  <p className="text-xs text-slate-500 mt-1 truncate">{report.location.address}</p>
                                )}
                              </div>
                              <div className="shrink-0 flex flex-col items-end gap-1">
                                <StatusBadge tone={report.status === 'approved' ? 'active' : report.status === 'rejected' ? 'inactive' : 'neutral'}>
                                  {report.status}
                                </StatusBadge>
                                <span className="text-[11px] text-slate-500">
                                  {report.confidence != null ? `${(report.confidence * 100).toFixed(0)}%` : '—'}
                                </span>
                              </div>
                            </div>
                            {report.rejectionReason && (
                              <p className="text-xs text-red-200/80 mt-2">
                                Reason: {report.rejectionReason}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleMutation.mutate(selectedId)}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 text-sm px-3 py-2.5 rounded-xl border border-white/12 bg-white/5 text-slate-200 hover:bg-white/10 transition-colors"
                  >
                    {selectedUser?.isActive ? (
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
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
