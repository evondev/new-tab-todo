export interface Habit {
  id: string;
  name: string;
  completedDates: string[]; // ISO "YYYY-MM-DD"
}
