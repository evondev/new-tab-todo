import { addDays, formatIsoDate, getTodayIso, toDateOnly } from "../../../utils/date";

const WEEKDAY_LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export interface WeekDay {
  iso: string;
  label: string;
  isToday: boolean;
  isFuture: boolean;
}

// Tuần hiện tại: Thứ 2 → Chủ nhật. Sang thứ 2 mới là lưới reset.
export function getCurrentWeekDays(): WeekDay[] {
  const today = toDateOnly(new Date());
  const mondayOffset = (today.getDay() + 6) % 7; // Mon = 0 … Sun = 6
  const monday = addDays(today, -mondayOffset);
  const todayIso = getTodayIso();

  return WEEKDAY_LABELS.map((label, index) => {
    const iso = formatIsoDate(addDays(monday, index));

    return {
      iso,
      label,
      isToday: iso === todayIso,
      isFuture: iso > todayIso,
    };
  });
}
