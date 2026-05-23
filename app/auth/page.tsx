"use client";

import { FormEvent, Suspense, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../../components/Navbar";

type AuthMode = "login" | "signup";

function cleanRedirect(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }
  return value;
}

function AuthContent() {
  const [theme, setTheme] = useState("dark");
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "login" ? "login" : "signup";
  const next = useMemo(
    () => cleanRedirect(searchParams.get("next")),
    [searchParams]
  );

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const saveProfile = async (
    token: string,
    profile: { fullName: string; phone: string }
  ) => {
    const response = await fetch("/api/save-user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Could not save your profile details");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const supabase = getSupabaseBrowserClient();
      const trimmedEmail = email.trim();

      if (mode === "signup") {
        const profile = {
          fullName: fullName.trim(),
          phone: phone.trim(),
        };

        const { data, error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
          options: {
            data: {
              full_name: profile.fullName,
              phone: profile.phone,
            },
          },
        });

        if (error) throw error;

        if (data.session?.access_token) {
          await saveProfile(data.session.access_token, profile);
          window.location.href = next;
          return;
        }

        setErrorMessage("Signup successful. Please check your email, then login.");
        setMode("login");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (error) throw error;

      window.location.href = next;
    } catch (error) {
      console.error("Auth failed:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Authentication failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-500 overflow-hidden font-sans ${
      theme === "dark" ? "bg-[#020305] text-white selection:bg-purple-500/30" : "bg-gray-50 text-gray-900 selection:bg-purple-500/30"
    }`}>
      
      {/* Grid Background */}
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

      <Navbar theme={theme} setTheme={setTheme} activePage="" />

      {/* Main Container */}
      <main className="relative z-10 max-w-lg mx-auto px-6 pt-36 pb-24 flex flex-col justify-center min-h-[85vh]">
        
        {/* Navigation Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <Link 
            href="/"
            className={`inline-flex items-center gap-2 text-sm font-bold transition-all ${
              theme === "dark" ? "text-purple-300 hover:text-white" : "text-purple-600 hover:text-black"
            }`}
          >
            ← Back to Home
          </Link>
        </motion.div>

        {/* Premium Authentication Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`rounded-2xl border backdrop-blur-md overflow-hidden relative ${
            theme === "dark" ? "border-purple-500/20 bg-[#050508]/60 shadow-2xl" : "border-black/5 bg-white shadow-xl"
          }`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="p-8 md:p-10">
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full ${
              theme === "dark" ? "bg-purple-500/15 text-purple-300" : "bg-purple-100 text-purple-700"
            }`}>
              ⚡ Gateway access
            </span>

            <h1 className="text-3xl font-black mt-4 mb-2 tracking-tight">
              {mode === "signup" ? "Create Account" : "Welcome Back"}
            </h1>
            <p className={`text-xs mb-8 ${theme === "dark" ? "text-zinc-400" : "text-zinc-550"}`}>
              {mode === "signup" ? "Join the learning ecosystem at Getsetai Innovations." : "Login to resume your secure sessions roadmap."}
            </p>

            {/* Toggle Modes */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`rounded-xl py-3.5 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  mode === "signup"
                    ? theme === "dark" ? "bg-white text-black shadow-md" : "bg-black text-white shadow-md"
                    : theme === "dark" ? "border border-white/10 text-zinc-400 hover:text-white bg-white/5" : "border border-black/10 text-zinc-650 hover:text-black bg-gray-55"
                }`}
              >
                Signup
              </button>
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`rounded-xl py-3.5 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  mode === "login"
                    ? theme === "dark" ? "bg-white text-black shadow-md" : "bg-black text-white shadow-md"
                    : theme === "dark" ? "border border-white/10 text-zinc-400 hover:text-white bg-white/5" : "border border-black/10 text-zinc-650 hover:text-black bg-gray-55"
                }`}
              >
                Login
              </button>
            </div>

            {errorMessage && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold"
              >
                ⚠ {errorMessage}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <AnimatePresence mode="wait">
                {mode === "signup" && (
                  <motion.div
                    key="signup-fields"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col gap-4 overflow-hidden"
                  >
                    <div className="flex flex-col gap-1.5">
                      <label className={`text-[10px] font-black uppercase tracking-wider ${theme === "dark" ? "text-zinc-450" : "text-zinc-600"}`}>
                        Full Name
                      </label>
                      <input
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
                          theme === "dark" 
                            ? "bg-white/5 border-white/10 text-white focus:border-purple-500 focus:bg-white/[0.08]" 
                            : "bg-gray-50 border-black/10 text-black focus:border-purple-500 focus:bg-white"
                        }`}
                        placeholder="e.g. John Doe"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className={`text-[10px] font-black uppercase tracking-wider ${theme === "dark" ? "text-zinc-450" : "text-zinc-600"}`}>
                        Phone Number
                      </label>
                      <input
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
                          theme === "dark" 
                            ? "bg-white/5 border-white/10 text-white focus:border-purple-500 focus:bg-white/[0.08]" 
                            : "bg-gray-50 border-black/10 text-black focus:border-purple-500 focus:bg-white"
                        }`}
                        placeholder="+91 92028 93485"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col gap-1.5">
                <label className={`text-[10px] font-black uppercase tracking-wider ${theme === "dark" ? "text-zinc-450" : "text-zinc-600"}`}>
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
                    theme === "dark" 
                      ? "bg-white/5 border-white/10 text-white focus:border-cyan-500 focus:bg-white/[0.08]" 
                      : "bg-gray-50 border-black/10 text-black focus:border-cyan-500 focus:bg-white"
                  }`}
                  placeholder="e.g. you@example.com"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={`text-[10px] font-black uppercase tracking-wider ${theme === "dark" ? "text-zinc-450" : "text-zinc-600"}`}>
                  Security Password
                </label>
                <input
                  required
                  minLength={6}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all outline-none ${
                    theme === "dark" 
                      ? "bg-white/5 border-white/10 text-white focus:border-purple-500 focus:bg-white/[0.08]" 
                      : "bg-gray-50 border-black/10 text-black focus:border-purple-500 focus:bg-white"
                  }`}
                  placeholder="Min 6 characters"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 mt-4 bg-gradient-to-r from-purple-500 via-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{loading ? "Processing..." : mode === "signup" ? "Deploy Credentials" : "Enter Dashboard"}</span>
                <span>⚡</span>
              </motion.button>
            </form>

          </div>
        </motion.div>

      </main>

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

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen text-white flex items-center justify-center px-6">
          <div className="text-sm font-bold uppercase tracking-widest animate-pulse">Initializing Gateway Connection...</div>
        </main>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
