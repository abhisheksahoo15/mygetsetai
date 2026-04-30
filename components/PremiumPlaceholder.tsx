/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function PremiumPlaceholder({ title, description = "Building the bleeding edge of the future. This module will arrive shortly.", children }: { title: string, description?: string, children?: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#020305] text-white selection:bg-purple-500/30 flex items-center justify-center font-sans overflow-hidden">
      
      {/* Background Matrix */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f1e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] pointer-events-none"></div>
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] blur-[120px] rounded-full mix-blend-screen opacity-30 animate-pulse-slow bg-purple-900/40 pointer-events-none"></div>

      <motion.div 
         initial={{ opacity: 0, y: 30, scale: 0.95 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="relative z-10 max-w-2xl text-center px-6"
      >
        <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center font-bold text-4xl shadow-[0_0_30px_rgba(168,85,247,0.5)] bg-gradient-to-br from-white to-fuchsia-400 text-black mb-8 border border-white/20"
        >
          G
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight bg-[length:200%_auto] text-transparent bg-clip-text bg-gradient-to-r from-white via-fuchsia-300 to-purple-500">
           {title}
        </h1>
        
        <p className="text-gray-400 text-lg mb-10 leading-relaxed border border-white/10 p-6 rounded-2xl backdrop-blur-md bg-white/[0.02]">
           {description}
        </p>

        {children && <div className="mb-10 text-left">{children}</div>}

        <Link href="/" className="inline-flex items-center gap-3 px-8 py-4 rounded-[14px] font-semibold transition bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          ← Return to Terminal
        </Link>
      </motion.div>
    </div>
  );
}
