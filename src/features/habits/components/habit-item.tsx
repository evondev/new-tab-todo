import { Check, Flame, Trash2 } from "lucide-react";
import { IconButton } from "../../../components/icon-button";
import { cn } from "../../../utils/cn";
import { getTodayIso } from "../../../utils/date";
import type { Habit } from "../types/habit";
import { getLast7Days } from "../utils/last-7-days";
import { calcStreak } from "../utils/streak";

interface HabitItemProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function HabitItem({ habit, onToggle, onDelete }: HabitItemProps) {
  const completedSet = new Set(habit.completedDates);
  const isDoneToday = completedSet.has(getTodayIso());
  const streak = calcStreak(habit.completedDates);
  const last7Days = getLast7Days();

  return (
    <li className="group flex items-center gap-3 rounded-lg px-1 py-2 hover:bg-background">
      <IconButton
        icon={Check}
        label={isDoneToday ? "Bỏ tick hôm nay" : "Tick hôm nay"}
        onClick={() => onToggle(habit.id)}
        className={cn(
          "h-5 w-5 rounded-md border",
          isDoneToday &&
            "border-(--brand) bg-(--brand) text-white hover:bg-(--brand-hover) hover:text-white",
          !isDoneToday &&
            "border-muted text-transparent hover:bg-transparent hover:text-transparent",
        )}
      />

      <span
        className={cn(
          "flex-1 truncate text-sm font-medium text-foreground",
          isDoneToday && "text-muted line-through",
        )}
      >
        {habit.name}
      </span>

      <div className="flex items-center gap-1">
        {last7Days.map((day) => (
          <span
            key={day.iso}
            title={day.weekdayLabel}
            className={cn(
              "h-2 w-2 rounded-full",
              completedSet.has(day.iso) ? "bg-(--brand)" : "bg-border",
            )}
          />
        ))}
      </div>

      <span className="flex w-8 items-center justify-end gap-0.5 text-xs font-semibold text-amber-500">
        <Flame className="h-3.5 w-3.5" />
        {streak}
      </span>

      <IconButton
        icon={Trash2}
        label="Xoá thói quen"
        onClick={() => onDelete(habit.id)}
        className="hidden hover:text-rose-500 group-hover:inline-flex"
      />
    </li>
  );
}
