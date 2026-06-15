import { addDays, formatIsoDate, getTodayIso } from "../../../utils/date";

// Đếm chuỗi ngày liên tiếp tính tới hôm nay. Nếu hôm nay chưa tick nhưng hôm
// qua có thì vẫn tính từ hôm qua (chưa mất streak cho tới khi lỡ trọn 1 ngày).
export function calcStreak(completedDates: string[]): number {
  const completedSet = new Set(completedDates);
  const today = new Date();

  let cursor = completedSet.has(getTodayIso()) ? today : addDays(today, -1);
  let streak = 0;

  while (completedSet.has(formatIsoDate(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return streak;
}
