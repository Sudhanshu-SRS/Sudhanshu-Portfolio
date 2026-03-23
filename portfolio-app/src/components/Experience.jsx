import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const backendurl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/certificate/`);
      setExperiences(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section  className="relative z-20 bg-[#0a0a0a] py-28 px-6 lg:px-24 text-white">
      <div className="max-w-6xl mx-auto">

        {/* 🔥 HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold">
            Awards & Achievements
          </h2>
          <p className="text-gray-400 mt-3">
            Certifications & milestones I've earned 🚀
          </p>
        </motion.div>

        {/* 🔥 GRID (instead of timeline for better UX) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-lg hover:shadow-indigo-500/10 transition-all duration-500"
            >

              {/* 🔥 IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <button
                    onClick={() => window.open(exp.image, "_blank")}
                    className="px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:scale-105 transition"
                  >
                    View Certificate
                  </button>
                </div>
              </div>

              {/* 🔥 CONTENT */}
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold group-hover:text-indigo-400 transition">
                  {exp.title}
                </h3>

                <p className="text-sm text-gray-400">
                  {exp.obtainby || "Unknown Issuer"}
                </p>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {exp.year}
                  </span>

                  <span className="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition">
                    Click to view →
                  </span>
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl border border-indigo-500/0 group-hover:border-indigo-500/30 transition pointer-events-none"></div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}