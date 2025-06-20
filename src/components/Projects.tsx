"use client"

import { useState, useEffect, useRef } from "react"
import { ExternalLink, Code } from "lucide-react"

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all")
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

  useEffect(() => {
    // Re-trigger animations when filter changes
    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => {
      el.classList.remove("animate-fade-in-up")
      // Force reflow
      ;(el as HTMLElement).offsetHeight
      el.classList.add("animate-fade-in-up")
    })
  }, [activeFilter])

  const projects = [
    {
      title: "CarMine - Car Marketplace Platform",
      description:
        "A comprehensive full-stack car marketplace platform using Next.js, React, and Tailwind CSS, enabling secure peer-to-peer vehicle transactions with user authentication, profile management, and secure payment processing.",
      image: "/assets/project0.jpg",
      technologies: ["Next.js", "React", "Tailwind CSS", "Supabase", "shadcn/ui", "TypeScript", "Node.js"],
      liveUrl: "https://carmine-my.vercel.app/",
      githubUrl: "https://github.com/TheDaniel3131/CarMine",
      category: "web",
    },
    {
      title: "myst3r10us - CTF Team Website",
      description:
        "A modern CTF team website featuring about the team profiles, CTF writeups & achievements showcase. Built with Next.js and features interactive elements that demonstrate the team's technical expertise in cybersecurity competitions.",
      image: "/assets/project1.jpg",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
      liveUrl: "https://myst3r10us.vercel.app/",
      githubUrl: "https://github.com/TheDaniel3131/CTFTeam",
      category: "web",
    },
    {
      title: "Barking Lot - Pet Adoption Website",
      description:
        "A pet adoption platform that connects pet lovers with animals in need of homes. Features pet listings, adoption applications, and user management system.",
      image: "/assets/project2.jpg",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Bootstrap", "jQuery", "Font Awesome", "AJAX"],
      liveUrl: "https://barkinglot.netlify.app",
      githubUrl: "https://github.com/TheDaniel3131/BarkingLot",
      category: "web",
    },
    {
      title: "Logistic Association Website",
      description:
        "A professional website for a logistics association featuring member management, event listings, and resource sharing capabilities.",
      image: "/assets/project3.jpg",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Bootstrap", "jQuery", "Font Awesome", "AJAX"],
      liveUrl: "#",
      githubUrl: "https://github.com/TheDaniel3131/WDTAssignment",
      category: "web",
    },
    {
      title: "Spiderman Online Food Service (SOFS)",
      description:
        "An online food ordering system with menu management, order tracking, and payment integration. Built with modern web technologies for optimal user experience.",
      image: "/assets/project4.jpg",
      technologies: ["Java", "MySQL"],
      liveUrl: "#",
      githubUrl: "https://github.com/TheDaniel3131/SOFS-Java",
      category: "app",
    },
    {
      title: "Air Flight System - Python",
      description:
        "A comprehensive flight management system built with Python, featuring flight scheduling, booking management, and passenger information handling.",
      image: "/assets/project5.jpg",
      technologies: ["Python"],
      liveUrl: "#",
      githubUrl: "https://github.com/TheDaniel3131/AirFlightSystem",
      category: "app",
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Projects</h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base">My recent work and academic projects</p>
      </div>

      <div className="flex justify-center mb-8 sm:mb-12 animate-on-scroll">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 ${
              activeFilter === "all"
                ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                : "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("web")}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 ${
              activeFilter === "web"
                ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                : "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
            }`}
          >
            Web
          </button>
          <button
            onClick={() => setActiveFilter("app")}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 ${
              activeFilter === "app"
                ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                : "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
            }`}
          >
            App
          </button>
        </div>
      </div>

      {/* Add key={activeFilter} to force re-render when filter changes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <div
            key={`${project.title}-${project.category}`}
            className="bg-[hsl(var(--card))] rounded-lg shadow-md border border-[hsl(var(--border))] overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:scale-105 hover:border-[hsl(var(--primary))]/50 animate-on-scroll"
          >
            <div className="relative overflow-hidden aspect-video">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=200&width=400&text=" + encodeURIComponent(project.title)
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                <div className="p-4 w-full">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-semibold text-sm sm:text-base">{project.title}</h3>
                    <div className="flex gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[hsl(var(--primary))] transition-colors"
                      >
                        <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-[hsl(var(--primary))] transition-colors"
                        >
                          <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 flex-grow">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1 bg-[hsl(var(--primary))]/10 rounded-full text-[hsl(var(--primary))]">
                  <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">{project.title}</h3>
              </div>
              <p className="text-[hsl(var(--muted-foreground))] mb-4 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-6 pt-0 flex gap-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
              >
                <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Source Code
              </a>
              {project.liveUrl && project.liveUrl !== "#" ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  Live Demo
                </a>
              ) : (
                <span className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[hsl(var(--muted-foreground))] opacity-50">
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  Not Available
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
