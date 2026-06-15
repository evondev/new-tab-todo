export type TaskStatus = "backlog" | "todo" | "doing" | "done";

export type TaskView = "board" | "calendar";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string | null; // ISO "YYYY-MM-DD", null = không gắn ngày
  dueTime: string | null; // "HH:mm", null = không gắn giờ
  status: TaskStatus;
  createdAt: string; // ISO datetime
  completedAt: string | null;
}
