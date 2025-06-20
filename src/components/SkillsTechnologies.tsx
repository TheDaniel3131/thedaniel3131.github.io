"use client"

import { useEffect, useRef } from "react"
import { Code, Database, Wrench, Lightbulb, Heart, Users, MessageCircle, Target } from "lucide-react"

const Skills = () => {
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

  const skillCategories = [
    {
      category: "Programming Languages",
      icon: <Code className="h-4 w-4 sm:h-5 sm:w-5" />,
      skills: [
        { name: "HTML", level: "Advanced", icon: "🌐" },
        { name: "CSS", level: "Advanced", icon: "🎨" },
        { name: "JavaScript", level: "Advanced", icon: "⚡" },
        { name: "TypeScript", level: "Intermediate", icon: "📘" },
        { name: "Python", level: "Advanced", icon: "🐍" },
        { name: "Java", level: "Advanced", icon: "☕" },
        { name: "PHP", level: "Intermediate", icon: "🐘" },
        { name: "C#", level: "Intermediate", icon: "🔷" },
        { name: "C++", level: "Intermediate", icon: "⚙️" },
        { name: "R", level: "Basic", icon: "📊" },
      ],
    },
    {
      category: "Frameworks & Libraries",
      icon: <Database className="h-4 w-4 sm:h-5 sm:w-5" />,
      skills: [
        { name: "React", level: "Advanced", icon: "⚛️" },
        { name: "Next.js", level: "Advanced", icon: "▲" },
        { name: "Express.js", level: "Intermediate", icon: "🚀" },
        { name: "CodeIgniter", level: "Intermediate", icon: "🔥" },
        { name: "Tailwind CSS", level: "Advanced", icon: "💨" },
        { name: "Bootstrap", level: "Advanced", icon: "🅱️" },
        { name: "jQuery", level: "Intermediate", icon: "💫" },
      ],
    },
    {
      category: "Databases & Tools",
      icon: <Wrench className="h-4 w-4 sm:h-5 sm:w-5" />,
      skills: [
        { name: "MySQL", level: "Advanced", icon: "🗄️" },
        { name: "PostgreSQL", level: "Intermediate", icon: "🐘" },
        { name: "MongoDB", level: "Intermediate", icon: "🍃" },
        { name: "Supabase", level: "Intermediate", icon: "⚡" },
        { name: "Git", level: "Advanced", icon: "📝" },
        { name: "VS Code", level: "Advanced", icon: "💻" },
        { name: "Figma", level: "Intermediate", icon: "🎨" },
        { name: "Postman", level: "Advanced", icon: "📮" },
      ],
    },
    {
      category: "Other Skills",
      icon: <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5" />,
      skills: [
        { name: "Responsive Design", level: "Advanced", icon: "📱" },
        { name: "UI/UX Design", level: "Intermediate", icon: "🎨" },
        { name: "API Development", level: "Intermediate", icon: "🔌" },
        { name: "Testing & Debugging", level: "Intermediate", icon: "🐛" },
        { name: "Agile Methodology", level: "Intermediate", icon: "🔄" },
        { name: "Version Control", level: "Advanced", icon: "📋" },
      ],
    },
  ]

  const softSkills = [
    { name: "Communication", icon: <MessageCircle className="h-4 w-4" /> },
    { name: "Teamwork", icon: <Users className="h-4 w-4" /> },
    { name: "Problem Solving", icon: <Target className="h-4 w-4" /> },
    { name: "Time Management", icon: "⏰" },
    { name: "Adaptability", icon: "🔄" },
    { name: "Creativity", icon: "💡" },
    { name: "Critical Thinking", icon: "🧠" },
    { name: "Attention to Detail", icon: "🔍" },
    { name: "Leadership", icon: "👑" },
    { name: "Emotional Intelligence", icon: <Heart className="h-4 w-4" /> },
    { name: "Self-Learning", icon: "📚" },
    { name: "Analytical Thinking", icon: "📈" },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-green-500"
      case "Intermediate":
        return "bg-blue-500"
      case "Basic":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getLevelWidth = (level: string) => {
    switch (level) {
      case "Advanced":
        return "w-full"
      case "Intermediate":
        return "w-3/4"
      case "Basic":
        return "w-1/2"
      default:
        return "w-1/4"
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Skills & Technologies</h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base">A comprehensive overview of my technical skills, programming languages, frameworks, and soft skills that drive my development journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="bg-[hsl(var(--card))] p-4 sm:p-6 rounded-lg shadow-md border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 hover:scale-105 animate-on-scroll"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="p-2 bg-[hsl(var(--primary))]/10 rounded-full text-[hsl(var(--primary))]">
                {category.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[hsl(var(--primary))]">{category.category}</h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base">{skill.icon}</span>
                      <span className="text-sm sm:text-base font-medium">{skill.name}</span>
                    </div>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{skill.level}</span>
                  </div>
                  <div className="w-full bg-[hsl(var(--muted))] rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getLevelColor(skill.level)} ${getLevelWidth(
                        skill.level,
                      )} transition-all duration-1000 ease-in-out`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Soft Skills Section */}
      <div className="animate-on-scroll">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-center">Soft Skills</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {softSkills.map((skill, index) => (
            <div
              key={index}
              className="bg-[hsl(var(--card))] p-3 sm:p-4 rounded-lg shadow-md border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 hover:scale-105 text-center group"
            >
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-[hsl(var(--primary))]/10 rounded-full text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                  {typeof skill.icon === "string" ? <span className="text-lg">{skill.icon}</span> : skill.icon}
                </div>
              </div>
              <span className="text-xs sm:text-sm font-medium">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills
