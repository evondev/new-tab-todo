export interface Storage<T> {
  load: () => Promise<T>;
  save: (value: T) => Promise<void>;
  subscribe: (listener: (value: T) => void) => () => void;
}

function hasChromeStorage(): boolean {
  return typeof chrome !== "undefined" && !!chrome.storage?.local;
}

export function createStorage<T>(key: string, fallback: T): Storage<T> {
  // Mọi instance hook dùng cùng key sẽ nhận thông báo khi 1 nơi save,
  // giúp các widget chia sẻ dữ liệu luôn đồng bộ (không cần Context).
  const listeners = new Set<(value: T) => void>();

  async function load(): Promise<T> {
    if (hasChromeStorage()) {
      const stored = await chrome.storage.local.get(key);
      return (stored[key] as T | undefined) ?? fallback;
    }

    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  }

  async function save(value: T): Promise<void> {
    listeners.forEach((listener) => listener(value));

    if (hasChromeStorage()) {
      await chrome.storage.local.set({ [key]: value });
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  function subscribe(listener: (value: T) => void): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  return { load, save, subscribe };
}
