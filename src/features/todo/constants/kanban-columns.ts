import type { TaskStatus } from "../types/task";

export interface KanbanColumn {
  key: TaskStatus;
  label: string;
  dotClassName: string;
}

export const KANBAN_COLUMNS: KanbanColumn[] = [
  { key: "backlog", label: "Backlog", dotClassName: "bg-slate-400" },
  { key: "todo", label: "Todo", dotClassName: "bg-blue-500" },
  { key: "doing", label: "Doing", dotClassName: "bg-amber-500" },
  { key: "done", label: "Done", dotClassName: "bg-rose-500" },
];

export const TASK_STATUS_ORDER: TaskStatus[] = [
  "backlog",
  "todo",
  "doing",
  "done",
];
