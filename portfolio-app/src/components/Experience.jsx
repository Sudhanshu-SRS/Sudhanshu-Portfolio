import { motion } from 'framer-motion';

const experiences = [
  { role: "Senior Software Engineer", company: "Tech Corp", year: "2023 - Present" },
  { role: "Full Stack Engineer", company: "Startup Inc", year: "2021 - 2023" },
  { role: "Software Engineer", company: "Agency Co", year: "2019 - 2021" },
  { role: "Web Developer", company: "Freelance", year: "2018 - 2019" }
];

export default function Experience() {
  return (
    <section id="experience" className="relative z-20 bg-[#0a0a0a] py-32 px-8 lg:px-24 text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Experience & Awards</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
        </motion.div>

        <div className="flex flex-col gap-12 border-l border-white/10 pl-8 md:pl-12 ml-4">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-28 group"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-26px] md:left-[26px] top-12 w-[13px] h-[13px] rounded-full bg-[#050505] border-2 border-white/20 group-hover:border-indigo-400 group-hover:bg-indigo-400/20 group-hover:shadow-[0_0_15px_rgba(129,140,248,0.6)] transition-all duration-500 z-10" />
              
              <div className="p-8 md:p-10 rounded-[2rem] bg-white/[0.01] border border-white/[0.05] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500 backdrop-blur-md shadow-2xl hover:shadow-[0_0_80px_-20px_rgba(129,140,248,0.1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500/50 transition-all duration-700"></div>
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-emerald-400 transition-all duration-500">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-white/50 bg-white/5 px-4 py-2.5 rounded-full w-fit border border-white/5">
                    <span className="text-sm font-semibold tracking-wide uppercase">{exp.year}</span>
                  </div>
                </div>
                <p className="text-xl text-gray-400 font-medium">{exp.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
