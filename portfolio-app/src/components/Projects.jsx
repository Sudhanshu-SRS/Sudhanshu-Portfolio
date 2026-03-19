import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "Lumina Vault",
    description: "Personal Media Storage and indexing application with advanced search capabilities.",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    title: "Personal Portfolio",
    description: "3D Interactive Design portfolio with advanced WebGL and Canvas scrubbing mechanics.",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Legacy Portfolio",
    description: "Modern UI / Animations focused single-page application built on Next.js.",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "iCloud Hire",
    description: "Modern UI / Animations and recruitment management dashboard.",
    color: "from-emerald-500/20 to-teal-500/20"
  }
];

export default function Projects() {
  return (
    <section id="work" className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-8 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-16 tracking-tight">My Arsenal</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-3xl border border-white/5 bg-[#121212] flex flex-col justify-between p-10 group hover:border-white/20 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/10`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-4 text-white/90 group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-12">{project.description}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-5 py-3 rounded-full border border-white/5">
                    View Live <ExternalLink size={16} />
                  </button>
                  <button className="flex items-center justify-center text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-3 rounded-full border border-white/5">
                    <Github size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
