"use client"

import { useEffect, useRef } from "react"
import { Briefcase, Calendar } from "lucide-react"

const Experience = () => {
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

  const experiences = [
    {
      title: "Web Developer Intern",
      company: "SPARK Internship Programme @ APU Corporate Training & Career Centre",
      period: "Jan 2024 - May 2024",
      description:
        "Assisted in frontend development of internal web applications & contributed to UI enhancements, responsive design, maintenance and optimization of projects which improved user experience and performance. Conducted debugging and testing activities to identify and resolve technical issues during development sprints.",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
    },
    {
      title: "Software & Design Intern",
      company: "Pickles Asia Sdn Bhd (Pickles Auctions)",
      period: "Oct 2022 - Jan 2023",
      description:
        "Collaborated with the Product Manager on research and technical documentation using Confluence. Assisted in the design and development of mobile UI prototypes, contributing to the overall user experience. Managed and organized digital content using Strapi CMS for web application integration.",
      technologies: ["UI/UX Design", "Strapi CMS", "Confluence", "Jira", "Prototyping"],
    },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Experience</h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base">My professional journey</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative ml-8 sm:ml-12">
          {/* Timeline line positioned to align with briefcase centers */}
          <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-0.5 bg-[hsl(var(--primary))]"></div>

          {experiences.map((exp, index) => (
            <div key={index} className="relative pb-8 sm:pb-12 last:pb-0 animate-on-scroll">
              {/* Timeline icon - positioned to align with the timeline line */}
              <div className="absolute left-0 sm:left-1 top-16 w-8 h-8 sm:w-8 sm:h-8 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center border-4 border-[hsl(var(--background))]">
                <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 text-[hsl(var(--primary-foreground))]" />
              </div>

              <div className="ml-12 sm:ml-16">
                <div className="bg-[hsl(var(--card))] p-4 sm:p-6 rounded-lg shadow-md border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 hover:scale-105">
                  {/* Header with title, company and date in proper layout */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1">{exp.title}</h3>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base">{exp.company}</p>
                    </div>
                    <div className="flex items-center text-[hsl(var(--muted-foreground))] text-xs sm:text-sm bg-[hsl(var(--muted))] px-3 py-1 rounded-full whitespace-nowrap">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="mb-4 text-[hsl(var(--foreground))] text-sm sm:text-base leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 sm:px-3 py-1 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded-full text-xs sm:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experience
