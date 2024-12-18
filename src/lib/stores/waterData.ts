import { writable } from 'svelte/store';

interface MonthlyData {
  month: string;
  year: number;
  totalUsage: number;
  breakdown: {
    shower: { usage: number; times: number };
    toilet: { usage: number; times: number };
    tap: { usage: number; times: number };
  };
  saved: number;
}

interface DailyData {
  date: string;
  totalUsage: number;
  shower: { usage: number; times: number };
  toilet: { usage: number; times: number };
  tap: { usage: number; times: number };
}

export const dailyUsage = writable<DailyData[]>([]); // Empty array as initial value
export const monthlyUsage = writable<MonthlyData[]>([]);
