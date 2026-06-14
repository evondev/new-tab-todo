export interface Task {
  id: string;
  title: string;
  dueDate: string | null; // ISO "YYYY-MM-DD", null = không gắn ngày
  isDone: boolean;
  createdAt: string; // ISO datetime
  completedAt: string | null;
}
