import ScrollyCanvas from './components/ScrollyCanvas';
import Projects from './components/Projects';
import Navbar from './components/Navbar';
import Capabilities from './components/Capabilities';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <main className="bg-[#121212] min-h-screen font-sans text-white selection:bg-cyan-500/30">
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
