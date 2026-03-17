const ReportBadge = ({ text, colorClass }) => {
    return (
        <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full border ${colorClass}`}>
            {text}
        </span>
    );
};

export default ReportBadge;
