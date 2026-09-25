import type { Workout } from "@/types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getWorkouts(): Promise<Workout[]> {
  return fetchJson<Workout[]>(API_URL);
}

export async function getWorkout(
  id: string | number
): Promise<Workout | null> {
  try {
    return await fetchJson<Workout>(`${API_URL}/${id}`);
  } catch {
    return null;
  }
}