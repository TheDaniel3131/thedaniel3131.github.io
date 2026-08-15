"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./theme-provider";
import {
  Youtube,
  Twitch,
  Pen,
  Palette,
  Video,
  Music,
  GamepadIcon,
  Flame,
  Sun,
  Moon,
  Codesandbox,
  ArrowLeft,
  Laugh,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SiLastdotfm, SiLichess, SiBehance } from "react-icons/si";

export default function ActualMe() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Prevent browser from restoring previous scroll position on refresh
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setMounted(true);
  }, []);

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
  }, [mounted]);

  const vibes = [
    { icon: <Youtube className="h-5 w-5" />, label: "Content Creator" },
    { icon: <Twitch className="h-5 w-5" />, label: "Streamer (sometimes)" },
    { icon: <Video className="h-5 w-5" />, label: "Video Editor" },
    { icon: <Palette className="h-5 w-5" />, label: "Graphic Designer" },
    { icon: <Music className="h-5 w-5" />, label: "Music Enjoyer" },
    { icon: <GamepadIcon className="h-5 w-5" />, label: "Gamer" },
    { icon: <SiLichess className="h-5 w-5" />, label: "Chess Player" },
    { icon: <Pen className="h-5 w-5" />, label: "Occasional Blogger" },
  ];

  const funFacts = [
    {
      emoji: "🎮",
      fact: "Games are basically interactive movies to me — the story matters more than the score.",
    },
    {
      emoji: "🎬",
      fact: "I edit my own videos and care way too much about transitions and colour grading.",
    },
    {
      emoji: "♟️",
      fact: "I play chess casually but I will absolutely spend 30 minutes analysing why I lost a game.",
    },
    {
      emoji: "🎨",
      fact: "Graphic design is something I picked up out of necessity and ended up genuinely enjoying.",
    },
    {
      emoji: "🌙",
      fact: "Most of my best ideas and work happen after midnight. I am not a morning person.",
    },
    {
      emoji: "📺",
      fact: "I run multiple YouTube channels across different topics because one was never going to be enough.",
    },
    {
      emoji: "🎵",
      fact: "Lo-fi, city pop, and OSTs are my productivity stack. Check my Last.fm if you don't believe me.",
    },
    {
      emoji: "😅",
      fact: "I take on too many things at once and somehow pull them off. Somehow.",
    },
  ];

  const currentlyInto = [
    { label: "Watching", value: "Too many YouTube channels to list" },
    { label: "Playing", value: "Whatever is trending or on sale" },
    { label: "Chess", value: "Losing games and learning from it" },
    { label: "Editing", value: "Random passion projects" },
    { label: "Listening", value: "Lo-fi / City Pop / Game OSTs" },
    { label: "Learning", value: "Always something new, always" },
  ];

  const links = [
    {
      label: "YouTube",
      description: "Multiple channels, various topics",
      href: "https://www.youtube.com/@TheDaniel3131",
      icon: <Youtube className="h-5 w-5" />,
      color: "text-[#FF0000]",
    },
    {
      label: "Last.fm",
      description: "What I've been listening to",
      href: "https://www.last.fm/user/TheDaniel3131",
      icon: <SiLastdotfm className="h-5 w-5" />,
      color: "text-[#D51007]",
    },
    {
      label: "Behance",
      description: "Graphic design work",
      href: "https://be.net/Daniel3131",
      icon: <SiBehance className="h-5 w-5" />,
      color: "text-[#1769FF]",
    },
    {
      label: "Lichess",
      description: "Chess profile — come challenge me",
      href: "https://lichess.org/@/Daniel3131",
      icon: <SiLichess className="h-5 w-5" />,
      color: "text-[hsl(var(--foreground))]",
    },
  ];

  if (!mounted) return null;

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
    >
      {/* Navbar — same size as main Navbar */}
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

      <main className="pt-24 pb-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-xs font-medium mb-6">
            <Flame className="h-3 w-3" />
            you found the secret page
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            The <span className="text-[hsl(var(--primary))]">actual</span> me
          </h1>

          <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Hey — so you actually found this. This isn't the polished portfolio
            version of me. This is just... me. Daniel. Software engineer by day,
            chaotic creative by night.
          </p>
        </div>

        {/* What I actually am */}
        <div className="mb-16 animate-on-scroll">
          <div className="flex items-center gap-2 mb-6">
            <Laugh className="h-5 w-5 text-[hsl(var(--primary))]" />
            <h2 className="text-xl font-semibold">What I actually am</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {vibes.map((vibe, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 p-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl hover:border-[hsl(var(--primary))]/50 hover:scale-105 transition-all duration-300 text-center"
              >
                <div className="p-2 bg-[hsl(var(--primary))]/10 rounded-full text-[hsl(var(--primary))]">
                  {vibe.icon}
                </div>
                <span className="text-xs sm:text-sm font-medium">
                  {vibe.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* The real intro */}
        <div className="mb-16 animate-on-scroll">
          <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 sm:p-8 hover:border-[hsl(var(--primary))]/50 transition-colors">
            <h2 className="text-xl font-semibold mb-4">
              So who actually is Daniel? 👀
            </h2>
            <div className="space-y-4 text-[hsl(var(--muted-foreground))] text-sm sm:text-base leading-relaxed">
              <p>
                Yeah I build software. But outside of that, I'm someone who
                creates content, edits videos, designs things, plays chess,
                games way too much, and somehow juggles all of it while staying
                sane (barely).
              </p>
              <p>
                I run multiple YouTube channels across different topics because
                one was never going to be enough. I got into content creation
                because I genuinely enjoy making things that people actually
                watch and feel something from — not just code that runs behind
                the scenes.
              </p>
              <p>
                Graphic design came in because I couldn't stand using templates.
                I wanted things to look exactly how I imagined them. You can
                check out some of that work on my Behance. Chess is a relatively
                recent thing but I'm already way too invested in it.
              </p>
              <p>
                I'm competitive, curious, and probably have too many interests
                for my own good. But I wouldn't have it any other way.
              </p>
            </div>
          </div>
        </div>

        {/* Find me elsewhere */}
        <div className="mb-16 animate-on-scroll">
          <h2 className="text-xl font-semibold mb-6">Find me elsewhere</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl hover:border-[hsl(var(--primary))]/50 hover:scale-105 transition-all duration-300"
              >
                <div
                  className={`p-2 bg-[hsl(var(--primary))]/10 rounded-full ${link.color}`}
                >
                  {link.icon}
                </div>
                <div>
                  <p className="font-medium text-sm">{link.label}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    {link.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Fun facts */}
        <div className="mb-16 animate-on-scroll">
          <h2 className="text-xl font-semibold mb-6">Fun facts about me</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {funFacts.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl hover:border-[hsl(var(--primary))]/50 hover:scale-105 transition-all duration-300"
              >
                <span className="text-xl flex-shrink-0">{item.emoji}</span>
                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {item.fact}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Currently into */}
        <div className="mb-16 animate-on-scroll">
          <h2 className="text-xl font-semibold mb-6">Currently into</h2>
          <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl overflow-hidden hover:border-[hsl(var(--primary))]/50 transition-colors">
            {currentlyInto.map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-6 py-4 text-sm ${
                  i !== currentlyInto.length - 1
                    ? "border-b border-[hsl(var(--border))]"
                    : ""
                }`}
              >
                <span className="text-[hsl(var(--muted-foreground))] font-medium w-28">
                  {item.label}
                </span>
                <span className="text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] text-xs">
            <span>if you made it here, you're probably cool</span>
            <span>🤝</span>
          </div>
          <p className="mt-4 text-xs text-[hsl(var(--muted-foreground))]">
            this page doesn't exist officially. you found it though. respect.
          </p>
        </div>
      </main>
    </div>
  );
}
