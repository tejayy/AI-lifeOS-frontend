import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function PublicRoute() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
