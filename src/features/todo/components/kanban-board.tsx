import { KANBAN_COLUMNS } from "../constants/kanban-columns";
import type { Task, TaskStatus } from "../types/task";
import KanbanColumn from "./kanban-column";

type MoveDirection = "prev" | "next";

interface KanbanBoardProps {
  tasksByStatus: Record<TaskStatus, Task[]>;
  onMove: (id: string, direction: MoveDirection) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function KanbanBoard({
  tasksByStatus,
  onMove,
  onEdit,
  onDelete,
}: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {KANBAN_COLUMNS.map((column) => (
        <KanbanColumn
          key={column.key}
          column={column}
          tasks={tasksByStatus[column.key]}
          onMove={onMove}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
