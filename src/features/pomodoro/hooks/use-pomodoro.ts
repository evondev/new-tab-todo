import { useEffect, useRef, useState } from "react";
import { createStorage } from "../../../utils/create-storage";
import { POMODORO_MODE_KEY } from "../constants/storage-keys";
import { getModeConfig } from "../constants/pomodoro-config";
import type { PomodoroMode, PomodoroPhase } from "../types/pomodoro";

interface UsePomodoroResult {
  mode: PomodoroMode;
  phase: PomodoroPhase;
  remainingSeconds: number;
  totalSeconds: number;
  isRunning: boolean;
  toggleRunning: () => void;
  skipPhase: () => void;
  reset: () => void;
  changeMode: (mode: PomodoroMode) => void;
}

const modeStorage = createStorage<PomodoroMode>(POMODORO_MODE_KEY, "classic");

function getPhaseSeconds(mode: PomodoroMode, phase: PomodoroPhase): number {
  const config = getModeConfig(mode);
  const minutes = phase === "focus" ? config.focusMinutes : config.breakMinutes;

  return minutes * 60;
}

export function usePomodoro(): UsePomodoroResult {
  const [mode, setMode] = useState<PomodoroMode>("classic");
  const [phase, setPhase] = useState<PomodoroPhase>("focus");
  const [remainingSeconds, setRemainingSeconds] = useState(
    getPhaseSeconds("classic", "focus"),
  );
  const [isRunning, setIsRunning] = useState(false);
  const [cycleToken, setCycleToken] = useState(0);

  const remainingRef = useRef(remainingSeconds);
  remainingRef.current = remainingSeconds;
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  // Load mode đã lưu (chỉ persist mode, không persist timer).
  useEffect(() => {
    let isMounted = true;

    modeStorage.load().then((loadedMode) => {
      if (!isMounted) return;
      if (loadedMode === "classic") return;

      setMode(loadedMode);
      setRemainingSeconds(getPhaseSeconds(loadedMode, "focus"));
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    let endAt = Date.now() + remainingRef.current * 1000;

    const intervalId = setInterval(() => {
      const secondsLeft = Math.round((endAt - Date.now()) / 1000);

      if (secondsLeft > 0) {
        setRemainingSeconds(secondsLeft);
        return;
      }

      const nextPhase: PomodoroPhase =
        phaseRef.current === "focus" ? "break" : "focus";
      const nextSeconds = getPhaseSeconds(modeRef.current, nextPhase);

      phaseRef.current = nextPhase;
      setPhase(nextPhase);
      setRemainingSeconds(nextSeconds);
      endAt = Date.now() + nextSeconds * 1000;
    }, 250);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, cycleToken]);

  function toggleRunning(): void {
    setIsRunning((prev) => !prev);
  }

  function skipPhase(): void {
    const nextPhase: PomodoroPhase = phase === "focus" ? "break" : "focus";
    setPhase(nextPhase);
    setRemainingSeconds(getPhaseSeconds(mode, nextPhase));
    setCycleToken((prev) => prev + 1);
  }

  function reset(): void {
    setIsRunning(false);
    setPhase("focus");
    setRemainingSeconds(getPhaseSeconds(mode, "focus"));
    setCycleToken((prev) => prev + 1);
  }

  function changeMode(nextMode: PomodoroMode): void {
    setMode(nextMode);
    modeStorage.save(nextMode);
    setIsRunning(false);
    setPhase("focus");
    setRemainingSeconds(getPhaseSeconds(nextMode, "focus"));
    setCycleToken((prev) => prev + 1);
  }

  return {
    mode,
    phase,
    remainingSeconds,
    totalSeconds: getPhaseSeconds(mode, phase),
    isRunning,
    toggleRunning,
    skipPhase,
    reset,
    changeMode,
  };
}
