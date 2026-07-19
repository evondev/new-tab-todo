import { cn } from "../../../utils/cn";
import type { CalendarCell } from "../../../utils/calendar-month";

interface StreakDayCellProps {
  cell: CalendarCell;
  isActive: boolean;
  isFuture: boolean;
  onToggle: (iso: string) => void;
}

export default function StreakDayCell({
  cell,
  isActive,
  isFuture,
  onToggle,
}: StreakDayCellProps) {
  return (
    <button
      type="button"
      disabled={isFuture}
      aria-pressed={isActive}
      aria-label={`Ngày ${cell.dayNumber}`}
      title={isFuture ? "Chưa tới ngày này" : undefined}
      onClick={() => onToggle(cell.iso)}
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-xl text-sm font-medium transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isFuture && "cursor-not-allowed bg-background/50 text-muted opacity-50",
        !isFuture && "cursor-pointer",
        !isFuture &&
          isActive &&
          "border border-orange-400 bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
        !isFuture &&
          !isActive &&
          "bg-background text-foreground ring-1 ring-border-card hover:ring-2 hover:ring-ring",
        !cell.isCurrentMonth && "opacity-40",
      )}
    >
      {cell.isToday && !isActive && !isFuture ? (
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white">
          {cell.dayNumber}
        </span>
      ) : (
        cell.dayNumber
      )}

      {isActive && (
        <img
          src="/icons/streak.png"
          alt=""
          width={20}
          height={20}
          className="absolute right-1 top-1 h-5 w-5 object-contain"
        />
      )}
    </button>
  );
}
