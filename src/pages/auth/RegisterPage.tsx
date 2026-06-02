import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EyeIcon,
  EyeOffIcon,
  Sparkles,
  CheckCircle2,
  CheckSquare,
  FileText,
  Smile,
  Flame,
  Lock,
  Mail,
  User,
  ArrowRight,
  Compass,
} from "lucide-react";
import toast from "react-hot-toast";
import { registerSchema } from "@/validations/auth.validation";
import { authService } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import AppLoader from "@/components/AppLoader";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState("⚡");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const loginLoading = useAuthStore((state) => state.loginLoading);
  const setLoginLoading = useAuthStore((state) => state.setLoginLoading);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    try {
      const data = await authService.register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (data.user) {
        setUser({ ...data.user, role: "USER" });
        toast.success("Account Created! Welcome to LifeOS");
        setLoginLoading(true);
        setTimeout(() => {
          setLoginLoading(false);
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loginLoading) return <AppLoader />;

  return (
    // Viewport lock to completely guarantee zero scrolling
    <div className="h-screen w-full grid lg:grid-cols-12 bg-[#030303] text-neutral-200 overflow-hidden font-sans antialiased">
      {/* ── LEFT PANEL: THE "WOW" PREVIEW IMMERSIVE SIMULATOR (7 COLS) ── */}
      <div className="relative hidden lg:flex lg:col-span-7 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0a0806] via-[#0f0a07] to-[#1a0f0a] px-10 py-8 border-r border-white/[0.04]">
        {/* Enhanced Multi-Layered Background Effects */}
        <div className="pointer-events-none absolute inset-0 select-none">
          {/* Primary Glow Orbs */}
          <div
            className="absolute top-[-15%] left-[-5%] h-[500px] w-[500px] rounded-full bg-orange-500/[0.08] blur-[140px] animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-[-15%] right-[-5%] h-[500px] w-[500px] rounded-full bg-amber-500/[0.06] blur-[140px] animate-pulse"
            style={{ animationDuration: "5s", animationDelay: "1s" }}
          />
          <div className="absolute top-1/2 left-1/3 h-[350px] w-[350px] rounded-full bg-orange-600/[0.04] blur-[100px]" />

          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,146,60,0.04),transparent_50%)]" />

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#2a1810_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a0f0a_1px,transparent_1px),linear-gradient(to_bottom,#1a0f0a_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />

          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

          {/* Vignette Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>

        {/* Header Branding */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-xl shadow-orange-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white block leading-none">
                Life<span className="text-orange-400">OS</span>
              </span>
              <span className="text-[10px] text-neutral-500 font-mono tracking-wider uppercase mt-0.5 block">
                Workspace Engine
              </span>
            </div>
          </div>
          <div className="hidden xl:flex items-center gap-2 rounded-full bg-white/[0.02] border border-white/[0.05] px-3 py-1 text-[11px] text-neutral-400 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            v2.4 Live Sandbox Preview
          </div>
        </div>

        {/* Centerpiece Interactive Canvas Layout */}
        <div className="relative z-10 flex-1 flex items-center justify-center overflow-hidden py-4">
          <div className="w-full max-w-2xl space-y-6 scale-[0.85]">
            <div className="space-y-3 max-w-md">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/5 px-3 py-1 text-[11px] font-medium text-orange-300 backdrop-blur-sm">
                ✨ Experience Clarity First-Hand
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white leading-[1.15] lg:text-4xl">
                One place for <br />
                <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  everything you do.
                </span>
              </h1>
              <p className="text-sm leading-relaxed text-neutral-400">
                Beautifully bridges your daily tracking, tasks, and reflections
                into a fluid interactive layout.
              </p>
            </div>

            {/* SIMULATED LIVE APP INSIDE THE HERO PANEL */}
            <div className="grid grid-cols-12 gap-3 rounded-2xl border border-white/[0.07] bg-black/40 p-4 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl relative">
              <div className="absolute top-0 right-12 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-black text-[9px] font-black px-2.5 py-0.5 rounded-full tracking-wider uppercase shadow-md">
                Your New Command Center
              </div>

              {/* 1. HABITS ROW BLOCK (SPAN 12) */}
              <div className="col-span-12 p-3 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.04] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                      <CheckCircle2 className="h-3.5 w-3.5 text-orange-400" />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">
                      Consistency Routines
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.02]">
                    Current Month Grid
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 bg-black/20 p-2.5 rounded-lg border border-white/[0.02]">
                  <span className="text-xs text-neutral-300 font-medium truncate max-w-[140px]">
                    Morning Sunlight Sync
                  </span>
                  <div className="flex gap-1.5 overflow-hidden">
                    {[
                      true,
                      true,
                      true,
                      false,
                      true,
                      true,
                      true,
                      true,
                      true,
                      false,
                      true,
                      true,
                    ].map((done, idx) => (
                      <div
                        key={idx}
                        className={`h-4 w-4 rounded-[4px] transition-all duration-300 ${
                          done
                            ? "bg-gradient-to-br from-orange-500 to-amber-500 shadow-sm shadow-orange-500/20 scale-100"
                            : "bg-neutral-900 border border-white/[0.02]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold font-mono text-orange-400 shrink-0 bg-orange-500/10 px-1.5 py-0.5 rounded">
                    <Flame className="h-3 w-3 inline mr-0.5 fill-orange-500/20" />{" "}
                    14d
                  </span>
                </div>
              </div>

              {/* 2. TASKS & MOOD GRAPH SLOTS (SPAN 7) */}
              <div className="col-span-7 p-3 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.04] flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                      <CheckSquare className="h-3.5 w-3.5 text-amber-400" />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">
                      Focus Tasks
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400">
                    75% Done
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.01] border border-white/[0.03]">
                    <span className="text-neutral-400 line-through decoration-neutral-600">
                      Review quarterly targets
                    </span>
                    <div className="h-3.5 w-3.5 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-neutral-900/60 border border-white/[0.02]">
                    <span className="text-neutral-200 font-medium">
                      Design user onboarding flows
                    </span>
                    <div className="h-3.5 w-3.5 rounded-full border border-neutral-700 hover:border-amber-400 transition-colors" />
                  </div>
                </div>
              </div>

              {/* 3. NOTES & MOOD DIAL SLOTS (SPAN 5) */}
              <div className="col-span-5 p-3 rounded-xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.04] space-y-2.5 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                      <Smile className="h-3.5 w-3.5 text-orange-400" />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">
                      Mood Spectrum
                    </span>
                  </div>
                </div>

                {/* Dynamic Feeling Selector Simulator */}
                <div className="grid grid-cols-4 gap-1 bg-black/30 p-1 rounded-xl border border-white/[0.03]">
                  {["😴", "☕", "⚡", "🧠"].map((mood) => (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => setSelectedMood(mood)}
                      className={`h-8 text-sm rounded-lg transition-all duration-200 ${
                        selectedMood === mood
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-md font-bold scale-105"
                          : "hover:bg-white/[0.03] text-neutral-400"
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-neutral-500 text-center italic font-mono">
                  {selectedMood === "⚡" && "High energy — ready to build"}
                  {selectedMood === "🧠" && "Deep clarity — great focus"}
                  {selectedMood === "☕" && "Steady — catching momentum"}
                  {selectedMood === "😴" && "Resting — recharging state"}
                </p>
              </div>

              {/* 4. INTEGRATED NOTES QUICK DOCK */}
              <div className="col-span-12 p-3 rounded-xl bg-white/[0.01] border border-white/[0.03] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 shrink-0">
                  <FileText className="h-3.5 w-3.5 text-neutral-400" />
                  <span className="text-[11px] font-mono text-neutral-400">
                    Quick Note:
                  </span>
                </div>
                <div className="h-4 bg-transparent text-xs text-orange-300/90 truncate font-mono flex-1 border-b border-dashed border-neutral-800">
                  Ideas for next morning layout adjustments...|
                </div>
                <div className="text-[10px] font-mono text-neutral-600 bg-neutral-900 px-1.5 py-0.5 rounded shrink-0">
                  Auto-Saved
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Micro Footer Branding Elements */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/[0.04] pt-3 text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5 text-orange-500/40" /> Built for
            minimalists
          </div>
          <div>No hidden paywalls • Open Access</div>
        </div>
      </div>

      {/* ── RIGHT PANEL: THE PREMIUM REGISTRATION FORM CONSOLE (5 COLS) ── */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-[#030303] lg:col-span-5 relative z-20">
        <div className="w-full max-w-[380px] space-y-6">
          {/* Mobile Display Identity Block */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="text-md font-black tracking-tight text-white block">
                LifeOS
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Claim your dashboard
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Set up your account passkey to save your notes, habits, and
              progress arrays instantly.
            </p>
          </div>

          {/* Core Registration Terminal */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Field: Full Name */}
            <div className="space-y-1">
              <Label
                htmlFor="fullName"
                className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider"
              >
                Your Full Name
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-orange-400 transition-colors">
                  <User className="h-4 w-4" />
                </div>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Alex Mercer"
                  autoComplete="name"
                  disabled={isLoading}
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="h-11 pl-10 bg-neutral-950/60 border-neutral-900 text-white placeholder:text-neutral-800 rounded-xl focus-visible:ring-orange-500/10 focus-visible:border-orange-500/30 transition-all duration-200"
                />
              </div>
            </div>

            {/* Field: Email */}
            <div className="space-y-1">
              <Label
                htmlFor="email"
                className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider"
              >
                Email Address
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-orange-400 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="alex@workspace.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 pl-10 bg-neutral-950/60 border-neutral-900 text-white placeholder:text-neutral-800 rounded-xl focus-visible:ring-orange-500/10 focus-visible:border-orange-500/30 transition-all duration-200"
                />
              </div>
            </div>

            {/* Field: Password */}
            <div className="space-y-1">
              <Label
                htmlFor="password"
                className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider"
              >
                Create Passkey
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-orange-400 transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isLoading}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="h-11 pl-10 pr-10 bg-neutral-950/60 border-neutral-900 text-white placeholder:text-neutral-800 rounded-xl focus-visible:ring-orange-500/10 focus-visible:border-orange-500/30 transition-all duration-200"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-400 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-neutral-600 pl-1">
                Min 8 chars · uppercase · lowercase · number
              </p>
            </div>

            {/* Field: Confirm Password */}
            <div className="space-y-1">
              <Label
                htmlFor="confirmPassword"
                className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider"
              >
                Confirm Passkey
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-orange-400 transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isLoading}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="h-11 pl-10 pr-10 bg-neutral-950/60 border-neutral-900 text-white placeholder:text-neutral-800 rounded-xl focus-visible:ring-orange-500/10 focus-visible:border-orange-500/30 transition-all duration-200"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-400 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Main Submit Action Trigger Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-extrabold tracking-wide rounded-xl shadow-lg shadow-orange-600/10 transition-all duration-300 border-0 mt-2 group"
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
                  Building workspace...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  Launch My Dashboard
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          {/* Structural Line Divider */}
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-900" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#030303] px-3 text-[10px] text-neutral-600 font-mono tracking-wider uppercase">
                Fast Track Register
              </span>
            </div>
          </div>

          {/* Social Federation Handles */}
          <div className="grid grid-cols-2 gap-2.5">
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              className="h-9.5 rounded-xl bg-neutral-950/40 border-neutral-900 font-bold text-xs text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
            >
              GitHub
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              className="h-9.5 rounded-xl bg-neutral-950/40 border-neutral-900 font-bold text-xs text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
            >
              Google
            </Button>
          </div>

          {/* Navigation Toggle Option */}
          <p className="text-center text-xs text-neutral-500 pt-1">
            Already have a space setup?{" "}
            <a
              href="/login"
              className="font-bold text-orange-400 hover:text-orange-300 transition-colors"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
