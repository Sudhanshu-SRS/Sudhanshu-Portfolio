import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const DataTable = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="bg-[#15151A] rounded-2xl border border-white/5 shadow-xl overflow-hidden flex flex-col">
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#1A1A20]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search entries..." 
            className="pl-10 pr-4 py-2 bg-black/20 border border-white/5 rounded-lg text-sm text-gray-200 outline-none focus:border-purple-500/50 w-64 transition-all focus:bg-black/40"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/20 border-b border-white/5 text-gray-400 text-sm">
              {columns.map((col, i) => (
                <th key={i} className="py-4 px-6 font-medium tracking-wide whitespace-nowrap">{col.header}</th>
              ))}
              <th className="py-4 px-6 text-right font-medium tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={row.id || i}
                className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                {columns.map((col, j) => (
                  <td key={j} className="py-4 px-6 text-sm text-gray-300">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end space-x-3">
                     <button onClick={() => onEdit && onEdit(row)} className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">Edit</button>
                     <button onClick={() => onDelete && onDelete(row)} className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">Delete</button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="py-8 text-center text-gray-500 text-sm">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-gray-400 bg-[#1A1A20]">
        <span>Showing 1 to {data.length} entries</span>
        <div className="flex space-x-2">
           <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
           <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
