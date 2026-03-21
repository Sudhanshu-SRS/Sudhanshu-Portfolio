import { motion } from 'framer-motion';
import { Eye, FolderKanban, FileBadge, Code2, TrendingUp } from 'lucide-react';

const kpis = [
  { title: "Total Projects", value: "24", icon: FolderKanban, color: "text-blue-400", bg: "bg-blue-500/10" },
  { title: "Certificates", value: "12", icon: FileBadge, color: "text-purple-400", bg: "bg-purple-500/10" },
  { title: "Capabilities", value: "35", icon: Code2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { title: "Profile Views", value: "1,240", icon: Eye, color: "text-orange-400", bg: "bg-orange-500/10" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

const Dashboard = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Overview</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back, Admin. Here's what's happening today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="p-6 rounded-2xl bg-[#15151A] border border-white/5 shadow-lg relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${kpi.bg} rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110`}></div>
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">{kpi.title}</p>
                <h3 className="text-3xl font-bold text-white">{kpi.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${kpi.bg} ${kpi.color}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-6 flex items-center text-xs text-gray-400 relative z-10">
              <TrendingUp className="w-4 h-4 text-emerald-400 mr-2" />
              <span className="text-emerald-400 font-medium mr-1">+12%</span> from last month
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#15151A] border border-white/5 shadow-lg flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4 flex-1">
            {[1,2,3,4].map((i) => (
               <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] -mx-4 px-4 transition-colors rounded-lg cursor-pointer">
                 <div className="flex items-center space-x-4">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-purple-400">
                     <Code2 className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-sm font-medium text-white tracking-wide">Added new Capability "GraphQL"</p>
                     <p className="text-xs text-gray-500">2 hours ago</p>
                   </div>
                 </div>
                 <button className="text-xs font-medium text-purple-400 hover:text-purple-300">View</button>
               </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#15151A] border border-white/5 shadow-lg flex flex-col">
           <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
           <div className="space-y-3 flex-1 flex flex-col justify-center">
             <button className="w-full py-4 px-4 rounded-xl bg-purple-500/10 text-purple-400 font-medium hover:bg-purple-500/20 transition-all active:scale-[0.98] flex items-center justify-start group">
               <div className="p-2 rounded-lg bg-purple-500/20 mr-4 group-hover:scale-110 transition-transform"><FolderKanban className="w-4 h-4" /></div> New Project
             </button>
             <button className="w-full py-4 px-4 rounded-xl bg-blue-500/10 text-blue-400 font-medium hover:bg-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-start group">
               <div className="p-2 rounded-lg bg-blue-500/20 mr-4 group-hover:scale-110 transition-transform"><FileBadge className="w-4 h-4" /></div> Add Certificate
             </button>
             <button className="w-full py-4 px-4 rounded-xl bg-emerald-500/10 text-emerald-400 font-medium hover:bg-emerald-500/20 transition-all active:scale-[0.98] flex items-center justify-start group">
               <div className="p-2 rounded-lg bg-emerald-500/20 mr-4 group-hover:scale-110 transition-transform"><Code2 className="w-4 h-4" /></div> Add Capability
             </button>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;