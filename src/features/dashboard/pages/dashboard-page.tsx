import { LayoutGrid, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/button";
import { cn } from "../../../utils/cn";
import { TodoWidget } from "../../todo/components";
import { PomodoroWidget } from "../../pomodoro/components";
import NotesWidget from "../../notes/components/notes-widget";
import { RemindersWidget } from "../../reminders/components";
import { HabitsWidget } from "../../habits/components";
import { SettingsModal } from "../../settings/components";
import { useSettings } from "../../settings/hooks/use-settings";

export default function DashboardPage() {
  const { settings, updateSettings } = useSettings();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const isPlainBackground = settings.background === "none";

  return (
    <div className="flex min-h-screen w-full flex-col p-3">
      <div
        className={cn(
          "flex flex-1 flex-col rounded-3xl p-3 ring-1 ring-border-card backdrop-blur-xl sm:p-4",
          isPlainBackground ? "bg-surface/90" : "bg-surface/55",
        )}
      >
        <header className="mb-3 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 ring-1 ring-border-card">
            <LayoutGrid className="h-5 w-5 text-foreground" />
            <h1 className="text-lg font-bold text-foreground">
              {settings.boardName}
            </h1>
          </div>
          <Button
            variant="primary"
            className="rounded-full"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="h-4 w-4" />
            Cài đặt
          </Button>
        </header>

        <div className="grid flex-1 gap-3 lg:grid-cols-3">
          <div className="flex flex-col gap-3 lg:col-span-2">
            <TodoWidget />

            <div className="grid gap-3 sm:grid-cols-2">
              <RemindersWidget />
              <HabitsWidget />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <PomodoroWidget />
            <NotesWidget />
          </div>
        </div>
      </div>

      <SettingsModal
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
        settings={settings}
        onChange={updateSettings}
      />
    </div>
  );
}
