import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Sparkles,
  Menu,
  X,
  User,
  LogOut,
  Sun,
  Moon,
  Monitor,
  Bell,
} from "lucide-react";
import { navigation } from "../../constants/navigation";
import { useAuthStore } from "../../store/auth.store";
import { useThemeStore } from "../../store/theme.store";
import { authService } from "../../services/auth.service";

const THEME_OPTIONS = [
  { value: "light" as const, icon: Sun, label: "Light" },
  { value: "dark" as const, icon: Moon, label: "Dark" },
  { value: "system" as const, icon: Monitor, label: "Auto" },
];

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();

  const currentNav = navigation.find((item) => item.path === location.pathname);
  const pageLabel = currentNav?.label ?? "Dashboard";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <>
      {/* ── MOBILE TOP BAR ── */}
      <div className="lg:hidden flex items-center justify-between w-full">
        <button
          onClick={() => setIsOpen(true)}
          className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.05] text-neutral-400 hover:text-white transition-all"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile page title */}
        <div className="flex-1 px-3">
          <p className="text-sm font-black tracking-tight text-white">
            {pageLabel}
          </p>
          <p className="text-[10px] text-neutral-600 font-mono leading-none">
            {today}
          </p>
        </div>

        {/* Mobile user avatar */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/20">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      {/* ── OVERLAY ── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── DRAWER ── */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col border-r border-white/[0.04] bg-gradient-to-b from-[#0a0806] to-[#050503]`}
      >
        {/* Logo + close */}
        <div className="p-5 border-b border-white/[0.04] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-xl shadow-orange-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white block leading-none">
                Life<span className="text-orange-400">OS</span>
              </span>
              <span className="text-[10px] text-neutral-500 font-mono tracking-wider uppercase mt-0.5 block">
                Workspace
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Page context */}
        <div className="px-5 py-3.5 border-b border-white/[0.03]">
          <p className="text-base font-black tracking-tight text-white leading-none">
            {pageLabel}
          </p>
          <p className="text-[10px] text-neutral-600 font-mono mt-1">{today}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-600/20"
                      : "text-neutral-400 hover:bg-white/[0.03] hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-4.5 w-4.5 shrink-0 transition-transform ${
                        isActive ? "scale-110" : "group-hover:scale-105"
                      }`}
                    />
                    <span className="text-sm font-semibold tracking-wide">
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom panel */}
        <div className="border-t border-white/[0.04] p-4 space-y-3">
          {/* Notifications */}
          <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-neutral-400 hover:text-white hover:bg-white/[0.03] transition-all duration-200 group">
            <Bell className="h-4 w-4 shrink-0 group-hover:scale-105 transition-transform" />
            <span className="text-sm font-semibold tracking-wide flex-1 text-left">
              Notifications
            </span>
            <span className="text-[10px] font-mono bg-orange-500/15 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 rounded-full">
              0
            </span>
          </button>

          {/* Theme toggle */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest px-1">
              Appearance
            </p>
            <div className="grid grid-cols-3 gap-1 bg-black/30 p-1 rounded-xl border border-white/[0.04]">
              {THEME_OPTIONS.map(({ value, icon: Icon, label }) => {
                const isActive = theme === value;
                return (
                  <button
                    key={value}
                    onClick={() => setTheme(value)}
                    title={label}
                    className={`flex flex-col items-center gap-1 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md"
                        : "text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.03]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* User card */}
          <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] px-3 py-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/20 shrink-0">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white leading-none truncate">
                {user?.name ?? "User"}
              </p>
              <p className="text-[10px] text-neutral-500 font-mono mt-0.5 leading-none truncate">
                {user?.email ?? ""}
              </p>
            </div>
            <button
              onClick={handleLogout}
              title="Log out"
              className="h-7 w-7 flex items-center justify-center rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/[0.08] transition-all duration-200 shrink-0"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="text-[10px] font-mono text-neutral-700 text-center pt-0.5">
            v2.4.0 • Built with ❤️
          </p>
        </div>
      </aside>
    </>
  );
}
