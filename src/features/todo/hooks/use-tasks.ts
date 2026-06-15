import { useLocalState } from "../../../hooks/use-local-state";
import { TASK_STATUS_ORDER } from "../constants/kanban-columns";
import type { Task, TaskStatus } from "../types/task";
import { migrateTasks } from "../utils/migrate-tasks";
import { taskStorage } from "../utils/task-storage";

type MoveDirection = "prev" | "next";

interface AddTaskInput {
  title: string;
  description: string;
  dueDate: string | null;
}

type TasksByStatus = Record<TaskStatus, Task[]>;

interface UseTasksResult {
  tasksByStatus: TasksByStatus;
  isLoading: boolean;
  addTask: (input: AddTaskInput) => void;
  moveTask: (id: string, direction: MoveDirection) => void;
  deleteTask: (id: string) => void;
}

function groupByStatus(tasks: Task[]): TasksByStatus {
  const grouped: TasksByStatus = {
    backlog: [],
    todo: [],
    doing: [],
    done: [],
  };

  for (const task of tasks) {
    grouped[task.status].push(task);
  }

  return grouped;
}

function getAdjacentStatus(
  status: TaskStatus,
  direction: MoveDirection,
): TaskStatus | null {
  const currentIndex = TASK_STATUS_ORDER.indexOf(status);
  const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

  if (nextIndex < 0 || nextIndex >= TASK_STATUS_ORDER.length) return null;

  return TASK_STATUS_ORDER[nextIndex];
}

export function useTasks(): UseTasksResult {
  const [tasks, persist, isLoading] = useLocalState<Task[]>(
    taskStorage,
    [],
    migrateTasks,
  );

  function addTask({ title, description, dueDate }: AddTaskInput): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      dueDate,
      status: "backlog",
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    persist([newTask, ...tasks]);
  }

  function moveTask(id: string, direction: MoveDirection): void {
    const nextTasks = tasks.map((task) => {
      if (task.id !== id) return task;

      const nextStatus = getAdjacentStatus(task.status, direction);
      if (!nextStatus) return task;

      return {
        ...task,
        status: nextStatus,
        completedAt: nextStatus === "done" ? new Date().toISOString() : null,
      };
    });

    persist(nextTasks);
  }

  function deleteTask(id: string): void {
    persist(tasks.filter((task) => task.id !== id));
  }

  return {
    tasksByStatus: groupByStatus(tasks),
    isLoading,
    addTask,
    moveTask,
    deleteTask,
  };
}
