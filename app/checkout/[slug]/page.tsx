"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { courses } from "@/data/courses";
import { getSupabaseBrowserClient } from "@/lib/supabase";

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
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const slug = params.slug as string;
  const course = courses.find((item) => item.slug === slug);

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
        name: "AI CourseHub",
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

  return (
    <main className="min-h-screen text-white px-6 py-10">
      <section className="max-w-2xl mx-auto">
        <Link
          href={`/courses/${course.slug}`}
          className="text-sky-200 hover:text-white text-sm transition"
        >
          Back to Course
        </Link>

        <div className="glass-shell animated-border mt-8 rounded-lg p-px">
          <div className="rounded-lg bg-black/70 p-8">
          <p className="mb-3 text-sm font-bold uppercase text-fuchsia-200">Secure Payment</p>
          <h1 className="text-3xl font-black mb-6">Checkout</h1>

          <div className="border border-white/10 rounded-lg p-6 bg-white/[0.04] mb-8">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-sm font-black text-sky-200 mb-3">
              {course.icon}
            </div>
            <h2 className="text-2xl font-black mb-2">{course.title}</h2>
            <p className="text-gray-300 text-sm mb-4">{course.description}</p>
            <p className="text-3xl font-black text-sky-200">Rs {course.price}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="scan-line w-full bg-white hover:bg-sky-200 disabled:opacity-50 text-black px-6 py-3 rounded-lg font-black transition"
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>
          </div>
        </div>
      </section>
    </main>
  );
}
