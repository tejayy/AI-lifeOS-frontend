import { api } from "@/api/axios";

export const habitService = {
  getHabits: () => api.get("/habits"),
  createHabit: (data: { title: string; description?: string }) =>
    api.post("/habits", data),
  updateHabit: (
    habitId: string,
    data: { title: string; description?: string },
  ) => api.patch(`/habits/${habitId}`, data),
  deleteHabit: (habitId: string) => api.delete(`/habits/${habitId}`),
  checkInHabit: (habitId: string) => api.post(`/habits/${habitId}/check-in`),
};
