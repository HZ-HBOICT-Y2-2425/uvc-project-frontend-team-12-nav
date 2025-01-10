import { writable } from 'svelte/store';

interface UsageDetail {
  usage: number;
  times: number;
}

interface OtherUsageDetail {
  Cooking: number;
  Cleaning: number;
  Gardening: number;
  Drinking: number;
}

interface MonthlyData {
  month: string;
  year: number;
  totalUsage: number;
  breakdown: {
    shower: UsageDetail;
    toilet: UsageDetail;
    sink: UsageDetail;
    washing: UsageDetail;
    other: OtherUsageDetail;
  };
  saved: number;
}

interface DailyData {
  date: string;
  totalUsage: number;
  breakdown: {
    shower: UsageDetail;
    toilet: UsageDetail;
    sink: UsageDetail;
    washing: UsageDetail;
    other: OtherUsageDetail;
  };
}

export const dailyUsage = writable<DailyData[]>([]); // Empty array as initial value
export const monthlyUsage = writable<MonthlyData[]>([]);
export const totalWaterUsed = writable<number>(0);
export const weeklySaving = writable<number>(0);
