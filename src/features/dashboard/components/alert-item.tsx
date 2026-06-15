import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "../../../utils/cn";
import type { AlertItem as AlertItemData } from "../utils/build-alerts";

interface AlertItemProps {
  item: AlertItemData;
  onDone: (item: AlertItemData) => void;
}

const TONE_DOT_CLASS = {
  overdue: "bg-red-500",
  today: "bg-amber-500",
  soon: "bg-blue-500",
} as const;

export default function AlertItem({ item, onDone }: AlertItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-lg px-1 py-2">
      <span
        className={cn(
          "h-2 w-2 shrink-0 rounded-full",
          TONE_DOT_CLASS[item.tone],
        )}
      />

      <p
        title={item.message}
        className="min-w-0 flex-1 truncate text-sm text-foreground"
      >
        {item.message}
      </p>

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
