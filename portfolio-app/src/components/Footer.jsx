export default function Footer() {
  return (
    <footer id="contact" className="relative z-20 bg-[#121212] py-32 px-8 lg:px-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        <div className="text-center md:text-left">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">Let's Work <br/> Together.</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-md">
            Open for freelance opportunities and innovative projects. Send me a message and let's build something beautiful.
          </p>
          <a 
            href="mailto:hello@akshayiscoding.me"
            className="inline-block px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-lg"
          >
            hello@akshayiscoding.me
          </a>
        </div>

        <div className="flex gap-8 text-gray-400 font-medium">
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
        
      </div>
    </footer>
  );
}
