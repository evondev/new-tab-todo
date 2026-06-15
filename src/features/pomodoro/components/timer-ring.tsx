import type { PomodoroPhase } from "../types/pomodoro";
import { formatClock } from "../utils/format-time";

interface TimerRingProps {
  remainingSeconds: number;
  totalSeconds: number;
  phase: PomodoroPhase;
}

export default function TimerRing({
  remainingSeconds,
  totalSeconds,
  phase,
}: TimerRingProps) {
  const progress = totalSeconds === 0 ? 0 : 1 - remainingSeconds / totalSeconds;
  const degrees = Math.min(360, Math.max(0, progress * 360));
  const accentColor = phase === "focus" ? "var(--brand)" : "#0ea5e9";

  return (
    <div
      className="relative flex h-44 w-44 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(${accentColor} ${degrees}deg, rgba(148, 163, 184, 0.25) ${degrees}deg)`,
      }}
    >
      <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-surface">
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: accentColor }}
        >
          {phase === "focus" ? "Tập trung" : "Nghỉ"}
        </span>
        <span className="text-4xl font-bold tabular-nums text-foreground">
          {formatClock(remainingSeconds)}
        </span>
      </div>
    </div>
  );
}
