import { NavLink } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { navigation } from "../../constants/navigation";

export default function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 flex flex-col border-r border-white/[0.04] bg-gradient-to-b from-[#0a0806] to-[#050503] overflow-hidden">
      {/* Logo Header */}
      <div className="p-6 border-b border-white/[0.04]">
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
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-600/20"
                    : "text-neutral-400 hover:bg-white/[0.03] hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`h-5 w-5 transition-transform ${
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

      {/* Bottom Info */}
      <div className="p-4 border-t border-white/[0.04]">
        <div className="text-[10px] font-mono text-neutral-600 text-center">
          v2.4.0 • Built with ❤️
        </div>
      </div>
    </aside>
  );
}
