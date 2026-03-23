import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Testimonials() {
  const [data, setData] = useState([]);
  const backendurl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/clientRecom`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section
      id="testimonials"
      className="relative z-20 w-full bg-[#0a0a0a] py-28 border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* 🔥 HEADER */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <h2 className="text-3xl sm:text-5xl font-light text-white/90">
            Client{" "}
            <span className="font-bold text-white">
              Recommendations
            </span>
          </h2>

          <p className="mt-4 text-white/50 font-medium tracking-wide uppercase text-xs sm:text-sm">
            What people say about me
          </p>
        </div>

        {/* 🔥 MARQUEE */}
        <div className="relative flex overflow-hidden py-10 w-screen left-1/2 -translate-x-1/2">

          {/* LEFT FADE */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10"></div>

          {/* RIGHT FADE */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10"></div>

          {/* 🔥 SCROLLING TRACK */}
          <div className="flex gap-6 sm:gap-8 animate-marquee">

            {[...data, ...data].map((test, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col gap-6 p-6 sm:p-8 rounded-3xl 
                bg-white/[0.02] border border-white/10 backdrop-blur-xl 
                hover:bg-white/[0.05] hover:border-white/20 
                transition-all duration-500 shadow-xl 
                w-[85vw] sm:w-[500px] md:w-[600px] shrink-0"
              >

                {/* QUOTE ICON */}
                <div className="absolute top-6 right-6 text-indigo-500/20 group-hover:text-indigo-400/40 transition text-4xl">
                  “
                </div>

                {/* TEXT */}
                <p className="text-white/70 text-base sm:text-lg leading-relaxed group-hover:text-white/90 transition">
                  "{test.recomendation}"
                </p>

                {/* USER */}
<div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between gap-4">

  <div>
    <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition">
      {test.name}
    </h3>

    <p className="text-sm text-white/50">
      {test.role} • {test.company}
    </p>
  </div>

  {/* 🔗 LINKEDIN ICON */}
  {test.linkedin && (
    <a
      href={test.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-white/5 border border-white/10 
                 hover:bg-indigo-500/20 hover:border-indigo-400/40
                 transition-all duration-300 group/icon"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-5 h-5 text-white/60 group-hover/icon:text-indigo-400 transition"
      >
        <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 
        2.76 2.24 5 5 5h14c2.76 0 5-2.24 
        5-5V5c0-2.76-2.24-5-5-5zM7.12 
        20.45H3.56V9h3.56v11.45zM5.34 
        7.44c-1.14 0-2.06-.93-2.06-2.07 
        0-1.14.92-2.06 2.06-2.06 
        1.14 0 2.06.92 2.06 2.06 
        0 1.14-.92 2.07-2.06 
        2.07zM20.45 
        20.45h-3.55v-5.59c0-1.33-.03-3.04-1.85-3.04-1.85 
        0-2.13 1.45-2.13 2.94v5.69H9.37V9h3.41v1.56h.05c.47-.9 
        1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 
        4.26 5.44v6.3z" />
      </svg>
    </a>
  )}

</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 🔥 ANIMATION STYLE */}
      <style>
        {`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: flex;
          animation: marquee 25s linear infinite;
        }

        @media (max-width: 640px) {
          .animate-marquee {
            animation: marquee 18s linear infinite;
          }
        }
        `}
      </style>
    </section>
  );
}