import { createStorage } from "../../../utils/create-storage";
import { ENGLISH_STREAK_STORAGE_KEY } from "../constants/storage-keys";

// Mảng ngày ISO ("YYYY-MM-DD") đã học tiếng Anh.
export const englishStreakStorage = createStorage<string[]>(
  ENGLISH_STREAK_STORAGE_KEY,
  [],
);
