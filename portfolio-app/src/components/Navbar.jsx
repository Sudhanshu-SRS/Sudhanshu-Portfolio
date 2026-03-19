import { motion } from 'framer-motion';

export default function Navbar() {
  const links = ['Services', 'Work', 'About', 'Experience', 'Testimonials', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between"
    >
      <div className="text-2xl font-bold tracking-tighter">
        Sudhanshu.
      </div>

      <div className="hidden md:flex items-center gap-8 bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/5">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      <a
        href="/resume.pdf"
        target="_blank"
        className="hidden md:block px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
      >
        Resume
      </a>

      <button className="md:hidden text-white">
        {/* Mobile menu icon placeholder */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </motion.nav>
  );
}
