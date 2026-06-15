import { Moon, Sun, X } from "lucide-react";
import { IconButton } from "../../../components/icon-button";
import { cn } from "../../../utils/cn";
import type { Settings, ThemeMode } from "../types/settings";
import AccentPicker from "./accent-picker";
import BackgroundPicker from "./background-picker";

interface SettingsModalProps {
  settings: Settings;
  onChange: (patch: Partial<Settings>) => void;
  onClose: () => void;
}

const THEME_OPTIONS: { key: ThemeMode; label: string; icon: typeof Sun }[] = [
  { key: "light", label: "Sáng", icon: Sun },
  { key: "dark", label: "Tối", icon: Moon },
];

export default function SettingsModal({
  settings,
  onChange,
  onClose,
}: SettingsModalProps) {
  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    onChange({ boardName: event.target.value });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-surface p-6 shadow-2xl ring-1 ring-border-card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Cài đặt</h2>
          <IconButton icon={X} label="Đóng" onClick={onClose} />
        </div>

        <div className="mb-5">
          <p className="mb-2 text-sm font-medium text-muted">Tên board</p>
          <input
            value={settings.boardName}
            onChange={handleNameChange}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-(--accent) focus:outline-none"
          />
        </div>

        <div className="mb-5">
          <p className="mb-2 text-sm font-medium text-muted">Giao diện</p>
          <div className="grid grid-cols-2 gap-3">
            {THEME_OPTIONS.map((option) => {
              const isActive = settings.theme === option.key;
              const Icon = option.icon;

              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => onChange({ theme: option.key })}
                  className={cn(
                    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                    isActive && "bg-(--accent) text-white",
                    !isActive && "bg-background text-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-5">
          <p className="mb-2 text-sm font-medium text-muted">
            Màu chủ đạo
          </p>
          <AccentPicker
            value={settings.accentColor}
            onChange={(accentColor) => onChange({ accentColor })}
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-muted">
            Ảnh nền
          </p>
          <BackgroundPicker
            value={settings.background}
            onChange={(background) => onChange({ background })}
          />
        </div>
      </div>
    </div>
  );
}
