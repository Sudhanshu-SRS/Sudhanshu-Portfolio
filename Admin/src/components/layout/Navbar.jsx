import { Bell, Search, UserCircle, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ onMenuClick }) => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-20 border-b border-white/5 bg-[#0E0E11]/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 w-full"
    >
      <div className="flex items-center text-gray-400">
        <button 
          onClick={onMenuClick}
          className="mr-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 md:hidden transition-colors"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
        <span className="text-sm font-medium tracking-wide hidden sm:block">Dashboard / Overview</span>
      </div>
      
      <div className="flex items-center space-x-4 md:space-x-6">
        <div className="relative group hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search... (⌘K)" 
            className="bg-[#1A1A20] border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm text-gray-200 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 w-64 transition-all"
          />
        </div>
        
        <button className="text-gray-400 hover:text-purple-400 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-purple-500 rounded-full border border-[#0E0E11]"></span>
        </button>
        
        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 cursor-pointer overflow-hidden border-2 border-[#1A1A20] hover:border-purple-400 transition-all shadow-[0_0_10px_rgba(168,85,247,0.2)]">
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
