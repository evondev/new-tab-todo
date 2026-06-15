import type { PomodoroMode } from "../types/pomodoro";

export interface PomodoroModeConfig {
  key: PomodoroMode;
  label: string;
  focusMinutes: number;
  breakMinutes: number;
}

export const POMODORO_MODES: PomodoroModeConfig[] = [
  { key: "classic", label: "Cổ điển", focusMinutes: 25, breakMinutes: 5 },
  { key: "deep", label: "Chuyên sâu", focusMinutes: 50, breakMinutes: 10 },
];

export function getModeConfig(mode: PomodoroMode): PomodoroModeConfig {
  return POMODORO_MODES.find((item) => item.key === mode) ?? POMODORO_MODES[0];
}
