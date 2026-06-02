import { api } from "@/api/axios";

export const habitService = {
  getHabits: () => api.get("/habits"),
  createHabit: (data: { title: string; description?: string }) =>
    api.post("/habits", data),
  deleteHabit: (habitId: string) => api.delete(`/habits/${habitId}`),
  checkInHabit: (habitId: string) => api.post(`/habits/${habitId}/checkin`),
};
