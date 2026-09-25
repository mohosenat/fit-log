import type { Workout } from "@/types/workout";

const STORAGE_KEYS = {
  plan: "fitlog-plan",
  saved: "fitlog-saved",
} as const;

function readWorkouts(key: string): Workout[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(key);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored) as Workout[];
  } catch {
    return [];
  }
}

function saveWorkouts(key: string, workouts: Workout[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(workouts));
}

export const storage = {
  getPlan: () => readWorkouts(STORAGE_KEYS.plan),

  getSaved: () => readWorkouts(STORAGE_KEYS.saved),

  setPlan: (workouts: Workout[]) => {
    saveWorkouts(STORAGE_KEYS.plan, workouts);
  },

  setSaved: (workouts: Workout[]) => {
    saveWorkouts(STORAGE_KEYS.saved, workouts);
  },
};