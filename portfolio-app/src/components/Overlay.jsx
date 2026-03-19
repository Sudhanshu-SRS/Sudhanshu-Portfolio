import { motion, useTransform, useSpring } from 'framer-motion';

export default function Overlay({ scrollYProgress }) {
  // 🔥 Smooth helper (makes everything buttery)
  const smooth = (value) =>
    useSpring(value, {
      stiffness: 80,
      damping: 20,
      mass: 0.5,
    });

  // =========================
  // HERO (0 → 0.25)
  // =========================
  const opacity1 = smooth(useTransform(scrollYProgress, [0, 0.2], [1, 0]));
  const y1 = smooth(useTransform(scrollYProgress, [0, 0.2], [0, -120]));
  const scale1 = smooth(useTransform(scrollYProgress, [0, 0.2], [1, 0.96]));

  // =========================
  // INTRO 1 (0.2 → 0.5)
  // =========================
  const opacity2 = smooth(
    useTransform(scrollYProgress, [0.2, 0.3, 0.45], [0, 1, 0])
  );
  const y2 = smooth(
    useTransform(scrollYProgress, [0.2, 0.3, 0.45], [120, 0, -120])
  );
  const scale2 = smooth(
    useTransform(scrollYProgress, [0.2, 0.3, 0.45], [0.95, 1, 0.96])
  );

  // =========================
  // INTRO 2 (0.45 → 0.75)
  // =========================
  const opacity3 = smooth(
    useTransform(scrollYProgress, [0.45, 0.55, 0.7], [0, 1, 0])
  );
  const y3 = smooth(
    useTransform(scrollYProgress, [0.45, 0.55, 0.7], [120, 0, -120])
  );
  const scale3 = smooth(
    useTransform(scrollYProgress, [0.45, 0.55, 0.7], [0.95, 1, 0.96])
  );

  return (
    <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">

      {/* ================= HERO ================= */}
      <motion.div
        style={{ opacity: opacity1, y: y1, scale: scale1 }}
        className="absolute inset-0 flex flex-col items-center justify-end p-6 pb-24 md:pb-32"
      >
        <div className="flex flex-col items-center text-center relative w-full h-full justify-end">
          
          <h1 className="text-6xl md:text-[8rem] font-bold tracking-[-0.03em] text-white/50 mix-blend-overlay drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] leading-none mb-2 mt-auto">
            Sudhanshu.
          </h1>

          <p className="text-2xl md:text-3xl font-medium tracking-[0.2em] text-white/40 mix-blend-overlay uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
            Creative Engineer
          </p>

          {/* Scroll Indicator */}
          <div className="mt-20 flex flex-col items-center gap-2 text-white/40">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-white/60 rounded-full"
              />
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
              Scroll
            </span>
          </div>

        </div>
      </motion.div>

      {/* ================= INTRO 1 ================= */}
      <motion.div
        style={{ opacity: opacity2, y: y2, scale: scale2 }}
        className="absolute inset-0 flex flex-col items-start justify-end p-6 pb-24 md:px-20 md:pb-32 lg:px-28"
      >
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-6xl tracking-[-0.03em] text-white/50 mix-blend-overlay drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] leading-tight">
            I build <br />
            <span className="font-bold inline-block mt-2">
              digital experiences.
            </span>
          </h2>
        </div>
      </motion.div>

      {/* ================= INTRO 2 ================= */}
      <motion.div
        style={{ opacity: opacity3, y: y3, scale: scale3 }}
        className="absolute inset-0 flex flex-col items-end justify-end p-6 pb-24 md:px-20 md:pb-32 lg:px-28 text-right"
      >
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-6xl tracking-[-0.03em] text-white/50 mix-blend-overlay drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] leading-tight">
            Bridging <br />
            <span className="font-bold inline-block mt-2">
              design and engineering.
            </span>
          </h2>
        </div>
      </motion.div>

    </div>
  );
}