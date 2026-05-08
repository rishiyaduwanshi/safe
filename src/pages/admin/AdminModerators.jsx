import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Plus, Save, ToggleLeft, ToggleRight, Trash2, Shield, CircleAlert } from 'lucide-react';
import { adminModeratorsApi } from '../../constants/admin.services.js';
import { ToastHost } from '../../components/index.js';
import { useToast } from '../../hooks/index.js';

const PERMISSIONS = [
  'report:view',
  'report:approve',
  'report:reject',
  'violation:view',
  'violation:confirm',
  'violation:reject',
  'user:view',
  'user:toggle',
  'hardware:view',
];

const PRESETS = {
  VIEWER: ['report:view', 'violation:view', 'user:view', 'hardware:view'],
  REPORT_MODERATOR: ['report:view', 'report:approve', 'report:reject', 'user:view'],
  VIOLATION_MODERATOR: ['violation:view', 'violation:confirm', 'violation:reject', 'user:view', 'hardware:view'],
  FULL: PERMISSIONS,
};

const normalizeModerator = (moderator) => ({
  ...moderator,
  id: moderator._id || moderator.id,
});

const permissionBadgeClass = (permission) => {
  if (permission.startsWith('report')) return 'bg-indigo-500/18 border-indigo-500/30 text-indigo-200';
  if (permission.startsWith('violation')) return 'bg-amber-500/14 border-amber-500/30 text-amber-100';
  if (permission.startsWith('user')) return 'bg-emerald-500/14 border-emerald-500/30 text-emerald-100';
  return 'bg-cyan-500/14 border-cyan-500/30 text-cyan-100';
};

const AdminModerators = () => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    permissions: PRESETS.VIEWER,
  });
  const [uiError, setUiError] = useState('');
  const { toast, showToast } = useToast();
  const [activeEditId, setActiveEditId] = useState('');
  const [editedPermissions, setEditedPermissions] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-moderators'],
    queryFn: () => adminModeratorsApi.list(),
  });

  const moderators = useMemo(
    () => (data?.data ?? []).map(normalizeModerator),
    [data]
  );

  const refreshModerators = () => queryClient.invalidateQueries({ queryKey: ['admin-moderators'] });

  const createMutation = useMutation({
    mutationFn: (payload) => adminModeratorsApi.create(payload),
    onSuccess: () => {
      refreshModerators();
      setForm({
        name: '',
        email: '',
        password: '',
        permissions: PRESETS.VIEWER,
      });
      setUiError('');
    },
    onError: (error) => {
      setUiError(error?.message || 'Failed to create moderator.');
    },
  });

  const updatePermissionsMutation = useMutation({
    mutationFn: ({ id, permissions }) => adminModeratorsApi.updatePermissions(id, permissions),
    onSuccess: () => {
      refreshModerators();
      setActiveEditId('');
      setEditedPermissions([]);
      setUiError('');
    },
    onError: (error) => {
      setUiError(error?.message || 'Failed to update permissions.');
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (id) => adminModeratorsApi.toggleStatus(id),
    onMutate: async (id) => {
      setUiError('');
      await queryClient.cancelQueries({ queryKey: ['admin-moderators'] });

      const previous = queryClient.getQueryData(['admin-moderators']);
      let nextActive;

      queryClient.setQueryData(['admin-moderators'], (oldData) => {
        const list = oldData?.data;
        if (!Array.isArray(list)) return oldData;

        const updated = list.map((item) => {
          const normalizedId = item?._id || item?.id;
          if (normalizedId !== id) return item;
          nextActive = !item?.isActive;
          return { ...item, isActive: nextActive };
        });

        return { ...oldData, data: updated };
      });

      return { previous, nextActive };
    },
    onSuccess: (_data, _id, context) => {
      showToast(context?.nextActive ? 'Moderator enabled' : 'Moderator disabled', 'success');
    },
    onError: (error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['admin-moderators'], context.previous);
      }
      setUiError(error?.message || 'Failed to toggle moderator status.');
      showToast('Failed to update moderator status', 'error');
    },
    onSettled: () => {
      refreshModerators();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => adminModeratorsApi.remove(id),
    onSuccess: () => {
      refreshModerators();
      setUiError('');
      showToast('Moderator deleted', 'success');
    },
    onError: (error) => {
      setUiError(error?.message || 'Failed to delete moderator.');
      showToast('Failed to delete moderator', 'error');
    },
  });

  const handleCreate = (event) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setUiError('Name, email and password are required.');
      return;
    }

    if (!form.permissions.length) {
      setUiError('Select at least one permission.');
      return;
    }

    createMutation.mutate(form);
  };

  const updateFormPermission = (permission) => {
    setForm((prev) => {
      const exists = prev.permissions.includes(permission);
      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter((item) => item !== permission)
          : [...prev.permissions, permission],
      };
    });
  };

  const startEditing = (moderator) => {
    setActiveEditId(moderator.id);
    setEditedPermissions(moderator.permissions || []);
  };

  const toggleEditedPermission = (permission) => {
    setEditedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((item) => item !== permission)
        : [...prev, permission]
    );
  };

  const savePermissions = (id) => {
    if (!editedPermissions.length) {
      setUiError('At least one permission is required.');
      return;
    }
    updatePermissionsMutation.mutate({ id, permissions: editedPermissions });
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <ToastHost toast={toast} />

      <div className="flex items-center gap-3 mb-6">
        <Shield size={22} className="text-cyan-400" />
        <div>
          <h1 className="text-xl font-bold text-white">Moderator Management</h1>
          <p className="text-sm text-slate-400">Create, permission and control moderator accounts.</p>
        </div>
      </div>

      {(uiError || isError) && (
        <div className="mb-5 flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-300">
          <CircleAlert size={16} className="shrink-0 mt-0.5" />
          <span>{uiError || 'Failed to load moderators list.'}</span>
        </div>
      )}

      <motion.form
        onSubmit={handleCreate}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/12 bg-white/5 p-5 mb-6"
      >
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <input
            className="w-full bg-[#0C141B] border border-white/12 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500/70"
            placeholder="Moderator name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
          <input
            type="email"
            className="w-full bg-[#0C141B] border border-white/12 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500/70"
            placeholder="moderator@safe.gov.in"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
          <input
            type="password"
            className="w-full bg-[#0C141B] border border-white/12 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-500/70"
            placeholder="Strong password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(PRESETS).map(([label, values]) => (
            <button
              type="button"
              key={label}
              onClick={() => setForm((prev) => ({ ...prev, permissions: values }))}
              className="text-xs px-3 py-1.5 rounded-full border border-white/14 bg-white/5 text-slate-300 hover:bg-white/10 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
          {PERMISSIONS.map((permission) => (
            <label key={permission} className="flex items-center gap-2 text-xs text-slate-300 bg-[#0C141B] border border-white/10 rounded-lg px-3 py-2">
              <input
                type="checkbox"
                checked={form.permissions.includes(permission)}
                onChange={() => updateFormPermission(permission)}
              />
              <span>{permission}</span>
            </label>
          ))}
        </div>

        <button
          type="submit"
          disabled={createMutation.isPending}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-cyan-500/90 hover:bg-cyan-500 text-slate-950 disabled:opacity-60"
        >
          <Plus size={16} />
          {createMutation.isPending ? 'Creating...' : 'Create Moderator'}
        </button>
      </motion.form>

      <div className="rounded-2xl border border-white/10 bg-[#0B1218] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-white/10">
                <th className="px-4 py-3">Moderator</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Permissions</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-sm text-slate-400">Loading moderators...</td>
                </tr>
              ) : moderators.length ? (
                moderators.map((moderator) => (
                  <tr key={moderator.id} className="border-b border-white/6 align-top">
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-white">{moderator.name}</p>
                      <p className="text-xs text-slate-400 mt-1">{moderator.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${moderator.isActive ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200' : 'bg-amber-500/15 border-amber-500/30 text-amber-100'}`}>
                        {moderator.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {activeEditId === moderator.id ? (
                        <div className="grid sm:grid-cols-2 gap-2 max-w-xl">
                          {PERMISSIONS.map((permission) => (
                            <label key={`${moderator.id}-${permission}`} className="flex items-center gap-2 text-xs text-slate-300 bg-[#0C141B] border border-white/10 rounded-lg px-3 py-2">
                              <input
                                type="checkbox"
                                checked={editedPermissions.includes(permission)}
                                onChange={() => toggleEditedPermission(permission)}
                              />
                              <span>{permission}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-1.5 max-w-xl">
                          {(moderator.permissions || []).map((permission) => (
                            <span key={`${moderator.id}-${permission}`} className={`text-[11px] px-2 py-1 border rounded-full ${permissionBadgeClass(permission)}`}>
                              {permission}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        {activeEditId === moderator.id ? (
                          <button
                            onClick={() => savePermissions(moderator.id)}
                            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-cyan-500/35 bg-cyan-500/15 text-cyan-100"
                          >
                            <Save size={13} /> Save
                          </button>
                        ) : (
                          <button
                            onClick={() => startEditing(moderator)}
                            className="text-xs px-3 py-1.5 rounded-lg border border-white/16 text-slate-200"
                          >
                            Edit Permissions
                          </button>
                        )}
                        <button
                          onClick={() => toggleMutation.mutate(moderator.id)}
                          disabled={toggleMutation.isPending && toggleMutation.variables === moderator.id}
                          className={
                            'inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border disabled:opacity-60 ' +
                            (moderator.isActive
                              ? 'border-amber-500/30 bg-amber-500/10 text-amber-100'
                              : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200')
                          }
                        >
                          {moderator.isActive ? <ToggleRight size={13} /> : <ToggleLeft size={13} />}
                          {toggleMutation.isPending && toggleMutation.variables === moderator.id
                            ? 'Updating...'
                            : moderator.isActive
                              ? 'Disable'
                              : 'Enable'}
                        </button>
                        <button
                          onClick={() => deleteMutation.mutate(moderator.id)}
                          disabled={deleteMutation.isPending && deleteMutation.variables === moderator.id}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-500/28 bg-red-500/10 text-red-200"
                        >
                          <Trash2 size={13} />
                          {deleteMutation.isPending && deleteMutation.variables === moderator.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-sm text-slate-400">No moderators found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminModerators;
