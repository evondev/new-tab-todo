import { useState } from "react";
import { Button } from "../../../components/button";

interface AddTaskFormValues {
  title: string;
  description: string;
  dueDate: string | null;
}

interface AddTaskFormProps {
  onAdd: (values: AddTaskFormValues) => void;
  onCancel: () => void;
}

const INPUT_CLASS =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-(--accent) focus:outline-none";

export default function AddTaskForm({ onAdd, onCancel }: AddTaskFormProps) {
  const [fields, setFields] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!fields.title.trim()) return;

    onAdd({
      title: fields.title,
      description: fields.description,
      dueDate: fields.dueDate || null,
    });
    setFields({ title: "", description: "", dueDate: "" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col gap-2 rounded-xl bg-background p-3 ring-1 ring-border-card"
    >
      <input
        name="title"
        value={fields.title}
        onChange={handleChange}
        placeholder="Tên task"
        autoFocus
        className={INPUT_CLASS}
      />
      <input
        name="description"
        value={fields.description}
        onChange={handleChange}
        placeholder="Mô tả (tuỳ chọn)"
        className={INPUT_CLASS}
      />

      <div className="flex items-center gap-2">
        <input
          type="date"
          name="dueDate"
          value={fields.dueDate}
          onChange={handleChange}
          className={INPUT_CLASS}
        />
        <Button type="submit" disabled={!fields.title.trim()}>
          Thêm
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Huỷ
        </Button>
      </div>
    </form>
  );
}
