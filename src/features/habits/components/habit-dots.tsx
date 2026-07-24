import { cn } from "../../../utils/cn";
import type { WeekDay } from "../utils/current-week";

interface HabitDotsProps {
  weekDays: WeekDay[];
  completedDates: string[];
}

function getDayStatusLabel(
  isDone: boolean,
  isMissed: boolean,
  isFuture: boolean,
): string {
  if (isDone) return "đã làm";
  if (isMissed) return "bỏ lỡ";
  if (isFuture) return "chưa tới";

  return "hôm nay, chưa làm";
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
        // Chỉ ngày đã qua mới tính là miss — hôm nay vẫn còn cơ hội làm.
        const isMissed = !isDone && !day.isToday && !day.isFuture;

        return (
          <span
            key={day.iso}
            title={`${day.label} — ${getDayStatusLabel(isDone, isMissed, day.isFuture)}`}
            className={cn(
              "h-2 w-2 rounded-full",
              isDone && "bg-emerald-500",
              isMissed && "bg-red-500",
              day.isFuture && "bg-transparent ring-1 ring-inset ring-border",
              day.isToday && !isDone && "bg-transparent ring-1 ring-brand",
            )}
          />
        );
      })}
    </div>
  );
}
