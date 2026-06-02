import type { LoginRequest, RegisterRequest, User } from "@/types/auth.types";
import { api } from "../api/axios";

export const authService = {
  register: async (data: RegisterRequest) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },
  login: async (data: LoginRequest) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },
  logout: async () => {
    const response = await api.post<{ success: boolean; message: string }>(
      "/auth/logout",
    );
    return response.data;
  },
  refresh: async () => {
    const response = await api.post<{ success: boolean }>("/auth/refresh");
    return response.data;
  },
  profile: async () => {
    const response = await api.post<{ user: User }>("/auth/profile");
    return response.data;
  },
};
