import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
} from "lucide-react";
import { IconButton } from "../../../components/icon-button";
import { cn } from "../../../utils/cn";
import {
  STATUS_CHIP_CLASS,
  TASK_STATUS_ORDER,
} from "../constants/kanban-columns";
import type { Task } from "../types/task";
import { formatDueBadge } from "../utils/task-date";

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

  return (
    <li className={cn(
      "rounded-xl bg-surface p-3",
      task.important
        ? "border-2 border-[var(--brand)]"
        : "ring-1 ring-border-card",
    )}>
      <div className="flex items-start gap-1.5">
        <p className="flex-1 text-sm font-medium text-foreground">{task.title}</p>
        {task.important && (
          <img src="/icons/fire.png" alt="Quan trọng" width={20} height={20} className="h-5 w-5 shrink-0 object-contain" />
        )}
      </div>

      {task.description && (
        <p className="mt-1 text-xs leading-relaxed text-muted">
          {task.description}
        </p>
      )}

      {task.dueDate && (
        <span
          className={cn(
            "mt-2 flex w-fit items-center gap-1 rounded-md px-2 py-1 text-xs font-medium",
            STATUS_CHIP_CLASS[task.status],
          )}
        >
          <CalendarClock className="h-3 w-3 shrink-0" />
          {formatDueBadge(task.dueDate)}
          {task.dueTime && ` · ${task.dueTime}`}
        </span>
      )}

      <div className="mt-2 flex items-center justify-end gap-0.5 border-t border-border-card pt-2">
        <IconButton icon={Pencil} label="Sửa task" onClick={() => onEdit(task)} />
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
    </li>
  );
}
