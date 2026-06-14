import { STORAGE_KEY } from "../constants/storage-keys";
import type { Task } from "../types/task";

function hasChromeStorage(): boolean {
  return typeof chrome !== "undefined" && !!chrome.storage?.local;
}

export async function loadTasks(): Promise<Task[]> {
  if (hasChromeStorage()) {
    const stored = await chrome.storage.local.get(STORAGE_KEY);
    return (stored[STORAGE_KEY] as Task[] | undefined) ?? [];
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Task[]) : [];
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  if (hasChromeStorage()) {
    await chrome.storage.local.set({ [STORAGE_KEY]: tasks });
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
