/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function CareersPage() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const jobs = [
    { title: "Softwere Development sde 1 intern", type: "Internship", location: "Remote", color: "from-blue-500 to-cyan-400" },
    { title: "UI UX designer Intern", type: "Internship", location: "Remote", color: "from-purple-500 to-indigo-400" },
    { title: "Project manager exp 1 year", type: "Full-Time", location: "Remote", color: "from-emerald-500 to-teal-400" },
    { title: "Full stack web Developer", type: "Full-Time", location: "Remote", color: "from-orange-500 to-amber-400" }
  ];

  const applyLink = "https://docs.google.com/forms/d/e/1FAIpQLSc1xnNuSoMs5SOgYEWmLWwLOg6gCx0v2lAwBR21kLXObuOLHg/viewform?usp=dialog";

  return (
    <div className={`relative min-h-screen transition-colors duration-500 overflow-hidden font-sans ${theme === "dark" ? "bg-[#020305] text-white selection:bg-purple-500/30" : "bg-gray-50 text-gray-900 selection:bg-purple-500/30"}`}>
      
      {/* Grid Pattern Background */}
      <div className={`absolute inset-0 z-0 bg-[linear-gradient(to_right,${theme==="dark"?"#4f4f4f1e":"#0000000a"}_1px,transparent_1px),linear-gradient(to_bottom,${theme==="dark"?"#4f4f4f1e":"#0000000a"}_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none transition-colors duration-500`}></div>
      
      {/* Glow Effects */}
      <div className="absolute top-0 flex justify-center w-full z-0 pointer-events-none">
        <div className={`w-[800px] h-[500px] blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse-slow ${theme === "dark" ? "bg-purple-900/20" : "bg-purple-400/20"}`}></div>
      </div>

      <nav className={`relative z-50 flex items-center justify-between px-6 py-4 mx-auto max-w-7xl border-b mt-2 rounded-2xl backdrop-blur-md transition-colors duration-500 ${theme === "dark" ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-black/[0.02] shadow-sm"}`}>
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(255,255,255,0.4)] ${theme === "dark" ? "bg-gradient-to-br from-white to-fuchsia-400 text-black" : "bg-gradient-to-br from-white to-purple-600 text-black border border-gray-200"}`}
          >
            G
          </motion.div>
          <motion.span 
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ textShadow: theme === "dark" ? "0 0 20px rgba(255,255,255,0.3)" : "none" }}
            className={`text-xl font-extrabold tracking-tight cursor-pointer bg-[length:200%_auto] text-transparent bg-clip-text ${theme === "dark" ? "bg-gradient-to-r from-white via-fuchsia-300 to-purple-500" : "bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-800"}`}
          >
            Getsetai Innovations
          </motion.span>
        </Link>

        <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          <Link href="/#features" className={`transition ${theme === "dark" ? "hover:text-white" : "hover:text-black"}`}>Features</Link>
          <Link href="/#services" className={`transition ${theme === "dark" ? "hover:text-white" : "hover:text-black"}`}>Services</Link>
          <span className={`transition ${theme === "dark" ? "text-white" : "text-black"}`}>Careers</span>
          <Link href="/#courses" className={`transition ${theme === "dark" ? "hover:text-white" : "hover:text-black"}`}>Courses</Link>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`p-2 rounded-full transition-colors ${theme === "dark" ? "bg-white/10 hover:bg-white/20 text-white" : "bg-black/5 hover:bg-black/10 text-black"}`}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <Link href="/auth?mode=login" className={`text-sm font-medium transition ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"}`}>
            Sign In
          </Link>
          <Link href="/auth?mode=signup" className={`px-4 py-2 text-sm font-medium rounded-[10px] transition flex items-center gap-2 ${theme === "dark" ? "bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "bg-black text-white hover:bg-gray-800 shadow-[0_4px_14px_0_rgba(0,0,0,0.15)]"}`}>
            Get Started <span className="text-amber-500">⚡</span>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center max-w-5xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center w-full">
          <motion.div variants={fadeInUp} className="mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border transition backdrop-blur-md ${theme === "dark" ? "border-white/10 bg-white/5 text-gray-300 shadow-lg shadow-white/5" : "border-black/5 bg-black/5 text-gray-700 shadow-sm"}`}>
              <motion.span animate={{ opacity: [1,0,1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-amber-500">🚀</motion.span> Join our team today
            </div>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-[70px] font-bold tracking-tight leading-[1.1] mb-6"
          >
            Shape the future
            <br />
            <motion.span 
               animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
               className="text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
            >
              of innovation
            </motion.span>
          </motion.h1>

          <motion.p variants={fadeInUp} className={`text-lg md:text-xl mb-16 max-w-2xl text-center leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            We are always looking for passionate individuals to help us build cutting edge digital solutions. Join Getsetai Innovations today.
          </motion.p>
        </motion.div>

        {/* Jobs List replacing previous cards with links */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.3 }}
           className="w-full max-w-3xl flex flex-col gap-4 mt-8"
        >
          {jobs.map((job, idx) => (
            <Link href={applyLink} target="_blank" key={idx} className="block">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className={`group flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl border transition-all cursor-pointer backdrop-blur-md relative overflow-hidden ${theme === "dark" ? "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-purple-500/30" : "bg-white border-black/5 hover:border-black/10 hover:shadow-xl shadow-sm"}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${job.color} opacity-0 ${theme === "dark" ? "group-hover:opacity-10" : "group-hover:opacity-[0.03]"} transition-opacity`}></div>
                <div className="relative z-10 text-left">
                  <h3 className={`text-xl font-semibold transition-colors mb-2 ${theme === "dark" ? "text-white group-hover:text-purple-300" : "text-gray-900 group-hover:text-purple-600"}`}>{job.title}</h3>
                  <div className={`flex gap-3 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>{job.type}</span>
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>{job.location}</span>
                  </div>
                </div>
                <div className="relative z-10 mt-4 md:mt-0 w-full md:w-auto">
                  <button className={`w-full md:w-auto px-5 py-2 rounded-lg font-medium transition-colors ${theme === "dark" ? "bg-white/10 text-white group-hover:bg-white group-hover:text-black" : "bg-gray-100 text-gray-900 group-hover:bg-black group-hover:text-white"}`}>
                    Apply Now
                  </button>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </main>

      {/* Crazy Footer identically matched to landing page */}
      <footer className={`relative z-10 border-t mt-20 overflow-hidden pt-20 transition-colors duration-500 ${theme === "dark" ? "border-white/10 bg-[#020305]" : "border-gray-200 bg-white"}`}>
        <div className={`absolute bottom-0 w-full h-[500px] pointer-events-none ${theme === "dark" ? "bg-gradient-to-t from-purple-900/10 to-transparent" : "bg-gradient-to-t from-purple-100/50 to-transparent"}`}></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-2 lg:col-span-2 space-y-6"
          >
            <div className="flex items-center gap-2">
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className={`w-8 h-8 rounded flex items-center justify-center font-bold text-xl ${theme === "dark" ? "bg-white text-black" : "bg-black text-white"}`}
              >
                G
              </motion.div>
              <motion.span 
                 animate={{ textShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 20px rgba(168,85,247,0.8)", "0px 0px 0px rgba(0,0,0,0)"] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="text-2xl font-bold"
              >
                 Getsetai Innovations
              </motion.span>
            </div>
            <p className={`max-w-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              The premier agency for digital transformation. Built with precision and a focus on cutting-edge solutions across AI, Web, and Robotics.
            </p>
            <div className="flex gap-4">
              {['𝕏', 'in', 'GH'].map((icon, i) => (
                <motion.div 
                   key={icon}
                   whileHover={{ y: -10, rotate: 15, scale: 1.2 }}
                   transition={{ type: "spring", stiffness: 300 }}
                   className={`w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer ${theme === "dark" ? "bg-white/5 border-white/10 hover:bg-white/20 text-gray-400 hover:text-white" : "bg-gray-50 border-gray-200 hover:bg-gray-200 text-gray-500 hover:text-gray-900"}`}
                >
                   {icon}
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
             }}
          >
            <h5 className="font-bold mb-6">Product</h5>
            <ul className={`space-y-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {[{label:"Features", href:"/#features"}, {label:"Services", href:"/#services"}, {label:"Courses", href:"/#courses"}, {label:"Changelog", href:"/changelog"}].map(link => (
                 <motion.li key={link.label} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                   <Link href={link.href} className="hover:text-purple-500 transition-colors">{link.label}</Link>
                 </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
             }}
          >
            <h5 className="font-bold mb-6">Company</h5>
            <ul className={`space-y-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {[{label:"About Us", href:"/about"}, {label:"Careers", href:"/careers"}, {label:"Contact", href:"/contact"}, {label:"Blog", href:"/blog"}].map(link => (
                 <motion.li key={link.label} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                   <Link href={link.href} className="hover:text-purple-500 transition-colors">{link.label}</Link>
                 </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
             }}
          >
            <h5 className="font-bold mb-6">Legal</h5>
            <ul className={`space-y-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {[{label:"Privacy Policy", href:"/privacy"}, {label:"Terms of Service", href:"/terms"}, {label:"Cookie Policy", href:"/cookies"}].map(link => (
                 <motion.li key={link.label} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                   <Link href={link.href} className="hover:text-purple-500 transition-colors">{link.label}</Link>
                 </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Crazy Animated Wordmark at bottom */}
        <div className="relative w-full overflow-hidden flex items-center justify-center py-10 select-none pointer-events-none perspective-[1000px]">
           <motion.div
              animate={{ 
                rotateX: [0, 20, -10, 0],
                rotateY: [0, 10, -20, 0],
                scale: [1, 1.05, 0.95, 1],
                filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(180deg)", "hue-rotate(0deg)"]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className={`text-[9vw] font-black tracking-tighter text-transparent bg-clip-text whitespace-nowrap bg-[length:300%_auto] bg-gradient-to-r from-purple-500 via-cyan-400 to-indigo-500`}
           >
              GETSETAI
           </motion.div>
        </div>
      </footer>
    </div>
  );
}
