import { Timer } from "lucide-react";
import { Chip } from "../../../components/chip";
import { WidgetCard } from "../../../components/widget-card";
import { POMODORO_MODES, getModeConfig } from "../constants/pomodoro-config";
import { usePomodoro } from "../hooks/use-pomodoro";
import TimerControls from "./timer-controls";
import TimerRing from "./timer-ring";

export default function PomodoroWidget() {
  const {
    mode,
    phase,
    remainingSeconds,
    totalSeconds,
    isRunning,
    toggleRunning,
    skipPhase,
    reset,
    changeMode,
  } = usePomodoro();

  const activeConfig = getModeConfig(mode);

  const modeChips = (
    <div className="flex items-center gap-1">
      {POMODORO_MODES.map((modeConfig) => (
        <Chip
          key={modeConfig.key}
          label={modeConfig.label}
          isActive={modeConfig.key === mode}
          onClick={() => changeMode(modeConfig.key)}
        />
      ))}
    </div>
  );

  return (
    <WidgetCard title="Pomodoro" icon={Timer} action={modeChips}>
      <div className="flex flex-col items-center gap-5 py-2">
        <TimerRing
          remainingSeconds={remainingSeconds}
          totalSeconds={totalSeconds}
          phase={phase}
        />

        <TimerControls
          isRunning={isRunning}
          onToggle={toggleRunning}
          onSkip={skipPhase}
          onReset={reset}
        />

        <p className="text-xs text-muted">
          Tập trung {activeConfig.focusMinutes}&apos; · Nghỉ{" "}
          {activeConfig.breakMinutes}&apos;
        </p>
      </div>
    </WidgetCard>
  );
}
