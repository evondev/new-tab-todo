import { useCallback, useMemo } from "react";
import { useLocalState } from "../../../hooks/use-local-state";
import { calcStreak } from "../../../utils/streak";
import { englishStreakStorage } from "../utils/english-streak-storage";

interface UseEnglishStreakResult {
  activeDays: Set<string>;
  streak: number;
  isLoading: boolean;
  toggleDay: (iso: string) => void;
}

export function useEnglishStreak(): UseEnglishStreakResult {
  const [days, persist, isLoading] = useLocalState<string[]>(
    englishStreakStorage,
    [],
  );

  const activeDays = useMemo(() => new Set(days), [days]);
  const streak = useMemo(() => calcStreak(days), [days]);

  const toggleDay = useCallback(
    function toggleDay(iso: string): void {
      const nextDays = activeDays.has(iso)
        ? days.filter((day) => day !== iso)
        : [...days, iso];

      persist(nextDays);
    },
    [days, activeDays, persist],
  );

  return { activeDays, streak, isLoading, toggleDay };
}
