"use client"

import { useState, useEffect } from "react"
import {
  Github,
  Linkedin,
  Menu,
  X,
  Moon,
  Sun,
  Mail,
  MessageCircle,
  User,
  Wrench,
  Briefcase,
  FolderOpen,
  Phone,
  Code,
} from "lucide-react"
import { useTheme } from "./theme-provider"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      // Account for fixed navbar height (80px) plus some extra padding
      const navbarHeight = 80
      const extraPadding = 20
      const elementPosition = section.offsetTop - navbarHeight - extraPadding

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[hsl(var(--background))]/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold flex items-center gap-2">
              <Code className="h-6 w-6 text-[hsl(var(--primary))]" />
              <span className="text-[hsl(var(--primary))]">DPTF</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <button
              onClick={() => scrollToSection("about")}
              className="text-base font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-base font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="text-base font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-base font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-base font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Social Icons and Theme Toggle */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <a
              href="https://github.com/danielpohtingfong"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/danielpohtingfong"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button className="text-[hsl(var(--foreground))]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[hsl(var(--background))]/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("about")}
              className="text-base font-medium py-2 text-[hsl(var(--foreground))] flex items-center gap-3"
            >
              <User className="h-5 w-5" />
              About
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-base font-medium py-2 text-[hsl(var(--foreground))] flex items-center gap-3"
            >
              <Wrench className="h-5 w-5" />
              Skills
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="text-base font-medium py-2 text-[hsl(var(--foreground))] flex items-center gap-3"
            >
              <Briefcase className="h-5 w-5" />
              Experience
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-base font-medium py-2 text-[hsl(var(--foreground))] flex items-center gap-3"
            >
              <FolderOpen className="h-5 w-5" />
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-base font-medium py-2 text-[hsl(var(--foreground))] flex items-center gap-3"
            >
              <Phone className="h-5 w-5" />
              Contact
            </button>

            <div className="flex justify-center space-x-6 pt-4">
              <a
                href="https://github.com/danielpohtingfong"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/danielpohtingfong"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:danielpohtingfong@gmail.com"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=60108483602&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
