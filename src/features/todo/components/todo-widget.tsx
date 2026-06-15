import { ListChecks } from "lucide-react";
import { useState } from "react";
import { WidgetCard } from "../../../components/widget-card";
import { useTasks } from "../hooks/use-tasks";
import KanbanBoard from "./kanban-board";
import TaskFormModal from "./task-form-modal";
import TodoToolbar from "./todo-toolbar";

export default function TodoWidget() {
  const { tasksByStatus, isLoading, addTask, moveTask, deleteTask } =
    useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <WidgetCard
      title="Todo"
      icon={ListChecks}
      className="flex-1"
      action={<TodoToolbar onAddClick={() => setIsModalOpen(true)} />}
    >
      {isLoading ? (
        <p className="py-10 text-center text-sm text-muted">Đang tải…</p>
      ) : (
        <KanbanBoard
          tasksByStatus={tasksByStatus}
          onMove={moveTask}
          onDelete={deleteTask}
        />
      )}

      <TaskFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={addTask}
      />
    </WidgetCard>
  );
}
