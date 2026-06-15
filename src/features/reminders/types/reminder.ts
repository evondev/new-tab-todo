export type ReminderUnit = "day" | "week" | "month";

export type ReminderPerson = "me" | "wife" | "child";

export interface Reminder {
  id: string;
  title: string;
  person: ReminderPerson;
  interval: number; // lặp mỗi `interval` `unit`
  unit: ReminderUnit;
  nextDueDate: string; // ISO "YYYY-MM-DD" — lần tới cần làm
  lastCompletedDate: string | null;
  createdAt: string;
}
