import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import { authService } from "../services/auth.service";

export const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await authService.profile();
        if (res.user) {
          setUser({ ...res.user, role: "USER" });
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);
};
