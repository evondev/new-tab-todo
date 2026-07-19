import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { IconButton } from "../../../components/icon-button";
import { getTodayIso } from "../../../utils/date";
import {
  getMonthLabel,
  getMonthMatrix,
  getNextMonth,
  getPreviousMonth,
  WEEKDAY_HEADERS,
} from "../../../utils/calendar-month";
import { useEnglishStreak } from "../hooks/use-english-streak";
import StreakDayCell from "./streak-day-cell";

export default function EnglishView() {
  const { activeDays, streak, isLoading, toggleDay } = useEnglishStreak();
  const now = new Date();
  const [current, setCurrent] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  });

  const cells = useMemo(
    () => getMonthMatrix(current.year, current.month),
    [current],
  );
  // Chuỗi ISO "YYYY-MM-DD" so sánh từ điển được, không cần parse ra Date.
  const todayIso = getTodayIso();

  if (isLoading) {
    return <p className="py-10 text-center text-sm text-muted">Đang tải…</p>;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-foreground">
            {getMonthLabel(current.year, current.month)}
          </h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
            <img
              src="/icons/streak.png"
              alt=""
              width={14}
              height={14}
              className="h-3.5 w-3.5 object-contain"
            />
            {streak} ngày
          </span>
        </div>

        <div className="flex items-center gap-1">
          <IconButton
            icon={ChevronLeft}
            label="Tháng trước"
            className="h-8 w-8 rounded-full"
            onClick={() =>
              setCurrent(getPreviousMonth(current.year, current.month))
            }
          />
          <IconButton
            icon={ChevronRight}
            label="Tháng sau"
            className="h-8 w-8 rounded-full"
            onClick={() =>
              setCurrent(getNextMonth(current.year, current.month))
            }
          />
        </div>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-2">
        {WEEKDAY_HEADERS.map((label) => (
          <span
            key={label}
            className="text-center text-xs font-medium text-muted"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {cells.map((cell) => (
          <StreakDayCell
            key={cell.iso}
            cell={cell}
            isActive={activeDays.has(cell.iso)}
            isFuture={cell.iso > todayIso}
            onToggle={toggleDay}
          />
        ))}
      </div>
    </div>
  );
}
