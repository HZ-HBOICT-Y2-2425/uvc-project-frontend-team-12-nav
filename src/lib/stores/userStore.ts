import { writable } from 'svelte/store';

export interface User {
  id: number;
  name: string;
  email: string;
  completedQuestionnaire: boolean;
  total: number;
}

// ✅ Load user data from localStorage (if available)
const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
export const user = writable<User | null>(storedUser ? JSON.parse(storedUser) : null);

// ✅ Automatically update localStorage when user changes
user.subscribe((value) => {
  if (typeof window !== 'undefined') {
    if (value) {
      localStorage.setItem('user', JSON.stringify(value)); // ✅ Save user data
    } else {
      localStorage.removeItem('user'); // ✅ Clear on logout
    }
  }
});
