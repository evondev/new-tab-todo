import { Check, Trash2 } from "lucide-react";
import { cn } from "../../../utils/cn";
import { Button } from "../../../components/button";
import type { Task } from "../types/task";
import { formatDueDate, isOverdue } from "../utils/task-date";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const hasOverdueWarning =
    !task.isDone && task.dueDate !== null && isOverdue(task.dueDate);

  return (
    <li className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/5">
      <Button
        variant="ghost"
        aria-label={task.isDone ? "Bỏ đánh dấu" : "Đánh dấu xong"}
        onClick={() => onToggle(task.id)}
        className={cn(
          "h-5 w-5 shrink-0 rounded-full border p-0",
          task.isDone
            ? "border-indigo-500 bg-indigo-500 text-white"
            : "border-slate-500 text-transparent hover:border-indigo-400",
        )}
      >
        <Check size={12} />
      </Button>

      <div className="flex-1">
        <p
          className={cn(
            "text-sm text-slate-100",
            task.isDone && "text-slate-500 line-through",
          )}
        >
          {task.title}
        </p>
        {task.dueDate && (
          <p
            className={cn(
              "text-xs text-slate-500",
              hasOverdueWarning && "text-rose-400",
            )}
          >
            {formatDueDate(task.dueDate)}
            {hasOverdueWarning && " · quá hạn"}
          </p>
        )}
      </div>

      <Button
        variant="danger"
        aria-label="Xoá"
        onClick={() => onDelete(task.id)}
        className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100"
      >
        <Trash2 size={14} />
      </Button>
    </li>
  );
}
