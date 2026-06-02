export interface Habit {
  id: string;
  title: string;
  description?: string;
  currentStreak: number;
  longestStreak: number;
  createdAt: string;
}
