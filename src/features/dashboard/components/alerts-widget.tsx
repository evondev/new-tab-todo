import { useMemo } from "react";
import { WidgetCard } from "../../../components/widget-card";
import { useReminders } from "../../reminders/hooks/use-reminders";
import { useTasks } from "../../todo/hooks/use-tasks";
import { buildAlerts, type AlertItem as AlertItemData } from "../utils/build-alerts";
import AlertItem from "./alert-item";

export default function AlertsWidget() {
  const { tasks, isLoading: tasksLoading, editTask } = useTasks();
  const { reminders, isLoading: remindersLoading, completeToday } =
    useReminders();

  const alerts = useMemo(
    () => buildAlerts(tasks, reminders),
    [tasks, reminders],
  );

  const isLoading = tasksLoading || remindersLoading;

  function handleDone(item: AlertItemData): void {
    if (item.source === "reminder") {
      completeToday(item.sourceId);
      return;
    }

    const task = tasks.find((current) => current.id === item.sourceId);
    if (!task) return;

    editTask(task.id, {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      dueTime: task.dueTime,
      status: "done",
      important: task.important,
    });
  }

  return (
    <WidgetCard
      title="Quan trọng"
      icon={
        <img
          src="/icons/bell.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 object-contain"
        />
      }
      className="flex-1"
    >
      {isLoading ? (
        <p className="py-6 text-center text-sm text-muted">Đang tải…</p>
      ) : alerts.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted opacity-70">
          Tuyệt! Không có gì cần nhắc 🎉
        </p>
      ) : (
        <ul className="flex flex-col">
          {alerts.map((item) => (
            <AlertItem key={item.key} item={item} onDone={handleDone} />
          ))}
        </ul>
      )}
    </WidgetCard>
  );
}
