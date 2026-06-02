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
        console.log("PROFILE RESPONSE:", res.data);
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);
};
