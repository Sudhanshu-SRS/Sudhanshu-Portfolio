import Navbar from "../components/Navbar";
import ScrollyCanvas from "../components/ScrollyCanvas";
import Capabilities from "../components/Capabilities";
import MyArsenal from "../components/myarsenel";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import About from "../components/aboutme";
import CompanyExperience from "../components/CompanyExperience";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <ScrollyCanvas />

      <div className="relative z-20 bg-[#121212]">
        <Capabilities />
        <MyArsenal />
        <Projects />
        <Experience />
        <About />
        <CompanyExperience />
        <Testimonials />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}

export default Home;