import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { ADMIN_ROUTES } from '../../constants/routes.js';
import { useAdminAuth } from '../../contexts/AdminAuthContext.jsx';

const AdminLogin = () => {
    const { signin, isAuthenticated, isLoading, error } = useAdminAuth();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [fieldError, setFieldError] = useState('');

    if (isAuthenticated) {
        return <Navigate to={ADMIN_ROUTES.DASHBOARD} replace />;
    }

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setFieldError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!credentials.email || !credentials.password) {
            setFieldError('Please fill in all fields.');
            return;
        }

        setSubmitting(true);
        const ok = await signin(credentials.email, credentials.password);
        setSubmitting(false);

        if (ok) {
            navigate(ADMIN_ROUTES.DASHBOARD);
        }
    };

    const displayError = fieldError || error;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#060B10] px-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[620px] h-[620px] rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.24) 0%, transparent 68%)' }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="relative w-full max-w-md"
            >
                <div
                    className="rounded-2xl p-8 border"
                    style={{
                        background: 'rgba(11,18,24,0.9)',
                        borderColor: 'rgba(148,163,184,0.2)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/14 border border-cyan-500/30 flex items-center justify-center mb-4">
                            <ShieldCheck size={28} className="text-cyan-300" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
                        <p className="text-sm text-slate-400 mt-1">S.A.F.E India Central Operations</p>
                    </div>

                    {displayError && (
                        <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-5 flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-300"
                        >
                            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                            <span>{displayError}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    placeholder="admin@safe.gov.in"
                                    className="w-full bg-white/5 border border-white/12 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-500/70 focus:ring-2 focus:ring-cyan-500/15 transition-all"
                                    disabled={submitting}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/12 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-500/70 focus:ring-2 focus:ring-cyan-500/15 transition-all"
                                    disabled={submitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting || isLoading}
                            className="mt-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                background: 'linear-gradient(135deg, #06B6D4, #0EA5E9)',
                                boxShadow: '0 10px 30px rgba(14,165,233,0.28)',
                            }}
                        >
                            {submitting ? 'Signing in...' : 'Sign In to Admin'}
                        </button>
                    </form>

                    <p className="text-center text-xs text-slate-500 mt-6">
                        Restricted to verified administration accounts.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
