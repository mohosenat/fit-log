"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";

import type { Workout } from "@/types/workout";
import { storage } from "@/lib/storage";

type FitLogContextValue = {
  plan: Workout[];
  saved: Workout[];
  doneIds: number[];

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;

  saveWorkout: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;

  markDone: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
};

const FitLogContext = createContext<FitLogContextValue | undefined>(
  undefined
);

const DONE_STORAGE_KEY = "fitlog-done";
const MAX_PLAN_ITEMS = 5;

export function FitLogProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);

  // Load saved FitLog data on the client.
  useEffect(() => {
    setPlan(storage.getPlan());
    setSaved(storage.getSaved());

    try {
      const storedDoneIds = localStorage.getItem(DONE_STORAGE_KEY);

      if (storedDoneIds) {
        setDoneIds(JSON.parse(storedDoneIds));
      }
    } catch {
      setDoneIds([]);
    }
  }, []);

  const updatePlan = useCallback((items: Workout[]) => {
    setPlan(items);
    storage.setPlan(items);
  }, []);

  const updateSaved = useCallback((items: Workout[]) => {
    setSaved(items);
    storage.setSaved(items);
  }, []);

  const addToPlan = useCallback(
    (workout: Workout) => {
      if (plan.some((item) => item.id === workout.id)) {
        toast("Already in today's plan");
        return;
      }

      if (plan.length >= MAX_PLAN_ITEMS) {
        toast.error("Today's plan is limited to 5 lifts");
        return;
      }

      updatePlan([...plan, workout]);
      toast.success("Added to today's plan");
    },
    [plan, updatePlan]
  );

  const removeFromPlan = useCallback(
  (id: number) => {
    updatePlan(plan.filter((item) => item.id !== id));

    setDoneIds((currentIds) => {
      const nextIds = currentIds.filter(
        (doneId) => doneId !== id
      );

      localStorage.setItem(
        DONE_STORAGE_KEY,
        JSON.stringify(nextIds)
      );

      return nextIds;
    });

    toast.success("Removed from today's plan");
  },
  [plan, updatePlan]
);

  const saveWorkout = useCallback(
    (workout: Workout) => {
      if (saved.some((item) => item.id === workout.id)) {
        toast("Already saved");
        return;
      }

      updateSaved([...saved, workout]);
      toast.success("Saved for later");
    },
    [saved, updateSaved]
  );

  const removeFromSaved = useCallback(
    (id: number) => {
      updateSaved(saved.filter((item) => item.id !== id));
      toast.success("Removed from saved");
    },
    [saved, updateSaved]
  );

  const markDone = useCallback((id: number) => {
    setDoneIds((currentIds) => {
      if (currentIds.includes(id)) {
        return currentIds;
      }

      const nextIds = [...currentIds, id];

      localStorage.setItem(
        DONE_STORAGE_KEY,
        JSON.stringify(nextIds)
      );

      return nextIds;
    });

    toast.success("Workout marked as done");
  }, []);

  const isInPlan = useCallback(
    (id: number) => plan.some((item) => item.id === id),
    [plan]
  );

  const isSaved = useCallback(
    (id: number) => saved.some((item) => item.id === id),
    [saved]
  );

  const value = useMemo<FitLogContextValue>(
    () => ({
      plan,
      saved,
      doneIds,
      addToPlan,
      removeFromPlan,
      saveWorkout,
      removeFromSaved,
      markDone,
      isInPlan,
      isSaved,
    }),
    [
      plan,
      saved,
      doneIds,
      addToPlan,
      removeFromPlan,
      saveWorkout,
      removeFromSaved,
      markDone,
      isInPlan,
      isSaved,
    ]
  );

  return (
    <FitLogContext.Provider value={value}>
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
}