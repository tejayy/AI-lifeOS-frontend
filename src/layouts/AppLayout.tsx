import { Outlet } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      {/* Header with theme toggle */}
      <header className="border-b border-border">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight">
              Life<span className="text-violet-500">OS</span>
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
