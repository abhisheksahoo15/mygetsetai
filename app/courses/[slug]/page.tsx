import { courses } from "@/data/courses";
import Link from "next/link";
import { notFound } from "next/navigation";

type CoursePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);

  if (!course) notFound();

  return (
    <main className="min-h-screen text-white px-6 py-10">
      <section className="max-w-4xl mx-auto">
        <Link href="/" className="text-sky-200 hover:text-white text-sm transition">
          Back Home
        </Link>

        <div className="reveal-up mt-8">
          <div className="glass-shell rounded-lg p-6 md:p-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-lg font-black text-sky-200 mb-4">
              {course.icon}
            </div>
            <p className="mb-3 text-sm font-bold uppercase text-fuchsia-200">Course Track</p>
            <h1 className="text-4xl font-black mb-4 md:text-5xl">{course.title}</h1>
            <p className="text-lg leading-8 text-gray-300 mb-8">{course.description}</p>
          </div>

          <div className="glass-shell mt-6 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">What You Will Learn</h2>
            <ul className="space-y-2">
              {course.syllabus.map((item) => (
                <li key={item} className="text-gray-300 flex items-start">
                  <span className="text-sky-300 mr-3">-</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-3xl font-black text-sky-200">Rs {course.price}</p>
            <Link
              href={`/auth?mode=signup&next=/checkout/${course.slug}`}
              className="scan-line bg-white hover:bg-sky-200 text-black px-8 py-3 rounded-lg font-black text-center transition"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
