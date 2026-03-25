import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function CTASection() {
  const [text, setText] = useState("");
  const fullText = "Let’s Build Something That Stands Out.";
   
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/about`);
      const data = await res.json();
      setData([data]);
      // console.log(data);
    }
    catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="relative overflow-hidden bg-[#050505] text-white py-28 px-6 lg:px-24">

      {/* 🌈 Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(99,102,241,0.15), transparent)",
              "radial-gradient(circle at 80% 70%, rgba(168,85,247,0.15), transparent)",
              "radial-gradient(circle at 50% 90%, rgba(6,182,212,0.15), transparent)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="w-full h-full"
        />
      </div>

      <div className="max-w-5xl mx-auto text-center flex flex-col gap-10">

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold"
        >
          {text}
          <span className="text-indigo-400 animate-pulse">|</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-gray-400 text-lg max-w-xl mx-auto"
        >
          I build fast, scalable, and visually stunning web apps using MERN &
          modern UI/UX principles.
        </motion.p>
{/* CTA */}
<div className="flex flex-col md:flex-row justify-center gap-6">

  {data.map((item) => (
    <div key={item._id} className="flex flex-col md:flex-row gap-6">

      {/* 🚀 Hire Me */}
      <motion.a
        href={`mailto:${item.email}`}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group px-10 py-5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 font-semibold text-lg relative overflow-hidden"
      >
        <span className="relative z-10">🚀 Hire Me</span>

        {/* Glow effect */}
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/10 blur-xl"></span>
      </motion.a>

      {/* 💬 Let's Talk */}
      <motion.a
        href={`https://wa.me/${item.whatsapp}/?text=Hi%20Sudhanshu!%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20potential%20collaborations.%20Are%20you%20available%20for%20a%20chat?`}
        target="_blank"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group px-10 py-5 rounded-full border border-white/20 hover:bg-white/10 transition font-semibold relative overflow-hidden"
      >
        <span className="relative z-10">💬 Let’s Talk Instantly</span>

        {/* Glow hover */}
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-indigo-500/10 blur-xl"></span>
      </motion.a>

    </div>
  ))}

</div>
      </div>
    </section>
  );
}

export default CTASection;