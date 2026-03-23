"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaAws,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiTailwindcss,
  SiFramer,
  SiExpo,
  SiGraphql,
  SiRedux
} from "react-icons/si";

// Categories definition
const categories = [
  {
    title: "Frontend Excellence",
    color: "from-cyan-500/30 to-blue-500/5",
    theme: "cyan",
    tech: [
      { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
      { name: "Framer", icon: <SiFramer className="text-white" /> },
      { name: "Redux", icon: <SiRedux className="text-[#764ABC]" /> },
    ],
  },
  {
    title: "Backend Core",
    color: "from-emerald-500/30 to-green-500/5",
    theme: "emerald",
    tech: [
      { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
      { name: "GraphQL", icon: <SiGraphql className="text-[#E10098]" /> },
      { name: "REST API", icon: <span className="text-emerald-400">⚡</span> },
      { name: "JWT Sec", icon: <span className="text-amber-400">🔐</span> },
      { name: "Express", icon: <span className="text-white font-bold">ex</span> },
    ],
  },
  {
    title: "Database Ecosystem",
    color: "from-amber-500/30 to-orange-500/5",
    theme: "amber",
    tech: [
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
      { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
      { name: "Redis", icon: <span className="text-red-500 font-bold">Re</span> },
    ],
  },
  {
    title: "DevOps & Cloud",
    color: "from-blue-500/30 to-indigo-500/5",
    theme: "blue",
    tech: [
      { name: "Docker", icon: <FaDocker className="text-[#2496ED]" /> },
      { name: "AWS", icon: <FaAws className="text-[#FF9900]" /> },
      { name: "Git", icon: <FaGitAlt className="text-[#F05032]" /> },
      { name: "CI/CD", icon: <span className="text-blue-400 text-lg">♾️</span> },
    ],
  },
  {
    title: "Mobile / App Dev",
    color: "from-purple-500/30 to-fuchsia-500/5",
    theme: "purple",
    tech: [
      { name: "React Native", icon: <FaReact className="text-[#61DAFB]" /> },
      { name: "Expo", icon: <SiExpo className="text-white" /> },
      { name: "PWA", icon: <span className="text-purple-400">📱</span> },
    ],
  },
];

// TechCard Component with SpotLight effect
const TechCard = ({ tech }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex items-center gap-4 px-6 py-4 rounded-2xl 
                 bg-[#0a0a0a]/80 border border-white/5 backdrop-blur-xl
                 transition-all overflow-hidden cursor-grab active:cursor-grabbing
                 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)]
                 hover:border-white/20 select-none min-w-max"
    >
      {/* Interactive Spotlight Overlay */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(120px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      
      {/* Subtle bottom glow on hover */}
      <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 text-2xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all duration-300">
        {tech.icon}
      </div>

      <span className="relative z-10 text-white/80 font-medium tracking-wide group-hover:text-white transition-colors duration-300">
        {tech.name}
      </span>
    </motion.div>
  );
};

// MarqueeRow Component
const MarqueeRow = ({ cat, index }) => {
  const direction = index % 2 === 0 ? 1 : -1;
  const baseSpeed = 40 + index * 5; // vary speeds slightly
  
  // Create an array that repeats enough times to ensure seamless infinite scrolling
  const repeatedTech = [...cat.tech, ...cat.tech, ...cat.tech, ...cat.tech, ...cat.tech, ...cat.tech];

  return (
    <div className="relative group/row">
      {/* Category Header */}
      <div className="flex items-center gap-4 mb-5 ml-12 md:ml-24">
        <h3 className="text-white/40 text-xs md:text-sm font-semibold uppercase tracking-[0.25em]">
          {cat.title}
        </h3>
        <div className="h-px w-12 bg-gradient-to-r from-white/20 to-transparent" />
      </div>

      {/* Row Track */}
      <div className="relative flex overflow-hidden w-full">
        {/* Ambient Glow behind the row */}
        <div 
          className="absolute inset-0 opacity-20 blur-[60px] pointer-events-none mix-blend-screen transition-opacity duration-700 group-hover/row:opacity-40"
          style={{ 
            background: `linear-gradient(90deg, transparent, ${cat.color.split(' ')[0].replace('from-', '').replace('/30', '')}, transparent)` 
          }}
        />

        {/* Fading Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#030303] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#030303] to-transparent z-20 pointer-events-none" />

        {/* Scrolling Content - Use framer motion drag for extra interaction */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          className="flex gap-4 md:gap-6 py-2 px-4 w-max cursor-grab active:cursor-grabbing"
          animate={{
            x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: baseSpeed,
              ease: "linear",
            },
          }}
        >
          {repeatedTech.map((tech, idx) => (
            <TechCard key={`${tech.name}-${idx}`} tech={tech} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const MyArsenal = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#030303] py-32 overflow-hidden selection:bg-white/10"
      id="arsenal"
    >
      {/* Noise Texture Overlay for premium feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

      {/* Background Lighting Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-24 relative z-10 px-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-2 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-8 shadow-inner"
        >
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse " />
          <span className="text-white/60   uppercase tracking-widest text-xl  tracking-tight md:text-7xl font-bold">
             My Arsenal
          </span>
        </motion.div>

     
      </motion.div>

      {/* Categories Scroller Container */}
      <div className="flex flex-col gap-12 md:gap-20">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
          >
            <MarqueeRow cat={cat} index={i} />
          </motion.div>
        ))}
      </div>
      
    </section>
  );
};

export default MyArsenal;
