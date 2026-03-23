import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const backendurl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/experience/`);
      console.log(res.data);
      setExperiences(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="text-center text-gray-400 py-20">
        Loading Experience...
      </div>
    );
  }
  return (
  <section id="experience" className="relative z-20 w-full bg-[#050505] py-28 sm:py-32 border-t border-white/5 overflow-hidden">

  {/* 🌌 GLOW BACKGROUND */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

    {/* 🔥 HEADER */}
    <div className="flex flex-col items-center justify-center mb-16 sm:mb-24 text-center">
      <h2 className="text-3xl sm:text-5xl font-light text-white/90">
        Professional{" "}
        <span className="font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
          Experience
        </span>
      </h2>

      <p className="mt-4 text-white/50 font-medium tracking-wide border border-white/10 py-1 px-4 rounded-full uppercase text-xs">
        My Career Journey
      </p>
    </div>

    {/* 🔥 TIMELINE */}
    <div className="relative">

      {/* LINE */}
      <div className="absolute left-0 sm:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

      <div className="space-y-12 sm:space-y-16">

        {experiences.map((exp, idx) => (
          <div key={idx} className="relative pl-6 sm:pl-28 group">

            {/* DOT */}
            <div className="absolute left-[-6px] sm:left-[26px] top-12 w-[13px] h-[13px] rounded-full bg-[#050505] border-2 border-white/20 
              group-hover:border-indigo-400 group-hover:bg-indigo-400/20 
              group-hover:shadow-[0_0_15px_rgba(129,140,248,0.6)] transition-all duration-500 z-10"></div>

            {/* CARD */}
            <div className="p-5 sm:p-10 rounded-[1.5rem] sm:rounded-[2rem] 
              bg-white/[0.01] border border-white/[0.05] 
              hover:bg-white/[0.03] hover:border-white/10 
              transition-all duration-500 backdrop-blur-md 
              shadow-xl hover:shadow-[0_0_80px_-20px_rgba(129,140,248,0.15)] relative overflow-hidden">

              {/* TOP GLOW LINE */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500/50 transition-all duration-700"></div>

              {/* TOP */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

                <h3 className="text-xl sm:text-3xl font-bold text-white 
                  group-hover:text-transparent group-hover:bg-clip-text 
                  group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-emerald-400 
                  transition-all duration-500">
                  {exp.role}
                </h3>

                <div className="flex items-center gap-2 text-white/50 bg-white/5 px-4 py-2 rounded-full border border-white/5 w-fit">
                  <span className="text-xs sm:text-sm font-semibold uppercase">
                    {exp.duration}
                  </span>
                </div>
              </div>

              {/* META */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-x-8 text-sm mb-8 pb-6 border-b border-white/[0.05]">

                <div className="flex items-center gap-3 text-white/80 font-medium text-sm sm:text-base">
                  💼 {exp.company}
                </div>

                <div className="flex items-center gap-3 text-white/50 text-sm sm:text-base">
                  📍 {exp.location}
                </div>

              </div>

              {/* POINTS */}
              <div className="space-y-4">
                {Array.isArray(exp.description) &&
                  exp.description.map((point, i) => (
                    <div key={i} className="flex gap-3 sm:gap-4 text-white/60 group-hover:text-white/80 transition">

                      <span className="text-white/20 text-xs mt-1 group-hover:text-indigo-400 transition">
                        ▹
                      </span>

                      <p className="leading-relaxed text-sm sm:text-base tracking-wide">
                        {point}
                      </p>

                    </div>
                  ))}
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>

  </div>
</section>
  );
};

export default Experience;
