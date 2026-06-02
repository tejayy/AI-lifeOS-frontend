import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EyeIcon,
  EyeOffIcon,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";

const HABITS = [
  { label: "Morning Routine", streak: 14, color: "bg-violet-500" },
  { label: "Deep Work", streak: 7, color: "bg-purple-500" },
  { label: "Exercise", streak: 21, color: "bg-fuchsia-500" },
  { label: "Journaling", streak: 5, color: "bg-indigo-500" },
];

const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function HabitRow({
  label,
  streak,
  color,
  filled,
}: {
  label: string;
  streak: number;
  color: string;
  filled: number[];
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-28 text-xs text-white/70 truncate">{label}</div>
      <div className="flex gap-1.5">
        {WEEK_DAYS.map((_, i) => (
          <div
            key={i}
            className={`h-5 w-5 rounded-[4px] transition-all ${
              filled.includes(i) ? `${color} opacity-90` : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <div className="ml-auto flex items-center gap-1 text-xs text-white/50">
        <Zap className="h-3 w-3 text-amber-400" />
        <span className="text-amber-400 font-semibold">{streak}</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      {/* ── Left: Brand panel ── */}
      <div className="relative hidden lg:flex flex-col overflow-hidden bg-[#0d0a14]">
        {/* Background glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-purple-700/10 blur-[80px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-10">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Life<span className="text-violet-400">OS</span>
            </span>
          </div>

          {/* Hero copy */}
          <div className="mt-16 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
              <TrendingUp className="h-3 w-3" /> Your personal growth engine
            </div>
            <h1 className="text-4xl font-bold leading-tight text-white">
              Build habits that{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                actually stick
              </span>
            </h1>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Track every streak, reflect on your progress, and design the life
              you want — one day at a time.
            </p>
          </div>

          {/* Live habit preview card */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                This Week
              </span>
              <span className="rounded-full bg-violet-500/20 px-2.5 py-0.5 text-[11px] font-medium text-violet-300">
                4 active habits
              </span>
            </div>

            <div className="space-y-3">
              <HabitRow {...HABITS[0]} filled={[0, 1, 2, 3, 4, 5, 6]} />
              <HabitRow {...HABITS[1]} filled={[0, 1, 2, 3, 4, 5]} />
              <HabitRow {...HABITS[2]} filled={[0, 1, 2, 3, 4]} />
              <HabitRow {...HABITS[3]} filled={[1, 2, 4, 6]} />
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              {
                icon: <Target className="h-4 w-4 text-violet-400" />,
                value: "84%",
                label: "Completion",
              },
              {
                icon: <Zap className="h-4 w-4 text-amber-400" />,
                value: "21",
                label: "Best streak",
              },
              {
                icon: <TrendingUp className="h-4 w-4 text-emerald-400" />,
                value: "+12%",
                label: "This month",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/8 bg-white/5 p-3 text-center"
              >
                <div className="flex justify-center mb-1">{stat.icon}</div>
                <div className="text-base font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-[10px] text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-auto pt-10">
            <blockquote className="space-y-2 border-l-2 border-violet-500/40 pl-4">
              <p className="text-sm italic text-white/60">
                "LifeOS changed how I approach every single morning. My
                consistency went from 40% to 90% in a month."
              </p>
              <footer className="text-xs text-white/30">
                Alex Chen — Software Engineer
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* ── Right: Login form ── */}
      <div className="flex items-center justify-center min-h-screen p-6 bg-background">
        <div className="w-full max-w-[400px] space-y-8">
          {/* Mobile-only logo */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Life<span className="text-violet-500">OS</span>
            </span>
          </div>

          {/* Header */}
          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome back
            </h2>
            <p className="text-sm text-muted-foreground">
              Sign in to continue your streak
            </p>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              className="h-10 gap-2 font-medium hover:border-violet-500/50 hover:bg-violet-500/5 transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              className="h-10 gap-2 font-medium hover:border-violet-500/50 hover:bg-violet-500/5 transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs text-muted-foreground">
                or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/60 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-xs text-muted-foreground hover:text-violet-500 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  disabled={isLoading}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 pr-10 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/60 transition-colors"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold shadow-md shadow-violet-500/25 transition-all hover:shadow-violet-500/40 hover:shadow-lg border-0"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
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
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-violet-500 hover:text-violet-400 transition-colors underline-offset-4 hover:underline"
            >
              Start for free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
