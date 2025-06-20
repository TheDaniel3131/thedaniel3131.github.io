// "use client"

// import { useState } from "react"
// import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

// const Testimonials = () => {
//   const testimonials = [
//     {
//       name: "John Doe",
//       position: "CTO at Tech Company",
//       image: "/placeholder.svg?height=100&width=100&text=John",
//       text: "Working with this developer was an absolute pleasure. Their technical skills are top-notch, and they consistently delivered high-quality code on time. They were proactive in suggesting improvements and solving complex problems.",
//     },
//     {
//       name: "Jane Smith",
//       position: "Product Manager",
//       image: "/placeholder.svg?height=100&width=100&text=Jane",
//       text: "An exceptional developer who brings both technical expertise and creative problem-solving to the table. They quickly understood our business needs and translated them into elegant technical solutions. I would hire them again in a heartbeat.",
//     },
//     {
//       name: "Alex Johnson",
//       position: "Startup Founder",
//       image: "/placeholder.svg?height=100&width=100&text=Alex",
//       text: "This developer transformed our idea into a fully functional product that exceeded our expectations. Their attention to detail, commitment to quality, and ability to work independently made them an invaluable asset to our project.",
//     },
//   ]

//   const [currentIndex, setCurrentIndex] = useState(0)

//   const nextTestimonial = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
//   }

//   const prevTestimonial = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
//   }

//   return (
//     <div className="container mx-auto px-4">
//       <div className="text-center mb-16">
//         <h2 className="text-3xl font-bold mb-2">Testimonials</h2>
//         <p className="text-[hsl(var(--muted-foreground))]">What others say about my work</p>
//       </div>

//       <div className="max-w-4xl mx-auto">
//         <div className="relative">
//           <div className="bg-[hsl(var(--card))] rounded-lg shadow-md border border-[hsl(var(--border))] p-8 md:p-12">
//             <div className="absolute top-8 left-8 text-[hsl(var(--primary))] opacity-20">
//               <Quote className="h-16 w-16" />
//             </div>

//             <div className="relative z-10">
//               <p className="text-lg mb-8 text-[hsl(var(--foreground))]">{testimonials[currentIndex].text}</p>

//               <div className="flex items-center">
//                 <div className="mr-4">
//                   <img
//                     src={testimonials[currentIndex].image || "/placeholder.svg"}
//                     alt={testimonials[currentIndex].name}
//                     className="w-16 h-16 rounded-full object-cover"
//                   />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
//                   <p className="text-sm text-[hsl(var(--muted-foreground))]">{testimonials[currentIndex].position}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-center mt-8 gap-4">
//             <button
//               onClick={prevTestimonial}
//               className="p-2 rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors"
//               aria-label="Previous testimonial"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>

//             <div className="flex gap-2">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentIndex(index)}
//                   className={`w-3 h-3 rounded-full transition-colors ${
//                     index === currentIndex ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--muted))]"
//                   }`}
//                   aria-label={`Go to testimonial ${index + 1}`}
//                 />
//               ))}
//             </div>

//             <button
//               onClick={nextTestimonial}
//               className="p-2 rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors"
//               aria-label="Next testimonial"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Testimonials
