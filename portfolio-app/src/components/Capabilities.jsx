import { motion } from 'framer-motion';
import{ useEffect, useState } from 'react';
import axios from 'axios';



const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';




export default function Capabilities() {
  const [capabilities, setCapabilities] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/capability`);
      console.log("DATA:", res.data.Capabilities);

      setCapabilities(res.data.Capabilities); // 🔥 important
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <div className="flex flex-col items-center justify-center mb-16 md:mb-24">
  
  <div className="flex flex-wrap gap-x-2 gap-y-1 text-4xl md:text-5xl font-light text-white/90 text-center">
    
    <div className="overflow-hidden inline-flex">
      <span>What</span>
    </div>

    <div className="overflow-hidden inline-flex">
      <span>I</span>
    </div>

    <div className="overflow-hidden inline-flex">
      <span className="font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
        Offer
      </span>
    </div>

  </div>

  {/* 🔥 FIX HERE */}
  <span className="mt-4 inline-block text-white/50 font-medium tracking-wide border border-white/10 py-1 px-4 rounded-full uppercase text-xs">
    Core Capabilities
  </span>

</div>  
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 overflow-hidden relative h-full"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
              <div
  className="w-8 h-8 text-indigo-400 group-hover:text-purple-400 transition"
  dangerouslySetInnerHTML={{ __html: cap.iconSVG }}
/>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
                {cap.title}
              </h3>
              <p className="text-lg text-white/60 leading-relaxed font-medium relative z-10">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
