/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";

export function PremiumPlaceholder({ 
  title, 
  description = "Building the bleeding edge of the future. This module will arrive shortly.", 
  children 
}: { 
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className={`relative min-h-screen transition-colors duration-500 overflow-hidden font-sans ${
      theme === "dark" ? "bg-[#020305] text-white selection:bg-purple-500/30" : "bg-gray-50 text-gray-900 selection:bg-purple-500/30"
    }`}>
      
      {/* Grid Pattern Background */}
      <div className={`absolute inset-0 z-0 bg-[linear-gradient(to_right,${
        theme === "dark" ? "#4f4f4f1e" : "#0000000a"
      }_1px,transparent_1px),linear-gradient(to_bottom,${
        theme === "dark" ? "#4f4f4f1e" : "#0000000a"
      }_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] pointer-events-none transition-colors duration-500`}></div>
      
      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] blur-[120px] rounded-full mix-blend-screen opacity-40 animate-pulse-slow bg-purple-900/30 pointer-events-none"></div>

      <Navbar theme={theme} setTheme={setTheme} activePage="services" />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-36 pb-20 flex flex-col items-center justify-center min-h-[85vh]">
        <motion.div 
           initial={{ opacity: 0, y: 30, scale: 0.96 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="w-full text-center max-w-3xl flex flex-col items-center"
        >
          {/* Animated Logo Hexagon Badge */}
          <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
             className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-3xl mb-8 border shadow-lg ${
               theme === "dark" 
                 ? "bg-gradient-to-br from-white to-purple-400 text-black border-white/20 shadow-purple-500/25" 
                 : "bg-black text-white border-black/10 shadow-black/10"
             }`}
          >
            G
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
             {title}
          </h1>
          
          <p className={`text-base md:text-lg mb-10 leading-relaxed border p-6 rounded-2xl backdrop-blur-md w-full ${
            theme === "dark" 
              ? "border-white/10 bg-white/[0.02] text-gray-300" 
              : "border-black/5 bg-white/70 shadow-sm text-gray-600"
          }`}>
             {description}
          </p>

          {children && <div className="w-full text-left mb-10">{children}</div>}

          <Link 
            href="/" 
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all hover:scale-103 active:scale-98 ${
              theme === "dark" 
                ? "bg-white text-black hover:bg-gray-100 shadow-[0_0_25px_rgba(255,255,255,0.15)]" 
                : "bg-black text-white hover:bg-zinc-800 shadow-md"
            }`}
          >
            ← Return to Hub
          </Link>
        </motion.div>
      </div>

      {/* Styled Footer */}
      <footer className={`relative z-10 border-t overflow-hidden pt-16 transition-colors duration-500 ${
        theme === "dark" ? "border-white/10 bg-[#020305]" : "border-gray-200 bg-white"
      }`}>
        <div className={`absolute bottom-0 w-full h-[300px] pointer-events-none ${
          theme === "dark" ? "bg-gradient-to-t from-purple-900/10 to-transparent" : "bg-gradient-to-t from-purple-100/30 to-transparent"
        }`}></div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-16 relative z-10">
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded flex items-center justify-center font-bold text-sm ${
                theme === "dark" ? "bg-white text-black" : "bg-black text-white"
              }`}>
                G
              </span>
              <span className="text-xl font-bold tracking-tight">Getsetai Innovations</span>
            </div>
            <p className={`max-w-xs text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              The premier agency for digital transformation. Built with precision and focus on cutting-edge solutions across AI, Web, and Robotics.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold text-sm mb-4">Product</h5>
            <ul className={`space-y-3 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              <li><Link href="/#services" className="hover:text-purple-500 transition-colors">Services</Link></li>
              <li><Link href="/#courses" className="hover:text-purple-500 transition-colors">Courses</Link></li>
              <li><Link href="/changelog" className="hover:text-purple-500 transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm mb-4">Company</h5>
            <ul className={`space-y-3 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              <li><Link href="/about" className="hover:text-purple-500 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-purple-500 transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-purple-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm mb-4">Legal</h5>
            <ul className={`space-y-3 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              <li><Link href="/privacy" className="hover:text-purple-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-purple-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Animated Brand Wordmark */}
        <div className="relative w-full overflow-hidden flex items-center justify-center py-8 select-none pointer-events-none perspective-[1000px]">
           <motion.div
              animate={{ 
                rotateX: [0, 10, -5, 0],
                rotateY: [0, 5, -10, 0],
                scale: [1, 1.02, 0.98, 1],
                filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(180deg)", "hue-rotate(0deg)"]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="text-[8vw] font-black tracking-tighter text-transparent bg-clip-text whitespace-nowrap bg-[length:300%_auto] bg-gradient-to-r from-purple-500 via-cyan-400 to-indigo-500"
           >
              GETSETAI
           </motion.div>
        </div>
      </footer>

    </div>
  );
}
