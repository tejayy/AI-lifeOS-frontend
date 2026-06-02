import { useState } from "react";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sparkles,
  Zap,
  Target,
  ChevronRight,
  Lock,
  Mail,
  CheckCircle2,
  Award,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

const BG_HABITS = [
  {
    label: "Deep Work Blocks",
    completed: [true, true, true, false, true, true, true],
    streak: 12,
  },
  {
    label: "Circadian Sleep Sync",
    completed: [true, true, true, true, true, false, false],
    streak: 5,
  },
  {
    label: "High-Intensity Interval",
    completed: [false, true, true, true, false, true, true],
    streak: 8,
  },
  {
    label: "Strategic Reflection",
    completed: [true, false, true, true, true, true, true],
    streak: 19,
  },
];

const REWARDS = [
  { title: "Consistency Master", desc: "Unlock a 15-day streak", progress: 80 },
  {
    title: "Early Bird",
    desc: "Sync circadian rhythm for 5 days",
    progress: 100,
    claimed: true,
  },
];

export default function CleanHabitLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await authService.login({ email, password });
      if (data.user) {
        setUser({ ...data.user, role: "USER" });
        toast.success("Welcome back!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Fixed viewport container to absolutely deny any page scrolling
    <div className="h-screen w-full relative flex items-center justify-center bg-[#050505] text-neutral-200 overflow-hidden font-sans antialiased">
      {/* ── BACKGROUND LAYER: LIVE PROFILE DEMO PANEL ── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-25 lg:opacity-45 transition-opacity duration-500">
        <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-orange-600/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[150px]" />

        {/* Subtle Decorative Geometric Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1610_1px,transparent_1px),linear-gradient(to_bottom,#1f1610_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Left Side Floating Block: Habit Tracker Checkboxes Showcase */}
        <div className="hidden lg:block absolute top-16 left-16 w-80 rounded-2xl border border-white/5 bg-neutral-950/40 p-5 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4 text-orange-400 font-mono text-[10px] tracking-widest uppercase">
            <CheckCircle2 className="h-3.5 w-3.5" /> Your Weekly Progress
          </div>
          <div className="space-y-3.5">
            {BG_HABITS.map((h, idx) => (
              <div key={idx} className="space-y-1.5 opacity-60">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-white truncate max-w-[150px]">
                    {h.label}
                  </span>
                  <span className="text-[10px] text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded font-mono">
                    {h.streak}d streak
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {h.completed.map((c, i) => (
                    <div
                      key={i}
                      className={`h-2.5 flex-1 rounded-[3px] transition-all ${
                        c
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 shadow-sm shadow-orange-500/20"
                          : "bg-neutral-900"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Floating Block: Streaks & Milestones Showcase */}
        <div className="hidden lg:block absolute bottom-16 right-16 w-72 rounded-2xl border border-white/5 bg-neutral-950/40 p-5 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-3 text-amber-400 font-mono text-[10px] tracking-widest uppercase">
            <Award className="h-3.5 w-3.5" /> Upcoming Rewards
          </div>
          <div className="space-y-3">
            {REWARDS.map((r, idx) => (
              <div key={idx} className="space-y-1 opacity-70">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">{r.title}</span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {r.claimed ? "Completed" : `${r.progress}%`}
                  </span>
                </div>
                <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full"
                    style={{ width: `${r.progress}%` }}
                  />
                </div>
                <p className="text-[10px] text-neutral-500">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOREGROUND LAYER: SIMPLIFIED LOGIN ACCREDITATION DECK ── */}
      <div className="relative z-10 w-full max-w-[420px] mx-4">
        {/* Simple Premium Application Branding */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-neutral-900/90 px-4 py-1.5 backdrop-blur-xl shadow-xl shadow-black/40">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-amber-500 shadow-md">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white">
              Life<span className="text-orange-400">OS</span>
            </span>
            <div className="h-3 w-[1px] bg-neutral-800 mx-1" />
            <span className="text-[10px] tracking-wide text-neutral-400">
              Welcome Back
            </span>
          </div>
        </div>

        {/* Main Interface Entry Grid */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0b0b0b]/90 backdrop-blur-3xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] overflow-hidden">
          <div className="p-8 sm:p-9 space-y-6">
            {/* Friendly Sign-In Message Headers */}
            <div className="space-y-1.5 text-center">
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                Sign in to your space
              </h2>
              <p className="text-xs text-neutral-400 max-w-[280px] mx-auto leading-relaxed">
                Log in to keep building your streaks and tracking your healthy
                daily routine.
              </p>
            </div>

            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-900 to-transparent" />

            {/* Credential Data Input Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field: Email */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-[11px] font-semibold text-neutral-400 tracking-wide"
                >
                  Email Address
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-orange-400 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={isLoading}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10.5 pl-10 bg-black/50 border-neutral-800/60 text-white placeholder:text-neutral-700 rounded-xl focus-visible:ring-orange-500/20 focus-visible:border-orange-500/40 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Field: Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-[11px] font-semibold text-neutral-400 tracking-wide"
                  >
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-xs text-neutral-500 hover:text-orange-400 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-orange-400 transition-colors">
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    disabled={isLoading}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10.5 pl-10 bg-black/50 border-neutral-800/60 text-white placeholder:text-neutral-700 rounded-xl focus-visible:ring-orange-500/20 focus-visible:border-orange-500/40 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Action Button Trigger */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold tracking-wide rounded-xl shadow-lg shadow-orange-600/10 transition-all duration-300 border-0 mt-4 group"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <svg
                      className="h-4 w-4 animate-spin text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Signing you in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1 w-full">
                    Go to Dashboard
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                )}
              </Button>
            </form>

            {/* Traditional Simple Alternative Authentication Lines */}
            <div className="space-y-3 pt-2">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-full border-t border-neutral-900" />
                <span className="relative bg-[#0b0b0b] px-3 text-[10px] text-neutral-500">
                  Or continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  type="button"
                  disabled={isLoading}
                  className="h-9.5 rounded-xl bg-neutral-950/40 border-neutral-900 text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
                >
                  GitHub Account
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={isLoading}
                  className="h-9.5 rounded-xl bg-neutral-950/40 border-neutral-900 text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
                >
                  Google Account
                </Button>
              </div>
            </div>
          </div>

          {/* User Sign-up Navigation Card Base Footer */}
          <div className="bg-black/40 border-t border-white/[0.03] px-8 py-4 text-center">
            <p className="text-xs text-neutral-500">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-bold text-orange-400 hover:text-orange-300 transition-colors"
              >
                Create a profile
              </a>
            </p>
          </div>
        </div>

        {/* Micro Dashboard App Ticker */}
        <div className="mt-4 flex items-center justify-between px-2 text-[10px] font-mono text-neutral-600">
          <span className="flex items-center gap-1">
            <Target className="h-3 w-3 text-orange-500/30" /> Daily Habits
            Active
          </span>
          <span className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-amber-500/30" /> Fully Encrypted &
            Private
          </span>
        </div>
      </div>
    </div>
  );
}
