import { Sparkles } from "lucide-react";

export default function AppLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* ── Ambient glow orbs ── */}
      <div className="pointer-events-none absolute inset-0 select-none">
        <div
          className="absolute top-[-15%] left-[-10%] h-[600px] w-[600px] rounded-full bg-orange-600/[0.07] blur-[160px] animate-pulse"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-[-15%] right-[-10%] h-[600px] w-[600px] rounded-full bg-amber-500/[0.05] blur-[160px] animate-pulse"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1610_1px,transparent_1px),linear-gradient(to_bottom,#1f1610_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      {/* ── Blurred backdrop card ── */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo mark */}
        <div className="relative">
          {/* Outer ring — slow spin */}
          <div
            className="absolute inset-[-12px] rounded-2xl border border-orange-500/20 animate-spin"
            style={{ animationDuration: "8s" }}
          />
          {/* Inner ring — counter spin */}
          <div
            className="absolute inset-[-6px] rounded-xl border border-amber-500/10 animate-spin"
            style={{ animationDuration: "5s", animationDirection: "reverse" }}
          />

          <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-[0_0_40px_rgba(249,115,22,0.3)] flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Wordmark */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black tracking-tight text-white">
            Life<span className="text-orange-400">OS</span>
          </h1>
          <p className="text-[11px] text-neutral-500 font-mono tracking-widest uppercase">
            Loading your workspace
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-[2px] bg-neutral-900 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full animate-loader-bar" />
        </div>

        {/* Dot pulse */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-orange-500/60 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s`, animationDuration: "1s" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
