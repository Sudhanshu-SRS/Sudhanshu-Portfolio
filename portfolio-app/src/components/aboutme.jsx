import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

const AboutMe = () => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const [aboutData, setAboutData] = useState(null);
  useEffect(() => {
  if (!aboutData?.aboutme) return;

  let i = 0;
  const text = aboutData.aboutme;

  const interval = setInterval(() => {
    setTypedText(text.slice(0, i));
    i++;

    if (i > text.length) clearInterval(interval);
  }, 20); // speed (lower = faster)

  return () => clearInterval(interval);
}, [aboutData]);
const [typedText, setTypedText] = useState("");
  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/about/`);
      setAboutData(res.data);
    } catch (error) {
      console.error("Error fetching about data:", error);
    }
  };

  if (!aboutData) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading About...
      </div>
    );
  }

  return (
    <section id="about"className="bg-[#0a0a0a] text-white py-20 px-4 sm:px-6 lg:px-20">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* 🔥 IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <img
            src={aboutData.image}
            alt="About"
            className="rounded-3xl w-full h-[300px] sm:h-[450px] object-cover shadow-2xl group-hover:scale-[1.03] transition duration-500"
          />

          {/* Glow */}
          <div className="absolute inset-0 rounded-3xl bg-indigo-500/10 blur-2xl -z-10"></div>
        </motion.div>

    {/* 🔥 CONTENT */}
<motion.div
  initial={{ opacity: 0, x: 80 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="space-y-10"
>

  {/* TITLE */}
  <div className="space-y-4">
    <h2 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
      About <span className="text-indigo-400">Me</span>
    </h2>

    <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"></div>
  </div>

  {/* TEXT WITH TYPE EFFECT */}
  <div className="space-y-6 max-w-2xl">

    <p className="text-gray-400 text-base sm:text-lg leading-relaxed tracking-wide">
      {typedText}
      <span className="text-indigo-400 animate-pulse">|</span>
    </p>

    {/* Highlight line */}
    <p className="text-white text-lg font-medium">
      Building modern, scalable & visually stunning web experiences 🚀
    </p>

  </div>

  {/* 🔥 STATS */}
  <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6">

    {[
      {
        label: "Experience",
        value: aboutData.yearExperience + "+",
      },
      {
        label: "Awards",
        value: aboutData.awards,
      },
      {
        label: "Hackathons",
        value: aboutData.hackhthon,
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.2 }}
        whileHover={{ scale: 1.08 }}
        className="relative bg-white/[0.03] border border-white/10 rounded-xl p-5 text-center backdrop-blur-lg hover:bg-white/[0.06] transition-all duration-300"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-indigo-400">
          {item.value || 0}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 tracking-wide mt-1">
          {item.label}
        </p>

        <div className="absolute inset-0 rounded-xl border border-indigo-500/0 hover:border-indigo-500/30 transition pointer-events-none"></div>
      </motion.div>
    ))}

  </div>

 

</motion.div>
      </div>
    </section>
  );
};

export default AboutMe;