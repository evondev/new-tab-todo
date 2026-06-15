import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/cn";
import { formatIsoDate } from "@/utils/date";

interface TaskFormValues {
  title: string;
  description: string;
  dueDate: string | null;
}

interface TaskFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: TaskFormValues) => void;
}

const EMPTY_FIELDS = { title: "", description: "" };

export default function TaskFormModal({
  open,
  onOpenChange,
  onSubmit,
}: TaskFormModalProps) {
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function resetForm(): void {
    setFields(EMPTY_FIELDS);
    setDueDate(undefined);
  }

  function handleOpenChange(nextOpen: boolean): void {
    if (!nextOpen) resetForm();
    onOpenChange(nextOpen);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setFields((prev) => ({ ...prev, title: event.target.value }));
  }

  function handleDescriptionChange(
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void {
    setFields((prev) => ({ ...prev, description: event.target.value }));
  }

  function handleDateSelect(date: Date | undefined): void {
    setDueDate(date);
    setIsDatePickerOpen(false);
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!fields.title.trim()) return;

    onSubmit({
      title: fields.title,
      description: fields.description,
      dueDate: dueDate ? formatIsoDate(dueDate) : null,
    });
    resetForm();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm task mới</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="task-title">Tên task</Label>
            <Input
              id="task-title"
              value={fields.title}
              onChange={handleTitleChange}
              placeholder="Ví dụ: Đóng tiền điện nước"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="task-description">Mô tả</Label>
            <Textarea
              id="task-description"
              value={fields.description}
              onChange={handleDescriptionChange}
              placeholder="Chi tiết (tuỳ chọn)"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Ngày hết hạn</Label>
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon />
                  {dueDate
                    ? format(dueDate, "EEEE, dd/MM/yyyy", { locale: vi })
                    : "Chọn ngày (tuỳ chọn)"}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={handleDateSelect}
                  locale={vi}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
            >
              Huỷ
            </Button>
            <Button type="submit" disabled={!fields.title.trim()}>
              Thêm task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
