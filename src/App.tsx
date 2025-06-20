import { ThemeProvider } from "./components/theme-provider"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/SkillsTechnologies"
import Experience from "./components/Experience"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import CustomCursor from "./components/CustomCursor"
import ScrollToTop from "./components/ScrollToTop"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <div className="min-h-screen bg-[hsl(var(--background))]">
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

          <section id="skills" className="py-16 sm:py-20 bg-[hsl(var(--muted))]">
            <div className="animate-fade-in-up">
              <Skills />
            </div>
          </section>

          <section id="experience" className="py-16 sm:py-20">
            <div className="animate-fade-in-up">
              <Experience />
            </div>
          </section>

          <section id="projects" className="py-16 sm:py-20 bg-[hsl(var(--muted))]">
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
  )
}

export default App
