import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import AppLoader from "../components/AppLoader";

export default function ProtectedRoute() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) return <AppLoader />;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
