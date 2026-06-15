import { Check, Flame, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { IconButton } from "../../../components/icon-button";
import { cn } from "../../../utils/cn";
import { getTodayIso } from "../../../utils/date";
import type { Habit } from "../types/habit";
import { getLast7Days } from "../utils/last-7-days";
import { calcStreak } from "../utils/streak";

interface HabitItemProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export default function HabitItem({
  habit,
  onToggle,
  onRename,
  onDelete,
}: HabitItemProps) {
  const completedSet = useMemo(() => new Set(habit.completedDates), [habit.completedDates]);
  const isDoneToday = completedSet.has(getTodayIso());
  const streak = useMemo(() => calcStreak(habit.completedDates), [habit.completedDates]);
  const last7Days = useMemo(() => getLast7Days(), []);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(habit.name);

  function startEdit(): void {
    setDraft(habit.name);
    setIsEditing(true);
  }

  function commit(): void {
    onRename(habit.id, draft);
    setIsEditing(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "Enter") commit();
    if (event.key === "Escape") setIsEditing(false);
  }

  return (
    <li className="group flex items-center gap-3 rounded-lg px-1 py-2">
      <IconButton
        icon={Check}
        label={isDoneToday ? "Bỏ tick hôm nay" : "Tick hôm nay"}
        onClick={() => onToggle(habit.id)}
        className={cn(
          "h-5 w-5 rounded-md border",
          isDoneToday &&
            "border-brand bg-brand text-white hover:bg-brand-hover hover:text-white",
          !isDoneToday &&
            "border-muted text-transparent hover:bg-transparent hover:text-transparent",
        )}
      />

      {isEditing ? (
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 rounded-md border border-input bg-background px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      ) : (
        <button
          type="button"
          onDoubleClick={startEdit}
          title={habit.name}
          className={cn(
            "min-w-0 flex-1 cursor-text truncate text-left text-sm font-medium text-foreground",
            isDoneToday && "text-muted line-through",
          )}
        >
          {habit.name}
        </button>
      )}

      <div className="flex items-center gap-1">
        {last7Days.map((day) => (
          <span
            key={day.iso}
            title={day.weekdayLabel}
            className={cn(
              "h-2 w-2 rounded-full",
              completedSet.has(day.iso) ? "bg-brand" : "bg-border",
            )}
          />
        ))}
      </div>

      <span className="flex w-8 items-center justify-end gap-0.5 text-xs font-semibold text-amber-500">
        <Flame className="h-3.5 w-3.5" />
        {streak}
      </span>

      <div className="flex items-center gap-0.5">
        <IconButton
          icon={Pencil}
          label="Sửa thói quen"
          onClick={startEdit}
          className="pointer-events-none opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100"
        />
        <IconButton
          icon={Trash2}
          label="Xoá thói quen"
          onClick={() => onDelete(habit.id)}
          className="pointer-events-none opacity-0 transition-opacity hover:text-rose-500 group-hover:pointer-events-auto group-hover:opacity-100"
        />
      </div>
    </li>
  );
}
