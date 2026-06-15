import { CalendarDays, LayoutList, Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { cn } from "../../../utils/cn";

interface TodoToolbarProps {
  onAddClick: () => void;
}

export default function TodoToolbar({ onAddClick }: TodoToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center rounded-lg bg-background p-0.5">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium",
            "bg-surface text-foreground shadow-sm",
          )}
        >
          <LayoutList className="h-3.5 w-3.5" />
          Board
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium",
            "text-muted opacity-60",
          )}
          title="Sắp ra mắt"
        >
          <CalendarDays className="h-3.5 w-3.5" />
          Lịch
        </span>
      </div>

      <Button onClick={onAddClick} className="rounded-full px-3 py-1.5">
        <Plus className="h-4 w-4" />
        Thêm task
      </Button>
    </div>
  );
}
