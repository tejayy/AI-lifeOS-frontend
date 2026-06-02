import { create } from "zustand";
import type { Habit } from "../types/habit.type";

interface HabitState {
  habits: Habit[];
  loading: boolean;

  setHabits: (habitId: Habit[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useHabitStore = create<HabitState>((set) => ({
  habits: [],
  loading: false,
  setHabits: (habits) => set({ habits }),
  setLoading: (loading) => set({ loading }),
}));
