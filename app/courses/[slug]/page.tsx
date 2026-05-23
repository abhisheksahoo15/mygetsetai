"use client";

import { courses } from "@/data/courses";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../../../components/Navbar";

export default function CoursePage() {
  const [theme, setTheme] = useState("dark");
  const params = useParams();
  const slug = params.slug as string;
  const course = courses.find((item) => item.slug === slug);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (!course) notFound();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-500 overflow-hidden font-sans ${
      theme === "dark" ? "bg-[#020305] text-white selection:bg-purple-500/30" : "bg-gray-50 text-gray-900 selection:bg-purple-500/30"
    }`}>
      
      {/* Grid Pattern Background */}
      <div className={`absolute inset-0 z-0 bg-[linear-gradient(to_right,${
        theme === "dark" ? "#4f4f4f1e" : "#0000000a"
      }_1px,transparent_1px),linear-gradient(to_bottom,${
        theme === "dark" ? "#4f4f4f1e" : "#0000000a"
      }_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none transition-colors duration-500`}></div>
      
      {/* Ambient Glows */}
      <div className="absolute top-0 flex justify-center w-full z-0 pointer-events-none">
        <div className={`w-[800px] h-[500px] blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse-slow ${
          theme === "dark" ? "bg-purple-900/20" : "bg-purple-300/20"
        }`}></div>
      </div>

      <Navbar theme={theme} setTheme={setTheme} activePage="courses" />

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-36 pb-24">
        
        {/* Navigation Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Link 
            href="/#courses" 
            className={`inline-flex items-center gap-2 text-sm font-bold transition-all ${
              theme === "dark" ? "text-purple-300 hover:text-white" : "text-purple-600 hover:text-black"
            }`}
          >
            ← Back to Courses
          </Link>
        </motion.div>

        {/* Dynamic Detail Card */}
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          
          {/* Left Side: Info & Syllabus (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Core Course Overview */}
            <motion.div 
              variants={fadeInUp}
              className={`p-8 rounded-2xl border backdrop-blur-md relative overflow-hidden ${
                theme === "dark" ? "border-white/10 bg-[#050508]/40" : "border-black/5 bg-white shadow-md"
              }`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/10 to-cyan-500/5 rounded-bl-full pointer-events-none" />
              
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border text-2xl mb-6 shadow-inner ${
                theme === "dark" ? "bg-white/5 border-white/10" : "bg-purple-50 border-purple-100"
              }`}>
                {course.icon}
              </div>
              
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                theme === "dark" ? "bg-purple-500/15 text-purple-300" : "bg-purple-100 text-purple-700"
              }`}>
                Course Track
              </span>
              
              <h1 className="text-3xl md:text-5xl font-black mt-4 mb-4 tracking-tight leading-tight">
                {course.title}
              </h1>
              
              <p className={`text-base md:text-lg leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-650"
              }`}>
                {course.description}
              </p>
            </motion.div>

            {/* Curriculum / What You Will Learn */}
            <motion.div 
              variants={fadeInUp}
              className={`p-8 rounded-2xl border backdrop-blur-md ${
                theme === "dark" ? "border-white/10 bg-[#050508]/20" : "border-black/5 bg-white shadow-sm"
              }`}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span>📚 Curriculum & Milestones</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.syllabus.map((item, index) => (
                  <motion.div 
                    key={item}
                    whileHover={{ scale: 1.01 }}
                    className={`p-4 rounded-xl border flex items-start gap-3 ${
                      theme === "dark" ? "border-white/5 bg-white/[0.01]" : "border-black/5 bg-gray-50/50"
                    }`}
                  >
                    <span className="text-purple-500 text-sm font-bold mt-0.5">0{index + 1}.</span>
                    <span className={`text-sm font-semibold ${theme === "dark" ? "text-zinc-300" : "text-gray-700"}`}>
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Side: Price & Booking Action Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Enrollment Checkout Card */}
            <motion.div 
              variants={fadeInUp}
              className={`p-8 rounded-2xl border backdrop-blur-md relative overflow-hidden ${
                theme === "dark" 
                  ? "border-purple-500/20 bg-gradient-to-br from-purple-950/20 to-black/40 shadow-2xl" 
                  : "border-purple-200 bg-white shadow-xl shadow-purple-500/5"
              }`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/15 to-transparent rounded-bl-full pointer-events-none" />
              
              <h3 className={`text-xs font-black uppercase tracking-[0.2em] mb-2 ${
                theme === "dark" ? "text-purple-300" : "text-purple-700"
              }`}>
                Lifetime Access
              </h3>
              
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                  ₹{course.price}
                </span>
                <span className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
                  (Inc. tax & materials)
                </span>
              </div>

              {/* Inclusions */}
              <div className="flex flex-col gap-3.5 mb-8">
                {[
                  "Complete high-quality syllabus modules",
                  "1-on-1 practical hands-on laboratories",
                  "Industry recognized technology certification",
                  "Direct access to active developer channels",
                ].map((inc) => (
                  <div key={inc} className="flex items-center gap-2.5 text-xs">
                    <span className="text-emerald-500">✔</span>
                    <span className={theme === "dark" ? "text-zinc-300" : "text-gray-650"}>{inc}</span>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <Link
                href={`/auth?mode=signup&next=/checkout/${course.slug}`}
                className="block text-center py-4 w-full text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 bg-gradient-to-r from-purple-500 via-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-purple-500/20 hover:scale-102 active:scale-98"
              >
                Enroll & Book Session ⚡
              </Link>
              
              <p className={`text-center text-[10px] mt-4 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                🔒 Guaranteed safe checkout through Razorpay.
              </p>
            </motion.div>

            {/* Quick Hotline Helper */}
            <motion.div
              variants={fadeInUp}
              className={`p-6 rounded-2xl border text-center relative overflow-hidden ${
                theme === "dark" ? "border-white/5 bg-white/[0.01]" : "border-black/5 bg-white shadow-sm"
              }`}
            >
              <span className="text-xl mb-1 block">📞</span>
              <h4 className={`text-sm font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Need group discounts or booking help?
              </h4>
              <p className={`text-xs mt-1 mb-3 ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
                Reach our team directly for customized pricing.
              </p>
              <a href="tel:+919202893485" className="text-sm font-black text-purple-500 hover:underline">
                +91 92028 93485
              </a>
            </motion.div>

          </div>

        </motion.div>

      </main>

      {/* Footer matching other core routes */}
      <footer className={`relative z-10 border-t overflow-hidden pt-20 transition-colors duration-500 ${
        theme === "dark" ? "border-white/10 bg-[#020305]" : "border-gray-200 bg-white"
      }`}>
        <div className={`absolute bottom-0 w-full h-[300px] pointer-events-none ${
          theme === "dark" ? "bg-gradient-to-t from-purple-900/10 to-transparent" : "bg-gradient-to-t from-purple-100/30 to-transparent"
        }`}></div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-16 relative z-10">
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xl ${
                theme === "dark" ? "bg-white text-black" : "bg-black text-white"
              }`}>
                G
              </span>
              <span className="text-2xl font-bold">Getsetai Innovations</span>
            </div>
            <p className={`max-w-xs text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              The premier agency for digital transformation. Built with precision and focus on cutting-edge solutions across AI, Web, and Robotics.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold text-sm mb-6">Product</h5>
            <ul className={`space-y-4 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              <li><Link href="/#services" className="hover:text-purple-500 transition-colors">Services</Link></li>
              <li><Link href="/#courses" className="hover:text-purple-500 transition-colors">Courses</Link></li>
              <li><Link href="/changelog" className="hover:text-purple-500 transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm mb-6">Company</h5>
            <ul className={`space-y-4 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              <li><Link href="/about" className="hover:text-purple-500 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-purple-500 transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-purple-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm mb-6">Legal</h5>
            <ul className={`space-y-4 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              <li><Link href="/privacy" className="hover:text-purple-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-purple-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Animated wordmark */}
        <div className="relative w-full overflow-hidden flex items-center justify-center py-8 select-none pointer-events-none perspective-[1000px]">
           <motion.div
              animate={{ 
                rotateX: [0, 20, -10, 0],
                rotateY: [0, 10, -20, 0],
                scale: [1, 1.05, 0.95, 1],
                filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(180deg)", "hue-rotate(0deg)"]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="text-[9vw] font-black tracking-tighter text-transparent bg-clip-text whitespace-nowrap bg-[length:300%_auto] bg-gradient-to-r from-purple-500 via-cyan-400 to-indigo-500"
           >
              GETSETAI
           </motion.div>
        </div>
      </footer>

    </div>
  );
}
