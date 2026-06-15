import { NotebookPen } from "lucide-react";
import { WidgetCard } from "../../../components/widget-card";
import { useNotes } from "../hooks/use-notes";
import { countWords } from "../utils/count-words";

export default function NotesWidget() {
  const { text, isLoading, updateText } = useNotes();

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    updateText(event.target.value);
  }

  const wordCount = (
    <span className="text-xs text-muted">{countWords(text)} từ</span>
  );

  return (
    <WidgetCard
      title="Ghi chú"
      icon={NotebookPen}
      action={wordCount}
      className="flex-1"
      bodyClassName="flex"
    >
      <textarea
        value={text}
        onChange={handleChange}
        disabled={isLoading}
        placeholder="Viết ghi chú của bạn ở đây…"
        className="min-h-50 w-full flex-1 resize-none rounded-lg bg-transparent text-sm leading-relaxed text-foreground placeholder:text-muted focus:outline-none"
      />
    </WidgetCard>
  );
}
