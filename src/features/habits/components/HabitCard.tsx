import { Flame, Trophy, CheckCircle2, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Habit } from "../types/habit.type";

interface Props {
  habit: Habit;
  onCheckIn: (habitId: string) => void;
  onDelete: (habitId: string) => void;
}

export default function HabitCard({ habit, onCheckIn, onDelete }: Props) {
  const createdDate = new Date(habit.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Visual streak progress bar — cap at 30 days for display
  const streakProgress = Math.min((habit.currentStreak / 30) * 100, 100);

  return (
    <div className="group relative rounded-2xl border border-white/[0.06] bg-[#0b0b0b]/90 backdrop-blur-xl shadow-[0_8px_30px_-10px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-orange-500/20 hover:shadow-[0_12px_40px_-10px_rgba(249,115,22,0.08)]">
      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5 flex-1 min-w-0">
            <h3 className="font-bold text-white text-sm leading-tight truncate">
              {habit.title}
            </h3>
            {habit.description && (
              <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                {habit.description}
              </p>
            )}
          </div>
          {/* Active streak badge */}
          {habit.currentStreak > 0 && (
            <div className="shrink-0 inline-flex items-center gap-1 rounded-full bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-orange-400 font-mono">
              <Flame className="h-3 w-3 fill-orange-500/20" />
              {habit.currentStreak}d
            </div>
          )}
        </div>

        {/* Streak Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-neutral-600">Monthly Progress</span>
            <span className="text-neutral-500">{habit.currentStreak}/30d</span>
          </div>
          <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${streakProgress}%` }}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-xl bg-white/[0.02] border border-white/[0.04] px-3 py-2">
            <Flame className="h-3.5 w-3.5 text-orange-400 shrink-0" />
            <div>
              <p className="text-[9px] text-neutral-600 font-mono uppercase tracking-wider leading-none mb-0.5">
                Current
              </p>
              <p className="text-sm font-black text-white leading-none">
                {habit.currentStreak}d
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/[0.02] border border-white/[0.04] px-3 py-2">
            <Trophy className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <div>
              <p className="text-[9px] text-neutral-600 font-mono uppercase tracking-wider leading-none mb-0.5">
                Best
              </p>
              <p className="text-sm font-black text-white leading-none">
                {habit.longestStreak}d
              </p>
            </div>
          </div>
        </div>

        {/* Created date */}
        <div className="flex items-center gap-1.5 text-[10px] text-neutral-600 font-mono">
          <Calendar className="h-3 w-3" />
          Since {createdDate}
        </div>
      </div>

      {/* Actions footer */}
      <div className="px-5 pb-5 flex gap-2.5">
        <Button
          onClick={() => onCheckIn(habit.id)}
          className="flex-1 h-9 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white text-xs font-bold tracking-wide rounded-xl shadow-md shadow-orange-600/10 transition-all duration-300 border-0 group/btn"
        >
          <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 group-hover/btn:scale-110 transition-transform" />
          Check In
        </Button>
        <Button
          onClick={() => onDelete(habit.id)}
          variant="outline"
          className="h-9 w-9 p-0 rounded-xl bg-transparent border-neutral-800/60 text-neutral-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-200"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
