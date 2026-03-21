import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, FolderKanban, FileBadge, Code2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Projects', icon: FolderKanban, path: '/projects' },
  { name: 'Certificates', icon: FileBadge, path: '/certificates' },
  { name: 'Capabilities', icon: Code2, path: '/capabilities' },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);
  const location = useLocation();

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, setIsOpen]);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside 
        className={`
          fixed md:relative top-0 left-0 h-full z-50 bg-[#0E0E11] border-r border-white/5 flex flex-col pt-6 flex-shrink-0
          transition-transform duration-300 md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        initial={{ width: 260 }}
        animate={{ width: isDesktopOpen ? 260 : 80 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      >
        <div className="flex flex-row items-center justify-between px-6 mb-10 h-10 w-full overflow-hidden">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] flex-shrink-0">
              S
            </div>
            {isDesktopOpen && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-4 text-white font-bold text-lg tracking-wide whitespace-nowrap"
              >
                Admin Panel
              </motion.span>
            )}
          </div>
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg bg-white/5 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-hidden">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-3 py-3 rounded-xl transition-all duration-300
                ${isActive ? 'bg-white/10 text-white shadow-[inset_3px_0_0_0_#A855F7]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
              `}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isDesktopOpen ? 'mr-4' : 'mx-auto'}`} />
              {isDesktopOpen && <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 hidden md:block">
          <button 
            onClick={() => setIsDesktopOpen(!isDesktopOpen)}
            className="w-full flex justify-center items-center py-3 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            {isDesktopOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
