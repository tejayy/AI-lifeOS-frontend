import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  Flame,
  Trophy,
  Plus,
  Target,
  CheckCircle2,
  Loader2,
  X,
  Pencil,
  Trash2,
  Check,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Habit } from "../types/habit.type";
import {
  createHabitSchema,
  type CreateHabitForm,
} from "../validations/habit.validation";
import { habitService } from "../services/habit.service";

// ─── Color palette — applied ONLY when checked in (isActive) ─────────────────
// Each entry: bg, border, bottomGrad, leftBarColors, accentText, checkBtnBg, checkBtnBorder
const ROW_COLORS = [
  {
    bg: "#0d1f14",
    border: "#1a4d2a",
    grad: "#052010",
    accent: "#34d399",
    btnBg: "#10b98125",
    btnBorder: "#10b981",
    barFrom: "#10b981",
    barTo: "#6ee7b7",
  },
  {
    bg: "#130d1f",
    border: "#3b1f6b",
    grad: "#0a0520",
    accent: "#a78bfa",
    btnBg: "#8b5cf625",
    btnBorder: "#8b5cf6",
    barFrom: "#8b5cf6",
    barTo: "#c4b5fd",
  },
  {
    bg: "#0d1a26",
    border: "#1a3a56",
    grad: "#030d18",
    accent: "#38bdf8",
    btnBg: "#0ea5e925",
    btnBorder: "#0ea5e9",
    barFrom: "#0ea5e9",
    barTo: "#7dd3fc",
  },
  {
    bg: "#260d0d",
    border: "#6b1f1f",
    grad: "#180303",
    accent: "#fb7185",
    btnBg: "#f43f5e25",
    btnBorder: "#f43f5e",
    barFrom: "#f43f5e",
    barTo: "#fda4af",
  },
  {
    bg: "#1a1f0a",
    border: "#3d4d10",
    grad: "#0d1200",
    accent: "#a3e635",
    btnBg: "#84cc1625",
    btnBorder: "#84cc16",
    barFrom: "#84cc16",
    barTo: "#d9f99d",
  },
  {
    bg: "#0a1f1f",
    border: "#104d4d",
    grad: "#001515",
    accent: "#2dd4bf",
    btnBg: "#14b8a625",
    btnBorder: "#14b8a6",
    barFrom: "#14b8a6",
    barTo: "#99f6e4",
  },
  {
    bg: "#1f160a",
    border: "#6b4010",
    grad: "#150a00",
    accent: "#fbbf24",
    btnBg: "#f59e0b25",
    btnBorder: "#f59e0b",
    barFrom: "#f59e0b",
    barTo: "#fde68a",
  },
  {
    bg: "#1a0d1a",
    border: "#6b1f6b",
    grad: "#120012",
    accent: "#f0abfc",
    btnBg: "#e879f925",
    btnBorder: "#e879f9",
    barFrom: "#e879f9",
    barTo: "#f5d0fe",
  },
];

// ─── Habit Row ────────────────────────────────────────────────────────────────
function HabitRow({
  habit,
  colorIndex,
  onCheckIn,
  onDelete,
  onUpdate,
}: {
  habit: Habit;
  colorIndex: number;
  onCheckIn: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: { title: string; description?: string }) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(habit.title);
  const [editDesc, setEditDesc] = useState(habit.description ?? "");
  const [saving, setSaving] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);

  const color = ROW_COLORS[colorIndex % ROW_COLORS.length];
  const streakPct = Math.min((habit.currentStreak / 30) * 100, 100);
  const isActive = habit.currentStreak > 0;

  const saveEdit = async () => {
    if (!editTitle.trim()) return;
    setSaving(true);
    onUpdate(habit.id, {
      title: editTitle.trim(),
      description: editDesc.trim() || undefined,
    });
    setSaving(false);
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditTitle(habit.title);
    setEditDesc(habit.description ?? "");
    setEditing(false);
  };

  const doCheckIn = async () => {
    setCheckingIn(true);
    onCheckIn(habit.id);
    setCheckingIn(false);
  };

  // ── Edit mode ──
  if (editing) {
    return (
      <div className="rounded-xl border border-orange-500/40 bg-[#1a1208] p-3 space-y-2.5">
        <div className="flex gap-2.5">
          <div className="flex-1 space-y-1">
            <Label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Title
            </Label>
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit();
                if (e.key === "Escape") cancelEdit();
              }}
              className="h-8 bg-neutral-900 border-neutral-700 text-white text-sm rounded-lg focus-visible:ring-orange-500/30 focus-visible:border-orange-500/50"
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Description
            </Label>
            <Input
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Optional"
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit();
                if (e.key === "Escape") cancelEdit();
              }}
              className="h-8 bg-neutral-900 border-neutral-700 text-white text-sm rounded-lg focus-visible:ring-orange-500/30 focus-visible:border-orange-500/50"
            />
          </div>
          <div className="flex items-end gap-1.5 pb-0.5">
            <Button
              size="sm"
              variant="outline"
              onClick={cancelEdit}
              className="h-8 px-2.5 text-xs rounded-lg border-neutral-700 text-neutral-300 hover:text-white bg-neutral-900"
            >
              <X className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              onClick={saveEdit}
              disabled={saving || !editTitle.trim()}
              className="h-8 px-3 text-xs rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 text-white border-0 font-bold"
            >
              {saving ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Normal row ──
  return (
    <div
      style={{
        backgroundColor: isActive ? color.bg : "#111111",
        borderColor: isActive ? color.border : "#262626",
      }}
      className="group relative flex items-center gap-3 rounded-xl border px-3.5 py-2.5 overflow-hidden transition-all duration-300"
    >
      {/* Bottom gradient — colored when active, subtle when not */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-10"
        style={{
          background: isActive
            ? `linear-gradient(to top, ${color.grad}55, transparent)`
            : "linear-gradient(to top, #1a1a1a55, transparent)",
        }}
      />

      {/* Left accent bar */}
      <div
        className="pointer-events-none absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
        style={{
          background: isActive
            ? `linear-gradient(to bottom, ${color.barFrom}, ${color.barTo})`
            : "#2a2a2a",
          opacity: isActive ? 1 : 0.5,
        }}
      />

      {/* Check-in button — the main visual indicator */}
      <button
        onClick={doCheckIn}
        disabled={checkingIn}
        title={isActive ? "Checked in today ✓" : "Check in today"}
        className="relative z-10 shrink-0 ml-2 h-7 w-7 rounded-full flex items-center justify-center border transition-all duration-300"
        style={{
          backgroundColor: isActive ? `${color.barFrom}30` : "#1e1e1e",
          borderColor: isActive ? color.btnBorder : "#3a3a3a",
          color: isActive ? color.accent : "#555555",
          boxShadow: isActive ? `0 0 10px ${color.barFrom}30` : "none",
        }}
      >
        {checkingIn ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <CheckCircle2 className="h-3 w-3" />
        )}
      </button>

      {/* Title + description */}
      <div className="relative z-10 flex-1 min-w-0">
        <p
          className="text-sm font-semibold truncate leading-tight transition-colors duration-300"
          style={{ color: isActive ? "#ffffff" : "#9a9a9a" }}
        >
          {habit.title}
        </p>
        {habit.description && (
          <p className="text-[11px] text-neutral-600 truncate leading-none mt-0.5">
            {habit.description}
          </p>
        )}
      </div>

      {/* Progress bar */}
      <div className="relative z-10 hidden sm:flex flex-col gap-1 w-20 shrink-0">
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: isActive ? "#1a1a1a" : "#1a1a1a" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${streakPct}%`,
              background: isActive
                ? `linear-gradient(to right, ${color.barFrom}, ${color.barTo})`
                : "#333333",
            }}
          />
        </div>
        <span
          className="text-[9px] font-mono text-right"
          style={{ color: isActive ? color.accent : "#444444" }}
        >
          {habit.currentStreak}/30d
        </span>
      </div>

      {/* Current streak */}
      <div className="relative z-10 shrink-0 flex items-center gap-1 w-10 justify-end">
        <Flame
          className="h-3 w-3 shrink-0 transition-colors duration-300"
          style={{ color: isActive ? color.barFrom : "#333333" }}
        />
        <span
          className="text-xs font-bold font-mono transition-colors duration-300"
          style={{ color: isActive ? color.accent : "#444444" }}
        >
          {habit.currentStreak}
        </span>
      </div>

      {/* Best streak */}
      <div className="relative z-10 hidden lg:flex shrink-0 items-center gap-1 w-10 justify-end">
        <Trophy
          className="h-3 w-3 shrink-0"
          style={{ color: isActive ? "#78716c" : "#2a2a2a" }}
        />
        <span
          className="text-xs font-mono"
          style={{ color: isActive ? "#6b7280" : "#333333" }}
        >
          {habit.longestStreak}
        </span>
      </div>

      {/* Actions on hover */}
      <div className="relative z-10 shrink-0 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ml-1">
        <button
          onClick={() => setEditing(true)}
          title="Edit"
          className="h-6 w-6 rounded-md flex items-center justify-center text-neutral-600 hover:text-white hover:bg-neutral-700 transition-all"
        >
          <Pencil className="h-3 w-3" />
        </button>
        <button
          onClick={() => onDelete(habit.id)}
          title="Delete"
          className="h-6 w-6 rounded-md flex items-center justify-center text-neutral-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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
      setHabits(Array.isArray(res.data.habit) ? res.data.habit : []);
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
      setDialogOpen(false);
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
      toast.success("Checked in 🔥");
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

  const handleUpdate = async (
    habitId: string,
    data: { title: string; description?: string },
  ) => {
    try {
      await habitService.updateHabit(habitId, data);
      toast.success("Updated");
      fetchHabits();
    } catch {
      toast.error("Update failed");
    }
  };

  const totalStreaks = habits.reduce((s, h) => s + (h.currentStreak ?? 0), 0);
  const bestStreak = habits.reduce(
    (m, h) => Math.max(m, h.longestStreak ?? 0),
    0,
  );
  const checkedToday = habits.filter((h) => h.currentStreak > 0).length;
  const isEmpty = !loading && habits.length === 0;

  return (
    <div className="min-h-full text-neutral-200 font-sans antialiased">
      <div className="px-5 py-5 space-y-4">
        {/* ── HEADER ── */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
              <Flame className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white leading-none">
                Habits
                {habits.length > 0 && (
                  <span className="ml-2 text-xs font-mono text-neutral-500 font-normal">
                    {habits.length} total
                  </span>
                )}
              </h1>
              <p className="text-xs text-neutral-500 font-mono leading-none mt-0.5">
                {checkedToday > 0
                  ? `${checkedToday}/${habits.length} done today`
                  : "Build streaks, one day at a time"}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            className="h-8 px-4 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-xs rounded-lg shadow-md shadow-orange-600/20 border-0 group shrink-0"
          >
            <Plus className="h-3.5 w-3.5 mr-1 group-hover:rotate-90 transition-transform duration-200" />
            New Habit
          </Button>
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            {
              icon: TrendingUp,
              label: "Total",
              value: habits.length,
              sub: "habits",
              color: "text-white",
              border: "border-neutral-700",
              bg: "bg-[#161616]",
            },
            {
              icon: CheckCircle2,
              label: "Today",
              value: checkedToday,
              sub: "checked in",
              color: "text-emerald-400",
              border: "border-emerald-900/50",
              bg: "bg-[#0d1a12]",
            },
            {
              icon: Flame,
              label: "Streaks",
              value: totalStreaks,
              sub: "active days",
              color: "text-orange-400",
              border: "border-orange-900/50",
              bg: "bg-[#1a1008]",
            },
            {
              icon: Trophy,
              label: "Best",
              value: `${bestStreak}d`,
              sub: "longest",
              color: "text-amber-400",
              border: "border-amber-900/50",
              bg: "bg-[#1a1500]",
            },
          ].map(({ icon: Icon, label, value, sub, color, border, bg }) => (
            <div
              key={label}
              className={`relative rounded-xl border ${border} ${bg} px-4 py-3 flex items-center gap-3 overflow-hidden`}
            >
              {/* Subtle bottom gradient per stat card */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/30 to-transparent" />
              <Icon className={`relative z-10 h-4 w-4 shrink-0 ${color}`} />
              <div className="relative z-10">
                <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider leading-none">
                  {label}
                </p>
                <p className={`text-xl font-black leading-tight ${color}`}>
                  {value}
                </p>
                <p className="text-[9px] text-neutral-600 font-mono leading-none">
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_268px] gap-4">
          {/* Left: list */}
          <div className="space-y-1.5">
            {/* Column labels */}
            {habits.length > 0 && (
              <div className="flex items-center gap-3 px-3.5 pb-1">
                <div className="w-7 shrink-0" />
                <p className="flex-1 text-[9px] font-mono text-neutral-600 uppercase tracking-widest">
                  Habit
                </p>
                <p className="hidden sm:block text-[9px] font-mono text-neutral-600 uppercase tracking-widest w-20 text-right">
                  Progress
                </p>
                <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest w-10 text-right">
                  Streak
                </p>
                <p className="hidden lg:block text-[9px] font-mono text-neutral-600 uppercase tracking-widest w-10 text-right">
                  Best
                </p>
                <div className="w-[3.25rem] shrink-0" />
              </div>
            )}

            {/* Loading skeletons */}
            {loading && (
              <div className="space-y-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-11 rounded-xl border border-neutral-800 bg-neutral-900/50 animate-pulse"
                  />
                ))}
              </div>
            )}

            {/* Empty state */}
            {isEmpty && (
              <div className="rounded-xl border border-neutral-800 bg-[#111111] p-5 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mt-0.5">
                    <Flame className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      Start your first streak
                    </p>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      Habits are the compound interest of self-improvement. Add
                      a small daily action and track it here.
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
                    Quick ideas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "🏃 Morning run",
                      "📖 Read 10 pages",
                      "💧 Drink 2L water",
                      "🧘 Meditate 5 min",
                      "💪 Workout",
                      "🌙 Sleep by 10pm",
                    ].map((s) => (
                      <button
                        key={s}
                        onClick={() => setDialogOpen(true)}
                        className="text-[11px] text-neutral-400 border border-neutral-700 bg-neutral-900 hover:border-orange-500/40 hover:text-orange-300 hover:bg-orange-500/5 rounded-lg px-2.5 py-1 transition-all duration-150"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => setDialogOpen(true)}
                  className="h-9 px-5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-xs rounded-xl border-0 shadow-md shadow-orange-600/15"
                >
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Create your first habit
                </Button>
              </div>
            )}

            {/* Rows */}
            {!loading &&
              habits.map((habit, i) => (
                <HabitRow
                  key={habit.id}
                  habit={habit}
                  colorIndex={i}
                  onCheckIn={handleCheckIn}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))}

            {/* Footer */}
            {!loading && habits.length > 0 && (
              <div className="flex items-center justify-between pt-1 px-1 text-[10px] font-mono text-neutral-600">
                <span>
                  {checkedToday}/{habits.length} checked in today
                </span>
                <div className="w-28 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-700"
                    style={{
                      width: `${habits.length ? (checkedToday / habits.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right: tips panel */}
          <div className="space-y-3">
            <div className="rounded-xl border border-neutral-800 bg-[#111111] p-4 space-y-3">
              <div className="flex items-center gap-2 pb-1 border-b border-neutral-800">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <p className="text-xs font-bold text-neutral-300 uppercase tracking-widest">
                  Tips
                </p>
              </div>
              <ul className="space-y-2.5">
                {[
                  { tip: "Check in daily to grow your streak", icon: "🔥" },
                  { tip: "Start with 1–3 habits max", icon: "🎯" },
                  { tip: "Make it obvious, attractive, easy", icon: "💡" },
                  {
                    tip: "Missing once is fine — avoid missing twice",
                    icon: "⚡",
                  },
                ].map(({ tip, icon }) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2 text-xs text-neutral-400 leading-relaxed"
                  >
                    <span className="shrink-0 mt-0.5">{icon}</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-[#111111] p-4 space-y-3">
              <div className="flex items-center gap-2 pb-1 border-b border-neutral-800">
                <CheckCircle2 className="h-3.5 w-3.5 text-orange-400" />
                <p className="text-xs font-bold text-neutral-300 uppercase tracking-widest">
                  How it works
                </p>
              </div>
              <div className="space-y-2.5">
                {[
                  ["1", "Create a habit with a clear title"],
                  ["2", "Tap the circle each day to check in"],
                  ["3", "Watch your streak grow over time"],
                ].map(([n, text]) => (
                  <div key={n} className="flex items-start gap-2.5">
                    <span className="shrink-0 h-4 w-4 rounded-full bg-orange-500/15 border border-orange-500/30 text-[9px] font-bold text-orange-400 flex items-center justify-center font-mono mt-0.5">
                      {n}
                    </span>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {habits.length > 0 && bestStreak > 0 && (
              <div className="relative rounded-xl border border-amber-800/40 bg-[#1a1400] p-4 space-y-1.5 overflow-hidden">
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-950/40 to-transparent" />
                <div className="relative z-10 flex items-center gap-2">
                  <Trophy className="h-3.5 w-3.5 text-amber-400" />
                  <p className="text-[11px] font-bold text-amber-500 uppercase tracking-widest">
                    Personal best
                  </p>
                </div>
                <p className="relative z-10 text-3xl font-black text-amber-400">
                  {bestStreak}
                  <span className="text-sm font-mono ml-1 text-amber-600">
                    days
                  </span>
                </p>
                <p className="relative z-10 text-[11px] text-neutral-500">
                  Keep pushing — every day counts.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── CREATE DIALOG ── */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) reset();
        }}
      >
        <DialogContent className="bg-[#0f0f0f] border border-neutral-800 text-neutral-200 rounded-2xl shadow-[0_30px_80px_-15px_rgba(0,0,0,0.95)] max-w-md p-0 gap-0 overflow-hidden [&>button]:hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
            <DialogHeader className="space-y-0">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
                  <Target className="h-4 w-4 text-orange-400" />
                </div>
                <DialogTitle className="text-sm font-bold text-white tracking-wide">
                  New Habit
                </DialogTitle>
              </div>
            </DialogHeader>
            <button
              onClick={() => {
                setDialogOpen(false);
                reset();
              }}
              className="text-neutral-500 hover:text-neutral-200 transition-colors rounded-lg p-1 hover:bg-neutral-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
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
                  autoFocus
                  className="h-11 pl-10 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-600 rounded-xl focus-visible:ring-orange-500/20 focus-visible:border-orange-500/50 transition-all duration-200"
                />
              </div>
              {errors.title && (
                <p className="text-[11px] text-red-400 pl-1">
                  {errors.title.message}
                </p>
              )}
            </div>

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
                className="h-11 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-600 rounded-xl focus-visible:ring-orange-500/20 focus-visible:border-orange-500/50 transition-all duration-200"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  reset();
                }}
                disabled={submitting}
                className="flex-1 h-10 rounded-xl bg-transparent border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800 text-sm font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="flex-1 h-10 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold rounded-xl shadow-lg shadow-orange-600/15 border-0"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Plus className="h-4 w-4" />
                    Create Habit
                  </span>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
