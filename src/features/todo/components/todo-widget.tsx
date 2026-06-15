import { ListChecks } from "lucide-react";
import { useState } from "react";
import { WidgetCard } from "../../../components/widget-card";
import { useTasks } from "../hooks/use-tasks";
import type { Task, TaskView } from "../types/task";
import CalendarView from "./calendar-view";
import KanbanBoard from "./kanban-board";
import TaskFormModal from "./task-form-modal";
import TodoToolbar from "./todo-toolbar";

export default function TodoWidget() {
  const {
    tasks,
    tasksByStatus,
    isLoading,
    addTask,
    editTask,
    moveTask,
    deleteTask,
  } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [view, setView] = useState<TaskView>("board");

  function openCreateModal(initialDate: string | null): void {
    setEditingTask(null);
    setModalDate(initialDate);
    setIsModalOpen(true);
  }

  function openEditModal(task: Task): void {
    setEditingTask(task);
    setModalDate(null);
    setIsModalOpen(true);
  }

  function handleSubmit(values: Parameters<typeof addTask>[0]): void {
    if (editingTask) {
      editTask(editingTask.id, { ...values, status: values.status ?? "backlog" });
    } else {
      addTask(values);
    }
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
          onEdit={openEditModal}
          onDelete={deleteTask}
        />
      ) : (
        <CalendarView tasks={tasks} onSelectDate={openCreateModal} />
      )}

      <TaskFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleSubmit}
        initialDate={modalDate}
        task={editingTask}
      />
    </WidgetCard>
  );
}
