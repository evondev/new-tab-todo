import { Bookmark as BookmarkIcon, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/button";
import { WidgetCard } from "../../../components/widget-card";
import { useBookmarks } from "../hooks/use-bookmarks";
import type { BookmarkCategory } from "../types/bookmark";
import AddBookmarkForm from "./add-bookmark-form";
import BookmarkItem from "./bookmark-item";
import CategoryFilter from "./category-filter";

export default function BookmarksWidget() {
  const { bookmarks, isLoading, addBookmark, deleteBookmark } = useBookmarks();
  const [activeCategory, setActiveCategory] = useState<BookmarkCategory | null>(
    null,
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  const visibleBookmarks = activeCategory
    ? bookmarks.filter((bookmark) => bookmark.category === activeCategory)
    : bookmarks;

  function handleAdd(values: Parameters<typeof addBookmark>[0]): void {
    addBookmark(values);
    setIsFormOpen(false);
  }

  const addAction = (
    <Button
      onClick={() => setIsFormOpen((prev) => !prev)}
      className="rounded-full px-3 py-1.5"
    >
      <Plus className="h-4 w-4" />
      Thêm bookmark
    </Button>
  );

  return (
    <WidgetCard title="Bookmark" icon={BookmarkIcon} action={addAction}>
      <div className="mb-3">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      </div>

      {isFormOpen && (
        <AddBookmarkForm
          onAdd={handleAdd}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {isLoading ? (
        <p className="py-6 text-center text-sm text-muted">Đang tải…</p>
      ) : visibleBookmarks.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted opacity-70">
          Chưa có bookmark nào
        </p>
      ) : (
        <ul className="flex flex-col">
          {visibleBookmarks.map((bookmark) => (
            <BookmarkItem
              key={bookmark.id}
              bookmark={bookmark}
              onDelete={deleteBookmark}
            />
          ))}
        </ul>
      )}
    </WidgetCard>
  );
}
