import { ListChecks } from "lucide-react";
import { useState } from "react";
import { WidgetCard } from "../../../components/widget-card";
import { useTasks } from "../hooks/use-tasks";
import AddTaskForm from "./add-task-form";
import KanbanBoard from "./kanban-board";
import TodoToolbar from "./todo-toolbar";

export default function TodoWidget() {
  const { tasksByStatus, isLoading, addTask, moveTask, deleteTask } =
    useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleAddClick(): void {
    setIsFormOpen((prev) => !prev);
  }

  function handleAdd(values: Parameters<typeof addTask>[0]): void {
    addTask(values);
    setIsFormOpen(false);
  }

  return (
    <WidgetCard
      title="Todo"
      icon={ListChecks}
      className="flex-1"
      action={<TodoToolbar onAddClick={handleAddClick} />}
    >
      {isFormOpen && (
        <AddTaskForm onAdd={handleAdd} onCancel={() => setIsFormOpen(false)} />
      )}

      {isLoading ? (
        <p className="py-10 text-center text-sm text-muted">Đang tải…</p>
      ) : (
        <KanbanBoard
          tasksByStatus={tasksByStatus}
          onMove={moveTask}
          onDelete={deleteTask}
        />
      )}
    </WidgetCard>
  );
}
