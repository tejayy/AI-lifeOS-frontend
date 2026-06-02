import { api } from "../api/axios";

export const authService = {
  register: async (data: any) => api.post("/auth/register", data),
  login: async (data: any) => api.post("/auth/login", data),
  logout: async () => api.post("/auth/logout"),
  refresh: async () => api.post("/auth/refresh"),
  profile: async () => api.get("/auth/profile"),
};
