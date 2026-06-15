export type BookmarkCategory = "daily" | "study" | "entertainment";

export interface Bookmark {
  id: string;
  name: string;
  url: string;
  category: BookmarkCategory;
}
