"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import PlanStats from "@/components/plan/PlanStats";
import PlanWorkoutCard from "@/components/plan/PlanWorkoutCard";
import EmptyPlan from "@/components/plan/EmptyPlan";
import { useFitLog } from "@/context/FitLogContext";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const { plan, saved } = useFitLog();

  const [tab, setTab] = useState<Tab>("plan");
  const [sort, setSort] = useState<SortOption>("duration");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

    if (window.location.search.includes("tab=saved")) {
      setTab("saved");
    }
  }, []);

  const currentItems = tab === "plan" ? plan : saved;

  const sortedItems = useMemo(() => {
    const items = [...currentItems];

    if (sort === "duration") {
      return items.sort((a, b) => a.duration - b.duration);
    }

    if (sort === "calories") {
      return items.sort(
        (a, b) => a.caloriesBurned - b.caloriesBurned
      );
    }

    if (sort === "rating") {
      return items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [currentItems, sort]);

  const minutes = currentItems.reduce(
    (sum, item) => sum + item.duration,
    0
  );

  const calories = currentItems.reduce(
    (sum, item) => sum + item.caloriesBurned,
    0
  );

  return (
    <main className="bg-[#0b0d0f] text-white">
      <div className="fit-container pt-10 pb-4 md:pt-14 md:pb-6">

        {/* PAGE HEADER */}
        <section className="mb-9">
          <h1 className="fit-display text-4xl font-bold uppercase leading-none tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
            MY PLAN
          </h1>

          <p className="mt-4 max-w-[560px] text-sm leading-6 text-[#747c85] sm:text-base">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </section>

        {/* STATS */}
        <PlanStats
          exercises={currentItems.length}
          minutes={minutes}
          calories={calories}
        />

        {/* TABS + SORT */}
        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* TABS */}
          <div className="inline-flex w-fit items-center rounded-[15px] bg-[#1a1e23] p-[4px]">

            <button
              type="button"
              onClick={() => setTab("plan")}
              className={`h-[38px] rounded-[12px] px-[19px] text-[14px] font-medium leading-none transition-colors duration-200 ${
                tab === "plan"
                  ? "bg-[#0f1115] text-[#ccff00]"
                  : "bg-transparent text-[#737b84] hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() => setTab("saved")}
              className={`h-[38px] rounded-[12px] px-[19px] text-[14px] font-medium leading-none transition-colors duration-200 ${
                tab === "saved"
                  ? "bg-[#0f1115] text-[#ccff00]"
                  : "bg-transparent text-[#737b84] hover:text-white"
              }`}
            >
              Saved
            </button>

          </div>

          {/* SORT */}
          <div className="flex items-center gap-3">

            <span className="text-sm font-medium text-[#626a73]">
              Sort By
            </span>

            <div className="relative">

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value as SortOption)
                }
                className="h-10 min-w-[130px] cursor-pointer appearance-none rounded-lg border border-[#252c34] bg-[#111418] py-0 pl-3 pr-9 text-sm font-medium text-[#d0d4d8] outline-none transition-colors duration-200 hover:border-[#3a424b] focus:border-[#ccff00]"
              >
                <option value="duration">
                  Duration
                </option>

                <option value="calories">
                  Calories
                </option>

                <option value="rating">
                  Rating
                </option>
              </select>

              <ChevronDown
                size={15}
                strokeWidth={2}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#737b84]"
              />

            </div>

          </div>

        </div>

        {/* WORKOUT LIST */}
        <div className="mt-7 space-y-3">

          {!hydrated ? (
            <div className="grid min-h-[280px] place-items-center rounded-lg border border-[#20252b] bg-[#111418]">

              <div className="text-center">

                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#30363d] border-t-[#ccff00]" />

                <p className="fit-display text-sm uppercase tracking-[0.08em] text-[#6f7780]">
                  Loading workouts…
                </p>

              </div>

            </div>
          ) : sortedItems.length === 0 ? (
            <EmptyPlan />
          ) : (
            sortedItems.map((workout) => (
              <PlanWorkoutCard
                key={workout.id}
                workout={workout}
                savedTab={tab === "saved"}
              />
            ))
          )}

        </div>

      </div>
    </main>
  );
}