import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth.service";
import { navigation } from "../../constants/navigation";
import { Bell, LogOut, User } from "lucide-react";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const location = useLocation();

  // Get current page label from navigation config
  const currentNav = navigation.find((item) => item.path === location.pathname);
  const pageLabel = currentNav?.label ?? "Dashboard";

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* Page Title */}
      <div className="ml-4 lg:ml-0">
        <h1 className="text-base sm:text-lg font-black tracking-tight text-white leading-none">
          {pageLabel}
        </h1>
        <p className="hidden sm:block text-[11px] text-neutral-500 font-mono mt-0.5">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification Bell */}
        <button
          className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.05] text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>

        {/* User Pill - Desktop */}
        <div className="hidden sm:flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.05] px-3 py-1.5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/20">
            <User className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-white leading-none">
              {user?.name ?? "User"}
            </p>
            <p className="text-[10px] text-neutral-500 font-mono mt-0.5 leading-none">
              {user?.email ?? ""}
            </p>
          </div>
        </div>

        {/* Mobile User Avatar */}
        <div className="sm:hidden h-9 w-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/20">
          <User className="h-4 w-4 text-white" />
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.05] text-neutral-400 hover:text-red-400 hover:bg-red-500/[0.08] hover:border-red-500/20 transition-all duration-200"
          aria-label="Log out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
