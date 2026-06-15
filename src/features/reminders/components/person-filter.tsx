import { Chip } from "../../../components/chip";
import { PERSON_OPTIONS } from "../constants/reminder-options";
import type { ReminderPerson } from "../types/reminder";

interface PersonFilterProps {
  active: ReminderPerson | null;
  onChange: (person: ReminderPerson | null) => void;
}

export default function PersonFilter({ active, onChange }: PersonFilterProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <Chip
        label="Tất cả"
        isActive={active === null}
        onClick={() => onChange(null)}
      />
      {PERSON_OPTIONS.map((option) => (
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
