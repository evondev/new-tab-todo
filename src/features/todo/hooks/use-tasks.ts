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
  dueTime: string | null;
  status?: TaskStatus;
}

interface EditTaskInput {
  title: string;
  description: string;
  dueDate: string | null;
  dueTime: string | null;
  status: TaskStatus;
}

type TasksByStatus = Record<TaskStatus, Task[]>;

interface UseTasksResult {
  tasks: Task[];
  tasksByStatus: TasksByStatus;
  isLoading: boolean;
  addTask: (input: AddTaskInput) => void;
  editTask: (id: string, input: EditTaskInput) => void;
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

  function addTask({
    title,
    description,
    dueDate,
    dueTime,
    status = "backlog",
  }: AddTaskInput): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      dueDate,
      dueTime: dueDate ? dueTime : null,
      status,
      createdAt: new Date().toISOString(),
      completedAt: status === "done" ? new Date().toISOString() : null,
    };

    persist([newTask, ...tasks]);
  }

  function editTask(
    id: string,
    { title, description, dueDate, dueTime, status }: EditTaskInput,
  ): void {
    persist(
      tasks.map((task) => {
        if (task.id !== id) return task;

        return {
          ...task,
          title: title.trim(),
          description: description.trim(),
          dueDate,
          dueTime: dueDate ? dueTime : null,
          status,
          completedAt:
            status === "done"
              ? (task.completedAt ?? new Date().toISOString())
              : null,
        };
      }),
    );
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
    tasks,
    tasksByStatus: groupByStatus(tasks),
    isLoading,
    addTask,
    editTask,
    moveTask,
    deleteTask,
  };
}
