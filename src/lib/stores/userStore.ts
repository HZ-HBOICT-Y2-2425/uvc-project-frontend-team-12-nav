import { writable } from 'svelte/store';

export interface User {
  id: number;
  name: string;
  email: string;
  completedQuestionnaire: boolean;
  total: number; // ✅ Ensure total exists
}

// ✅ Load from localStorage correctly
const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
export const user = writable<User | null>(storedUser ? JSON.parse(storedUser) : null);

// ✅ Debugging: Log user store updates
user.subscribe((value) => {
  console.log("Updated User Store:", value); // ✅ Check if total is being stored
});
