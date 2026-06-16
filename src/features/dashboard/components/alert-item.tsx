import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "../../../utils/cn";
import type { AlertItem as AlertItemData } from "../utils/build-alerts";

interface AlertItemProps {
  item: AlertItemData;
  onDone: (item: AlertItemData) => void;
}

interface BadgeConfig {
  label: string;
  className: string;
}

function getDotClass(item: AlertItemData): string {
  if (item.tone === "important" || item.tone === "week" || item.tone === "month") return "bg-orange-500";
  if (item.tone === "overdue") return "bg-red-500";
  if (item.diff === 0) return "bg-amber-500";
  if (item.diff === 1) return "bg-blue-500";

  return "bg-muted";
}

function getBadge(item: AlertItemData): BadgeConfig | null {
  if (item.tone === "important") {
    return { label: "Quan trọng", className: "bg-red-100 text-red-600" };
  }

  if (item.tone === "week") {
    return { label: "Tuần này", className: "bg-orange-100 text-orange-600" };
  }

  if (item.tone === "month") {
    return { label: "Tháng này", className: "bg-orange-100 text-orange-600" };
  }

  if (item.diff === 0) {
    return { label: "Hôm nay", className: "bg-green-100 text-green-600" };
  }

  if (item.diff === 1) {
    return { label: "Ngày mai", className: "bg-blue-100 text-blue-700" };
  }

  return null;
}

export default function AlertItem({ item, onDone }: AlertItemProps) {
  const badge = getBadge(item);

  return (
    <li className="flex items-center gap-3 rounded-lg px-1 py-2">
      <span
        className={cn("h-2 w-2 shrink-0 rounded-full", getDotClass(item))}
      />

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <p
          title={item.message}
          className="min-w-0 shrink truncate text-sm text-foreground"
        >
          {item.message}
        </p>
        {badge && (
          <span
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
              badge.className,
            )}
          >
            {badge.label}
          </span>
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onDone(item)}
        className="shrink-0"
      >
        <Check />
        Xong
      </Button>
    </li>
  );
}
