import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { Button } from "../../../components/button";
import { IconButton } from "../../../components/icon-button";

interface TimerControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onSkip: () => void;
  onReset: () => void;
}

export default function TimerControls({
  isRunning,
  onToggle,
  onSkip,
  onReset,
}: TimerControlsProps) {
  return (
    <div className="flex items-center gap-3">
      <Button onClick={onToggle} className="rounded-full px-5">
        {isRunning ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
        {isRunning ? "Tạm dừng" : "Bắt đầu"}
      </Button>
      <IconButton
        icon={SkipForward}
        label="Bỏ qua phiên"
        onClick={onSkip}
        className="h-9 w-9"
      />
      <IconButton
        icon={RotateCcw}
        label="Đặt lại"
        onClick={onReset}
        className="h-9 w-9"
      />
    </div>
  );
}
