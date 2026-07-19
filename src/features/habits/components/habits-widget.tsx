import { useMemo } from "react";
import { WidgetCard } from "../../../components/widget-card";
import { getTodayIso } from "../../../utils/date";
import { useHabits } from "../hooks/use-habits";
import { getCurrentWeekDays } from "../utils/current-week";
import AddHabitForm from "./add-habit-form";
import HabitItem from "./habit-item";

export default function HabitsWidget() {
  const { habits, isLoading, addHabit, renameHabit, toggleToday, deleteHabit } =
    useHabits();

  const weekDays = useMemo(() => getCurrentWeekDays(), []);
  const todayIso = getTodayIso();

  return (
    <WidgetCard
      title="Thói quen"
      icon={
        <img
          src="/icons/habit.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 object-contain"
        />
      }
      bodyClassName="flex flex-col"
    >
      {isLoading ? (
        <p className="py-6 text-center text-sm text-muted">Đang tải…</p>
      ) : habits.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted opacity-70">
          Chưa có thói quen nào
        </p>
      ) : (
        <ul className="scrollbar-clean mb-3 flex max-h-72 min-h-0 flex-1 flex-col overflow-y-auto">
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              weekDays={weekDays}
              isDoneToday={habit.completedDates.includes(todayIso)}
              onToggle={toggleToday}
              onRename={renameHabit}
              onDelete={deleteHabit}
            />
          ))}
        </ul>
      )}

      <div className="mt-auto">
        <AddHabitForm onAdd={addHabit} />
      </div>
    </WidgetCard>
  );
}
