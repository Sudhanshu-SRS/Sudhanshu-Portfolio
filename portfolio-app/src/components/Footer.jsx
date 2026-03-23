import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export function FooterBar() {
  return (
    <footer className="bg-black border-t border-white/10 text-white py-16 px-6 lg:px-24">

      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        {/* 🔥 TOP ROW (LEFT + RIGHT) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* LEFT */}
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-xl font-bold tracking-wide">Sudhanshu</h2>
            <p className="text-gray-400 text-sm">
              A Creative Full Stack Developer
            </p>
          </div>

          {/* RIGHT */}
          <div className="text-center md:text-right space-y-2">
            <p className="text-gray-400 text-sm">
              Based in India 🇮🇳 & UAE 
            </p>

            <a
              href="mailto:yourmail@gmail.com"
              className="text-gray-300 text-sm hover:text-white transition"
            >
              sudhanshusakhare808@gmail.com
            </a>

            {/* SOCIALS */}
            <div className="flex justify-center md:justify-end gap-4 mt-2">
              {[FaLinkedin, FaTwitter, FaGithub].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-gray-400 hover:text-white text-lg transition"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* 🔥 DIVIDER */}
        <div className="w-full h-px bg-white/10"></div>

        {/* 🔥 BOTTOM (CENTER) */}
        <div className="text-center space-y-2">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Sudhanshu Sakhare. All rights reserved.
          </p>
        
        </div>

      </div>
    </footer>
  );
}

export default FooterBar;