"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/types/workout";

import WorkoutCard from "./WorkoutCard";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    getWorkouts()
      .then((data) => {
        if (active) {
          setWorkouts(data);
        }
      })
      .catch(() => {
        if (active) {
          setError(true);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="library"
      className="fit-container scroll-mt-20 pb-12 pt-10 md:pb-16 md:pt-12"
    >
      {/* Section Header */}
      <div className="mb-7">
        <h2 className="fit-display text-2xl font-semibold uppercase leading-none text-white sm:text-3xl">
          THE LIBRARY
        </h2>

        <p className="mt-2 text-sm text-[#7d858e] sm:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid min-h-[400px] place-items-center rounded-lg border border-[#1d2227] bg-[#0d1013]">
          <div className="text-center">
            <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-[#30363d] border-t-[#ccff00]" />

            <p className="fit-display text-sm uppercase tracking-[0.08em] text-[#7b838c]">
              Loading workouts…
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-red-950 bg-[#111418]">
          <div className="flex items-center gap-3 text-sm text-[#9ea5ad]">
            <AlertCircle
              size={19}
              className="shrink-0 text-red-400"
            />

            <span>
              Unable to load workouts. Please refresh.
            </span>
          </div>
        </div>
      )}

      {/* Workout Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      )}
    </section>
  );
}