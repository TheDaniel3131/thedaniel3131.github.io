"use client"

import { useEffect, useRef } from "react"
import { Briefcase, GraduationCap, Award, Users, Code2 } from "lucide-react"

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const stats = [
    { label: "Years Experience", value: "<1", icon: <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { label: "Projects Completed", value: "10+", icon: <Award className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { label: "Technologies", value: "15+", icon: <Code2 className="h-4 w-4 sm:h-5 sm:w-5" /> },
    { label: "Academic Projects", value: "8+", icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" /> },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">About Me</h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base">Get to know me better through the information below</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
        <div className="animate-on-scroll">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">My Introduction</h3>

          <p className="text-[hsl(var(--muted-foreground))] mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
            I&apos;m Daniel Poh Ting Fong, and I am a passionate Software Engineering student at Asia Pacific University. I
            have completed two internships that gave me hands-on experience in web development, UI/UX design, and
            software testing. I specialize in full-stack development with React, Next.js, and modern web technologies.
          </p>

          <p className="text-[hsl(var(--muted-foreground))] mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
            With a strong foundation in computer science and a passion for learning new technologies, I&apos;m constantly
            pushing my limits through self-learning and participation in hackathons like Solana Hackfest and various CTF
            competitions.
          </p>

          <div className="mb-6 sm:mb-8 space-y-4">
            <h4 className="text-lg sm:text-xl font-medium mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(var(--primary))]" />
              Education
            </h4>
            <div className="border-l-2 border-[hsl(var(--primary))] pl-4 space-y-3">
              <div>
                <h5 className="font-medium text-sm sm:text-base">BSc (Hons) in Software Engineering</h5>
                <p className="text-xs sm:text-sm text-[hsl(var(--muted-foreground))]">
                  Asia Pacific University (APU), Feb 2023 – Feb 2025
                </p>
              </div>
              <div>
                <h5 className="font-medium text-sm sm:text-base">
                  Diploma in ICT with Specialism in Software Engineering
                </h5>
                <p className="text-xs sm:text-sm text-[hsl(var(--muted-foreground))]">
                  Asia Pacific University (APU), Oct 2020 – Jan 2023
                </p>
              </div>
            </div>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md font-medium hover:bg-[hsl(var(--primary))]/90 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
          >
            Download My Resume
          </a>
        </div>

        <div className="animate-on-scroll">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[hsl(var(--card))] p-4 sm:p-6 rounded-lg shadow-md border border-[hsl(var(--border))] text-center group hover:border-[hsl(var(--primary))]/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="p-2 sm:p-3 bg-[hsl(var(--primary))]/10 rounded-full text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                    {stat.icon}
                  </div>
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold text-[hsl(var(--primary))] mb-1 sm:mb-2">{stat.value}</h4>
                <p className="text-[hsl(var(--muted-foreground))] text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-[hsl(var(--card))] p-4 sm:p-6 rounded-lg shadow-md border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-colors">
            <h4 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Languages</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 sm:px-3 py-1 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded-full text-xs sm:text-sm">
                English (Fluent)
              </span>
              <span className="px-2 sm:px-3 py-1 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded-full text-xs sm:text-sm">
                Mandarin (Native)
              </span>
              <span className="px-2 sm:px-3 py-1 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded-full text-xs sm:text-sm">
                Malay (Intermediate)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
