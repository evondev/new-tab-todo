import { CalendarDays, LayoutList, Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { cn } from "../../../utils/cn";
import type { TaskView } from "../types/task";

interface TodoToolbarProps {
  view: TaskView;
  onViewChange: (view: TaskView) => void;
  onAddClick: () => void;
}

interface ViewOption {
  key: TaskView;
  label: string;
  icon: typeof LayoutList;
}

const VIEW_OPTIONS: ViewOption[] = [
  { key: "board", label: "Board", icon: LayoutList },
  { key: "calendar", label: "Lịch", icon: CalendarDays },
];

export default function TodoToolbar({
  view,
  onViewChange,
  onAddClick,
}: TodoToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center rounded-lg bg-background p-0.5">
        {VIEW_OPTIONS.map((option) => {
          const isActive = view === option.key;
          const Icon = option.icon;

          return (
            <button
              key={option.key}
              type="button"
              onClick={() => onViewChange(option.key)}
              className={cn(
                "inline-flex cursor-pointer items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                isActive && "bg-surface text-foreground shadow-sm",
                !isActive && "text-muted hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {option.label}
            </button>
          );
        })}
      </div>

      <Button onClick={onAddClick} className="rounded-full px-3 py-1.5">
        <Plus className="h-4 w-4" />
        Thêm task
      </Button>
    </div>
  );
}
