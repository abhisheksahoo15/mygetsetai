/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";

export default function ContactPage() {
  const [theme, setTheme] = useState("dark");
  const [activeMap, setActiveMap] = useState("bhilai"); // bhilai | bengaluru
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
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
    <div className={`relative min-h-screen transition-colors duration-500 overflow-hidden font-sans ${theme === "dark" ? "bg-[#020305] text-white selection:bg-purple-500/30" : "bg-gray-50 text-gray-900 selection:bg-purple-500/30"}`}>
      
      {/* Grid Pattern Background */}
      <div className={`absolute inset-0 z-0 bg-[linear-gradient(to_right,${theme==="dark"?"#4f4f4f1e":"#0000000a"}_1px,transparent_1px),linear-gradient(to_bottom,${theme==="dark"?"#4f4f4f1e":"#0000000a"}_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none transition-colors duration-500`}></div>
      
      {/* Floating Ambient Glows */}
      <div className="absolute top-0 flex justify-center w-full z-0 pointer-events-none">
        <div className={`w-[800px] h-[500px] blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse-slow ${theme === "dark" ? "bg-purple-900/20" : "bg-purple-300/25"}`}></div>
      </div>
      <div className="absolute bottom-20 right-[-10%] z-0 pointer-events-none">
        <div className={`w-[500px] h-[500px] blur-[120px] rounded-full mix-blend-screen opacity-30 ${theme === "dark" ? "bg-cyan-900/20" : "bg-cyan-300/20"}`}></div>
      </div>

      <Navbar theme={theme} setTheme={setTheme} activePage="contact" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-24">
        
        {/* Header Section */}
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="visible" 
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border transition backdrop-blur-md text-xs font-bold uppercase tracking-widest ${theme === "dark" ? "border-white/10 bg-white/5 text-purple-300 shadow-lg shadow-white/5" : "border-black/5 bg-black/5 text-purple-700 shadow-sm"}`}>
              ✦ Connect With Us
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6"
          >
            Let's build the
            <br />
            <motion.span 
               animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
               transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
               className="text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
            >
              future together
            </motion.span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp} 
            className={`text-base md:text-lg max-w-2xl text-center leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            Reach out to our core team for enterprise AI integrations, custom software architectures, and collaborative robotics partnerships.
          </motion.p>
        </motion.div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cards & General Contact Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Hotline Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl border transition-all ${
                theme === "dark"
                  ? "bg-gradient-to-br from-amber-950/20 to-orange-950/10 border-amber-500/20 hover:border-amber-500/40"
                  : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:border-amber-300"
              }`}
            >
              <h3 className="text-amber-500 font-bold mb-2 uppercase tracking-wider text-xs flex items-center gap-2">
                📞 Direct Hotline
              </h3>
              <a href="tel:+919202893485" className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 transition-colors">
                +91 92028 93485
              </a>
              <div className="flex flex-col gap-1 mt-4">
                <span className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>Office Hours:</span>
                <span className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Mon - Sat, 10:00 AM - 7:00 PM (IST)
                </span>
              </div>
            </motion.div>

            {/* Email Support Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className={`p-6 rounded-2xl border transition-all ${
                theme === "dark"
                  ? "bg-gradient-to-br from-cyan-950/20 to-blue-950/10 border-cyan-500/20 hover:border-cyan-500/40"
                  : "bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-300"
              }`}
            >
              <h3 className="text-cyan-500 font-bold mb-2 uppercase tracking-wider text-xs flex items-center gap-2">
                ✉️ Operations & Inquiries
              </h3>
              <a href="mailto:innovationsgetsetai@gmail.com" className="text-lg md:text-xl font-bold text-cyan-400 hover:underline hover:text-cyan-300 break-words">
                innovationsgetsetai@gmail.com
              </a>
              <p className={`text-xs mt-3 ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
                Typical Response Time: Within 2 - 4 business hours.
              </p>
            </motion.div>

            {/* Location Cards */}
            <div className="flex flex-col gap-4">
              <h4 className={`text-xs font-bold uppercase tracking-[0.2em] mb-1 ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                Our Facilities & Offices
              </h4>

              {/* Primary HQ Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={() => setActiveMap("bhilai")}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  activeMap === "bhilai"
                    ? theme === "dark"
                      ? "bg-white/[0.04] border-purple-500/40 shadow-[0_8px_30px_rgba(168,85,247,0.15)]"
                      : "bg-purple-100/50 border-purple-300 shadow-md"
                    : theme === "dark"
                      ? "bg-white/[0.01] border-white/5 hover:border-white/20"
                      : "bg-white border-black/5 hover:border-black/15 shadow-sm"
                }`}
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🏢</span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-0.5 rounded-full ${
                      theme === "dark"
                        ? "bg-purple-500/15 text-purple-300 border border-purple-500/25"
                        : "bg-purple-100 text-purple-700 border border-purple-200"
                    }`}>
                      HQ · Innovation Center
                    </span>
                  </div>
                  {activeMap === "bhilai" && (
                    <span className="text-[10px] text-purple-400 font-bold">● Active View</span>
                  )}
                </div>
                <p className={`text-sm font-bold leading-snug ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Vivekananda Nagar, Kohka
                </p>
                <p className={`text-xs mt-0.5 ${theme === "dark" ? "text-purple-300/80" : "text-purple-600"}`}>
                  Bhilai Nagar, Chhattisgarh 490023
                </p>
              </motion.div>

              {/* Cloud HQ Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                onClick={() => setActiveMap("bengaluru")}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  activeMap === "bengaluru"
                    ? theme === "dark"
                      ? "bg-white/[0.04] border-cyan-500/40 shadow-[0_8px_30px_rgba(56,189,248,0.15)]"
                      : "bg-cyan-100/50 border-cyan-300 shadow-md"
                    : theme === "dark"
                      ? "bg-white/[0.01] border-white/5 hover:border-white/20"
                      : "bg-white border-black/5 hover:border-black/15 shadow-sm"
                }`}
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">☁️</span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-0.5 rounded-full ${
                      theme === "dark"
                        ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/25"
                        : "bg-cyan-100 text-cyan-700 border border-cyan-200"
                    }`}>
                      Cloud HQ
                    </span>
                  </div>
                  {activeMap === "bengaluru" && (
                    <span className="text-[10px] text-cyan-400 font-bold">● Active View</span>
                  )}
                </div>
                <p className={`text-sm font-bold leading-snug ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Kodigehalli Ayappa Nagar
                </p>
                <p className={`text-xs mt-0.5 ${theme === "dark" ? "text-cyan-300/80" : "text-cyan-600"}`}>
                  Bengaluru, Karnataka 560067
                </p>
              </motion.div>
            </div>

          </div>

          {/* Right Column: Dynamic Maps & Contact Form (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            
            {/* Interactive Map Component */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className={`rounded-2xl border overflow-hidden backdrop-blur-md shadow-lg ${
                theme === "dark" ? "border-white/10 bg-[#050508]/60" : "border-black/5 bg-white/70"
              }`}
            >
              {/* Map Tabs Header */}
              <div className={`flex items-center justify-between border-b px-5 py-3 ${
                theme === "dark" ? "border-white/5" : "border-black/5"
              }`}>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span className={`text-[11px] font-black uppercase tracking-wider ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Live Interactive Maps
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setActiveMap("bhilai")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeMap === "bhilai" 
                        ? theme === "dark" ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-700"
                        : theme === "dark" ? "text-zinc-500 hover:text-white" : "text-zinc-500 hover:text-black"
                    }`}
                  >
                    Bhilai
                  </button>
                  <button 
                    onClick={() => setActiveMap("bengaluru")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeMap === "bengaluru" 
                        ? theme === "dark" ? "bg-cyan-500/20 text-cyan-300" : "bg-cyan-100 text-cyan-700"
                        : theme === "dark" ? "text-zinc-500 hover:text-white" : "text-zinc-500 hover:text-black"
                    }`}
                  >
                    Bengaluru
                  </button>
                </div>
              </div>

              {/* Map Content Viewport */}
              <div className="relative h-[320px] md:h-[380px] w-full">
                <AnimatePresence mode="wait">
                  {activeMap === "bhilai" ? (
                    <motion.div
                      key="bhilai-map"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <iframe
                        title="Getsetai - Bhilai HQ Map"
                        src="https://www.google.com/maps?q=Vivekananda+Nagar+Kohka+Bhilai+Chhattisgarh+490023&z=15&output=embed"
                        width="100%"
                        height="100%"
                        className="border-0 w-full h-full"
                        loading="lazy"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="bengaluru-map"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <iframe
                        title="Getsetai - Kodigehalli Map"
                        src="https://www.google.com/maps?q=Kodigehalli+Ayappa+Nagar+Bengaluru+KA+560067&z=15&output=embed"
                        width="100%"
                        height="100%"
                        className="border-0 w-full h-full"
                        loading="lazy"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Futuristic Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className={`p-8 rounded-2xl border backdrop-blur-md relative overflow-hidden ${
                theme === "dark" 
                  ? "border-white/10 bg-[#050508]/40 shadow-2xl" 
                  : "border-black/5 bg-white shadow-xl"
              }`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/10 to-purple-500/5 rounded-bl-full pointer-events-none" />
              
              <h3 className={`text-xl font-bold mb-1 flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                <span>✉️ Reach Out Instantly</span>
              </h3>
              <p className={`text-xs mb-6 ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
                Fill out the secure communication terminal below to forward your message directly to our directors.
              </p>

              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-3xl mb-4 animate-bounce">
                      🚀
                    </div>
                    <h4 className="text-xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      Transmission Dispatched!
                    </h4>
                    <p className={`text-sm max-w-sm leading-relaxed ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
                      Thank you for contacting Getsetai Innovations. Our executives have received your details and will initiate a connection shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className={`text-[10px] font-black uppercase tracking-wider ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
                            theme === "dark" 
                              ? "bg-white/5 border-white/10 text-white focus:border-purple-500 focus:bg-white/[0.08]" 
                              : "bg-gray-50 border-black/10 text-black focus:border-purple-500 focus:bg-white"
                          }`}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className={`text-[10px] font-black uppercase tracking-wider ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
                            theme === "dark" 
                              ? "bg-white/5 border-white/10 text-white focus:border-cyan-500 focus:bg-white/[0.08]" 
                              : "bg-gray-50 border-black/10 text-black focus:border-cyan-500 focus:bg-white"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className={`text-[10px] font-black uppercase tracking-wider ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        placeholder="e.g. AI Integration Partnership"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
                          theme === "dark" 
                            ? "bg-white/5 border-white/10 text-white focus:border-purple-500 focus:bg-white/[0.08]" 
                            : "bg-gray-50 border-black/10 text-black focus:border-purple-500 focus:bg-white"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className={`text-[10px] font-black uppercase tracking-wider ${theme === "dark" ? "text-zinc-400" : "text-zinc-600"}`}>
                        Message / Scope
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Detail your technology needs, timeline, or consultation goals..."
                        value={formData.message}
                        onChange={handleChange}
                        className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none resize-none ${
                          theme === "dark" 
                            ? "bg-white/5 border-white/10 text-white focus:border-cyan-500 focus:bg-white/[0.08]" 
                            : "bg-gray-50 border-black/10 text-black focus:border-cyan-500 focus:bg-white"
                        }`}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, boxShadow: theme === "dark" ? "0 0 25px rgba(168,85,247,0.3)" : "0 8px 20px rgba(0,0,0,0.06)" }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 mt-2 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white flex items-center justify-center gap-2`}
                    >
                      <span>Send Dispatch Terminal</span>
                      <span>⚡</span>
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>

          </div>

        </div>

      </main>

      {/* Footer matching standard landing & careers layout */}
      <footer className={`relative z-10 border-t overflow-hidden pt-20 transition-colors duration-500 ${theme === "dark" ? "border-white/10 bg-[#020305]" : "border-gray-200 bg-white"}`}>
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
              {['𝕏', 'in', 'GH'].map((icon) => (
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
        
        {/* Animated Brand Wordmark */}
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
