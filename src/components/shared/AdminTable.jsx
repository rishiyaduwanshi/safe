import React from 'react';

const AdminTable = ({ columns, children }) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0C141B]">
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-slate-400 border-b border-white/10">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={`px-4 py-3 font-semibold ${col.className || ''}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8">{children}</tbody>
      </table>
    </div>
  );
};

export default AdminTable;
