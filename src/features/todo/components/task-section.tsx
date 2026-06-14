import type { Task } from "../types/task";
import TaskItem from "./task-item";

interface TaskSectionProps {
  title: string;
  emptyLabel: string;
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskSection({
  title,
  emptyLabel,
  tasks,
  onToggle,
  onDelete,
}: TaskSectionProps) {
  return (
    <section>
      <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
        {title}
        <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-slate-500">
          {tasks.length}
        </span>
      </h2>

      {tasks.length === 0 ? (
        <p className="px-2 py-2 text-sm text-slate-600">{emptyLabel}</p>
      ) : (
        <ul className="flex flex-col">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
