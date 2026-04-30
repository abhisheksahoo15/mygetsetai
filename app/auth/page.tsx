"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type AuthMode = "login" | "signup";

function cleanRedirect(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/checkout/ai";
  }

  return value;
}

function AuthContent() {
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
    <main className="min-h-screen text-white flex items-center justify-center px-6 py-10">
      <section className="glass-shell animated-border w-full max-w-md rounded-lg p-px">
        <div className="rounded-lg bg-black/70 p-8">
          <Link href="/" className="text-sky-200 hover:text-white text-sm transition">
            Back Home
          </Link>

        <h1 className="text-3xl font-bold mt-6 mb-2">
          {mode === "signup" ? "Create Account" : "Login"}
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          {mode === "signup" ? "Join the learning flow" : "Welcome back to CourseHub"}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-6">
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded px-4 py-2 font-semibold text-sm transition ${
              mode === "signup"
                ? "bg-white text-black"
                : "border border-white/15 text-gray-300 hover:border-sky-300 hover:bg-sky-300/10"
            }`}
          >
            Signup
          </button>
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded px-4 py-2 font-semibold text-sm transition ${
              mode === "login"
                ? "bg-white text-black"
                : "border border-white/15 text-gray-300 hover:border-sky-300 hover:bg-sky-300/10"
            }`}
          >
            Login
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              <label className="block">
                <span className="text-sm text-gray-400">Full Name</span>
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2 w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-sky-300"
                  placeholder="John Doe"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-400">Phone</span>
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-sky-300"
                  placeholder="+91 98765 43210"
                />
              </label>
            </>
          )}

          <label className="block">
            <span className="text-sm text-gray-400">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-sky-300"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-400">Password</span>
            <input
              required
              minLength={6}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded border border-white/15 bg-white/5 px-3 py-2 text-white outline-none transition focus:border-sky-300"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="scan-line w-full mt-6 bg-white hover:bg-sky-200 disabled:opacity-50 text-black px-4 py-2 rounded font-semibold transition"
          >
            {loading ? "Processing..." : mode === "signup" ? "Create Account" : "Login"}
          </button>
        </form>
        </div>
      </section>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen text-white flex items-center justify-center px-6">
          Loading...
        </main>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
