import { motion, useScroll } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const links = ['Services', 'Work', 'About', 'Experience', 'Testimonials', 'Contact'];
  const [mounted, setMounted] = useState(false);


const location = useLocation();
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoClick = (e) => {
  if (location.pathname === "/") {
    e.preventDefault(); // stop navigation
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};


const handleNavClick = (e, section) => {
  if (location.pathname === "/") {
    e.preventDefault();

    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
};
  const content = (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999999,
      pointerEvents: 'none',
    }}>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-emerald-500 to-sky-500 origin-left z-[100] shadow-[0_0_10px_rgba(129,140,248,0.8)] pointer-events-none"
        style={{ scaleX: scrollYProgress, position: 'fixed' }}
      />
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-between px-6 py-6 md:px-12  pointer-events-auto w-full"
      >
     <Link 
  to="/" 
  onClick={handleLogoClick}
  className="font-bold text-xl tracking-tighter text-white uppercase"
>
  Sudhanshu<span className="text-white/50">.</span>
</Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
   {links.map((link) => {
  const section = link.toLowerCase();

  return location.pathname === "/" ? (
    // ✅ Same page → smooth scroll
    <a
      key={link}
      href={`#${section}`}
      onClick={(e) => handleNavClick(e, section)}
      className="hover:text-white transition-colors cursor-pointer"
    >
      {link}
    </a>
  ) : (
    // ✅ Different page → go home with hash
    <Link
      key={link}
      to={`/#${section}`}
      className="hover:text-white transition-colors cursor-pointer"
    >
      {link}
    </Link>
  );
})}
        </nav>

        <div className="flex items-center gap-2 md:gap-4 text-white/70">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm font-medium mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path><path d="M14 2v5a1 1 0 0 0 1 1h5"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
            <span>Resume</span>
          </a>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative flex items-center justify-center cursor-pointer">
            <a href="https://github.com/sudhanshu" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative flex items-center justify-center cursor-pointer">
            <a href="https://linkedin.com/in/sudhanshu" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </motion.div>
        </div>
      </motion.header>
    </div>
  );

  if (!mounted) return null;
  return createPortal(content, document.getElementById("navbar-root"));
}
