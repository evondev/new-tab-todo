import { useMemo } from "react";
import {
  AddTaskForm,
  GreetingClock,
  TaskSection,
} from "../components";
import { useTasks } from "../hooks/use-tasks";
import type { Task } from "../types/task";
import { isUpcoming } from "../utils/task-date";

interface GroupedTasks {
  today: Task[];
  upcoming: Task[];
  done: Task[];
}

function groupTasks(tasks: Task[]): GroupedTasks {
  const today: Task[] = [];
  const upcoming: Task[] = [];
  const done: Task[] = [];

  for (const task of tasks) {
    if (task.isDone) {
      done.push(task);
    } else if (task.dueDate && isUpcoming(task.dueDate)) {
      upcoming.push(task);
    } else {
      today.push(task);
    }
  }

  done.sort((first, second) =>
    (second.completedAt ?? "").localeCompare(first.completedAt ?? ""),
  );

  upcoming.sort((first, second) =>
    (first.dueDate ?? "").localeCompare(second.dueDate ?? ""),
  );

  return { today, upcoming, done };
}

export default function TodoPage() {
  const { tasks, isLoading, addTask, toggleTask, deleteTask } = useTasks();

  const grouped = useMemo(() => groupTasks(tasks), [tasks]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center text-slate-500">
        Đang tải...
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-8 px-6 py-16">
      <GreetingClock />

      <AddTaskForm onAdd={addTask} />

      <div className="flex flex-col gap-8">
        <TaskSection
          title="Hôm nay"
          emptyLabel="Chưa có việc nào cho hôm nay 🎉"
          tasks={grouped.today}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
        <TaskSection
          title="Sắp tới"
          emptyLabel="Không có việc nào sắp tới."
          tasks={grouped.upcoming}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
        {grouped.done.length > 0 && (
          <TaskSection
            title="Đã xong"
            emptyLabel="Chưa hoàn thành việc nào."
            tasks={grouped.done}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        )}
      </div>
    </main>
  );
}
