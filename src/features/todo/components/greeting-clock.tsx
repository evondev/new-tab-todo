import { useEffect, useState } from "react";

function getGreeting(hour: number): string {
  if (hour < 12) return "Chào buổi sáng";
  if (hour < 18) return "Chào buổi chiều";

  return "Chào buổi tối";
}

function formatTime(now: Date): string {
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

export default function GreetingClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 1000 * 30);

    return () => clearInterval(intervalId);
  }, []);

  const greeting = getGreeting(now.getHours());

  return (
    <div className="text-center">
      <p className="text-7xl font-bold tabular-nums text-white">
        {formatTime(now)}
      </p>
      <p className="mt-2 text-lg text-slate-400">{greeting} 👋</p>
    </div>
  );
}
