export default function PlanStats({
  exercises,
  minutes,
  calories,
}: {
  exercises: number;
  minutes: number;
  calories: number;
}) {
  const stats = [
    { label: "Exercises", value: exercises },
    { label: "Minutes", value: minutes },
    { label: "Calories", value: calories },
  ];

  return (
    <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-[#20252b] bg-[#111418]">
      {stats.map(({ label, value }, index) => (
        <div
          key={label}
          className={`relative px-4 py-6 sm:px-6 sm:py-7 md:px-8 ${
            index !== 0
              ? "before:absolute before:left-0 before:top-1/2 before:h-12 before:w-px before:-translate-y-1/2 before:bg-[#20252b]"
              : ""
          }`}
        >
          {/* LABEL */}
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-[#737b84] sm:text-sm">
            {label}
          </span>

          {/* VALUE */}
          <p
            className={`fit-display mt-2 text-3xl font-semibold leading-none sm:text-4xl ${
              label === "Exercises"
                ? "text-[#ccff00]"
                : "text-white"
            }`}
          >
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}