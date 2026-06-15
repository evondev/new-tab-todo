import type { Bookmark } from "../types/bookmark";

// Seed khi storage rỗng lần đầu.
export const DEFAULT_BOOKMARKS: Bookmark[] = [
  { id: "seed-gmail", name: "Gmail", url: "https://mail.google.com", category: "daily" },
  { id: "seed-maps", name: "Google Maps", url: "https://google.com/maps", category: "daily" },
  { id: "seed-calendar", name: "Google Lịch", url: "https://calendar.google.com", category: "daily" },
  { id: "seed-vnexpress", name: "VnExpress", url: "https://vnexpress.net", category: "news" },
  { id: "seed-youtube", name: "YouTube", url: "https://youtube.com", category: "entertainment" },
];
