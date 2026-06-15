import type { BookmarkCategory } from "../types/bookmark";

export interface CategoryOption {
  key: BookmarkCategory;
  label: string;
}

// "Tất cả" dùng để bỏ lọc — tách riêng để value lọc có thể là null.
export const CATEGORY_OPTIONS: CategoryOption[] = [
  { key: "daily", label: "Hằng ngày" },
  { key: "study", label: "Học tập" },
  { key: "entertainment", label: "Giải trí" },
];

export function getCategoryLabel(category: BookmarkCategory): string {
  return (
    CATEGORY_OPTIONS.find((option) => option.key === category)?.label ??
    category
  );
}
