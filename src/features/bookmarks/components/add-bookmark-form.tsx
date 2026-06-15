import { useState } from "react";
import { Button } from "../../../components/button";
import { CATEGORY_OPTIONS } from "../constants/categories";
import type { BookmarkCategory } from "../types/bookmark";

interface AddBookmarkFormValues {
  name: string;
  url: string;
  category: BookmarkCategory;
}

interface AddBookmarkFormProps {
  onAdd: (values: AddBookmarkFormValues) => void;
  onCancel: () => void;
}

const INPUT_CLASS =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-(--brand) focus:outline-none";

export default function AddBookmarkForm({
  onAdd,
  onCancel,
}: AddBookmarkFormProps) {
  const [fields, setFields] = useState<AddBookmarkFormValues>({
    name: "",
    url: "",
    category: "daily",
  });

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function handleCategoryChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void {
    setFields((prev) => ({
      ...prev,
      category: event.target.value as BookmarkCategory,
    }));
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!fields.name.trim() || !fields.url.trim()) return;

    onAdd(fields);
    setFields({ name: "", url: "", category: "daily" });
  }

  const isValid = fields.name.trim() !== "" && fields.url.trim() !== "";

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-3 flex flex-col gap-2 rounded-xl bg-background p-3 ring-1 ring-border-card"
    >
      <input
        name="name"
        value={fields.name}
        onChange={handleInputChange}
        placeholder="Tên"
        autoFocus
        className={INPUT_CLASS}
      />
      <input
        name="url"
        value={fields.url}
        onChange={handleInputChange}
        placeholder="https://…"
        className={INPUT_CLASS}
      />

      <div className="flex items-center gap-2">
        <select
          value={fields.category}
          onChange={handleCategoryChange}
          className={INPUT_CLASS}
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
        <Button type="submit" disabled={!isValid}>
          Thêm
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Huỷ
        </Button>
      </div>
    </form>
  );
}
