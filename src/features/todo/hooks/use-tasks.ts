import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { loadTasks, saveTasks } from "../utils/task-storage";

interface AddTaskInput {
  title: string;
  dueDate: string | null;
}

interface UseTasksResult {
  tasks: Task[];
  isLoading: boolean;
  addTask: (input: AddTaskInput) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export function useTasks(): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    loadTasks().then((loadedTasks) => {
      if (!isMounted) return;

      setTasks(loadedTasks);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  function persist(nextTasks: Task[]): void {
    setTasks(nextTasks);
    saveTasks(nextTasks);
  }

  function addTask({ title, dueDate }: AddTaskInput): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      dueDate,
      isDone: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    persist([newTask, ...tasks]);
  }

  function toggleTask(id: string): void {
    const nextTasks = tasks.map((task) => {
      if (task.id !== id) return task;

      const isDone = !task.isDone;

      return {
        ...task,
        isDone,
        completedAt: isDone ? new Date().toISOString() : null,
      };
    });

    persist(nextTasks);
  }

  function deleteTask(id: string): void {
    persist(tasks.filter((task) => task.id !== id));
  }

  return { tasks, isLoading, addTask, toggleTask, deleteTask };
}
