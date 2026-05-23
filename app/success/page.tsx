"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "../../components/Navbar";

export default function SuccessPage() {
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
      
      {/* Celebratory Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] blur-[140px] rounded-full mix-blend-screen opacity-40 bg-gradient-to-tr from-cyan-900/30 via-purple-900/35 to-blue-900/30 pointer-events-none"></div>

      <Navbar theme={theme} setTheme={setTheme} activePage="courses" />

      {/* Celebratory Content Area */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-36 pb-20 flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div 
           initial={{ opacity: 0, scale: 0.95, y: 30 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
           className={`w-full p-8 md:p-10 rounded-2xl border backdrop-blur-md text-center relative overflow-hidden ${
             theme === "dark" ? "border-white/10 bg-[#050508]/60 shadow-2xl" : "border-black/5 bg-white shadow-xl"
           }`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none" />
          
          {/* Celebratory Check Circle Badge */}
          <motion.div 
             animate={{ scale: [1, 1.1, 1] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
             className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-6 shadow-lg ${
               theme === "dark" 
                 ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-emerald-500/10" 
                 : "bg-emerald-100 text-emerald-700 border border-emerald-200"
             }`}
          >
            ✓
          </motion.div>
          
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
             Payment Successful!
          </h1>
          
          <p className={`text-base md:text-lg mb-8 max-w-md mx-auto leading-relaxed ${
            theme === "dark" ? "text-gray-300" : "text-gray-650"
          }`}>
             Thank you for enrolling with Getsetai Innovations. A confirmation terminal voucher and course syllabus details have been dispatched to your email address.
          </p>

          <Link 
            href="/" 
            className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold transition-all hover:scale-102 active:scale-98 text-xs uppercase tracking-wider ${
              theme === "dark" 
                ? "bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.15)]" 
                : "bg-black text-white hover:bg-zinc-800 shadow-md"
            }`}
          >
            <span>Back to Dashboard</span>
            <span>⚡</span>
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
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm mb-4">Company</h5>
            <ul className={`space-y-3 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              <li><Link href="/about" className="hover:text-purple-500 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-purple-500 transition-colors">Careers</Link></li>
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
      </footer>

    </div>
  );
}
