"use client";

import { Bookmark, CalendarPlus, Check } from "lucide-react";
import type { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";

function Spec({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex h-[48px] items-center justify-between border-b border-[#20252b] px-5 last:border-b-0">
      <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#69717a]">
        {label}
      </span>

      <span className="text-[12px] font-medium text-[#d6d9dc]">
        {value}
      </span>
    </div>
  );
}

export default function WorkoutDetails({
  workout,
}: {
  workout: Workout;
}) {
  const { addToPlan, saveWorkout, isInPlan, isSaved } = useFitLog();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
   <main className="fit-container pb-6 pt-20 md:pb-0 md:pt-24">
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.04fr_.96fr] lg:gap-10">

        {/* ================= LEFT IMAGE ================= */}
        <div className="overflow-hidden rounded-[10px]">
         <div className="aspect-[5/6] w-full">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="flex min-w-0 flex-col">

          {/* TITLE */}
          <h1 className="fit-display text-[38px] font-bold uppercase leading-[0.95] tracking-[-0.025em] text-white sm:text-[42px]">
            {workout.name}
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-5 max-w-[600px] text-[13px] leading-[1.75] text-[#858c94]">
            {workout.description}
          </p>

          {/* TAGS */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {workout.muscleGroups.slice(0, 2).map((group) => (
              <span
                key={group}
                className="rounded-full bg-[#ccff00] px-3 py-[6px] text-[10px] font-extrabold uppercase leading-none text-[#0b0d0f]"
              >
                {group}
              </span>
            ))}
          </div>

          {/* ================= SPEC CARD ================= */}
          <div className="mt-6 overflow-hidden rounded-[8px] border border-[#20252b] bg-[#15181e]">
            <Spec
              label="Equipment"
              value={workout.equipment}
            />

            <Spec
              label="Difficulty"
              value={workout.difficulty}
            />

            <Spec
              label="Sets"
              value={workout.sets}
            />

            <Spec
              label="Reps"
              value={workout.reps}
            />

            <Spec
              label="Duration"
              value={`${workout.duration} min`}
            />

            <Spec
              label="Calories"
              value={`${workout.caloriesBurned} kcal`}
            />

            <Spec
              label="Rating"
              value={workout.rating}
            />
          </div>

          {/* ================= INSTRUCTIONS ================= */}
          <div className="mt-8">
            <h2 className="fit-display text-[17px] font-bold uppercase tracking-[0.01em] text-white">
              Instructions
            </h2>

            <ol className="mt-4 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={`${instruction}-${index}`}
                  className="flex gap-3 text-[12px] leading-[1.7] text-[#858c94]"
                >
                  <span className="shrink-0 text-[#858c94]">
                    {index + 1}.
                  </span>

                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="mt-8 flex items-center gap-2 sm:gap-3">

            {/* ADD TO PLAN */}
            <button
              type="button"
              onClick={() => addToPlan(workout)}
              disabled={inPlan}
              className="flex h-[36px] flex-1 items-center justify-center gap-1.5 rounded-[5px] bg-[#ccff00] px-3 text-[9px] font-extrabold uppercase text-[#0b0d0f] transition hover:brightness-105 disabled:cursor-default disabled:opacity-60 sm:h-[40px] sm:flex-none sm:gap-2 sm:px-5 sm:text-[10px]"
            >
              {inPlan ? (
                <Check size={13} strokeWidth={2.5} />
              ) : (
                <CalendarPlus size={13} strokeWidth={2.5} />
              )}

              {inPlan
                ? "In today's plan"
                : "Add to today's plan"}
            </button>

            {/* SAVE */}
            <button
              type="button"
              onClick={() => saveWorkout(workout)}
              disabled={saved}
            className="flex h-[36px] flex-1 items-center justify-center gap-1.5 rounded-[5px] border border-[#343b43] bg-transparent px-3 text-[9px] font-semibold uppercase text-[#c5c9ce] transition hover:border-[#ccff00] hover:text-white disabled:cursor-default disabled:opacity-60 sm:h-[40px] sm:flex-none sm:gap-2 sm:px-5 sm:text-[10px]"
            >
              {saved ? (
                <Check size={13} strokeWidth={2.5} />
              ) : (
                <Bookmark size={13} strokeWidth={2} />
              )}

              {saved ? "Saved" : "Save for later"}
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}