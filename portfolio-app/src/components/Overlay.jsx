import { motion, useTransform } from 'framer-motion';

export default function Overlay({ scrollYProgress }) {
  // Section 1: Hero (0% to 20%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -150]);

  // Section 2: Bridging design... (30% to 50%)
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [150, -150]);

  // Section 3: Let's show Capabilities introduction (60% to 80%)
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.85], [150, -150]);

  return (
    <div className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">

      {/* Hero */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute top-0 w-full h-screen flex flex-col items-center justify-center text-center left-0 px-4"
      >
        <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter mb-6">Sudhanshu.</h1>
        <p className="text-2xl md:text-3xl text-gray-300 font-medium tracking-wide">Creative Engineer</p>
      </motion.div>

      {/* Intro */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute top-[150vh] left-0 w-full h-screen flex flex-col items-center justify-center px-8 text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight">
          Bridging the gap between <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white italic">aesthetic design</span> and <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">robust engineering.</span>
        </h2>
      </motion.div>

      {/* Transition to Capabilities */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute top-[300vh] right-0 w-full h-screen flex flex-col items-center justify-center px-8 text-center"
      >
        <p className="text-xl md:text-2xl text-gray-400 font-semibold uppercase tracking-widest mb-4">Core Capabilities</p>
        <h2 className="text-5xl md:text-6xl font-bold max-w-3xl leading-tight">
          Crafting pixel-perfect digital experiences.
        </h2>
      </motion.div>

    </div>
  );
}
