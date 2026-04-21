const ToastHost = ({ toast }) => {
  if (!toast) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={
          `px-4 py-3 rounded-xl border text-sm ` +
          (toast.type === 'error'
            ? 'bg-red-500/10 border-red-500/20 text-red-200'
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200')
        }
      >
        {toast.message}
      </div>
    </div>
  );
};

export default ToastHost;
