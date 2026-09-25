import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

import type { Workout } from "@/types/workout";

export default function WorkoutCard({
  workout,
}: {
  workout: Workout;
}) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group fit-card block overflow-hidden transition duration-200 hover:-translate-y-1 hover:border-[#384047]"
    >
      {/* IMAGE */}
      <div className="aspect-[1.82] overflow-hidden bg-[#181c20]">
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* MUSCLE GROUP BADGES */}
        <div className="mb-3 flex min-h-[22px] flex-wrap items-center gap-2">
          {workout.muscleGroups.slice(0, 2).map((group) => (
            <span
              key={group}
              className="inline-flex h-[22px] items-center rounded-[3px] bg-[#ccff00] px-2.5 text-[10px] font-extrabold uppercase leading-none tracking-[0.03em] text-black"
            >
              {group}
            </span>
          ))}
        </div>

        {/* TITLE */}
        <h3 className="fit-display truncate text-base font-semibold uppercase leading-tight text-white sm:text-lg">
          {workout.name}
        </h3>

        {/* EQUIPMENT */}
        <p className="mt-1.5 truncate text-sm text-[#777e87]">
          {workout.equipment}
        </p>

        {/* STATS */}
        <div className="mt-4 flex items-center gap-4 text-xs text-[#737b84]">
          <span className="flex items-center gap-1.5">
            <Clock3 size={13} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1.5">
            <Flame size={13} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1.5">
            <Star size={13} />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}