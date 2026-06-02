import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import MobileSidebar from "@/components/layout/MobileSidebar";

export default function AppLayout() {
  return (
    <div className="h-screen w-full flex overflow-hidden bg-[#030303] text-neutral-200">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block relative z-10">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Global background — grid + glows, scoped to content area */}
        <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] h-[600px] w-[600px] rounded-full bg-orange-600/[0.05] blur-[160px]" />
          <div className="absolute bottom-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-amber-500/[0.04] blur-[160px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1610_1px,transparent_1px),linear-gradient(to_bottom,#1f1610_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_60%,transparent_100%)]" />
        </div>

        {/* Mobile top bar (hamburger + page title + avatar) */}
        <div className="relative z-10 lg:hidden h-14 flex-shrink-0 flex items-center px-4 border-b border-white/[0.04] bg-[#030303]/80 backdrop-blur-sm">
          <MobileSidebar />
        </div>

        {/* Page Content */}
        <main className="relative z-10 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
