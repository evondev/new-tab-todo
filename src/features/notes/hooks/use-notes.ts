import { useEffect, useRef, useState } from "react";
import { createStorage } from "../../../utils/create-storage";
import { NOTES_STORAGE_KEY } from "../constants/storage-keys";

interface UseNotesResult {
  text: string;
  isLoading: boolean;
  updateText: (next: string) => void;
}

const SAVE_DEBOUNCE_MS = 400;

const notesStorage = createStorage<string>(NOTES_STORAGE_KEY, "");

export function useNotes(): UseNotesResult {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let isMounted = true;

    notesStorage.load().then((loaded) => {
      if (!isMounted) return;

      setText(loaded);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  function updateText(next: string): void {
    setText(next);

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      notesStorage.save(next);
    }, SAVE_DEBOUNCE_MS);
  }

  return { text, isLoading, updateText };
}
