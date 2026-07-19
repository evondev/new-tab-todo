import { cn } from "../../../utils/cn";
import type { WeekDay } from "../utils/current-week";

interface HabitDotsProps {
  weekDays: WeekDay[];
  completedDates: string[];
}

export default function HabitDots({
  weekDays,
  completedDates,
}: HabitDotsProps) {
  const completedSet = new Set(completedDates);

  return (
    <div className="flex shrink-0 items-center gap-1">
      {weekDays.map((day) => {
        const isDone = completedSet.has(day.iso);

        return (
          <span
            key={day.iso}
            title={`${day.label} — ${isDone ? "đã làm" : "chưa làm"}`}
            className={cn(
              "h-2 w-2 rounded-full",
              isDone && "bg-emerald-500",
              !isDone && !day.isFuture && "bg-border ring-1 ring-inset ring-muted/30",
              day.isFuture && "bg-transparent ring-1 ring-inset ring-border",
              day.isToday && !isDone && "ring-1 ring-brand",
            )}
          />
        );
      })}
    </div>
  );
}
