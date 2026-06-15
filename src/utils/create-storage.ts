export interface Storage<T> {
  load: () => Promise<T>;
  save: (value: T) => Promise<void>;
}

function hasChromeStorage(): boolean {
  return typeof chrome !== "undefined" && !!chrome.storage?.local;
}

export function createStorage<T>(key: string, fallback: T): Storage<T> {
  async function load(): Promise<T> {
    if (hasChromeStorage()) {
      const stored = await chrome.storage.local.get(key);
      return (stored[key] as T | undefined) ?? fallback;
    }

    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  }

  async function save(value: T): Promise<void> {
    if (hasChromeStorage()) {
      await chrome.storage.local.set({ [key]: value });
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }

  return { load, save };
}
