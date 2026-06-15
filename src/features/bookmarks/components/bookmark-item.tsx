import { IconButton } from "@/components/icon-button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { getCategoryLabel } from "../constants/categories";
import type { Bookmark } from "../types/bookmark";
import { getFaviconUrl, getHostLabel } from "../utils/favicon-url";

interface BookmarkItemProps {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
}

function openBookmark(url: string): void {
  if (
    url.startsWith("file://") &&
    typeof chrome !== "undefined" &&
    chrome.tabs
  ) {
    chrome.tabs.create({ url });
    return;
  }

  window.location.href = url;
}

export default function BookmarkItem({
  bookmark,
  onDelete,
}: BookmarkItemProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const faviconUrl = getFaviconUrl(bookmark.url);
  const showFallback = !faviconUrl || hasImageError;
  const isFileUrl = bookmark.url.startsWith("file://");

  const favicon = showFallback ? (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-border text-xs font-semibold text-muted">
      {bookmark.name.charAt(0).toUpperCase()}
    </span>
  ) : (
    <img
      src={faviconUrl}
      alt=""
      width={28}
      height={28}
      onError={() => setHasImageError(true)}
      className="h-7 w-7 shrink-0 rounded-full"
    />
  );

  const label = (
    <>
      <p className="truncate text-sm font-medium text-foreground">
        {bookmark.name}
      </p>
      <p className="truncate text-xs text-muted">{getHostLabel(bookmark.url)}</p>
    </>
  );

  return (
    <li className="group flex items-center gap-3 rounded-lg px-1 py-1.5 hover:bg-background">
      {favicon}

      {isFileUrl ? (
        <button
          type="button"
          onClick={() => openBookmark(bookmark.url)}
          className="min-w-0 flex-1 text-left"
        >
          {label}
        </button>
      ) : (
        <a href={bookmark.url} className="min-w-0 flex-1">
          {label}
        </a>
      )}

      <span className="shrink-0 text-xs text-muted group-hover:hidden">
        {getCategoryLabel(bookmark.category)}
      </span>
      <IconButton
        icon={Trash2}
        label="Xoá bookmark"
        onClick={() => onDelete(bookmark.id)}
        className="hidden hover:text-rose-500 group-hover:inline-flex"
      />
    </li>
  );
}
