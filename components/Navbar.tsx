/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface NavbarProps {
  theme: string;
  setTheme: (theme: string) => void;
  activePage?: string;
}

export function Navbar({ theme, setTheme, activePage = "home" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation Links - "Features" removed as requested
  const navLinks = [
    { label: "Services", href: "/#services" },
    { label: "Careers", href: "/careers", key: "careers" },
    { label: "Courses", href: "/#courses" },
    { label: "Contact", href: "/#contact" },
  ];

  // Hamburger lines wing-flap hover variant
  const line1Variants = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: 45, y: 6 },
    hovered: { y: [0, -3, 0], transition: { repeat: Infinity, duration: 0.4, ease: "easeInOut" } }
  };

  const line2Variants = {
    closed: { opacity: 1, scale: 1 },
    opened: { opacity: 0, scale: 0 },
    hovered: { scaleX: [1, 0.7, 1], transition: { repeat: Infinity, duration: 0.4, ease: "easeInOut" } }
  };

  const line3Variants = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: -45, y: -6 },
    hovered: { y: [0, 3, 0], transition: { repeat: Infinity, duration: 0.4, ease: "easeInOut" } }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className={`fixed top-4 left-0 right-0 z-50 w-[95%] max-w-7xl mx-auto border rounded-2xl backdrop-blur-xl transition-all duration-500 ${
          scrolled 
            ? theme === "dark" 
              ? "border-white/10 bg-[#020305]/85 shadow-[0_10px_40px_rgba(168,85,247,0.12)]" 
              : "border-black/5 bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
            : theme === "dark"
              ? "border-white/5 bg-white/[0.02]"
              : "border-black/5 bg-white/70 shadow-sm"
        }`}
      >
        <div className="px-5 py-3 flex items-center justify-between gap-4">
          
          {/* SVG Brand Logo - Recreated EXACTLY like the attached graphic */}
          <Link href="/" className="flex items-center gap-3 group select-none flex-shrink-0">
            <div className="relative w-9 h-9 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logo-g-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="50%" stopColor="#0080FF" />
                    <stop offset="100%" stopColor="#9D00FF" />
                  </linearGradient>
                  <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* Glow effect on hover */}
                <motion.path
                  d="M 76 36 C 70 24 57 16 42 18 C 24 20 12 36 12 55 C 12 74 25 88 44 88 C 61 88 74 76 78 60 C 79 56 76 52 72 52 L 48 52"
                  stroke="url(#logo-g-gradient)"
                  strokeWidth="13"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  filter="url(#logo-glow)"
                />
                
                {/* Primary Logo Path */}
                <motion.path
                  d="M 76 36 C 70 24 57 16 42 18 C 24 20 12 36 12 55 C 12 74 25 88 44 88 C 61 88 74 76 78 60 C 79 56 76 52 72 52 L 48 52"
                  stroke="url(#logo-g-gradient)"
                  strokeWidth="13"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0.9 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
            </div>
            
            <div className="flex flex-col text-left">
              <span className={`text-base font-black tracking-[0.08em] leading-tight transition-colors duration-300 ${
                theme === "dark" ? "text-white group-hover:text-cyan-400" : "text-black group-hover:text-purple-700"
              }`}>
                GETSETAI
              </span>
              <span className={`text-[9px] font-bold tracking-[0.24em] leading-none uppercase mt-0.5 transition-colors duration-300 ${
                theme === "dark" ? "text-zinc-400 group-hover:text-white" : "text-zinc-500 group-hover:text-black"
              }`}>
                INNOVATIONS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Centered, Harmonious Colors, and Gliding Backdrop */}
          <div className="hidden lg:flex items-center gap-1 text-sm font-semibold mx-auto">
            {navLinks.map((link, idx) => {
              const isCareers = link.key === "careers";
              const isActive = isCareers ? activePage === "careers" : activePage === "home" && link.label !== "Careers";
              
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? theme === "dark" 
                        ? "text-cyan-400 font-bold" 
                        : "text-purple-600 font-bold"
                      : theme === "dark" 
                        ? "text-zinc-400 hover:text-white" 
                        : "text-zinc-600 hover:text-black"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {hoveredIdx === idx && (
                    <motion.div
                      layoutId="navHoverBg"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      className={`absolute inset-0 rounded-xl -z-0 ${
                        theme === "dark" ? "bg-white/5" : "bg-black/[0.04]"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Controls - Minimalist, Compact, Sleek, and Absolutely No Overflow */}
          <div className="hidden lg:flex items-center gap-3.5 flex-shrink-0">
            {/* Theme Toggle Button - Refined Glass Styling */}
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                theme === "dark"
                  ? "bg-white/5 hover:bg-white/10 text-white border-white/10"
                  : "bg-black/5 hover:bg-black/10 text-black border-black/5"
              }`}
              aria-label="Toggle Theme"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: theme === "dark" ? 0 : 180 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-base leading-none"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </motion.div>
            </motion.button>

            {/* Sign In Link - Compact */}
            <Link
              href="/auth?mode=login"
              className={`text-xs font-bold uppercase tracking-wider px-2 py-2 transition-all duration-300 hover:scale-102 ${
                theme === "dark" ? "text-zinc-300 hover:text-white" : "text-zinc-600 hover:text-black"
              }`}
            >
              Sign In
            </Link>

            {/* Get Started - High-End Premium Button with Neon Gradient Outline */}
            <Link
              href="/auth?mode=signup"
              className={`relative overflow-hidden px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-105 active:scale-98 flex items-center gap-1.5 group ${
                theme === "dark"
                  ? "bg-white text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                  : "bg-black text-white hover:bg-zinc-800 shadow-sm"
              }`}
            >
              <span>Get Started</span>
              <motion.span
                animate={{ y: [0, -1, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="text-amber-500 text-[10px]"
              >
                ⚡
              </motion.span>
            </Link>
          </div>

          {/* Tablet & Mobile Controls (Theme Toggle + Hummingbird Hamburger Menu) */}
          <div className="flex lg:hidden items-center gap-3 flex-shrink-0">
            {/* Theme Toggle accessible outside menu */}
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors border ${
                theme === "dark" ? "bg-white/10 border-white/10 text-white" : "bg-black/5 border-black/5 text-black"
              }`}
              aria-label="Toggle Theme"
            >
              <span className="text-sm leading-none">{theme === "dark" ? "☀️" : "🌙"}</span>
            </motion.button>

            {/* "Hummingbird" Animated Hamburger Toggle */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover="hovered"
              className={`relative w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border ${
                theme === "dark"
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  : "bg-black/5 border-black/5 hover:bg-black/10 text-black"
              }`}
              aria-label="Toggle Menu"
            >
              <motion.span
                variants={line1Variants}
                animate={isOpen ? "opened" : "closed"}
                className={`w-5 h-[2px] rounded-full origin-center ${
                  theme === "dark" ? "bg-white" : "bg-black"
                }`}
              />
              <motion.span
                variants={line2Variants}
                animate={isOpen ? "opened" : "closed"}
                className={`w-5 h-[2px] rounded-full origin-center ${
                  theme === "dark" ? "bg-white" : "bg-black"
                }`}
              />
              <motion.span
                variants={line3Variants}
                animate={isOpen ? "opened" : "closed"}
                className={`w-5 h-[2px] rounded-full origin-center ${
                  theme === "dark" ? "bg-white" : "bg-black"
                }`}
              />
            </motion.button>
          </div>

        </div>
      </motion.nav>

      {/* Fullscreen Mobile Glass Hummingbird Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className={`fixed inset-0 z-40 w-full h-screen pt-28 px-8 pb-10 flex flex-col justify-between backdrop-blur-2xl overflow-hidden ${
              theme === "dark"
                ? "bg-[#020305]/95 text-white border-b border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.8)]"
                : "bg-white/95 text-gray-900 border-b border-black/5 shadow-[0_15px_50px_rgba(0,0,0,0.05)]"
            }`}
          >
            {/* Artistic Floating Tech Particles inside Mobile Menu */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, 20, 0],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{
                    duration: 5 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute rounded-full"
                  style={{
                    left: `${(i * 20) % 90}%`,
                    top: `${40 + (i * 12) % 50}%`,
                    width: `${4 + i}px`,
                    height: `${4 + i}px`,
                    backgroundColor: i % 2 === 0 ? "#a855f7" : "#06b6d4",
                    boxShadow: `0 0 12px ${i % 2 === 0 ? "#a855f7" : "#06b6d4"}`
                  }}
                />
              ))}
            </div>

            {/* Menu Links with Staggered Slide-in Animation */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.15 }
                }
              }}
              className="flex flex-col gap-6 mt-6"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } }
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-bold flex items-center justify-between border-b pb-3 group ${
                      theme === "dark" 
                        ? "border-white/5 text-gray-200 hover:text-white" 
                        : "border-black/5 text-gray-800 hover:text-black"
                    }`}
                  >
                    <span>{link.label}</span>
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="text-cyan-400 font-semibold"
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Bottom CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="flex flex-col gap-4 w-full relative z-10"
            >
              <Link
                href="/auth?mode=login"
                onClick={() => setIsOpen(false)}
                className={`w-full py-3.5 text-center font-bold rounded-xl border transition-all duration-300 active:scale-98 ${
                  theme === "dark"
                    ? "border-white/10 bg-white/5 hover:bg-white/10 text-white"
                    : "border-black/10 bg-black/5 hover:bg-black/10 text-black"
                }`}
              >
                Sign In
              </Link>
              
              <Link
                href="/auth?mode=signup"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 text-center font-bold rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:opacity-95 active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <span className="text-amber-300">⚡</span>
              </Link>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
