import type {
  AccentColorKey,
  Settings,
} from "../types/settings";

export const SETTINGS_STORAGE_KEY = "settings";

export const DEFAULT_SETTINGS: Settings = {
  boardName: "Personal Tracker",
  theme: "light",
  accentColor: "slate",
  background: "none",
};

export interface AccentOption {
  key: AccentColorKey;
  label: string;
  base: string;
  hover: string;
}

export const ACCENT_OPTIONS: AccentOption[] = [
  { key: "emerald", label: "Xanh lá", base: "#10b981", hover: "#059669" },
  { key: "blue", label: "Xanh dương", base: "#3b82f6", hover: "#2563eb" },
  { key: "violet", label: "Tím", base: "#8b5cf6", hover: "#7c3aed" },
  { key: "rose", label: "Đỏ", base: "#f43f5e", hover: "#e11d48" },
  { key: "amber", label: "Vàng", base: "#f59e0b", hover: "#d97706" },
  { key: "slate", label: "Xám", base: "#0f172a", hover: "#1e293b" },
];

export interface BackgroundOption {
  id: string;
  label: string;
  url: string | null; // null = nền trơn (gradient)
}

// Ảnh nằm trong public/background/ (photo-1..8.avif).
export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  { id: "photo-1", label: "Ảnh 1", url: "/background/photo-1.avif" },
  { id: "photo-2", label: "Ảnh 2", url: "/background/photo-2.avif" },
  { id: "photo-3", label: "Ảnh 3", url: "/background/photo-3.avif" },
  { id: "photo-4", label: "Ảnh 4", url: "/background/photo-4.avif" },
  { id: "photo-5", label: "Ảnh 5", url: "/background/photo-5.avif" },
  { id: "photo-6", label: "Ảnh 6", url: "/background/photo-6.avif" },
  { id: "photo-7", label: "Ảnh 7", url: "/background/photo-7.avif" },
  { id: "photo-8", label: "Ảnh 8", url: "/background/photo-8.avif" },
  { id: "none", label: "Trơn", url: null },
];

export function getAccentOption(key: AccentColorKey): AccentOption {
  return ACCENT_OPTIONS.find((option) => option.key === key) ?? ACCENT_OPTIONS[5];
}

export function getBackgroundUrl(id: string): string | null {
  return BACKGROUND_OPTIONS.find((option) => option.id === id)?.url ?? null;
}
