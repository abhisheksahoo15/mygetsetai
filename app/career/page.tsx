import Link from "next/link";
import { courses } from "@/data/courses";

const roles = [
  {
    title: "AI Project Builder",
    detail: "Turn prompts, logic, and small automation ideas into working demos.",
  },
  {
    title: "Python Developer",
    detail: "Build scripts, backend basics, and practical tools for everyday problems.",
  },
  {
    title: "ML Starter",
    detail: "Learn model thinking, datasets, evaluation, and portfolio-ready workflows.",
  },
];

const steps = [
  "Pick one skill track",
  "Finish the core lessons",
  "Build a visible project",
  "Apply with proof of work",
];

export default function CareerPage() {
  return (
    <main className="min-h-screen overflow-hidden text-white">
      <section className="mx-auto w-full max-w-7xl px-5 py-5 sm:px-6 lg:px-8">
        <nav className="glass-shell reveal-up flex flex-col gap-4 rounded-lg px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-sm font-black text-black">
              AI
            </span>
            <span className="text-lg font-bold">CourseHub</span>
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/#courses"
              className="rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              Courses
            </Link>
            <Link
              href="/auth?mode=login"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold transition hover:border-sky-300 hover:bg-sky-300/10"
            >
              Sign In
            </Link>
            <Link
              href="/auth?mode=signup"
              className="rounded-lg bg-white px-4 py-2 text-sm font-black text-black transition hover:bg-sky-200"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        <section className="grid items-center gap-10 py-20 lg:grid-cols-[1fr_0.9fr]">
          <div className="reveal-up-delay">
            <p className="mb-4 text-sm font-bold uppercase text-sky-200">Career Path</p>
            <h1 className="max-w-3xl text-5xl font-black leading-tight sm:text-6xl">
              Build a sharper path into{" "}
              <span className="aurora-text">AI careers</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              Start with a focused course, convert lessons into projects, and
              move toward roles that reward practical proof.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#courses"
                className="scan-line rounded-lg bg-white px-6 py-3 text-center font-black text-black transition hover:bg-sky-200"
              >
                Choose a Course
              </Link>
              <Link
                href="/auth?mode=signup"
                className="rounded-lg border border-white/15 px-6 py-3 text-center font-bold transition hover:border-fuchsia-300 hover:bg-fuchsia-300/10"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div className="animated-border rounded-lg p-px">
            <div className="glass-shell rounded-lg p-6">
              <p className="mb-5 text-sm font-bold text-zinc-300">Career momentum loop</p>
              <div className="grid gap-3">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-4 rounded-lg border border-white/10 bg-black/35 p-4"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-sm font-black text-black">
                      {index + 1}
                    </span>
                    <span className="font-bold">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {roles.map((role) => (
            <article
              key={role.title}
              className="glass-shell rounded-lg p-6 transition duration-300 hover:-translate-y-2 hover:border-sky-300/60"
            >
              <h2 className="text-xl font-black">{role.title}</h2>
              <p className="mt-4 text-sm leading-6 text-zinc-300">{role.detail}</p>
            </article>
          ))}
        </section>

        <section className="py-20">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase text-fuchsia-200">Start Here</p>
            <h2 className="mt-3 text-4xl font-black">Match a course to your goal</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group rounded-lg border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/60 hover:bg-white/10"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 bg-white/10 text-sm font-black text-sky-200">
                  {course.icon}
                </span>
                <h3 className="mt-5 text-xl font-black">{course.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{course.description}</p>
                <p className="mt-5 text-sm font-bold text-sky-200">View course</p>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
