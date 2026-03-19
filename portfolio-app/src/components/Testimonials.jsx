import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Yogesh Kothiya",
    role: "Product Manager",
    company: "Tech Solutions",
    text: "Akshay is an exceptional engineer who consistently delivers high-quality, scalable code. His understanding of design and engineering bridges the gap seamlessly."
  },
  {
    name: "Salil Rana",
    role: "Engineering Lead",
    company: "Innovate Inc",
    text: "Working with Akshay was a game-changer for our frontend architecture. He optimized our entire stack and improved our core web vitals drastically."
  },
  {
    name: "Naincy Kumari",
    role: "Creative Director",
    company: "Design Studio",
    text: "His ability to translate complex design systems into pixel-perfect, interactive web experiences is unmatched. Highly recommended!"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative z-20 bg-[#121212] py-32 px-8 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Client Recommendations</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors duration-300"
            >
              <svg className="h-8 w-8 text-cyan-500 mb-6 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">"{test.text}"</p>
              <div>
                <h4 className="text-white font-semibold text-xl">{test.name}</h4>
                <p className="text-cyan-500/80 text-sm font-medium uppercase tracking-wider mt-1">{test.role} at {test.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
