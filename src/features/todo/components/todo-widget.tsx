import { useCallback, useState } from "react";
import { WidgetCard } from "../../../components/widget-card";
import { useTasks } from "../hooks/use-tasks";
import type { Task, TaskStatus, TaskView } from "../types/task";
import CalendarView from "./calendar-view";
import EnglishView from "./english-view";
import KanbanBoard from "./kanban-board";
import TaskFormModal from "./task-form-modal";
import TodoToolbar from "./todo-toolbar";

const HIDDEN_COLUMNS_KEY = "hiddenKanbanColumns";

function loadHiddenColumns(): Set<TaskStatus> {
  try {
    const stored = localStorage.getItem(HIDDEN_COLUMNS_KEY);
    if (stored) return new Set(JSON.parse(stored) as TaskStatus[]);
  } catch {}

  return new Set();
}

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
  const [hiddenColumns, setHiddenColumns] = useState<Set<TaskStatus>>(loadHiddenColumns);

  const openCreateModal = useCallback((initialDate: string | null): void => {
    setEditingTask(null);
    setModalDate(initialDate);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((task: Task): void => {
    setEditingTask(task);
    setModalDate(null);
    setIsModalOpen(true);
  }, []);

  const toggleColumn = useCallback((status: TaskStatus): void => {
    setHiddenColumns((prev) => {
      const next = new Set(prev);
      if (next.has(status)) {
        next.delete(status);
      } else {
        next.add(status);
      }
      try {
        localStorage.setItem(HIDDEN_COLUMNS_KEY, JSON.stringify([...next]));
      } catch {}

      return next;
    });
  }, []);

  const handleSubmit = useCallback((values: Parameters<typeof addTask>[0]): void => {
    if (editingTask) {
      editTask(editingTask.id, { ...values, status: values.status ?? "backlog", important: values.important ?? false, scope: values.scope ?? null });
    } else {
      addTask(values);
    }
  }, [editingTask, editTask, addTask]);

  return (
    <WidgetCard
      title="Todo"
      icon={
        <img
          src="/icons/todo.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 object-contain"
        />
      }
      className="h-full flex-1"
      bodyClassName="flex min-h-0 flex-col"
      action={
        <TodoToolbar
          view={view}
          hiddenColumns={hiddenColumns}
          onViewChange={setView}
          onToggleColumn={toggleColumn}
          onAddClick={() => openCreateModal(null)}
        />
      }
    >
      {isLoading ? (
        <p className="py-10 text-center text-sm text-muted">Đang tải…</p>
      ) : view === "board" ? (
        <KanbanBoard
          tasksByStatus={tasksByStatus}
          hiddenColumns={hiddenColumns}
          onMove={moveTask}
          onEdit={openEditModal}
          onDelete={deleteTask}
        />
      ) : view === "calendar" ? (
        <CalendarView tasks={tasks} onSelectDate={openCreateModal} />
      ) : (
        <EnglishView />
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
