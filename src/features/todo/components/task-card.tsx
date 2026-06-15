import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
} from "lucide-react";
import { IconButton } from "../../../components/icon-button";
import { cn } from "../../../utils/cn";
import { TASK_STATUS_ORDER } from "../constants/kanban-columns";
import type { Task } from "../types/task";
import { formatDueBadge, isOverdue } from "../utils/task-date";

type MoveDirection = "prev" | "next";

interface TaskCardProps {
  task: Task;
  onMove: (id: string, direction: MoveDirection) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({
  task,
  onMove,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const statusIndex = TASK_STATUS_ORDER.indexOf(task.status);
  const canMovePrev = statusIndex > 0;
  const canMoveNext = statusIndex < TASK_STATUS_ORDER.length - 1;
  const hasOverdueWarning =
    task.status !== "done" && task.dueDate !== null && isOverdue(task.dueDate);

  return (
    <li className="group rounded-xl bg-surface p-3 ring-1 ring-border-card">
      <p className="text-sm font-medium text-foreground">{task.title}</p>

      {task.description && (
        <p className="mt-1 text-xs leading-relaxed text-muted">
          {task.description}
        </p>
      )}

      <div className="mt-2 flex items-center justify-between">
        {task.dueDate ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
              hasOverdueWarning &&
                "bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300",
            )}
          >
            <CalendarClock className="h-3 w-3" />
            {formatDueBadge(task.dueDate)}
          </span>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
          <IconButton
            icon={Pencil}
            label="Sửa task"
            onClick={() => onEdit(task)}
          />
          <IconButton
            icon={ChevronLeft}
            label="Chuyển sang cột trước"
            disabled={!canMovePrev}
            onClick={() => onMove(task.id, "prev")}
          />
          <IconButton
            icon={ChevronRight}
            label="Chuyển sang cột sau"
            disabled={!canMoveNext}
            onClick={() => onMove(task.id, "next")}
          />
          <IconButton
            icon={Trash2}
            label="Xoá task"
            className="hover:text-rose-500"
            onClick={() => onDelete(task.id)}
          />
        </div>
      </div>
    </li>
  );
}
