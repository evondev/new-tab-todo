export type BookmarkCategory =
  | "daily"
  | "news"
  | "shopping"
  | "cooking"
  | "entertainment";

export interface Bookmark {
  id: string;
  name: string;
  url: string;
  category: BookmarkCategory;
}
