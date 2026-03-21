import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, UserCheck, UserX, ArrowRight } from 'lucide-react';
import { ADMIN_ROUTES } from '../../constants/routes.js';
import { adminModeratorsApi } from '../../constants/admin.services.js';
import { useAdminAuth } from '../../contexts/AdminAuthContext.jsx';

const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { admin } = useAdminAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['admin-moderators'],
        queryFn: () => adminModeratorsApi.list(),
        staleTime: 1000 * 20,
    });

    const metrics = useMemo(() => {
        const moderators = data?.data ?? [];
        const activeCount = moderators.filter((mod) => mod.isActive).length;
        return {
            total: moderators.length,
            active: activeCount,
            inactive: moderators.length - activeCount,
        };
    }, [data]);

    return (
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                    <ShieldCheck size={22} className="text-cyan-400" />
                    <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                </div>
                <p className="text-sm text-slate-400">
                    Welcome back, <span className="text-slate-200 font-medium">{admin?.name}</span>. Manage moderator operations from here.
                </p>
            </motion.div>

            {isError ? (
                <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    Failed to load admin metrics.
                </p>
            ) : (
                <div className="grid sm:grid-cols-3 gap-4 mb-7">
                    <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.25 }} className="rounded-2xl p-5 border border-cyan-500/20 bg-cyan-500/8">
                        <div className="flex items-center gap-2 text-cyan-200 mb-2"><Users size={18} /><span className="text-xs uppercase tracking-wider">Total Moderators</span></div>
                        <p className="text-3xl font-bold text-white">{isLoading ? '-' : metrics.total}</p>
                    </motion.div>

                    <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.3 }} className="rounded-2xl p-5 border border-emerald-500/20 bg-emerald-500/8">
                        <div className="flex items-center gap-2 text-emerald-200 mb-2"><UserCheck size={18} /><span className="text-xs uppercase tracking-wider">Active</span></div>
                        <p className="text-3xl font-bold text-white">{isLoading ? '-' : metrics.active}</p>
                    </motion.div>

                    <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ duration: 0.35 }} className="rounded-2xl p-5 border border-amber-500/20 bg-amber-500/8">
                        <div className="flex items-center gap-2 text-amber-100 mb-2"><UserX size={18} /><span className="text-xs uppercase tracking-wider">Inactive</span></div>
                        <p className="text-3xl font-bold text-white">{isLoading ? '-' : metrics.inactive}</p>
                    </motion.div>
                </div>
            )}

            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                onClick={() => navigate(ADMIN_ROUTES.MODERATORS)}
                className="group w-full sm:w-auto flex items-center justify-between sm:justify-center gap-3 p-4 sm:px-6 rounded-2xl border border-white/12 bg-white/5 hover:bg-white/7 transition-all"
            >
                <span className="text-sm font-semibold text-white">Go to Moderator Management</span>
                <ArrowRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
            </motion.button>
        </div>
    );
};

export default AdminDashboard;
