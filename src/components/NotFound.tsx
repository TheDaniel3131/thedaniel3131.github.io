"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Codesandbox, Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export default function NotFound() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--background))]/90 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors text-base font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </Link>

            <a
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
            >
              <Codesandbox className="h-6 w-6 text-[hsl(var(--primary))]" />
              <span className="text-[hsl(var(--primary))] font-bold text-2xl">
                DPTF
              </span>
            </a>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-lg mx-auto">
          {/* 404 number */}
          <h1 className="text-[8rem] sm:text-[10rem] font-bold leading-none text-[hsl(var(--primary))]/10 select-none mb-0">
            404
          </h1>

          <div className="-mt-6 sm:-mt-8 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Page not found
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
              Double-check the URL or head back to the homepage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md font-medium flex items-center justify-center gap-2 hover:bg-[hsl(var(--primary))]/90 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <a
              href="mailto:danielpohtingfong@gmail.com"
              className="px-6 py-3 bg-transparent border border-[hsl(var(--border))] rounded-md font-medium hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-colors text-sm sm:text-base"
            >
              Contact Me
            </a>
          </div>
        </div>
      </main>

      {/* Footer line */}
      <footer className="py-6 text-center text-xs text-[hsl(var(--muted-foreground))] border-t border-[hsl(var(--border))]">
        © {new Date().getFullYear()} Daniel Poh Ting Fong. All Rights Reserved.
      </footer>
    </div>
  );
}
