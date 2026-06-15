import { useEffect } from "react";
import { useLocalState } from "../../../hooks/use-local-state";
import { createStorage } from "../../../utils/create-storage";
import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
  getAccentOption,
  getBackgroundUrl,
} from "../constants/settings-options";
import type { Settings } from "../types/settings";

interface UseSettingsResult {
  settings: Settings;
  isLoading: boolean;
  updateSettings: (patch: Partial<Settings>) => void;
}

const settingsStorage = createStorage<Settings>(
  SETTINGS_STORAGE_KEY,
  DEFAULT_SETTINGS,
);

function mergeDefaults(loaded: Settings): Settings {
  return { ...DEFAULT_SETTINGS, ...loaded };
}

export function useSettings(): UseSettingsResult {
  const [settings, persist, isLoading] = useLocalState<Settings>(
    settingsStorage,
    DEFAULT_SETTINGS,
    mergeDefaults,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", settings.theme === "dark");
  }, [settings.theme]);

  useEffect(() => {
    const accent = getAccentOption(settings.accentColor);
    const root = document.documentElement;
    root.style.setProperty("--accent", accent.base);
    root.style.setProperty("--accent-hover", accent.hover);
  }, [settings.accentColor]);

  useEffect(() => {
    const url = getBackgroundUrl(settings.background);
    document.body.style.backgroundImage = url ? `url("${url}")` : "";
  }, [settings.background]);

  function updateSettings(patch: Partial<Settings>): void {
    persist({ ...settings, ...patch });
  }

  return { settings, isLoading, updateSettings };
}
