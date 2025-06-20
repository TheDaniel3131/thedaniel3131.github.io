// import { Card, CardContent } from "../components/ui/card"
// import { Badge } from "../components/ui/badge"

// const Technologies = () => {
//   const technologies = [
//     {
//       category: "Frontend",
//       skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Shadcn UI"],
//     },
//     { category: "Backend", skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase"] },
//     { category: "Tools", skills: ["Git", "GitHub", "VS Code", "Figma", "Vercel", "Netlify"] },
//     {
//       category: "Other",
//       skills: ["RESTful APIs", "GraphQL", "Responsive Design", "Accessibility", "Performance Optimization"],
//     },
//   ]

//   const softSkills = [
//     "Communication",
//     "Teamwork",
//     "Problem-solving",
//     "Time Management",
//     "Adaptability",
//     "Creativity",
//     "Critical Thinking",
//     "Attention to Detail",
//     "Leadership",
//     "Emotional Intelligence",
//   ]

//   return (
//     <div className="space-y-8">
//       <div className="space-y-2 text-center">
//         <h2 className="text-3xl font-bold tracking-tight">Technologies & Skills</h2>
//         <p className="text-muted-foreground">Tools and technologies I work with</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {technologies.map((tech) => (
//           <Card key={tech.category} className="border-primary/20">
//             <CardContent className="pt-6">
//               <h3 className="text-xl font-semibold mb-4">{tech.category}</h3>
//               <div className="flex flex-wrap gap-2">
//                 {tech.skills.map((skill) => (
//                   <Badge key={skill} variant="outline" className="px-2 py-1">
//                     {skill}
//                   </Badge>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div>
//         <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
//         <div className="flex flex-wrap gap-2">
//           {softSkills.map((skill) => (
//             <Badge key={skill} variant="secondary" className="px-3 py-1">
//               {skill}
//             </Badge>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 pt-8">
//         {/* Tech logos would go here - using placeholders for now */}
//         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
//           <div key={i} className="flex items-center justify-center p-4 bg-card rounded-lg">
//             <img
//               src={`/placeholder.svg?height=48&width=48&text=Logo${i}`}
//               alt={`Technology ${i}`}
//               className="h-12 w-12 object-contain"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Technologies
