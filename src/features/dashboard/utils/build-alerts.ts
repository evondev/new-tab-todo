import { daysFromToday, getTodayIso } from "../../../utils/date";
import type { Reminder, ReminderPerson } from "../../reminders/types/reminder";
import type { Task } from "../../todo/types/task";

export type AlertTone = "overdue" | "today" | "soon" | "important" | "week" | "month";
export type AlertSource = "todo" | "reminder";

export interface AlertItem {
  key: string;
  source: AlertSource;
  sourceId: string;
  message: string;
  person: ReminderPerson | null;
  tone: AlertTone;
  diff: number;
  time: string | null;
}

// Todo: hiện quá hạn + hôm nay + mai + mốt. Reminders: chỉ quá hạn + hôm nay.
const TODO_WINDOW_DAYS = 2;

function toneOf(diff: number): AlertTone {
  if (diff < 0) return "overdue";
  if (diff === 0) return "today";

  return "soon";
}

function todoMessage(diff: number, title: string, time: string | null): string {
  const at = time ? ` lúc ${time}` : "";

  if (diff < 0) return `Quá hạn: ${title}`;
  if (diff === 0) return `Hôm nay${at} bạn cần: ${title}`;
  if (diff === 1) return `Ngày mai${at} bạn cần: ${title}`;

  return `Ngày mốt${at} bạn cần: ${title}`;
}

function reminderMessage(diff: number, title: string): string {
  if (diff < 0) return `Quá hạn: ${title}`;

  return `Hôm nay nhớ: ${title}`;
}

export function buildAlerts(tasks: Task[], reminders: Reminder[]): AlertItem[] {
  const today = getTodayIso();
  const items: AlertItem[] = [];
  const includedTaskIds = new Set<string>();

  // Important tasks (any status except done) always appear
  for (const task of tasks) {
    if (task.status === "done" || !task.important) continue;

    includedTaskIds.add(task.id);

    if (!task.dueDate) {
      items.push({
        key: `todo-${task.id}`,
        source: "todo",
        sourceId: task.id,
        message: `Bạn nhớ: ${task.title}`,
        person: null,
        tone: "important",
        diff: Infinity,
        time: null,
      });
    } else {
      const diff = daysFromToday(task.dueDate);

      items.push({
        key: `todo-${task.id}`,
        source: "todo",
        sourceId: task.id,
        message: todoMessage(diff, task.title, task.dueTime),
        person: null,
        tone: toneOf(diff),
        diff,
        time: task.dueTime,
      });
    }
  }

  // Non-important tasks with upcoming due dates (existing window logic)
  for (const task of tasks) {
    if (task.status === "done" || task.status === "backlog" || !task.dueDate)
      continue;
    if (includedTaskIds.has(task.id)) continue;

    const diff = daysFromToday(task.dueDate);
    if (diff > TODO_WINDOW_DAYS) continue;

    items.push({
      key: `todo-${task.id}`,
      source: "todo",
      sourceId: task.id,
      message: todoMessage(diff, task.title, task.dueTime),
      person: null,
      tone: toneOf(diff),
      diff,
      time: task.dueTime,
    });
  }

  // Scoped tasks (week/month) — not done, not already included
  for (const task of tasks) {
    if (task.status === "done" || !task.scope) continue;
    if (includedTaskIds.has(task.id)) continue;

    const scopeLabel = task.scope === "week" ? "Tuần này" : "Tháng này";

    items.push({
      key: `todo-${task.id}`,
      source: "todo",
      sourceId: task.id,
      message: `${scopeLabel} bạn cần: ${task.title}`,
      person: null,
      tone: task.scope,
      diff: Infinity,
      time: null,
    });
  }

  for (const reminder of reminders) {
    if (reminder.lastCompletedDate === today) continue;

    const diff = daysFromToday(reminder.nextDueDate);
    if (diff > 0) continue;

    items.push({
      key: `reminder-${reminder.id}`,
      source: "reminder",
      sourceId: reminder.id,
      message: reminderMessage(diff, reminder.title),
      person: reminder.person,
      tone: toneOf(diff),
      diff,
      time: null,
    });
  }

  // Theo độ gấp (số ngày), cùng ngày thì việc có giờ sớm hơn lên trước.
  return items.sort(
    (first, second) =>
      first.diff - second.diff ||
      (first.time ?? "99:99").localeCompare(second.time ?? "99:99"),
  );
}
