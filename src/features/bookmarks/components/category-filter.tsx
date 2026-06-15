import { Chip } from "../../../components/chip";
import { CATEGORY_OPTIONS } from "../constants/categories";
import type { BookmarkCategory } from "../types/bookmark";

interface CategoryFilterProps {
  active: BookmarkCategory | null;
  onChange: (category: BookmarkCategory | null) => void;
}

export default function CategoryFilter({
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <Chip
        label="Tất cả"
        isActive={active === null}
        onClick={() => onChange(null)}
      />
      {CATEGORY_OPTIONS.map((option) => (
        <Chip
          key={option.key}
          label={option.label}
          isActive={active === option.key}
          onClick={() => onChange(option.key)}
        />
      ))}
    </div>
  );
}
