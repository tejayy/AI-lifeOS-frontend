import { create } from "zustand";
import type { User } from "../types/auth.types";

interface AuthState {
  user: User | null;
  loading: boolean;
  loginLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setLoginLoading: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  loginLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setLoginLoading: (loginLoading) => set({ loginLoading }),
}));
