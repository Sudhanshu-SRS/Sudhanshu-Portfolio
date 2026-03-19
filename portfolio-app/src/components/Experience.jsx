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
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-2 w-4 h-4 rounded-full bg-orange-500 ring-4 ring-[#0a0a0a]" />
              
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-2">
                <h3 className="text-2xl font-semibold">{exp.role}</h3>
                <span className="text-gray-500 font-mono text-sm tracking-widest">{exp.year}</span>
              </div>
              <p className="text-xl text-gray-400">{exp.company}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
