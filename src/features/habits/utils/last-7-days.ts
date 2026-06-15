import { addDays, formatIsoDate } from "../../../utils/date";

const WEEKDAY_LABELS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export interface DayCell {
  iso: string;
  weekdayLabel: string;
}

// 7 ngày gần nhất, cũ nhất trước, kết thúc ở hôm nay.
export function getLast7Days(): DayCell[] {
  const today = new Date();

  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(today, index - 6);

    return {
      iso: formatIsoDate(date),
      weekdayLabel: WEEKDAY_LABELS[date.getDay()],
    };
  });
}
