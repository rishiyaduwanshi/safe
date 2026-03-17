import { useState } from 'react';
import { motion } from 'framer-motion';

const RejectReportModal = ({ report, onClose, onConfirm, loading }) => {
    const [reason, setReason] = useState('');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md rounded-2xl p-6 border border-white/10"
                style={{ background: '#0d0d14', boxShadow: '0 20px 50px rgba(0,0,0,0.45)' }}
            >
                <h3 className="text-base font-bold text-white mb-1">Reject Report</h3>
                <p className="text-xs text-slate-500 mb-4">
                    ID: <span className="text-slate-400">{report?._id}</span>
                </p>

                <textarea
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="Reason for rejection (optional)..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-red-500/50 resize-none mb-4"
                />

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-white/6 border border-white/8 hover:bg-white/10 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(reason.trim())}
                        disabled={loading}
                        className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Rejecting...' : 'Confirm Reject'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default RejectReportModal;
