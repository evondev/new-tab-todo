import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../../components/button";

interface AddTaskFormProps {
  onAdd: (input: { title: string; dueDate: string | null }) => void;
}

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [fields, setFields] = useState({ title: "", dueDate: "" });

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault();

    const trimmedTitle = fields.title.trim();
    if (!trimmedTitle) return;

    onAdd({ title: trimmedTitle, dueDate: fields.dueDate || null });
    setFields({ title: "", dueDate: "" });
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setFields((prev) => ({ ...prev, title: event.target.value }));
  }

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setFields((prev) => ({ ...prev, dueDate: event.target.value }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 sm:flex-row sm:items-center"
    >
      <input
        type="text"
        value={fields.title}
        onChange={handleTitleChange}
        placeholder="Hôm nay cần làm gì?"
        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
      />
      <input
        type="date"
        value={fields.dueDate}
        onChange={handleDateChange}
        className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 focus:border-indigo-400 focus:outline-none"
      />
      <Button type="submit" disabled={!fields.title.trim()}>
        <Plus size={16} />
        Thêm
      </Button>
    </form>
  );
}
