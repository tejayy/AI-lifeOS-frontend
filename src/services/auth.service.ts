import { api } from "../api/axios";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
} from "../types/auth.types";

export const authService = {
  register: async (data: RegisterRequest) => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  login: async (data: LoginRequest) => {
    const response = await api.post<AuthResponse>("/auth/login", data);
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
