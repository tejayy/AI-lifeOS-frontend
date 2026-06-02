import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  Flame,
  Trophy,
  Plus,
  Sparkles,
  Target,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HabitCard from "../components/HabitCard";

import type { Habit } from "../types/habit.type";
import {
  createHabitSchema,
  type CreateHabitForm,
} from "../validations/habit.validation";
import { habitService } from "../services/habit.service";

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateHabitForm>({
    resolver: zodResolver(createHabitSchema),
  });

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const res = await habitService.getHabits();
      // Backend returns { success: true, habit: [...] }
      const data = res.data;
      setHabits(Array.isArray(data.habit) ? data.habit : []);
    } catch {
      toast.error("Failed to load habits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const onSubmit = async (data: CreateHabitForm) => {
    try {
      setSubmitting(true);
      await habitService.createHabit(data);
      toast.success("Habit created");
      reset();
      fetchHabits();
    } catch {
      toast.error("Failed to create habit");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckIn = async (habitId: string) => {
    try {
      await habitService.checkInHabit(habitId);
      toast.success("Checked in — keep the streak alive 🔥");
      fetchHabits();
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Check-in failed");
    }
  };

  const handleDelete = async (habitId: string) => {
    try {
      await habitService.deleteHabit(habitId);
      toast.success("Habit removed");
      fetchHabits();
    } catch {
      toast.error("Delete failed");
    }
  };

  const totalStreaks = habits.reduce(
    (sum, h) => sum + (h.currentStreak ?? 0),
    0,
  );
  const bestStreak = habits.reduce(
    (max, h) => Math.max(max, h.longestStreak ?? 0),
    0,
  );

  return (
    <div className="min-h-full bg-[#050505] text-neutral-200 font-sans antialiased">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-orange-600/[0.06] blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-amber-500/[0.05] blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1610_1px,transparent_1px),linear-gradient(to_bottom,#1f1610_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* ── PAGE HEADER ── */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-neutral-900/80 px-3 py-1 text-[11px] font-medium text-orange-300 backdrop-blur-sm mb-2">
              <Sparkles className="h-3 w-3" /> Habit Engine
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Your{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                Consistency
              </span>{" "}
              Board
            </h1>
            <p className="text-sm text-neutral-400">
              Build powerful streaks and track your daily routines.
            </p>
          </div>

          {/* Stats pills */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-neutral-900/60 px-4 py-2.5 backdrop-blur-sm">
              <Flame className="h-4 w-4 text-orange-400" />
              <div>
                <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
                  Active Streaks
                </p>
                <p className="text-lg font-black text-white leading-none">
                  {totalStreaks}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-neutral-900/60 px-4 py-2.5 backdrop-blur-sm">
              <Trophy className="h-4 w-4 text-amber-400" />
              <div>
                <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
                  Best Streak
                </p>
                <p className="text-lg font-black text-white leading-none">
                  {bestStreak}d
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── CREATE HABIT FORM ── */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0b0b0b]/90 backdrop-blur-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.04] flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Plus className="h-4 w-4 text-orange-400" />
            </div>
            <span className="text-sm font-bold text-white tracking-wide">
              New Habit
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-1.5">
                <Label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  Habit Title
                </Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-orange-400 transition-colors">
                    <Target className="h-4 w-4" />
                  </div>
                  <Input
                    {...register("title")}
                    placeholder="e.g. Morning run"
                    className="h-11 pl-10 bg-black/50 border-neutral-800/60 text-white placeholder:text-neutral-700 rounded-xl focus-visible:ring-orange-500/20 focus-visible:border-orange-500/40 transition-all duration-200"
                  />
                </div>
                {errors.title && (
                  <p className="text-[11px] text-red-400">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  Description{" "}
                  <span className="text-neutral-600 normal-case font-normal">
                    (optional)
                  </span>
                </Label>
                <Input
                  {...register("description")}
                  placeholder="What's the goal?"
                  className="h-11 bg-black/50 border-neutral-800/60 text-white placeholder:text-neutral-700 rounded-xl focus-visible:ring-orange-500/20 focus-visible:border-orange-500/40 transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={submitting}
                className="h-10 px-6 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold tracking-wide rounded-xl shadow-lg shadow-orange-600/10 transition-all duration-300 border-0 group"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Plus className="h-4 w-4" />
                    Add Habit
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* ── HABITS LIST ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-orange-400" />
            <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-wider">
              Active Habits
              {habits.length > 0 && (
                <span className="ml-2 text-[10px] font-mono text-neutral-500 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.03] normal-case">
                  {habits.length} total
                </span>
              )}
            </h2>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-44 rounded-2xl border border-white/[0.05] bg-neutral-900/40 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && habits.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/[0.08] bg-neutral-900/20 p-12 text-center space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 mx-auto">
                <Flame className="h-6 w-6 text-orange-400/60" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-300">
                  No habits yet
                </p>
                <p className="text-xs text-neutral-600 mt-1">
                  Add your first habit above to start building streaks.
                </p>
              </div>
            </div>
          )}

          {/* Habit cards grid */}
          {!loading && habits.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onCheckIn={handleCheckIn}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
