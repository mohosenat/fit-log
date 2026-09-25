import Link from "next/link";

export default function EmptyPlan() {
  return (
    <div className="grid min-h-[300px] place-items-center rounded-[10px] border border-dashed border-[#2b3138] bg-[#0d1013] px-6 py-12 text-center">
      <div>
        {/* TITLE */}
        <h2 className="fit-display text-[24px] font-semibold uppercase tracking-[-0.01em] text-white sm:text-[26px]">
          Nothing here yet
        </h2>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-3 max-w-[380px] text-xs leading-6 text-[#6e7680] sm:text-[13px]">
          Browse the library and add a lift to get today moving.
        </p>

        {/* BUTTON */}
   <Link
          href="/"
          className="mt-6 inline-flex h-[36px] items-center justify-center rounded-full bg-[#ccff00] px-6 text-[12px] font-semibold !text-[#0b0d0f] transition-all duration-200 hover:-translate-y-[1px] hover:brightness-105"
        >
          Go to workouts
        </Link>
      </div>
    </div>
  );
}