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
  Calendar,
  Trophy,
  Keyboard,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  SiLastdotfm,
  SiLichess,
  SiBehance,
  SiIndiehackers,
  SiOsu,
} from "react-icons/si";

export default function ActualMe() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
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
    { icon: <Twitch className="h-5 w-5" />, label: "Streamer" },
    { icon: <Video className="h-5 w-5" />, label: "Video Editor" },
    { icon: <Palette className="h-5 w-5" />, label: "Graphic Designer" },
    { icon: <Music className="h-5 w-5" />, label: "Music Addict" },
    { icon: <GamepadIcon className="h-5 w-5" />, label: "Gamer" },
    { icon: <SiLichess className="h-5 w-5" />, label: "Chess Player" },
    { icon: <SiOsu className="h-5 w-5" />, label: "osu! Player" },
    { icon: <Keyboard className="h-5 w-5" />, label: "Speed Typist" },
    { icon: <Pen className="h-5 w-5" />, label: "Blogger (Sometimes)" },
  ];

  const funFacts = [
    {
      emoji: "🎮",
      fact: "Games are my life basically. I play a lot of games and I play them casually and competitively, on and off.",
    },
    {
      emoji: "🎬",
      fact: "I used to edit my own videos and care way too much about transitions and colour grading. Now, I am just a farmer.",
    },
    {
      emoji: "♟️",
      fact: "I play chess casually but I will absolutely spend every single analysing games that I play or watch.",
    },
    {
      emoji: "🎨",
      fact: "Graphic design is something I picked up out of necessity and ended up genuinely enjoying as a hobby.",
    },
    {
      emoji: "🌙",
      fact: "Most of my ideas and thoughts come to me the clearest at night. But I am still bad at brainstorming and ideation but I just have a lot of ideas that are not working.",
    },
    {
      emoji: "📺",
      fact: "I run multiple YouTube channels across different topics because one was never going to be enough.",
    },
    {
      emoji: "🎵",
      fact: "Electronic music is my productivity stack. Real mfs will know what I mean. Check my Last.fm if you don't believe me.",
    },
    {
      emoji: "😅",
      fact: "I take on too many things at once and somehow pull them off. Somehow.",
    },
  ];

  const currentlyInto = [
    { label: "Watching", value: "Too many YouTube channels to list" },
    { label: "Playing", value: "Same Old Games" },
    { label: "Chess", value: "Chess is not boring" },
    { label: "Editing", value: "Random and small projects" },
    { label: "Listening", value: "EDM/Future Bass/Drum & Bass/Hip-Hop" },
    { label: "Learning", value: "Always something new, and repetitively" },
  ];

  const links = [
    {
      label: "YouTube",
      description: "Multiple channels, various topics",
      href: "https://www.youtube.com/@MORED3",
      icon: <Youtube className="h-5 w-5" />,
      color: "text-[#FF0000]",
    },
    {
      label: "Twitch",
      description: "Sometimes I stream on Twitch",
      href: "https://www.twitch.tv/daniel3131",
      icon: <Twitch className="h-5 w-5" />,
      color: "text-[#9146FF]",
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
    {
      label: "osu!",
      description: "Rhythm game profile",
      href: "https://osu.ppy.sh/users/11710477",
      icon: <SiOsu className="h-5 w-5" />,
      color: "text-[#FF66AA]",
    },
    {
      label: "TypeRacer",
      description: "Speed typing profile — 308 WPM",
      href: "https://data.typeracer.com/pit/profile?user=daniel3131",
      icon: <Keyboard className="h-5 w-5" />,
      color: "text-[hsl(var(--foreground))]",
    },
    {
      label: "Blog",
      description: "Random thoughts and ideas",
      href: "https://z3phr0us.blogspot.com/",
      icon: <Pen className="h-5 w-5" />,
      color: "text-[hsl(var(--foreground))]",
    },
    {
      label: "Carrd",
      description: "Another corner of the internet",
      href: "https://daniel3131.carrd.co/",
      icon: <ExternalLink className="h-5 w-5" />,
      color: "text-[hsl(var(--foreground))]",
    },
    {
      label: "CTF Player",
      description: "Sometimes I play CTFs and hack stuff for fun",
      href: "https://ctftime.org/team/277613",
      icon: <SiIndiehackers className="h-5 w-5" />,
      color: "text-[hsl(var(--foreground))]",
    },
  ];

  if (!mounted) return null;

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]"
    >
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--background))]/90 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="relative flex h-20 items-center justify-between">
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
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-xs font-medium mb-6">
            <Flame className="h-3 w-3" />
            Looks like you have found my secret page...
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            The <span className="text-[hsl(var(--primary))]">Actual, Real</span>{" "}
            Me
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            There are two sides of me: Software Developer by DAY and Gamer by
            NIGHT. This page is where I share the other side of me, passions,
            hobbies, and the things that make me who I truly am today.
          </p>
        </div>

        {/* My Roles */}
        <div className="mb-16 animate-on-scroll">
          <h2 className="text-xl font-semibold mb-6">My Roles</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
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

        {/* Real About Me */}
        <div className="mb-16 animate-on-scroll">
          <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 sm:p-8 hover:border-[hsl(var(--primary))]/50 transition-colors">
            <h2 className="text-xl font-semibold mb-4">Real About Me</h2>
            <div className="space-y-4 text-[hsl(var(--muted-foreground))] text-sm sm:text-base leading-relaxed">
              <p>
                Outside of work, I am someone who does content, edits videos,
                designs things, plays chess, games way too much, and somehow
                juggles all of it while staying sane (barely).
              </p>
              <p>
                I run multiple YouTube channels across different topics because
                one was never going to be enough. I got into content creation
                because I genuinely enjoy making and recording things for fun —
                not just coding.
              </p>
              <p>
                Graphic design came in because I couldn't stand using templates.
                I wanted things to look exactly how I imagined them. You can
                check out some of that work on my Behance. Chess is a relatively
                recent thing but I'm already way too invested in it.
              </p>
              <p>
                I am quite competitive, curious, and probably have too many
                interests for my own good. But I would not have it any other
                way.
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

        {/* Creative Experience */}
        <div className="mb-16 animate-on-scroll">
          <h2 className="text-xl font-semibold mb-6">Creative Experience</h2>
          <div className="relative ml-8 sm:ml-12">
            <div className="absolute left-0 top-0 bottom-0 transform translate-x-[-50%] w-0.5 bg-[hsl(var(--primary))]"></div>

            {/* YouTuber */}
            <div className="relative pb-8 sm:pb-12 animate-on-scroll">
              <div className="absolute left-0 top-36 sm:top-16 w-8 h-8 transform -translate-x-1/2 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center border-4 border-[hsl(var(--background))]">
                <Youtube className="h-3 w-3 sm:h-4 sm:w-4 text-[hsl(var(--primary-foreground))]" />
              </div>
              <div className="ml-8 sm:ml-16">
                <div className="bg-[hsl(var(--card))] p-4 sm:p-6 rounded-lg shadow-md border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1">
                        YouTuber / Streamer / Content Creator{" "}
                        <span className="text-[hsl(var(--muted-foreground))] text-xs">
                          (Full Time passion)
                        </span>
                      </h3>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm">
                        Self / Multiple Channels
                      </p>
                    </div>
                    <div className="flex items-center text-[hsl(var(--muted-foreground))] text-xs sm:text-sm bg-[hsl(var(--muted))] px-3 py-1 rounded-full sm:whitespace-nowrap">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span>2013 ~ Present</span>
                    </div>
                  </div>
                  <p className="mb-4 text-[hsl(var(--foreground))] text-sm sm:text-base leading-relaxed">
                    Started creating content in 2013 and never stopped. Run
                    multiple YouTube channels across different topics — gaming,
                    lifestyle, and whatever else catches my interest. Also
                    streams occasionally. The editing, thumbnails, scripts, and
                    strategy are all self-managed.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "YouTube",
                      "Twitch",
                      "Video Editing",
                      "Scriptwriting",
                      "Thumbnail Design",
                      "Content Strategy",
                      "Community Management",
                      "Streaming",
                    ].map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 sm:px-3 py-1 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded-full text-xs sm:text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Graphic Designer */}
            <div className="relative pb-8 sm:pb-12 animate-on-scroll">
              <div className="absolute left-0 top-36 sm:top-16 w-8 h-8 transform -translate-x-1/2 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center border-4 border-[hsl(var(--background))]">
                <Palette className="h-3 w-3 sm:h-4 sm:w-4 text-[hsl(var(--primary-foreground))]" />
              </div>
              <div className="ml-8 sm:ml-16">
                <div className="bg-[hsl(var(--card))] p-4 sm:p-6 rounded-lg shadow-md border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 transition-all duration-300 hover:scale-105">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold mb-1">
                        Graphic Designer{" "}
                        <span className="text-[hsl(var(--muted-foreground))] text-xs">
                          (Freelance)
                        </span>
                      </h3>
                      <p className="text-[hsl(var(--muted-foreground))] text-sm">
                        Self / Various Clients
                      </p>
                    </div>
                    <div className="flex items-center text-[hsl(var(--muted-foreground))] text-xs sm:text-sm bg-[hsl(var(--muted))] px-3 py-1 rounded-full sm:whitespace-nowrap">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span>2018 ~ Present</span>
                    </div>
                  </div>
                  <p className="mb-4 text-[hsl(var(--foreground))] text-sm sm:text-base leading-relaxed">
                    Started designing out of necessity — couldn't stand using
                    generic templates. Picked up graphic design to create
                    thumbnails, banners, and branding for my own content, which
                    evolved into freelance work for others. Work spans social
                    media assets, branding, and digital illustrations.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Photoshop",
                      "Illustrator",
                      "Figma",
                      "Canva",
                      "Branding",
                      "Thumbnail Design",
                      "Social Media Assets",
                      "Typography",
                      "Digital Illustration",
                    ].map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 sm:px-3 py-1 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded-full text-xs sm:text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Competitive & Gaming */}
        <div className="mb-16 animate-on-scroll">
          <h2 className="text-xl font-semibold mb-6">Competitive & Gaming</h2>
          <div className="space-y-4">
            {/* osu! */}
            <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 hover:border-[hsl(var(--primary))]/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#FF66AA]/10 rounded-full">
                  <SiOsu className="h-5 w-5 text-[#FF66AA]" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">
                    osu! — Rhythm Game
                  </h3>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Player: Daniel3131
                  </p>
                </div>
                <a
                  href="https://osu.ppy.sh/users/11710477"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">
                Semi-active, casual osu! player. Competed in the 4 Digit Catch
                World Cup (4CWC) 2021 tournament representing Team Malaysia.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "osu!catch",
                  "4CWC 2021",
                  "Tournament Player",
                  "Rhythm Game",
                ].map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="https://osu.ppy.sh/wiki/en/Tournaments/4CWC/2021"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[hsl(var(--primary))] hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Learn more about the tournament
              </a>
            </div>

            {/* TypeRacer */}
            <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl p-6 hover:border-[hsl(var(--primary))]/50 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[hsl(var(--primary))]/10 rounded-full">
                  <Trophy className="h-5 w-5 text-[hsl(var(--primary))]" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">
                    TypeRacer — Speed Typing Record
                  </h3>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    Profile: daniel3131
                  </p>
                </div>
                <a
                  href="https://data.typeracer.com/pit/profile?user=daniel3131"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Record highlight */}
              <div className="bg-[hsl(var(--primary))]/5 border border-[hsl(var(--primary))]/20 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-yellow-500">
                    Malaysian Record
                  </span>
                </div>
                <p className="text-2xl font-bold text-[hsl(var(--primary))]">
                  308.036 WPM
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                  2nd Highest Speed Typing WPM in Malaysia — one of only two
                  Malaysian records. Recorded & verified by TypeRacer moderator
                  team on October 31, 2020.
                </p>
              </div>

              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">
                Achieved 308 WPM on TypeRacer — a verified competitive typing
                platform. This places the record among the top typing speeds
                ever recorded by a Malaysian user on the platform, verified
                officially by the TypeRacer moderator team.
              </p>

              <a
                href="https://www.youtube.com/watch?v=_a3Wd7K3rVE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[hsl(var(--primary))] hover:underline"
              >
                <Youtube className="h-4 w-4" />
                Watch the record run on YouTube
              </a>
            </div>
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
            <span>If you made it here, you are definitely a smart ass.</span>
            <span>🤝</span>
          </div>
          <p className="mt-4 text-xs text-[hsl(var(--muted-foreground))]">
            This page does not exist officially. If you manage to find it,
            respect.
          </p>
        </div>
      </main>
    </div>
  );
}
