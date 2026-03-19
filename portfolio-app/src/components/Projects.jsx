import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "Lumina Vault",
    description: "Personal Media Storage",
    image: "/projects/lumina.png",
    link: "https://lumina-vault-akshayiscoding.vercel.app"
  },
  {
    title: "Personal Portfolio",
    description: "3D Interactive Design",
    image: "/projects/portfolio-new.png",
    link: "https://3d-interactive-portfolio.netlify.app"
  },
  {
    title: "Legacy Portfolio",
    description: "Modern UI / Animations",
    image: "/projects/portfolio-old.png",
    link: "https://akshay-kumar.vercel.app/#About"
  },
  {
    title: "iCloud Hire",
    description: "Modern UI / Animations",
    image: "/projects/icloud-hire.png",
    link: "https://icloud-hire.netlify.app"
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
              className="will-change-transform h-full"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="group relative flex flex-col gap-4 p-4 md:p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:bg-white/[0.04] hover:shadow-[0_0_80px_-20px_rgba(255,255,255,0.1)] hover:border-white/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/50">
                  <img src={project.image} alt={project.title} className="object-cover w-full h-full opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]" />
                </div>
                <div className="flex items-center justify-between pt-2 mt-auto">
                  <div>
                    <h3 className="text-2xl font-semibold text-white group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                    <p className="text-sm font-medium text-white/50 tracking-wider uppercase mt-1">{project.description}</p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-indigo-500 group-hover:border-indigo-400 group-hover:text-white transition-all text-white/60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
