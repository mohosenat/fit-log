import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#0b0d0f] text-white">
      <div className="fit-container flex min-h-[calc(100vh-64px)] items-center justify-center py-16">
        <div className="text-center">

          {/* 404 */}
          <p className="fit-display text-[90px] font-bold leading-none tracking-[-0.05em] text-[#ccff00] sm:text-[120px]">
            404
          </p>

          {/* Title */}
          <h1 className="fit-display mt-4 text-3xl font-bold uppercase tracking-[-0.02em] text-white sm:text-4xl">
            Workout Not Found
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-[430px] text-sm leading-6 text-[#747c85]">
            The workout or page you&apos;re looking for doesn&apos;t exist.
            Head back to the workout library and keep training.
          </p>

          {/* Button */}
          <Link
            href="/"
            className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-[#ccff00] px-6 text-sm font-semibold text-[#0b0d0f] transition-all duration-200 hover:brightness-105 hover:scale-[1.02] active:scale-[0.98]"
          >
            Go to workouts
          </Link>

        </div>
      </div>
    </main>
  );
}