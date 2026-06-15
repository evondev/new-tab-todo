import { ListChecks } from "lucide-react";
import { useState } from "react";
import { WidgetCard } from "../../../components/widget-card";
import { useTasks } from "../hooks/use-tasks";
import type { TaskView } from "../types/task";
import CalendarView from "./calendar-view";
import KanbanBoard from "./kanban-board";
import TaskFormModal from "./task-form-modal";
import TodoToolbar from "./todo-toolbar";

export default function TodoWidget() {
  const { tasks, tasksByStatus, isLoading, addTask, moveTask, deleteTask } =
    useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState<string | null>(null);
  const [view, setView] = useState<TaskView>("board");

  function openCreateModal(initialDate: string | null): void {
    setModalDate(initialDate);
    setIsModalOpen(true);
  }

  return (
    <WidgetCard
      title="Todo"
      icon={ListChecks}
      className="flex-1"
      action={
        <TodoToolbar
          view={view}
          onViewChange={setView}
          onAddClick={() => openCreateModal(null)}
        />
      }
    >
      {isLoading ? (
        <p className="py-10 text-center text-sm text-muted">Đang tải…</p>
      ) : view === "board" ? (
        <KanbanBoard
          tasksByStatus={tasksByStatus}
          onMove={moveTask}
          onDelete={deleteTask}
        />
      ) : (
        <CalendarView tasks={tasks} onSelectDate={openCreateModal} />
      )}

      <TaskFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={addTask}
        initialDate={modalDate}
      />
    </WidgetCard>
  );
}
