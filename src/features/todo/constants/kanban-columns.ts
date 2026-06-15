import type { TaskStatus } from "../types/task";

export interface KanbanColumn {
  key: TaskStatus;
  label: string;
  dotClassName: string;
}

export const KANBAN_COLUMNS: KanbanColumn[] = [
  { key: "backlog", label: "Backlog", dotClassName: "bg-slate-400" },
  { key: "todo", label: "Todo", dotClassName: "bg-red-500" },
  { key: "doing", label: "Doing", dotClassName: "bg-amber-500" },
  { key: "done", label: "Done", dotClassName: "bg-emerald-500" },
];

export const TASK_STATUS_ORDER: TaskStatus[] = [
  "backlog",
  "todo",
  "doing",
  "done",
];

// Màu chip task khi hiển thị trong lịch (pastel, có biến thể dark).
export const STATUS_CHIP_CLASS: Record<TaskStatus, string> = {
  backlog: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-200",
  todo: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
  doing: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
  done: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
};
