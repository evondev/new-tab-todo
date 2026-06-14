const WEEKDAY_LABELS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

function toDateOnly(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseDueDate(dueDate: string): Date {
  const [year, month, day] = dueDate.split("-").map(Number);

  return new Date(year, month - 1, day);
}

export function getTodayIso(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isToday(dueDate: string): boolean {
  return dueDate === getTodayIso();
}

export function isOverdue(dueDate: string): boolean {
  return parseDueDate(dueDate).getTime() < toDateOnly(new Date()).getTime();
}

export function isUpcoming(dueDate: string): boolean {
  return parseDueDate(dueDate).getTime() > toDateOnly(new Date()).getTime();
}

export function formatDueDate(dueDate: string): string {
  const parsed = parseDueDate(dueDate);
  const weekday = WEEKDAY_LABELS[parsed.getDay()];
  const day = String(parsed.getDate()).padStart(2, "0");
  const month = String(parsed.getMonth() + 1).padStart(2, "0");

  return `${weekday}, ${day}/${month}`;
}
