"use client"

import type React from "react"
import { useState, useEffect, useRef, type FormEvent } from "react"
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle, AlertCircle } from "lucide-react"

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [errorMessage, setErrorMessage] = useState("")

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setIsSubmitting(false)
      setSubmitStatus("error")
      setErrorMessage("Please fill in all required fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setIsSubmitting(false)
      setSubmitStatus("error")
      setErrorMessage("Please enter a valid email address")
      return
    }

    try {
      // Using Formspree API - replace with your form ID
      const response = await fetch("https://formspree.io/f/xdkzdqln", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Failed to send message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div className="text-center mb-12 sm:mb-16 animate-on-scroll">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Contact Me</h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base">Please reach out to me with the contact information below</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
        <div className="animate-on-scroll">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Let's connect</h3>

          <p className="text-[hsl(var(--muted-foreground))] mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
            I am interested in full time opportunities, entry-level/junior positions, and collaborative projects as a Software Developer. Whether you
            have a project idea, want to discuss technology, or just want to connect, don't hesitate to reach out!
          </p>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-start gap-3 sm:gap-4 group">
              <div className="bg-[hsl(var(--primary))]/10 p-2 sm:p-3 rounded-full group-hover:bg-[hsl(var(--primary))]/20 transition-colors flex-shrink-0">
                <MapPin className="h-4 w-4 sm:h-6 sm:w-6 text-[hsl(var(--primary))]" />
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base">Location</h4>
                <p className="text-[hsl(var(--muted-foreground))] text-xs sm:text-sm">
                  Bandar Mahkota Cheras, Selangor, Malaysia
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 group">
              <div className="bg-[hsl(var(--primary))]/10 p-2 sm:p-3 rounded-full group-hover:bg-[hsl(var(--primary))]/20 transition-colors flex-shrink-0">
                <Mail className="h-4 w-4 sm:h-6 sm:w-6 text-[hsl(var(--primary))]" />
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base">Email</h4>
                <a
                  href="mailto:danielpohtingfong@gmail.com"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors text-xs sm:text-sm break-all"
                >
                  danielpohtingfong@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 group">
              <div className="bg-[hsl(var(--primary))]/10 p-2 sm:p-3 rounded-full group-hover:bg-[hsl(var(--primary))]/20 transition-colors flex-shrink-0">
                <Phone className="h-4 w-4 sm:h-6 sm:w-6 text-[hsl(var(--primary))]" />
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base">Phone</h4>
                <a
                  href="tel:+60108483602"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors text-xs sm:text-sm"
                >
                  +60 10-848 3602
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 group">
              <div className="bg-[hsl(var(--primary))]/10 p-2 sm:p-3 rounded-full group-hover:bg-[hsl(var(--primary))]/20 transition-colors flex-shrink-0">
                <MessageCircle className="h-4 w-4 sm:h-6 sm:w-6 text-[hsl(var(--primary))]" />
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base">WhatsApp</h4>
                <a
                  href="https://api.whatsapp.com/send/?phone=60108483602&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors text-xs sm:text-sm"
                >
                  +60 10-848 3602
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[hsl(var(--card))] rounded-lg shadow-md border border-[hsl(var(--border))] p-4 sm:p-6 hover:border-[hsl(var(--primary))]/50 transition-colors animate-on-scroll">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Send me a message</h3>

          {submitStatus === "success" ? (
            <div className="flex flex-col items-center justify-center py-8 sm:py-10 text-center">
              <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mb-4" />
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Message Sent!</h4>
              <p className="text-[hsl(var(--muted-foreground))] mb-4 sm:mb-6 text-sm sm:text-base">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSubmitStatus(null)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md font-medium text-sm sm:text-base"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
              {submitStatus === "error" && (
                <div className="p-3 sm:p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-md flex items-start gap-3 text-red-800 dark:text-red-400">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm">{errorMessage}</p>
                </div>
              )}

              <div className="space-y-1 sm:space-y-2">
                <label htmlFor="name" className="text-xs sm:text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] transition-colors text-sm sm:text-base"
                  required
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label htmlFor="email" className="text-xs sm:text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] transition-colors text-sm sm:text-base"
                  required
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label htmlFor="subject" className="text-xs sm:text-sm font-medium">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] transition-colors text-sm sm:text-base"
                  required
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label htmlFor="message" className="text-xs sm:text-sm font-medium">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  placeholder="Your message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] transition-colors resize-none text-sm sm:text-base"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md font-medium flex items-center justify-center gap-2 hover:bg-[hsl(var(--primary))]/90 transition-all duration-300 hover:scale-105 w-full disabled:opacity-70 text-sm sm:text-base"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Contact
