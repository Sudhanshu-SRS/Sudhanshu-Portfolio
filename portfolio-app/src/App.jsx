import ScrollyCanvas from './components/ScrollyCanvas';
import Projects from './components/Projects';
import Navbar from './components/Navbar';
import Capabilities from './components/Capabilities';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <main className="min-h-screen bg-[#121212] font-sans text-white selection:bg-indigo-500/30 relative">
      {/* Noise background */}
      <div className="pointer-events-none fixed inset-0 z-[100] h-screen w-full opacity-[0.04] mix-blend-overlay" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "128px 128px"}}></div>
      
      {/* Grid background */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full flex justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-[0.03]" style={{backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)", backgroundSize: "4rem 4rem", maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)"}}></div>
        <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent left-1/2 -translate-x-1/2"></div>
      </div>
      
      {/* Glow blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden h-screen w-full opacity-60 mix-blend-screen">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] max-w-[600px] max-h-[600px] rounded-full bg-indigo-500/10 blur-[130px] will-change-transform"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] max-w-[700px] max-h-[700px] rounded-full bg-emerald-500/10 blur-[140px] will-change-transform"></div>
      </div>

      <Navbar />
      <ScrollyCanvas />
      
      <div className="relative z-20 bg-[#121212]">
        <Capabilities />
        <Projects />
        <Experience />
        <Testimonials />
        <Footer />
      </div>
    </main>
  );
}

export default App;
