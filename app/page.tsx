/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import Link from "next/link";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";

function WelcomePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setTimeout(() => setShow(true), 1500);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-[#050505] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(168,85,247,0.3)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4">
          <button onClick={() => setShow(false)} className="text-gray-400 hover:text-white transition-colors text-xl">
            ✕
          </button>
        </div>
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center mb-6 text-2xl animate-spin-slow shadow-lg shadow-purple-500/50">
           🚀
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to Getsetai Innovations!</h2>
        <p className="text-gray-400 mb-6">Discover the bleeding edge of AI development, tech seminars, and enterprise solutions. We are glad you are here.</p>
        <button onClick={() => setShow(false)} className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
          Explore Now
        </button>
      </motion.div>
    </div>
  );
}



// Complex Advanced AI Tech Background Grid Component
function TechGridBackground({ theme }: { theme: string }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Traditional Grid */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,${theme==="dark"?"#4f4f4f1e":"#0000000a"}_1px,transparent_1px),linear-gradient(to_bottom,${theme==="dark"?"#4f4f4f1e":"#0000000a"}_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] transition-colors duration-500`}></div>
      
      {/* Moving Tech Lines */}
      {theme === "dark" && (
        <div className="absolute inset-0 opacity-40">
          <motion.div 
             animate={{ y: [0, 1000] }} 
             transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
             className="absolute left-[20%] top-[-100%] w-[1px] h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
          />
          <motion.div 
             animate={{ y: [0, 1000] }} 
             transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
             className="absolute left-[60%] top-[-100%] w-[1px] h-40 bg-gradient-to-b from-transparent via-fuchsia-500 to-transparent"
          />
          <motion.div 
             animate={{ x: [0, 2000] }} 
             transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 1 }}
             className="absolute top-[30%] left-[-100%] h-[1px] w-60 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          />
          <motion.div 
             animate={{ x: [-1000, 1000] }} 
             transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 5 }}
             className="absolute top-[70%] right-[-100%] h-[1px] w-64 bg-gradient-to-l from-transparent via-blue-500 to-transparent"
          />
        </div>
      )}

      {/* Floating AI Data Nodes */}
      <div className="absolute inset-0">
         {[...Array(15)].map((_, i) => (
           <motion.div
             key={i}
             animate={{ 
               y: [0, -((i * 11) % 40) - 20, 0],
               opacity: [0.1, 0.4, 0.1] 
             }}
             transition={{
               duration: ((i * 7) % 3) + 4,
               repeat: Infinity,
               ease: "easeInOut",
               delay: ((i * 5) % 2)
             }}
             className="absolute rounded-full"
             style={{
               left: `${(i * 13) % 100}%`,
               top: `${(i * 19) % 100}%`,
               width: `${((i * 3) % 4) + 2}px`,
               height: `${((i * 2) % 4) + 2}px`,
               backgroundColor: i % 2 === 0 ? "#a855f7" : "#06b6d4",
               boxShadow: `0 0 10px ${i % 2 === 0 ? "#a855f7" : "#06b6d4"}`
             }}
           />
         ))}
      </div>
    </div>
  );
}

export default function Home() {

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

  const services = [
    { title: "Political Strategy Management", icon: "🗳️", color: "from-rose-500 to-red-500" },
    { title: "Technical Seminar", icon: "🎤", color: "from-blue-500 to-cyan-400" },
    { title: "AI Driven Software Solutions", icon: "🧠", color: "from-purple-500 to-indigo-400" },
    { title: "Website Development Full Stack", icon: "💻", color: "from-emerald-500 to-teal-400" },
    { title: "Digital Marketing", icon: "📈", color: "from-orange-500 to-amber-400" },
    { title: "Social Media Management", icon: "📱", color: "from-rose-500 to-pink-400" },
    { title: "Robotics", icon: "🤖", color: "from-slate-500 to-gray-400" },
    { title: "Enhanced Courses", icon: "📚", color: "from-yellow-500 to-orange-400" },
  ];

  return (
    <div className={`relative min-h-screen transition-colors duration-500 overflow-hidden font-sans ${theme === "dark" ? "bg-[#020305] text-white selection:bg-purple-500/30" : "bg-gray-50 text-gray-900 selection:bg-purple-500/30"}`}>
      <WelcomePopup />
      
      {/* New Tech Matrix Background */}
      <TechGridBackground theme={theme} />
      
      {/* Glow Effects */}
      <div className="absolute top-0 flex justify-center w-full z-0 pointer-events-none">
        <div className={`w-[800px] h-[500px] blur-[120px] rounded-full mix-blend-screen opacity-40 animate-pulse-slow ${theme === "dark" ? "bg-purple-900/40" : "bg-purple-400/20"}`}></div>
        <div className={`absolute top-20 w-[600px] h-[400px] blur-[100px] rounded-full mix-blend-screen opacity-40 ${theme === "dark" ? "bg-cyan-900/30" : "bg-cyan-400/20"}`}></div>
      </div>

      <Navbar theme={theme} setTheme={setTheme} activePage="home" />

      <main className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center max-w-5xl mx-auto">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-center w-full relative">
          
          <motion.div variants={fadeInUp} className="relative inline-flex mb-8 rounded-full p-[2px] overflow-hidden group max-w-lg md:max-w-2xl text-center">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,#e879f9_100%)]"
             />
             <div className="relative bg-black rounded-full px-5 py-2 text-[10px] md:text-xs font-semibold tracking-wide text-gray-300 text-center">
               Getsetai innovation is officialy registerd under the Ministry of Micro, Small & Medium Enterprises (MSME), Govt. of India License No : UDYAM-CG-05-0057895
             </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-8">
            <Link href="#services" className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border transition backdrop-blur-md ${theme === "dark" ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "border-black/5 bg-black/5 text-gray-700 hover:bg-black/10 shadow-sm"}`}>
              <motion.span animate={{ opacity: [1,0,1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-amber-500">✨</motion.span> Explore our services <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} ml-1`}>→</span>
            </Link>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-6xl md:text-[80px] font-bold tracking-tight leading-[1.1] mb-6"
          >
            Digital Innovation
            <br />
            <motion.span 
               animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
               className="text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400"
            >
              with AI & Tech
            </motion.span>
          </motion.h1>

          <motion.p variants={fadeInUp} className={`text-lg md:text-xl mb-10 max-w-2xl text-center leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Empowering businesses across India. Getsetai Innovations delivers AI-driven software, full-stack development, and enterprise solutions to clients throughout India.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Link href="#services" className={`inline-flex items-center px-6 py-3 rounded-[12px] font-semibold text-lg transition ${theme === "dark" ? "bg-white text-black hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.2)]" : "bg-black text-white hover:bg-gray-800 shadow-lg"}`}>
              Explore Services <span className="ml-2">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Our Services Section */}
        <motion.div 
          id="services"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mt-32 w-full max-w-6xl relative"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Our Services</h2>
            <p className={`max-w-2xl mx-auto text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>We provide cutting-edge technological solutions to propel your business forward.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative p-6 rounded-2xl border transition-all cursor-pointer overflow-hidden ${theme === "dark" ? "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]" : "bg-white border-black/5 hover:border-black/10 hover:shadow-xl shadow-sm"}`}
              >
                <Link href={`/services/${encodeURIComponent(service.title.replace(/\s+/g, '-').toLowerCase())}`} className="absolute inset-0 z-20" />
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-2xl ${theme === "dark" ? "bg-white/5 border border-white/10" : "bg-gray-50 border border-gray-100"}`}>
                  {service.icon}
                </div>
                <h3 className={`text-lg font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{service.title}</h3>
                <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${service.color} transform origin-left transition-all duration-300 group-hover:w-full`}></div>
              </motion.div>
            ))}
            
            <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: services.length * 0.1 }}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border border-dashed transition-all cursor-pointer relative text-center ${theme === "dark" ? "bg-transparent border-white/20 hover:border-purple-400 hover:bg-purple-500/5 group" : "bg-transparent border-black/20 hover:border-purple-500 hover:bg-purple-50 group"}`}
            >
                <Link href="/contact" className="absolute inset-0 z-20" />
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${theme === "dark" ? "bg-white/5 group-hover:bg-purple-500 group-hover:text-white" : "bg-gray-100 group-hover:bg-purple-500 group-hover:text-white"}`}>
                    <span className="text-xl">➔</span>
                </div>
                <h3 className={`font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Discover More</h3>
                <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Contact our team</p>
            </motion.div>
          </div>
          
          <div className="absolute -inset-20 bg-gradient-to-r from-cyan-500/0 via-purple-500/10 to-indigo-500/0 rounded-[3rem] blur-3xl -z-10 animate-pulse pointer-events-none"></div>
        </motion.div>
      </main>

      {/* Existing Courses Section */}
      <section id="courses" className="relative z-10 max-w-6xl mx-auto px-6 py-24 mt-10">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Master new skills</h2>
            <p className={`max-w-2xl mx-auto text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Explore our premium courses designed to give you an edge in the fast-paced tech industry.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group border rounded-2xl p-6 transition-all cursor-pointer relative overflow-hidden backdrop-blur-sm ${theme === "dark" ? "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-purple-500/50 shadow-none" : "border-gray-200 bg-white hover:border-purple-400 hover:shadow-xl shadow-sm"}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border text-xl text-purple-500 mb-6 shadow-inner ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-purple-50 border-purple-100"}`}>
                    {course.icon}
                  </div>
                  <h4 className={`text-xl font-semibold mb-3 transition-colors ${theme === "dark" ? "text-white group-hover:text-purple-300" : "text-gray-900 group-hover:text-purple-600"}`}>{course.title}</h4>
                  <p className={`text-sm mb-8 leading-relaxed flex-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{course.description}</p>
                  
                  <div className={`flex items-center justify-between pt-6 border-t ${theme === "dark" ? "border-white/10" : "border-gray-100"}`}>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 transition-all">
                      ₹{course.price}
                    </span>
                    <Link
                      href={`/courses/${course.slug}`}
                      className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${theme === "dark" ? "bg-white/10 text-white hover:bg-white hover:text-black" : "bg-black text-white hover:bg-gray-800"}`}
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Premium Interactive Contact Section */}
      <section id="contact" className="relative z-10 max-w-6xl mx-auto px-6 py-24 mt-10">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Connect With Us</h2>
            <p className={`max-w-2xl mx-auto text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Reach out to our core team for AI integrations, software solutions, robotics partnerships, or political strategy campaigns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Left: Contact Info details Cards */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Email Info Card */}
                <motion.div 
                  whileHover={{ y: -5, scale: 1.01 }}
                  className={`p-6 rounded-2xl border transition-all ${
                    theme === "dark" 
                      ? "bg-white/[0.02] border-white/10 hover:border-purple-500/30" 
                      : "bg-white border-black/5 shadow-sm hover:shadow-md"
                  }`}
                >
                  <h3 className="text-fuchsia-400 font-bold mb-2 uppercase tracking-wider text-xs flex items-center gap-2">
                    ✉️ Communications
                  </h3>
                  <a href="mailto:innovationsgetsetai@gmail.com" className={`text-lg font-semibold transition hover:text-fuchsia-400 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    innovationsgetsetai@gmail.com
                  </a>
                </motion.div>

                {/* Phone Info Card */}
                <motion.div 
                  whileHover={{ y: -5, scale: 1.01 }}
                  className={`p-6 rounded-2xl border transition-all ${
                    theme === "dark" 
                      ? "bg-white/[0.02] border-white/10 hover:border-amber-500/30" 
                      : "bg-white border-black/5 shadow-sm hover:shadow-md"
                  }`}
                >
                  <h3 className="text-amber-500 font-bold mb-2 uppercase tracking-wider text-xs flex items-center gap-2">
                    📞 Direct Hotline
                  </h3>
                  <a href="tel:+919202893485" className={`text-2xl font-black transition hover:text-amber-500 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 ${
                    theme === "dark" ? "" : ""
                  }`}>
                    +91 92028 93485
                  </a>
                  <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    Available Mon - Sat, 10:00 AM - 7:00 PM (IST)
                  </p>
                </motion.div>

                {/* HQ & Branches info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* HQ Card - Bhilai */}
                  <motion.div
                    whileHover={{ y: -3, scale: 1.02 }}
                    className={`p-5 rounded-2xl border relative overflow-hidden transition-all ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-cyan-950/30 to-blue-950/20 border-cyan-500/20 hover:border-cyan-400/40"
                        : "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">🏢</span>
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full ${
                        theme === "dark"
                          ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
                          : "bg-blue-100 text-blue-700 border border-blue-200"
                      }`}>
                        HQ · Innovation Center
                      </span>
                    </div>
                    <p className={`text-sm font-semibold leading-snug ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      Vivekananda Nagar, Kohka
                    </p>
                    <p className={`text-xs mt-0.5 ${
                      theme === "dark" ? "text-cyan-300/70" : "text-blue-600"
                    }`}>
                      Bhilai Nagar, Chhattisgarh 490023
                    </p>
                  </motion.div>

                  {/* Cloud HQ Card - Bengaluru */}
                  <motion.div
                    whileHover={{ y: -3, scale: 1.02 }}
                    className={`p-5 rounded-2xl border relative overflow-hidden transition-all ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-purple-950/30 to-indigo-950/20 border-purple-500/20 hover:border-purple-400/40"
                        : "bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 hover:border-purple-300"
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">☁️</span>
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full ${
                        theme === "dark"
                          ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                          : "bg-purple-100 text-purple-700 border border-purple-200"
                      }`}>
                        Cloud HQ
                      </span>
                    </div>
                    <p className={`text-sm font-semibold leading-snug ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      Kodigehalli Ayappa Nagar
                    </p>
                    <p className={`text-xs mt-0.5 ${
                      theme === "dark" ? "text-purple-300/70" : "text-purple-600"
                    }`}>
                      Bengaluru, Karnataka 560067
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Map/Google maps trigger */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className={`p-5 rounded-2xl border text-center relative overflow-hidden group ${
                  theme === "dark" 
                    ? "bg-purple-950/10 border-purple-500/20 hover:border-purple-500/40" 
                    : "bg-purple-50 border-purple-100 hover:border-purple-200"
                }`}
              >
                <Link href="https://maps.app.goo.gl/7NP9c4NnN3iMCWH99" target="_blank" className="absolute inset-0 z-20" />
                <span className="text-xl mb-1 block">🗺️</span>
                <span className={`font-bold text-sm ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Find Us on Google Maps
                </span>
                <span className="text-xs text-purple-400 block mt-0.5 group-hover:translate-x-1 transition-transform">
                  Get directions →
                </span>
              </motion.div>
            </div>

            {/* Right: Modern glass form */}
            <div className={`p-8 rounded-2xl border backdrop-blur-md relative overflow-hidden ${
              theme === "dark" 
                ? "bg-white/[0.02] border-white/10" 
                : "bg-white border-black/5 shadow-xl shadow-gray-200/50"
            }`}>
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <h3 className={`text-xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Drop Us a Message
              </h3>

              <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Our core team will connect with you shortly."); }} className="space-y-4">
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      theme === "dark" 
                        ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20" 
                        : "bg-gray-50 border-black/10 text-gray-900 placeholder-gray-400 focus:border-purple-600 focus:ring-purple-600/25"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="name@company.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      theme === "dark" 
                        ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20" 
                        : "bg-gray-50 border-black/10 text-gray-900 placeholder-gray-400 focus:border-purple-600 focus:ring-purple-600/25"
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Your Message
                  </label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Tell us about your project, target audience, or strategy goals..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 resize-none ${
                      theme === "dark" 
                        ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20" 
                        : "bg-gray-50 border-black/10 text-gray-900 placeholder-gray-400 focus:border-purple-600 focus:ring-purple-600/25"
                    }`}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full py-3.5 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    theme === "dark" 
                      ? "bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.15)]" 
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  <span>Send Message</span>
                  <span>🚀</span>
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Crazy Footer */}
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
              {[{label:"Features", href:"#features"}, {label:"Services", href:"#services"}, {label:"Courses", href:"#courses"}, {label:"Changelog", href:"/changelog"}].map(link => (
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
        
        {/* Small Footer Extras (Copyright, Legal Warning, Contact) */}
        <div className={`relative z-10 max-w-7xl mx-auto px-6 pb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 border-t pt-8 mt-2 ${theme === "dark" ? "border-white/10" : "border-gray-200"}`}>
            <div className="flex flex-col gap-2 max-w-3xl text-xs px-2">
               <p className={`font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                 © {new Date().getFullYear()} Designed By Getsetai Innovations. Copyright materials under MSME.
               </p>
               <p className={`text-[10px] sm:text-xs leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                 <span className="text-red-500 font-bold uppercase">Warning:</span> Bug Bounty, penetration testing, or any unauthorized testing on the website server is strictly prohibited and will lead to immediate legal action.
               </p>
            </div>
            
            <div className={`flex flex-col items-center md:items-end text-xs font-medium gap-1 lg:pr-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
               <span className="uppercase tracking-wider text-[10px] font-bold mb-1">Contact Details</span>
               <a href="mailto:innovationsgetsetai@gmail.com" className="hover:text-purple-500 transition-colors">innovationsgetsetai@gmail.com</a>
            </div>
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
