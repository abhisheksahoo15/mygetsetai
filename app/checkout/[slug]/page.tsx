"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { courses } from "@/data/courses";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Navbar } from "../../../components/Navbar";


function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const [theme, setTheme] = useState("dark");
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push(`/auth?mode=signup&next=/checkout/${course.slug}`);
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setError("Payment gateway unavailable. Try again.");
        return;
      }

      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: course.slug }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        setError(orderData.error || "Failed to create order.");
        return;
      }

      const options: RazorpayCheckoutOptions = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Getsetai Innovations",
        description: course.title,
        order_id: orderData.order.id,
        handler: async (response) => {
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseSlug: course.slug,
              courseTitle: course.title,
              amount: course.price,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyResponse.ok && verifyData.success) {
            router.push(`/success?course=${course.slug}`);
            return;
          }

          setError(verifyData.error || "Payment verification failed.");
        },
        prefill: {
          name: session.user.user_metadata?.full_name ?? "Student",
          email: session.user.email ?? "",
          contact: session.user.user_metadata?.phone,
        },
        theme: {
          color: "#a855f7",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (paymentError) {
      console.error("Payment error:", paymentError);
      setError("Something went wrong while starting payment.");
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
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

      {/* Main Container */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-36 pb-24">
        
        {/* Navigation Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <Link 
            href={`/courses/${course.slug}`}
            className={`inline-flex items-center gap-2 text-sm font-bold transition-all ${
              theme === "dark" ? "text-purple-300 hover:text-white" : "text-purple-600 hover:text-black"
            }`}
          >
            ← Back to Course Detail
          </Link>
        </motion.div>

        {/* Premium Checkout Interface */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
          className={`rounded-2xl border backdrop-blur-md overflow-hidden relative ${
            theme === "dark" ? "border-purple-500/20 bg-[#050508]/60 shadow-2xl" : "border-black/5 bg-white shadow-xl"
          }`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/15 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="p-8 md:p-10">
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full ${
              theme === "dark" ? "bg-purple-500/15 text-purple-300" : "bg-purple-100 text-purple-700"
            }`}>
              🔒 Secure Gateways
            </span>
            
            <h1 className="text-3xl font-black mt-4 mb-2 tracking-tight">
              Checkout
            </h1>
            <p className={`text-xs mb-8 ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
              Enroll in your premium session track using automated Razorpay checkout.
            </p>

            {/* Course Summary Card */}
            <div className={`p-6 rounded-xl border border-dashed mb-8 relative overflow-hidden ${
              theme === "dark" ? "border-white/10 bg-white/[0.02]" : "border-black/10 bg-gray-50/50"
            }`}>
              <div className="flex items-start gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl ${
                  theme === "dark" ? "bg-white/5 border border-white/10" : "bg-purple-50 border border-purple-100"
                }`}>
                  {course.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight mb-1">{course.title}</h2>
                  <p className={`text-xs leading-relaxed mb-4 ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
                    {course.description}
                  </p>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                      ₹{course.price}
                    </span>
                    <span className={`text-[10px] ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                      One-time payment
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold"
              >
                ⚠ {error}
              </motion.div>
            )}

            {/* Action Trigger Button */}
            <motion.button
              onClick={handlePayment}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 bg-gradient-to-r from-purple-500 via-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? "Initializing Secure Gateway..." : "Proceed to Buy Now"}</span>
              <span>⚡</span>
            </motion.button>

            <div className={`mt-6 text-center text-[10px] ${theme === "dark" ? "text-zinc-500" : "text-zinc-450"}`}>
              By completing your order, you agree to Getsetai Innovations' terms and user privacy guides.
            </div>

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
