import { writable } from "svelte/store";



// Define the TypeScript type for an achievement
export interface Achievement {
  id: number;
  title: string;
  description: string;
  reward: string;
  status: "locked" | "unlocked"; // Status can only be "locked" or "unlocked"
}

// Initial achievements data
const initialAchievements: Achievement[] = [
  {
    id: 1,
    title: "First Drop Saved",
    description: "Save your first liter of water!",
    reward: "Cool Hat",
    status: "unlocked",
  },
  {
    id: 2,
    title: "Get Your Hands Dry",
    description: "Save 10L of water",
    reward: "10L Cap",
    status: "locked",
  },
  {
    id: 3,
    title: "Team Player",
    description: "Save 10L with your community",
    reward: "Green Shirt",
    status: "locked",
  },
  {
    id: 4,
    title: "Week of Water Wisdom",
    description: "Reduce your water usage for 1 week straight",
    reward: "Cool Glasses",
    status: "locked",
  },
  {
    id: 5,
    title: "Shower Savant",
    description: "Take a shower for under 5 minutes 3 times in a week",
    reward: "#Shower Shirt",
    status: "locked",
  },
  {
    id: 6,
    title: "Conservation Champion",
    description: "Save 100L of water",
    reward: "100L Hat",
    status: "locked",
  },
  {
    id: 7,
    title: "Monthly Saver",
    description: "Save 200L of water in a month",
    reward: "Hidden",
    status: "locked",
  },
  {
    id: 8,
    title: "Weekly Conservationist",
    description: "Save 200L of water in a week",
    reward: "Hidden",
    status: "locked",
  },
  {
    id: 9,
    title: "Water Warrior",
    description: "Save 1000L of water",
    reward: "Hidden",
    status: "locked",
  },
];

// Create a writable store with the initial data
export const achievements = writable<Achievement[]>(initialAchievements);

// Utility functions to manipulate the store
export const unlockAchievement = (id: number) => {
  achievements.update((items) =>
    items.map((item) =>
      item.id === id ? { ...item, status: "unlocked" } : item
    )
  );
};

export const resetAchievements = () => {
  achievements.set(initialAchievements);
};
