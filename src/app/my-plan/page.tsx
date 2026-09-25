"use client";

import { useEffect, useMemo, useState } from "react";

import PlanStats from "@/components/plan/PlanStats";
import PlanWorkoutCard from "@/components/plan/PlanWorkoutCard";
import EmptyPlan from "@/components/plan/EmptyPlan";
import { useFitLog } from "@/context/FitLogContext";

type Tab = "plan" | "saved";
type SortOption = "default" | "duration" | "calories";

export default function MyPlanPage() {
  const { plan, saved } = useFitLog();

  const [tab, setTab] = useState<Tab>("plan");
  const [sort, setSort] = useState<SortOption>("default");
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
    <main className="min-h-screen bg-[#0b0d0f] text-white">
      <div className="fit-container py-10 md:py-14">
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
          <div className="flex w-fit rounded-lg border border-[#252b32] bg-[#171b21] p-1">
            <button
              type="button"
              onClick={() => setTab("plan")}
              className={`rounded-md px-5 py-2.5 text-sm font-semibold transition ${
                tab === "plan"
                  ? "bg-[#232932] text-white shadow-[inset_0_0_0_1px_#303741]"
                  : "text-[#737b84] hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() => setTab("saved")}
              className={`rounded-md px-5 py-2.5 text-sm font-semibold transition ${
                tab === "saved"
                  ? "bg-[#232932] text-white shadow-[inset_0_0_0_1px_#303741]"
                  : "text-[#737b84] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* SORT */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium uppercase tracking-[0.08em] text-[#626a73]">
              Sort By
            </span>

            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value as SortOption)
              }
              className="h-10 min-w-[120px] cursor-pointer rounded-lg border border-[#252c34] bg-[#111418] px-3 text-sm font-medium text-[#d0d4d8] outline-none transition hover:border-[#343c45] focus:border-[#3a424b]"
            >
              <option value="default">Default</option>
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
            </select>
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