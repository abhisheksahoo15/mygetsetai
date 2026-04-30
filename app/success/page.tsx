import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen text-white flex items-center justify-center px-6">
      <div className="glass-shell reveal-up max-w-md w-full rounded-lg p-8 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-sky-300/40 bg-sky-300/10 text-sky-200 font-black mb-4">
          OK
        </div>
        <h1 className="text-3xl font-black mb-4 aurora-text">
          Payment Successful
        </h1>
        <p className="text-gray-300 text-sm mb-8">
          Thank you for enrolling. Check your email for course access details.
        </p>

        <Link
          href="/"
          className="scan-line inline-block bg-white hover:bg-sky-200 text-black font-black px-8 py-3 rounded-lg transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
