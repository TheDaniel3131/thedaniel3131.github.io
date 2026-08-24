"use client";

import { useEffect, useRef, useState } from "react";
import {
  Code,
  Database,
  Wrench,
  Lightbulb,
  // Clapperboard,
  AlertTriangle,
  Cloud,
  Server,
  Zap,
  // Palette,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPhp,
  SiCplusplus,
  SiR,
  SiGo,
  SiReact,
  SiNextdotjs,
  SiThreedotjs,
  SiTailwindcss,
  SiBootstrap,
  SiDotnet,
  SiJquery,
  SiVuedotjs,
  SiLaravel,
  SiExpress,
  SiCodeigniter,
  SiSpringboot,
  SiNestjs,
  SiFlask,
  SiDjango,
  SiPinia,
  SiJsonwebtokens,
  SiGit,
  SiDevbox, // SiVscode not exist
  SiMysql,
  SiPostgresql,
  SiPrisma,
  SiStrapi,
  SiFigma,
  SiSupabase,
  SiPostman,
  SiMongodb,
  SiSentry,
  SiApachekafka,
  SiDocker,
  SiGrafana,
  SiPrometheus,
  SiNpm,
  SiPnpm,
  SiYarn,
  SiBun,
  SiRedis,
  SiCloudflare,
  SiReplit,
  SiKaggle,
  SiOpenapiinitiative,
  SiSwagger,
  SiAxios,
  SiApacheecharts,
} from "react-icons/si";
import { FaJava, FaDAndD, FaLock } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";

// NOTE: A handful of icons below (SweetAlert2, CapCut, Sony Vegas) don't have
// reliable brand icons in react-icons/si, so lucide-react generic icons are
// used as stand-ins. Double check that every "Si*" import above actually
// exists in your installed react-icons version — a few of the newer/more
// obscure brand icons (e.g. SiApacheecharts, SiSweetalert) get renamed or
// added between versions, so if the build fails on an import, swap that one
// icon for a lucide-react equivalent.

// Fixed number of skill rows shown per card, per "page".
// Change this one number to make every card taller/shorter uniformly.
const ITEMS_PER_PAGE = 8;

export default function SkillsTechnologies() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      category: "Programming Languages",
      icon: <Code className="h-4 w-4 sm:h-5 sm:w-5" />,
      skills: [
        {
          name: "HTML",
          level: "Advanced",
          icon: <SiHtml5 className="text-[#E34F26]" />,
        },
        {
          name: "CSS",
          level: "Advanced",
          icon: <SiCss className="text-[#1572B6]" />,
        },
        {
          name: "JavaScript",
          level: "Intermediate",
          icon: <SiJavascript className="text-[#F7DF1E]" />,
        },
        {
          name: "TypeScript",
          level: "Intermediate",
          icon: <SiTypescript className="text-[#3178C6]" />,
        },
        {
          name: "Python",
          level: "Intermediate",
          icon: <SiPython className="text-[#3776AB]" />,
        },
        {
          name: "Java",
          level: "Intermediate",
          icon: <FaJava className="text-[#ED8B00]" />,
        },
        {
          name: "PHP",
          level: "Basic",
          icon: <SiPhp className="text-[#777BB4]" />,
        },
        {
          name: "C#",
          level: "Basic",
          icon: <SiDotnet className="text-[#512BD4]" />,
        },
        {
          name: "C++",
          level: "Basic",
          icon: <SiCplusplus className="text-[#00599C]" />,
        },
        { name: "R", level: "Basic", icon: <SiR className="text-[#276DC3]" /> },
        {
          name: "Go",
          level: "Basic",
          icon: <SiGo className="text-[#00ADD8]" />,
        },
      ],
    },
    {
      category: "Frameworks & Libraries",
      icon: <Database className="h-4 w-4 sm:h-5 sm:w-5" />,
      skills: [
        {
          name: "React",
          level: "Intermediate",
          icon: <SiReact className="text-[#61DAFB]" />,
        },
        {
          name: "Next.js",
          level: "Intermediate",
          icon: <SiNextdotjs className="text-[hsl(var(--foreground))]" />,
        },
        {
          name: "Tailwind CSS",
          level: "Intermediate",
          icon: <SiTailwindcss className="text-[#06B6D4]" />,
        },
        {
          name: "Bootstrap",
          level: "Intermediate",
          icon: <SiBootstrap className="text-[#7952B3]" />,
        },
        {
          name: "ASP.NET",
          level: "Intermediate",
          icon: <SiDotnet className="text-[#512BD4]" />,
        },
        {
          name: "Pinia",
          level: "Intermediate",
          icon: <SiPinia className="text-[#FFD859]" />,
        },
        {
          name: "SweetAlert2",
          level: "Intermediate",
          icon: <AlertTriangle className="text-[#FF7674]" />,
        },
        {
          name: "JWT",
          level: "Intermediate",
          icon: <SiJsonwebtokens className="text-[#000000] dark:text-white" />,
        },
        {
          name: "jQuery",
          level: "Basic",
          icon: <SiJquery className="text-[#0769AD]" />,
        },
        {
          name: "AJAX",
          level: "Basic",
          icon: <SiJavascript className="text-[#F7DF1E]" />,
        },
        {
          name: "Vue.js",
          level: "Basic",
          icon: <SiVuedotjs className="text-[#4FC08D]" />,
        },
        {
          name: "Laravel",
          level: "Basic",
          icon: <SiLaravel className="text-[#FF2D20]" />,
        },
        {
          name: "Express.js",
          level: "Basic",
          icon: <SiExpress className="text-[hsl(var(--foreground))]" />,
        },
        {
          name: "CodeIgniter",
          level: "Basic",
          icon: <SiCodeigniter className="text-[#EF4223]" />,
        },
        {
          name: "Three.js",
          level: "Basic",
          icon: <SiThreedotjs className="text-[hsl(var(--foreground))]" />,
        },
        {
          name: "Playwright",
          level: "Basic",
          icon: <Wrench className="text-[#2EAD33]" />,
        },
        {
          name: "Spring Boot",
          level: "Basic",
          icon: <SiSpringboot className="text-[#6DB33F]" />,
        },
        {
          name: "NestJS",
          level: "Basic",
          icon: <SiNestjs className="text-[#E0234E]" />,
        },
        {
          name: "Flask",
          level: "Basic",
          icon: <SiFlask className="text-[hsl(var(--foreground))]" />,
        },
        {
          name: "Django",
          level: "Basic",
          icon: <SiDjango className="text-[#092E20]" />,
        },
      ],
    },
    {
      category: "Databases & Tools",
      icon: <Wrench className="h-4 w-4 sm:h-5 sm:w-5" />,
      skills: [
        {
          name: "Git",
          level: "Advanced",
          icon: <SiGit className="text-[#F05032]" />,
        },
        {
          name: "VS Code",
          level: "Advanced",
          icon: <SiDevbox className="text-[#007ACC]" />,
        },
        {
          name: "MySQL",
          level: "Intermediate",
          icon: <SiMysql className="text-[#4479A1]" />,
        },
        {
          name: "PostgreSQL",
          level: "Intermediate",
          icon: <SiPostgresql className="text-[#4169E1]" />,
        },
        {
          name: "Strapi",
          level: "Intermediate",
          icon: <SiStrapi className="text-[#2F2E8C]" />,
        },
        {
          name: "Figma",
          level: "Intermediate",
          icon: <SiFigma className="text-[#F24E1E]" />,
        },
        {
          name: "Supabase",
          level: "Intermediate",
          icon: <SiSupabase className="text-[#3ECF8E]" />,
        },
        {
          name: "Postman",
          level: "Basic",
          icon: <SiPostman className="text-[#FF6C37]" />,
        },
        {
          name: "DBeaver",
          level: "Basic",
          icon: <FaDAndD className="text-[hsl(var(--muted-foreground))]" />,
        },
        {
          name: "MongoDB",
          level: "Basic",
          icon: <SiMongodb className="text-[#47A248]" />,
        },
        {
          name: "Redis",
          level: "Basic",
          icon: <SiRedis className="text-[#DC382D]" />,
        },
        {
          name: "Sentry",
          level: "Basic",
          icon: <SiSentry className="text-[#362D59]" />,
        },
        {
          name: "Kafka",
          level: "Basic",
          icon: <SiApachekafka className="text-[#231F20] dark:text-white" />,
        },
        {
          name: "Docker",
          level: "Basic",
          icon: <SiDocker className="text-[#2496ED]" />,
        },
        {
          name: "Grafana",
          level: "Basic",
          icon: <SiGrafana className="text-[#F46800]" />,
        },
        {
          name: "Prometheus",
          level: "Basic",
          icon: <SiPrometheus className="text-[#E6522C]" />,
        },
        {
          name: "npm",
          level: "Basic",
          icon: <SiNpm className="text-[#CB3837]" />,
        },
        {
          name: "pnpm",
          level: "Basic",
          icon: <SiPnpm className="text-[#F69220]" />,
        },
        {
          name: "yarn",
          level: "Basic",
          icon: <SiYarn className="text-[#2C8EBB]" />,
        },
        {
          name: "Bun",
          level: "Basic",
          icon: <SiBun className="text-[#FBF0DF] dark:text-[#F9F1E1]" />,
        },
        {
          name: "AWS",
          level: "Basic",
          icon: <Cloud className="text-[#FF9900]" />,
        },
        {
          name: "AWS EC2",
          level: "Basic",
          icon: <Server className="text-[#FF9900]" />,
        },
        {
          name: "AWS Lambda",
          level: "Basic",
          icon: <Zap className="text-[#FF9900]" />,
        },
        {
          name: "AWS S3",
          level: "Basic",
          icon: <Cloud className="text-[#569A31]" />,
        },
        {
          name: "AWS RDS",
          level: "Basic",
          icon: <Database className="text-[#FF9900]" />,
        },
        {
          name: "AWS CloudFront",
          level: "Basic",
          icon: <Cloud className="text-[#FF9900]" />,
        },
        {
          name: "AWS CloudWatch",
          level: "Basic",
          icon: <Cloud className="text-[#FF9900]" />,
        },
        {
          name: "AWS DynamoDB",
          level: "Basic",
          icon: <Database className="text-[#4053D6]" />,
        },
        {
          name: "AWS API Gateway",
          level: "Basic",
          icon: <Cloud className="text-[#FF9900]" />,
        },
        {
          name: "AWS CloudFormation",
          level: "Basic",
          icon: <Cloud className="text-[#FF9900]" />,
        },
        {
          name: "AWS CloudTrail",
          level: "Basic",
          icon: <Cloud className="text-[#FF9900]" />,
        },
        {
          name: "Cloudflare",
          level: "Basic",
          icon: <SiCloudflare className="text-[#F38020]" />,
        },
        {
          name: "Replit",
          level: "Basic",
          icon: <SiReplit className="text-[#F26207]" />,
        },
        {
          name: "Kaggle",
          level: "Basic",
          icon: <SiKaggle className="text-[#20BEFF]" />,
        },
        {
          name: "Confluence",
          level: "Basic",
          icon: <Lightbulb className="text-[hsl(var(--muted-foreground))]" />,
        },
        {
          name: "Jira",
          level: "Basic",
          icon: <Lightbulb className="text-[hsl(var(--muted-foreground))]" />,
        },
        {
          name: "Lark",
          level: "Basic",
          icon: <Lightbulb className="text-[hsl(var(--muted-foreground))]" />,
        },
        {
          name: "Trello",
          level: "Basic",
          icon: <Lightbulb className="text-[hsl(var(--muted-foreground))]" />,
        },
        {
          name: "OpenAPI",
          level: "Basic",
          icon: <SiOpenapiinitiative className="text-[#6BA539]" />,
        },
        {
          name: "Swagger",
          level: "Basic",
          icon: <SiSwagger className="text-[#85EA2D]" />,
        },
        {
          name: "Curl",
          level: "Basic",
          icon: (
            <AlertTriangle className="text-[hsl(var(--muted-foreground))]" />
          ),
        },
        {
          name: "Prisma",
          level: "Basic",
          icon: <SiPrisma className="text-[#0C344B]" />,
        },
        {
          name: "TypeORM",
          level: "Basic",
          icon: <SiTypescript className="text-[#3178C6]" />,
        },
      ],
    },
    {
      category: "Others",
      icon: <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5" />,
      skills: [
        {
          name: "Version Control",
          level: "Advanced",
          icon: <SiGit className="text-[#F05032]" />,
        },
        {
          name: "Web Development",
          level: "Advanced",
          icon: <SiHtml5 className="text-[#E34F26]" />,
        },
        {
          name: "Responsive Design",
          level: "Intermediate",
          icon: <SiCss className="text-[#1572B6]" />,
        },
        {
          name: "UI/UX Design",
          level: "Intermediate",
          icon: <SiFigma className="text-[#F24E1E]" />,
        },
        {
          name: "API Development",
          level: "Intermediate",
          icon: <SiPostman className="text-[#FF6C37]" />,
        },
        {
          name: "RESTful APIs",
          level: "Intermediate",
          icon: <SiSwagger className="text-[#85EA2D]" />,
        },
        {
          name: "Axios",
          level: "Intermediate",
          icon: <SiAxios className="text-[#5A29E4]" />,
        },
        {
          name: "ECharts",
          level: "Intermediate",
          icon: <SiApacheecharts className="text-[#AA344D]" />,
        },
        {
          name: "Password Hashing",
          level: "Basic",
          icon: <FaLock className="text-[hsl(var(--muted-foreground))]" />,
        },
        {
          name: "Testing & Debugging",
          level: "Intermediate",
          icon: <SiDevbox className="text-[#007ACC]" />,
        },
        {
          name: "Agile Methodology",
          level: "Intermediate",
          icon: <SiGit className="text-[#F05032]" />,
        },
        {
          name: "Cloud Computing",
          level: "Basic",
          icon: <VscAzure className="text-[#0078D4]" />,
        },
        {
          name: "CI/CD",
          level: "Basic",
          icon: <SiGit className="text-[#F05032]" />,
        },
      ],
    },
    // {
    //   category: "Editing Skills",
    //   icon: <Clapperboard className="h-4 w-4 sm:h-5 sm:w-5" />,
    //   skills: [
    //     {
    //       name: "Premiere Pro",
    //       level: "Advanced",
    //       icon: <Clapperboard className="text-[#9999FF]" />,
    //     },
    //     {
    //       name: "Photoshop",
    //       level: "Advanced",
    //       icon: <Palette className="text-[#31A8FF]" />,
    //     },
    //     {
    //       name: "DaVinci Resolve",
    //       level: "Intermediate",
    //       icon: <Clapperboard className="text-[#233A51]" />,
    //     },
    //     {
    //       name: "CapCut",
    //       level: "Intermediate",
    //       icon: <Clapperboard className="text-[hsl(var(--foreground))]" />,
    //     },
    //     {
    //       name: "Sony Vegas",
    //       level: "Basic",
    //       icon: (
    //         <Clapperboard className="text-[hsl(var(--muted-foreground))]" />
    //       ),
    //     },
    //   ],
    // },
  ];

  // One "current page" index per category card.
  const [pageByCategory, setPageByCategory] = useState<number[]>(() =>
    skillCategories.map(() => 0),
  );

  const goToPage = (
    categoryIndex: number,
    direction: -1 | 1,
    totalPages: number,
  ) => {
    setPageByCategory((prev) => {
      const next = [...prev];
      const current = next[categoryIndex];
      const newPage = Math.min(
        Math.max(current + direction, 0),
        totalPages - 1,
      );
      next[categoryIndex] = newPage;
      return next;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const softSkills = [
    { name: "Communication", icon: "💬" },
    { name: "Teamwork", icon: "🎯" },
    { name: "Problem Solving", icon: "🤔" },
    { name: "Time Management", icon: "⏰" },
    { name: "Adaptability", icon: "🔄" },
    { name: "Creativity", icon: "💡" },
    { name: "Critical Thinking", icon: "🧠" },
    { name: "Attention to Detail", icon: "🔍" },
    { name: "Leadership", icon: "👑" },
    { name: "Emotional Intelligence", icon: "🩵" },
    { name: "Self-Learning", icon: "📚" },
    { name: "Analytical Thinking", icon: "📈" },
  ];

  // AI tools used day-to-day. Kept emoji-based (like Soft Skills) so there's
  // no dependency on a brand icon existing in react-icons for every one of
  // these — safer than assuming e.g. SiClaude/SiQwen/SiDeepseek are present
  // in your installed react-icons version.
  const aiTools = [
    { name: "ChatGPT", icon: "🤖" },
    { name: "Claude", icon: "🧠" },
    { name: "Gemini", icon: "✨" },
    { name: "Qwen", icon: "🌐" },
    { name: "Composer (Cursor)", icon: "🖱️" },
    { name: "DeepSeek", icon: "🔍" },
    { name: "GitHub Copilot", icon: "🧑‍💻" },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-green-500";
      case "Intermediate":
        return "bg-blue-500";
      case "Basic":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case "Advanced":
        return "w-full";
      case "Intermediate":
        return "w-3/4";
      case "Basic":
        return "w-1/2";
      default:
        return "w-1/4";
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          Skills & Technologies
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base">
          A comprehensive overview of my technical skills, programming
          languages, frameworks, and soft skills that drive my development
          journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {skillCategories.map((category, index) => {
          const totalPages = Math.ceil(category.skills.length / ITEMS_PER_PAGE);
          const currentPage = pageByCategory[index] ?? 0;
          const start = currentPage * ITEMS_PER_PAGE;
          const visibleSkills = category.skills.slice(
            start,
            start + ITEMS_PER_PAGE,
          );
          const isFirstPage = currentPage === 0;
          const isLastPage = currentPage >= totalPages - 1;

          return (
            <div
              key={index}
              className="bg-[hsl(var(--card))] p-4 sm:p-6 rounded-lg shadow-md border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 hover:scale-105 animate-on-scroll flex flex-col"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[hsl(var(--primary))]/10 rounded-full text-[hsl(var(--primary))]">
                    {category.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[hsl(var(--primary))]">
                    {category.category}
                  </h3>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => goToPage(index, -1, totalPages)}
                      disabled={isFirstPage}
                      aria-label={`Previous ${category.category} skills`}
                      className="p-1 rounded-full border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))]/50 disabled:opacity-30 disabled:hover:text-[hsl(var(--muted-foreground))] disabled:hover:border-[hsl(var(--border))] transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-xs text-[hsl(var(--muted-foreground))] w-10 text-center">
                      {currentPage + 1}/{totalPages}
                    </span>
                    <button
                      type="button"
                      onClick={() => goToPage(index, 1, totalPages)}
                      disabled={isLastPage}
                      aria-label={`Next ${category.category} skills`}
                      className="p-1 rounded-full border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))]/50 disabled:opacity-30 disabled:hover:text-[hsl(var(--muted-foreground))] disabled:hover:border-[hsl(var(--border))] transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-3 sm:space-y-4 flex-1">
                {visibleSkills.map((skill, skillIndex) => (
                  <div key={start + skillIndex}>
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg sm:text-xl">{skill.icon}</span>
                        <span className="text-sm sm:text-base font-medium">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-[hsl(var(--muted))] rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getLevelColor(skill.level)} ${getLevelWidth(skill.level)} transition-all duration-1000 ease-in-out`}
                      ></div>
                    </div>
                  </div>
                ))}
                {/* Keeps card height consistent when a page has fewer than ITEMS_PER_PAGE skills */}
                {Array.from({
                  length: ITEMS_PER_PAGE - visibleSkills.length,
                }).map((_, i) => (
                  <div
                    key={`spacer-${i}`}
                    className="h-[38px] sm:h-[42px]"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Soft Skills Section */}
      <div className="animate-on-scroll mb-12 sm:mb-16">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-center">
          Soft Skills
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {softSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-[hsl(var(--card))] p-3 sm:p-4 rounded-lg shadow-md border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 hover:scale-105 text-center group"
            >
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-[hsl(var(--primary))]/10 rounded-full text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                  <span className="text-lg">{skill.icon}</span>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-medium text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Tools Section */}
      <div className="animate-on-scroll">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-center">
          AI Tools I Use
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {aiTools.map((tool, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-[hsl(var(--card))] p-3 sm:p-4 rounded-lg shadow-md border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 hover:scale-105 text-center group"
            >
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-[hsl(var(--primary))]/10 rounded-full text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                  <span className="text-lg">{tool.icon}</span>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-medium text-center">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
