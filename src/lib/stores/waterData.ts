// src/lib/stores/waterData.ts
import { readable } from 'svelte/store';

interface WaterData {
  monthlyUsage: MonthlyData[];
  dailyUsage: DailyData[];
}

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

const data: WaterData = {
  monthlyUsage: [
    {
      month: 'January',
      year: 2024,
      totalUsage: 4500,
      breakdown: {
        shower: { usage: 2000, times: 60 },
        toilet: { usage: 1000, times: 180 },
        tap: { usage: 1500, times: 300 }
      },
      saved: 120
    },
    {
      month: 'February',
      year: 2024,
      totalUsage: 4150,
      breakdown: {
        shower: { usage: 1800, times: 56 },
        toilet: { usage: 950, times: 170 },
        tap: { usage: 1400, times: 280 }
      },
      saved: 150
    },
    {
      month: 'March',
      year: 2024,
      totalUsage: 4100,
      breakdown: {
        shower: { usage: 1900, times: 58 },
        toilet: { usage: 900, times: 175 },
        tap: { usage: 1300, times: 290 }
      },
      saved: 180
    }
  ],
  dailyUsage: [
    {
      date: '2024-03-15',
      totalUsage: 145,
      shower: { usage: 65, times: 2 },
      toilet: { usage: 35, times: 6 },
      tap: { usage: 45, times: 10 }
    },
    {
      date: '2024-03-16',
      totalUsage: 140,
      shower: { usage: 70, times: 2 },
      toilet: { usage: 30, times: 5 },
      tap: { usage: 40, times: 8 }
    },
    {
      date: '2024-03-17',
      totalUsage: 145,
      shower: { usage: 60, times: 2 },
      toilet: { usage: 35, times: 6 },
      tap: { usage: 50, times: 12 }
    },
    {
      date: '2024-03-18',
      totalUsage: 130,
      shower: { usage: 55, times: 1 },
      toilet: { usage: 30, times: 5 },
      tap: { usage: 45, times: 10 }
    },
    {
      date: '2024-03-19',
      totalUsage: 140,
      shower: { usage: 65, times: 2 },
      toilet: { usage: 35, times: 6 },
      tap: { usage: 40, times: 9 }
    },
    {
      date: '2024-03-20',
      totalUsage: 170,
      shower: { usage: 75, times: 2 },
      toilet: { usage: 40, times: 7 },
      tap: { usage: 55, times: 13 }
    },
    {
      date: '2024-03-21',
      totalUsage: 150,
      shower: { usage: 70, times: 2 },
      toilet: { usage: 35, times: 6 },
      tap: { usage: 45, times: 10 }
    }
  ]
};

export const monthlyUsage = readable(data.monthlyUsage);
export const dailyUsage = readable(data.dailyUsage);