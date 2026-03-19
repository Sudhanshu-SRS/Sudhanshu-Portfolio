import { motion } from 'framer-motion';

const capabilities = [
  {
    title: "Frontend Architecture",
    desc: "Designing scalable, maintainable, and high-performance frontend systems for enterprise applications using React, Next.js, and TypeScript."
  },
  {
    title: "Full-Stack Development",
    desc: "Building seamless end-to-end applications with robust Node.js backend services and modern interactive user interfaces."
  },
  {
    title: "Performance Optimization",
    desc: "Identifying bottlenecks and implementing strategies across the stack to ensure lightning-fast load times and smooth rendering."
  },
  {
    title: "UI/UX Engineering",
    desc: "Translating complex design systems into pixel-perfect, accessible, and responsive digital experiences."
  }
];

export default function Capabilities() {
  return (
    <section id="services" className="relative z-20 bg-[#121212] py-32 px-8 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Core Capabilities</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group"
            >
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                {cap.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
