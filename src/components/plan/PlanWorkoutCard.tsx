"use client";

import Link from "next/link";
import { Check, Clock3, Flame, Star, X } from "lucide-react";

import type { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";

export default function PlanWorkoutCard({
  workout,
  savedTab = false,
}: {
  workout: Workout;
  savedTab?: boolean;
}) {
  const {
    removeFromPlan,
    removeFromSaved,
    markDone,
    doneIds,
  } = useFitLog();

  const done = doneIds.includes(workout.id);

  const handleRemove = () => {
    if (savedTab) {
      removeFromSaved(workout.id);
    } else {
      removeFromPlan(workout.id);
    }
  };

  return (
    <article className="rounded-lg border border-[#20252b] bg-[#111418] p-4 transition hover:border-[#303740] sm:p-5">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* IMAGE */}
        <div className="h-44 w-full shrink-0 overflow-hidden rounded-md bg-[#191d21] sm:h-20 sm:w-36 md:h-24 md:w-44">
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* WORKOUT INFO */}
        <div className="min-w-0 flex-1">
          <h3 className="fit-display truncate text-lg font-semibold uppercase leading-tight text-white md:text-xl">
            {workout.name}
          </h3>

          <p className="mt-1.5 truncate text-sm text-[#737b84]">
            {workout.equipment}
          </p>

          {/* STATS */}
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#737b84]">
            {/* Duration */}
            <span className="flex items-center gap-1.5">
              <Clock3
                size={14}
                strokeWidth={2}
                className="text-[#ccff00]"
              />
              {workout.duration} min
            </span>

            {/* Calories */}
            <span className="flex items-center gap-1.5">
              <Flame
                size={14}
                strokeWidth={2}
                className="text-[#ccff00]"
              />
              {workout.caloriesBurned} kcal
            </span>

            {/* Rating */}
            <span className="flex items-center gap-1.5">
              <Star
                size={14}
                strokeWidth={2}
                className="text-[#ccff00]"
              />
              {workout.rating}
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap">
          {/* VIEW DETAILS */}
          <Link
            href={`/workout/${workout.id}`}
            className="flex h-10 items-center justify-center whitespace-nowrap rounded-full border border-[#343b44] px-5 text-sm font-medium text-[#d2d6da] transition hover:border-[#59616b] hover:text-white"
          >
            View Details
          </Link>

          {/* MARK AS DONE */}
          {!savedTab && (
            <button
              type="button"
              onClick={() => markDone(workout.id)}
              disabled={done}
              className={`flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-bold transition ${
                done
                  ? "bg-[#263000] text-[#ccff00]"
                  : "bg-[#ccff00] text-[#0b0d0f] hover:brightness-105"
              }`}
            >
              <Check size={14} strokeWidth={2.8} />

              {done ? "Done" : "Mark as Done"}
            </button>
          )}

          {/* REMOVE */}
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove workout"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#69717a] transition hover:bg-[#1b2026] hover:text-white"
          >
            <X size={18} strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </article>
  );
}