import { Repeat } from "lucide-react";
import { WidgetCard } from "../../../components/widget-card";
import { useHabits } from "../hooks/use-habits";
import AddHabitForm from "./add-habit-form";
import HabitItem from "./habit-item";

export default function HabitsWidget() {
  const { habits, isLoading, addHabit, toggleToday, deleteHabit } = useHabits();

  return (
    <WidgetCard title="Thói quen" icon={Repeat} bodyClassName="flex flex-col">
      {isLoading ? (
        <p className="py-6 text-center text-sm text-muted">Đang tải…</p>
      ) : habits.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted opacity-70">
          Chưa có thói quen nào
        </p>
      ) : (
        <ul className="mb-3 flex flex-1 flex-col">
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              onToggle={toggleToday}
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
