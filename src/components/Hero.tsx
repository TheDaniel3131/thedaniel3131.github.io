"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ArrowDown } from "lucide-react"

const Hero = () => {
  const [profession, setProfession] = useState("Software Engineer")
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const professions = [
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "Web Developer",
      "AI Enthusiast",
      "Software Developer",
      "Problem Solver",
    ]

    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % professions.length
      setProfession(professions[currentIndex])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      // Account for fixed navbar height (80px) plus some extra padding
      const navbarHeight = 20
      const extraPadding = 20
      const elementPosition = contactSection.offsetTop - navbarHeight - extraPadding

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      // Account for fixed navbar height (80px) plus some extra padding
      const navbarHeight = 20
      const extraPadding = 20
      const elementPosition = aboutSection.offsetTop - navbarHeight - extraPadding

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 pt-16 sm:pt-20 md:pt-28 pb-4 sm:pb-6 md:pb-12">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-12">
        {/* Text Content */}
        <div className="text-center md:text-left md:w-1/2 order-2 md:order-1">
          <h1 className="font-bold mb-2 sm:mb-3 md:mb-4">
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl ">Hello, I&apos;m</span>
            <span className="text-[hsl(var(--primary))] whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
              Daniel Poh Ting Fong
            </span>
          </h1>

          <div className="h-6 sm:h-8 md:h-10 mb-3 sm:mb-4 md:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-[hsl(var(--muted-foreground))] animate-fade-in">
              <span className="profession-text">{profession}</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto md:mx-0 mb-4 sm:mb-6 md:mb-8 leading-relaxed">
            I am a recent fresh graduate majoring in Software Engineering. I am passionate about building projects and
            bringing ideas to life. Feel free to reach out to me for job interviews, project collaborations, or
            freelance opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <button
              onClick={scrollToContact}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md font-medium flex items-center justify-center gap-2 hover:bg-[hsl(var(--primary))]/90 transition-colors text-sm sm:text-base"
            >
              Contact Me
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-transparent border border-[hsl(var(--border))] rounded-md font-medium hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-colors text-center text-sm sm:text-base"
            >
              View Resume
            </a>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex justify-center md:justify-end md:w-1/2 order-1 md:order-2">
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/10 rounded-2xl blur-xl transform rotate-6 animate-pulse"></div>
            <div className="absolute -inset-1 sm:-inset-2 bg-[hsl(var(--primary))]/10 rounded-2xl transform -rotate-3"></div>

            {/* Main image container - Optimized for mobile */}
            <div className="relative landscape:w-36 landscape:h-36 w-50 h-50 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="hero-image-container relative overflow-hidden rounded-2xl border-2 sm:border-4 border-[hsl(var(--primary))]/30 shadow-2xl bg-[hsl(var(--card))]">
                {!imgError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/assets/hero.jpg"
                    alt="Daniel Poh Ting Fong"
                    className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/5 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[hsl(var(--primary))]/20 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <svg
                          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[hsl(var(--primary))]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm text-[hsl(var(--muted-foreground))]">Profile Photo</p>
                    </div>
                  </div>
                )}

                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Floating decorative elements - Smaller on mobile */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[hsl(var(--primary))] rounded-full animate-bounce-slow opacity-80"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 md:-bottom-4 md:-left-4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-[hsl(var(--primary))]/60 rounded-full animate-bounce-slow-delayed opacity-60"></div>
              <div className="absolute top-1/2 -left-2 sm:-left-3 md:-left-6 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-[hsl(var(--primary))]/40 rounded-full animate-float opacity-40"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll down button - positioned relative to container */}
      <div className="flex justify-center mt-4 sm:mt-6 md:mt-16">
        <button
          onClick={scrollToAbout}
          className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>
    </div>
  )
}

export default Hero
