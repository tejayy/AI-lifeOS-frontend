import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import MobileSidebar from "@/components/layout/MobileSidebar";
import Navbar from "@/components/layout/Navbar";

export default function AppLayout() {
  return (
    <div className="h-screen w-full flex overflow-hidden bg-[#030303] text-neutral-200">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar with Mobile Menu */}
        <div className="h-16 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 border-b border-white/[0.04] bg-[#030303]">
          {/* Mobile Menu Button */}
          <MobileSidebar />

          {/* Rest of Navbar */}
          <div className="flex-1">
            <Navbar />
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#030303] to-[#0a0806]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
