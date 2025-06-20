import { Github, Linkedin, Mail, MessageCircle } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--background))] border-t border-[hsl(var(--border))] py-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-2xl font-bold flex items-center">
              <span className="text-[hsl(var(--primary))]">DPTF</span>
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6 mb-6">
              <a
                href="https://github.com/danielpohtingfong"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
              >
                <Github className="h-7 w-7" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/danielpohtingfong"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
              >
                <Linkedin className="h-7 w-7" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="mailto:danielpohtingfong@gmail.com"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
              >
                <Mail className="h-7 w-7" />
                <span className="sr-only">Email</span>
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=60108483602&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
              >
                <MessageCircle className="h-7 w-7" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>

            <p className="text-[hsl(var(--muted-foreground))] text-lg flex items-center">
              Created by Daniel Poh Ting Fong
            </p>

            <p className="text-[hsl(var(--muted-foreground))] text-base mt-2">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
