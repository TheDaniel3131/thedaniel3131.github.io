import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import SkillsTechnologies from "./components/SkillsTechnologies";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import { useAnalytics } from "@/hooks/google-analytics/GoogleAnalytics";

function App() {
  useAnalytics(import.meta.env.VITE_GA_MEASUREMENT_ID || "");
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div
        className={`min-h-screen bg-[hsl(var(--background))] transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <CustomCursor />
        <ScrollToTop />
        <Navbar />
        <main>
          <section id="home" className="min-h-screen flex items-center">
            <Hero />
          </section>

          <section id="about" className="py-16 sm:py-20">
            <div className="animate-fade-in-up">
              <About />
            </div>
          </section>

          <section
            id="skills"
            className="py-16 sm:py-20 bg-[hsl(var(--muted))]"
          >
            <div className="animate-fade-in-up">
              <SkillsTechnologies />
            </div>
          </section>

          <section id="experience" className="py-16 sm:py-20">
            <div className="animate-fade-in-up">
              <Experience />
            </div>
          </section>

          <section
            id="projects"
            className="py-16 sm:py-20 bg-[hsl(var(--muted))]"
          >
            <div className="animate-fade-in-up">
              <Projects />
            </div>
          </section>

          <section id="contact" className="py-16 sm:py-20">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
